"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as GroupPrimitive } from "@base-ui/react/radio-group";
import clsx from "@/components/own/classes";

export type RadioGroupProps<Value = unknown> = GroupPrimitive.Props<Value>;
export type RadioGroupState = GroupPrimitive.State;
export type RadioGroupChangeEventDetails = GroupPrimitive.ChangeEventDetails;
export type RadioProps<Value = unknown> = RadioPrimitive.Root.Props<Value>;
export type RadioState = RadioPrimitive.Root.State;
export type RadioIndicatorProps = RadioPrimitive.Indicator.Props;
export type RadioIndicatorState = RadioPrimitive.Indicator.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const radioStyles = clsx(
  "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-bold/70 bg-surface-bold align-middle text-primary-base",
  "data-checked:not-data-invalid:not-aria-invalid:border-primary-base",
  "data-unchecked:hover:not-data-disabled:not-data-readonly:bg-surface-soft",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
  "data-invalid:border-error-base data-invalid:text-error-base data-invalid:focus-visible:outline-error-base",
  "aria-invalid:border-error-base aria-invalid:text-error-base aria-invalid:focus-visible:outline-error-base",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:not-data-disabled:cursor-default",
);

const indicatorStyles = clsx(
  "block size-2 rounded-full bg-current",
  "motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 data-unchecked:opacity-0",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[Highlight]",
);

export function RadioGroup<Value>({ className, ...props }: RadioGroupProps<Value>) {
  return (
    <GroupPrimitive<Value>
      data-slot="radio-group"
      className={classes("grid min-w-0 gap-2.5", className)}
      {...props}
    />
  );
}

export function Radio<Value>({ className, ...props }: RadioProps<Value>) {
  return (
    <RadioPrimitive.Root<Value>
      data-slot="radio"
      className={classes(radioStyles, className)}
      {...props}
    />
  );
}

export function RadioIndicator({ className, ...props }: RadioIndicatorProps) {
  return (
    <RadioPrimitive.Indicator
      data-slot="radio-indicator"
      aria-hidden="true"
      className={classes(indicatorStyles, className)}
      {...props}
    />
  );
}
