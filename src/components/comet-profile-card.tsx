"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { about, projects, skills, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Linkedin, Twitter } from "lucide-react";

export function CometProfileCard() {
  // Featured content (3 items for compactness)
  const featuredProjects = useMemo(() => projects.slice(0, 3), []);
  const primarySkills = useMemo(() => skills.map((s) => s.name).slice(0, 8), []);
  const totalProjects = projects.length;

  // Profile image resolution: use explicit profile/logo if available in site data, else first project's thumbnail, else generated initials avatar
  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0]?.toUpperCase() ?? "")
      .slice(0, 2)
      .join("");

  const initialsAvatarDataUri = (name: string) => {
    const inits = initials(name) || "P";
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0%' stop-color='#6366F1'/>
            <stop offset='100%' stop-color='#A855F7'/>
          </linearGradient>
        </defs>
        <rect width='256' height='256' fill='url(#g)' rx='48' ry='48'/>
        <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-weight='700' font-size='108' fill='white'>${inits}</text>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Prefer first featured project's image if no dedicated avatar/logo available
  const profileImageUrl = (featuredProjects[0]?.imageUrl as string | undefined) || initialsAvatarDataUri(about.name);

  // Optional resume CTA: only render if confidently available; not present in repo listing, so omit and warn
  const hasResume = false;

  // Non-blocking diagnostics for missing fields (as required)
  useEffect(() => {
    const missing: string[] = [];
    if (!profileImageUrl) missing.push("profileImageUrl");
    if (!about?.name) missing.push("about.name");
    if (!about?.role) missing.push("about.role");
    if (!about?.bio) missing.push("about.bio");
    if (!projects?.length) missing.push("projects");
    if (!primarySkills?.length) missing.push("skills");
    if (!socialLinks?.github && !socialLinks?.linkedin && !socialLinks?.twitter) missing.push("socialLinks");
    if (!hasResume) missing.push("resume");
    if (missing.length) {
      // eslint-disable-next-line no-console
      console.warn("CometProfileCard: missing optional/required portfolio fields:", missing);
    }
  }, [profileImageUrl, primarySkills, hasResume]);

  // Build JSON-LD using only available fields
  const jsonLd = useMemo(() => {
    const sameAs = Object.values(socialLinks || {}).filter(Boolean);
    const creativeWorks = (featuredProjects || []).map((p) => {
      const cw: Record<string, unknown> = {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
      };
      if (p.liveUrl) cw.url = p.liveUrl;
      if (p.githubUrl) cw.sameAs = p.githubUrl;
      if (p.imageUrl) cw.image = p.imageUrl;
      return cw;
    });
    const person: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: about?.name,
      jobTitle: about?.role,
      description: about?.bio,
    };
    if (sameAs.length) person.sameAs = sameAs;
    if (primarySkills.length) person.knowsAbout = primarySkills;
    if (creativeWorks.length) person.hasPart = creativeWorks;
    return person;
  }, [featuredProjects, primarySkills]);

  return (
    <section
      id="comet-profile-card"
      role="region"
      aria-label="Profile summary card"
      className="relative py-10 sm:py-12 lg:py-16"
      data-component="CometProfileCard"
      data-owner={about.name}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CometCard className="mx-auto max-w-6xl">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl",
              "border border-border/50",
              "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50"
            )}
          >
            {/* Subtle gradient/glass treatment */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(1200px 300px at 0% 0%, rgba(99, 102, 241, 0.12), transparent), radial-gradient(800px 200px at 100% 100%, rgba(168, 85, 247, 0.12), transparent)",
              }}
            />

            <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[auto,1fr] md:gap-10">
              {/* Profile block */}
              <div
                id="comet-profile-header"
                data-element="header"
                className="flex flex-col items-center gap-5 md:items-start"
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
                  <Image
                    src={profileImageUrl}
                    alt={`${about.name} profile image`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority={false}
                  />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{about.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{about.role}</p>
                </div>

                <div className="mt-2 max-w-xl text-center text-sm text-muted-foreground md:text-left">
                  <p className="line-clamp-3 sm:line-clamp-4">{about.bio}</p>
                </div>

                {/* Contact + Socials */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  {socialLinks.github ? (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-foreground transition-colors hover:border-foreground/50 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  ) : null}
                  {socialLinks.linkedin ? (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-foreground transition-colors hover:border-foreground/50 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                  ) : null}
                  {socialLinks.twitter ? (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-foreground transition-colors hover:border-foreground/50 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-3.5 w-3.5" /> Twitter
                    </a>
                  ) : null}
                </div>

                {/* Quick stats */}
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-center">
                    <div className="text-lg font-semibold text-foreground">{totalProjects}</div>
                    <div>Projects</div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-center">
                    <div className="text-lg font-semibold text-foreground">{primarySkills.length}</div>
                    <div>Core Skills</div>
                  </div>
                </div>
              </div>

              {/* Details and CTAs */}
              <div className="flex flex-col justify-between">
                {/* Skills */}
                <div id="comet-profile-skills" data-element="skills" className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold tracking-tight text-foreground/90">Primary Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {primarySkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Featured Projects */}
                <div
                  id="comet-profile-projects"
                  data-element="projects"
                  aria-label="Featured projects"
                  className="mb-4"
                >
                  <h4 className="mb-2 text-sm font-semibold tracking-tight text-foreground/90">Featured Projects</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    {featuredProjects.map((p) => (
                      <article
                        key={p.id}
                        className="group relative overflow-hidden rounded-xl border border-border/60 bg-muted/30"
                        aria-labelledby={`project-${p.id}-title`}
                        data-project-id={p.id}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          {p.imageUrl ? (
                            <Image
                              src={p.imageUrl}
                              alt={`${p.title} thumbnail`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              priority={false}
                            />
                          ) : null}
                        </div>
                        <div className="p-3">
                          <h5
                            id={`project-${p.id}-title`}
                            className="line-clamp-1 text-sm font-semibold text-foreground"
                          >
                            {p.title}
                          </h5>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {(p.technologies || []).slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] text-foreground/90"
                                aria-label={`Tech: ${t}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            {p.liveUrl ? (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-foreground transition-colors hover:border-foreground/60 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                aria-label={`Open live demo for ${p.title}`}
                                data-action="open-live"
                              >
                                Live <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : null}
                            {p.githubUrl ? (
                              <a
                                href={p.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-foreground transition-colors hover:border-foreground/60 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                aria-label={`Open repository for ${p.title}`}
                                data-action="open-repo"
                              >
                                Code <Github className="h-3.5 w-3.5" />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div id="comet-profile-ctas" data-element="ctas" className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Button asChild aria-label="View Portfolio Projects" data-cta="view-portfolio">
                    <Link href="#projects" prefetch={false}>
                      View Portfolio
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border"
                    aria-label="Contact Me"
                    data-cta="contact"
                  >
                    <Link href="#contact" prefetch={false}>
                      Contact Me
                    </Link>
                  </Button>
                  {hasResume ? (
                    <Button asChild variant="secondary" aria-label="Download Resume" data-cta="download-resume">
                      <a href="/resume.pdf" download>
                        Download Resume
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* JSON-LD structured data */}
            <script
              type="application/ld+json"
              // Only actual site data are used above (omits unknowns)
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </div>
        </CometCard>
      </div>
    </section>
  );
}

export default CometProfileCard;
