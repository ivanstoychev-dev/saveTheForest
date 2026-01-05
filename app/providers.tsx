"use client";

import { CharactersProvider } from "@client/context/CharactersContext";
import { NavigationProvider } from "@client/context/NavContext";
import { SoundProvider } from "@client/context/SoundContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <SoundProvider>
        <CharactersProvider>{children}</CharactersProvider>
      </SoundProvider>
    </NavigationProvider>
  );
}
