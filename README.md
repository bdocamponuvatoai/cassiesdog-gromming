# Cassie’s Dog Grooming

[![CI](https://github.com/bdocamponuvatoai/cassiesdog-gromming/actions/workflows/ci.yml/badge.svg)](https://github.com/bdocamponuvatoai/cassiesdog-gromming/actions/workflows/ci.yml)

A Next.js 16.4.0 App Router website for an independent groomer in Columbus / Obetz, Ohio. The approved candy palette, Fredoka / Nunito fonts and original layered spa-pup mascot are implemented. Source is ready for a Vercel deployment; no hosted deployment has been made in this environment.

## Run

Use Node.js 24 LTS (see `.nvmrc`) and npm. Dependencies are pinned by package-lock.json.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Production:

```sh
npm run check   # lint, typecheck, format check, unit tests
npm run build
npm start
```

Open http://localhost:3000. All seven marketing pages are prerendered. Booking submission uses a Server Action and requires a Node server or Vercel; `next export` / static-only hosting is not supported for the booking flow.

## What is included

- Home, Services, Gallery, Meet Cassie, Reviews, Book / Contact, Privacy, custom 404 and error boundary.
- Fredoka display and Nunito body fonts, self-hosted using next/font/local. Two font families only; original font downloads came from Google Fonts.
- OKLCH Tailwind v4 tokens, system dark mode, responsive layouts, skip link and keyboard focus rings.
- Radix mobile navigation with focus management, overlay, Escape handling and scroll locking.
- Original inline SVG mascot with separate body, ears, eyes, tail, waving paw and bubble crown.
- CSS motion, Motion reveal wrappers, off-screen loop pausing and reduced-motion overrides. Content is visible in the server-rendered HTML.
- Native accessible FAQ disclosure controls, manual review carousel, keyboard-operable comparison slider.
- Typed local service / review / FAQ / visual content. Only the supplied two reviews are used; no prices or business achievements are invented.
- Shared Zod validation, React Hook Form field feedback, Server Action, pending state, success state and honeypot.
- Distributed Upstash rate limit: five valid requests per network identifier per hour. Only a keyed hash of the identifier is stored; keys expire after one hour. The trusted IP source is Vercel’s `x-vercel-forwarded-for`. Non-Vercel deployments share an `unknown` bucket until an appropriate trusted-host header is configured.
- Resend plain-text email delivery, timeouts and idempotency key. The UI confirms provider acceptance only, not inbox receipt or a confirmed appointment.
- LocalBusiness, Service, FAQPage and primary informational-page BreadcrumbList structured data; page metadata, icon, branded OG image, robots and sitemap.
- Security headers. CSP permits inline Next.js bootstrap scripts and styles to retain static rendering, so it is not a nonce-based strict CSP. No API secrets are exposed to the browser.
- Unit tests (validation, booking action, structured data) and a Playwright browser suite.

## Vercel deployment

1. Import this source directory into your own Git repository and connect it to the intended Vercel project, or use the Vercel CLI from this directory.
2. Select the Next.js framework preset and Node.js 24.x. The build command is `npm run build`; leave the framework’s output directory default unchanged.
3. Add the environment variables from `.env.example` in Vercel. Use a verified Resend sending-domain address and verify the destination inbox with Cassie. Configure Upstash Redis REST credentials.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. Leave it blank for an unconfigured/private preview: robots and metadata default to noindex, and sitemap is empty. This is indexing control, not access control. Use Vercel deployment protection for private previews.
5. Deploy, run the browser suite against the deployment and check a single explicitly authorized appointment request in the configured inbox. Provider acceptance alone does not prove delivery to the inbox.
6. Replace editorial illustrations with owner-approved client photos if desired, and verify address, hours, prices and payment details before a public launch.

## Environment variables

| Variable                 | Purpose                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| NEXT_PUBLIC_SITE_URL     | Final canonical URL; blank disables indexing                               |
| RESEND_API_KEY           | Server-only Resend API key                                                 |
| BOOKING_FROM_EMAIL       | Verified sender address                                                    |
| BOOKING_TO_EMAIL         | Cassie’s confirmed booking inbox                                           |
| UPSTASH_REDIS_REST_URL   | Distributed rate-limit Redis REST endpoint                                 |
| UPSTASH_REDIS_REST_TOKEN | Redis REST token                                                           |
| RATE_LIMIT_SECRET        | Random secret for keyed hashes / idempotency; use at least 32 random bytes |

If any delivery or rate-limit variable is missing, submission fails safely with a call/text alternative. No fake success or test email is sent.

## Editing content

| Content                                                  | File                                                              |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| Business name, phone, Facebook, location, hours          | content/site.ts (`site`) — the only place the phone number lives  |
| Navigation and sitemap routes                            | content/site.ts (`mainNav`, `bookLink`, `routes`)                 |
| Service descriptions, goals, steps                       | content/site.ts (`services`, `goals`, `steps`)                    |
| Reviews and FAQs                                         | content/site.ts (`reviews`, `faqs`)                               |
| Visual captions, paths, alt text and gallery order       | content/photos.ts (`photos`, `gallery`)                           |
| Home section copy                                        | app/page.tsx and components/sections/*.tsx                        |
| Per-page copy / metadata                                 | app/[page-name]/page.tsx                                          |
| Structured data (JSON-LD)                                | lib/structured-data.ts                                            |
| Booking options / validation                             | lib/validations/booking.ts (shared by form, action and email)     |
| Booking labels / state copy                              | components/sections/booking-form.tsx and lib/actions/booking.ts   |
| Tokens, dark mode, spacing, breakpoints, animation rules | app/globals.css                                                   |
| Mascot artwork                                           | components/mascot/mascot.tsx; editable original public/mascot.svg |

The current image set lives in `public/images/` and uses clearly editorial brand illustrations rather than invented client photography. To add real photos, place owned, approved files in `public/photos/`, then set the matching `photos` entry’s `src` to `/photos/filename.webp` and revise its caption and `alt`. The comparison slider reads `photos.peteBefore` and `photos.peteAfter`; those internal keys can remain even when the displayed subject changes. Images use `next/image` with responsive `sizes`. The hero is vector artwork, so it needs no raster preload. If a raster hero is added later, follow the current `preload` / `fetchPriority` guidance rather than using the deprecated `priority` prop.

Prices currently read “Ask for a quote.” Update the service-price display in `components/sections/service-cards.tsx` together with the pricing FAQ once Cassie supplies confirmed amounts.

## Photo shot list

| Slot               | Needed image                                                         |
| ------------------ | -------------------------------------------------------------------- |
| Home / Meet Cassie | Cassie at her grooming station; separate portrait with a willing dog |
| Comparison before  | Dog before grooming, full coat visible                               |
| Comparison after   | Same framing / lighting after a spa day                              |
| Bath card          | A freshly bathed dog, comfortable and dry                            |
| Haircut card       | A finished haircut, face and coat detail visible                     |
| Gallery extras     | Additional finished grooms across coat types and sizes               |

Use owner-approved photos. Until those are available, the current generated visuals remain visibly illustrated and the gallery explicitly states that they do not represent completed client work.

## Motion inventory

| Location                     | Implementation                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Hero                         | Staggered headline transform, drifting blob and bubbles, mascot wave, blink and wag |
| Scroll sections / goal cards | Motion spring translate reveals, with text never initially hidden                   |
| Service cards                | Hover tilt / lift and icon wiggle                                                   |
| Buttons                      | Lift, press squish, decorative sparkle                                              |
| Grooming tip                 | Transform-based fill inside the 6–8 week bubble                                     |
| Comparison                   | Native draggable / keyboard range control with paw handle                           |
| Reviews                      | Manual previous / next controls and selection dots; no autoplay                     |
| Form                         | Pending brush, success mascot wiggle and decorative celebration                     |

Off-screen loop pausing is controlled by IntersectionObserver in `components/motion/animated.tsx`. Static mascot placements do not loop. Reduced motion disables CSS animations/transitions and Motion movement. The hero divider drifts slowly, decorative paws reveal in sequence on scroll, and page entries use a short fade/slide. The optional cursor trail is omitted.

## Project structure

```
app/                 Routes, root layout, error boundaries, metadata routes, fonts, global CSS
components/layout/   Header navigation and footer
components/sections/ Page sections (one component per file) and interactive client leaves
components/seo/      JSON-LD script component
components/ui/       Button / ButtonLink
content/             Typed business content and photo slots
lib/actions/         Server Actions
lib/server/          Server-only modules: booking config, rate limiter, email delivery
lib/validations/     Zod schemas shared by client and server
tests/               Vitest unit tests; tests/browser for Playwright
```

Client Components are limited to interactive leaves (navigation sheet, comparison slider, review carousel, booking form, motion wrappers). Everything else renders on the server and every page is statically prerendered.

## Verification

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, format check, unit tests and a production build on every push and pull request, then the Playwright browser suite. Dependabot opens weekly dependency updates.

To run the same checks locally:

```sh
npm run check
npm run build
python scripts/audit-html.py      # structural HTML audit of the build output
npx playwright install chromium   # once
npm run test:e2e
```

The browser suite covers all pages at 360, 390, 768, 1024, 1280 and 1440px in light and dark mode (no horizontal overflow, one h1, no runtime errors), navigation and slider keyboard use, reduced motion and JS-disabled content. The valid-form submission test is opt-in: set `RUN_UNCONFIGURED_FORM_TEST=1` only against a server with booking credentials absent, so no real inbox is contacted. Server-action delivery branches are unit-tested with mocked providers.

Lighthouse, screen-reader checks and a live Resend inbox test remain launch gates.

## Source references

Implementation used the installed Next.js 16.4.0 bundled docs. Provider interfaces: https://resend.com/docs/api-reference/emails/send-email and https://upstash.com/docs/redis/features/restapi.
