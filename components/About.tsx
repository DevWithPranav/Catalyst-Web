"use client";

import { useWindowSize } from "@/app/hooks/useWindowSize";
const About = () => {
  const { width } = useWindowSize();
  return (
    <div className="w-screen h-[60vh] mt-52  px-5 relative text-white text-left">
      <div>
        <h2 className="text-2xl font-primary mb-3">ABOUT US</h2>
        <p className="text-sm font-secondary">
          The Innovation and Entrepreneurship Development Centre of Mar Baselios
          College of Engineering and Technology, Catalyst was inaugurated in the
          year 2013 with a purpose of inspiring students to become independent
          engineers by exposing then to the world of Entrepreneurship through
          Innovation. The Centre aims in sharpening the skills of students,
          broadening their knowledge base and equipping them with technical and
          non-technical qualities that an engineer need.<br></br>
          Rather than pushing students to startup, the center believes in
          inculcating the spirit in students. The members have identified the
          true joy of self-learning and they passionately involve in bringing
          life into their ideas, to solve the problems that they see around.
        </p>
      </div>
    </div>
  );
};

export default About;
