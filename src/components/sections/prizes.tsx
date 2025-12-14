import { BrickBlock } from "@/components/ui/brick-block";
import { ResponsiveBrickFloor } from "@/components/ui/responsive-brick-floor";
import { TrophyIcon } from "../icons/trophy";
import { Medal, Award } from "lucide-react";

const prizes = [
    {
        rank: "1st Place",
        amount: "₹50,000",
        icon: TrophyIcon,
        color: "text-yellow-400",
        size: "large",
    },
    {
        rank: "2nd Place",
        amount: "₹30,000",
        icon: Medal,
        color: "text-slate-300",
        size: "medium",
    },
    {
        rank: "3rd Place",
        amount: "₹20,000",
        icon: Award,
        color: "text-amber-600",
        size: "medium",
    },
]

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
        <div className="mx-auto grid max-w-5xl items-center justify-center gap-8 py-12 lg:grid-cols-3 lg:gap-12">
            {prizes.map((prize) => (
                <BrickBlock 
                    key={prize.rank}
                    id={`prize-brick-${prize.rank.toLowerCase().replace(' ', '-')}`} 
                    className="text-center w-full max-w-sm transition-transform duration-200 hover:-translate-y-2"
                >
                    <div className="relative mx-auto mb-6 flex items-center justify-center" style={{ height: prize.size === 'large' ? '128px' : '96px' }}>
                        <prize.icon className={`h-24 w-24 ${prize.color} ${prize.size === 'large' ? 'h-32 w-32' : 'h-24 w-24'}`} />
                    </div>
                    <h3 className={`font-headline text-3xl font-semibold leading-none tracking-tight ${prize.color}`}>{prize.rank}</h3>
                    <p className="text-2xl text-white mt-4 font-bold">{prize.amount}</p>
                </BrickBlock>
            ))}
        </div>
        <div className="text-center">
            <p className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">Overall Prize Pool: ₹1,00,000</p>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
