import type { Metadata } from "next";
import { ContactDetails } from "@/components/sections/contact-details";
import { CTA } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { PhotoPlaceholder } from "@/components/sections/photo-placeholder";

export const metadata: Metadata = {
  title: "Meet Cassie",
  description:
    "Meet Cassie, an independent dog groomer working at Buckeye K9 in the Obetz area of Columbus, Ohio.",
  alternates: { canonical: "/meet-cassie" },
};

export default function MeetCassiePage() {
  return (
    <>
      <PageIntro
        label="Meet Cassie"
        path="/meet-cassie"
        title="The human behind the happy haircuts."
        text="A warm hello to you—and an even warmer hello to your dog."
      />
      <section className="section meet-grid compact container">
        <PhotoPlaceholder photo="cassieStation" color="lilac" portrait />
        <div>
          <span className="eyebrow">HI, I’M CASSIE</span>
          <h2>A little care makes a big difference.</h2>
          <p>
            I love seeing your dog and helping them feel, look, and smell
            amazing. Every pup is welcome, whatever the breed or size.
          </p>
          <p>
            I’m an independent groomer working at Buckeye K9 in the Obetz area
            of Columbus. Baths, haircuts, and nail trims are all part of the
            spa-day menu.
          </p>
          <p>
            Have a nervous pup, a particular haircut in mind, or a coat-care
            question? Tell me about it before your visit. We’ll talk through
            what your dog needs.
          </p>
          <span className="status">Accepting new clients</span>
        </div>
      </section>
      <section className="section compact container">
        <ContactDetails />
      </section>
      <CTA />
    </>
  );
}
