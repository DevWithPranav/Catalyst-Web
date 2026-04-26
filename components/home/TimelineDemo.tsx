"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Added type definition for the data
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "1994",
    title: "Year of foundation",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c314a85ee8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    year: "2005",
    title: "Global Expansion",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop",
  },
  {
    year: "2018",
    title: "Technological Leap",
    description:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Timeline() {
  // typed the ref
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cast the utility to an HTMLElement array
      const sections = gsap.utils.toArray<HTMLElement>(".timeline-section");

      sections.forEach((section) => {
        // Cast selectors to HTMLElement to satisfy TypeScript
        const bgYear = section.querySelector<HTMLElement>(".bg-year");
        const leftContent = section.querySelector<HTMLElement>(".content-left");
        const rightContent =
          section.querySelector<HTMLElement>(".content-right");
        const centerDot = section.querySelector<HTMLElement>(".center-dot");

        gsap.set(bgYear, { scale: 0.8, opacity: 0, y: 100 });
        gsap.set(leftContent, { x: -50, opacity: 0 });
        gsap.set(rightContent, { x: 50, opacity: 0 });
        gsap.set(centerDot, { scale: 0, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        });

        tl.to(bgYear, {
          scale: 1,
          opacity: 0.15,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
          .to(
            centerDot,
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "<0.2",
          )
          .to(
            leftContent,
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "<0.1",
          )
          .to(
            rightContent,
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "<",
          );

        gsap.to(section, {
          opacity: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "bottom 40%",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0a1118] text-white font-sans overflow-hidden py-32"
    >
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dotted border-slate-600 md:-translate-x-1/2 z-0 opacity-50" />

      {timelineData.map((item, index) => (
        <section
          key={index}
          className="timeline-section relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 w-full max-w-7xl mx-auto"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
            <span className="bg-year text-[35vw] font-black text-slate-400 blur-[8px] select-none tracking-tighter mix-blend-overlay">
              {item.year}
            </span>
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
            <div className="content-left flex-1 w-full pl-12 md:pl-0 text-left md:text-right">
              <h2 className="text-6xl md:text-8xl font-bold mb-2 tracking-tight">
                {item.year}
              </h2>
              <div className="flex flex-col md:items-end">
                <div className="w-16 h-1 bg-blue-500 mb-6 md:ml-auto" />
                <h3 className="text-2xl md:text-3xl text-slate-200 font-medium mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-400 max-w-md text-base md:text-lg leading-relaxed md:ml-auto">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="center-dot absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20 -translate-x-1/2 ring-4 ring-[#0a1118]" />

            <div className="content-right flex-1 w-full pl-12 md:pl-0">
              <div className="relative w-full aspect-[4/3] md:aspect-video rounded-sm overflow-hidden shadow-2xl border border-slate-800/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1118]/60 via-transparent to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full transform scale-105 transition-transform duration-1000 hover:scale-100"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
