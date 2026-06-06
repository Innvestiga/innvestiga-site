import HeroSection from "@/components/home/HeroSection";
import ESISection from "@/components/home/ESISection";
import VisionReveal from "@/components/home/VisionReveal";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import CoverageSplit from "@/components/home/CoverageSplit";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ESISection />
      <VisionReveal />
      <ServicesCarousel />
      <CoverageSplit />
      <CTASection />
    </>
  );
}
