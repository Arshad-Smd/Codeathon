
import { BrickBlock } from "@/components/ui/brick-block";
import { ResponsiveBrickFloor } from "@/components/ui/responsive-brick-floor";
import { TrophyIcon } from "../icons/trophy";

export function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">Prize Pool</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Compete for a chance to win from our massive prize pool. The top teams will be rewarded for their innovation and hard work.
            </p>
          </div>
        </div>
        <div className="mx-auto flex justify-center py-12">
            <BrickBlock 
                id="prize-brick-overall"
                className="text-center w-full max-w-md transition-transform duration-200 hover:-translate-y-2"
            >
                <div className="relative mx-auto mb-6 flex h-32 items-center justify-center">
                    <TrophyIcon className="h-32 w-32 text-yellow-400 animate-spin-y" />
                </div>
                <p className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">
                  Overall Prize Pool: <span className="text-3xl font-bold text-white">₹1,00,000</span>
                </p>
            </BrickBlock>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
