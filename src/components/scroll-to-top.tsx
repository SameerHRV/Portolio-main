"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/components/scroll/scroll-provider";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { instance, scrollTo, isReducedMotion } = safeUseScroll();

  const toggleVisibilityNative = React.useCallback(() => {
    setIsVisible(window.pageYOffset > 300);
  }, []);

  const onClick = React.useCallback(() => {
    if (scrollTo) {
      scrollTo(0, { duration: isReducedMotion ? 0 : 600, disableLerp: isReducedMotion });
    } else {
      window.scrollTo({ top: 0, behavior: isReducedMotion ? "auto" : "smooth" });
    }
  }, [scrollTo, isReducedMotion]);

  React.useEffect(() => {
    // If Locomotive is active, use its scroll event; otherwise, use window scroll
    if (instance && typeof (instance as any).on === "function") {
      const handler = (args: any) => {
        const y = args?.scroll?.y ?? 0;
        setIsVisible(y > 300);
      };
      (instance as any).on("scroll", handler);
      return () => {
        try {
          (instance as any).off?.("scroll", handler);
        } catch {
          // no-op
        }
      };
    }
    // Native fallback
    window.addEventListener("scroll", toggleVisibilityNative, { passive: true });
    toggleVisibilityNative();
    return () => window.removeEventListener("scroll", toggleVisibilityNative);
  }, [instance, toggleVisibilityNative]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="default"
        size="icon"
        onClick={onClick}
        className={cn(
          "rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-110 bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-12",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}

/** Safely access ScrollProvider in case it's not mounted yet */
function safeUseScroll():
  | { instance: any; scrollTo: (t: any, o?: any) => void; isReducedMotion: boolean }
  | { instance: null; scrollTo: null; isReducedMotion: boolean } {
  try {
    // Dynamically require to avoid SSR import issues if needed
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const hook = require("@/components/scroll/scroll-provider") as typeof import("@/components/scroll/scroll-provider");
    // If context not available, useScroll will throw — catch below
    const ctx = hook.useScroll();
    return { instance: ctx.instance, scrollTo: ctx.scrollTo, isReducedMotion: ctx.isReducedMotion };
  } catch {
    // Fallback to native-only behavior
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return { instance: null, scrollTo: null, isReducedMotion: !!reduced };
  }
}
