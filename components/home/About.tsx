"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
const About = () => {
  const { width } = useWindowSize();
  return (
    <div className="w-screen  mt-52  px-5 relative text-white text-left sm:px-15 ">
      <div>
        <h2 className="text-2xl font-primary mb-3 sm:text-4xl lg:text-5xl ">
          ABOUT US
        </h2>
        <p className="text-sm font-secondary mb-3 leading-loose sm:text-xl lg:text-2xl ">
          Catalyst, the Innovation and Entrepreneurship Development Centre
          (IEDC) of Mar Baselios College of Engineering and Technology, was
          established in 2013 with the vision of nurturing independent,
          future-ready engineers. The Centre exposes students to the world of
          entrepreneurship through innovation, encouraging them to think beyond
          conventional boundaries.
        </p>
        <p className="text-sm font-secondary mb-3 leading-loose sm:text-xl lg:text-2xl lg:mb-7 ">
          Catalyst focuses on sharpening students’ skills, expanding their
          knowledge base, and equipping them with both technical and
          non-technical competencies essential for real-world problem-solving.
        </p>
        <p className="text-sm font-secondary mb-3 leading-loose sm:text-xl lg:text-2xl lg:mb-7">
          Rather than pushing students to launch startups, the Centre believes
          in cultivating an entrepreneurial mindset. Members embrace the joy of
          self-learning and are driven by the passion to transform ideas into
          impactful solutions for the challenges they observe around them.
        </p>
      </div>
    </div>
  );
};

export default About;
