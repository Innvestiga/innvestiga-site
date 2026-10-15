import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ESISection from "@/components/home/ESISection";
import WhySection from "@/components/home/WhySection";
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
    "Auditorías CX con cliente oculto (mystery shopper) en 8 países y 1,282 municipios de Mesoamérica y el Caribe. Resultados en 3 días. Solicita tu prueba piloto.",
});

// Home, in the order of spec section D: the ask, what an audit gives you,
// survey vs audit, ESI, why Innvestiga, the six situations, the method,
// the hook, coverage, sectors, FAQ, the pilot.
export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), faqPageSchema(HOME_FAQS)]} />
      <HeroSection />
      <BenefitsSection />
      <ESISection />
      <WhySection />
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
