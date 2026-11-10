"use client";

import { OTPField as Primitive } from "@base-ui/react/otp-field";
import clsx from "@/components/own/classes";

export type OTPFieldProps = Primitive.Root.Props;
export type OTPFieldState = Primitive.Root.State;
export type OTPFieldValidationType = Primitive.Root.ValidationType;
export type OTPFieldChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type OTPFieldInvalidEventDetails = Primitive.Root.InvalidEventDetails;
export type OTPFieldCompleteEventDetails = Primitive.Root.CompleteEventDetails;
export type OTPFieldInputProps = Primitive.Input.Props;
export type OTPFieldInputState = Primitive.Input.State;
export type OTPFieldSeparatorProps = Primitive.Separator.Props;
export type OTPFieldSeparatorState = Primitive.Separator.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const inputStyles = clsx(
  "h-10 w-7 shrink-0 rounded-base border border-gray-base bg-surface-bold sm:size-11",
  "text-center text-base font-medium text-content-bold tabular-nums",
  "placeholder:text-content-soft focus:placeholder:opacity-0",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-primary-base",
  "data-filled:not-data-invalid:not-aria-invalid:border-gray-bold/30",
  "data-invalid:border-error-base data-invalid:focus-visible:ring-error-base",
  "aria-invalid:border-error-base aria-invalid:focus-visible:ring-error-base",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const separatorStyles = clsx(
  "shrink-0 rounded-full bg-gray-bold/45",
  "data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-1.5 sm:data-[orientation=horizontal]:w-2",
  "data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-0.5",
);

export function OTPField({ className, ...props }: OTPFieldProps) {
  return (
    <Primitive.Root
      data-slot="otp-field"
      className={classes("flex w-fit max-w-full flex-wrap items-center gap-1 sm:gap-2", className)}
      {...props}
    />
  );
}

export function OTPFieldInput({ className, ...props }: OTPFieldInputProps) {
  return (
    <Primitive.Input
      data-slot="otp-field-input"
      className={classes(inputStyles, className)}
      {...props}
    />
  );
}

export function OTPFieldSeparator({ className, ...props }: OTPFieldSeparatorProps) {
  return (
    <Primitive.Separator
      data-slot="otp-field-separator"
      className={classes(separatorStyles, className)}
      {...props}
    />
  );
}
