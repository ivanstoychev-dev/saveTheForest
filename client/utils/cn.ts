import { twMerge } from "tailwind-merge";

export function cn(
  ...inputs: Array<string | undefined | false | null>
): string {
  return twMerge(
    inputs
      .flatMap((input) => (Array.isArray(input) ? input : [input]))
      .filter(Boolean)
      .join(" ")
  );
}
