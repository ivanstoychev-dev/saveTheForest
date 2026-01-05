"use client";
import dynamic from "next/dynamic";

import React from "react";

function StormBackground({ children }: React.PropsWithChildren) {
  const Rain = dynamic(() => import("@client/components/basic/Rain"), {
    ssr: false,
  });
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]">
      {/* Rain */}
      <Rain />

      {/* Lightning */}
      <div className="lightning"></div>

      {children}
    </div>
  );
}

export default StormBackground;
