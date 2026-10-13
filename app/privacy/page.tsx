import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How appointment request information is used by Cassie’s Dog Grooming.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="section prose container">
      <span className="eyebrow">YOUR DETAILS, TREATED WITH CARE</span>
      <h1>Privacy</h1>
      <p>
        This page explains the information collected through this website’s
        appointment request form.
      </p>
      <h2>What you share</h2>
      <p>
        The form asks for your name, phone number, optional email, your dog’s
        details, preferred service and appointment time, and optional notes.
        Please do not include payment information or sensitive personal records.
      </p>
      <h2>How it is used</h2>
      <p>
        Your details are used to respond to your request, discuss your dog’s
        grooming needs, and arrange an appointment. A request does not confirm a
        booking.
      </p>
      <h2>Delivery and spam protection</h2>
      <p>
        When online requests are enabled, form details are sent to Cassie’s
        configured inbox using Resend. Hosting providers process technical
        request information. Spam protection stores a hashed network identifier
        and request counts temporarily, for up to one hour, using Upstash. The
        site does not add marketing trackers or advertising cookies.
      </p>
      <h2>Retention and your choices</h2>
      <p>
        Appointment correspondence may remain in the business inbox while needed
        to handle your enquiry and related business records. To ask about your
        information or request its deletion, contact Cassie at{" "}
        <a href={site.telHref}>{site.phone}</a>.
      </p>
      <h2>Other websites</h2>
      <p>
        Facebook links take you to a separate service with its own privacy
        practices.
      </p>
      <ButtonLink href="/book">Contact Cassie</ButtonLink>
    </article>
  );
}
