import { StaticImageData } from "next/image";

export type Status = {
  name: string;
  duration: number;
  startTime: number;
};

export type Spell = {
  displayName: string;
  type: "buff" | "debuff";
  icon: StaticImageData;
  selfCastAvailable: boolean;
  name: string;
  description: string;
  requireTarget: boolean;
  duration: number;
  cost: number;
  additionalSounds: string[];
};

export type Character = {
  id: string;
  hp: number;
  mp: number;
  maxHp: number;
  type: string;
  image: StaticImageData;
  maxMp: number;
  attack: number;
  defence: number;
  baseAttack: number;
  baseDefence: number;
  rage?: number;
  maxRage?: number;
  name: string;
  sounds: Record<string, string>;
  spells: Spell[];
  activeStatuses: Status[] | [];
  isDead: boolean;
};

export type CharacterBoxProps = {
  character: Character;
  enraged?: boolean;
  handleCharacterSelect?: () => void;
  handleOnSpellCast: (spell: Spell) => void;
  handleDisableSpellConditions: (spell: Spell) => boolean;
  chosingHeroAvailable: boolean;
  className?: string;
};
