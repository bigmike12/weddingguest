"use client";

import { Input } from "antd";
import React, { useState } from "react";
import Success from "../ui/notifications/success/Success";
import useModalStore from "@/store/useModalStore";

// Define the structure of a guest
interface Guest {
  name: string;
  phone: string; // Unique identifier for each guest
  type: string;
}

interface SearchComponentProps {
  guestList: Guest[]; // Specify that guestList is an array of Guest objects
  onSuccess: (guestIdentifier: string) => void; // Callback to notify successful guest scan
  admittedGuests: Set<string>; // Track admitted guests by phone number (unique identifier)
}

const { Search } = Input;

const SearchComponent = ({
  guestList,
  onSuccess,
  admittedGuests,
}: SearchComponentProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizePhone = (phone: string | undefined) => {
    if (!phone) return ""; // Return an empty string if the phone is undefined or null
    return phone.replace(/\D/g, ""); // Remove all non-digit characters
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      openModal(
        "",
        <Success
          type="cancel"
          title="Empty Search"
          text="Please enter a name or phone number to search."
        />,
        "658px"
      );
      return;
    }

    // Create regex for case-insensitive search
    const regex = new RegExp(trimmedSearchTerm, "i");

    const guest = guestList.find(({ name, phone }) => {
      const normalizedNumber = normalizePhone(phone);
      return regex.test(name) || regex.test(normalizedNumber);
    });

    console.log("njknkn", guest);

    if (guest) {
      const normalizedGuestPhone = normalizePhone(guest.phone);
      if (admittedGuests.has(guest.phone)) {
        openModal(
          "",
          <Success
            type="cancel"
            title="Guest already admitted"
            text="This guest has already been admitted."
          />,
          "658px"
        );
      } else {
        admittedGuests.add(normalizedGuestPhone); // Add guest to admitted set by phone number
        openModal(
          "",
          <Success
            type="success"
            title="Welcome!"
            text={
              <>
                Hello {guest.name}, enjoy the party! <b>{guest.type}</b>
              </>
            }
          />,
          "658px"
        );
        onSuccess(normalizedGuestPhone); // Notify success with guest's phone number
      }
    } else {
      openModal(
        "",
        <Success
          type="cancel"
          title="Guest not found"
          text="Sorry, the guest was not invited."
        />,
        "658px"
      );
    }

    setSearchTerm(""); // Clear search term after search
  };

  return (
    <div className="my-7">
      <h3 className="mb-2">Recent updates</h3>
      <div>
        <Search
          placeholder="Search name or phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
