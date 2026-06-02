"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import useNavbarStore from "@/app/utils/useNavbarStore";

const Navbar = () => {
  const { isOpen, toggleNavbar } = useNavbarStore();
  const links = [
    {
      page: "Home",
      path: "/",
    },
    {
      page: "Events",
      path: "/events",
    },
    {
      page: "Achievements",
      path: "/achievements",
    },
    {
      page: "Execom",
      path: "/execom",
    },
    {
      page: "MuLearn",
      path: "/mulearn",
    },
    {
      page: "Gallery",
      path: "/gallery",
    },
  ];

  return (
    <div className="flex fixed z-[300] top-0 w-screen py-4 px-8 lg:px-14 justify-between bg-black/50 lg:bg-[#000000] backdrop-blur-2xl lg:backdrop-blur-none items-center overflow-hidden text-white">
      {/* Logo */}
      <Link href={"/"} className="font-bold text-2xl">
        <img className="h-10" src="/Catalyst_Logo_Navbar.png" alt="" />
      </Link>

      {/* Desktop Navigation */}
      <div className="gap-12 hidden lg:flex">
        {links.map((link, index) => {
          return (
            <div key={index} className="w-fit group">
              <Link
                className="text-base font-light text-white"
                href={link.path}
              >
                {link.page}
              </Link>
              <div className="scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-left h-[1px] w-full bg-white"></div>
            </div>
          );
        })}
      </div>

      {/* Mobile Menu Toggle */}
      <HiOutlineMenuAlt3
        onClick={toggleNavbar}
        size={30}
        className="lg:hidden cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
