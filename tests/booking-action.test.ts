import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-vercel-forwarded-for": "192.0.2.1" }),
}));
import { requestBooking } from "../lib/actions/booking";
const idle = { status: "idle" as const, message: "" };
function data() {
  const form = new FormData();
  for (const [k, v] of Object.entries({
    ownerName: "Test Owner",
    phone: "6145550123",
    email: "",
    dogName: "Test Pup",
    breed: "Mixed",
    size: "medium",
    service: "bath",
    date: "2099-06-20",
    time: "flexible",
    notes: "",
    website: "",
  }))
    form.set(k, v);
  return form;
}
beforeEach(() => {
  for (const key of [
    "RESEND_API_KEY",
    "BOOKING_FROM_EMAIL",
    "BOOKING_TO_EMAIL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RATE_LIMIT_SECRET",
  ])
    vi.stubEnv(key, "test-only");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("booking action delivery safety", () => {
  it("does not send empty requests", async () => {
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    expect((await requestBooking(idle, new FormData())).status).toBe("error");
    expect(f).not.toHaveBeenCalled();
  });
  it("does not send honeypot requests", async () => {
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    const d = data();
    d.set("website", "spam");
    expect((await requestBooking(idle, d)).status).toBe("error");
    expect(f).not.toHaveBeenCalled();
  });
  it("reports unconfigured delivery honestly", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const f = vi.fn();
    vi.stubGlobal("fetch", f);
    expect((await requestBooking(idle, data())).message).toContain(
      "call or text",
    );
    expect(f).not.toHaveBeenCalled();
  });
  it("blocks over-limit requests before email", async () => {
    const f = vi.fn().mockResolvedValue(Response.json({ result: 6 }));
    vi.stubGlobal("fetch", f);
    expect((await requestBooking(idle, data())).message).toContain("Too many");
    expect(f).toHaveBeenCalledTimes(1);
  });
  it("does not claim success on provider failure", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ result: 1 }))
      .mockResolvedValueOnce(new Response("", { status: 500 }));
    vi.stubGlobal("fetch", f);
    expect((await requestBooking(idle, data())).status).toBe("error");
  });
  it("fails closed if the rate limiter fails", async () => {
    const f = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", f);
    expect((await requestBooking(idle, data())).status).toBe("error");
    expect(f).toHaveBeenCalledTimes(1);
  });
  it("confirms only after provider acceptance", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ result: 1 }))
      .mockResolvedValueOnce(Response.json({ id: "test-email-id" }));
    vi.stubGlobal("fetch", f);
    const r = await requestBooking(idle, data());
    expect(r.status).toBe("success");
    expect(r.message).toContain("not booked");
    expect(f).toHaveBeenCalledTimes(2);
    const payload = JSON.parse(f.mock.calls[1][1].body);
    expect(payload.text).toContain("Test Pup");
    expect(payload.text).toContain("Size: Medium");
    expect(payload.text).toContain("Preferred time: I’m flexible");
    expect(payload.reply_to).toBeUndefined();
  });
  it("rejects success responses without email receipt", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(Response.json({ result: 1 }))
        .mockResolvedValueOnce(Response.json({})),
    );
    expect((await requestBooking(idle, data())).status).toBe("error");
  });
});
