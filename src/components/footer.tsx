"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { about, skills, socialLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-background to-secondary/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="#"
              className="font-headline text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
            >
              Devfolio
            </Link>
            <p className="mt-4 font-body text-lg text-muted-foreground max-w-md leading-relaxed">
              A passionate developer crafting digital experiences that make a difference. Let's build something amazing
              together.
            </p>
            <div className="flex gap-4 mt-6">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-accent text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Details & Credentials */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-6 text-foreground">Details & Credentials</h3>
            <div className="space-y-2">
              <p className="font-headline font-semibold text-foreground">{about.name}</p>
              <p className="font-accent text-sm text-muted-foreground">{about.role}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.slice(0, 6).map((s) => (
                <Badge key={s.name} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {s.name}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild size="sm" variant="outline" className="border-border">
                <Link href="/resume.pdf" download>
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-6 text-foreground">Get In Touch</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>sameerhrv.work@gmail.com</p>
              <p>Belagavi Karnataka, India</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground text-center sm:text-left">
            &copy; {year} Devfolio. Made with <Heart className="inline h-4 w-4 text-red-500" /> by passionate
            developers.
          </p>
          {/* <Button
            onClick={scrollToTop}
            variant="ghost"
            size="icon"
            className="rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button> */}
        </div>
      </div>
    </footer>
  );
}
