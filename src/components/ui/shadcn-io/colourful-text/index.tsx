"use client";

import * as React from "react";
import { motion } from "motion/react";

type ColourfulTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
  interval?: number;
  colors?: string[];
  animationDuration?: number;
  staggerDelay?: number;
};

const vibrantRainbow = [
  "rgb(255, 61, 61)", // Red
  "rgb(255, 132, 0)", // Orange
  "rgb(255, 214, 0)", // Yellow
  "rgb(0, 230, 118)", // Green
  "rgb(0, 229, 255)", // Cyan
  "rgb(41, 121, 255)", // Blue
  "rgb(98, 0, 234)", // Indigo
  "rgb(170, 0, 255)", // Violet
  "rgb(255, 0, 200)", // Magenta
  "rgb(255, 64, 129)", // Pink
];

function ColourfulText({
  ref,
  text,
  interval = 5000,
  colors = vibrantRainbow,
  animationDuration = 0.5,
  staggerDelay = 0.05,
  ...props
}: ColourfulTextProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(
    ref as any,
    () => localRef.current as HTMLSpanElement
  );

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, [colors, interval]);

  const characters = React.useMemo(() => text.split(""), [text]);

  return (
    <span ref={localRef} data-slot="colourful-text" {...(props as any)}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: animationDuration,
            delay: index * staggerDelay,
          }}
          className="inline-block whitespace-pre font-primary tracking-tight will-change-transform will-change-opacity will-change-filter"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export { ColourfulText, type ColourfulTextProps };
