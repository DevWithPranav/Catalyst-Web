import React from "react";
const Card = () => {
  return (
    <div className="text-white">
      <div>
        <img
          className="w-full h-full object-cover"
          src="
      /agni.png"
          alt=""
        />
      </div>
      <div className="sm:mt-5">
        <h1 className="font-primary text-3xl mt-2 sm:text-4xl">2025</h1>
        <p className="font-secondary text-lg mt-[-8] font-semibold sm:text-2xl">
          Catalyst TRIBE x Permute 2025
        </p>
        <p className="font-secondary text-sm mt-2 text-left font-normal text-pretty sm:text-lg">
          The creative team of Catalyst IEDC - TRIBE was the official design
          partner of India’s largest skill festival, Permute 2025 where MBCET
          witnessed history by receiving the µButton for being the first campus
          to hit 2 Million Karma Points.
        </p>
      </div>
    </div>
  );
};
const Team = () => {
  const stats = [1, 2, 5, 6, 9];
  return (
    <div className="">
      <div className="relative h-[50vh] flex items-center justify-center font-primary text-white overflow-hidden mb-[-100]">
        <h1 className="absolute text-5xl opacity-10 select-none sm:text-7xl md:text-8xl lg:text-9xl">
          CATALYST
        </h1>
        <p className="relative text-xl tracking-wide sm:text-2xl md:text-3xl lg:text-4xl">
          ACHIEVEMENTS
        </p>
      </div>
      <div className="mx-7 grid grid-cols-1 gap-10 mt-[-60] mb-10 md:grid-cols-2 sm:mx-10 lg:mx-15 ">
        {stats.map((item, key) => (
          <div>
            <Card key={key} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
