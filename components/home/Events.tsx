import React from "react";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const Events = () => {
  return (
    <div className="text-white mx-5">
      <h1 className="text-3xl text-center font-primary mt-20 mb-6">EVENTS</h1>
      <p className="text-left text-secondary mb-6">
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
      <Button className="mt-5 bg-white text-black ">
        View All Events <ArrowUpRight className="ml-[-8]" />
      </Button>
    </div>
  );
};

export default Events;
