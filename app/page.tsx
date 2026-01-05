"use client";
import ButtonLink from "@client/components/basic/ButtonLink";
import { useWindowSize } from "@client/utils/hooks/useWindowWidth";
import BgMobile from "@images/bg-mobile.jpg";
import Background from "@images/bg.jpg";
import Title from "../client/components/basic/title/Title";

function MainPage() {
  const { viewport } = useWindowSize();

  const backgroundImage = viewport === "mobile" ? BgMobile.src : Background.src;

  return (
    <div
      className="py-10 min-h-screen xl:py-0 h-screen w-full bg-center bg-no-repeat bg-cover flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Title className="capitalize" title="Save The Forest" />
      <div className=" text-center items-center h-full xl:mt-0 xl:px-40 px-4 flex gap-2 xl:gap-1 flex-col md:mt-20 mt-30">
        <p className="text-amber-300 text-center w-full cst-text-shadow font-sung xl:leading-[100px] text-[32px] md:text-4xl xl:text-5xl xl:w-[300px]">
          PLAY, IMPROVE & WIN
        </p>
        <div className="flex flex-col h-full sm:h-auto gap-3 xl:gap-6">
          <p className="text-xl lg:text-2xl xl:text-3xl max-w-[700px] md:max-w-[500px] cst-text-shadow font-bold text-white font-montserrat ">
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
