import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Code, Palette } from 'lucide-react';
import { about } from '@/lib/data';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Animated background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-500/20 to-orange-500/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 mb-8 animate-slide-up">
          <Sparkles className="h-4 w-4" />
          Available for new opportunities
        </div>

        {/* Main heading */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="block gradient-text">{about.name}</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl font-medium text-foreground/80 mt-2">{about.role}</span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-xl leading-8 text-foreground/70 md:text-2xl max-w-3xl mx-auto text-balance animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Crafting elegant solutions and intuitive user experiences with modern web technologies.
          Passionate about creating digital products that make a difference.
        </p>

        {/* Tech stack preview */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-primary" />
            <span>Full-Stack Development</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <span>UI/UX Design</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <Button asChild size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Link href="#projects" className="flex items-center gap-2">
              View My Work
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8 py-3 text-lg font-medium rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
