"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { trackEvent, trackCTAClick, trackOutbound } from "@/lib/analytics";
import { useScroll } from "@/components/scroll/scroll-provider";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { instance } = safeUseScroll();

  React.useEffect(() => {
    // If Locomotive is active, subscribe to its scroll for consistent state on smooth mode
    if (instance && typeof (instance as any).on === "function") {
      const handler = (args: any) => {
        const y = args?.scroll?.y ?? 0;
        setIsScrolled(y > 10);
      };
      (instance as any).on("scroll", handler);
      // Initialize once
      try {
        const y = (instance as any)?.scroll?.instance?.scroll?.y ?? 0;
        setIsScrolled(y > 10);
      } catch {}
      return () => {
        try {
          (instance as any).off?.("scroll", handler);
        } catch {
          // no-op
        }
      };
    }
    // Fallback to native window scroll when smooth is not active
    const onWindowScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();
    return () => window.removeEventListener("scroll", onWindowScroll);
  }, [instance]);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://github.com/SameerHRV", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  ];

  return (
    <header
      data-sticky-header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 text-foreground glass-effect ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="#"
          className="font-headline text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
        >
          Devfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                trackEvent("nav_anchor_click", {
                  label: link.label,
                  href: link.href,
                  location: "header-desktop",
                })
              }
              className="nav-underline font-accent text-sm font-medium text-foreground/80 transition-colors hover:text-primary no-underline"
            >
              {link.label}
            </Link>
          ))}

          {/* <Button
            className="ml-2"
            asChild
            onClick={() => trackCTAClick("Header Book 15‑min intro", "header", "#booking")}
          >
            <a href="#booking">Book 15‑min intro</a>
          </Button> */}

          {/* Social Links */}
          <div className="flex items-center gap-3 ml-6 pl-6 border-l border-border/50">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutbound(social.label, social.href, "header-desktop")}
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
            <ThemeToggle className="bg-secondary hover:bg-primary hover:text-primary-foreground" />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="bg-secondary hover:bg-primary hover:text-primary-foreground" />
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border/50 animate-slide-up">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-underline block font-accent text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2 no-underline"
                onClick={() => {
                  trackEvent("nav_anchor_click", {
                    label: link.label,
                    href: link.href,
                    location: "header-mobile",
                  });
                  setIsMobileMenuOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}

            <Button
              className="w-full"
              onClick={() => {
                trackCTAClick("Header Book 15‑min intro", "header", "#booking");
                setIsMobileMenuOpen(false);
              }}
              asChild
            >
              <a href="#booking">Book 15‑min intro</a>
            </Button>

            {/* Mobile Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(social.label, social.href, "header-mobile")}
                  className="p-3 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/** Safely access ScrollProvider in case it's not mounted on this route */
function safeUseScroll(): { instance: any } | { instance: null } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hook = require("@/components/scroll/scroll-provider") as typeof import("@/components/scroll/scroll-provider");
    const ctx = hook.useScroll();
    return { instance: ctx.instance };
  } catch {
    return { instance: null };
  }
}
