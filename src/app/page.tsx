import React from "react";
import HorizontalScroll from "../components/scroll";
import Card from "../components/card";
import TypingText from "@/components/ui/shadcn-io/typing-text";
import { RippleButton } from "@/components/ui/shadcn-io/ripple-button";
import { ColourfulText } from "@/components/ui/shadcn-io/colourful-text";
import HorizontalScrollCards from "../components/horizontalScroll";
import ContactCard from "../components/contactCard";
import ArrowButton from "../components/button";
const page = () => {
  return (
    <div>
      <section className="flex flex-col items-center text-center justify-center  h-[85vh]">
        <img
          src="/hero_logo.png"
          alt="catalyst logo"
          className="w-60 h-60 mb-5"
        />
        <h1 className="text-3xl font-bold font-primary">CATALYST</h1>
        <h2 className="text-3xl font-bold font-primary">
          MAR BASELIOS <br></br>IEDC
        </h2>
      </section>

      <section className="flex items-center  text-center justify-center ">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-xl font-secondary">Building</p>
          <div className="flex flex-wrap items-center  text-2xl font-bold font-primary text-center justify-center mx-10">
            <h1 className="text-center">
              A LEGACY OF INNOVATION AND ENTREPRENEURSHIP
            </h1>
          </div>
        </div>
      </section>

      <section className=" px-8 mb-40 mt-52">
        <h3 className="text-2xl font-bold font-primary text-left ">ABOUT US</h3>
        <p className="text-left ">
          The Innovation and Entrepreneurship Development Centre of Mar Baselios
          College of Engineering and Technology, Catalyst was inaugurated in the
          year 2013 with a purpose of inspiring students to become independent
          engineers by exposing then to the world of Entrepreneurship through
          Innovation. The Centre aims in sharpening the skills of students,
          broadening their knowledge base and equipping them with technical and
          non-technical qualities that an engineer need. Rather than pushing
          students to startup, the center believes in inculcating the spirit in
          students. The members have identified the true joy of self-learning
          and they passionately involve in bringing life into their ideas, to
          solve the problems that they see around.
        </p>
      </section>
      <section>
        <h3 className="text-4xl font-bold font-primary text-center mb-5 ">
          TIMELINE
        </h3>
        <HorizontalScroll />
      </section>

      <section className="mt-28 mx-7">
        <h2 className="text-2xl font-primary text-center mb-7">
          CATALYST MATRIX
        </h2>
        <Card />
      </section>

      <section className="mt-28 mx-7">
        <h2 className="text-2xl font-primary text-left mb-4 ">THE EVENTS</h2>
        <p className="text-left">
          Catalyst events is a platform for students to showcase their ideas and
          projects{" "}
        </p>
        <HorizontalScrollCards />
        <div className="mt-7">
          <ArrowButton label="Events" />
        </div>
      </section>

      <section className="mt-28 mx-7">
        <h2 className="text-2xl font-primary text-left mb-4 ">THE PIONEERS</h2>
        <p className="text-left">
          Catalyst is a hub of innovation and entrepreneurship, where students
          are encouraged to explore their ideas and turn them into reality.
        </p>
        <HorizontalScrollCards />
      </section>

      <section className="flex items-center  text-center justify-center mt-32 mb-32 ">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-xl font-secondary">Your life's best choice</p>
          <div className="flex flex-wrap items-center  text-2xl font-bold font-primary text-center justify-center mx-10">
            <h1 className="text-center">
              MORE THAN JUST A CENTRE, WE ARE A FAMILY
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-28 mx-7">
        <h2 className="text-2xl font-primary mb-7">OUR TEAM</h2>
        <p className="text-left">
          Catalyst events is a platform for students to showcase their ideas and
          projects{" "}
        </p>
        <div className="mt-7">
          <ArrowButton label="Execom" />
        </div>
      </section>

      <section className="mt-28 mx-7">
        <ContactCard />
      </section>
    </div>
  );
};

export default page;
