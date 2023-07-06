"use client";
import React, { createContext, useState } from "react";

export type OutputState = {
  output: Output | undefined;
  setOutput: React.Dispatch<React.SetStateAction<Output | undefined>>;
};

type Output = {
  progress: number;
  size: string;
  urls: string[];
};

export const OutputContext = createContext<OutputState | undefined>(undefined);

export function OutputContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [output, setOutput] = useState<Output>();

  return (
    <OutputContext.Provider
      value={{
        output,
        setOutput,
      }}
    >
      {children}
    </OutputContext.Provider>
  );
}
