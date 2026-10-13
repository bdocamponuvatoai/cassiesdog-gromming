import "server-only";
import { createHmac } from "node:crypto";
import type { BookingConfig } from "./booking-config";

const WINDOW_SECONDS = 60 * 60;
const MAX_REQUESTS = 5;

// Atomic fixed-window counter: increment, and set the expiry on first hit.
const INCREMENT_SCRIPT = `local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ${WINDOW_SECONDS}) end; return n`;

/**
 * Counts a booking request for `identifier` and reports whether it is within
 * the limit. Only a keyed hash of the identifier is stored. Throws when the
 * limiter is unreachable so callers fail closed.
 */
export async function consumeBookingQuota(
  identifier: string,
  config: BookingConfig,
): Promise<boolean> {
  const key = createHmac("sha256", config.secret)
    .update(identifier)
    .digest("hex");

  const response = await fetch(config.redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["EVAL", INCREMENT_SCRIPT, 1, `booking:${key}`]),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Rate limiter responded with ${response.status}`);
  }

  const body: unknown = await response.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("result" in body) ||
    typeof body.result !== "number"
  ) {
    throw new Error("Invalid rate limiter response");
  }
  return body.result <= MAX_REQUESTS;
}
