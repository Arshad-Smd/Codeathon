
import { ResponsiveBrickFloor } from "../ui/responsive-brick-floor";
import { ClipboardEdit, UploadCloud, ClipboardCheck, Presentation, Trophy } from "lucide-react";

const timelineEvents = [
  {
    icon: ClipboardEdit,
    title: "Registration Opens",
    date: "Dec 16, 2026",
    description: "Sign up to secure your spot.",
  },
  {
    icon: UploadCloud,
    title: "Submission Deadline",
    date: "Jan 10, 2026",
    description: "Submit your innovative Ideas to solve the given problems.",
  },
  {
    icon: ClipboardCheck,
    title: "First round Evaluation",
    date: "Jan 11-16, 2026",
    description: "Our judges will review submissions.",
  },
  {
    icon: Presentation,
    title: "Finalist Presentations",
    date: "Feb 4, 2026",
    description: "Finalist teams will build and present their projects at SECE.",
  },
  {
    icon: Trophy,
    title: "Winners Announced",
    date: "Feb 5, 2026",
    description: "The grand finale of the Codeathon.",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="relative w-full bg-transparent py-12 md:py-24 lg:py-32 z-10">
      <div className="container px-4 md:px-6 pb-24">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-accent sm:text-4xl md:text-5xl">Event Timeline</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Follow our journey from registration to the final announcement.
          </p>
        </div>
        <div className="relative">
          {/* Decorative line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />
          
          <div className="grid grid-cols-1 gap-8">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`flex w-full items-start gap-4 lg:items-center lg:gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="hidden h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 lg:flex lg:order-none">
                  <event.icon className="h-8 w-8 text-gray-100" />
                </div>
                <div 
                  className={`relative w-full rounded-lg border bg-card p-4 shadow-md sm:p-6 text-left lg:max-w-[calc(50%-2.75rem)] ${
                    index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                  }`}
                >
                  {/* Mobile icon */}
                  <div className="absolute -top-5 left-4 lg:hidden">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border">
                          <event.icon className="h-5 w-5 text-gray-100" />
                      </div>
                  </div>
                  <h4 className="font-headline text-lg font-semibold leading-none tracking-tight text-accent pt-4 lg:pt-0">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                  <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResponsiveBrickFloor />
    </section>
  );
}
