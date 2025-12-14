
"use client";

import { useEffect, useState } from "react";
import { TrophyIcon } from "../icons/trophy";
import { ResponsiveBrickFloor } from "@/components/ui/responsive-brick-floor";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

export function PrizesSection() {
  const isMobile = useIsMobile();
  const [isRevealed, setIsRevealed] = useState(isMobile);

  useEffect(() => {
    // If it's already revealed on mobile, no need to add listener
    if (isMobile) return;

    const handlePrizeReveal = () => {
      setIsRevealed(true);
    };

    window.addEventListener("prize-reveal", handlePrizeReveal);

    return () => {
      window.removeEventListener("prize-reveal", handlePrizeReveal);
    };
  }, [isMobile]);

  // When isMobile value changes (on initial client-side render), update the state
  useEffect(() => {
    if(isMobile) {
      setIsRevealed(true);
    }
  }, [isMobile]);


  return (
    <section id="prizes" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10 min-h-[50vh] flex items-center justify-center">
      <div className="container px-4 md:px-6 text-center">
        {!isRevealed ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2 mb-8">
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">The Grand Prize</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-full max-w-4xl">
              <p className="text-muted-foreground text-right md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A mysterious prize awaits! Have Mario jump and hit the question block...
              </p>
              <div id="question-block-placeholder" className="w-32 h-32 mx-auto mb-8" />
              <p className="text-muted-foreground text-left md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ...to see what's inside!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-90 duration-500">
             <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">You found it!</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Compete for a chance to win from our massive prize pool. The top teams will be rewarded for their innovation and hard work.
                </p>
            </div>
            <div className="relative bg-mario-brown p-8 border-t-4 border-l-4 border-r-4 border-b-8 border-black/70 shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3),inset_-4px_0px_0px_0px_rgba(0,0,0,0.25)] text-center w-full max-w-lg transition-transform duration-200 hover:-translate-y-2 flex flex-col items-center justify-center">
              <TrophyIcon className="h-24 w-24 text-yellow-400 animate-spin-y" />
              <p className="font-headline text-xl font-semibold leading-none tracking-tight text-yellow-300 mt-4">
                Overall Prize Pool
              </p>
              <p className="font-headline text-5xl font-bold text-white mt-2 drop-shadow-lg">
                ₹1,00,000
              </p>
            </div>
          </div>
        )}
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
