"use client";

import ButtonLink from "@client/components/basic/ButtonLink";
import { useCharacters } from "@client/context/CharactersContext";
import { useNavigation } from "@client/context/NavContext";
import { useSound } from "@client/context/SoundContext";
import winImage from "@images/win.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Win() {
  const { play } = useSound();
  const { allowed, reset } = useNavigation();
  const { resetHeroes } = useCharacters();
  const router = useRouter();

  useEffect(() => {
    play("win");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!allowed) {
      router.replace("/"); // redirect if not allowed
    }

    return () => {
      reset(); // optional: reset access when leaving page
    };
  }, [allowed, router, reset]);

  if (!allowed) return null; // render nothing while redirecting

  const handlePlayAgain = () => {
    resetHeroes();
    setTimeout(() => {
      router.push("/game");
    }, 1000);
  };

  return (
    <div
      className="bg-cover flex flex-col items-center justify-center xl:px-40 h-screen bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${winImage.src})` }}
    >
      <h1 className="text-[32px] xl:text-[90px] uppercase font-sung font-bold text-green-600 cst-text-shadow text-center">
        You’ve saved the forest!
      </h1>
      <h1 className="text-[32px] xl:text-[90px] uppercase font-sung font-bold text-green-600 cst-text-shadow text-center">
        Victory is yours!
      </h1>
      <div className="flex gap-4 items-center mt-4 xl:mt-0">
        <ButtonLink href={"/game"}>Play Again</ButtonLink>
        <ButtonLink onClick={handlePlayAgain}>Watch tutorial</ButtonLink>
      </div>
      <Fireworks autorun={{ speed: 2 }} />;
    </div>
  );
}
