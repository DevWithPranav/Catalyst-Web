"use-client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const ButtonNew = () => {
  return (
    <Button
      className="
    mt-5 flex items-center gap-1
    bg-white px-6 py-3
    text-sm font-medium text-black
    transition-all duration-300
    hover:bg-black hover:text-white hover:shadow-lg
    group
    [&>svg]:h-6 [&>svg]:w-6
  "
    >
      Register Now
      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Button>
  );
};
const Card = () => {
  return (
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
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] text-white flex flex-col items-center gap-2 p-1 h-[60vh] ">
        <div className="relative w-full h-[60vh] rounded-xl overflow-hidden flex items-center justify-center">
          {/* Image layer */}
          <img
            src="/featured.jpg"
            alt="Event"
            className="absolute bottom-0 w-full h-full object-cover z-0 opacity-50"
          />

          {/* Fade gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-between items-center py-6">
            <h1 className="font-primary text-2xl text-white">INCEPTRA VIII</h1>

            <ButtonNew />
          </div>
        </div>
      </div>
    </div>
  );
};
const Card2 = () => {
  return (
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
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] text-white overflow-hidden">
        {/* Image section */}
        <div className="relative w-full h-[260px] overflow-hidden flex items-center justify-center">
          {/* Image layer */}
          <img
            src="/featured.jpg"
            alt="Event"
            className="absolute bottom-0 w-full h-full object-cover opacity-50"
          />

          {/* Fade gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center gap-3">
            {/* your text / button here */}
          </div>
        </div>

        {/* White bottom section */}
        <div className="absolute bottom-0 w-full h-[50px] bg-white text-black flex items-center justify-center font-primary text-center text-sm">
          {" "}
          27th & 28th SEPTEMBER 2025
        </div>
      </div>
    </div>
  );
};
const Events = () => {
  const a = [1, 2];
  return (
    <div>
      <div className="relative h-[50vh] flex items-center justify-center font-primary text-white overflow-hidden">
        {/* Background text */}
        <h1 className="absolute text-5xl  opacity-10 select-none">CATALYST</h1>

        {/* Foreground text */}
        <p className="relative text-lg tracking-wide">NOW HAPPENING</p>
      </div>

      <div className="mx-5">
        <Card />
      </div>
      <p className="relative text-lg tracking-wide text-white font-primary text-center mt-10 mb-5">
        PAST EXPERIENCES
      </p>
      <div className="mx-5 grid grid-cols-1 gap-10">
        {a.map((item, key) => (
          <Card2 key={key} />
        ))}
      </div>
    </div>
  );
};

export default Events;
