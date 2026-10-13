import type { Tint } from "./site";

export type Photo = {
  /** Caption shown in the gallery or on the fallback panel. */
  label: string;
  /** Replacement text for the configured visual. */
  alt: string;
  /** Path under /public. Null shows a labeled placeholder. */
  src: string | null;
};

export const photos = {
  cassieWithDog: {
    label: "A warm hello from the grooming chair",
    alt: "Editorial illustration of a caring groomer beside a happy cream doodle",
    src: "/images/caring-groomer.webp",
  },
  cassieStation: {
    label: "Gentle care at the grooming station",
    alt: "Editorial illustration of a schnauzer being gently brushed at a grooming station",
    src: "/images/gentle-grooming.webp",
  },
  homeBath: {
    label: "Freshly bathed & cuddle-ready",
    alt: "Editorial illustration of a freshly bathed spaniel wrapped in a mint towel",
    src: "/images/fresh-bath.webp",
  },
  homeHaircut: {
    label: "A fresh little haircut",
    alt: "Editorial illustration of a freshly groomed terrier in a yellow bandana",
    src: "/images/fresh-trim.webp",
  },
  peteBefore: {
    label: "Before the brush",
    alt: "Editorial illustration of a small brown dog with a long tousled coat",
    src: "/images/spa-story-before.webp",
  },
  peteAfter: {
    label: "Freshly fluffed",
    alt: "Editorial illustration of the same small brown dog with a tidy rounded trim",
    src: "/images/spa-story-after.webp",
  },
  galleryBath: {
    label: "Freshly bathed & ready for cuddles",
    alt: "Editorial illustration of a freshly bathed spaniel wrapped in a mint towel",
    src: "/images/fresh-bath.webp",
  },
  galleryHaircut: {
    label: "A fresh haircut, a happy little face",
    alt: "Editorial illustration of a freshly groomed terrier in a yellow bandana",
    src: "/images/fresh-trim.webp",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/** Gallery grid. The before/after pair already appears in the slider above it. */
export const gallery: { photo: PhotoId; color: Tint }[] = [
  { photo: "galleryBath", color: "mint" },
  { photo: "galleryHaircut", color: "yellow" },
  { photo: "cassieStation", color: "blue" },
  { photo: "cassieWithDog", color: "pink" },
];
