import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Code, Smartphone } from "lucide-react";
import { about } from "@/lib/data";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function HeroSection() {
  return (
    <section
      id="hero"
      data-scroll
      data-scroll-class="is-inview"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background pt-[max(env(safe-area-inset-top),0px)] py-0 reveal-up"
    >
      {/* Aurora background layer */}
      <AuroraBackground variant="layer" className="z-0 pointer-events-none" />

      {/* Gradient overlay for better text readability */}
      <div
        aria-hidden
        role="presentation"
        data-scroll
        data-scroll-speed="-0.5"
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-background/40 via-background/20 to-background/40 will-change-transform"
      />

      <div className="relative z-20 mx-auto max-w-4xl text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-accent bg-foreground/10 text-foreground backdrop-blur-sm border border-foreground/20 mb-8 animate-fade-in">
          <Sparkles className="h-4 w-4" />
          Available for new opportunities
        </div>

        {/* Main heading */}
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6 animate-fade-in">
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {about.name}
          </span>
          <span className="block font-accent text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/90 mt-2">
            {about.role}
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 font-body text-lg leading-8 text-muted-foreground md:text-xl max-w-3xl mx-auto text-balance animate-fade-in">
          I build fast, elegant web and mobile apps using Next.js, React, and React Native — with clean architecture,
          performance, and design polish that impresses clients.
        </p>

        {/* Tech stack preview */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm font-accent text-muted-foreground animate-fade-in">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-blue-400" />
            <span>Full-Stack Development</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-foreground/30" />
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-purple-400" />
            <span>React Native (Mobile)</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-accent font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Link href="#about" className="flex items-center gap-2">
              Learn More
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 py-3 text-lg font-accent font-medium rounded-full border-2 border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 hover:-translate-y-1"
          >
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-pulse">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
