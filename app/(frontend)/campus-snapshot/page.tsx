"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import localFont from "next/font/local";
import Image from "next/image";

const enigmaFont = localFont({
  src: "../../../public/fonts/enigma.otf",
});

const snapshotData = [
  { label: "Campus Name", value: "MAR BASELIOS COLLEGE OF\nENGINEERING AND TECHNOLOGY" },
  { label: "Rank", value: "#1" },
  { label: "Campus Code", value: "MBT" },
  { label: "Campus Zone", value: "SOUTH ZONE" },
  { label: "Total Karma", value: "4181208" },
  { label: "Total Members", value: "2695" },
];

const CampusSnapshot = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      ".snapshot-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      ".snapshot-line",
      { height: 0 },
      { height: "100%", duration: 1.5, ease: "power3.inOut" },
      "-=0.4"
    ).fromTo(
      ".snapshot-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=1.2"
    );
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-transparent pt-32 pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 relative z-10 flex justify-start">
        <div className="w-full flex flex-col">
          <div className="snapshot-header mb-16">
            <h1 className={`text-[5.5vw] sm:text-5xl md:text-6xl lg:text-[64px] whitespace-nowrap text-white uppercase leading-[1.05] mb-4 tracking-wide ${enigmaFont.className}`}>
              MULEARN MBCET<br/>
              CAMPUS SNAPSHOT
            </h1>
            
            <div className={`flex items-center gap-3 text-gray-400 ${enigmaFont.className} text-sm md:text-base`}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              Live stats from the MuLearn Foundation Platform
            </div>
          </div>

          <div className="relative mt-4 md:mt-8 w-full pl-4 md:pl-8">
            <div className="flex flex-col gap-12 md:gap-16 relative z-10">
              {snapshotData.map((item, index) => (
                <div key={index} className="snapshot-item relative flex items-center gap-8 md:gap-10 group">
                  
                  {/* Connecting Line (Only draw if not the last item) */}
                  {index !== snapshotData.length - 1 && (
                    <div className="absolute left-[18px] md:left-[22px] top-[50%] w-[4px] h-[calc(100%+3rem)] md:h-[calc(100%+4rem)] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] snapshot-line origin-top z-0" />
                  )}

                  {/* Timeline Node */}
                  <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#050505] flex items-center justify-center border-2 border-white/40 text-white shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-white transition-colors duration-300">
                    <span className={`text-sm md:text-base ${enigmaFont.className}`}>μ</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col">
                    <span className={`${enigmaFont.className} font-normal text-white text-base md:text-lg mb-1 drop-shadow-md tracking-tight`}>
                      {item.label}
                    </span>
                    <span className={`font-bold text-white text-2xl md:text-[32px] uppercase leading-tight drop-shadow-lg tracking-wide whitespace-pre-line ${enigmaFont.className}`}>
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Karma Miners Section */}
      <section className="w-full bg-gradient-to-br from-[#0617e1] via-[#050f8f] to-[#040638] pt-24 pb-32 relative mt-32 z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 relative">
          
          <div className="flex flex-col relative z-10 mb-20">
            <h2 className={`text-5xl md:text-6xl text-white uppercase leading-[1.1] tracking-wide ${enigmaFont.className}`}>
              TOP 20<br/>
              KARMA MINERS
            </h2>
          </div>

          {/* Faded Watermark */}
          <div className={`absolute -top-10 right-0 md:right-10 text-[180px] md:text-[250px] text-white/5 font-bold leading-none pointer-events-none select-none ${enigmaFont.className}`}>
            20
          </div>

          <div className="grid grid-cols-6 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16 relative z-10">
            {Array.from({ length: 20 }, (_, i) => {
              const rank = i + 1;
              const name = rank === 1 ? "VEDHA MAHADEVAN" : (rank === 4 ? "AGNIVESH\nPS" : "CHRIS THOMAS\nABRAHAM");
              
              const isTop2 = rank <= 2;

              return (
                <div 
                  key={rank} 
                  className={`flex items-start gap-4 ${isTop2 ? 'md:gap-8 col-span-6 lg:col-span-3' : 'md:gap-4 col-span-6 sm:col-span-3 lg:col-span-2'}`}
                >
                  <div className={`relative shrink-0 bg-white/10 w-20 h-20 ${isTop2 ? 'md:w-36 md:h-36' : ''}`}>
                    <Image 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" 
                      fill 
                      alt={name.replace('\n', ' ')} 
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  
                  <div className="flex flex-col text-white pt-1 overflow-hidden">
                    <div className={`leading-none mb-1 text-white tracking-wide ${enigmaFont.className} text-3xl ${isTop2 ? 'md:text-[44px]' : 'md:text-3xl'}`}>
                      #{rank}
                    </div>
                    <div className={`uppercase leading-[1.1] whitespace-pre-line tracking-wide ${enigmaFont.className} text-sm ${isTop2 ? 'md:text-[22px] mt-1' : 'md:text-base'}`}>
                      {name}
                    </div>
                    <div className={`text-white/80 ${enigmaFont.className} mt-1 tracking-tight truncate text-[10px] ${isTop2 ? 'md:text-[14px]' : 'md:text-xs'}`}>
                      christhomasabraham@mulearn
                    </div>
                    <div className={`leading-none tracking-wider ${enigmaFont.className} text-2xl mt-2 ${isTop2 ? 'md:text-[40px] md:mt-4' : 'md:text-2xl md:mt-2'}`}>
                      70122
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top 5 Interest Groups Section */}
      <section className="w-full bg-transparent pt-24 pb-32 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 relative">
          
          <div className="flex flex-col relative z-10 mb-20">
            <h2 className={`text-[6vw] sm:text-5xl md:text-6xl whitespace-nowrap text-white uppercase leading-[1.1] tracking-wide ${enigmaFont.className}`}>
              TOP 5<br/>
              INTEREST GROUPS
            </h2>
          </div>

          {/* Faded Watermark */}
          <div className={`absolute -top-10 right-0 md:right-10 text-[180px] md:text-[250px] text-white/5 font-bold leading-none pointer-events-none select-none ${enigmaFont.className}`}>
            05
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 relative z-10">
            {Array.from({ length: 5 }, (_, i) => {
              const rank = i + 1;
              return (
                <div key={rank} className="flex flex-col text-white">
                  <div className={`text-4xl md:text-[44px] leading-none mb-1 text-white tracking-wide ${enigmaFont.className}`}>
                    #{rank}
                  </div>
                  <div className={`uppercase leading-[1.1] tracking-wide ${enigmaFont.className} text-xl md:text-[22px] mt-2`}>
                    CYBER SECURITY
                  </div>
                  <div className={`text-xs md:text-[14px] text-white/70 ${enigmaFont.className} mt-1 tracking-tight`}>
                    Members: 428
                  </div>
                  <div className={`text-3xl md:text-[40px] mt-4 leading-none tracking-wider ${enigmaFont.className}`}>
                    165548
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusSnapshot;
