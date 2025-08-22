import Link from "next/link";
import {
  Check,
  Sparkles,
  Rocket,
  Shield,
  Code,
  Wind,
  Server,
  Database,
  Smartphone,
  Palette,
  Globe,
  GitBranch,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section id="pricing" data-scroll data-scroll-class="is-inview" className="relative py-24 reveal-up">
      {/* Background decoration */}
      <div
        data-scroll
        data-scroll-speed="-0.25"
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 will-change-transform"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div data-scroll data-scroll-class="is-inview" className="mb-16 text-center reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-accent font-medium text-primary backdrop-blur-sm border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4" />
            Pricing
          </div>
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
            <span className="gradient-text">Simple, transparent pricing</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose a package that fits your project. Every plan includes clean code, performance best practices, and
            delightful UX.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {/* Starter */}
          <Card className="glass-effect border-0 shadow-xl flex flex-col h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline text-2xl">Starter</CardTitle>
              </div>
              <CardDescription>Perfect for a polished landing page or portfolio.</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-headline font-bold gradient-text">$299</span>
                <span className="text-muted-foreground"> / project</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-foreground/90">
                    Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Responsive, accessible UI with micro‑interactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Basic SEO (meta, OpenGraph), performance tuning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Design handoff from Figma</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Deployment on Vercel + GitHub repository setup</span>
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5" />
                  Next.js
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="h-3.5 w-3.5" />
                  Tailwind
                </div>
                <div className="flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5" />
                  shadcn/ui
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  SEO
                </div>
                <div className="flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5" />
                  GitHub
                </div>
                <div className="flex items-center gap-1.5">
                  <Rocket className="h-3.5 w-3.5" />
                  Vercel
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="#contact">Choose Starter</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Professional (Most Popular) */}
          <Card className="relative glass-effect border-0 shadow-2xl ring-1 ring-primary/20 flex flex-col h-full">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md">
                Most Popular
              </span>
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline text-2xl">Professional</CardTitle>
              </div>
              <CardDescription>Great for startups and small products that need a backend.</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-headline font-bold gradient-text">$899</span>
                <span className="text-muted-foreground"> / project</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Everything in Starter, plus API & data layer</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Node.js APIs (Route Handlers), Prisma ORM, PostgreSQL</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Auth, forms with React Hook Form + Zod validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Stripe payments or Webhooks integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Basic analytics & monitoring</span>
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5" />
                  Node.js
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5" />
                  Postgres
                </div>
                <div className="flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5" />
                  Prisma
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Auth
                </div>
                <div className="flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5" />
                  Zod
                </div>
                <div className="flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5" />
                  Stripe
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="#contact">Choose Professional</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Premium */}
          <Card className="glass-effect border-0 shadow-xl flex flex-col h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="font-headline text-2xl">Premium</CardTitle>
              </div>
              <CardDescription>For full‑stack products and optional mobile app.</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-headline font-bold gradient-text">$1999</span>
                <span className="text-muted-foreground"> / project</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Everything in Professional, plus advanced features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Role‑based auth, dashboards, and admin tooling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Mobile app with React Native + Expo (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Automated CI, testing, and observability setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  <span>Performance budgets, accessibility review, and SEO audit</span>
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5" />
                  React Native
                </div>
                <div className="flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5" />
                  APIs
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5" />
                  Prisma/SQL
                </div>
                <div className="flex items-center gap-1.5">
                  <Rocket className="h-3.5 w-3.5" />
                  CI/CD
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Security
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  SEO
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="#contact">Choose Premium</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
