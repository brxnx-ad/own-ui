"use client";

import { Fieldset as Primitive } from "@base-ui/react/fieldset";
import clsx from "@/components/own/classes";

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Fieldset({ className, ...props }: Primitive.Root.Props) {
  return (
    <Primitive.Root
      data-slot="fieldset"
      className={classes("flex min-w-0 flex-col gap-4", className)}
      {...props}
    />
  );
}

export function FieldsetLegend({ className, ...props }: Primitive.Legend.Props) {
  return (
    <Primitive.Legend
      data-slot="fieldset-legend"
      className={classes("h5 border-b border-gray-base pb-2 text-content-bold data-disabled:text-content-soft", className)}
      {...props}
    />
  );
}
