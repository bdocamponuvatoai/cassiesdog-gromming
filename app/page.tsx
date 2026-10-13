import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Heart, PawPrint, Phone, Sparkles } from "lucide-react";
import { Mascot } from "@/components/mascot/mascot";
import { Animated } from "@/components/motion/animated";
import { Comparison } from "@/components/sections/comparison";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { Goals } from "@/components/sections/goals";
import { PhotoPlaceholder } from "@/components/sections/photo-placeholder";
import { ReviewCarousel } from "@/components/sections/review-carousel";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCards } from "@/components/sections/service-cards";
import { Steps } from "@/components/sections/steps";
import { Tip } from "@/components/sections/tip";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { businessJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessJsonLd()} />

      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <span className="status">
              <span /> Now accepting new clients
            </span>
            <h1>
              <span>Feel good.</span>
              <span>Look great.</span>
              <span className="hero-highlight">
                Smell amazing.
                <svg viewBox="0 0 500 24" aria-hidden="true">
                  <path d="M5 15 Q230 -4 493 12 M35 23 Q270 10 462 19" />
                </svg>
              </span>
            </h1>
            <p>
              A little spa day. A whole lot of love.
              <br />
              Caring dog grooming for every breed and size
              <br className="desktop-break" /> in Columbus & Obetz, Ohio.
            </p>
            <div className="actions">
              <ButtonLink href="/book">
                Book a Spa Day <ArrowUpRight size={19} />
              </ButtonLink>
              <a className="hero-call" href={site.telHref}>
                <Phone size={18} aria-hidden="true" />
                <span>
                  Call Cassie<small>{site.phone}</small>
                </span>
              </a>
            </div>
            <div className="hero-note">
              <Heart size={16} aria-hidden="true" /> Big dogs. Small dogs. Your
              kind of dog.
            </div>
          </div>
          <Animated className="hero-art">
            <div className="hero-blob" />
            <div className="bubble bubble-one" />
            <div className="bubble bubble-two" />
            <div className="bubble bubble-three" />
            <span className="floating-label top-label">
              <Sparkles size={19} aria-hidden="true" /> Fresh fluff, happy
              stuff.
            </span>
            <Mascot />
            <span className="floating-label bottom-label">
              <Heart size={18} aria-hidden="true" /> A little extra TLC
            </span>
            <span className="hero-doodle" aria-hidden="true">
              ✦
            </span>
          </Animated>
        </div>
        <Animated className="wave-frame">
          <svg
            className="wave"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 32 Q180 90 360 38 T720 38 T1080 38 T1440 38 V80 H0Z" />
          </svg>
        </Animated>
      </section>

      <div className="promise-strip">
        <span>
          <PawPrint aria-hidden="true" /> All breeds & sizes
        </span>
        <span>
          <Heart aria-hidden="true" /> Comfort comes first
        </span>
        <span>
          <Sparkles aria-hidden="true" /> Fresh-coat happiness
        </span>
        <span>Columbus & Obetz, OH</span>
      </div>

      <Goals />

      <section className="section services-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE SPA-DAY MENU"
              title="From scruffy to snuggly."
              text="A bath, a tidy-up, or a whole new ’do. Let’s find your pup’s feel-good fit."
            />
            <Link className="text-link" href="/services">
              Explore services <ArrowUpRight size={18} />
            </Link>
          </div>
          <ServiceCards />
        </div>
      </section>

      <Tip />
      <Steps />

      <section className="section gallery-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE FRESH-FLOOF FILES"
              title="Good hair. Great dogs."
              text="A spot for familiar faces and little transformations."
            />
            <Link href="/gallery" className="text-link">
              Visit the gallery <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="gallery-preview">
            <Comparison />
            <div className="gallery-aside">
              <PhotoPlaceholder photo="homeBath" color="mint" />
              <PhotoPlaceholder photo="homeHaircut" color="yellow" />
            </div>
          </div>
        </div>
      </section>

      <section className="section review-section container">
        <div>
          <SectionHeading
            eyebrow="LOVE FROM THE HUMANS"
            title="Kind words. Wagging tails."
          />
          <p>Little notes that make our day.</p>
          <a
            href={site.facebook}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find us on Facebook <ArrowUpRight size={18} />
          </a>
        </div>
        <ReviewCarousel />
      </section>

      <section className="section meet-grid container">
        <PhotoPlaceholder photo="cassieWithDog" color="lilac" portrait />
        <div>
          <span className="eyebrow">THE PERSON BEHIND THE PAMPERING</span>
          <h2>
            Hi, I’m Cassie.
            <br />
            Let’s meet your dog.
          </h2>
          <p>
            I love seeing your dog and helping them feel, look, and smell
            amazing. Every pup is welcome, whatever the breed or size.
          </p>
          <p>
            You’ll find me at Buckeye K9 in the Obetz area. Let’s chat about
            what makes your dog, well, your dog.
          </p>
          <ButtonLink href="/meet-cassie" variant="secondary">
            Meet Cassie <Heart size={18} />
          </ButtonLink>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
