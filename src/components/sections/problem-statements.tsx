import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrainCircuit, HeartPulse, ExternalLink, ShieldCheck, Sprout, BookOpen } from "lucide-react";
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
        value: "green-tech",
        title: "Green Tech",
        icon: Sprout,
        description: "Create sustainable solutions to environmental challenges. Focus on renewable energy, waste reduction, conservation, or sustainable agriculture to build a greener future.",
        docUrl: "https://docs.google.com/document/d/1Q_WvUlTprpzeet4P4AHSWCxWzLnw22q9CoUoDoOrh0Q/edit?usp=sharing",
    },
    {
        value: "cybersecurity",
        title: "Cybersecurity",
        icon: ShieldCheck,
        description: "Build tools and systems to protect digital assets and privacy. Tackle challenges in threat detection, data encryption, secure authentication, or network security.",
        docUrl: "https://docs.google.com/document/d/1tdBj4ia9lDHXrQZjt_xNImoMn5qEfgw6ho7JCUH64gU/edit?usp=sharing",
    },
    {
        value: "edtech",
        title: "EdTech",
        icon: BookOpen,
        description: "Innovate in education by creating tools for personalized learning, virtual classrooms, or accessible educational content. Empower learners and educators with new technologies.",
        docUrl: "https://docs.google.com/document/d/1RSa54Aoo6f4pr2KYfYRMSoiDSMNHPIUUVaz2lAAQzxE/edit?usp=sharing",
    },
    {
        value: "healthcare",
        title: "Healthcare",
        icon: HeartPulse,
        description: "Improve health outcomes with technology. Your project could be in telemedicine, health monitoring, medical data analysis, or improving access to healthcare services.",
        docUrl: "https://docs.google.com/document/d/1hhatvLpijIMK-Sr98UHh9QOiMPQrQ97hQWtQgz-96hw/edit?usp=sharing",
    },
];

export function ProblemStatementsSection() {
  return (
    <section id="challenges" className="relative w-full bg-card py-12 md:py-24 lg:py-32">
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
                <AccordionItem key={theme.value} value={theme.value}>
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
