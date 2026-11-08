"use client";

import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import { Field, FieldLabel } from "@/components/own/base/field";
import { Input, type InputProps } from "@/components/own/base/input";
import styles from "./floating-input.module.css";

export type FloatingInputVariant = "inset" | "outline";
export type FloatingInputType = "text" | "search" | "email" | "password" | "tel" | "url";
export type FloatingInputFieldProps = Omit<
  ComponentProps<typeof Field>,
  "children" | "disabled" | "name" | "render"
>;

export interface FloatingInputProps extends Omit<InputProps, "children" | "placeholder" | "render" | "type"> {
  label: string;
  variant?: FloatingInputVariant;
  type?: FloatingInputType;
  fieldProps?: FloatingInputFieldProps;
  children?: ReactNode;
}

const controlStyles: Record<FloatingInputVariant, string> = {
  inset: "min-h-14 pt-6!",
  outline: "min-h-12 border-transparent! px-[calc(var(--floating-input-label-inset)-1px)]! focus-visible:ring-0!",
};

export function FloatingInput({
  label,
  variant = "inset",
  type = "text",
  name,
  disabled,
  fieldProps,
  children,
  className,
  ...props
}: FloatingInputProps) {
  const inputClassName = clsx("peer/floating-input block", controlStyles[variant]);

  return (
    <Field {...fieldProps} name={name} disabled={disabled} data-floating-input="" data-variant={variant}>
      <div
        data-slot="floating-input-control"
        className={clsx(
          styles.control,
          "relative sm:[--floating-input-rest-font-size:var(--text-sm)]",
          variant === "outline" && "pt-2",
        )}
      >
        <Input
          {...props}
          type={type}
          placeholder=" "
          className={typeof className === "function"
            ? (state) => clsx(inputClassName, className(state))
            : clsx(inputClassName, className)}
        />
        {variant === "outline" && (
          <fieldset
            aria-hidden="true"
            data-slot="floating-input-border"
            className={clsx(
              styles.border,
              "pointer-events-none absolute inset-x-0 top-2 bottom-0 min-w-0 rounded-base peer-disabled/floating-input:opacity-50",
            )}
          >
            <legend className="relative h-0">
              <span className="invisible block truncate px-1 text-xs leading-4 font-medium">{label}</span>
            </legend>
          </fieldset>
        )}
        <FieldLabel className={clsx(
          "absolute cursor-text",
          "peer-aria-invalid/floating-input:text-error-bold peer-disabled/floating-input:cursor-not-allowed",
        )}>
          <span className="block truncate font-medium tracking-normal">{label}</span>
        </FieldLabel>
      </div>
      {children}
    </Field>
  );
}
