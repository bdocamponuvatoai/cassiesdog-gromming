"use client";

import { startTransition, useActionState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Brush } from "lucide-react";
import { Mascot } from "@/components/mascot/mascot";
import { Celebration } from "@/components/motion/celebration";
import { requestBooking } from "@/lib/actions/booking";
import {
  bookingSchema,
  serviceOptions,
  sizeOptions,
  timeOptions,
  type BookingField,
  type BookingState,
  type BookingValues,
} from "@/lib/validations/booking";

const initialState: BookingState = { status: "idle", message: "" };

const textFields: {
  name: BookingField;
  label: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  required: boolean;
  maxLength: number;
}[] = [
  {
    name: "ownerName",
    label: "Your name",
    type: "text",
    autoComplete: "name",
    required: true,
    maxLength: 100,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
    required: true,
    maxLength: 25,
  },
  {
    name: "email",
    label: "Email (optional)",
    type: "email",
    autoComplete: "email",
    required: false,
    maxLength: 254,
  },
  {
    name: "dogName",
    label: "Dog’s name",
    type: "text",
    autoComplete: "off",
    required: true,
    maxLength: 100,
  },
  {
    name: "breed",
    label: "Breed or mix",
    type: "text",
    autoComplete: "off",
    required: true,
    maxLength: 100,
  },
];

const selectFields: {
  name: BookingField;
  label: string;
  placeholder: string;
  options: Record<string, string>;
}[] = [
  {
    name: "size",
    label: "Dog’s size",
    placeholder: "Choose a size",
    options: sizeOptions,
  },
  {
    name: "service",
    label: "What can we help with?",
    placeholder: "Choose a service",
    options: serviceOptions,
  },
];

export function BookingForm() {
  const [state, formAction, pending] = useActionState(
    requestBooking,
    initialState,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
  });

  // Validate in the browser first; the Server Action validates again. Without
  // JavaScript the form still posts straight to the action.
  const onSubmit = handleSubmit((_values, event) => {
    const form = event?.target;
    if (!(form instanceof HTMLFormElement)) return;
    const data = new FormData(form);
    startTransition(() => formAction(data));
  });

  const errorFor = (name: BookingField) =>
    errors[name]?.message ?? state.errors?.[name]?.[0];

  const fieldProps = (name: BookingField) => {
    const error = errorFor(name);
    return {
      ...register(name),
      id: name,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-error` : undefined,
    };
  };

  const fieldError = (name: BookingField) => {
    const error = errorFor(name);
    return error ? (
      <p className="field-error" id={`${name}-error`}>
        {error}
      </p>
    ) : null;
  };

  if (state.status === "success") {
    return (
      <div className="booking-form success-panel" role="status">
        <Celebration />
        <Mascot />
        <h2>A little happiness is on its way.</h2>
        <p>{state.message}</p>
        <Link href="/" className="button button-secondary">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className="booking-form" action={formAction} onSubmit={onSubmit}>
      <span className="eyebrow">TELL US ABOUT YOUR BEST FRIEND</span>
      <h2>Appointment request</h2>
      <p className="form-note">
        Required fields are marked *. Preferred times are in Columbus, Ohio
        time.
      </p>

      <div className="form-grid">
        {textFields.map((field) => (
          <div className="field" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.required && " *"}
            </label>
            <input
              {...fieldProps(field.name)}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              maxLength={field.maxLength}
            />
            {fieldError(field.name)}
          </div>
        ))}

        {selectFields.map((field) => (
          <div className="field" key={field.name}>
            <label htmlFor={field.name}>{field.label} *</label>
            <select {...fieldProps(field.name)} required defaultValue="">
              <option value="" disabled>
                {field.placeholder}
              </option>
              {Object.entries(field.options).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {fieldError(field.name)}
          </div>
        ))}

        <div className="field">
          <label htmlFor="date">Preferred date *</label>
          <input {...fieldProps("date")} type="date" required />
          {fieldError("date")}
        </div>

        <div className="field field-full">
          <label htmlFor="time">Preferred time *</label>
          <select {...fieldProps("time")} required defaultValue="">
            <option value="" disabled>
              Choose a time preference
            </option>
            {Object.entries(timeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError("time")}
        </div>

        <div className="field field-full">
          <label htmlFor="notes">
            Anything else we should know? (optional)
          </label>
          <textarea
            {...fieldProps("notes")}
            rows={4}
            maxLength={2000}
            placeholder="Temperament, matting, special needs, or your pup’s favorite kind of fuss."
          />
          {fieldError("notes")}
        </div>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this blank</label>
        <input
          {...register("website")}
          id="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="form-message" role="alert">
            {state.message}
          </p>
        )}
      </div>

      <p className="form-note">
        By sending this request, you’re asking Cassie to contact you about your
        appointment. Read our <Link href="/privacy">privacy notice</Link>. This
        is a request, not a confirmed booking.
      </p>

      <button
        type="submit"
        className="button button-primary"
        disabled={pending}
      >
        {pending ? (
          <>
            <Brush className="pending-brush" aria-hidden="true" /> Sending your
            request…
          </>
        ) : (
          <>
            Request a Spa Day <ArrowUpRight size={19} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
