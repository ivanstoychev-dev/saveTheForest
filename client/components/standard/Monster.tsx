import Image from "next/image";
import MonsterImage from "../../assets/images/monster.png";
import MonsterRagedImage from "../../assets/images/monsterRaged.png";
import CharacterTitle from "../basic/CharacterTitle";

function Monster() {
  return (
    <div className="flex flex-col gap-7">
      <CharacterTitle name="Adalwolf" />
      <p className="text-2xl text-center">
        Adalwolf is the monster wolf you have to defeat to save the forest. He
        doesn&apos;t have any spells, but he has a lot of HP, attack damage and
        denfese. He also has a rage bar. When the rage bar reaches 100%
        Adalwolf&apos;s next attack will deal significantly more damage. He
        gains percentages rage based on the damage he deals every round. The
        more damage he deals the faster his rage bar fills.
      </p>
      <div className="flex justify-center gap-20">
        <Image height={450} width={450} src={MonsterImage} alt="monster" />
        <Image height={450} width={450} src={MonsterRagedImage} alt="monster" />
      </div>
    </div>
  );
}

export default Monster;
