"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import localFont from 'next/font/local';
import WatermarkHeader from '@/components/home/WatermarkHeader';
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const enigma = localFont({
  src: "../../../../public/fonts/MonumentExtended-Ultrabold.otf",
  weight: "100",
  style: "normal",
  display: "swap",
});

const poppins = localFont({
  src: "../../../../public/fonts/Poppins-Regular.ttf",
  display: "swap",
});

const ExecomMember = ({
  name,
  title,
  subtitle,
  instagram = "#",
  linkedin = "#",
}: {
  name: string;
  title: string;
  subtitle?: string;
  instagram?: string;
  linkedin?: string;
}) => {
  return (
    <div className="team-member-card flex flex-col group w-[160px] md:w-[200px]">
      {/* Image area with white bg only on bottom half */}
      <div className="w-full aspect-[3/4] relative overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
        {/* White background - bottom half only */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
        <Image
          src="/sab.png"
          alt={name}
          fill
          className="object-cover object-top relative z-10"
        />
      </div>

      {/* Text section - no background, sits on page */}
      <div className="flex flex-col items-center px-2 pt-3 pb-2 gap-0.5">
        {/* Name */}
        <h3 className={`${enigma.className} text-white text-xs md:text-sm uppercase tracking-wider text-center leading-tight`}>
          {name}
        </h3>

        {/* Role */}
        <p className={`${poppins.className} text-gray-300 text-[11px] md:text-xs text-center`}>
          {title}
        </p>

        {/* Subtitle / Year */}
        {subtitle && (
          <p className={`${poppins.className} text-gray-500 text-[10px] md:text-[11px] text-center mb-1`}>
            {subtitle}
          </p>
        )}

        {/* Socials */}
        <div className="flex gap-3 items-center justify-center mt-2">
          <Link href={instagram} className="text-gray-400 hover:text-white transition-colors">
            <FaInstagram className="w-3.5 h-3.5" />
          </Link>
          <Link href={linkedin} className="text-gray-400 hover:text-white transition-colors">
            <FaLinkedinIn className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};


const MuLearnExecom = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(
      ".nh-watermark",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      ".nh-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    ).fromTo(
      ".team-member-card",
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.1 },
      "-=0.4"
    );
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-transparent pb-16 relative px-5 sm:px-10 lg:px-20 pt-40">
      <WatermarkHeader 
        title="MULEARN WORKFORCE"
        watermark="MULEARN"
        titleClassName={`${enigma.className} nh-title drop-shadow-lg !text-[4vw] md:text-4xl lg:text-5xl`}
        watermarkClassName={`${enigma.className} nh-watermark tracking-[1em] !text-[12vw] md:!text-[12vw] lg:!text-[12vw]`}
      />

      <div className="w-full px-5 sm:px-10 lg:px-20 relative z-10 flex flex-col items-center mt-16 md:mt-24">

        {/* Row 1 (2 items) */}
        <div className="flex justify-center gap-8 md:gap-24 mb-12 md:mb-16 w-full">
          <ExecomMember name="SABAREESH" title="Chief Nodal Officer" subtitle="Nodal Officer, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Nodal Officer" subtitle="Nodal Officer, 2024" />
        </div>

        {/* Row 2 (4 items) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 lg:gap-12 mb-12 md:mb-16 w-full max-w-5xl justify-items-center">
          <ExecomMember name="SABAREESH" title="Chief Executive Officer" subtitle="CEO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Operations Officer" subtitle="COO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Skill Officer" subtitle="CSO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Technical Officer" subtitle="CTO, 2024" />
        </div>

        {/* Row 3 (4 items) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 lg:gap-12 w-full max-w-5xl justify-items-center">
          <ExecomMember name="SABAREESH" title="Chief Marketing Officer" subtitle="CMO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Creative Officer" subtitle="CCO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Finance Officer" subtitle="CFO, 2024" />
          <ExecomMember name="SABAREESH" title="Chief Vibe Officer" subtitle="CVO, 2024" />
        </div>
      </div>
    </div>
  );
};

export default MuLearnExecom;
