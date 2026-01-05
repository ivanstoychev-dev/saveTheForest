import { cn } from "@client/utils/cn";
import { Character } from "@client/utils/types";
import fireImage from "@images/onFire.png";
import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import DamageDisplay from "../basic/DamageDisplay";
import CharacterBox from "../standard/CharacterBox/CharacterBox";

type CharacterContainerProps = {
  character: Character;
  showCharacter: boolean;
  damageVisible: boolean;
  slashImage: StaticImageData;
  damages: Record<"damage" | "burnDamage", number>;
  damageDisplayPosition?: "left" | "right";
  slashVisible: boolean;
  className?: string;
};

function CharacterContainer({
  character,
  showCharacter,
  damageVisible,
  slashImage,
  damages,
  damageDisplayPosition = "left",
  slashVisible,
  className,
}: CharacterContainerProps) {
  const damageDispayStyles = tv({
    base: `
    absolute top-30 xl:top-1/2 flex flex-col flex-col-reverse gap-3 items-center font-sung text-7xl  font-bold
  `,
    variants: {
      damageDisplayPosition: {
        left: "xl:-left-28 -left-14",
        right: "xl:-right-28 -right-14",
      },
    },
    defaultVariants: {
      damageDisplayPosition: "left",
    },
  });
  const statusEffectImages: Record<string, ReactElement> = {
    inferno: (
      <Image
        className="absolute  bottom-0 left-0 w-full h-[200px]  xl:h-[300px] z-10 pointer-events-none bg-cover"
        width={400}
        height={700}
        alt="inferno"
        src={fireImage}
      />
    ),
  };

  const currentStatusEffectImages = character.activeStatuses
    .map((status) => statusEffectImages[status.name])
    .filter(Boolean);

  return (
    <div className="relative">
      {/* CHARACTER IMAGE */}
      {character && showCharacter ? (
        <CharacterBox
          key={character.id}
          className={className}
          character={character}
          disableCharacter={character.isDead}
        />
      ) : (
        <div className="w-[300px]" />
      )}

      {/* STATUS EFFECTS */}
      {currentStatusEffectImages.length > 0 &&
        currentStatusEffectImages.map((img, i) => (
          <div key={i} className="absolute top-0 left-0 w-full h-full z-20">
            {img}
          </div>
        ))}

      {/* SLASH */}
      <Image
        className={`absolute w-[200px] xl:w-[300px] pointer-events-none top-8 xl:top-20 left-1/2 scale-x-[-1] -translate-x-1/2 ${
          slashVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        width={150}
        height={300}
        alt="slash"
        src={slashImage}
      />

      {/* DAMAGE NUMBERS */}
      {damages && (
        <div className={cn(damageDispayStyles({ damageDisplayPosition }))}>
          {Object.entries(damages).map(([key, value]) =>
            value > 0 ? (
              <DamageDisplay
                key={key}
                visible={damageVisible}
                damage={value}
                type={key as keyof typeof damages}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default CharacterContainer;
