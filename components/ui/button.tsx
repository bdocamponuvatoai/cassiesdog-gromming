import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
const variants = cva("button", {
  variants: {
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      ghost: "button-ghost",
      call: "button-call",
    },
  },
  defaultVariants: { variant: "primary" },
});
export function Button({
  className,
  variant,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof variants>) {
  return <button className={cn(variants({ variant }), className)} {...props} />;
}
export function ButtonLink({
  className,
  variant,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof variants>) {
  return <Link className={cn(variants({ variant }), className)} {...props} />;
}
