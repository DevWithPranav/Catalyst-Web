"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/logo/Headerlogo.svg";

const links = [
  { page: "Home", path: "/" },
  { page: "Events", path: "/events" },
  { page: "Team", path: "/team" },
  { page: "Innovate", path: "/innovate" },
  { page: "MuLearn", path: "/mulearn" },
  { page: "About", path: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#010314]/80 backdrop-blur-2xl text-white">
        <div className="flex items-center justify-between px-6 lg:px-14 py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={Logo}
              alt="Catalyst Logo"
              width={45}
              height={45}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-12">
            {links.map((link) => (
              <div key={link.page} className="group">
                <Link href={link.path} className="font-light">
                  {link.page}
                </Link>
                <div className="h-[1px] w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* Decorative Gradient */}
        <Image
          src="/elements/Gradient.svg"
          alt=""
          width={3000}
          height={300}
          className="pointer-events-none absolute top-0 left-0 -z-10"
        />
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div className="absolute right-0 top-0 h-full w-3/4 bg-[#010314] flex flex-col items-center justify-center gap-6">
          {links.map((link) => (
            <Link
              key={link.page}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-light"
            >
              {link.page}
            </Link>
          ))}
        </div>
      </div>

      {/* Spacer so content doesn't hide under navbar */}
      <div className="h-[80px]" />
    </>
  );
}
