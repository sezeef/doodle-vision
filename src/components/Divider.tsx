"use client";
import { useContext } from "react";
import { PanesContext } from "@/store/PanesContext";
import { cn } from "@/utils/classNames";

export default function Divider() {
  const panesContext = useContext(PanesContext);
  return (
    <div
      className={cn("relative w-[9px] cursor-col-resize bg-black")}
      onMouseDown={panesContext?.mouseHoldDownHandler}
    >
      <div className="absolute bottom-[45%] left-0 top-[45%] rounded border border-white" />
      <div className="absolute bottom-[45%] right-0 top-[45%] rounded border border-white" />
      <div className="absolute  bottom-[48%] left-1/2 top-[48%] -translate-x-[1px] rounded border border-white" />
    </div>
  );
}
