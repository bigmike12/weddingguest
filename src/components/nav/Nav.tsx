"use client";

import React from "react";
import Avatar from "../avatar/Avatar";

const Nav = () => {
  const name = "Tola Afonja";

  return (
    <div className="flex flex-row w-full">
      <Avatar name={name} />
      <div className="ml-4">
        <p className="text-xs font-light">Welcome to</p>
        <h2 className="text-base font-bold">The Jonathan’s wedding</h2>
      </div>
    </div>
  );
};

export default Nav;
