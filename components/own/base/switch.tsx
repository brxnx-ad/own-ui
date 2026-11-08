"use client";

import { Switch as Primitive } from "@base-ui/react/switch";
import clsx from "clsx";

export type SwitchProps = Primitive.Root.Props;
export type SwitchState = Primitive.Root.State;
export type SwitchChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type SwitchThumbProps = Primitive.Thumb.Props;
export type SwitchThumbState = Primitive.Thumb.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const switchStyles = clsx(
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-gray-bold/70 bg-surface-bold align-middle",
  "[--switch-thumb-size:1rem] [--switch-thumb-inset:0.1875rem]",
  "data-checked:bg-primary-base data-checked:not-data-invalid:not-aria-invalid:border-primary-base",
  "data-unchecked:hover:not-data-disabled:not-data-readonly:bg-surface-soft data-checked:hover:not-data-disabled:not-data-readonly:bg-primary-bold",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
  "data-invalid:border-error-base data-invalid:focus-visible:outline-error-base aria-invalid:border-error-base aria-invalid:focus-visible:outline-error-base",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:not-data-disabled:cursor-default",
  "motion-safe:transition-colors motion-safe:duration-150",
  "forced-colors:forced-color-adjust-none forced-colors:border-[CanvasText]! forced-colors:bg-[Canvas]! forced-colors:focus-visible:outline-[Highlight]!",
  "forced-colors:data-checked:not-data-disabled:bg-[Highlight]! forced-colors:data-disabled:border-[GrayText]! forced-colors:data-disabled:opacity-100",
);

const thumbStyles = clsx(
  "pointer-events-none absolute top-1/2 size-(--switch-thumb-size) -translate-y-1/2 rounded-full bg-gray-bold shadow-s",
  "[inset-inline-start:var(--switch-thumb-inset)] data-checked:[inset-inline-start:calc(100%_-_var(--switch-thumb-size)_-_var(--switch-thumb-inset))]",
  "data-checked:bg-surface-bold dark:data-checked:bg-gray-bold",
  "motion-safe:transition-[inset-inline-start,background-color] motion-safe:duration-150 motion-safe:ease-out",
  "forced-colors:bg-[CanvasText]! forced-colors:data-checked:not-data-disabled:bg-[HighlightText]! forced-colors:data-disabled:bg-[GrayText]!",
);

export function Switch({ className, ...props }: SwitchProps) {
  return <Primitive.Root data-slot="switch" className={classes(switchStyles, className)} {...props} />;
}

export function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  return <Primitive.Thumb data-slot="switch-thumb" aria-hidden="true" className={classes(thumbStyles, className)} {...props} />;
}
