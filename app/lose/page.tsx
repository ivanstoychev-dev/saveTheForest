"use client";
import ButtonLink from "@client/components/basic/ButtonLink";
import StormBackground from "@client/components/containers/StormBackground";
import { useNavigation } from "@client/context/NavContext";
import { useSound } from "@client/context/SoundContext";
import { useWindowSize } from "@client/utils/hooks/useWindowWidth";
import loseImageMobile from "@images/lost-mobile.jpg";
import loseImage from "@images/lost.jpg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Lose() {
  const { allowed, reset } = useNavigation();
  const { play } = useSound();
  const router = useRouter();
  const { viewport } = useWindowSize();

  useEffect(() => {
    play("lose");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!allowed) {
      router.replace("/"); // redirect if not allowed
    }

    return () => {
      reset(); // optional: reset access when leaving page
    };
  }, [allowed, router, reset]);

  if (!allowed) return null; // render nothing while redirecting

  return (
    <StormBackground>
      <div
        className="h-screen flex flex-col items-center gap-4 justify-center xl:bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${
            viewport === "mobile" ? loseImageMobile.src : loseImage.src
          }`,
        }}
      >
        <h1 className="inherit xl:absolute xl:left-1/2 w-full text-center cst-text-shadow top-10 xl:-translate-x-1/2 z-20 text-red-600 text-6xl xl:text-[120px] font-sung font-bold uppercase">
          You Lose
        </h1>
        <div className="flex gap-4 items-center">
          <ButtonLink
            href={"/game"}
            className="bg-red-600 z-50 hover:bg-red-900"
          >
            Play Again
          </ButtonLink>
          <ButtonLink
            href={"/tutorial"}
            className="bg-red-600 z-50 hover:bg-red-900"
          >
            Watch tutorial
          </ButtonLink>
        </div>

        <div className="absolute h-full w-full bg-black/40"></div>
      </div>
    </StormBackground>
  );
}

export default Lose;
