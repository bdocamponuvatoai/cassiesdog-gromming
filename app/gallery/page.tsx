import type { Metadata } from "next";
import { Comparison } from "@/components/sections/comparison";
import { CTA } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { PhotoPlaceholder } from "@/components/sections/photo-placeholder";
import { gallery, photos } from "@/content/photos";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Spa Day Gallery",
  description:
    "Explore cheerful editorial artwork inspired by bath time, fresh trims, and feel-good dog grooming with Cassie.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        label="Gallery"
        path="/gallery"
        title="A whole gallery of good dogs."
        text="A playful look at bath time, fresh trims, and the little moments that make a spa day feel special."
      />
      <section className="section compact container">
        <Comparison />
        <div className="photo-grid">
          {gallery.map((item) => (
            <figure key={item.photo}>
              <PhotoPlaceholder photo={item.photo} color={item.color} />
              <figcaption>{photos[item.photo].label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="center-note">
          These are editorial brand illustrations, not examples of Cassie’s
          finished client work.{" "}
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">
            Visit Cassie’s Facebook page
          </a>{" "}
          for current real-life photos.
        </p>
      </section>
      <CTA />
    </>
  );
}
