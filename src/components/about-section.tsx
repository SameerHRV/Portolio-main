"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { about, skills } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Code, Award, Heart, Rocket, Smartphone, Server, Palette } from "lucide-react";

export function AboutSection() {
  const [bio, setBio] = React.useState(about.bio);

  return (
    <section id="about" data-scroll data-scroll-class="is-inview" className="relative overflow-hidden reveal-up">
      {/* Background decoration */}
      <div
        data-scroll
        data-scroll-speed="-0.25"
        className="absolute inset-0 bg-gradient-to-tl from-secondary/30 via-background to-secondary/20 will-change-transform"
      />
      <div
        data-scroll
        data-scroll-speed="-0.15"
        className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform"
      />
      <div
        data-scroll
        data-scroll-speed="-0.1"
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl will-change-transform"
      />

      <div className="relative z-10 container mx-auto">
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-accent font-medium text-primary backdrop-blur-sm border border-primary/20 mb-6">
            <User className="h-4 w-4" />
            Get to Know Me
          </div>
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="mt-6 font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            My journey, skills, and what drives me to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Profile Image */}
          <div className="flex justify-center lg:col-span-1 animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-glow" />
              <div className="relative h-80 w-80 lg:h-96 lg:w-96 rounded-full overflow-hidden shadow-2xl border-4 border-background">
                <Image
                  src="https://placehold.co/400x400.png"
                  alt="A professional photo of me"
                  data-ai-hint="professional portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 lg:col-span-2 animate-fade-in">
            {/* Bio Card */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">{about.name}</h3>
                </div>
                <div className="text-sm text-muted-foreground">{about.role}</div>
                <p className="font-body text-muted-foreground text-lg leading-relaxed text-balance mt-2">{bio}</p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="">
                    <a href="/resume.pdf" download>
                      Download Resume
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-border">
                    <Link href="#contact">Contact Me</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services Card */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">What I Do</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-secondary/50 p-5 border border-border/50">
                    <div className="flex items-center gap-2 font-accent font-semibold">
                      <Palette className="h-4 w-4 text-primary" />
                      Frontend
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Design systems & accessible UI</li>
                      <li>Next.js App Router, SSR/ISR</li>
                      <li>Animations and micro‑interactions</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-5 border border-border/50">
                    <div className="flex items-center gap-2 font-accent font-semibold">
                      <Smartphone className="h-4 w-4 text-primary" />
                      Mobile
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>React Native + Expo</li>
                      <li>Shared core with web</li>
                      <li>Offline-first patterns</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-5 border border-border/50">
                    <div className="flex items-center gap-2 font-accent font-semibold">
                      <Server className="h-4 w-4 text-primary" />
                      Backend
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Node.js APIs & Webhooks</li>
                      <li>PostgreSQL & Prisma</li>
                      <li>Auth, security, observability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">My Tech Stack</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 rounded-xl bg-secondary/50 p-4 transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:-translate-y-1 border border-border/50"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <skill.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-accent font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Experience Highlights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-headline font-bold gradient-text mb-2">1+</div>
                    <div className="text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-headline font-bold gradient-text mb-2">10+</div>
                    <div className="text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-headline font-bold gradient-text mb-2">100%</div>
                    <div className="text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
