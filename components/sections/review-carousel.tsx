"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Animated } from "@/components/motion/animated";
import { reviews } from "@/content/site";
import { cn } from "@/lib/utils";

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const go = (step: number) =>
    setIndex((i) => (i + step + reviews.length) % reviews.length);

  return (
    <div
      className="review-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
    >
      <div aria-live="polite">
        <Animated className="review-bubble floating-review">
          <Quote aria-hidden="true" size={38} />
          <blockquote>“{review.quote}”</blockquote>
          <p>— {review.author}</p>
        </Animated>
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          className="icon-button"
          onClick={() => go(-1)}
          aria-label="Previous review"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        {reviews.map((r, i) => (
          <button
            type="button"
            key={r.author}
            className={cn("dot-button", i === index && "selected")}
            onClick={() => setIndex(i)}
            aria-label={`Show review ${i + 1}`}
            aria-pressed={i === index}
          >
            <span />
          </button>
        ))}
        <button
          type="button"
          className="icon-button"
          onClick={() => go(1)}
          aria-label="Next review"
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
