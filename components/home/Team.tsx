import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
const ButtonNew = () => {
  return (
    <Button
      className="
    mt-5 flex items-center gap-1
    bg-white px-6 py-3
    text-sm font-medium text-black
    transition-all duration-300
    hover:bg-black hover:text-white hover:shadow-lg
    group
    [&>svg]:h-6 [&>svg]:w-6
  "
    >
      Execom
      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Button>
  );
};
const Pioneers = () => {
  return (
    <div className="text-white mx-5">
      <h1 className="text-xl font-primary mb-3 text-left text-white  mt-35">
        OUR TEAM
      </h1>
      <p className="text-left text-secondary mb-3 ">
        Catalyst is more than a team; it is a dynamic ecosystem of innovation
        and entrepreneurship. We are a passionate community of young minds
        united by a shared vision: transforming ideas into meaningful impact.
      </p>
      <p className="text-left text-secondary mb-3 mt-7">
        We believe every engineer holds the potential to innovate. Our role is
        to nurture that spirit by creating opportunities to explore, experiment,
        and evolve.
      </p>
      <p className="text-left text-secondary mb-3 mt-7">
        Built on the principles of collaboration and mutual growth, our team
        brings together diverse talents: from technical problem-solvers to
        creative thinkers. Together, we foster a supportive environment where
        ideas are encouraged, challenges are embraced, and solutions are
        co-created.
      </p>
      <ButtonNew />
    </div>
  );
};

export default Pioneers;
