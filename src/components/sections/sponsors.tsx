
import Image from "next/image";
import { ResponsiveBrickFloor } from "../ui/responsive-brick-floor";
import Link from "next/link";

const goldSponsors = [
  { name: "Isaii AI", path: "/isaii AI - premium.jpg", url: "https://www.isaii.in/" },
  { name: "Orchestro AI", path: "/orchestro AI - premium.jpg", url: "https://www.orchestro.ai/" },
];

const silverSponsors = [
  { name: "Art of Problem Solving", path: "/Art of problem solving-goodies.jpg", url: "https://artofproblemsolving.com/" },
  { name: "Eventopia", path: "/eventopia-goodies.jpg", url: "https://eventopia.in/" },
  { name: "Interview Buddy", path: "/interviewbuddy-goodies.jpg", url: "https://interviewbuddy.net/" },
  { name: "Navan", path: "/navan-goodies.jpg", url: "https://navan.ai/" },
  { name: "Balsamiq", path: "/balsamiq-goodies.jpg", url: "https://balsamiq.com/" },
  { name: "CodeCrafters.io", path: "/CodeCrafters.io full logo (Dark text).png", url: "https://codecrafters.io/" },
  { name: "Trikaya", path: "/trikiya.jpeg", url: "https://www.trikaya.io/" },
];

const SponsorLogo = ({ name, path, url }: { name: string; path: string; url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center p-2">
    <div className="relative group flex justify-center items-center h-32 w-full bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-2">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={path}
          alt={`${name} logo`}
          width={200}
          height={80}
          className="object-contain max-h-full max-w-full"
        />
      </div>
    </div>
  </Link>
);

export function SponsorsSection() {
  return (
    <section id="sponsors" className="relative w-full bg-transparent py-12 md:py-24 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-5xl">Our Partners</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            We are proud to partner with leading companies in the tech industry.
          </p>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16">
          <h3 className="mb-8 text-center font-headline text-2xl font-semibold text-accent/80 sm:text-3xl">
          Core Sponsors
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {goldSponsors.map((sponsor) => (
              <SponsorLogo key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div>
          <h3 className="mb-8 text-center font-headline text-2xl font-semibold text-accent/80 sm:text-3xl">
          Impact partners
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {silverSponsors.map((sponsor) => (
              <SponsorLogo key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
