// TODO: make sure canvas is mobile accessible
// TODO: Make canvas resizable / full-screen mode

"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VerticalSlider } from "@/components/ui/slider";

type Props = {
  className?: string;
};
type Colors = { bg: "white" | "black"; fg: "white" | "black" };
type Size =
  | { width: 256; height: 256 }
  | { width: 512; height: 512 }
  | { width: 768; height: 768 };
type Brush = {
  brushWidth: number;
  brushCap: "round" | "butt" | "square";
};

const Canvas = forwardRef<HTMLCanvasElement, Props>(({ className }, ref) => {
  const refard = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const colors = useRef<Colors>({ bg: "black", fg: "white" });
  const brush = useRef<Brush>({ brushWidth: 4, brushCap: "round" });
  const size = useRef<Size>({ width: 512, height: 512 });

  function brushSliderHandler(val: number[]) {
    brush.current.brushWidth = val[0];
  }

  function invertCanvasHandler() {
    if (!ctx?.current) {
      throw new Error("ctx is undefined!");
    }

    // Invert background and brush colors
    const prev = colors.current;
    colors.current = { fg: prev.bg, bg: prev.fg };
    // Invert existing canvas
    const imageData = ctx.current.getImageData(
      0,
      0,
      size.current.width,
      size.current.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Invert rgb, leave alpha unchanged
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.current.putImageData(imageData, 0, 0);
  }

  function clearCanvasHandler() {
    if (!ctx?.current) {
      throw new Error("ctx is undefined!");
    }
    ctx.current.clearRect(0, 0, size.current.width, size.current.height);
    ctx.current.fillStyle = colors.current.bg;
    ctx.current.fillRect(0, 0, size.current.width, size.current.height);
  }

  function startDrawing(e: MouseEvent | TouchEvent) {
    if (!ctx?.current) {
      throw new Error("ctx is undefined!");
    }

    let x, y;
    if (e instanceof MouseEvent) {
      x = e.offsetX;
      y = e.offsetY;
    } else if (e instanceof TouchEvent) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      throw new Error("Failed to set (X, Y)");
    }

    ctx.current.beginPath();
    ctx.current.moveTo(x!, y!);

    isDrawing.current = true;
  }

  function draw(e: MouseEvent | TouchEvent) {
    if (!ctx?.current) {
      throw new Error("ctx is undefined!");
    }

    if (isDrawing.current === false) return;

    let x, y;
    if (e instanceof MouseEvent) {
      x = e.offsetX;
      y = e.offsetY;
    } else if (e instanceof TouchEvent) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      throw new Error("Failed to set (X, Y)");
    }

    ctx.current.lineWidth = brush.current.brushWidth;
    ctx.current.strokeStyle = colors.current.fg;
    ctx.current.lineCap = brush.current.brushCap;
    ctx.current.lineTo(x, y);
    ctx.current.stroke();
  }

  function stopDrawing() {
    isDrawing.current = false;
  }

  useEffect(() => {
    if (!refard.current) return;
    ctx.current = refard.current.getContext("2d");
    if (!ctx.current) return;

    refard.current.width = size.current.width;
    refard.current.height = size.current.height;

    ctx.current.fillStyle = colors.current.bg;
    ctx.current.fillRect(0, 0, size.current.width, size.current.height);

    refard.current.addEventListener("mousedown", startDrawing);
    refard.current.addEventListener("touchstart", startDrawing);
    refard.current.addEventListener("mousemove", draw);
    refard.current.addEventListener("touchmove", draw);
    refard.current.addEventListener("mouseup", stopDrawing);
    refard.current.addEventListener("mouseout", stopDrawing);
    refard.current.addEventListener("touchend", stopDrawing);

    return () => {
      refard.current?.removeEventListener("mousedown", startDrawing);
      refard.current?.removeEventListener("touchstart", startDrawing);
      refard.current?.removeEventListener("mousemove", draw);
      refard.current?.removeEventListener("touchmove", draw);
      refard.current?.removeEventListener("mouseup", stopDrawing);
      refard.current?.removeEventListener("mouseout", stopDrawing);
      refard.current?.removeEventListener("touchend", stopDrawing);
    };
  }, []);

  return (
    <div className={cn("flex", className)}>
      <canvas
        ref={(node) => {
          refard.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      />
      <div className="flex flex-col justify-evenly">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-1/2 items-center justify-center bg-neutral-100  hover:bg-neutral-100/80 dark:bg-neutral-800  dark:hover:bg-neutral-800/80">
                <VerticalSlider
                  min={1}
                  max={40}
                  defaultValue={[4]}
                  className="h-5/6"
                  onValueCommit={brushSliderHandler}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Brush Size</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="flex-1 rounded-none"
                onClick={invertCanvasHandler}
              >
                <div className="relative h-5 w-5 overflow-hidden rounded-full border bg-white">
                  <div className="absolute left-1/2 top-0 h-5 w-5 bg-black" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Invert Canvas Colors</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="flex-1 rounded-none"
                onClick={clearCanvasHandler}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Clear Canvas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
});

export default Canvas;
