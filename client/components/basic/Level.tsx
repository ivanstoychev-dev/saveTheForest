"use client";
import { cn } from "@client/utils/cn";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef } from "react";

type LevelProps = {
  intensity: string;
  heroesImg: string | StaticImageData;
  monsterImg: string | StaticImageData;
  desc?: React.ReactNode;
  className?: string;
};

const Level = ({
  intensity,
  heroesImg,
  monsterImg,
  desc,
  className,
}: LevelProps) => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/hover.mp3");
    audio.volume = 0.2;
    hoverSound.current = audio;

    return () => {
      // cleanup audio on unmount
      hoverSound.current?.pause();
      hoverSound.current = null;
    };
  }, []);

  return (
    <div
      onMouseEnter={() => hoverSound.current?.play()}
      className={cn(
        "relative overflow-hidden flex cursor-pointer hover:scale-110 hover:z-30 transition-all duration-500 hover:border-black bg-black w-full border-2 border-whitesmoke p-5 justify-center items-center text-center font-sung",
        className
      )}
    >
      <p
        className={`absolute w-full transform rotate-[-16deg] text-[150px] capitalize opacity-20 ${
          intensity === "easy" ? "text-green-600" : "text-red-600"
        }`}
      >
        {intensity}
      </p>
      <Image
        width={200}
        className="w-[140px] h-auto"
        src={heroesImg}
        alt="heroes"
      />
      <p className="z-20 text-shadow transition-all duration-150 text-white max-w-[700px] px-10 text-xl">
        {desc}
      </p>
      <Image src={monsterImg} alt="monster" className="w-[140px]" />
    </div>
  );
};

export default Level;
