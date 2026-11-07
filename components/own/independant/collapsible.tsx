"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import clsx from "clsx";
import { Chevron } from "@/components/own/icons";

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Collapsible(props: Primitive.Root.Props) {
  return <Primitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleTrigger({ className, children, ...props }: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      data-slot="collapsible-trigger"
      className={classes(
        clsx(
          "group/collapsible-trigger flex w-full items-center justify-between gap-4 rounded-base px-4 py-4 text-left text-sm font-semibold text-gray-bold",
          "hover:not-disabled:not-aria-disabled:bg-surface-bold",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold",
          "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        ),
        className,
      )}
      {...props}
    >
      {children}
      <Chevron className="size-4 shrink-0 group-data-panel-open/collapsible-trigger:rotate-180 motion-safe:transition-transform motion-safe:duration-150" />
    </Primitive.Trigger>
  );
}

export function CollapsiblePanel({ className, children, ...props }: Primitive.Panel.Props) {
  return (
    <Primitive.Panel
      data-slot="collapsible-panel"
      className={classes(
        clsx(
          "h-(--collapsible-panel-height) overflow-hidden text-sm text-gray-bold/75",
          "motion-safe:transition-[height,opacity] motion-safe:duration-150 motion-safe:ease-out",
          "data-starting-style:h-0 data-starting-style:opacity-0 data-ending-style:h-0 data-ending-style:opacity-0",
        ),
        className,
      )}
      {...props}
    >
      <div data-slot="collapsible-panel-content" className="px-4 pb-4">{children}</div>
    </Primitive.Panel>
  );
}
