import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { AboutSection } from "@/components/about-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { PlansSection } from "@/components/plans-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <main className="w-[90vw] max-w-6xl flex-1">
        <Hero />
        <Marquee />
        <AboutSection />
        <PortfolioSection />
        <PlansSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
