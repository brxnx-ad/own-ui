"use client";

import { Input as Primitive } from "@base-ui/react/input";
import clsx from "clsx";

export type InputProps = Primitive.Props;
export type InputState = Primitive.State;
export type InputChangeEventDetails = Primitive.ChangeEventDetails;

const inputStyles = clsx(
  "min-h-10 w-full min-w-0 rounded-base border border-gray-base bg-surface-bold px-3 py-2",
  "text-base text-gray-bold placeholder:text-gray-bold/60 sm:text-sm",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-primary-base",
  "aria-invalid:border-error-base aria-invalid:focus-visible:ring-error-base",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50",
);

export function Input({ className, ...props }: InputProps) {
  return (
    <Primitive
      data-slot="input"
      className={typeof className === "function"
        ? (state) => clsx(inputStyles, className(state))
        : clsx(inputStyles, className)}
      {...props}
    />
  );
}
