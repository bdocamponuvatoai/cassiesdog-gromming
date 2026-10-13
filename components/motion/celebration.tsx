import { PawPrint } from "lucide-react";

/** Decorative confetti shown with the booking success state. */
export function Celebration() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i}>{i % 2 ? <i /> : <PawPrint size={24} />}</span>
      ))}
    </div>
  );
}
