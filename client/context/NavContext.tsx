"use client";
import { createContext, useContext, useRef } from "react";

type NavigationContextType = {
  allowed: boolean;
  allow: () => void;
  reset: () => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const allowedRef = useRef(false);

  const allow = () => {
    allowedRef.current = true;
  };

  const reset = () => {
    allowedRef.current = false;
  };

  return (
    <NavigationContext.Provider
      value={{
        get allowed() {
          return allowedRef.current;
        },
        allow,
        reset,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext)!;
