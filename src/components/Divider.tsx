"use client";
import { useContext } from "react";
import { PanesContext } from "@/store/PanesContext";
import { cn } from "@/utils/classNames";

export default function Divider() {
  const panesContext = useContext(PanesContext);
  return (
    <div
      className={cn(
        " flex w-3 cursor-col-resize items-center  justify-center border-l border-r border-slate-800 bg-black"
      )}
      onMouseDown={panesContext?.mouseHoldDownHandler}
    >
      <div>
        <div className="my-3 h-1 w-1 rounded-full bg-slate-200" />
        <div className="my-3 h-1 w-1 rounded-full bg-slate-200" />
        <div className="my-3 h-1 w-1 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
