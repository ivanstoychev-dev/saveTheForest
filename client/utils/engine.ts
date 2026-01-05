import { Character, Status } from "@client/utils/types";
import monsterImage from "@images/monster.png";
import monsterEnragedImage from "@images/monsterRaged.png";
import { BURN_DAMAGE } from "./constants/spells";

export function calculateDamage(
  attackerAttack: number,
  defenderDefense: number
) {
  const mitigation = defenderDefense / (defenderDefense + 100); // % reduction
  const rawDamage = attackerAttack * (1 - mitigation);

  // Add small randomness for variability
  const variance = Math.random() * 0.1 + 0.95; // 95% to 105%
  return Math.max(0, Math.floor(rawDamage * variance));
}

export const clearAllStatuses = (character: Character): Character => {
  return { ...character, activeStatuses: [] };
};

const clearStatus = (character: Character, status: Status): Character => {
  const updatedActiveStatuses = character.activeStatuses.filter(
    (characterStatus) => characterStatus.name !== status.name
  );
  const updatedCharacter = {
    ...character,
    activeStatuses: updatedActiveStatuses,
  };

  return updatedCharacter;
};

const statusEffects: Record<
  Status["name"],
  (
    character: Character,
    isExpired: boolean,
    skipCurrentRoundEffect?: boolean
  ) => Character
> = {
  criticalStrike: (c, expired) => ({
    ...c,
    attack: expired ? c.baseAttack : c.attack * 2,
  }),

  cripplingStrike: (c, expired) => ({
    ...c,
    attack: expired ? c.baseAttack : c.attack / 2,
  }),

  stoneSkin: (c, expired) => ({
    ...c,
    defence: expired ? c.baseDefence : c.defence * 2,
  }),

  expose: (c, expired) => ({
    ...c,
    defence: expired ? c.baseDefence : c.defence / 2,
  }),

  inferno: (c, expired, skipCurrentRoundEffect) => ({
    ...c,
    hp: expired || skipCurrentRoundEffect ? c.hp : c.hp - BURN_DAMAGE,
  }),

  healingLight: (c, expired) => ({
    ...c,
    hp: expired ? c.hp : Math.min(c.hp + 300, c.maxHp),
  }),

  manaInfusion: (c, expired) => ({
    ...c,
    mp: expired ? c.mp : Math.min(c.mp + 300, c.maxMp),
  }),
  enraged: (c, expired) => ({
    ...c,
    attack: expired ? c.baseAttack : c.attack * 2,
    image: expired ? monsterImage : monsterEnragedImage,
  }),
};

const updateCharacterStatus = (
  character: Character,
  status: Status,
  currentRound: number,
  skipCurrentRoundEffect?: boolean
): Character => {
  // expire
  const statusExpiresAt = status.startTime + status.duration;
  const isExpired = currentRound >= statusExpiresAt;

  const baseCharacter = isExpired ? clearStatus(character, status) : character;

  const effect = statusEffects[status.name];

  if (!effect) throw new Error("Unhandled status: " + status.name);

  return effect(baseCharacter, isExpired, skipCurrentRoundEffect);
};

export const proccessCharacter = (
  character: Character,
  currentRound: number
) => {
  let updatedCharacter = { ...character };
  let i = 0;
  while (i < updatedCharacter.activeStatuses.length) {
    const status = updatedCharacter.activeStatuses[i];

    const newCharacter = updateCharacterStatus(
      updatedCharacter,
      status,
      currentRound
    );

    updatedCharacter = newCharacter;

    if (updatedCharacter.activeStatuses[i] === status) {
      i++;
    }
  }

  return updatedCharacter;
};

export const applyStatus = (
  character: Character,
  statusName: string,
  currentRound: number,
  duration: number,
  skipCurrentRoundEffect?: boolean
) => {
  //   if (character.activeStatuses.filter((status) => status.name === statusName))
  //     return character;
  const characterWithAppliedStatus = {
    ...character,
    activeStatuses: [
      ...character.activeStatuses,
      { startTime: currentRound, duration, name: statusName },
    ],
  };

  return updateCharacterStatus(
    characterWithAppliedStatus,
    { startTime: currentRound, duration, name: statusName },
    currentRound,
    skipCurrentRoundEffect
  );
};
