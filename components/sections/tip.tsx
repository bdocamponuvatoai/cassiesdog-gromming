import { Scissors } from "lucide-react";
import { Animated } from "@/components/motion/animated";

export function Tip() {
  return (
    <section className="tip container">
      <span className="tip-icon">
        <Scissors size={32} />
      </span>
      <div>
        <span className="eyebrow">A LITTLE TIP FOR EXTRA FLOOF</span>
        <h2>Longer haircuts? Let’s make it a routine.</h2>
        <p>
          For longer haircuts, book every <strong>6–8 weeks.</strong>
        </p>
      </div>
      <Animated className="tip-bubble">
        <span>
          6–8<small>WEEKS</small>
        </span>
      </Animated>
    </section>
  );
}
