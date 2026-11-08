"use client";

import { Meter as Primitive } from "@base-ui/react/meter";
import clsx from "clsx";

export type MeterProps = Primitive.Root.Props;
export type MeterState = Primitive.Root.State;
export type MeterLabelProps = Primitive.Label.Props;
export type MeterLabelState = Primitive.Label.State;
export type MeterValueProps = Primitive.Value.Props;
export type MeterValueState = Primitive.Value.State;
export type MeterTrackProps = Primitive.Track.Props;
export type MeterTrackState = Primitive.Track.State;
export type MeterIndicatorProps = Primitive.Indicator.Props;
export type MeterIndicatorState = Primitive.Indicator.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Meter({ className, ...props }: MeterProps) {
  return (
    <Primitive.Root
      data-slot="meter"
      className={classes(
        "grid w-full min-w-0 grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2",
        className,
      )}
      {...props}
    />
  );
}

export function MeterLabel({ className, ...props }: MeterLabelProps) {
  return (
    <Primitive.Label
      data-slot="meter-label"
      className={classes("body-sm min-w-0 font-medium text-gray-bold", className)}
      {...props}
    />
  );
}

export function MeterValue({ className, ...props }: MeterValueProps) {
  return (
    <Primitive.Value
      data-slot="meter-value"
      className={classes(
        "body-sm col-start-2 justify-self-end text-right font-medium text-gray-bold/75 tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export function MeterTrack({ className, ...props }: MeterTrackProps) {
  return (
    <Primitive.Track
      data-slot="meter-track"
      className={classes(
        "col-span-full h-2.5 w-full overflow-hidden rounded-base border border-gray-base bg-surface-soft shadow-inset-s",
        className,
      )}
      {...props}
    />
  );
}

export function MeterIndicator({ className, ...props }: MeterIndicatorProps) {
  return (
    <Primitive.Indicator
      data-slot="meter-indicator"
      className={classes(
        "block h-full bg-primary-base motion-safe:transition-[width,background-color] motion-safe:duration-150 motion-safe:ease-out",
        className,
      )}
      {...props}
    />
  );
}
