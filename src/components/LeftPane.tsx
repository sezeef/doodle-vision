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
      panesContext?.setClientWidth((topRef?.current?.clientWidth ?? 0) * 1.8);
      return;
    }

    if (topRef?.current) {
      topRef.current.style.minWidth = panesContext?.clientWidth + "px";
      topRef.current.style.maxWidth = panesContext?.clientWidth + "px";
    }
  }, [panesContext?.clientWidth]);

  return (
    <div className={cn("flex-grow overflow-hidden", className)} ref={topRef}>
      {children}
    </div>
  );
}
