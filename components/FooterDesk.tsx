import React from "react";

const FooterDesk = () => {
  return (
    <div className="relative rounded-2xl p-[0.5px] md:mx-15 mb-5">
      {/* Border gradient */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(225.38deg, #FFFFFF 1.29%, rgba(255,255,255,0) 28.3%, #FFFFFF 91.9%)",
        }}
      />

      {/* Content */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] overflow-hidden h-[280px]">
        {/* CENTER CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-white font-primary text-xl md:text-2xl">
            CATALYST MAR BASELIOS IEDC
          </h1>

          <div className="flex gap-10 mt-4 opacity-100 items-center justify-center">
            <img src="/social/insta.svg" alt="Instagram" className="w-6 h-6" />
            <img src="/social/link.svg" alt="LinkedIn" className="w-6 h-6" />
            <img src="/social/dis.svg" alt="Discord" className="w-8 h-8" />
            <img src="/social/yuo.svg" alt="YouTube" className="w-8 h-8" />
          </div>
        </div>

        {/* GHOST TEXT + RIGHTS */}
        <div
          className="
            absolute bottom-[-12%] left-0 w-full
            flex items-center justify-center
            pointer-events-none
          "
        >
          {/* Ghost CATALYST */}
          <h1
            className="
              text-[6.2rem] font-primary text-center
              leading-none
              opacity-5
              text-white
              select-none
            "
          >
            CATALYST
          </h1>

          {/* Rights text centered ON CATALYST */}
          <p
            className="
              absolute
              text-[13px] font-secondary
              text-white/70
              text-center
              mb-5
            "
          >
            All rights reserved. © Catalyst IEDC {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterDesk;
