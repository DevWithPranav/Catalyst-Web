"use client";
import React from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

interface TimelineItemProps {
  year: string;
  content: string;
  width: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  content,
  width,
}) => {
  return (
    <div
      className="relative flex flex-col items-center shrink-0"
      style={{ width }}
    >
      <h1 className="text-white text-2xl font-primary mb-4">{year}</h1>

      <div className="relative h-6 flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.6)] z-10" />
      </div>

      <p className="text-xs md:text-sm font-secondary text-white text-center mt-4 px-4">
        {content}
      </p>
    </div>
  );
};

const Timeline = () => {
  const { width: screenWidth } = useWindowSize();
  function getItemWidth(screenWidth: number) {
    if (screenWidth >= 1280) return 320; // xl
    if (screenWidth >= 1024) return 260; // lg
    if (screenWidth >= 768) return 300; // md
    if (screenWidth >= 640) return 200; // sm
    return 160; // base
  }
  const data = [
    {
      year: "2021",
      content:
        "Catalyst, the Innovation and Entrepreneurship Centre of MBCET, was inaugurated",
    },
    {
      year: "2022",
      content:
        "The Media Lab of the Massachusetts Institute of Technology (MIT) conducted a Design Innovation and DIY Workshop",
    },
    {
      year: "2023",
      content:
        "The MIT Media Lab also organized a Design Thinking and DIY Workshop",
    },
    {
      year: "2024",
      content:
        "The MIT Media Lab also organized a Design Thinking and DIY Workshop",
    },
  ];

  const ITEM_WIDTH = getItemWidth(screenWidth);
  const DOT_CENTER_X = ITEM_WIDTH / 2;

  return (
    <div className="flex flex-col items-center mt-15 md:px-15">
      <h1 className="text-3xl text-white font-primary md:text-4xl">TIMELINE</h1>

      <div className="relative w-full overflow-x-auto">
        <div
          className="relative flex items-start py-12"
          style={{ width: data.length * ITEM_WIDTH }}
        >
          <div
            className="absolute h-[4px] bg-white"
            style={{
              top: 105,
              left: DOT_CENTER_X,
              width: data.length * ITEM_WIDTH - ITEM_WIDTH,
            }}
          />

          {data.map((item, i) => (
            <TimelineItem
              key={i}
              year={item.year}
              content={item.content}
              width={ITEM_WIDTH}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
