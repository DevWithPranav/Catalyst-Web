import React from "react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const ButtonNew = () => {
  return (
    <Button
      className="
    mt-5 flex items-center gap-1
    bg-white px-6 py-3
    text-sm font-medium text-black
    transition-all duration-300
    hover:bg-black hover:text-white hover:shadow-lg
    group
    [&>svg]:h-6 [&>svg]:w-6
  "
    >
      Events
      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Button>
  );
};
const Events = () => {
  return (
    <div className="text-white mx-5">
      <h1 className="text-3xl text-center font-primary mt-20 mb-6">EVENTS</h1>
      <p className="text-left text-secondary mb-6 mx-2">
        Catalyst is a vibrant hub where ideas are sparked and transformed into
        action. Our events create meaningful opportunities for students to
        learn, collaborate, and grow beyond the classroom. We believe learning
        should extend past textbooks. Through hands-on sessions, talks, and
        collaborative experiences, our events offer practical exposure that
        inspires innovation and real-world thinking.
      </p>
      <div className="grid grid-cols-1 gap-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <ButtonNew />
    </div>
  );
};

export default Events;
