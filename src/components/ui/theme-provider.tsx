"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme } from "next-themes";

function ThemeEffects() {
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const d = document.documentElement;
    const effective = (resolvedTheme || "light") as "light" | "dark";

    // Ensure UA-controlled widgets (scrollbars, form controls) match the theme
    d.style.colorScheme = effective;

    // Keep a cookie so SSR or inline script can pick it up early.
    // If user selected "system", store "system" (so SSR can defer to OS).
    try {
      const pref = theme as "light" | "dark" | "system" | undefined;
      const cookieValue = pref === "light" || pref === "dark" ? pref : "system";
      document.cookie = `theme=${cookieValue}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {}

    // Keep meta theme-color in sync for mobile browser UI
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) meta.setAttribute("content", effective === "dark" ? "#0b1220" : "#ffffff");

    // Dispatch global event for any listeners (vanilla or framework)
    try {
      window.dispatchEvent(new CustomEvent("themechange", { detail: { theme, resolvedTheme: effective } }));
    } catch {}
  }, [theme, resolvedTheme]);

  // When on "system", reflect OS theme changes into color-scheme/meta and fire event.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const effective = mql.matches ? "dark" : "light";
        const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
        if (meta) meta.setAttribute("content", effective === "dark" ? "#0b1220" : "#ffffff");
        document.documentElement.style.colorScheme = effective;
        // Ensure SSR keeps deferring to system when user selected "system"
        try {
          document.cookie = `theme=system; Path=/; Max-Age=31536000; SameSite=Lax`;
        } catch {}
        window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: "system", resolvedTheme: effective } }));
      }
    };
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme]);

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Note: we intentionally let layout.tsx pass attribute="data-theme" and other props
  return (
    <NextThemesProvider {...props}>
      <ThemeEffects />
      {children}
    </NextThemesProvider>
  );
}
