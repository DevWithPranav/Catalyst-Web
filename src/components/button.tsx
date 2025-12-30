import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  label: string;
  onClick?: () => void;
  size?: number;
  className?: string;
}

const ArrowButton = ({
  label,
  onClick,
  size = 30,
  className,
}: ArrowButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `
        group
        flex items-center
        rounded-xl
        px-5 py-3
        font-secondary
        font-extrabold text-xl
        bg-white text-black
        transition-all duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        `,
        className
      )}
    >
      <span>{label}</span>

      <ArrowUpRight
        size={size}
        strokeWidth={2.5}
        className="
          transition-transform duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
        "
      />
    </button>
  );
};

export default ArrowButton;
