
"use client";

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
import { ThreeSceneBackground } from "@/components/three-scene-background";
import { Fab } from "@/components/ui/fab";
import { useEffect, useState } from "react";

export default function Home() {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const prizesSection = document.getElementById('prizes');
      if (prizesSection) {
        const rect = prizesSection.getBoundingClientRect();
        // Show FAB when the prizes section is in view
        setShowFab(rect.top < window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFabClick = () => {
    window.dispatchEvent(new CustomEvent('mario-jump'));
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <ThreeScene />
      <ThreeSceneBackground />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <PrizesSection />
        <ProblemStatementsSection />
        <SponsorsSection />
        <ContactSection />
      </main>
      <Footer />
      {showFab && <Fab onClick={handleFabClick} />}
    </div>
  );
}
