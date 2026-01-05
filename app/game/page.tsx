"use client";

import ButtonLink from "@client/components/basic/ButtonLink";
import CharacterContainer from "@client/components/containers/CharacterContainer";
import DefaultLayout from "@client/components/containers/DefaultLayout";
import HeroesContainer from "@client/components/containers/HeroesContainer";
import { useCharacters } from "@client/context/CharactersContext";
import { useSound } from "@client/context/SoundContext";
import { cn } from "@client/utils/cn";
import { calculateDamage } from "@client/utils/engine";
import { useWindowSize } from "@client/utils/hooks/useWindowWidth";
import { Character } from "@client/utils/types";
import monsterSlash from "@images/monsterSlash.png";
import slashImage from "@images/slash.png";
import SwordsImage from "@images/swords.png";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Game() {
  const { characters, onFight, resetHeroes } = useCharacters();
  const { play } = useSound();
  const { viewport } = useWindowSize();

  const [activeHeroId, setActiveHeroId] = useState("1");

  // Animation / UI states grouped into one object
  const [ui, setUi] = useState({
    showHero: false,
    showMonster: false,
    slashVisible: false,
    damageVisible: false,
  });

  const burnDamage = 120;

  // Derived values (fast, memoized)
  const activeHero = characters.find((c) => c.id === activeHeroId);

  const monster = useMemo(
    () => characters.find((c) => c.id === "4"),
    [characters]
  );

  if (!activeHero && characters.length > 1) {
    setActiveHeroId(characters[0].id);
  }

  // Entrance animation sequence
  useEffect(() => {
    resetHeroes();

    const t1 = setTimeout(() => {
      play("monsterEntrance");
      setUi((s) => ({ ...s, showMonster: true }));
    }, 500);

    const t2 = setTimeout(() => {
      if (activeHero) play(activeHero.sounds.entrance);
      setUi((s) => ({ ...s, showHero: true }));
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-hide damage numbers
  useEffect(() => {
    if (!ui.damageVisible) return;

    const timer = setTimeout(() => {
      setUi((s) => ({
        ...s,
        damageVisible: false,
        slashVisible: false,
      }));
    }, 900);

    return () => clearTimeout(timer);
  }, [ui.damageVisible]);

  const [heroHits, setHeroHits] = useState({ damage: 0, burnDamage: 0 });
  const [monsterHits, setMonsterHits] = useState({
    damage: 0,
    burnDamage: 0,
  });

  const handleFight = () => {
    if (!activeHero || !monster) return;

    const heroDamage = calculateDamage(activeHero.attack, monster.defence);
    const monsterDamage = calculateDamage(monster.attack, activeHero.defence);

    onFight(activeHeroId, monster.id, heroDamage, monsterDamage);

    play("fight");

    const burning = monster.activeStatuses.some((s) => s.name === "inferno");

    setHeroHits({
      damage: heroDamage,
      burnDamage: burning ? burnDamage : 0,
    });

    setMonsterHits({
      damage: monsterDamage,
      burnDamage: 0,
    });

    setUi((s) => ({ ...s, slashVisible: true }));

    setTimeout(() => {
      play("damage");
      setUi((s) => ({ ...s, damageVisible: true }));
    }, 400);
  };

  const handleHeroChange = useCallback(
    (hero: Character) => {
      play(hero.sounds.entrance);
      setActiveHeroId(hero.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // dependencies go here
  );

  return (
    <DefaultLayout type="arena" className="overflow-hidden h-screen">
      <div className="flex w-full h-full justify-start">
        {characters.length > 2 && (
          <HeroesContainer
            characters={characters}
            activeHeroId={activeHeroId}
            handleHeroChange={handleHeroChange}
            disableCharacter={activeHero?.isDead}
            variant={viewport}
          />
        )}

        <div className="flex flex-col ml-[50px] w-full h-full items-center pt-5 xl:pt-10 gap-2 xl:gap-10">
          {/* Title */}
          <div className="flex justify-center items-center gap-2">
            <Image
              alt="title icon"
              src={SwordsImage}
              width={100}
              height={100}
              className="xl:w-[100px] md:w-[55px] w-[35px]"
            />
            <h1 className="font-sung text-3xl md:text-5xl xl:text-8xl text-amber-300 font-bold cst-text-shadow">
              Battlefield
            </h1>
            <Image
              alt="title icon"
              src={SwordsImage}
              width={100}
              height={100}
              className="xl:w-[100px] md:w-[55px] w-[35px]"
            />
          </div>

          {/* Arena */}
          <div className="flex relative flex-col md:flex-row justify-center items-center gap-5 xl:gap-20 h-auto xl:min-h-[570px]">
            {activeHero && ui.showHero ? (
              <CharacterContainer
                className="animate-slide-x"
                character={activeHero}
                showCharacter={ui.showHero}
                damages={monsterHits}
                damageVisible={ui.damageVisible}
                slashImage={monsterSlash}
                slashVisible={ui.slashVisible}
              />
            ) : (
              <div className="h-[363px] w-[200px]" />
            )}

            <div className="flex flex-col justify-center items-center min-w-[150px]">
              <span className="text-red-600 hidden sm:block text-[55px] xl:text-[100px] font-sung font-bold cst-text-shadow">
                VS
              </span>

              <ButtonLink
                className={cn(
                  "bg-linear-to-r from-red-900 shadow-black shadow-sm to-transparent bg-red-500 hover:scale-110 transition-all duration-500 hover:from-red-500 hover:bg-red-900 ",
                  ui.slashVisible || !ui.showHero || activeHero?.hp === 0
                    ? "opacity-0"
                    : "opacity-100"
                )}
                onClick={handleFight}
                disabled={ui.slashVisible || activeHero?.hp === 0}
                size={viewport === "desktop" ? "md" : "sm"}
              >
                FIGHT
              </ButtonLink>
            </div>

            {monster && (
              <CharacterContainer
                className="animate-slide-right-to-left"
                character={monster}
                showCharacter={ui.showMonster}
                damages={heroHits}
                damageVisible={ui.damageVisible}
                slashImage={slashImage}
                damageDisplayPosition="right"
                slashVisible={ui.slashVisible}
              />
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
