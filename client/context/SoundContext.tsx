"use client";

import { createContext, useContext, useEffect, useRef } from "react";

type SoundMap = { [key: string]: HTMLAudioElement };

const SoundContext = createContext<{ play: (name: string) => void }>({
  play: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const sounds = useRef<SoundMap>({});

  // Initialize Audio objects in useEffect → only in browser
  useEffect(() => {
    sounds.current = {
      criticalStrike: new Audio("/sounds/critical.m4a"),
      expose: new Audio("/sounds/decreaseDefense.m4a"),
      stoneSkin: new Audio("/sounds/increaseDefense.m4a"),
      cripplingStrike: new Audio("/sounds/decreaseAttack.m4a"),
      healingLight: new Audio("/sounds/heal.m4a"),
      manaInfusion: new Audio("/sounds/restoreMana.m4a"),
      inferno: new Audio("/sounds/fire.m4a"),
      mageOps: new Audio("/sounds/fireSpeak.m4a"),
      knightDead: new Audio("/sounds/deadKnight.m4a"),
      mageDead: new Audio("/sounds/deadMage.m4a"),
      hunterDead: new Audio("/sounds/deadHunter.m4a"),
      monsterDead: new Audio("/sounds/monsterDead.wav"),
      points: new Audio("/sounds/points.mp3"),
      damage: new Audio("/sounds/damage.m4a"),
      wolfStart: new Audio("/sounds/wolfStart.wav"),
      rage: new Audio("/sounds/rage.m4a"),
      hunterEntrance: new Audio("/sounds/hunterChosen.m4a"),
      knightEntrance: new Audio("/sounds/knightChosen.m4a"),
      mageEntrance: new Audio("/sounds/mageChosen.m4a"),
      monsterEntrance: new Audio("/sounds/wolfStart.wav"),
      fight: new Audio("/sounds/fight.mp3"),
      win: new Audio("/sounds/win.m4a"),
      lose: new Audio("/sounds/lose.m4a"),
    };
  }, []);

  const volumeMap: Record<string, number> = {
    manaInfusion: 1,
    monsterEntrance: 1,
    inferno: 1,
    mageEntrance: 1,
    deadMage: 1,
    deadKnight: 1,
    deadHunter: 1,
  };

  const play = (name: string) => {
    const sound = sounds.current[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.volume = volumeMap[name] || 0.6;
    sound.play();
  };

  return (
    <SoundContext.Provider value={{ play }}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used inside SoundProvider");
  return context;
}
