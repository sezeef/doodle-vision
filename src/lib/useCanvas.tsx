"use client";
import { useRef, useEffect } from "react";

type ArgTypes = {
  size: { width: number; height: number };
  colors: {
    bg: string;
    fg: string;
  };
};

export function useCanvas({ size, colors }: ArgTypes) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size.width;
    canvas.height = size.height;
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, size.width, size.height);

    let isDrawing = false;
    const startDrawing = (event: MouseEvent) => {
      isDrawing = true;
      draw(event);
    };
    const stopDrawing = () => {
      isDrawing = false;
      ctx.beginPath();
    };
    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;

      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.strokeStyle = colors.fg;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
    };
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
    };
  }, [canvasRef]);

  return canvasRef;
}
