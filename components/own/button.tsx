"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";
import { Spinner } from "@/components/own/spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "border border-transparent bg-primary-base text-white",
    "hover:bg-primary-bold",
    "active:bg-primary-bold"
  ),
  secondary: clsx(
    "border border-gray-base bg-surface-base text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  outline: clsx(
    "border border-gray-base bg-transparent text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  ghost: clsx(
    "border border-transparent bg-transparent text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  destructive: clsx(
    "border border-error-base bg-error-soft text-error-bold",
    "hover:border-error-base hover:bg-error-base hover:text-white",
    "active:border-error-base active:bg-error-base active:text-white"
  ),
};

const sizeStyles: Record<ButtonSize, { default: string; iconOnly: string }> = {
  sm: {
    default: "h-8 px-3 gap-1.5 text-xs",
    iconOnly: "size-8 px-0 text-xs",
  },
  md: {
    default: "h-10 px-4 gap-2 text-sm",
    iconOnly: "size-10 px-0 text-sm",
  },
  lg: {
    default: "h-12 px-6 gap-2.5 text-base",
    iconOnly: "size-12 px-0 text-base",
  },
};

export interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "start",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const isIconOnly = !children && Boolean(icon || loading);
  const hasIconSlot = Boolean(icon || loading);

  const iconNode = hasIconSlot ? (
    <span
      data-slot="button-icon"
      className="inline-flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-[1.15em]"
    >
      {loading ? <Spinner className="size-[1.15em]" /> : icon}
    </span>
  ) : null;

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={clsx(
        // Estructura base y geometría vinculada a --radius
        "inline-flex shrink-0 items-center justify-center rounded-base font-medium whitespace-nowrap select-none outline-none",
        // Transiciones y feedback físico en estado active/pressed
        "transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-150 ease-out",
        "motion-safe:active:not-disabled:scale-[0.98]",
        // Foco accesible
        "focus-visible:ring-2 focus-visible:ring-primary-base data-[variant=destructive]:focus-visible:ring-error-base focus-visible:ring-offset-2 focus-visible:ring-offset-surface-soft",
        // Estados disabled y loading
        "disabled:pointer-events-none disabled:opacity-50 data-loading:cursor-wait",
        // Variante y tamaño proporcional
        variantStyles[variant],
        isIconOnly ? sizeStyles[size].iconOnly : sizeStyles[size].default,
        className
      )}
      {...props}
    >
      {iconPosition === "start" && iconNode}
      {children}
      {iconPosition === "end" && !isIconOnly && iconNode}
    </ButtonPrimitive>
  );
}
