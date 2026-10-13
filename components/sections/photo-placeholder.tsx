import Image from "next/image";
import { Camera } from "lucide-react";
import { photos, type PhotoId } from "@/content/photos";
import type { Tint } from "@/content/site";
import { cn } from "@/lib/utils";

/** Renders the configured brand visual, with a labeled fallback when none exists. */
export function PhotoPlaceholder({
  photo: id,
  color = "blue",
  portrait = false,
}: {
  photo: PhotoId;
  color?: Tint;
  portrait?: boolean;
}) {
  const photo = photos[id];

  if (photo.src) {
    return (
      <div
        className={cn("photo-placeholder brand-visual", portrait && "portrait")}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 650px) calc(100vw - 3rem), (max-width: 900px) 46vw, 40vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "photo-placeholder",
        `tint-${color}`,
        portrait && "portrait",
      )}
      role="img"
      aria-label={`Photo placeholder: ${photo.label}`}
    >
      <Camera size={32} aria-hidden="true" />
      <span>{photo.label}</span>
      <small>Real photo coming soon</small>
    </div>
  );
}
