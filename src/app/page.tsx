import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ESISection from "@/components/home/ESISection";
import WhySection from "@/components/home/WhySection";
import MethodNamesBlock from "@/components/home/MethodNamesBlock";
import ManagementBenefits from "@/components/home/ManagementBenefits";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessSection from "@/components/home/ProcessSection";
import VisionReveal from "@/components/home/VisionReveal";
import CoverageSplit from "@/components/home/CoverageSplit";
import SectorsSection from "@/components/home/SectorsSection";
import HomeFaq from "@/components/home/HomeFaq";
import CTASection from "@/components/home/CTASection";
import JsonLd from "@/components/seo/JsonLd";
import { HOME_FAQS } from "@/data/faq";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Auditorías CX: Cliente Oculto y Mystery Shopper | Innvestiga",
  description:
    "Auditorías CX con cliente oculto (mystery shopper) en Centroamérica, República Dominicana y Chiapas, México. Resultados en 3 días. Solicita tu prueba piloto.",
  languages: { es: "/", en: "/en", "x-default": "/" },
});

// Home, in the order of spec section D plus blocks A and B (2026-10-20):
// the ask, outcomes and survey vs audit, the method names, ESI, why
// Innvestiga, per-department gains, situations, method, hook, coverage, sectors, FAQ, pilot.
export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqPageSchema(HOME_FAQS)]} />
      <HeroSection />
      <BenefitsSection />
      <MethodNamesBlock />
      <ESISection />
      <WhySection />
      <ManagementBenefits />
      <ServicesGrid />
      <ProcessSection />
      <VisionReveal />
      <CoverageSplit />
      <SectorsSection />
      <HomeFaq items={HOME_FAQS} />
      <CTASection />
    </>
  );
}
