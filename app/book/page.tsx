import type { Metadata } from "next";
import { Mascot } from "@/components/mascot/mascot";
import { BookingForm } from "@/components/sections/booking-form";
import { ContactDetails } from "@/components/sections/contact-details";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Spa Day",
  description: `Request a dog grooming appointment with Cassie in Columbus and Obetz. Call or text ${site.phone}, or send an appointment request.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section className="page-intro container">
        <span className="eyebrow">LET THE PAMPERING BEGIN</span>
        <h1>
          Your pup’s next
          <br />
          good hair day starts here.
        </h1>
        <p>
          Tell us a little about your best friend. Cassie will follow up to
          confirm the details.
        </p>
        <a href={site.telHref} className="text-link">
          Or call {site.phone}
        </a>
      </section>
      <section className="booking-grid section compact container" id="request">
        <BookingForm />
        <div>
          <ContactDetails />
          <div className="booking-mascot">
            <Mascot />
            <span className="mascot-sign">Tell me about your pup!</span>
          </div>
        </div>
      </section>
    </>
  );
}
