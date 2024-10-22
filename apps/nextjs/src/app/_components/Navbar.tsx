import React from "react";
import Image from "next/image";

import { NavBarBtn } from "./NavBarBtn";

const Navbar = () => {
  return (
    <nav className="w-full p-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo on the left */}
        <div className="text-2xl font-bold text-white">
          <Image
            src="/logo.png"
            alt="our Logo"
            width={38}
            height={38}
            className="h-[37.87px] min-h-[37.87px]"
          />
        </div>

        {/* Profile button on the right */}
        <div className="navbar-profile">
          <NavBarBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
