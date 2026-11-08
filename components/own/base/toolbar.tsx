"use client";

import { Toolbar as Primitive } from "@base-ui/react/toolbar";
import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export type ToolbarProps = Primitive.Root.Props;
export type ToolbarState = Primitive.Root.State;
export type ToolbarOrientation = Primitive.Root.Orientation;
export type ToolbarGroupProps = Primitive.Group.Props;
export type ToolbarGroupState = Primitive.Group.State;
export type ToolbarButtonProps = Primitive.Button.Props;
export type ToolbarButtonState = Primitive.Button.State;
export type ToolbarInputProps = Primitive.Input.Props;
export type ToolbarInputState = Primitive.Input.State;
export type ToolbarLinkProps = Primitive.Link.Props;
export type ToolbarLinkState = Primitive.Link.State;
export type ToolbarSeparatorProps = Primitive.Separator.Props;
export type ToolbarSeparatorState = Primitive.Separator.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const layoutStyles = clsx(
  "inline-flex min-w-0 max-w-full flex-wrap items-center",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:flex-nowrap data-[orientation=vertical]:items-stretch",
);

const controlStyles = clsx(
  "inline-flex min-h-9 min-w-9 max-w-full shrink-0 items-center justify-center gap-1.5 rounded-base px-2.5 py-1 text-center text-sm font-medium wrap-anywhere text-gray-bold",
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
  "motion-safe:transition-colors motion-safe:duration-150",
);

const inputStyles = clsx(
  "min-h-9 w-44 min-w-0 max-w-full rounded-base border border-gray-base bg-surface-bold px-2.5 py-1 text-base text-gray-bold placeholder:text-gray-bold/60 sm:text-sm",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
  "aria-invalid:border-error-base aria-invalid:focus-visible:outline-error-base",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 forced-colors:data-disabled:opacity-100 forced-colors:data-disabled:text-[GrayText]",
);

const separatorStyles = clsx(
  "block shrink-0 border-0 bg-gray-base",
  "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
  "data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[CanvasText]",
);

export function Toolbar({ className, ...props }: ToolbarProps) {
  return <Primitive.Root data-slot="toolbar" className={classes(clsx(layoutStyles, "gap-2 rounded-base border border-gray-base bg-surface-base p-2 shadow-s"), className)} {...props} />;
}

export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return <Primitive.Group data-slot="toolbar-group" className={classes(clsx(layoutStyles, "gap-1.5"), className)} {...props} />;
}

export function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <Primitive.Button
      data-slot="toolbar-button"
      className={classes(clsx(
        controlStyles,
        "cursor-pointer hover:not-data-disabled:bg-surface-bold data-popup-open:bg-surface-bold data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "forced-colors:data-disabled:opacity-100 forced-colors:data-disabled:text-[GrayText]",
      ), className)}
      {...props}
    />
  );
}

export function ToolbarInput({ className, render, ...props }: ToolbarInputProps) {
  return (
    <Primitive.Input
      data-slot="toolbar-input"
      className={classes(inputStyles, className)}
      render={render ?? ((inputProps, state) => (
        <input
          {...(inputProps as ComponentPropsWithRef<"input">)}
          disabled={state.disabled && !state.focusable}
          readOnly={props.readOnly || state.disabled}
        />
      ))}
      {...props}
    />
  );
}

export function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  return (
    <Primitive.Link
      data-slot="toolbar-link"
      className={classes(clsx(controlStyles, "underline decoration-gray-bold/60 underline-offset-4 hover:bg-surface-bold"), className)}
      {...props}
    />
  );
}

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return <Primitive.Separator data-slot="toolbar-separator" className={classes(separatorStyles, className)} {...props} />;
}
