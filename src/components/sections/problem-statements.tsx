import { ExternalLink, Truck } from "lucide-react";
import { ResponsiveBrickFloor } from "../ui/responsive-brick-floor";
import { Button } from "../ui/button";
import Link from "next/link";

const supplyChainTheme = {
    title: "Supply Chain",
    icon: Truck,
    description: (
        <>
            Innovate in real-world supply chain management, with challenges
            especially given by{" "}
            <span className="text-yellow-300 font-semibold">Orchestro AI</span>.
            Build solutions for inventory tracking, route optimization, demand
            forecasting, or last-mile delivery to improve efficiency and
            resilience.
        </>
    ),
    docUrl: "https://docs.google.com/document/d/1Q_WvUlTprpzeet4P4AHSWCxWzLnw22q9CoUoDoOrh0Q/edit?usp=sharing",
};

export function ProblemStatementsSection() {
  return (
    <section id="challenges" className="relative w-full bg-transparent py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 z-10">
      <div className="container px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 md:pb-24">
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-accent">
            Challenge Theme
          </h2>
          <p className="max-w-[90%] sm:max-w-[600px] md:max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
            Solve a real-world problem with our featured challenge.
          </p>
        </div>
        <div className="mx-auto max-w-2xl flex justify-center px-2 sm:px-0">
            <div className="relative bg-mario-brown p-4 sm:p-6 md:p-8 border-t-4 border-l-4 border-r-4 border-b-8 border-black/70 shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3),inset_-4px_0px_0px_0px_rgba(0,0,0,0.25)] w-full transition-transform duration-200 hover:-translate-y-2">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="mx-auto md:mx-0 mb-3 sm:mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10">
                        <supplyChainTheme.icon className="h-8 w-8 sm:h-10 sm:w-10 text-gray-100" />
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-yellow-300">
                        {supplyChainTheme.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white mt-3 sm:mt-4 max-w-prose leading-relaxed">
                        {supplyChainTheme.description}
                    </p>
                    <div className="mt-4 sm:mt-6 w-full flex justify-center md:justify-start">
                        <Button asChild className="w-full sm:w-auto text-sm sm:text-base">
                            <Link href={supplyChainTheme.docUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                <span className="truncate">View Problem Statement</span>
                                <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}