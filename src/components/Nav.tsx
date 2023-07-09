import React from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-slate-800 bg-black px-10">
      <div className="flex items-center justify-center gap-2">
        <Logo width={50} height={50} />
        <h1 className="bold text-2xl tracking-tighter text-sky-600 dark:text-sky-400">
          Doodle Vision
        </h1>
      </div>
      <ThemeToggle />
    </div>
  );
}
