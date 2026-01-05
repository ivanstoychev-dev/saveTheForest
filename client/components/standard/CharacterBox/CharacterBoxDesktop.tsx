import CharacterStats from "@client/components/basic/CharacterStats";
import Spell from "@client/components/basic/Spell";
import StatsBarsContainer from "@client/components/containers/StatsBarsContainer";
import { cn } from "@client/utils/cn";
import { CharacterBoxProps } from "@client/utils/types";
import attackImage from "@images/attack-stats.png";
import defenceImage from "@images/defence.png";
import Image from "next/image";
import { tv } from "tailwind-variants";

const characterBoxVariants = tv({
  slots: {
    root: " p-1 xl:p-2 relative flex items-center justify-center rounded-xl w-[200px] md:w-[220px] xl:w-[300px] bg-linear-to-b from-green-900 to-green-500",
    deadOverlay:
      "absolute w-full  transition-all rounded-md flex items-center justify-center duration-3000 bg-black/90 z-50 ",
    chooseOverlay:
      "absolute z-20 pointer-events-none hover:bg-black/50 w-[calc(100%-20px)] h-[calc(100%-20px)]  bg-black/70 flex items-center justify-center",
  },
  variants: {
    enraged: {
      true: {
        root: "shadow-red-500 shadow-2xl",
      },
      false: {
        root: "shadow-black shadow-xl",
      },
    },
    chosingHeroAvailable: {
      true: {
        root: "cursor-pointer",
      },
    },
    dead: {
      true: {
        deadOverlay: "h-full opacity-100",
      },
      false: {
        deadOverlay: "h-0 opacity-0",
      },
    },
  },
  defaultVariants: {
    enraged: false,
    dead: false,
    chosingHeroAvailable: false,
  },
});

function CharacterBoxDesktop({
  character,
  enraged = false,
  chosingHeroAvailable,
  handleCharacterSelect,
  handleOnSpellCast,
  handleDisableSpellConditions,
  className,
}: CharacterBoxProps) {
  const { root, deadOverlay, chooseOverlay } = characterBoxVariants({
    enraged,
    dead: character.isDead,
    chosingHeroAvailable: chosingHeroAvailable,
  });

  const {
    name,
    spells,
    image,
    attack,
    defence,
    baseAttack,
    baseDefence,
    type,
  } = character;

  return (
    <div className={cn(root(), className)} onClick={handleCharacterSelect}>
      {/* DEAD OVERLAY */}
      <div className={deadOverlay()}>
        <p className="text-red-700 cst-text-shadow tracking-wide text-[80px] font-sung font-bold -rotate-55">
          DEAD
        </p>
      </div>

      {/* CHOOSE HERO OVERLAY */}
      {chosingHeroAvailable && (
        <div className={chooseOverlay()}>
          <p className="text-white text-3xl -rotate-45">CHOOSE HERO</p>
        </div>
      )}

      <div className="flex relative flex-col bg-darkGray100/90 items-center rounded-xl gap-2 w-full">
        <div className="absolute pointer-events-none rounded-b-xl w-full h-[150px] bottom-0 bg-linear-to-b to-green-500 from-transparent to-180%" />

        <h1 className="absolute xl:pb-0.5 px-8 rounded-br-2xl pointer-events-none bg-linear-to-br from-green-900 to-green-800 font-sung tracking-wide md:top-0  -top-px left-0 text-sm xl:text-lg text-amber-200 font-bold capitalize text-center">
          {name}
        </h1>

        <div className="w-full flex-col items-center flex gap-2 relative  px-4 pt-6">
          <Image
            className="xl:w-full w-[140px]"
            alt="character image"
            src={image}
          />

          {spells.length > 0 && (
            <div className="flex gap-6 w-full justify-between bg-green-700 border-green-400 border p-1.5 rounded-md items-center">
              {spells.map((spell) => (
                <Spell
                  key={spell.name}
                  name={spell.displayName}
                  icon={spell.icon}
                  onClick={() => handleOnSpellCast?.(spell)}
                  disabled={handleDisableSpellConditions?.(spell)}
                />
              ))}
            </div>
          )}

          <StatsBarsContainer character={character} />
        </div>

        <div className="flex justify-between items-center w-full gap-2 xl:gap-4">
          <CharacterStats
            icon={attackImage}
            value={attack}
            baseValue={baseAttack}
          />

          <p className=" cst-text-shadow uppercase tracking-wide  text-sung font-bold w-fit place-self-center py-0.5 text-white z-20 font-montserrat text-[10px] md:text-sm xl:text-md text-center  rounded-t-md">
            {type}
          </p>

          <CharacterStats
            icon={defenceImage}
            value={defence}
            baseValue={baseDefence}
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterBoxDesktop;
