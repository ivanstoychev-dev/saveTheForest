import { cn } from "@client/utils/cn";
import { Character } from "@client/utils/types";
import { ArrowBigLeft, MenuIcon } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";
import CharacterBox from "../standard/CharacterBox/CharacterBox";

type HeroesContainerProps = {
  characters: Character[];
  activeHeroId: string;
  handleHeroChange: (character: Character) => void;
  disableCharacter?: boolean;
  variant: "mobile" | "desktop";
};

function HeroesContainer({
  characters,
  activeHeroId,
  handleHeroChange,
  disableCharacter,
  variant = "desktop",
}: HeroesContainerProps) {
  const [visible, setVisible] = useState(variant === "desktop");

  const heroStyles = tv({
    slots: {
      button:
        "absolute cursor-pointer transition-all duration-500  bg-red-500 py-2  z-60  font-sung font-bold text-white text-shadow",
      container:
        "flex flex-col py-5 overflow-y-scroll transition-all duration-700 items-center scrollbar-hidden  bg-black/90",
    },
    variants: {
      variant: {
        mobile: {
          button:
            "bottom-0 translate-y-full left-2  px-5 py-1 rounded-b-md text-white",
          container: `gap-12 fixed h-full z-50 md:relative px-2 items-center ${
            visible ? "w-[320px]" : "w-[50px]"
          }`,
        },
        desktop: {
          button:
            "top-0 w-[150px] translate-y-6  hover:scale-110 translate-x-6 text-lg text-white rounded-md right-0",
          container: "gap-6 w-[500px]",
        },
      },
    },
  });

  return (
    <div className={cn(heroStyles({ variant }).container())}>
      {variant === "mobile" && (
        <button
          className={`cursor-pointer text-white flex w-full ${
            visible ? "justify-end" : "justify-center"
          }`}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <ArrowBigLeft /> : <MenuIcon />}
        </button>
      )}
      {visible &&
        characters.map((character) =>
          character.id !== activeHeroId && character.id !== "4" ? (
            <div
              key={character.id}
              className="flex relative pointer-events-auto"
            >
              <CharacterBox
                disableCharacter={disableCharacter}
                character={character}
                variant={variant}
              />
              <button
                onClick={() => handleHeroChange(character)}
                className={cn(heroStyles({ variant }).button())}
                disabled={disableCharacter}
              >
                Chose Hero
              </button>
            </div>
          ) : null
        )}
    </div>
  );
}

export default HeroesContainer;
