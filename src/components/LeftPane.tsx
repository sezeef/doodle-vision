// TODO: Add dynamic window resizing
// TODO: Add animated resizing on submit

"use client";
import React, { useContext, useEffect, useRef } from "react";
import { PanesContext } from "@/store/PanesContext";
import { cn } from "@/utils/classNames";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function LeftPane({ className, children }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const panesContext = useContext(PanesContext);

  useEffect(() => {
    if (!panesContext?.clientWidth) {
      panesContext?.setClientWidth(topRef?.current?.clientWidth ?? 0);
      return;
    }

    if (topRef?.current) {
      topRef.current.style.minWidth = panesContext?.clientWidth + "px";
      topRef.current.style.maxWidth = panesContext?.clientWidth + "px";
    }
  }, [panesContext?.clientWidth]);

  return (
    <div
      className={cn(
        "w-2/3 overflow-x-hidden overflow-y-scroll px-10 py-5",
        className
      )}
      ref={topRef}
    >
      {children}
    </div>
  );
}
