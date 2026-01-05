"use client";
import { motion } from "framer-motion";

type StatsBarProps = {
  value: number;
  max?: number;
  color?: string;
  label: string;
};

function StatsBar({
  value,
  max = 100,
  color = "bg-red-500",
  label,
}: StatsBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="flex gap-2 items-center z-30">
      <span className="uppercase xl:block hidden text-white text-lg text-shadow">
        {label}
      </span>
      <div className="w-full relative h-[15px] xl:h-[17px] shadow-sm shadow-black bg-black/80 rounded-full text-center overflow-hidden">
        <motion.div
          className={`h-full  ${color} `}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="absolute text-[11px] xl:text-xs xl:translate-x-0 -translate-x-1/2 font-bold text-white left-1/2">
        {value}/{max}
      </p>
    </div>
  );
}

export default StatsBar;
