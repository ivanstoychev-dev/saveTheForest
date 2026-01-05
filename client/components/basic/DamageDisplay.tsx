import fireImage from "@images/fire.png";
import Image from "next/image";
import { tv } from "tailwind-variants";

function DamageDisplay({
  visible,
  damage,
  type,
}: {
  visible: boolean;
  damage: number;
  type?: "damage" | "burnDamage";
}) {
  const damageDispayStyles = tv({
    base: `
      block animate-bounce z-80 text-red-600
    `,
    variants: {
      type: {
        damage: "text-red-500",
        burnDamage: "text-orange-500",
      },
    },
    defaultVariants: {
      type: "damage",
    },
  });
  return (
    <span
      className={`flex items-center cst-text-shadow ${
        visible ? damageDispayStyles({ type }) : "hidden"
      }`}
    >
      {type === "burnDamage" ? (
        <Image width={40} height={40} src={fireImage} alt="fire" />
      ) : null}
      -{damage}
    </span>
  );
}

export default DamageDisplay;
