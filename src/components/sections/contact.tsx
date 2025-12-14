
import Image from "next/image";
import { Phone } from "lucide-react";

const organizers = [
  {
    name: "Tarun V",
    phone: "9894242146",
    linkedin: "https://www.linkedin.com/in/tarun-v-sece",
  },
  {
    name: "Sreejesh",
    phone: "7845474916",
    linkedin: "https://www.linkedin.com/in/sreejesh-/",
  },
  {
    name: "Mohammed Arshad",
    phone: "9489311521",
    linkedin: "https://www.linkedin.com/in/mohammed-arshad-s-500b5a259/",
  },
  {
    name: "Prasanna",
    phone: "9442823677",
    linkedin: "https://www.linkedin.com/in/prasanna-murthy-n/",
  },
];

const ContactCard = ({ name, phone, linkedin }: { name: string, phone: string, linkedin: string | null }) => (
  <div className="relative bg-mario-brown p-4 border-t-4 border-l-4 border-r-4 border-b-8 border-black/70 shadow-[inset_4px_4px_0px_0px_rgba(255,255,255,0.3),inset_-4px_0px_0px_0px_rgba(0,0,0,0.25)] w-full text-center">
    <h4 className="text-lg font-bold font-headline text-white drop-shadow-sm">{name}</h4>
    <div className="flex items-center justify-center gap-2 mt-2">
      <Phone className="h-4 w-4 text-gray-100" />
      <p className="text-base text-white">{phone}</p>
    </div>
    {linkedin && (
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 transition-transform hover:scale-110">
        <div className="bg-white rounded-lg p-1 flex items-center justify-center w-9 h-9">
          <Image src="/linkedin logo.png" alt="LinkedIn" width={24} height={24} />
        </div>
      </a>
    )}
  </div>
);

export function ContactSection() {
  return (
    <section id="contact" className="w-full bg-transparent py-12 md:py-24 lg:py-32 relative z-10">
      <div className="container px-4 md:px-6">
        <div className="space-y-3 text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent md:text-4xl/tight">
            Have Questions?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Reach out to our organizers for any queries about the event.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-items-center gap-8 lg:gap-4">
          {/* Left Column */}
          <div className="w-full max-w-sm space-y-6 flex flex-col items-center">
            <ContactCard {...organizers[0]} />
            <ContactCard {...organizers[1]} />
          </div>

          {/* Center Column (Mario GIF) */}
          <div className="w-64 h-64 lg:w-80 lg:h-80 relative overflow-hidden rounded-full flex items-center justify-center bg-blue-400/20 order-first lg:order-none">
            <Image
              src="/mario hi.gif"
              alt="Waving Mario"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="scale-[1.8]"
            />
          </div>

          {/* Right Column */}
          <div className="w-full max-w-sm space-y-6 flex flex-col items-center">
            <ContactCard {...organizers[2]} />
            <ContactCard {...organizers[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
