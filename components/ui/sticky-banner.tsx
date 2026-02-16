"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import useNavbarStore from "@/app/utils/useNavbarStore";

export const StickyBanner = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { isOpen } = useNavbarStore();

  return (
    <motion.div
      className={cn(
        "fixed top-16 left-0 right-0 z-[350] w-full overflow-hidden bg-white py-1 text-black font-secondary",
        className
      )}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: isOpen ? -100 : 0,
        opacity: isOpen ? 0 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block px-4 text-black font-medium">
          {children}
        </span>
        <span className="inline-block px-4 text-black font-medium">
          {children}
        </span>
        <span className="inline-block px-4 text-black font-medium">
          {children}
        </span>
        <span className="inline-block px-4 text-black font-medium">
          {children}
        </span>
        <span className="inline-block px-4 text-black font-medium">
          {children}
        </span>
      </motion.div>
    </motion.div>
  );
};
