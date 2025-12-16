"use client";

import Link from "next/link";
import { Menu, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Use a timeout to allow the sheet to close before scrolling
    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Orbit className="h-6 w-6 text-gray-100" />
            <span className="inline-block font-bold font-headline text-sm">
              Codeathon
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium lg:flex">
            <Link
              href="#timeline"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Timeline
            </Link>
            <Link
              href="#challenges"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Challenges
            </Link>
            <Link
              href="#sponsors"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Sponsors
            </Link>
            <Link
              href="#contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href="#challenges">View Challenges</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to different sections of the page.
                </SheetDescription>
              </SheetHeader>
              <Link
                href="/"
                className="mb-8 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Orbit className="mr-2 h-5 w-5 text-gray-100" />
                <span className="font-bold font-headline">Codeathon</span>
              </Link>
              <div className="flex flex-col space-y-3">
                 <a href="#timeline" onClick={(e) => handleLinkClick(e, '#timeline')}>Timeline</a>
                 <a href="#challenges" onClick={(e) => handleLinkClick(e, '#challenges')}>Challenges</a>
                 <a href="#sponsors" onClick={(e) => handleLinkClick(e, '#sponsors')}>Sponsors</a>
                 <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
