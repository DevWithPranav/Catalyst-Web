"use client";
import React from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import CircularText from "@/components/ui/shadcn-io/circular-text/circularText";

const Tilted = () => {
  return (
    <div className="w-full  overflow-hidden bg-white skew-y-[-10deg]  relative py-2">
      <div className="flex whitespace-nowrap animate-marquee  ">
        <p className="font-secondary text-black text-center px-8 font-bold">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="mx-8 text-black text-lg font-semibold">
              {` μLearn MBCET `}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="max-w-[300px] mx-auto flex">
      <div className=" w-15">
        <img src="/MuButton.svg" alt="" />
      </div>
      <div className="ml-5">
        <h1 className="text-white font-primary text-2xl  text-left ">#1</h1>
        <h1 className="text-white font-primary mt-5 text-left text-3xl ">
          THE BEST COLLEGE
        </h1>
        <p className="text-white font-secondary text-left  text-sm ">
          We are Proud toppers in Gtech Mulearn
        </p>
      </div>
    </div>
  );
};

const MuLearn = () => {
  const stats = [1, 2, 3];
  const { width } = useWindowSize();

  return (
    <div>
      <div className="relative flex flex-col items-center justify-start h-[100vh] sm:h-[40vh] bg-black overflow-hidden">
        {/* Background image and gradient layer */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/mu.png"
            alt=""
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-20"
          />

          {/* Radial fade from bottom */}
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
            }}
          />
        </div>

        {/* Content layer - positioned above background */}
        <div className="relative z-[10] flex flex-col items-center justify-center gap-4 h-full px-4 mt-20">
          <h1 className="text-white font-primary text-3xl text-center sm:text-4xl">
            MULEARN FOUNDATION
          </h1>
          <div>
            <p className="text-white font-secondary text-center text-sm mx-5 text-pretty sm:text-md sm:mx-10">
              GTech µLearn is a synergic philosophy of education, with a culture
              of mutual learning through micro peer groups. We are here to
              assist you in breaking through the echo chambers and free you from
              the shackles you have grounded yourself in. And we are one of the
              campuses of the foundation.
            </p>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-secondary text-sm font-semibold">
            Join μlearn
          </button>
        </div>
      </div>

      <div className="  flex flex-col gap-2 mt-[-150] sm:mt-[-50] relative z-20">
        <Tilted />
        <div>
          <div className="w-full overflow-hidden bg-[linear-gradient(189.81deg,_#011B7A_15.25%,_#1100D2_37.4%,_#2B20A7_68.93%,_#07005C_102.78%)] skew-y-[-10deg] ">
            <div className="skew-y-[10deg] w-full mx-auto mt-20 flex flex-col items-center">
              <div className="mx-auto text-center relative">
                {/* Heading */}
                <h1 className=" z-10 text-white font-primary text-3xl text-center mx-8 sm:text-7xl">
                  CAMPUS
                </h1>
                <h1 className="z-10 text-white font-primary text-3xl text-center mx-8 sm:text-7xl">
                  STATISTICS
                </h1>
                <div className="absolute top-0 right-0 z-20 mt-[-45] mr-[-50] sm:mr-[-80]">
                  <CircularText
                    text=" MBCET • MBCET • MBCET • "
                    spinDuration={20}
                    onHover="speedUp"
                    className="text-white scale-80 "
                    centerSymbolSize={23}
                    size={100}
                    whiteOffset={1}
                  />
                </div>
              </div>
              <div className="relative max-w-[300px] mx-auto mt-20 mb-20 ">
                {/* Vertical connecting line */}
                <div
                  className="
    absolute left-[17px] top-0 bottom-[130px] w-[5px] bg-white z-0
    shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]
  "
                />

                {/* Stats stay in normal flow */}
                <div className="relative z-10 flex flex-col gap-20">
                  {stats.map((stat, index) => (
                    <Stats key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tilted />
      </div>

      <div>
        <div className="text-white font-primary text-3xl text-center mx-10 mt-20 ">
          <h1>JOIN OUR DISCORD SERVER</h1>
          <p className="font-secondary text-center text-sm mx-5 mt-3">
            Here, you can find more about our campus events, tasks and many more
            interesting easter eggs!
          </p>
        </div>
        <div className="mt-5 mr-2 mb-[-20] ">
          <img src="/dis.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MuLearn;
