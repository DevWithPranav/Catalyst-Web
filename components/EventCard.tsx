import React from "react";

const EventCard = () => {
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
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] text-white flex flex-col items-center gap-2 px-8 py-12">
        <div className="flex items-center">
          {" "}
          <img src="/log.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
