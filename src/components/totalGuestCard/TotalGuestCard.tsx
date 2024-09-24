import { guestList } from "@/database";
import React from "react";

const TotalGuestCard = ({ totalGuests }: any) => {
  return (
    <div className="bg-[url('/images/backgroundPattern.png')] bg-wgYellow bg-cover bg-center w-full h-[99px] rounded-xl mt-7">
      <div className="flex flex-col items-center my-auto p-4 justify-center h-fullbg-opacity-50">
        <p className="text-sm font-medium text-black">Anticipated crowd size</p>
        <h1 className="text-black text-5xl font-bold">{totalGuests}</h1>
      </div>
    </div>
  );
};

export default TotalGuestCard;
