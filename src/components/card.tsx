import React from "react";
import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";

<CountingNumber
  number={42069}
  inView={true}
  transition={{ stiffness: 100, damping: 30 }}
/>;
const Card = () => {
  const data = [
    { title: 20, description: "Startups" },
    { title: 5000, description: "Mentors" },
    { title: 20, description: "Events" },
    { title: 20, description: "Events" },
  ];

  return (
    <div className=" grid grid-cols-1 gap-8">
      {data.map((item, i) => (
        <div
          key={i}
          className="relative p-[1px] rounded-2xl
          bg-[linear-gradient(10deg,rgba(255,255,255,0.6),rgba(255,255,255,0),rgba(255,255,255,0.6))]"
        >
          <div
            className="rounded-2xl p-12
            bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B]
            flex flex-col items-center gap-2"
          >
            <h1 className="text-5xl font-bold font-primary">
              <CountingNumber
                number={item.title}
                inView={true}
                transition={{ stiffness: 100, damping: 10 }}
              />
              +
            </h1>
            <p className="text-xl font-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
