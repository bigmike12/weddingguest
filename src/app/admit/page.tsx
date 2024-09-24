"use client";

import InfoCard from "@/components/infoCard/InfoCard";
import Nav from "@/components/nav/Nav";
import QRScanner from "@/components/qrScanner/QRScanner";
import SearchComponent from "@/components/search/Search";
import TotalGuestCard from "@/components/totalGuestCard/TotalGuestCard";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { addGuestsToFirestore, db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const Admit = () => {
  const [loggedGuests, setLoggedGuests] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [admittedGuests, setAdmittedGuests] = useState<Set<string>>(new Set());
  const [guests, setGuests] = useState<any>([]);
  const [guestsLoaded, setGuestsLoaded] = useState(false); // Track if guests have been loaded

  // Fetch guest list from Firestore
  const fetchGuests = async () => {
    try {
      const guestCollection = collection(db, "guests");
      const guestSnapshot = await getDocs(guestCollection);
      const guestList = guestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGuests(guestList);
      setTotalGuests(guestList.length);
    } catch (error) {
      console.error("Error fetching guests: ", error);
    }
  };

  // Callback to increment logged guests
  const handleSuccessfulScan = (guestPhone: string) => {
    const normalizedPhone = normalizePhone(guestPhone);
  
    if (admittedGuests.has(normalizedPhone)) {
      toast.error("This guest has already been admitted.");
      return;
    }
  
    setAdmittedGuests((prev) => {
      const updatedGuests = new Set(prev).add(normalizedPhone);
      // Save the updated admitted guests to local storage
      localStorage.setItem("admittedGuests", JSON.stringify(Array.from(updatedGuests)));
      return updatedGuests;
    });
    setLoggedGuests((prev) => prev + 1);
  };

  useEffect(() => {
    const loadGuests = async () => {
      const guestCollection = collection(db, "guests");
      const guestSnapshot = await getDocs(guestCollection);
  
      if (guestSnapshot.empty) {
        await addGuestsToFirestore(); // Add guests if the collection is empty
      }
  
      fetchGuests(); // Fetch guests after adding or confirming they exist
      setGuestsLoaded(true); // Set guestsLoaded to true after loading
    };
  
    // Load admitted guests from local storage on app load
    const savedAdmittedGuests = localStorage.getItem("admittedGuests");
    if (savedAdmittedGuests) {
      setAdmittedGuests(new Set(JSON.parse(savedAdmittedGuests)));
      setLoggedGuests(JSON.parse(savedAdmittedGuests).length); // Set loggedGuests count
    }
  
    if (!guestsLoaded) {
      loadGuests();
    }
  }, [guestsLoaded]);
  

  const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

  return (
    <div>
      <Nav />
      <TotalGuestCard totalGuests={totalGuests} />
      <SearchComponent
        guestList={guests}
        onSuccess={handleSuccessfulScan}
        admittedGuests={admittedGuests}
      />

      <div className="flex gap-4">
        <InfoCard title="Logged guests" count={loggedGuests.toString()} />
        <InfoCard
          title="Awaited guests"
          count={(totalGuests - loggedGuests).toString()}
        />
      </div>

      <QRScanner
        guestList={guests}
        onSuccess={handleSuccessfulScan}
        admittedGuests={admittedGuests}
      />
    </div>
  );
};

export default Admit;
