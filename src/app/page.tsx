import React from "react";

const page = () => {
  return (
    <div>
      <section className="flex items-center  text-center justify-center ">
        <div className="flex flex-col items-center gap-5 my-44">
          <img src="/hero_logo.png" alt="" className="w-45 h-40" />
          <h1 className="text-3xl font-bold font-primary">
            CATALYST
            <br /> MAR BASELIOS IEDC
          </h1>
        </div>
      </section>

      <section className="flex items-center  text-center justify-center ">
        <div className="flex flex-col items-center gap-5 my-44">
          <p>Building</p>
          <h1 className="text-2xl font-bold font-primary">
            A LEGACY OF INNOVATION AND ENTREPRENEURSHIP
          </h1>
        </div>
      </section>
    </div>
  );
};

export default page;
