export type Tint = "blue" | "pink" | "mint" | "yellow" | "lilac";

export type NavLink = { href: string; label: string };

const phone = "614-595-1985";
const tel = "+16145951985";

export const site = {
  name: "Cassie's Dog Grooming",
  shortName: "Cassie’s",
  description:
    "Baths, haircuts and nail trims with Cassie at Buckeye K9 in the Obetz area of Columbus, OH. All breeds and sizes welcome. Request your pup’s spa day.",
  phone,
  tel,
  telHref: `tel:${tel}`,
  smsHref: `sms:${tel}`,
  facebook: "https://www.facebook.com/PetGroomingByCassie",
  location: "At Buckeye K9 · Obetz area · Columbus, OH",
  areaServed: ["Columbus, Ohio", "Obetz, Ohio"],
  hours: "Contact Cassie for current hours and availability.",
} as const;

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/meet-cassie", label: "Meet Cassie" },
  { href: "/reviews", label: "Reviews" },
];

export const bookLink: NavLink = { href: "/book", label: "Book / Contact" };

/** Every indexable route, used by the sitemap. */
export const routes = [
  "/",
  "/services",
  "/gallery",
  "/meet-cassie",
  "/reviews",
  "/book",
  "/privacy",
] as const;

export type ServiceIcon = "bath" | "scissors" | "paw";

export type Service = {
  name: string;
  slug: string;
  eyebrow: string;
  description: string;
  details: string[];
  color: Tint;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    name: "Baths",
    slug: "bath",
    eyebrow: "FRESH STARTS HERE",
    description:
      "For muddy adventures, extra cuddles, and that wonderfully clean-dog feeling. Let’s talk about the right bath for your pup’s coat.",
    details: [
      "A fresh, clean coat",
      "Care for all breeds and sizes",
      "Tell us about skin sensitivities",
    ],
    color: "blue",
    icon: "bath",
  },
  {
    name: "Haircuts",
    slug: "haircut",
    eyebrow: "A LITTLE OFF THE FLOOF",
    description:
      "A fresh look that feels like your dog. We’ll talk through coat condition, your preferred style, and a practical grooming routine.",
    details: [
      "A style that suits your dog",
      "Coat condition considered",
      "Longer cuts: every 6–8 weeks",
    ],
    color: "pink",
    icon: "scissors",
  },
  {
    name: "Nail Trims",
    slug: "nail-trim",
    eyebrow: "HAPPY LITTLE TIPPY-TAPS",
    description:
      "A little paw care goes a long way. Ask Cassie about a nail trim and let her know how your pup feels about having their paws handled.",
    details: [
      "Thoughtful paw care",
      "Share any handling sensitivities",
      "Ask about appointment availability",
    ],
    color: "yellow",
    icon: "paw",
  },
];

export type GoalIcon = "heart" | "bath" | "sparkles" | "paw" | "scissors";

export const goals: {
  title: string;
  text: string;
  icon: GoalIcon;
  color: Tint;
}[] = [
  {
    title: "Comfort first",
    text: "A calm, caring approach",
    icon: "heart",
    color: "pink",
  },
  {
    title: "Clean & fresh",
    text: "Ready for more cuddles",
    icon: "bath",
    color: "blue",
  },
  {
    title: "Healthy coat",
    text: "Thoughtful coat care",
    icon: "sparkles",
    color: "mint",
  },
  {
    title: "Happy paws",
    text: "Neat little tippy-taps",
    icon: "paw",
    color: "yellow",
  },
  {
    title: "Their best look",
    text: "A style that suits them",
    icon: "scissors",
    color: "lilac",
  },
];

export const steps = [
  {
    n: "01",
    title: "Say hello",
    text: "Tell us about your dog and the care you’re looking for.",
  },
  {
    n: "02",
    title: "Time to pamper",
    text: "Confirm your appointment with Cassie, then bring your pup for their visit.",
  },
  {
    n: "03",
    title: "Hello, happy pup",
    text: "Pick up your freshly groomed friend. Cuddles highly encouraged.",
  },
];

export const reviews = [
  { quote: "Cassie is the best! Pete loves her!", author: "McKenzie B." },
  {
    quote: "Thank you, Cassie, and all the best to you and yours.",
    author: "Margie S.",
  },
];

export const faqs = [
  {
    q: "How often should my dog be groomed?",
    a: "For longer haircuts, plan on every 6–8 weeks. Your dog’s coat and lifestyle can change what they need. Ask Cassie for a routine that fits your pup.",
  },
  {
    q: "What should I bring?",
    a: "Tell Cassie about your dog’s coat, skin sensitivities, and any special needs when you request a visit. Ask her to confirm any records or items to bring before your appointment.",
  },
  {
    q: "My dog is nervous. Can we talk first?",
    a: "Absolutely—call or text before booking. Share what makes your pup anxious so Cassie can discuss their needs and whether the visit is a good fit.",
  },
  {
    q: "What if my dog has matting?",
    a: "Mention matting in your request. Cassie will need to assess the coat before recommending a grooming approach and quote. Your dog’s comfort comes first.",
  },
  {
    q: "How much does grooming cost, and how do I pay?",
    a: "Ask for a quote. Pricing depends on the service and your dog’s needs. Please confirm the price and accepted payment methods with Cassie before your visit.",
  },
  {
    q: "Where are you located?",
    a: `Cassie works at Buckeye K9 in the Obetz area of Columbus, Ohio. Call or text ${phone} to confirm the exact arrival details and current hours.`,
  },
];
