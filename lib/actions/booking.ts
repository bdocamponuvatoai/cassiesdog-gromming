"use server";
import "server-only";
import { headers } from "next/headers";
import { z } from "zod";
import { site } from "@/content/site";
import { getBookingConfig } from "@/lib/server/booking-config";
import { sendBookingEmail } from "@/lib/server/booking-email";
import { consumeBookingQuota } from "@/lib/server/rate-limit";
import {
  bookingSchema,
  type BookingField,
  type BookingState,
} from "@/lib/validations/booking";

const UNAVAILABLE = `Online requests are temporarily unavailable. Please call or text Cassie at ${site.phone}.`;

const fields = Object.keys(bookingSchema.shape) as BookingField[];

export async function requestBooking(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const values: Partial<Record<BookingField, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    values[field] = typeof value === "string" ? value : "";
  }

  if (values.website) {
    return {
      status: "error",
      message: "Unable to process this request. Please call Cassie.",
    };
  }

  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const config = getBookingConfig();
  if (!config) {
    console.error("[booking] Delivery is not configured; request not sent.");
    return { status: "error", message: UNAVAILABLE };
  }

  try {
    // Vercel sets this header itself, so clients cannot spoof it there.
    const ip =
      (await headers()).get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!(await consumeBookingQuota(ip, config))) {
      return {
        status: "error",
        message:
          "Too many requests. Please wait an hour or call Cassie directly.",
      };
    }

    await sendBookingEmail(parsed.data, config);
    return {
      status: "success",
      message:
        "Your request is on its way! Cassie will follow up to confirm availability. Your appointment is not booked until she confirms it.",
    };
  } catch (error) {
    console.error("[booking] Request delivery failed:", error);
    return { status: "error", message: UNAVAILABLE };
  }
}
