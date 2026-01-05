import { Character } from "./types";

export const getCharacterById = (
  characters: Character[],
  characterId: string
) => {
  return characters.find((character) => character.id === characterId);
};

export const checkForCharacterDeath = (
  character: Character,
  damageTaken: number
) => {
  if (character.hp - damageTaken <= 0) {
    return true;
  }
  return false;
};

export const getBarsFromCharacter = (c: Character) => {
  const bars = [];

  if (c.hp !== undefined)
    bars.push({ label: "HP", value: c.hp, max: c.maxHp, color: "bg-red-600" });
  if (c.mp !== undefined && c.maxMp > 0)
    bars.push({ label: "MP", value: c.mp, max: c.maxMp, color: "bg-blue-600" });
  if (c.rage !== undefined)
    bars.push({
      label: "Rage",
      value: c.rage,
      max: c.maxRage,
      color: "bg-orange-600",
    });

  return bars;
};

export const updateCharacterWithRage = (
  character: Character,
  damageDealt: number
) => {
  if (!character.maxRage || character.rage === undefined) return character;
  const generatedRage = character.rage + damageDealt * 2.7;
  return {
    ...character,
    rage: Math.round(Math.min(generatedRage, character?.maxRage)),
  };
};
