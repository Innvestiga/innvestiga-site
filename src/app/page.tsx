import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import VisionReveal from "@/components/home/VisionReveal";
import CoverageSplit from "@/components/home/CoverageSplit";
import CTASection from "@/components/home/CTASection";

// Home, benefits first: the ask and the track record, what every audit
// delivers, the three services, how a visit becomes a decision, the hook,
// the coverage, the pilot.
export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ServicesGrid />
      <ProcessSection />
      <VisionReveal />
      <CoverageSplit />
      <CTASection />
    </>
  );
}
