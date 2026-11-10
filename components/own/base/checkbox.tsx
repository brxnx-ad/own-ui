"use client";

import { Checkbox as Primitive } from "@base-ui/react/checkbox";
import clsx from "@/components/own/classes";
import { Check, Minus } from "@/components/own/icons";

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Checkbox({ className, ...props }: Primitive.Root.Props) {
  return (
    <Primitive.Root
      data-slot="checkbox"
      className={classes(
        clsx(
          "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[calc(var(--radius)/3)] border border-gray-bold/70 bg-surface-bold align-middle",
          "data-checked:border-primary-base data-checked:bg-primary-base data-indeterminate:border-primary-base data-indeterminate:bg-primary-base",
          "data-unchecked:hover:not-data-disabled:not-data-readonly:bg-surface-soft",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
          "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:not-data-disabled:cursor-default",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function CheckboxIndicator({
  className,
  children,
  ...props
}: Primitive.Indicator.Props) {
  return (
    <Primitive.Indicator
      data-slot="checkbox-indicator"
      aria-hidden="true"
      className={classes(
        clsx(
          "group/checkbox-indicator flex size-full items-center justify-center text-white",
          "motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 data-unchecked:opacity-0",
        ),
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <Check className="size-3.5 group-data-indeterminate/checkbox-indicator:hidden" />
          <Minus className="hidden size-3.5 group-data-indeterminate/checkbox-indicator:block" />
        </>
      )}
    </Primitive.Indicator>
  );
}
