// TODO: make a modal to show images in full size on click

"use client";
import React, { useContext, useEffect, useState } from "react";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import { OutputContext } from "@/store/OutputContext";
import { Progress } from "./ui/progress";

type Props = {};

export default function Results({}: Props) {
  const outputState = useContext(OutputContext);
  const output = outputState?.output;

  return (
    <div>
      <h1 className="mx-2 my-8 text-3xl font-bold">Output</h1>
      <div className="flex justify-center">
        {output?.progress !== undefined &&
          output.progress >= 0 &&
          output.progress < 100 && (
            <Progress value={output.progress} className="w-2/3" />
          )}
        {output?.urls && output?.size && output?.progress === 100 && (
          <div className="grid  grid-cols-2 gap-2 px-4">
            {output.urls.map((url) => (
              <img
                src={url}
                alt="output"
                width={parseInt(output.size, 10) ?? 0}
                height={parseInt(output.size, 10) ?? 0}
                className={cn(output.urls.length <= 2 && "col-span-2")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
