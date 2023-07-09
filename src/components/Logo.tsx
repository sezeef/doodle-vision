import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  width: number;
  height: number;
};

export default function Logo({ className, width, height }: Props) {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full border-2 border-slate-800 bg-black"
      style={{ width, height }}
    >
      <Image
        src={"/Cute-Eye.jpg"}
        alt="Logo"
        width={width}
        height={height}
        className={cn(className)}
      />
    </div>
  );
}
