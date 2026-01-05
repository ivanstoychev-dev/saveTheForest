import { cn } from "@client/utils/cn";
import ArenaBg from "@images/arena-bg.png";
import Background from "@images/bg.jpg";
import React from "react";

function DefaultLayout({
  children,
  className,
  type = "tutorial",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "arena" | "tutorial";
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-cente gap-10 xl:gap-20 bg-fixed! bg-cover! bg-center! bg-no-repeat! min-h-screen!  items-center w-full ",
        className
      )}
      style={{
        background: `url(${
          type === "tutorial" ? Background.src : ArenaBg.src
        })`,
      }}
    >
      {children}
    </div>
  );
}

export default DefaultLayout;
