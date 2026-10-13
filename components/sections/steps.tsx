import { Animated } from "@/components/motion/animated";
import { PawTrail } from "@/components/motion/paw-trail";
import { SectionHeading } from "@/components/sections/section-heading";
import { steps } from "@/content/site";

export function Steps() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="EASY AS ONE, TWO, WOOF"
        title="A good day from start to finish."
      />
      <PawTrail />
      <div className="steps">
        {steps.map((step) => (
          <Animated className="step" key={step.n}>
            <span>{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Animated>
        ))}
      </div>
    </section>
  );
}
