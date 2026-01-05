"use client";
import ButtonLink from "@client/components/basic/ButtonLink";
import { useWindowSize } from "@client/utils/hooks/useWindowWidth";
import Title from "../client/components/basic/Title";

function MainPage() {
  const { viewport } = useWindowSize();

  console.log(viewport);

  return (
    <div
      className="py-10 min-h-screen xl:py-0 xl:pt-5 h-screen w-full bg-center bg-no-repeat bg-cover lg:bg-[url('../client/assets/images/bg.jpg')] bg-[url('../client/assets/images/bg-mobile.jpg')]
   flex flex-col"
    >
      <Title className="capitalize" title="Save The Forest" />
      <div className=" text-center items-center h-full xl:mt-0 xl:px-40 px-4 flex gap-2 xl:gap-1 flex-col md:mt-20 mt-30">
        <p className="text-amber-300 xl:mt-20 text-center w-full cst-text-shadow font-sung xl:leading-[70px] text-[32px] md:text-4xl xl:text-5xl xl:w-[500px]">
          PLAY, IMPROVE & WIN
        </p>
        <div className="flex flex-col h-full sm:h-auto gap-3 xl:gap-6">
          <p className="text-xl lg:text-2xl  max-w-[700px] md:max-w-[500px] cst-text-shadow font-bold text-white font-montserrat ">
            Help the heroes to save the forest from the monster and get back
            home.
          </p>
          <div className="flex mt-auto gap-4 w-full justify-center items-center">
            <ButtonLink href="/tutorial" className="">
              Tutorial
            </ButtonLink>
            <ButtonLink href="/game" className="">
              Play
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
