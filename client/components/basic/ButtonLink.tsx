import { cn } from "@client/utils/cn";
import Link from "next/link";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonLinkStyles = tv({
  base: `
    inline-flex items-center justify-center
    rounded-md font-semibold transition-all shadow-xl
    focus:outline-none text-shadow cursor-pointer
  `,
  variants: {
    variant: {
      primary: "bg-green-600 border-black border text-white hover:bg-green-800",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
    },
    size: {
      sm: "px-3 py-3 text-sm w-[120px]",
      md: "px-4 py-4 text-base w-[180px]",
      lg: "px-5 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonLinkProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onHoverAction?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & VariantProps<typeof buttonLinkStyles> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonLink({
  href,
  children,
  onClick,
  className,
  variant,
  size,
  onHoverAction,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonLinkStyles({ variant, size }), className);

  if (href) {
    return (
      <Link onMouseEnter={onHoverAction} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onMouseEnter={onHoverAction}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
