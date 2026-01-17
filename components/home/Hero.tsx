"use client";
import Image from "next/image";
import React from "react";
import { Canvas } from "@react-three/fiber";
import LogoContainer from "@/components/LogoContainer";
import { Environment, OrbitControls } from "@react-three/drei";
import { DM_Sans, Darker_Grotesque } from "next/font/google";
import { useWindowSize } from "@/hooks/useWindowSize";

const dm = Darker_Grotesque({ subsets: ["latin"] });

const HeroSection = () => {
  const { width } = useWindowSize();
  return (
    <div>
      <div className="w-screen h-[60vh]  mt-20   overflow-hidden  flex flex-col items-center  px-9 relative lg:h-[60vh] ">
        <Canvas camera={{ position: [0, -55, 110], fov: width < 1024 ? 6 : 4 }}>
          <Environment
            files={[
              "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_09_4k.hdr",
            ]}
          />

          <LogoContainer />
        </Canvas>
      </div>
      <section>
        <div>
          <h1 className="text-white text-[12dvw] font-primary text-center">
            CATALYST{" "}
          </h1>
        </div>
      </section>
      <section>
        <h2 className="text-white/40 text-2xl xl:text-5xl font-primary text-center lg:text-4xl">
          MAR BASELIOS IEDC
        </h2>
      </section>
    </div>
  );
};

export default HeroSection;
