import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ScrollProvider } from "@/components/scroll/scroll-provider";

export const metadata: Metadata = {
  title: "Sameer Harapanahalli Portfolio",
  description:
    "Full-stack developer specializing in B2B SaaS/AI delivering reliability, performance, and cost outcomes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR: seed the initial data-theme from cookie to avoid hydration mismatch / FOUC
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const initialTheme = cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning data-theme={initialTheme}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var ls=null;try{ls=localStorage.getItem('theme');}catch(_){};var pref=(ls==='light'||ls==='dark')?ls:null;var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);var cs=m?decodeURIComponent(m[1]):null;cs=(cs==='light'||cs==='dark')?cs:null;var sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=pref||cs||sys;d.setAttribute('data-theme',t);d.style.colorScheme=t;var meta=document.querySelector('meta[name="theme-color"]');if(meta){meta.setAttribute('content',t==='dark'?'#0b1220':'#ffffff');}}catch(e){}})();`,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Staff-level B2B SaaS/AI Full-Stack Engineer",
              jobTitle: "Staff Software Engineer",
              description:
                "Full-stack developer specializing in B2B SaaS/AI delivering reliability, performance, and cost outcomes.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Independent Consultant",
              areaServed: "Global",
              brand: "B2B SaaS/AI Engineering",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              reviewBody: "Brings clarity to ambiguous problems and ships what matters.",
              reviewRating: { "@type": "Rating", ratingValue: "5" },
              author: { "@type": "Person", name: "Head of Product (anonymized)" },
              itemReviewed: { "@type": "Person", name: "Staff-level B2B SaaS/AI Full-Stack Engineer" },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollProvider>
            {children}
            <Toaster />
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
