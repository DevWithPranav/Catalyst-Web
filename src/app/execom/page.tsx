import React from "react";
import { Instagram, Linkedin } from "lucide-react";
const HeaderOne = ({ name, position, socials }: any) => {
  return (
    <div>
      <div className="bg-white w-52 h-52 mx-auto"></div>
      <h2 className="text-center text-xl w-4/6 mx-auto mt-5  font-primary">
        {name}
      </h2>
      <p className="text-center text-sm w-4/6 mx-auto ">{position}</p>
      <div className="flex gap-2 mt-2 items-center justify-center">
        {socials.map((social: any) => social.icon)}
      </div>
    </div>
  );
};
const SubCore = ({ name, position, socials }: any) => {
  return (
    <div>
      <div className="bg-white w-40 h-40 mx-auto"></div>
      <h2 className="text-center text-sm w-4/6 mx-auto mt-5  font-primary">
        {name}
      </h2>
      <p className="text-center text-[12px] w-4/6 mx-auto ">{position}</p>
      <div className="flex gap-2 mt-2 items-center justify-center">
        {socials.map((social: any) => social.icon)}
      </div>
    </div>
  );
};
const page = () => {
  const execom = [
    {
      name: "Sabareesh",
      position: "Chief Operations Officer",
      socials: [
        {
          name: "Instagram",
          icon: <Instagram />,
        },
        {
          name: "Linkedin",
          icon: <Linkedin />,
        },
      ],
    },
    {
      name: "Anvith",
      position: "Chief Technology Officer",
      socials: [
        {
          name: "Instagram",
          icon: <Instagram />,
        },
        {
          name: "Linkedin",
          icon: <Linkedin />,
        },
      ],
    },
  ];
  return (
    <div>
      <section>
        <h1 className="text-center text-3xl w-5/6 mx-auto mt-16 mb-16">
          THE CATALYST FAMILY
        </h1>
        <div className="grid grid-cols-1 gap-20">
          {execom.map((execom: any) => (
            <HeaderOne
              name={execom.name.toUpperCase()}
              position={execom.position}
              socials={execom.socials}
            />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-center text-2xl w-5/6 mx-auto mt-16 mb-16">
          SUB-CORE
        </h1>
        <div className="grid grid-cols-2 gap-4 mx-5">
          {execom.map((execom: any) => (
            <SubCore
              name={execom.name.toUpperCase()}
              position={execom.position}
              socials={execom.socials}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
