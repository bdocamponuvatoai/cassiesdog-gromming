"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, PawPrint, Phone, X } from "lucide-react";
import { Mascot } from "@/components/mascot/mascot";
import { bookLink, mainNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

const mobileNav = [...mainNav, bookLink];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className={cn("header", scrolled && "scrolled")}>
      <div className="nav-row container">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-icon">
            <Mascot headOnly />
          </span>
          <span>
            {site.shortName}
            <small>DOG GROOMING</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/book" className="button button-primary header-book">
          Book Now <PawPrint size={17} aria-hidden="true" />
        </Link>
        <a
          href={site.telHref}
          className="icon-button mobile-call"
          aria-label="Call Cassie"
        >
          <Phone aria-hidden="true" />
        </a>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="icon-button menu-trigger"
              aria-label="Open navigation"
            >
              <Menu aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="sheet-overlay" />
            <Dialog.Content className="sheet">
              <div className="split">
                <Dialog.Title>Come on in.</Dialog.Title>
                <Dialog.Close
                  className="icon-button"
                  aria-label="Close navigation"
                >
                  <X aria-hidden="true" />
                </Dialog.Close>
              </div>
              <Dialog.Description>
                Find a little fresh-coat happiness.
              </Dialog.Description>
              <nav aria-label="Mobile navigation">
                {mobileNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={current(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <PawPrint className="sheet-paw" aria-hidden="true" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
