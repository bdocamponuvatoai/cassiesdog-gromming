import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/content/site";

export function ContactDetails() {
  return (
    <aside className="contact-card">
      <span className="eyebrow">LET’S TALK TAIL WAGS</span>
      <h2>Prefer a little hello first?</h2>
      <p>
        Call or text Cassie to ask a question, get a quote, or request an
        appointment.
      </p>
      <a className="contact-phone" href={site.telHref}>
        {site.phone}
      </a>
      <div className="actions">
        <a className="button button-secondary" href={site.smsHref}>
          Text Cassie
        </a>
        <a
          className="text-link"
          href={site.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook <ArrowUpRight size={16} />
        </a>
      </div>
      <hr />
      <p>
        <MapPin size={19} aria-hidden="true" /> {site.location}
      </p>
      <p>{site.hours}</p>
      <small>
        Your requested date is a preference, not a confirmed booking. Cassie
        will confirm availability with you.
      </small>
    </aside>
  );
}
