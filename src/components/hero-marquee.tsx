"use client";

import * as React from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { CometCard } from "@/components/ui/comet-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Smartphone, Server, Sparkles } from "lucide-react";

export function HeroMarquee() {
  const images: string[] = [
    // Developer workspaces / code
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1974&auto=format&fit=crop",

    // Team / collaboration / product
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1974&auto=format&fit=crop",

    // Devices / mobile / UI
    "https://images.unsplash.com/photo-1504691342899-9d7eea6fc538?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1974&auto=format&fit=crop",

    // Design / dashboards / boards
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1974&auto=format&fit=crop",
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4" />
            Highlights
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">A glimpse of my work</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Selected shots and visuals from recent projects across web and mobile.
          </p>
        </div>
        <ThreeDMarquee images={images} className="mt-6" />

        {/* Detailed Comet Card directly below the marquee */}
        <div className="mt-12">
          <CometCard className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white">FinTech Mobile + Web Suite</h3>
                  <p className="mt-2 text-slate-300 max-w-2xl">
                    Built a unified FinTech experience across responsive web (Next.js) and mobile (React Native).
                    Implemented secure auth, payments, analytics, and a modular design system for rapid delivery.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>Next.js</Badge>
                    <Badge>React Native</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Tailwind</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>PostgreSQL</Badge>
                    <Badge>Stripe</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">45%</div>
                    <div className="text-slate-400 text-sm">Faster release cycles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <div className="text-slate-400 text-sm">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">+85%</div>
                    <div className="text-slate-400 text-sm">User retention</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <Code2 className="h-5 w-5 text-blue-400" />
                  <h4 className="mt-2 font-semibold text-white">Clean, scalable code</h4>
                  <p className="text-slate-300 text-sm mt-1">
                    Feature modules, type-safe APIs, and testing baked in for long-term maintainability.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <Smartphone className="h-5 w-5 text-purple-400" />
                  <h4 className="mt-2 font-semibold text-white">Mobile + Web parity</h4>
                  <p className="text-slate-300 text-sm mt-1">Shared UI patterns and data layer across platforms.</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                  <Server className="h-5 w-5 text-emerald-400" />
                  <h4 className="mt-2 font-semibold text-white">Reliable infra</h4>
                  <p className="text-slate-300 text-sm mt-1">Observability, CI/CD, and resilient deployments.</p>
                </div>
              </div>

              {/* CTAs — no AI button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">View case study</Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900">
                  Contact me
                </Button>
              </div>
            </div>
          </CometCard>
        </div>
      </div>
    </section>
  );
}
