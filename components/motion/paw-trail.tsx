"use client";
import { motion, useReducedMotion } from "motion/react";
import { PawPrint } from "lucide-react";
export function PawTrail() {
  const reduce = useReducedMotion();
  return (
    <div className="paw-trail" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.span
          key={i}
          initial={false}
          whileInView={reduce ? {} : { opacity: [0.2, 0.75], y: [8, 0] }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.075, duration: 0.4 }}
        >
          <PawPrint size={19} />
        </motion.span>
      ))}
    </div>
  );
}
