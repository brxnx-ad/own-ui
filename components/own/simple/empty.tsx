import clsx from "@/components/own/classes";
import type { ComponentPropsWithRef } from "react";

export type EmptyMediaVariant = "default" | "icon";
export type EmptyBorder = "dashed" | "solid" | "none";
export type EmptyBackground = "soft" | "base" | "bold" | "none";

export interface EmptyProps extends ComponentPropsWithRef<"div"> {
  border?: EmptyBorder;
  background?: EmptyBackground;
}

export interface EmptyMediaProps extends ComponentPropsWithRef<"div"> {
  variant?: EmptyMediaVariant;
}

export interface EmptyTitleProps extends ComponentPropsWithRef<"h2"> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

const mediaVariantStyles: Record<EmptyMediaVariant, string> = {
  default: "",
  icon: "size-10 rounded-base border border-gray-base bg-surface-bold [&_svg:not([class*='size-'])]:size-[1.15em]",
};

const borderStyles: Record<EmptyBorder, string> = {
  dashed: "border border-dashed border-gray-base",
  solid: "border border-solid border-gray-base",
  none: "",
};

const backgroundStyles: Record<EmptyBackground, string> = {
  soft: "bg-surface-soft",
  base: "bg-surface-base",
  bold: "bg-surface-bold",
  none: "",
};

export function Empty({ className, border = "dashed", background = "base", ...props }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={clsx(
        "flex min-w-0 flex-col items-center gap-4 rounded-base p-6 text-center text-content-bold",
        borderStyles[border],
        backgroundStyles[background],
        className,
      )}
      {...props}
    />
  );
}

export function EmptyHeader({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={clsx("flex min-w-0 max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

export function EmptyMedia({ className, variant = "default", ...props }: EmptyMediaProps) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={clsx("flex max-w-full items-center justify-center", mediaVariantStyles[variant], className)}
      {...props}
    />
  );
}

export function EmptyTitle({ as: Heading = "h2", className, ...props }: EmptyTitleProps) {
  return (
    <Heading
      data-slot="empty-title"
      className={clsx("h5 wrap-anywhere", className)}
      {...props}
    />
  );
}

export function EmptyDescription({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={clsx(
        "body-sm wrap-anywhere text-content-base [&_a]:underline [&_a]:underline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyContent({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={clsx("flex min-w-0 max-w-sm flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}
