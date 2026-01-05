import Image, { StaticImageData } from "next/image";
import CharacterTitle from "../basic/CharacterTitle";
type HeroProps = {
  spells: { img: StaticImageData; desc: string }[];
  name: string;
  desc: string;
  image: StaticImageData | string;
};
function hero({ spells, name, desc, image }: HeroProps) {
  return (
    <div className="flex flex-col gap-7 mb-4">
      <CharacterTitle name={name} />
      <p className="text-2xl text-center">{desc}</p>
      <div className="flex items-center">
        {image && (
          <Image
            className="w-[300px]"
            width={400}
            height={400}
            src={image}
            alt=""
          />
        )}
        <div className="flex flex-col gap-10">
          {spells.map((spells) => (
            <div key={spells.desc} className="flex items-center gap-4">
              <Image
                width={80}
                height={80}
                className="w-16 h-auto min-w-12"
                src={spells.img}
                alt=""
              />
              <p className="text-xl text-shadow">{spells.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default hero;
