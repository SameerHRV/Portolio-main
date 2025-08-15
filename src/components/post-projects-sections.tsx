"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { trackCTAClick, trackOutbound, observeSectionImpression, initScrollDepthAfterProjects } from "@/lib/analytics";
import { ExternalLink } from "lucide-react";

/**
 * PostProjectsSections
 * Sections appended immediately after Projects:
 * 1) Impact Highlights
 * 2) Technical Leadership and Scope
 * 3) Testimonials and Logos
 * 4) Open Source and Writing
 * 5) Experience Snapshot and Timeline
 * 6) Contact and Booking
 */

const sectionIds = {
  impact: "impact-highlights",
  leadership: "technical-leadership",
  testimonials: "testimonials-logos",
  oss: "open-source-writing",
  experience: "experience-timeline",
  booking: "booking",
} as const;

export function PostProjectsSections() {
  React.useEffect(() => {
    const cleanups = Object.values(sectionIds).map((id) => observeSectionImpression(id));
    initScrollDepthAfterProjects();
    return () => {
      cleanups.forEach((c) => c?.());
    };
  }, []);

  return (
    <>
      <ImpactHighlightsSection />
      <TechnicalLeadershipSection />
      <TestimonialsLogosSection />
      <OpenSourceWritingSection />
      <ExperienceTimelineSection />
      <ContactBookingSection />
    </>
  );
}

/* --------------------------- Impact Highlights --------------------------- */

