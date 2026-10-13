import Link from "next/link";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { bookLink, mainNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div>
          <Link href="/" className="brand">
            <PawPrint aria-hidden="true" />
            <span>
              {site.shortName}
              <small>DOG GROOMING</small>
            </span>
          </Link>
          <p>
            A little pampering.
            <br />A whole lot of tail wags.
          </p>
          <span className="status">Accepting new clients</span>
        </div>
        <div>
          <h2>Find your happy place</h2>
          <p>{site.location}</p>
          <a href={site.telHref}>{site.phone}</a>
          <p>{site.hours}</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Have a sniff around</h2>
          {[...mainNav.slice(1), bookLink].map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <h2>More happy pups</h2>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer">
            Visit Facebook <ArrowUpRight size={16} />
          </a>
          <p>
            Follow along for fresh cuts
            <br />
            and familiar furry faces.
          </p>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Cassie’s Dog Grooming</span>
        <Link href="/privacy">Privacy</Link>
        <span>Made for good dogs. All of them.</span>
      </div>
    </footer>
  );
}
