import "server-only";
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  BOOKING_FROM_EMAIL: z.string().min(1),
  BOOKING_TO_EMAIL: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_SECRET: z.string().min(1),
});

export type BookingConfig = {
  resendApiKey: string;
  fromEmail: string;
  toEmail: string;
  redisUrl: string;
  redisToken: string;
  secret: string;
};

/**
 * Reads booking delivery settings at request time. Returns null when any
 * variable is missing so the form can fail safely with a call/text fallback.
 */
export function getBookingConfig(): BookingConfig | null {
  const env = envSchema.safeParse(process.env);
  if (!env.success) return null;
  return {
    resendApiKey: env.data.RESEND_API_KEY,
    fromEmail: env.data.BOOKING_FROM_EMAIL,
    toEmail: env.data.BOOKING_TO_EMAIL,
    redisUrl: env.data.UPSTASH_REDIS_REST_URL,
    redisToken: env.data.UPSTASH_REDIS_REST_TOKEN,
    secret: env.data.RATE_LIMIT_SECRET,
  };
}
