import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import TimelineDemo from "@/components/home/TimelineDemo";
import Stats from "@/components/home/Stats";
import Events from "@/components/home/Events";
import Pioneers from "@/components/home/Team";
import Connect from "@/components/home/Connect";

const page = () => {

  return (
    <div>
      <Hero />
      <About />
      <TimelineDemo />

      <Stats />
      <Events />
      <Pioneers />
      <Connect />

    </div>
  );
};

export default page;
