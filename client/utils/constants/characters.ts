import hunterImage from "@images/hunter.png";
import knightImage from "@images/knight.png";
import mageImage from "@images/mage.png";
import monsterImage from "@images/monster.png";

import {
  hunterSpells,
  knightSpells,
  mageSpells,
} from "@client/utils/constants/spells";

export const hunterName = "Silva Ashborn";
export const knightName = "Ronald Blackshield";
export const mageName = "Marcellus Greystone";
export const monsterName = "Adalwolf";

export const knight = {
  id: "1",
  name: knightName,
  type: "knight",
  image: knightImage,
  attack: 250,
  defence: 500,
  baseAttack: 250,
  baseDefence: 500,
  hp: 2000,
  mp: 800,
  maxHp: 2000,
  maxMp: 800,
  sounds: {
    entrance: "knightEntrance",
  },
  spells: knightSpells,
  activeStatuses: [],
  isDead: false,
};
export const mage = {
  id: "2",
  name: mageName,
  type: "mage",
  image: mageImage,
  attack: 300,
  defence: 150,
  baseAttack: 300,
  baseDefence: 150,
  hp: 1000,
  mp: 1000,
  maxHp: 1000,
  maxMp: 1000,
  sounds: {
    entrance: "mageEntrance",
  },
  spells: mageSpells,
  activeStatuses: [],
  isDead: false,
};
export const hunter = {
  id: "3",
  name: hunterName,
  type: "hunter",
  image: hunterImage,
  attack: 500,
  defence: 200,
  baseAttack: 500,
  baseDefence: 200,
  hp: 1200,
  mp: 600,
  maxHp: 1200,
  maxMp: 600,
  sounds: {
    entrance: "hunterEntrance",
  },
  spells: hunterSpells,
  activeStatuses: [],
  isDead: false,
};
export const monster = {
  id: "4",
  name: monsterName,
  type: "monster",
  image: monsterImage,
  attack: 800,
  defence: 600,
  baseAttack: 800,
  baseDefence: 600,
  hp: 3200,
  rage: 0,
  maxHp: 3200,
  maxRage: 3000,
  mp: 0,
  maxMp: 0,
  sounds: {
    entrance: "monsterEntrance",
  },
  spells: [],
  activeStatuses: [],
  isDead: false,
};
