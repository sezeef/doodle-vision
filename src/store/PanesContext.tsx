"use client";
import React, { createContext, useRef, useState, useEffect } from "react";

export type PanesState = {
  clientHeight: number | undefined;
  clientWidth: number | undefined;
  setClientHeight: (value: React.SetStateAction<number | undefined>) => void;
  setClientWidth: (value: React.SetStateAction<number | undefined>) => void;
  mouseHoldDownHandler: React.MouseEventHandler;
};

type PanesProviderProps = { children: React.ReactNode };

export const PanesContext = createContext<PanesState | undefined>(undefined);

export function PanesContextProvider({ children }: PanesProviderProps) {
  const [clientHeight, setClientHeight] = useState<number>();
  const [clientWidth, setClientWidth] = useState<number>();
  const yDividerPos = useRef<number | null>(null);
  const xDividerPos = useRef<number | null>(null);

  const mouseHoldDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e: MouseEvent) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(
      (clientHeight ?? 0) + e.clientY - (yDividerPos.current ?? 0)
    );
    setClientWidth((clientWidth ?? 0) + e.clientX - (xDividerPos.current ?? 0));

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });
  return (
    <PanesContext.Provider
      value={{
        clientHeight,
        clientWidth,
        setClientHeight,
        setClientWidth,
        mouseHoldDownHandler,
      }}
    >
      {children}
    </PanesContext.Provider>
  );
}
