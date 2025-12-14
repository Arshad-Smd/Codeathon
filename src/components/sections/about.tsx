
import { BrickBlock } from "@/components/ui/brick-block";
import { ResponsiveBrickFloor } from "@/components/ui/responsive-brick-floor";
import { Orbit, Rocket, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">About The Codeathon</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              This is a premier event for developers, designers, and innovators to come together, tackle real-world challenges, and build amazing projects. Join us for a weekend of intense coding, learning, and networking.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl justify-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <BrickBlock id="innovate-brick" className="text-center max-w-sm transition-transform duration-200 hover:-translate-y-2">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Rocket className="h-10 w-10 text-gray-100" />
            </div>
            <h3 className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">Innovate</h3>
            <p className="text-sm text-white mt-2">Explore and build creative solutions that push the limits of technology.</p>
          </BrickBlock>
          <BrickBlock id="collaborate-brick" className="text-center max-w-sm transition-transform duration-200 hover:-translate-y-2">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-10 w-10 text-gray-100" />
            </div>
            <h3 className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">Collaborate</h3>
            <p className="text-sm text-white mt-2">Work with talented individuals from diverse backgrounds and skill sets.</p>
          </BrickBlock>
          <BrickBlock id="launch-brick" className="text-center max-w-sm transition-transform duration-200 hover:-translate-y-2">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Orbit className="h-10 w-10 text-gray-100" />
            </div>
            <h3 className="font-headline text-2xl font-semibold leading-none tracking-tight text-yellow-300">Launch</h3>
            <p className="text-sm text-white mt-2">Bring your ideas to life and present them to a panel of industry experts.</p>
          </BrickBlock>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
