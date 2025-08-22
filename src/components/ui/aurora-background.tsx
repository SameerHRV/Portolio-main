"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type AuroraVariant = "container" | "layer";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  variant?: AuroraVariant;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  variant = "container",
  ...props
}: AuroraBackgroundProps) => {
  // Theme-aware variables using Tailwind CSS tokens for automatic light/dark adaptation.
  const styleVars = {
    // Aurora palette derived from theme tokens. Adjusts with data-theme and CSS variables.
    "--aurora-col1": "hsl(var(--primary))",
    "--aurora-col2": "hsl(var(--chart-4))",
    "--aurora-col3": "hsl(var(--accent))",
    "--aurora-col4": "hsl(var(--chart-1))",
    "--aurora-col5": "hsl(var(--chart-2))",
    "--aurora":
      "repeating-linear-gradient(100deg,var(--aurora-col1)_10%,var(--aurora-col2)_15%,var(--aurora-col3)_20%,var(--aurora-col4)_25%,var(--aurora-col5)_30%)",
    // Striation overlays for contrast control in both themes
    "--dark-gradient": "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
    "--white-gradient": "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
  } as React.CSSProperties;

  const effectClass = cn(
    "pointer-events-none absolute -inset-[10px] opacity-35 blur-[6px] [will-change:background-position]",
    // Base background layers
    "[background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%]",
    // Animate base layer when motion is allowed (reduce intensity to keep text readable)
    "motion-safe:animate-aurora motion-reduce:animate-none",
    // Secondary pass on ::after without blend modes to avoid contrast issues over text
    'after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-position:50%_50%,50%_50%] after:content-[""]',
    // Dark theme adjustments
    "dark:[background-image:var(--dark-gradient),var(--aurora)]",
    // Optional radial mask to fade edges and preserve text contrast
    showRadialGradient && "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
  );

  // Layer variant: render as an absolutely positioned, decorative background
  if (variant === "layer") {
    return (
      <div
        aria-hidden
        role="presentation"
        className={cn("absolute inset-0 z-0 overflow-hidden", className)}
        style={styleVars}
        {...props}
      >
        <div className={effectClass} />
      </div>
    );
  }

  // Container variant: original full-height demo
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden" style={styleVars}>
          <div className={effectClass} />
        </div>
        {children}
      </div>
    </main>
  );
};
