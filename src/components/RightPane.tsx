import React from "react";
import { cn } from "@/utils/classNames";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function RightPane({ className, children }: Props) {
  return (
    <div
      className={cn(
        "flex-grow overflow-x-hidden overflow-y-scroll bg-[#EEEEEE] dark:bg-[#000313]",
        className
      )}
    >
      {children}
    </div>
  );
}
