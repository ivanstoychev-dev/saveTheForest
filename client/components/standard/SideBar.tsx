"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-20"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-screen  text-white
        transition-width duration-500 ease-in-out
        flex flex-col gap-3 border-r border-white/10 z-30
        shadow-xl shadow-black/30
        ${
          open
            ? "w-60 bg-darkGray px-4 pt-6"
            : "pt-3 px-2 w-[90px] bg-darkGray100"
        }`}
      >
        {/* TOP SECTION */}
        {open ? (
          <span className="uppercase w-full text-white font-montserrat font-bold tracking-wide text-xl text-center">
            Menu
          </span>
        ) : (
          <div className="flex w-full justify-center items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 cursor-pointer hover:bg-white/10 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-4 mt-2">{children}</nav>

        {/* FOOTER */}
        <div className="mt-auto text-pink p-4 text-sm font-montserrat font-bold">
          {open && "© Ivan Stoychev"}
        </div>
      </aside>
    </>
  );
}
