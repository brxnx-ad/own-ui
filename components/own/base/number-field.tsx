"use client";

import { NumberField as Primitive } from "@base-ui/react/number-field";
import clsx from "@/components/own/classes";
import { Minus, Plus } from "@/components/own/icons";

export type NumberFieldProps = Primitive.Root.Props;
export type NumberFieldState = Primitive.Root.State;
export type NumberFieldChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type NumberFieldCommitEventDetails = Primitive.Root.CommitEventDetails;
export type NumberFieldGroupProps = Primitive.Group.Props;
export type NumberFieldInputProps = Primitive.Input.Props;
export type NumberFieldDecrementProps = Primitive.Decrement.Props;
export type NumberFieldIncrementProps = Primitive.Increment.Props;
export type NumberFieldScrubAreaProps = Primitive.ScrubArea.Props;
export type NumberFieldScrubAreaCursorProps = Primitive.ScrubAreaCursor.Props;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const groupStyles = clsx(
  "flex min-h-10 w-full min-w-0 items-stretch rounded-base border border-gray-base bg-surface-bold",
  "has-focus-visible:ring-2 has-focus-visible:ring-primary-base",
  "has-aria-invalid:border-error-base has-aria-invalid:has-focus-visible:ring-error-base",
  "data-disabled:opacity-50",
);

const inputStyles = clsx(
  "w-full min-w-0 flex-1 rounded-base bg-transparent px-3 py-2",
  "text-center text-base text-content-bold tabular-nums placeholder:text-content-soft focus:placeholder:opacity-0 sm:text-sm",
  "outline-hidden data-disabled:cursor-not-allowed",
);

const stepperStyles = clsx(
  "inline-flex w-10 shrink-0 items-center justify-center border-gray-base bg-surface-base",
  "text-sm font-medium text-content-bold [&_svg:not([class*='size-'])]:size-[1.15em]",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-base",
  "not-aria-disabled:hover:bg-surface-bold not-aria-disabled:active:bg-surface-soft",
  "aria-disabled:cursor-not-allowed aria-disabled:text-content-soft data-readonly:cursor-default",
  "motion-safe:transition-colors motion-safe:duration-150",
);

export function NumberField({ className, ...props }: NumberFieldProps) {
  return (
    <Primitive.Root
      data-slot="number-field"
      className={classes("grid min-w-0 gap-2", className)}
      {...props}
    />
  );
}

export function NumberFieldGroup({ className, ...props }: NumberFieldGroupProps) {
  return (
    <Primitive.Group
      data-slot="number-field-group"
      className={classes(groupStyles, className)}
      {...props}
    />
  );
}

export function NumberFieldInput({ className, ...props }: NumberFieldInputProps) {
  return (
    <Primitive.Input
      data-slot="number-field-input"
      className={classes(inputStyles, className)}
      {...props}
    />
  );
}

export function NumberFieldDecrement({ className, children = <Minus />, ...props }: NumberFieldDecrementProps) {
  return (
    <Primitive.Decrement
      data-slot="number-field-decrement"
      className={classes(clsx(stepperStyles, "rounded-s-base border-e"), className)}
      {...props}
    >
      {children}
    </Primitive.Decrement>
  );
}

export function NumberFieldIncrement({ className, children = <Plus />, ...props }: NumberFieldIncrementProps) {
  return (
    <Primitive.Increment
      data-slot="number-field-increment"
      className={classes(clsx(stepperStyles, "rounded-e-base border-s"), className)}
      {...props}
    >
      {children}
    </Primitive.Increment>
  );
}

export function NumberFieldScrubArea({ className, ...props }: NumberFieldScrubAreaProps) {
  return (
    <Primitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={classes(
        "inline-flex w-fit items-center gap-2 select-none data-readonly:cursor-default data-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export function NumberFieldScrubAreaCursor(props: NumberFieldScrubAreaCursorProps) {
  return (
    <Primitive.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      aria-hidden="true"
      {...props}
    />
  );
}
