"use client";

import { Accordion as Primitive } from "@base-ui/react/accordion";
import { Chevron } from "@/components/own/icons";
import clsx from "clsx";
import styles from "./accordion.module.css";

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Accordion<Value>(props: Primitive.Root.Props<Value>) {
  return <Primitive.Root data-slot="accordion" {...props} />;
}

export function AccordionItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="accordion-item"
      className={classes(
        "border-b border-gray-base last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionHeader({
  className,
  ...props
}: Primitive.Header.Props) {
  return (
    <Primitive.Header
      data-slot="accordion-header"
      className={className}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      data-slot="accordion-trigger"
      className={classes(
        "group relative isolate flex w-full items-center justify-between gap-4 rounded-base px-4 py-4 text-left text-sm font-semibold text-gray-bold outline-none focus-visible:ring-2 focus-visible:ring-primary-base disabled:cursor-not-allowed disabled:opacity-50 " +
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-surface-soft before:opacity-0 before:transition-opacity before:duration-150 before:content-[''] hover:not-data-disabled:before:opacity-100 motion-reduce:before:transition-none dark:before:bg-surface-bold",
        className,
      )}
      {...props}
    >
      {children}
      <Chevron
        aria-hidden="true"
        className={clsx(styles.chevron, "size-4 shrink-0")}
      />
    </Primitive.Trigger>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: Primitive.Panel.Props) {
  return (
    <Primitive.Panel
      data-slot="accordion-panel"
      className={classes(
        clsx(styles.panel, "overflow-hidden text-sm text-gray-bold/75"),
        className,
      )}
      {...props}
    >
      <div className="px-4 pb-4">{children}</div>
    </Primitive.Panel>
  );
}
