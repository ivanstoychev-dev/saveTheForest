import { cn } from "../../../utils/cn";
function Title({ title, className }: { title: string; className?: string }) {
  return (
    <div>
      <h1
        className={cn(
          "relative flex items-center justify-center title font-sung tracking-wider text-white text-[35px] lg:text-[60px] xl:text-[90px] font-bold italic",
          className
        )}
      >
        {title}
      </h1>
    </div>
  );
}

export default Title;
