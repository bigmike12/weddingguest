"use client";

import { Input } from "antd";
import React, { useState } from "react";
import Success from "../ui/notifications/success/Success";
import useModalStore from "@/store/useModalStore";
import { guestList } from "@/database";

const { Search } = Input;

interface SearchComponentProps {
  onSuccess: () => void; // Callback to notify successful guest scan
}

const SearchComponent = ({ onSuccess }: SearchComponentProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const guest = guestList.find((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (guest) {
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
      onSuccess(); // Call the onSuccess callback
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
