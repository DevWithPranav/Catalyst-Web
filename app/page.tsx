import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import TimelineDemo from "@/components/home/TimelineDemo";
import Stats from "@/components/home/Stats";
import Events from "@/components/home/Events";
const page = () => {
  const stats = [
    { text: 100, id: 1 },
    { text: 200, id: 2 },
    { text: 300, id: 3 },
    { text: 400, id: 4 },
    { text: 500, id: 5 },
    { text: 600, id: 6 },
    { text: 700, id: 7 },
    { text: 800, id: 8 },
    { text: 900, id: 9 },
    { text: 1000, id: 10 },
  ];
  return (
    <div>
      <Hero />
      <About />
      <TimelineDemo />

      <Stats />
      <Events />
    </div>
  );
};

export default page;
