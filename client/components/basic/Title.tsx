import fragment from "@images/title2.svg";
import Image from "next/image";
import { cn } from "../../utils/cn";
function Title({ title, className }: { title: string; className?: string }) {
  return (
    <div className="flex w-full justify-center gap-2 items-center">
      <Image
        alt="left title fragment"
        width={150}
        height={100}
        src={fragment}
        className="md:h-[150px] scale-x-[-1] h-[22px] w-auto"
      />
      <h1
        className={cn(
          "relative flex items-center justify-center title font-sung tracking-wider text-white text-[35px] lg:text-[60px] xl:text-[90px] font-bold italic",
          className
        )}
      >
        {title}
      </h1>
      <Image
        alt="left title fragment"
        width={150}
        height={100}
        src={fragment}
        className="md:h-[150px] h-[22px] w-auto"
      />
    </div>
  );
}

export default Title;
