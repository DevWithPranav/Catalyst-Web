"use client";

import React from "react";

/* ---------------- SKELETON COMPONENTS ---------------- */

const CardSkeleton = () => (
  <div className="flex flex-col items-center text-center animate-pulse">
    <div className="relative">
      <div className="w-50 h-50 bg-gray-700" />
    </div>
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="h-6 w-32 bg-gray-700 rounded mb-2" />
      <div className="h-4 w-24 bg-gray-600 rounded mb-3" />
      <div className="mt-3 flex gap-5">
        <div className="w-5 h-5 bg-gray-700 rounded-full" />
        <div className="w-5 h-5 bg-gray-700 rounded-full" />
      </div>
    </div>
  </div>
);

const CardSkeletonInvert = () => (
  <div className="flex flex-col items-center text-center animate-pulse">
    <div className="relative">
      <div className="w-50 h-50 bg-gray-300" />
    </div>
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-24 bg-gray-400 rounded mb-3" />
      <div className="mt-3 flex gap-5">
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>
    </div>
  </div>
);

/* ---------------- CARD ---------------- */

const Card = ({ invert = false, data = null, loading = true }) => {
  const bgClass = invert ? "bg-black" : "bg-white";
  const textClass = invert ? "text-black" : "text-white";

  if (loading) {
    return invert ? <CardSkeletonInvert /> : <CardSkeleton />;
  }

  return (
    <div className={`flex flex-col items-center text-center ${textClass}`}>
      <div className="relative">
        <div className={`${bgClass} w-50 h-50 overflow-hidden`} />
        <div className="absolute bottom-0 left-0">
          <img
            src={data?.image ?? "/sab.png"}
            alt={data?.name ?? ""}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-primary text-2xl mt-5">
          {data?.name ?? "SABAREESH"}
        </h2>
        <p className="font-secondary text-sm">
          {data?.role ?? "Chief Operations Officer"}
        </p>
        <div className="mt-3 flex gap-5">
          <img src="/social/insta.svg" alt="Instagram" className="w-5" />
          <img src="/social/link.svg" alt="LinkedIn" className="w-5" />
        </div>
      </div>
    </div>
  );
};

/* ---------------- EXECOM ---------------- */

const Execom = () => {
  // Simulate loading state — replace with real API state
  const isLoading = true;

  // Simulated API shape — replace with real fetch
  const featured = null;
  const legacyLeaders = [null, null, null, null];
  const coreTeam = [null, null, null, null, null, null];

  return (
    <div>
      {/* ── HERO TITLE ── */}
      <div className="relative h-[50vh] flex items-center justify-center font-primary text-white overflow-hidden">
        <h1 className="absolute text-5xl opacity-10 select-none sm:text-7xl md:text-8xl lg:text-9xl">
          CATALYST
        </h1>
        <p className="relative text-xl tracking-wide sm:text-2xl md:text-3xl lg:text-4xl">
          THE CATALYST FAMILY
        </p>
      </div>

      {/* ── FEATURED LEAD ── */}
      <div className="flex justify-center mt-[-40px]">
        <Card loading={isLoading} data={featured} invert={false} />
      </div>

      {/* ── CORE TEAM ── */}
      <div className="mt-20 mx-5">
        <h2 className="font-primary text-xl text-white text-center mb-10 sm:text-2xl md:text-3xl">
          CORE TEAM
        </h2>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {coreTeam.map((member, index) => (
            <Card
              key={index}
              loading={isLoading}
              data={member}
              invert={false}
            />
          ))}
        </div>
      </div>

      {/* ── LEGACY LEADERS ── */}
      <div className="bg-white pt-10 mt-20 mx-5 pb-10">
        <h2 className="font-primary text-xl mt-5 text-black text-center mb-10 sm:text-2xl md:text-3xl">
          LEGACY LEADERS
        </h2>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {legacyLeaders.map((member, index) => (
            <Card key={index} loading={isLoading} data={member} invert={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Execom;
