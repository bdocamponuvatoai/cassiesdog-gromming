import Link from "next/link";
import { ArrowUpRight, Bath, PawPrint, Scissors } from "lucide-react";
import { Animated } from "@/components/motion/animated";
import { services, type ServiceIcon } from "@/content/site";

const icons = {
  bath: Bath,
  scissors: Scissors,
  paw: PawPrint,
} satisfies Record<ServiceIcon, unknown>;

export function ServiceCards({ details = false }: { details?: boolean }) {
  return (
    <div className="service-grid">
      {services.map((service, i) => {
        const Icon = icons[service.icon];
        return (
          <Animated
            key={service.slug}
            className={`service-card tint-${service.color}`}
          >
            <div className="split">
              <span className="service-icon">
                <Icon size={35} />
              </span>
              <span className="service-number">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <span className="eyebrow">{service.eyebrow}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            {details && (
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
            <div className="service-bottom">
              <b>Ask for a quote</b>
              <Link
                className="icon-button"
                href="/book#request"
                aria-label={`Request ${service.name.toLowerCase()}`}
              >
                <ArrowUpRight />
              </Link>
            </div>
          </Animated>
        );
      })}
    </div>
  );
}
