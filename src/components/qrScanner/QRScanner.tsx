"use client";

import React, { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { guestList } from "@/database";
import useModalStore from "@/store/useModalStore";
import Success from "../ui/notifications/success/Success";

interface SearchComponentProps {
  onSuccess: () => void; // Callback to notify successful guest scan
}

const QRScanner = ({ onSuccess }: SearchComponentProps) => {
  const openModal = useModalStore((state) => state.openModal);

  const [data, setData] = useState("");

  const handleSearch = () => {
    const guest = guestList.find((guest) =>
      guest.name.toLowerCase().includes(data.toLowerCase())
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

  useEffect(() => {
  handleSearch()
  }, [data])
  

  return (
    <div>
      <Scanner onScan={(result: any) => setData(result[0]?.rawValue)} />
    </div>
  );
};

export default QRScanner;
