import { ArrowUpRight } from "lucide-react";
import { Mascot } from "@/components/mascot/mascot";
import { Animated } from "@/components/motion/animated";
import { ButtonLink } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="cta-wrap container">
      <Animated className="cta">
        <div>
          <span className="eyebrow">GOOD DOGS DESERVE GOOD GROOMS</span>
          <h2>
            Ready for your
            <br />
            pup’s spa day?
          </h2>
          <p>Let’s get those tails wagging, Columbus.</p>
          <ButtonLink href="/book" variant="ghost">
            Book Now <ArrowUpRight size={19} />
          </ButtonLink>
        </div>
        <div className="cta-mascot">
          <Mascot />
          <span className="mascot-sign">Book Now!</span>
        </div>
      </Animated>
    </section>
  );
}
