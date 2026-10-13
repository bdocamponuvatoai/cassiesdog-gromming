import { SectionHeading } from "@/components/sections/section-heading";
import { faqs } from "@/content/site";

export function FAQ() {
  return (
    <section className="section faq container">
      <SectionHeading
        eyebrow="A FEW GOOD QUESTIONS"
        title="Wondering about something?"
        text="Let’s make your pup’s visit feel a little more familiar."
      />
      <div>
        {faqs.map((faq) => (
          <details key={faq.q}>
            <summary>
              {faq.q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
