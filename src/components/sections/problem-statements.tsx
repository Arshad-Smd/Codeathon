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
    <section id="challenges" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-4xl md:text-5xl">Challenge Theme</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Solve a real-world problem with our featured challenge.
          </p>
        </div>
        <div className="mx-auto max-w-2xl flex justify-center">
            <div className="relative bg-mario-brown p-6 md:p-8 border-t-4 border-l-4 border-r-4 border-b-8 border-black/70 shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3),inset_-4px_0px_0px_0px_rgba(0,0,0,0.25)] text-center w-full transition-transform duration-200 hover:-translate-y-2">
                <div className="flex flex-col items-center justify-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <supplyChainTheme.icon className="h-10 w-10 text-gray-100" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">{supplyChainTheme.title}</h3>
                    <p className="text-sm text-white mt-4 max-w-prose">
                        {supplyChainTheme.description}
                    </p>
                    <div className="mt-6">
                        <Button asChild>
                            <Link href={supplyChainTheme.docUrl} target="_blank" rel="noopener noreferrer">
                                View Problem Statement
                                <ExternalLink className="ml-2 h-4 w-4" />
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
