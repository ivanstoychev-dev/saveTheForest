"use client";

import { navigateWithAllow } from "@client/utils/common";
import {
  hunter,
  knight,
  mage,
  monster,
} from "@client/utils/constants/characters";
import { applyStatus, proccessCharacter } from "@client/utils/engine";
import {
  getCharacterById,
  updateCharacterWithRage,
} from "@client/utils/manageCharacters";
import { Character, Spell } from "@client/utils/types";
import monsterEnraged from "@images/monsterRaged.png";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useNavigation } from "./NavContext";
import { useSound } from "./SoundContext";

export type PendingSpell = {
  spell: Spell | null;
  casterId: string;
};

type CharactersContextType = {
  characters: Character[];
  onSpellCast: (casterId: string, targetId: string, spell: Spell) => void;
  onSelfSpellCast: (characterId: string, spell: Spell) => void;
  handlePendingSpell: (characterId: string) => void;
  handleDiscardDeadCharacter: (characterId: string) => void;
  currentRound: number;
  pendingSpell: PendingSpell;
  setPendingSpell: React.Dispatch<React.SetStateAction<PendingSpell>>;
  onFight: (
    activeCharacterId: string,
    enemyId: string,
    activeCharacterDamage: number,
    enemyDamage: number
  ) => void;
  resetHeroes: () => void;
};

const CharactersContext = createContext<CharactersContextType | null>(null);

export function CharactersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pendingSpell, setPendingSpell] = useState<PendingSpell>({
    spell: null,
    casterId: "",
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([
    knight,
    mage,
    hunter,
    monster,
  ]);

  const { play } = useSound();
  const { allow } = useNavigation();
  const router = useRouter();

  const onSelfSpellCast = (characterId: string, spell: Spell) => {
    const charactersTempCopy: Character[] = [...characters];

    const character = charactersTempCopy.find(
      (character) => character.id === characterId
    );

    if (!character) return;

    const characterWithAppliedStatus = applyStatus(
      character,
      spell.name,
      currentRound,
      spell.duration
    );

    const updatedCharacter = {
      ...characterWithAppliedStatus,
      mp: characterWithAppliedStatus.mp - spell.cost,
    };

    const updatedCharacters = charactersTempCopy.map((character) => {
      if (character.id === updatedCharacter.id) return updatedCharacter;
      return character;
    });

    setCharacters([...updatedCharacters]);
  };

  const onSpellCast = (casterId: string, targetId: string, spell: Spell) => {
    const charactersTempCopy: Character[] = [...characters];

    const caster = charactersTempCopy.find(
      (character) => character.id === casterId
    );

    const target = charactersTempCopy.find(
      (character) => character.id === targetId
    );

    if (!caster || !target) return;

    const updatedCaster = { ...caster, mp: caster.mp - spell.cost };

    const updatedTarget = applyStatus(
      target,
      spell.name,
      currentRound,
      spell.duration,
      spell.name === "inferno"
    );

    const updatedCharacters = charactersTempCopy.map((character) => {
      if (character.id === updatedTarget.id) return updatedTarget;
      if (character.id === updatedCaster.id) return updatedCaster;
      return character;
    });

    setCharacters(updatedCharacters);
  };

  const checkForLose = (characters: Character[]) => {
    if (characters.length < 2) {
      navigateWithAllow(router, allow, "/lose");
    }
  };

  const handleEnemyUpdate = (
    enemy: Character,
    damageTaken: number,
    enemyDamage: number
  ) => {
    if (Object.hasOwn(enemy, "rage")) {
      enemy = updateCharacterWithRage(enemy, enemyDamage);
    }

    let enemyActiveStatuses = enemy.activeStatuses;
    let enemyRage = enemy.rage;
    let enemyImage = enemy.image;
    let enemyAttack = enemy.attack;

    if (enemy.rage === enemy.maxRage) {
      play("rage");
      enemyActiveStatuses = [
        ...enemyActiveStatuses,
        { name: "enraged", startTime: currentRound, duration: 1 },
      ];
      enemyRage = 0;
      enemyImage = monsterEnraged;
      enemyAttack = enemy.attack * 2;
    }

    const newHp = Math.max(enemy.hp - damageTaken, 0);

    const updatedEnemy = {
      ...enemy,
      hp: newHp,
      activeStatuses: enemyActiveStatuses,
      rage: enemyRage,
      image: enemyImage,
      attack: enemyAttack,
      isDead: newHp === 0 ? true : false,
    };

    return updatedEnemy;
  };

  const updateCharacters = (
    characters: Character[],
    activeCharacterId: string,
    enemyDamage: number,
    enemy: Character
  ) => {
    return characters.map((character) => {
      if (character.id === activeCharacterId) {
        const newHp = Math.max(character.hp - enemyDamage, 0);
        return {
          ...character,
          hp: newHp,
          mp: Math.min(character.maxMp, character.mp + 100),
          isDead: newHp === 0 ? true : false,
        };
      }
      if (character.id === enemy.id) {
        return enemy;
      }
      return {
        ...character,
        mp: Math.min(character.maxMp, character.mp + 100),
      };
    });
  };

  const onFight = (
    activeCharacterId: string,
    enemyId: string,
    activeCharacterDamage: number,
    enemyDamage: number
  ) => {
    let updatedCharacters = [...characters];

    // apply status effects
    updatedCharacters = updatedCharacters.map((character) => {
      return proccessCharacter(character, currentRound + 1);
    });

    let enemy = getCharacterById(updatedCharacters, enemyId);

    // find characters
    const activeCharacter = getCharacterById(
      updatedCharacters,
      activeCharacterId
    );

    if (!activeCharacter || !enemy) return;

    enemy = handleEnemyUpdate(enemy, activeCharacterDamage, enemyDamage);

    // update characters after taking damage
    updatedCharacters = updateCharacters(
      updatedCharacters,
      activeCharacter.id,
      enemyDamage,
      enemy
    );
    setCharacters([...updatedCharacters]);
    setCurrentRound(currentRound + 1);
  };

  const handleDiscardDeadCharacter = (characterId: string) => {
    let updatedCharacters = [...characters];
    updatedCharacters = updatedCharacters.filter((c) => c.id !== characterId);
    setCharacters(updatedCharacters);
    checkForLose(updatedCharacters);
  };

  const handlePendingSpell = (targetId: string) => {
    if (!pendingSpell.spell) return;

    // cast the spell on the hero
    onSpellCast(pendingSpell.casterId, targetId, pendingSpell.spell);

    // clear pending spell selection
    setPendingSpell({ spell: null, casterId: "" });
  };

  const resetHeroes = () => {
    setCharacters([knight, mage, hunter, monster]);
  };

  return (
    <CharactersContext.Provider
      value={{
        characters,
        onSpellCast,
        onSelfSpellCast,
        handlePendingSpell,
        currentRound,
        pendingSpell,
        setPendingSpell,
        onFight,
        resetHeroes,
        handleDiscardDeadCharacter,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(CharactersContext);
  if (!context)
    throw new Error("useCharacters must be used inside CharactersProvider");
  return context;
}
