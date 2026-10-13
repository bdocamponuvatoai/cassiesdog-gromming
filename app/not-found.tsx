import type { Metadata } from "next";
import { Mascot } from "@/components/mascot/mascot";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section not-found container">
      <div>
        <span className="eyebrow">404 · WHOOPS, A LITTLE DETOUR</span>
        <h1>This page ran off to chase a squirrel.</h1>
        <p>Let’s get you back to the good stuff.</p>
        <ButtonLink href="/">Head back home</ButtonLink>
      </div>
      <Mascot />
    </section>
  );
}
