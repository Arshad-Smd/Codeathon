import { ThreeSceneBackground } from '@/components/three-scene-background';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { ResponsiveBrickFloor } from '../ui/responsive-brick-floor';

export function HeroSection() {
  return (
    <section id="hero" className="relative flex h-screen w-full flex-col items-center justify-center text-center">
      <ThreeSceneBackground />
      <div className="container z-10 px-4 sm:px-6">
        <h1 className="font-headline text-2xl font-bold tracking-tighter text-primary-foreground drop-shadow-lg xxs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl/none">
          Codeathon 2.0
        </h1>
        <p className="mx-auto mt-4 mb-8 max-w-[700px] text-gray-200 drop-shadow-md text-sm xxs:text-base md:text-xl">
        Innovate, Collaborate, and Launch Your Ideas, while our Mario walks you through the website and the complete hackathon information.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#about">Register Now</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#challenges">View Challenges</Link>
          </Button>
        </div>
      </div>
      <ResponsiveBrickFloor />
      <div className="absolute bottom-16 z-20">
        {/* <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="h-8 w-8 animate-bounce text-primary-foreground/70" />
        </Link> */}
      </div>
    </section>
  );
}
