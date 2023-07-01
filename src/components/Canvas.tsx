// TODO: Add bruch width slider
// TODO: Add clear canvas button
// TODO: Add invert colors button
// TODO: Make canvas resizable / full-screen mode

"use client";
import { forwardRef, useEffect, useRef } from "react";

type Props = {};

//! fix this
const colors = { bg: "black", fg: "white" };
const size = { width: 500, height: 500 };

const Canvas = forwardRef<HTMLCanvasElement, Props>(({}, ref) => {
  const refard = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = refard.current;
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
  }, [ref, refard]);

  return (
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
  );
});

export default Canvas;
