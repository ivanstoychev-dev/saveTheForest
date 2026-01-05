"use client";

import { useSound } from "@client/context/SoundContext";
import { useCountUp } from "@client/utils/animations";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { tv } from "tailwind-variants";

type CharacterStatsType = {
  icon?: StaticImageData;
  value: number;
  baseValue: number;
  position?: "left" | "right";
};

const statBox = tv({
  slots: {
    container:
      "flex gap-1 w-[70px] z-40 mt-0.5 items-center p-1.5 xl:p-2 justify-center rounded-r-md bg-amber-300 rounded-bl-md shadow-[2px_-2px_10px] transition-all",
    text: "font-bold font-sung text-center text-xs md:text-sm xl:text-lg",
  },
  variants: {
    status: {
      equal: {
        text: "text-black",
        container: "shadow-black/80",
      },
      higher: {
        text: "text-green-600",
        container: "shadow-green-600/80",
      },
      lower: {
        text: "text-red-600",
        container: "shadow-red-600/60",
      },
    },
    position: {
      left: {},
      right: { container: "flex-row-reverse" },
    },
  },
  defaultVariants: {
    status: "equal",
    position: "left",
  },
});

export default function CharacterStats({
  icon,
  value,
  baseValue,
  position,
}: CharacterStatsType) {
  const numericValue = Number(value);
  const numericBase = Number(baseValue);

  const status =
    numericValue > numericBase
      ? "higher"
      : numericValue < numericBase
      ? "lower"
      : "equal";

  const { container, text } = statBox({ status, position });

  const { play } = useSound();

  const animatedNumber = useCountUp(value, 500);

  const lastValue = useRef(baseValue);
  const didMountRef = useRef(false);

  useEffect(() => {
    // Skip first render (so hero switching doesn't trigger sound)
    if (!didMountRef.current) {
      didMountRef.current = true;
      lastValue.current = value;
      return;
    }

    if (value !== lastValue.current) {
      play("points");
      lastValue.current = value;
    }
  }, [value, play]);

  return (
    <div className={container()}>
      {icon && (
        <Image
          alt="icon"
          src={icon}
          width={20}
          height={20}
          className="w-4 xl:w-5 h-auto"
        />
      )}

      <p className={text()}>{animatedNumber}</p>
    </div>
  );
}
