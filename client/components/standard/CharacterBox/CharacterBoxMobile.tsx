import CharacterStats from "@client/components/basic/CharacterStats";
import Spell from "@client/components/basic/Spell";
import StatsBarsContainer from "@client/components/containers/StatsBarsContainer";
import { CharacterBoxProps } from "@client/utils/types";
import attackImage from "@images/attack-stats.png";
import defenceImage from "@images/defence.png";
import Image from "next/image";
import { tv } from "tailwind-variants";

const characterBoxVariants = tv({
  slots: {
    root: "p-1 relative flex items-center justify-center rounded-xl  w-[240px] bg-linear-to-b from-green-900 to-green-500",
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
  },
  defaultVariants: {
    enraged: false,
    dead: false,
    chosingHeroAvailable: false,
  },
});

function CharacterBoxMobile({
  character,
  enraged = false,
  handleCharacterSelect,
  handleOnSpellCast,
  handleDisableSpellConditions,
}: CharacterBoxProps) {
  const { root } = characterBoxVariants({
    enraged,
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
    <div className={root()} onClick={handleCharacterSelect}>
      <div className="flex relative flex-col bg-darkGray100/90 items-center pt-1 rounded-xl gap-2 w-full">
        <div className="absolute pointer-events-none rounded-b-xl w-full h-[150px] bottom-0 bg-linear-to-b to-green-500 from-transparent to-180%" />
        <div className="w-full flex-col flex gap-2 relative px-2  xl:pt-0 xl:px-4 ">
          <div className="flex justify-between items-center">
            <p className="whitespace-pre-wrap  text-amber-300 text-sm font-sung font-bold">
              {name}
            </p>
            <p className="whitespace-pre-wrap  text-white uppercase text-sm font-sung font-bold">
              {type}
            </p>
          </div>

          <div className="flex justify-between w-full gap-2 ">
            <div className="w-10 h-10 min-w-10 shadow-md shadow-green-400 overflow-hidden  flex items-start justify-start  rounded-full">
              <Image
                width={100}
                height={100}
                className="rounded-full  w-[150px] h-[150px] object-cover"
                alt="hero"
                src={image}
              />
            </div>
            {spells.length > 0 && (
              <div className="flex gap-2 w-full justify-between h-fit bg-green-700 border-green-400 xl:border p-1 rounded-md items-center">
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
          </div>

          <StatsBarsContainer character={character} />
        </div>

        <div className="flex justify-between items-center w-full">
          <CharacterStats
            icon={attackImage}
            value={attack}
            baseValue={baseAttack}
          />

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

export default CharacterBoxMobile;
