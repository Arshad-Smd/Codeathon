
import { BrickBlock } from "@/components/ui/brick-block";
import { ResponsiveBrickFloor } from "@/components/ui/responsive-brick-floor";
import Image from "next/image";

const prizes = [
  {
    title: "1st Place",
    amount: "TBA",
  },
  {
    title: "2nd Place",
    amount: "TBA",
  },
  {
    title: "3rd Place",
    amount: "TBA",
  },
];

export function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">Prize Pool</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Compete for a chance to win from our massive prize pool. The top three teams will be rewarded for their innovation and hard work.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl justify-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {prizes.map((prize, index) => (
            <BrickBlock key={index} id={`prize-brick-${index}`} className="text-center max-w-sm">
                <div className="relative mx-auto mb-4 h-24 w-24">
                    <Image src="/coin icon.png" alt="Coin" layout="fill" objectFit="contain" />
                </div>
                <h3 className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">{prize.title}</h3>
                <p className="text-lg text-white mt-2 font-bold">{prize.amount}</p>
            </BrickBlock>
          ))}
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
