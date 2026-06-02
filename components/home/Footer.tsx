import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full px-4 md:px-8 lg:px-12 pb-8 mt-10 md:mt-20">
      <div className="bg-[#0f0f0f] rounded-[2.5rem] pt-16 px-8 md:px-16 pb-32 md:pb-[14vw] overflow-hidden relative flex flex-col border border-neutral-800/50 shadow-2xl">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16 z-10">
          
          {/* Logo & Description */}
          <div className="max-w-xs">
            <h2 className="text-white text-3xl font-primary font-bold tracking-wider mb-4">
              CATALYST
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-secondary">
              Catalyst is a dynamic ecosystem of innovation and entrepreneurship at Mar Baselios IEDC, specializing in transforming ideas into reality.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full font-secondary text-sm">
            
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold mb-2">Quick link</h3>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">About us</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Events</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Team</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold mb-2">Company</h3>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Service details</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Project</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Project details</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold mb-2">Others</h3>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog details</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">404</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold mb-2">Social</h3>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</Link>
            </div>

          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-secondary z-10 pb-8">
          <p>©{new Date().getFullYear()} Catalyst All rights reserved.</p>
          <p>Design by Catalyst Web Team</p>
        </div>

        {/* Huge Text Background */}
        <div className="w-full flex justify-center mt-auto -mb-[2%] select-none pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden">
          <h1 className="text-[17vw] leading-[0.75] font-primary font-bold uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-neutral-900 tracking-tighter whitespace-nowrap text-center w-full">
            CATALYST
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
