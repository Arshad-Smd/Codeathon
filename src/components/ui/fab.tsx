
"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export function Fab({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 h-16 w-16 rounded-full shadow-lg"
      size="icon"
      aria-label="Jump"
    >
      <ArrowUp className="h-8 w-8" />
    </Button>
  );
}
