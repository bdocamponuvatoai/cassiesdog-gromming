import type { Metadata } from "next";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { PageIntro } from "@/components/sections/page-intro";
import { ServiceCards } from "@/components/sections/service-cards";
import { Tip } from "@/components/sections/tip";
import { JsonLd } from "@/components/seo/json-ld";
import { servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Baths, Haircuts & Nail Trims",
  description:
    "Dog baths, haircuts and nail trims in Columbus and Obetz. Explore Cassie’s grooming services and ask for a personalized quote.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />
      <PageIntro
        label="Services"
        path="/services"
        title="A little pampering. Their kind of perfect."
        text="Every coat has a story. We’ll help you choose the care that suits your dog’s needs."
      />
      <section className="section compact container">
        <ServiceCards details />
        <p className="center-note">
          All breeds and sizes welcome. Ask for a quote before your visit;
          prices are not listed yet.
        </p>
      </section>
      <Tip />
      <FAQ />
      <CTA />
    </>
  );
}
