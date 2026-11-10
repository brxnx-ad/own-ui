"use client";

import { Progress as Primitive } from "@base-ui/react/progress";
import clsx from "@/components/own/classes";
import styles from "./progress.module.css";

export type ProgressProps = Primitive.Root.Props;
export type ProgressState = Primitive.Root.State;
export type ProgressStatus = Primitive.Status;
export type ProgressLabelProps = Primitive.Label.Props;
export type ProgressLabelState = Primitive.Label.State;
export type ProgressValueProps = Primitive.Value.Props;
export type ProgressValueState = Primitive.Value.State;
export type ProgressTrackProps = Primitive.Track.Props;
export type ProgressTrackState = Primitive.Track.State;
export type ProgressIndicatorProps = Primitive.Indicator.Props;
export type ProgressIndicatorState = Primitive.Indicator.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const indicatorStyles = clsx(
  styles.indicator,
  "block h-full max-h-full rounded-full bg-primary-base data-complete:bg-success-base",
  "data-indeterminate:relative data-indeterminate:mx-auto data-indeterminate:w-1/3",
  "motion-safe:transition-[width,background-color] motion-safe:duration-150 motion-safe:ease-out",
  "data-indeterminate:transition-none",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[Highlight]!",
);

export function Progress({ className, ...props }: ProgressProps) {
  return (
    <Primitive.Root
      data-slot="progress"
      className={classes(
        "grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2",
        className,
      )}
      {...props}
    />
  );
}

export function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <Primitive.Label
      data-slot="progress-label"
      className={classes("body-sm min-w-0 wrap-anywhere font-medium text-content-bold", className)}
      {...props}
    />
  );
}

export function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <Primitive.Value
      data-slot="progress-value"
      className={classes(
        "body-sm col-start-2 min-w-0 justify-self-end wrap-anywhere text-end font-medium text-content-base tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export function ProgressTrack({ className, ...props }: ProgressTrackProps) {
  return (
    <Primitive.Track
      data-slot="progress-track"
      className={classes(
        "col-span-full h-2.5 w-full overflow-hidden rounded-base border border-gray-base bg-surface-soft shadow-inset-s",
        className,
      )}
      {...props}
    />
  );
}

export function ProgressIndicator({ className, ...props }: ProgressIndicatorProps) {
  return (
    <Primitive.Indicator
      data-slot="progress-indicator"
      className={classes(indicatorStyles, className)}
      {...props}
    />
  );
}
