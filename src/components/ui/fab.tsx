
"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export function Fab({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 h-14 w-14 rounded-full shadow-lg"
      size="icon"
      aria-label="Jump"
    >
      <ArrowUp className="h-7 w-7" />
    </Button>
  );
}
