"use client";

import { Slider as Primitive } from "@base-ui/react/slider";
import clsx from "@/components/own/classes";

export type SliderProps<Value extends number | readonly number[] = number | readonly number[]> = Primitive.Root.Props<Value>;
export type SliderState = Primitive.Root.State;
export type SliderChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type SliderCommitEventDetails = Primitive.Root.CommitEventDetails;
export type SliderLabelProps = Primitive.Label.Props;
export type SliderValueProps = Primitive.Value.Props;
export type SliderControlProps = Primitive.Control.Props;
export type SliderTrackProps = Primitive.Track.Props;
export type SliderIndicatorProps = Primitive.Indicator.Props;
export type SliderThumbProps = Primitive.Thumb.Props;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const controlStyles = clsx(
  "col-span-full flex items-center justify-center select-none",
  "data-[orientation=horizontal]:h-10 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:touch-pan-y",
  "data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-10 data-[orientation=vertical]:touch-pan-x data-[orientation=vertical]:justify-self-center",
  "cursor-pointer data-dragging:cursor-grabbing data-disabled:cursor-not-allowed data-disabled:opacity-50 forced-colors:data-disabled:opacity-100",
);

const trackStyles = clsx(
  "rounded-full bg-gray-base shadow-inset-s",
  "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
  "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[CanvasText] forced-colors:data-disabled:bg-[GrayText]",
);

const indicatorStyles = clsx(
  "pointer-events-none rounded-full bg-primary-base data-invalid:bg-error-base",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[Highlight]! forced-colors:data-disabled:bg-[GrayText]!",
);

const thumbStyles = clsx(
  "size-6 rounded-full border-2 border-primary-base bg-surface-bold shadow-s",
  "cursor-grab data-dragging:cursor-grabbing has-disabled:cursor-not-allowed has-disabled:border-gray-bold/50",
  "data-invalid:border-error-base",
  "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gray-bold",
  "forced-colors:forced-color-adjust-none forced-colors:border-[CanvasText]! forced-colors:bg-[Canvas] forced-colors:has-disabled:border-[GrayText]! forced-colors:has-focus-visible:outline-[Highlight]",
);

export function Slider<Value extends number | readonly number[]>({ className, ...props }: SliderProps<Value>) {
  return (
    <Primitive.Root<Value>
      data-slot="slider"
      className={classes("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1", className)}
      {...props}
    />
  );
}

export function SliderLabel({ className, ...props }: SliderLabelProps) {
  return (
    <Primitive.Label
      data-slot="slider-label"
      className={classes("body-sm min-w-0 wrap-anywhere font-medium text-content-bold", className)}
      {...props}
    />
  );
}

export function SliderValue({ className, ...props }: SliderValueProps) {
  return (
    <Primitive.Value
      data-slot="slider-value"
      className={classes("body-sm col-start-2 min-w-0 wrap-anywhere text-end font-medium text-content-base tabular-nums", className)}
      {...props}
    />
  );
}

export function SliderControl({ className, ...props }: SliderControlProps) {
  return <Primitive.Control data-slot="slider-control" className={classes(controlStyles, className)} {...props} />;
}

export function SliderTrack({ className, ...props }: SliderTrackProps) {
  return <Primitive.Track data-slot="slider-track" className={classes(trackStyles, className)} {...props} />;
}

export function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return <Primitive.Indicator data-slot="slider-indicator" className={classes(indicatorStyles, className)} {...props} />;
}

export function SliderThumb({ className, ...props }: SliderThumbProps) {
  return <Primitive.Thumb data-slot="slider-thumb" className={classes(thumbStyles, className)} {...props} />;
}
