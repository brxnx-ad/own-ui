"use client";

import { Toggle as Primitive } from "@base-ui/react/toggle";
import clsx from "@/components/own/classes";

export type ToggleVariant = "outline" | "ghost";
export type ToggleSize = "sm" | "md" | "lg";
export type ToggleState = Primitive.State;
export type ToggleChangeEventDetails = Primitive.ChangeEventDetails;

export interface ToggleProps<Value extends string = string> extends Primitive.Props<Value> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  iconOnly?: boolean;
}

const variantStyles: Record<ToggleVariant, string> = {
  outline: "border-gray-base",
  ghost: "border-transparent",
};

const sizeStyles: Record<ToggleSize, { label: string; icon: string }> = {
  sm: { label: "min-h-8 gap-1.5 px-3 py-1 text-xs", icon: "size-8 text-xs" },
  md: { label: "min-h-10 gap-2 px-4 py-1.5 text-sm", icon: "size-10 text-sm" },
  lg: { label: "min-h-12 gap-2.5 px-6 py-2 text-base", icon: "size-12 text-base" },
};

const toggleStyles = clsx(
  "inline-flex min-w-0 max-w-full shrink-0 cursor-pointer items-center justify-center rounded-base border bg-transparent text-center font-medium wrap-anywhere text-content-bold select-none",
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  "hover:not-data-disabled:not-data-pressed:bg-surface-bold data-pressed:border-primary-base data-pressed:bg-primary-soft data-pressed:shadow-inset-s",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold data-disabled:cursor-not-allowed data-disabled:opacity-50",
  "motion-safe:transition-[background-color,border-color,color,box-shadow,scale] motion-safe:duration-150 motion-safe:ease-out motion-safe:active:not-data-disabled:scale-[0.98]",
  "forced-colors:forced-color-adjust-none forced-colors:border-[CanvasText]! forced-colors:bg-[Canvas]! forced-colors:text-[CanvasText]! forced-colors:focus-visible:outline-[CanvasText]",
  "forced-colors:data-pressed:border-[Highlight]! forced-colors:data-pressed:bg-[Highlight]! forced-colors:data-pressed:text-[HighlightText]!",
  "forced-colors:data-disabled:opacity-100 forced-colors:data-disabled:not-data-pressed:border-[GrayText]! forced-colors:data-disabled:not-data-pressed:text-[GrayText]!",
);

export function Toggle<Value extends string>({ className, variant = "outline", size = "md", iconOnly = false, ...props }: ToggleProps<Value>) {
  const base = clsx(toggleStyles, variantStyles[variant], sizeStyles[size][iconOnly ? "icon" : "label"]);

  return (
    <Primitive<Value>
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? "" : undefined}
      className={typeof className === "function" ? (state) => clsx(base, className(state)) : clsx(base, className)}
      {...props}
    />
  );
}
