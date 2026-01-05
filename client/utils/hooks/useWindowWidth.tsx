import { useEffect, useState } from "react";

type Viewport = "mobile" | "desktop";

export function useWindowSize(): { width: number; viewport: Viewport } {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const viewport: Viewport = width < 750 ? "mobile" : "desktop";

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, viewport };
}
