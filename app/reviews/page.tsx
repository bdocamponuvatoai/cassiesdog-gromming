import type { Metadata } from "next";
import { ArrowUpRight, Quote } from "lucide-react";
import { CTA } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { reviews, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Kind Words from Clients",
  description:
    "Read the kind words shared by Cassie’s dog grooming clients, McKenzie B. and Margie S.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageIntro
        label="Reviews"
        path="/reviews"
        title="A little love from the other end of the leash."
        text="Two kind notes from the humans. A whole lot of appreciation from Cassie."
      />
      <section className="section compact container">
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-bubble" key={review.author}>
              <Quote aria-hidden="true" />
              <blockquote>“{review.quote}”</blockquote>
              <p>— {review.author}</p>
            </article>
          ))}
        </div>
        <p className="center-note">
          <a
            href={site.facebook}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Cassie on Facebook <ArrowUpRight size={18} />
          </a>
        </p>
      </section>
      <CTA />
    </>
  );
}
