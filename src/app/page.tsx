
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TimelineSection } from "@/components/sections/timeline";
import { ProblemStatementsSection } from "@/components/sections/problem-statements";
import { SponsorsSection } from "@/components/sections/sponsors";
import { ContactSection } from "@/components/sections/contact";
import { ThreeScene } from "@/components/three-scene";
import { PrizesSection } from "@/components/sections/prizes";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <ThreeScene />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <PrizesSection />
        <ProblemStatementsSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
