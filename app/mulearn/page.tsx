import React from "react";

const MuLearn = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[50vh] bg-black overflow-hidden">
        <div className="relative">
          <img src="/mu.png" alt="" className="relative z-0" />

          {/* Radial fade */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0) 55%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button className="bg-white text-black px-6 py-2 rounded-full font-secondary mx-auto text-sm font-semibold ">
          Join μlearn
        </button>
        <div>
          <h1 className="text-white font-primary text-3xl mt-5 text-center">
            MULEARN <br></br>MBCET
          </h1>
          <p className="text-white font-secondary text-center text-sm mx-10">
            GTech µLearn is a synergic philosophy of education, with a culture
            of mutual learning through micro peer groups. We are here to assist
            you in breaking through the echo chambers and free you from the
            shackles you have grounded yourself in. And we are one of the
            campuses of the foundation.
          </p>
        </div>
      </div>
      <div className="w-full overflow-hidden bg-white rotate-[-7deg] mt-20 relative py-2">
        <div className="flex whitespace-nowrap animate-marquee  ">
          <p className="font-secondary text-black text-center px-8 font-bold">
            μLearn MBCET
          </p>
          <p className="font-secondary text-black text-center px-8 font-bold">
            μLearn MBCET
          </p>
          <p className="font-secondary text-black text-center px-8 font-bold">
            μLearn MBCET
          </p>
          <p className="font-secondary text-black text-center px-8 font-bold">
            μLearn MBCET
          </p>
          <p className="font-secondary text-black text-center px-8 font-bold">
            μ
          </p>
          <p className="font-secondary text-black text-center px-8 font-bold">
            μLearn MBCET
          </p>
        </div>
      </div>
      <div className="border border0white z-0 relative">
        <div className="bg-[linear-gradient(189.81deg,_#011B7A_15.25%,_#1100D2_37.4%,_#2B20A7_68.93%,_#07005C_102.78%)] w-full h-full rotate-[-7deg] mt-5"></div>
        <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-white">CAMPUS UPDATE</h1>
        </div>
      </div>
    </div>
  );
};

export default MuLearn;
