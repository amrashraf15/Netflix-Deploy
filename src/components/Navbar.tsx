"use client";
import { BsBell, BsChevronDown } from "react-icons/bs";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import { BiSearch } from "react-icons/bi";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className="px-2 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image src="/images/Netflix_Logo_PMS.png" alt="logo" width={120} height={120} />
          <div className="hidden lg:flex gap-7">
            <NavbarItem label="Home" />
            <NavbarItem label="Series" />
            <NavbarItem label="Films" />
            <NavbarItem label="New & Popular" />
            <NavbarItem label="My List" />
            <NavbarItem label="Browse by Languages" />
          </div>
          <div onClick={toggleMobileMenu} className="lg:hidden flex items-center gap-2 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <BiSearch className="text-white cursor-pointer hover:text-gray-300" size={22} />
          <BsBell className="text-white cursor-pointer hover:text-gray-300" size={22} />
          <div onClick={toggleAccountMenu} className="flex items-center gap-2 cursor-pointer relative">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image src="/images/blueFace.png" alt="profile" width={40} height={40} />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`} />
          </div>
        </div>
      </div>
      {showMobileMenu && <MobileMenu visible={showMobileMenu} />}
      {showAccountMenu && <AccountMenu visible={showAccountMenu} />}
    </nav>
  );
};

export default Navbar;

