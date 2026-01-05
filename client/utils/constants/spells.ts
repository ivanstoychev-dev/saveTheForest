import criticalStrikeIcon from "@images/crit.png";
import infernoIcon from "@images/fire.png";
import healingIcon from "@images/heal.png";
import stoneSkinIcon from "@images/increaseDefense.png";
import manaInfusionIcon from "@images/increaseMana.png";
import cripplingStrikeIcon from "@images/reduceAttack.png";
import exposeIcon from "@images/reduceDefense.png";
import { Spell } from "../types";

//STATUS DAMAGES
export const BURN_DAMAGE = 120;

// DISPLAY NAMES
const CRIPPLING_STRIKE = "Crippling Strike";
const EXPOSE = "Expose";
const CRITICAL_STRIKE = "Critical Strike";
const STONE_SKIN = "Stone Skin";
const INFERNO = "Inferno";
const MANA_INFUSION = "Mana Infusion";
const HEALING_LIGHT = "Healing Light";

// names for switch
const CRIPPLING_STRIKE_SW = "cripplingStrike";
const EXPOSE_SW = "expose";
const CRITICAL_STRIKE_SW = "criticalStrike";
const STONE_SKIN_SW = "stoneSkin";
const INFERNO_SW = "inferno";
const MANA_INFUSION_SW = "manaInfusion";
const HEALING_LIGHT_SW = "healingLight";

export const switchCaseNames = [
  CRIPPLING_STRIKE_SW,
  EXPOSE_SW,
  CRITICAL_STRIKE_SW,
  STONE_SKIN_SW,
  INFERNO_SW,
  MANA_INFUSION_SW,
  HEALING_LIGHT_SW,
] as const;

// SPELLS DESCRIPTION
const CRIPLING_STRIKE_DESC =
  "A precise strike that weakens the enemy’s resolve, lowering their attack power for a short time.";
const STONE_SKIN_DESC =
  "Calls upon ancient resilience, reinforcing your armor and hardening your resolve.";
const INFERNO_DESC =
  "Engulfs the target in roaring flames, searing their flesh and chipping away at their vitality over time.";
const EXPOSE_DESC =
  "Strikes the enemy’s defenses with bone-crushing force, leaving them vulnerable.";
const MANA_INFUSION_DESC =
  "Channels raw arcane energy, replenishing the caster’s mana and fueling further magical feats.";
const HEALING_LIGHT_DESC =
  "Channels restorative energy into the target, replenishing their vitality and mending wounds.";
const CRITICAL_STRIKE_DESC =
  "Unleashes a burst of rage, doubling the strength of your next assaults.";

export const spells: Record<string, Spell> = {
  cripplingStrike: {
    icon: cripplingStrikeIcon,
    displayName: CRIPPLING_STRIKE,
    name: "cripplingStrike",
    description: CRIPLING_STRIKE_DESC,
    type: "debuff",
    selfCastAvailable: false,
    requireTarget: false,
    duration: 1,
    cost: 700,
    additionalSounds: [],
  },
  expose: {
    icon: exposeIcon,
    displayName: EXPOSE,
    type: "debuff",
    name: "expose",
    selfCastAvailable: false,
    description: EXPOSE_DESC,
    requireTarget: false,
    duration: 1,
    cost: 400,
    additionalSounds: [],
  },
  criticalStrike: {
    icon: criticalStrikeIcon,
    displayName: CRITICAL_STRIKE,
    type: "buff",
    name: "criticalStrike",
    selfCastAvailable: true,
    description: CRITICAL_STRIKE_DESC,
    requireTarget: false,
    duration: 1,
    cost: 400,
    additionalSounds: [],
  },
  stoneSkin: {
    icon: stoneSkinIcon,
    displayName: STONE_SKIN,
    type: "buff",
    name: "stoneSkin",
    selfCastAvailable: true,
    description: STONE_SKIN_DESC,
    requireTarget: false,
    duration: 1,
    cost: 500,
    additionalSounds: [],
  },
  inferno: {
    icon: infernoIcon,
    displayName: INFERNO,
    type: "debuff",
    name: "inferno",
    selfCastAvailable: false,
    description: INFERNO_DESC,
    requireTarget: false,
    duration: 3,
    cost: 600,
    additionalSounds: ["mageOps"],
  },
  manaInfusion: {
    icon: manaInfusionIcon,
    displayName: MANA_INFUSION,
    type: "buff",
    name: "manaInfusion",
    selfCastAvailable: false,
    description: MANA_INFUSION_DESC,
    requireTarget: true,
    duration: 1,
    cost: 200,
    additionalSounds: [],
  },
  healingLight: {
    icon: healingIcon,
    displayName: HEALING_LIGHT,
    type: "buff",
    name: "healingLight",
    selfCastAvailable: true,
    description: HEALING_LIGHT_DESC,
    requireTarget: true,
    duration: 1,
    cost: 200,
    additionalSounds: [],
  },
};

export const hunterSpells: Spell[] = [spells.criticalStrike, spells.expose];

export const knightSpells: Spell[] = [spells.stoneSkin, spells.cripplingStrike];

export const mageSpells: Spell[] = [
  spells.healingLight,
  spells.manaInfusion,
  spells.inferno,
];
