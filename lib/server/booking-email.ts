import "server-only";
import { createHmac } from "node:crypto";
import {
  serviceOptions,
  sizeOptions,
  timeOptions,
  type BookingRequest,
} from "@/lib/validations/booking";
import type { BookingConfig } from "./booking-config";

export function formatBookingEmail(request: BookingRequest) {
  return [
    "New grooming appointment request (not a confirmed appointment)",
    `Owner: ${request.ownerName}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email || "Not provided"}`,
    `Dog: ${request.dogName}`,
    `Breed: ${request.breed}`,
    `Size: ${sizeOptions[request.size]}`,
    `Service: ${serviceOptions[request.service]}`,
    `Preferred date: ${request.date}`,
    `Preferred time: ${timeOptions[request.time]} (Columbus, Ohio time)`,
    `Notes: ${request.notes || "None"}`,
  ].join("\n");
}

/**
 * Sends the request to Cassie's inbox through Resend. Resolves only once the
 * provider has accepted the message and returned an id; throws otherwise.
 */
export async function sendBookingEmail(
  request: BookingRequest,
  config: BookingConfig,
) {
  const text = formatBookingEmail(request);
  // Identical resubmissions (double clicks, retries) map to one email.
  const idempotencyKey = createHmac("sha256", config.secret)
    .update(text)
    .digest("hex");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `booking/${idempotencyKey}`,
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      subject: "New grooming appointment request",
      text,
      ...(request.email ? { reply_to: request.email } : {}),
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    throw new Error(`Email provider responded with ${response.status}`);
  }

  const receipt: unknown = await response.json();
  if (
    typeof receipt !== "object" ||
    receipt === null ||
    !("id" in receipt) ||
    typeof receipt.id !== "string"
  ) {
    throw new Error("Invalid email provider receipt");
  }
}
