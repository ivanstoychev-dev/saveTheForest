"use client";
import ButtonLink from "@client/components/basic/ButtonLink";
import DefaultLayout from "@client/components/containers/DefaultLayout";
import TutorialFragmentLeft from "@images/tutorialTitleLeft.png";
import TutorialFragmentRight from "@images/tutorialTitleRight.png";
import { ArrowUpIcon } from "lucide-react";
import Image from "next/image";
import { dataTutorial } from "../../client/assets/data/DataTutorial";
import Title from "../../client/components/basic/title/Title";
import Hero from "../../client/components/standard/Hero";
import Monster from "../../client/components/standard/Monster";

function Tutorial() {
  return (
    <DefaultLayout className="p-2">
      <Title title="Save The Forest" />
      <section className="relative w-full xl:w-3/4 p-4 xl:p-20  bg-[rgba(0,0,0,0.9)] xl:bg-[rgba(0,0,0,0.7)]  shadow-2xl font-sung rounded-md text-white">
        <div className="flex gap-4 items-center w-full justify-center mb-6 xl:mb-10">
          <Image
            alt="left title fragment"
            width={150}
            height={100}
            src={TutorialFragmentLeft}
            className="md:h-[150px] h-[22px] w-auto"
          />
          <h2 className="flex text-4xl items-center justify-center relative text-center text-white font-sung lg:text-6xl">
            TUTORIAL
          </h2>
          <Image
            alt="right title fragment"
            width={150}
            height={100}
            className="md:h-[150px] h-[22px] w-auto"
            src={TutorialFragmentRight}
          />
        </div>

        <h3 className="text-3xl mb-2">
          Hello, <span className="text-green-500">Adventurer!</span>
        </h3>
        <p className="text-2xl">
          {" "}
          In your journey to save the forest you will control three heroes with
          unique abilities. With their help you have to defeat the monster, that
          destroys the forest and all its inhabitants. You can combine your
          heroes spells, but only one hero can attack per round. The spells you
          use cost mana and some spells, cost more mana than others. The heroes
          who dont fight the monster will regenerate 150MP and 50HP at the end
          of the round. Every round you will be able to choose a hero to fight
          with the monster. The chosen hero DOESN&apos;T regenerate any MP or HP
          at the end of the round.
        </p>

        {dataTutorial.map((data) => (
          <Hero
            key={data.name}
            name={data.name}
            desc={data.desc}
            image={data.image}
            spells={data.spells}
          />
        ))}
        <Monster />

        <div className="xl:absolute fixed xl:-right-[30px] bottom-5 gap-5   justify-center flex xl:flex-col">
          <div className="relative flex flex-col items-end hover:translate-x-10 transition-all duration-500">
            <ButtonLink className="text-lg" href="/">
              Home
            </ButtonLink>
            <div className="w-7 h-7 xl:block hidden -translate-x-0.5 bg-green-900 [clip-path:polygon(100%_0,-80%_150%,0_0)]"></div>
          </div>
          <div className="relative  flex flex-col items-end hover:translate-x-10 transition-all duration-500">
            <ButtonLink className="text-lg" href="/game">
              Start Game
            </ButtonLink>
            <div className="w-7 h-7 xl:block hidden -translate-x-0.5 bg-green-900 [clip-path:polygon(100%_0,-80%_150%,0_0)]"></div>
          </div>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full xl:block hidden place-self-end animate-bounce cursor-pointer w-16 h-16 text-4xl flex items-center justify-center bg-green-600"
        >
          <ArrowUpIcon className="w-10 h-auto" />
        </button>
      </section>
    </DefaultLayout>
  );
}

export default Tutorial;
