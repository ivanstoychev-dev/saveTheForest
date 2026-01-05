import { useCharacters } from "@client/context/CharactersContext";
import { useNavigation } from "@client/context/NavContext";
import { useSound } from "@client/context/SoundContext";
import { navigateWithAllow } from "@client/utils/common";
import { Character, Spell as SpellType } from "@client/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import CharacterBoxDesktop from "./CharacterBoxDesktop";
import CharacterBoxMobile from "./CharacterBoxMobile";

function CharacterBox({
  character,
  className,
  disableCharacter,
  variant = "desktop",
}: {
  character: Character;
  className?: string;
  disableCharacter?: boolean;
  variant?: "desktop" | "mobile";
}) {
  const {
    characters,
    setPendingSpell,
    pendingSpell,
    handlePendingSpell,
    onSpellCast,
    onSelfSpellCast,
    handleDiscardDeadCharacter,
  } = useCharacters();

  const { play } = useSound();
  const router = useRouter();
  const { allow } = useNavigation();

  useEffect(() => {
    if (character.isDead) {
      play(`${character.type}Dead`);

      const deadAnimationTimout = setTimeout(() => {
        if (character.type === "monster") {
          navigateWithAllow(router, allow, "/win");
          return;
        }
        handleDiscardDeadCharacter(character.id);
      }, 3000);

      return () => {
        clearTimeout(deadAnimationTimout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.isDead]);

  const monster = useMemo(
    () => characters.find((character) => character.id === "4"),
    [characters]
  );

  const handleOnSpellCast = (spell: SpellType) => {
    if (spell.type === "buff" && spell.requireTarget) {
      setPendingSpell({ spell, casterId: character.id });
      return;
    }
    play(spell.name);
    if (spell.additionalSounds.length > 0) {
      spell.additionalSounds.forEach((sound) =>
        setTimeout(() => play(sound), 500)
      );
    }

    if (spell.type === "debuff" && !spell.requireTarget) {
      if (monster) onSpellCast(character.id, monster.id, spell);
      return;
    }

    onSelfSpellCast(character.id, spell);
  };

  const handleDisableSpellConditions = (spell: SpellType): boolean => {
    let disabled = false;

    if (spell.cost > character.mp || disableCharacter) {
      return true;
    }

    switch (spell.name) {
      case "criticalStrike":
        {
          disabled = character.attack > character.baseAttack;
        }
        break;

      case "stoneSkin":
        {
          disabled = character.defence > character.baseDefence;
        }
        break;

      default:
        return false;
    }
    return disabled;
  };

  const handleCharacterSelect = () => {
    if (pendingSpell?.spell && spellSelfCastAviability) {
      play(pendingSpell.spell.name);
      handlePendingSpell(character.id);
    }
  };

  const spellSelfCastAviability =
    pendingSpell?.spell?.selfCastAvailable ||
    pendingSpell.casterId !== character.id;

  const isEnraged = character.activeStatuses.some(
    (status) => status.name === "enraged"
  );

  const chosingHeroAvailable =
    pendingSpell?.spell &&
    character.id !== monster?.id &&
    spellSelfCastAviability
      ? true
      : false;

  const renderCharacterBox = () =>
    variant === "desktop" ? (
      <CharacterBoxDesktop
        className={className}
        enraged={isEnraged}
        character={character}
        chosingHeroAvailable={chosingHeroAvailable}
        handleDisableSpellConditions={handleDisableSpellConditions}
        handleOnSpellCast={handleOnSpellCast}
        handleCharacterSelect={handleCharacterSelect}
      />
    ) : (
      <CharacterBoxMobile
        enraged={isEnraged}
        character={character}
        chosingHeroAvailable={chosingHeroAvailable}
        handleDisableSpellConditions={handleDisableSpellConditions}
        handleOnSpellCast={handleOnSpellCast}
        handleCharacterSelect={handleCharacterSelect}
      />
    );

  return renderCharacterBox();
}

export default CharacterBox;
