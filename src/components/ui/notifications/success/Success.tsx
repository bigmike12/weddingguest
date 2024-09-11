import Image from "next/image";
import React from "react";

interface SuccessProps {
  type: "success" | "cancel";
  title: string;
  text: React.ReactNode; // Allow both strings and JSX
}

const Success = ({ type, title, text }: SuccessProps) => {
  const success = type === "success";

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={success ? "/images/success.png" : "/images/cancel.png"}
        alt={success ? "Success" : "Cancel"}
        height="150"
        width="150"
      />
      <h3 className="font-bold text-[1.75rem] mt-4">{title}</h3>
      <p className="text-sm text-center w-2/3">{text}</p> {/* Supports bold text or JSX */}
    </div>
  );
};

export default Success;
