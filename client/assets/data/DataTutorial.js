import ReducedAttack from "../images/reduceAttack.png";
import ReducedDefence from "../images/reduceDefense.png";
import IncreaseDefense from "../images/increaseDefense.png";
import Crit from "../images/crit.png";
import Heal from "../images/heal.png";
import IncreaseMana from "../images/increaseMana.png";
import Fire from "../images/fire.png";
import Knight from "../images/knight.png";
import Hunter from "../images/hunter.png";
import Mage from "../images/mage.png";

export const dataTutorial = [
  {
    name: "Knight",
    desc: `The knight doesn't deal alot of damage but he is really powerful defender that can block tons of damage. He has two spells and if you use them
         correctly, the knight can be your key figure for winning the game.`,
    image: Knight,
    spells: [
      {
        img: ReducedAttack,
        desc: "His first spell consumes 500 mana and decreases the opponent attack by half. This spell doesn't stack and you can use it only once per round.",
      },
      {
        img: IncreaseDefense,
        desc: "The second spell, consumes 200MP and gives the knight 200 extra defense. This spell can stack and you can use it multiple times per round.",
      },
    ],
  },
  {
    name: "Hunter",
    desc: `The hunter is a powerfull attacker, that deals a lot of damage. He has two spells. Keep him alive, as long as possible, if you want to defeat the monster`,
    image: Hunter,
    spells: [
      {
        img: Crit,
        desc: "His first spell consumes 500MP. Hunter's next attack will deal critical damage to the opponent based on his defense.",
      },
      {
        img: ReducedDefence,
        desc: "The second spell consumes 200MP and decreases the monster defense by 200. This spell doesn't stack and you can use it only once per round.",
      },
    ],
  },
  {
    name: "Mage",
    desc: `The mage is weak in defense and attack, but has powerfull spells. He has three spells and can support your other heroes in battle, he can also deal a lot of damage with his fire spell. `,
    image: Mage,
    spells: [
      {
        img: Heal,
        desc: "His first spell consumes 300MP and regenerates 200 missing health to the chosen hero. You can use this spell multiple times per round.",
      },
      {
        img: IncreaseMana,
        desc: "The second spell consumes 200MP and regenerates 200 missing MP to the chosen hero. You can use this spell multiple times per round.",
      },
      {
        img: Fire,
        desc: "His third spell is a powerful fire spell, that sets the oponent on fire for five rounds and deals bonus damage, based on opponent's armor. This spell DOESN'T stack.",
      },
    ],
  },
];
