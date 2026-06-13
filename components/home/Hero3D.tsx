"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import LogoContainer from "@/components/LogoContainer";
import { Environment } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const Hero3D = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, -55, 110], fov: 4 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      performance={{ min: 0.55 }}
      frameloop="always"
      className="absolute inset-0"
    >
      <Environment
        files={[
          "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_09_2k.hdr",
        ]}
      />
      <Suspense fallback={null}>
        <LogoContainer />
      </Suspense>
    </Canvas>
  );
};

export default Hero3D;
