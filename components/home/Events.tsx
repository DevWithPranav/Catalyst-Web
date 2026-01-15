import React from "react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
const ButtonNew = () => {
  return (
    <Button
      className="
    mt-5 flex items-center gap-1
    bg-white px-6 py-3
    text-sm font-secondary text-black
    transition-all duration-300
    hover:bg-black hover:text-white hover:shadow-lg
    group
    [&>svg]:h-10 [&>svg]:w-10
    md:text-2xl md:mt-10 md:px-7 md:py-7
  "
    >
      Events
      <img
        src="/right.svg"
        alt=""
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ml-1 w-3 h-3 md:w-5 md:h-5"
      />
    </Button>
  );
};
const Events = () => {
  return (
    <div className="text-white mx-5 md:px-9">
      <h1 className="text-3xl text-center font-primary mt-20 mb-6 md:text-5xl">
        EVENTS
      </h1>
      <p className="text-left font-secondary mb-6 mx-2 leading-loose md:text-2xl ">
        Catalyst is a vibrant hub where ideas are sparked and transformed into
        action. Our events create meaningful opportunities for students to
        learn, collaborate, and grow beyond the classroom. We believe learning
        should extend past textbooks. Through hands-on sessions, talks, and
        collaborative experiences, our events offer practical exposure that
        inspires innovation and real-world thinking.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-7  ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <div className="">
        <ButtonNew />
      </div>
    </div>
  );
};

export default Events;
