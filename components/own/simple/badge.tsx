import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "destructive"
  | "outline";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "border-primary-base bg-primary-soft",
  secondary: "border-gray-base bg-surface-bold",
  info: "border-info-base bg-info-soft",
  success: "border-success-base bg-success-soft",
  warning: "border-warning-base bg-warning-soft",
  destructive: "border-error-base bg-error-soft",
  outline: "border-gray-base bg-transparent",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={clsx(
        "caption inline-flex max-w-full items-center gap-1 rounded-base border px-2 py-0.5 wrap-anywhere text-gray-bold",
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
