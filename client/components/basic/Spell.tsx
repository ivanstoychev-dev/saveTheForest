import Image, { StaticImageData } from "next/image";

type SpellProps = {
  name: string;
  onClick: () => void;
  disabled: boolean;
  icon: StaticImageData;
};

function Spell({ name, onClick, disabled, icon }: SpellProps) {
  return (
    <button
      className="hover:scale-125  relative transition-all w-8 xl:w-11 flex items-center justify-center rounded-md  p-1 z-30 disabled:hover:scale-100 cursor-pointer duration-500 bg-black/70"
      key={name}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && (
        <div className="absolute rounded-md  w-full h-full bg-gray-700/50" />
      )}
      <Image
        alt={name}
        src={icon}
        width={40}
        height={40}
        className="xl:w-10 xl:h-10 h-6 w-6"
      />
    </button>
  );
}

export default Spell;
