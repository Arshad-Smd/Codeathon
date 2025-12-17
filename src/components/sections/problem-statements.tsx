
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, ExternalLink, BookOpen, Truck } from "lucide-react";
import { ResponsiveBrickFloor } from "../ui/responsive-brick-floor";
import { Button } from "../ui/button";
import Link from "next/link";

const themes = [
    {
        value: "ai",
        title: "AI",
        icon: BrainCircuit,
        description: "Develop intelligent systems that can learn, reason, and solve complex problems. Projects could involve machine learning models, natural language processing, or computer vision.",
        docUrl: "https://docs.google.com/document/d/1H63UpDAI_l38Ujoy0XpQbrHEyyqJQ58FyVcgBokTPQo/edit?usp=sharing",
    },
    {
        value: "supply-chain",
        title: "Supply Chain",
        icon: Truck,
        description: "Innovate in real-world supply chain management, with challenges especially given by Orchestro AI. Build solutions for inventory tracking, route optimization, demand forecasting, or last-mile delivery to improve efficiency and resilience.",
        docUrl: "https://docs.google.com/document/d/1Q_WvUlTprpzeet4P4AHSWCxWzLnw22q9CoUoDoOrh0Q/edit?usp=sharing",
    },
    {
        value: "edtech",
        title: "EdTech",
        icon: BookOpen,
        description: "Innovate in education by creating tools for personalized learning, virtual classrooms, or accessible educational content. Empower learners and educators with new technologies.",
        docUrl: "https://docs.google.com/document/d/1RSa54Aoo6f4pr2KYfYRMSoiDSMNHPIUUVaz2lAAQzxE/edit?usp=sharing",
    },
];

export function ProblemStatementsSection() {
  return (
    <section id="challenges" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-4xl md:text-5xl">Challenge Themes</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Choose a theme and solve a real-world problem. Each theme offers a unique set of challenges and opportunities.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {themes.map((theme) => (
                <AccordionItem key={theme.value} value={theme.value} className="transition-transform duration-200 hover:-translate-y-1">
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex items-center gap-4">
                            <theme.icon className="h-6 w-6 text-gray-100" />
                            {theme.title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {theme.description}
                        <div className="mt-4">
                            <Button asChild>
                                <Link href={theme.docUrl} target="_blank" rel="noopener noreferrer">
                                    View Problem Statement
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
