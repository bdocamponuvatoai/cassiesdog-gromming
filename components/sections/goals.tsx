import { Bath, Heart, PawPrint, Scissors, Sparkles } from "lucide-react";
import { Animated } from "@/components/motion/animated";
import { SectionHeading } from "@/components/sections/section-heading";
import { goals, type GoalIcon } from "@/content/site";

const icons = {
  heart: Heart,
  bath: Bath,
  sparkles: Sparkles,
  paw: PawPrint,
  scissors: Scissors,
} satisfies Record<GoalIcon, unknown>;

export function Goals() {
  return (
    <section className="section goals-section container">
      <SectionHeading
        eyebrow="MORE THAN A FRESH HAIRCUT"
        title="Five little goals. One happy dog."
      />
      <div className="goals">
        {goals.map((goal) => {
          const Icon = icons[goal.icon];
          return (
            <Animated className={`goal tint-${goal.color}`} key={goal.title}>
              <Icon size={28} />
              <h3>{goal.title}</h3>
              <p>{goal.text}</p>
            </Animated>
          );
        })}
      </div>
    </section>
  );
}
