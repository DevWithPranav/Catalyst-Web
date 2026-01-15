"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  MotionValue,
  Transition,
} from "motion/react";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
  centerSymbolSize?: number;
  size?: number;
  whiteOffset?: number;
}

const getRotationTransition = (
  duration: number,
  from: number,
  loop: boolean = true
) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  centerSymbolSize = 48,
  size = 200,
  whiteOffset = 15,
}) => {
  /* ✅ ALL HOOKS MUST BE CALLED FIRST */
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [mounted, spinDuration, text, onHover, controls, rotation]);

  /* ✅ Guard AFTER hooks */
  if (!mounted) return null;

  const letters = Array.from(text);

  const handleHoverStart = () => {
    const start = rotation.get();

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <div className="relative">
      <motion.div
        className={`relative rounded-full font-black text-white text-center cursor-pointer origin-center bg-black ${className}`}
        style={{
          rotate: rotation,
          width: size,
          height: size,
        }}
        initial={{ rotate: 0 }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {letters.map((letter, i) => {
          const angle = (2 * Math.PI * i) / letters.length;
          const radius = size / 2 - whiteOffset - 12;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const rotationDeg = (360 / letters.length) * i;

          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] select-none"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>

      {/* Center symbol */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white"
        style={{ fontSize: centerSymbolSize }}
      >
        μ
      </div>
    </div>
  );
};

export default CircularText;
