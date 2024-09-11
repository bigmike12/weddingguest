"use client";

import InfoCard from "@/components/infoCard/InfoCard";
import Nav from "@/components/nav/Nav";
import QRScanner from "@/components/qrScanner/QRScanner";
import SearchComponent from "@/components/search/Search";
import TotalGuestCard from "@/components/totalGuestCard/TotalGuestCard";
import React, { useState } from "react";
import { guestList } from "@/database"; // Assuming guestList is in /database

const Admit = () => {
  const [loggedGuests, setLoggedGuests] = useState(0);

  // Total number of guests
  const totalGuests = guestList.length;

  // Callback to increment logged guests
  const handleSuccessfulScan = () => {
    setLoggedGuests((prev) => prev + 1);
  };

  return (
    <div>
      <Nav />
      <TotalGuestCard />
      <SearchComponent onSuccess={handleSuccessfulScan} />

      <div className="flex gap-4">
        <InfoCard title="Logged guests" count={loggedGuests.toString()} />
        <InfoCard title="Awaited guests" count={(totalGuests - loggedGuests).toString()} />
      </div>

      <QRScanner />
    </div>
  );
};

export default Admit;
