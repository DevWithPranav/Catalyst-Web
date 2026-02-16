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
      <h1 className="text-white text-2xl font-primary mb-4 sm:text-3xl">
        {year}
      </h1>

      <div className="relative h-6 flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_10px_4px_rgba(255,255,255,0.6)] z-10" />
      </div>

      <p className="text-xs md:text-sm font-secondary text-white text-center mt-4 px-4 sm:text-lg">
        {content}
      </p>
    </div>
  );
};

const Timeline = () => {
  const { width: screenWidth } = useWindowSize();

  // ✅ Prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function getItemWidth(width: number) {
    if (width >= 1280) return 300; // xl
    if (width >= 1024) return 300; // lg
    if (width >= 768) return 300; // md
    if (width >= 640) return 350; // sm
    return 200; // base
  }

  function getLineHeight(width: number) {
    if (width >= 1280) return 109; // xl
    if (width >= 1024) return 110; // lg
    if (width >= 768) return 109; // md
    if (width >= 640) return 109; // sm
    return 105; // base
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

  const ITEM_WIDTH = getItemWidth(screenWidth ?? 1024);
  const DOT_CENTER_X = ITEM_WIDTH / 2;

  return (
    <div className="flex flex-col items-center mt-15 md:px-15 sm:pl-10 lg:mt-50">
      <h1 className="text-3xl text-white font-primary md:text-4xl sm:text-4xl">
        TIMELINE
      </h1>

      <div className="relative w-full overflow-x-auto">
        <div
          className="relative flex items-start py-12"
          style={{ width: data.length * ITEM_WIDTH }}
        >
          <div
            className="absolute h-[4px] bg-white"
            style={{
              top: getLineHeight(screenWidth ?? 1024),
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