function ImpactHighlightsSection() {
  const tiles: Array<{
    id: string;
    metric: string;
    context: string;
    scope: string;
    timeframe: string;
    ownership: string;
    logo?: { alt: string; src?: string };
  }> = [
    {
      id: "tile1",
      metric: "Cut p95 checkout latency 42%; conversion +18%",
      context: "Across 1.2M monthly sessions",
      scope: "Scope: Checkout, payments, web",
      timeframe: "Timeframe: 6 months",
      ownership: "Tech Lead; Team of 5",
      logo: { alt: "Fortune 500 fintech (NDA)" },
    },
    {
      id: "tile2",
      metric: "Throughput +2.3x; cloud spend −28%",
      context: "Via decomposition and edge caching",
      scope: "Scope: Platform, services",
      timeframe: "Timeframe: 2 quarters",
      ownership: "Platform Lead; Team of 7",
      logo: { alt: "Public martech SaaS (NDA)" },
    },
    {
      id: "tile3",
      metric: "99.95% p95 ingestion stability at peak",
      context: "Unblocked enterprise launch",
      scope: "Scope: Real‑time ingestion, SRE",
      timeframe: "Timeframe: 1 quarter",
      ownership: "Staff IC partnering with SRE",
      logo: { alt: "Top‑10 payments processor (NDA)" },
    },
    {
      id: "tile4",
      metric: "Deploy lead time −37% with flags + CI/CD",
      context: "Multi‑tenant scale",
      scope: "Scope: Delivery, platform",
      timeframe: "Timeframe: 3 months",
      ownership: "Eng Productivity Lead",
      logo: { alt: "Public B2B data platform (NDA)" },
    },
  ];

  return (
    <section id={sectionIds.impact} className="py-16 sm:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            B2B SaaS engineering results — Staff software engineer impact
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            I help B2B SaaS teams deliver faster, scale reliably, and move the KPI. Recent outcomes include cutting p95
            checkout latency 42% and lifting conversion 18% across 1.2 million monthly sessions, increasing throughput
            2.3x while reducing cloud spend 28% through service decomposition and edge caching, and stabilizing
            real‑time ingestion to 99.95% p95 at peak load to unblock an enterprise launch. These results come from
            pragmatic architecture, ruthless prioritization, and tight feedback loops with product, design, and
            go‑to‑market. I focus on the smallest safe change that shifts the metric and then make the result repeatable
            for the team.
          </p>
          <div className="mt-6">
            <Button
              onClick={() =>
                trackCTAClick("See how I drive results → Book a 15‑min intro", sectionIds.impact, "#booking")
              }
              asChild
            >
              <a href="#booking">See how I drive results → Book a 15‑min intro</a>
            </Button>
          </div>
        </div>

        {/* Tiles: row on desktop, 2-col on mobile */}
        <div
          className={cn("grid gap-4", "grid-cols-2", "md:grid-cols-3 lg:grid-cols-4")}
          role="list"
          aria-label="Impact stat tiles"
        >
          {tiles.map((t) => (
            <Card key={t.id} role="listitem" className="border border-border/60">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="mr-2">{t.scope}</span>•<span className="ml-2">{t.timeframe}</span>
                  </div>
                  {t.logo ? (
                    <span className="text-[10px] text-muted-foreground" aria-label={t.logo.alt}>
                      {t.logo.alt}
                    </span>
                  ) : null}
                </div>
                <div className="text-base font-semibold">{t.metric}</div>
                <p className="text-sm text-muted-foreground">{t.context}</p>
                <div className="text-xs text-muted-foreground">{t.ownership}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Technical Leadership and Scope -------------------- */

function TechnicalLeadershipSection() {
  const bullets: string[] = [
    "Re‑platformed real‑time analytics on an event backbone; reduced p95 by 58% and enabled four enterprise deals in two quarters.",
    "Standardized observability across services; halved detection time and cut mean time to resolve by one‑third.",
    "Partnered with PM and design to introduce thin slices; increased shipped customer‑visible value by 46% quarter over quarter.",
    "Implemented autoscaling and right‑sizing; lowered compute costs 24% at steady state.",
    "Integrated retrieval‑augmented generation into support workflows; reduced time‑to‑resolution 29% without increasing error rates.",
    "Mentored senior engineers through design reviews and shadow launches to raise the team’s bar.",
  ];

  return (
    <section id={sectionIds.leadership} className="py-16 sm:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Staff engineer leadership — system design at scale and SLO improvements
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            I operate at Staff level across system design, reliability, and product velocity. I define clear boundaries,
            remove accidental complexity, and create pathways for teams to deliver. Highlights include introducing an
            event‑driven backbone to decouple billing and entitlements, enabling three enterprise SKUs in two quarters;
            standardizing observability that halved issue detection time and reduced resolution time by one‑third;
            instituting thin vertical slices that increased shipped customer‑visible value 46% quarter over quarter; and
            mentoring senior engineers through design reviews and shadow launches. If you need to scale an AI‑infused
            SaaS product without slowing delivery, I can help.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => trackCTAClick("View leadership examples → Book a call", sectionIds.leadership, "#booking")}
              asChild
            >
              <a href="#booking">View leadership examples → Book a call</a>
            </Button>
          </div>
        </div>

        <ul className="max-w-4xl mx-auto space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm sm:text-base">
              {emphasizeFigures(b)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------ Testimonials and Logos ------------------------ */

function TestimonialsLogosSection() {
  const testimonials: Array<{
    quote: string;
    name: string;
    title: string;
    company: string;
    linkedIn?: string;
    avatarAlt: string;
  }> = [
    {
      quote: "Brings clarity to ambiguous problems and ships what matters.",
      name: "Head of Product",
      title: "Head of Product",
      company: "AI SaaS platform",
      linkedIn: undefined,
      avatarAlt: "Head of Product headshot",
    },
    {
      quote: "Raised our reliability bar and helped the team deliver at enterprise scale.",
      name: "VP Engineering",
      title: "VP Engineering",
      company: "Fortune 500 fintech",
      linkedIn: undefined,
      avatarAlt: "VP Engineering anonymized headshot",
    },
    {
      quote: "Excellent partner to PM and design; moves metrics without over‑engineering.",
      name: "Engineering Manager",
      title: "Engineering Manager",
      company: "B2B data platform",
      linkedIn: undefined,
      avatarAlt: "Engineering Manager headshot",
    },
  ];

  const logos: Array<{ label: string; alt: string }> = [
    { label: "Fortune 500 fintech", alt: "Anonymized Fortune 500 fintech logo" },
    { label: "Public martech SaaS", alt: "Anonymized public martech SaaS logo" },
    { label: "B2B data platform", alt: "Anonymized B2B data platform logo" },
    { label: "AI SaaS platform", alt: "Anonymized AI SaaS platform logo" },
  ];

  return (
    <section id={sectionIds.testimonials} className="py-16 sm:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Testimonials and logos</h2>
          <p className="mt-4 text-muted-foreground text-balance">
            “Brings clarity to ambiguous problems and ships what matters.” — Head of Product, AI SaaS platform. “Raised
            our reliability bar and helped the team deliver at enterprise scale.” — VP Engineering, Fortune 500 fintech.
            “Excellent partner to PM and design; moves metrics without over‑engineering.” — Engineering Manager, B2B
            data platform. Logos available on request or displayed as a light strip with appropriate permissions.
          </p>
          <div className="mt-6">
            <Button
              onClick={() =>
                trackCTAClick("References on request → Schedule a screening", sectionIds.testimonials, "#booking")
              }
              asChild
            >
              <a href="#booking">References on request → Schedule a screening</a>
            </Button>
          </div>
        </div>

        {/* Accessible carousel with stacked quotes on small/medium screens */}
        <div className="relative max-w-4xl mx-auto">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {testimonials.map((t, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col gap-4 justify-between h-full">
                      <p className="text-sm leading-relaxed">“{t.quote}”</p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage alt={t.avatarAlt} src={undefined as any} />
                          <AvatarFallback>{initials(t.name)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{t.name}</div>
                          <div className="text-muted-foreground">
                            {t.title}, {t.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Thin logo strip with alt text */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          {logos.map((l, i) => (
            <div
              key={i}
              className="h-10 rounded-md bg-muted/50 border border-border/50 flex items-center justify-center text-xs text-muted-foreground"
              aria-label={l.alt}
            >
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Open Source and Writing ------------------------- */

function OpenSourceWritingSection() {
  const items: Array<{
    title: string;
    href: string;
    value: string;
    adoption: string;
    insight: string;
    tags: string[];
  }> = [
    {
      title: "multi-tenant-feature-flags: lightweight flags for B2B SaaS",
      href: "https://github.com/example/multi-tenant-feature-flags",
      value: "Feature flags and kill-switches with tenant targeting",
      adoption: "120★ • 6 contributors • used in 3+ case studies",
      insight: "Decouple rollout safety from deploy cadence; ship thin slices faster.",
      tags: ["multi-tenant SaaS", "feature flags", "reliability engineering"],
    },
  ];

  return (
    <section id={sectionIds.oss} className="py-16 sm:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Open source and technical writing — vector search, event‑driven systems, reliability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <Card key={idx} className="border border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackOutbound(item.title, item.href, "oss")}
                    className="inline-flex items-center gap-2 hover:underline"
                    aria-label={`Open ${item.title} on GitHub`}
                  >
                    {item.title}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </CardTitle>
                <CardDescription>{item.value}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">{item.adoption}</div>
                <div className="text-sm text-muted-foreground">Insight: {item.insight}</div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-3">
                  <Button
                    onClick={() =>
                      trackCTAClick("Browse OSS and notes → Connect on GitHub", sectionIds.oss, "https://github.com")
                    }
                    asChild
                  >
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackOutbound("GitHub", "https://github.com", "oss")}
                    >
                      Browse OSS and notes → Connect on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Experience Snapshot and Timeline -------------------- */

function ExperienceTimelineSection() {
  const roles: Array<{
    title: string;
    company: string;
    dates: string;
    tags: string[];
    win: string;
  }> = [
    {
      title: "Staff Software Engineer",
      company: "B2B AI SaaS",
      dates: "2023 — Present",
      tags: ["B2B SaaS", "AI"],
      win: "Cut p95 latency 42% and lifted conversion 18% across 1.2M sessions.",
    },
    {
      title: "Senior Software Engineer",
      company: "Public Martech SaaS",
      dates: "2020 — 2023",
      tags: ["Multi‑tenant", "Event‑driven"],
      win: "Increased throughput 2.3x while reducing cloud spend 28% with decomposition and edge caching.",
    },
    {
      title: "Software Engineer",
      company: "Top‑10 payments processor",
      dates: "2017 — 2020",
      tags: ["Payments", "Reliability"],
      win: "Stabilized real‑time ingestion to 99.95% p95 at peak; unblocked enterprise launch.",
    },
  ];

  return (
    <section id={sectionIds.experience} className="py-16 sm:py-20 lg:py-24 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Experience snapshot and timeline
          </h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Seniority and trajectory at a glance. Promotions, major launches, and scale milestones. Standardized titles
            with industry tags.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => trackCTAClick("Get the full resume → Download PDF", sectionIds.experience, "/resume.pdf")}
              asChild
            >
              <a href="/resume.pdf" onClick={() => trackOutbound("Resume PDF", "/resume.pdf", "experience")}>
                Get the full resume → Download PDF
              </a>
            </Button>
          </div>
        </div>

        <ol className="relative border-s border-border/60 max-w-3xl mx-auto">
          {roles.map((r, i) => (
            <li key={i} className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                {roles.length - i}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{r.title}</h3>
                <span className="text-muted-foreground">@ {r.company}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                  {r.dates}
                </span>
              </div>
              <p className="mt-2 text-sm">{r.win}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------- Contact and Booking --------------------------- */

function ContactBookingSection() {
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const calendarHref = "https://cal.com/your-handle/intro-15";

  React.useEffect(() => {
    const el = document.getElementById(sectionIds.booking);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.25) {
            setCalendarVisible(true);
          }
        });
      },
      { threshold: [0.25] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={sectionIds.booking} className="py-16 sm:py-20 lg:py-24 border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Contact and booking</h2>
          <p className="mt-4 text-muted-foreground text-balance">
            Staff software engineer consultation for B2B SaaS/AI. Book a 15‑minute intro. Typical response time &lt; 24
            hours.
          </p>
        </div>

        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>Book a 15‑minute intro</CardTitle>
            <CardDescription>
              Pick a time that works. Privacy: we only use your details to schedule and follow up.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => {
                  trackCTAClick("Book a 15‑minute intro", sectionIds.booking, calendarHref);
                  trackOutbound("Calendar", calendarHref, "booking");
                }}
                asChild
              >
                <a href={calendarHref} target="_blank" rel="noopener noreferrer">
                  Book a 15‑minute intro
                </a>
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  trackCTAClick("Email fallback", sectionIds.booking, "mailto:hello@example.com");
                  trackOutbound("Email", "mailto:hello@example.com", "booking");
                }}
                asChild
              >
                <a href="mailto:hello@example.com">Email fallback</a>
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Availability: Mon–Fri, 10:00–17:00 IST • Location: Bengaluru, IN
            </div>

            <div className="mt-4">
              {!calendarVisible ? (
                <button
                  className="w-full h-12 rounded-md border border-dashed text-sm text-muted-foreground hover:bg-background"
                  onClick={() => setCalendarVisible(true)}
                  aria-label="Show embedded calendar"
                >
                  Show embedded calendar
                </button>
              ) : (
                <div className="w-full h-[600px]">
                  <iframe
                    title="Booking calendar"
                    loading="lazy"
                    className="w-full h-full rounded-md border"
                    src={calendarHref}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* --------------------------------- Utils --------------------------------- */

function initials(name: string) {
  const parts = name.split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

function emphasizeFigures(text: string): React.ReactNode {
  // Bold numeric figures like 58%, 2.3x, 24, etc.
  const parts = text.split(/(\d+(?:\.\d+)?%|\b\d+(?:\.\d+)?x\b|\b\d+(?:\.\d+)?\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return <React.Fragment key={i} />;
        const isPct = /^\d+(\.\d+)?%$/.test(p);
        const isFactor = /^\d+(\.\d+)?x$/.test(p);
        if (isPct || isFactor) {
          return <strong key={i}>{p}</strong>;
        }
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
}
