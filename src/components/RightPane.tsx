import React from "react";
import { cn } from "@/utils/classNames";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function RightPane({ className, children }: Props) {
  return (
    <div className={cn("flex-grow overflow-hidden", className)}>{children}</div>
  );
}
