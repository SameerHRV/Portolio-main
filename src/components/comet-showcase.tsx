"use client";

import * as React from "react";
import { CometCard } from "@/components/ui/comet-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Smartphone, Server, Sparkles } from "lucide-react";

export function CometShowcase() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4" />
            Featured case study
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Ship faster with a solid foundation
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Clean architecture, beautiful UI, and reliable infrastructure across web and mobile.
          </p>
        </div>

        <CometCard className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl comet-surface border border-border/60 p-6 sm:p-10">
            {/* Top content */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">Marketplace Platform Revamp</h3>
                <p className="mt-2 text-slate-300 max-w-2xl">
                  End-to-end redesign and rebuild of a marketplace platform: Next.js app router, server actions, Stripe
                  integration, and a scalable Node.js API. Delivered responsive web and React Native app in tandem.
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
                  <div className="text-3xl font-bold text-white">40%</div>
                  <div className="text-slate-400 text-sm">Faster time-to-market</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">+120%</div>
                  <div className="text-slate-400 text-sm">Conversion uplift</div>
                </div>
              </div>
            </div>

            {/* Feature rows */}
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

            {/* CTA Row (no AI button) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">View case study</Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900">
                Contact me
              </Button>
            </div>
          </div>
        </CometCard>
      </div>
    </section>
  );
}
