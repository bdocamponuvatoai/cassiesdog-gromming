import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/** Intro block for secondary pages: breadcrumb, eyebrow, h1 and a booking CTA. */
export function PageIntro({
  label,
  path,
  title,
  text,
}: {
  /** Page name, used for the breadcrumb and eyebrow. */
  label: string;
  /** Route of the current page, used for structured data. */
  path: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro container">
      <JsonLd data={breadcrumbJsonLd(label, path)} />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{label}</span>
      </nav>
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <ButtonLink href="/book">
        Book a Spa Day <ArrowUpRight size={18} />
      </ButtonLink>
    </section>
  );
}
