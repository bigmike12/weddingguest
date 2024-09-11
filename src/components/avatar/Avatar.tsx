import Image from "next/image";
import React from "react";

interface Props {
  path?: string;
  name?: string;
}

const Avatar = ({ path, name = "" }: Props) => {
  const firstLetter = name.split("")[0];

  return !path ? (
    <div className="w-[2.25rem] h-[2.25rem] rounded-full bg-wgYellow flex justify-center items-center font-bold text-black">
      <p>{firstLetter}</p>
    </div>
  ) : (
    <Image
      width={37}
      height={37}
      style={{ objectFit: "contain" }}
      src={path}
      alt="avatar"
      className="w-[2.25rem] h-[2.25rem] rounded-full"
    />
  );
};

export default Avatar;
