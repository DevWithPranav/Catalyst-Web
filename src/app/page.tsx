import React from "react";
import HorizontalScroll from "../components/scroll";
import Card from "../components/card";
const page = () => {
  return (
    <div>
      <section className="flex items-center  text-center justify-center ">
        <div className="flex flex-col items-center gap-5 my-44">
          <img src="/hero_logo.png" alt="" className="w-45 h-40" />
          <h1 className="text-3xl font-bold font-primary">
            CATALYST
            <br /> MAR BASELIOS IEDCs
          </h1>
        </div>
      </section>

      <section className="flex items-center  text-center justify-center h-screen">
        <div className="flex flex-col items-center gap-5">
          <p>Building</p>
          <h1 className="text-2xl font-bold font-primary">
            A LEGACY OF INNOVATION AND ENTREPRENEURSHIP
          </h1>
        </div>
      </section>

      <section className=" px-8 mb-40">
        <h3 className="text-2xl font-bold font-primary text-left ">ABOUT US</h3>
        <p className="text-left">
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

      <section className="mt-40 mx-7">
        <h2 className="text-2xl font-primary text-center mb-7">
          CATALYST MATRIX
        </h2>
        <Card />
      </section>
    </div>
  );
};

export default page;
