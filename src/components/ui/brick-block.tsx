import { cn } from "@/lib/utils";
import React from "react";

export function BrickBlock({ className, children, id }: { className?: string, children?: React.ReactNode, id?: string }) {
  return (
    <div
      id={id}
      className={cn(
        "relative bg-mario-brown p-4 border-t-4 border-l-4 border-r-4 border-b-8 border-black/70 shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3),inset_-4px_0px_0px_0px_rgba(0,0,0,0.25)]",
        "before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-full before:h-1 before:bg-black/70",
        "after:content-[''] after:absolute after:top-0 after:left-1/2 after:h-full after:w-1 after:bg-black/70",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
