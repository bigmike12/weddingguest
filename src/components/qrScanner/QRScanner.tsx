"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import React, { useState } from "react";
import { toast } from "sonner";
import useModalStore from "@/store/useModalStore";
import Success from "../ui/notifications/success/Success";

interface QRScannerProps {
  guestList: any;
  onSuccess: (guestIdentifier: string) => void;
  admittedGuests: Set<string>;
}

const QRScanner = ({ guestList, admittedGuests, onSuccess }: QRScannerProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const [showScanner, setShowScanner] = useState(false);
  const [data, setData] = useState("");

  const handleScan = (guestIdentifier: string) => {
    const guest = guestList.find(
      (guest: any) =>
        guest.name.toLowerCase().includes(guestIdentifier.toLowerCase()) ||
        guest.phone.includes(guestIdentifier)
    );

    if (!guest) {
      toast.error("Invalid guest. Not found in the invite list.");
      return;
    }

    if (admittedGuests.has(guest.phone)) {
      toast.error("This guest has already been admitted.");
    } else {
      onSuccess(guest.phone); // Call onSuccess callback
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
      toast.success(`Welcome ${guest.name}! You are now admitted.`);
    }
  };

  const handleScannerResult = (result: any) => {
    if (result?.[0]?.rawValue) {
      const scannedData = result[0].rawValue;
      setData(scannedData);
      handleScan(scannedData); // Process the scanned data
    }
  };

  const simulateScan = () => {
    setShowScanner((prev) => !prev);
  };

  return (
    <div className="my-10">
      <div className="flex justify-center mb-10">
        <button
          onClick={simulateScan}
          className="px-4 py-2 rounded-xl bg-white text-black hover:bg-wgYellow hover:text-white"
        >
          {showScanner ? "Stop Scanner" : "Simulate QR Scan"}
        </button>
      </div>

      {showScanner && (
        <div>
          <Scanner onScan={handleScannerResult} />
        </div>
      )}
    </div>
  );
};

export default QRScanner;
