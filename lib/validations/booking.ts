import { z } from "zod";

/** Option values and their human-readable labels, shared by the form and the email. */
export const sizeOptions = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  xl: "Extra large",
} as const;

export const serviceOptions = {
  bath: "Bath",
  haircut: "Haircut",
  "nail-trim": "Nail trim",
  "not-sure": "Not sure yet",
} as const;

export const timeOptions = {
  morning: "Morning",
  afternoon: "Afternoon",
  flexible: "I’m flexible",
} as const;

function keysOf<T extends Record<string, string>>(options: T) {
  return Object.keys(options) as [keyof T & string, ...(keyof T & string)[]];
}

/** Today's date (YYYY-MM-DD) in the business's time zone. */
export function ohioDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const requiredText = z
  .string()
  .trim()
  .min(1, "Please fill in this field.")
  .max(100, "Please use 100 characters or fewer.");

export const bookingSchema = z.object({
  ownerName: requiredText,
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s.-]{7,25}$/, "Enter a valid phone number.")
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "Include your area code.",
    ),
  email: z.union([z.literal(""), z.email("Enter a valid email.")]).default(""),
  dogName: requiredText,
  breed: requiredText,
  size: z.enum(keysOf(sizeOptions), { error: "Choose your dog’s size." }),
  service: z.enum(keysOf(serviceOptions), { error: "Choose a service." }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date.")
    .refine((v) => {
      const d = new Date(`${v}T12:00:00Z`);
      return (
        !Number.isNaN(d.getTime()) &&
        d.toISOString().slice(0, 10) === v &&
        v >= ohioDate()
      );
    }, "Choose today or a future date."),
  time: z.enum(keysOf(timeOptions), { error: "Choose a preferred time." }),
  notes: z
    .string()
    .trim()
    .max(2000, "Please keep notes under 2,000 characters.")
    .default(""),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0, "Unable to process this request.").default(""),
});

export type BookingField = keyof typeof bookingSchema.shape;
export type BookingValues = z.input<typeof bookingSchema>;
export type BookingRequest = z.output<typeof bookingSchema>;

export type BookingState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Partial<Record<BookingField, string[]>>;
};
