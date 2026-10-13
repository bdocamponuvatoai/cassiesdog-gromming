import { describe, it, expect } from "vitest";
import { bookingSchema } from "../lib/validations/booking";
const valid = {
  ownerName: "Test Owner",
  phone: "614-555-0123",
  email: "",
  dogName: "Test Pup",
  breed: "Mixed",
  size: "medium",
  service: "bath",
  date: "2099-06-20",
  time: "flexible",
  notes: "",
  website: "",
};
describe("booking validation", () => {
  it("accepts a complete request without optional email", () =>
    expect(bookingSchema.safeParse(valid).success).toBe(true));
  it("rejects empty fields", () =>
    expect(bookingSchema.safeParse({}).success).toBe(false));
  it("rejects invalid phone and email", () =>
    expect(
      bookingSchema.safeParse({ ...valid, phone: "abc", email: "bad" }).success,
    ).toBe(false));
  it("rejects past dates", () =>
    expect(
      bookingSchema.safeParse({ ...valid, date: "2000-01-01" }).success,
    ).toBe(false));
  it("rejects impossible dates", () =>
    expect(
      bookingSchema.safeParse({ ...valid, date: "2099-02-31" }).success,
    ).toBe(false));
  it("rejects honeypot submissions", () =>
    expect(bookingSchema.safeParse({ ...valid, website: "spam" }).success).toBe(
      false,
    ));
  it("rejects unexpected service values", () =>
    expect(
      bookingSchema.safeParse({ ...valid, service: "injected" }).success,
    ).toBe(false));
  it("limits notes", () =>
    expect(
      bookingSchema.safeParse({ ...valid, notes: "x".repeat(2001) }).success,
    ).toBe(false));
});
