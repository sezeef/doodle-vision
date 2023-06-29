"use client";
import { useCanvas } from "@/lib/useCanvas";

type Props = {};

export default function Canvas({}: Props) {
  const canvasRef = useCanvas({
    colors: { bg: "black", fg: "white" },
    size: { width: 500, height: 500 },
  });

  return <canvas ref={canvasRef} />;
}
