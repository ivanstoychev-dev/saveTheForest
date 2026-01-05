import { getBarsFromCharacter } from "@client/utils/manageCharacters";
import { Character } from "@client/utils/types";
import StatsBar from "../basic/StatsBar";

function StatsBarsContainer({ character }: { character: Character }) {
  return (
    <div className="flex flex-col xl:gap-0 gap-2 w-full">
      {getBarsFromCharacter(character).map((bar) => (
        <StatsBar
          key={bar.label}
          label={bar.label}
          value={bar.value}
          max={bar.max}
          color={bar.color}
        />
      ))}
    </div>
  );
}

export default StatsBarsContainer;
