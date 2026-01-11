"use-client";
import React from "react";
const Footer = () => {
  return (
    <div className="mt-20 mx-5 mb-10">
      <div className="relative rounded-2xl p-[0.5px]">
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(225.38deg, #FFFFFF 1.29%, rgba(255,255,255,0) 28.3%, #FFFFFF 91.9%)",
          }}
        />

        {/* Card body */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] text-white  gap-2 p-8 font-secondary">
          <div>
            <ul className="flex justify-between flex-col gap-5">
              <li>Home</li>
              <li>Events</li>
              <li>Execom</li>
              <div>
                <li>Mulearn</li>
                <ul className="text-gray-500 ml-10 flex flex-col gap-3 mt-5">
                  <li>Execom</li>
                  <li>Achievements</li>
                </ul>
              </div>

              <li>Achievements</li>
              <li>Legacy</li>
              <div>
                <li>More</li>

                <ul className="text-gray-500 ml-10 flex flex-col gap-3 mt-5">
                  <li>Web Workforce</li>
                  <li>Gallery</li>
                </ul>
              </div>
            </ul>
          </div>
          <div className="flex gap-5 justify-between mt-10 opacity-50">
            <img src="/social/insta.svg" alt="" />
            <img src="/social/link.svg" alt="" />
            <img src="/social/dis.svg" alt="" className="w-10" />
            <img src="/social/yuo.svg" alt="" className="w-10" />
          </div>
          <p className="mt-10 text-center text-[10px] font-secondary">
            All rights reserved. © Catalyst IEDC {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
