import WatermarkHeader from "@/components/home/WatermarkHeader";
import React from "react";

const achievementsData = [
  {
    year: "2025",
    title: "Catalyst TRIBE x Permute 2025",
    description:
      "The creative team of Catalyst IEDC - TRIBE was the official design partner of India's largest skill festival, Permute 2025 where MBCET witnessed history by receiving the µButton for being the first campus to hit 2 Million Karma Points.",
    image: "/agni.png",
  },
  {
    year: "2025",
    title: "First Campus to reach 2 Million Karma Points in µLearn Foundation.",
    description:
      "Received the Purple µButton Award from Hon. Chief Minister of Kerala, Shri. Pinarayi Vijayan during Permute 2025: India's Largest Skill Festival on 29th March 2025.",
    image: "/agni.png",
  },
];

const Card = ({ year, title, description, image }: any) => {
  return (
    <div className="text-white flex flex-col group h-full cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden mb-4 md:mb-6">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={image}
          alt={title}
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h1 className="font-primary text-3xl sm:text-4xl md:text-[40px] mb-2 text-white">
          {year}
        </h1>
        <p className="font-secondary text-base sm:text-lg md:text-xl font-semibold mb-3 text-white">
          {title}
        </p>
        <p className="font-secondary text-sm sm:text-base md:text-[15px] font-normal text-zinc-400 text-pretty leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="w-full overflow-hidden pt-16 md:pt-4 pb-10">
      <WatermarkHeader
        title="ACHIEVEMENTS"
        watermark="CATALYST"
        titleClassName="nh-title"
        watermarkClassName="nh-watermark"
      />

      {/* Responsive Grid */}
      <div className="mx-5 sm:mx-10 lg:mx-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-20 -mt-2 lg:-mt-6">
        {achievementsData.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Team;
