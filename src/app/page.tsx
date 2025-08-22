import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { PostProjectsSections } from "@/components/post-projects-sections";
import { AboutSection } from "@/components/about-section";
import { PricingSection } from "@/components/pricing-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import CometProfileCard from "@/components/comet-profile-card";

// Force dynamic rendering to prevent SSR issues with event handlers
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <CometProfileCard />
        {/* <PostProjectsSections /> */}
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
