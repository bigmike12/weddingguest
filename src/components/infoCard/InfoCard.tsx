import React from "react";

const InfoCard = ({ title, count }: { title: string; count: string }) => {
  return (
    <div className="bg-[url('/images/backgroundPattern.png')] bg-cover bg-white bg-center w-full h-32 rounded-xl border-wgYellow border-2">
      <div className="flex flex-col justify-end h-full p-4">
        <p className="text-sm font-normal text-black">{title}</p>
        <h1 className="text-black text-4xl font-medium mt-1">{count}</h1>
      </div>
    </div>
  );
};

export default InfoCard;
