"use client";

import { Tabs as Primitive } from "@base-ui/react/tabs";
import clsx from "@/components/own/classes";

export type TabsProps = Primitive.Root.Props;
export type TabsState = Primitive.Root.State;
export type TabsValue = Primitive.Tab.Value;
export type TabsChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type TabsListProps = Primitive.List.Props;
export type TabsListState = Primitive.List.State;
export type TabsTabProps = Primitive.Tab.Props;
export type TabsTabState = Primitive.Tab.State;
export type TabsIndicatorProps = Primitive.Indicator.Props;
export type TabsIndicatorState = Primitive.Indicator.State;
export type TabsPanelProps = Primitive.Panel.Props;
export type TabsPanelState = Primitive.Panel.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const listStyles = clsx(
  "relative flex min-w-0 gap-1 border-gray-base",
  "data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:border-b",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-e",
);

const tabStyles = clsx(
  "inline-flex min-h-10 min-w-0 shrink-0 cursor-pointer items-center justify-center px-3 py-2 text-center text-sm font-medium text-content-base",
  "data-[orientation=horizontal]:rounded-t-base data-[orientation=horizontal]:whitespace-nowrap",
  "data-[orientation=vertical]:justify-start data-[orientation=vertical]:rounded-s-base data-[orientation=vertical]:text-start data-[orientation=vertical]:wrap-anywhere",
  "hover:not-data-disabled:not-data-active:bg-surface-bold data-active:bg-primary-soft data-active:text-content-bold",
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50",
  "motion-safe:transition-colors motion-safe:duration-150",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]! forced-colors:not-data-active:focus-visible:outline-[CanvasText]",
  "forced-colors:data-active:bg-[Highlight]! forced-colors:data-active:text-[HighlightText]! forced-colors:data-active:focus-visible:outline-[HighlightText]",
  "forced-colors:data-disabled:not-data-active:text-[GrayText]! forced-colors:data-disabled:opacity-100",
);

const indicatorStyles = clsx(
  "pointer-events-none absolute rounded-full bg-primary-base",
  "data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:left-(--active-tab-left) data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-(--active-tab-width)",
  "data-[orientation=vertical]:end-0 data-[orientation=vertical]:top-(--active-tab-top) data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-0.5",
  "motion-safe:transition-[left,top,width,height] motion-safe:duration-150 motion-safe:ease-out",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[Highlight]",
);

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <Primitive.Root
      data-slot="tabs"
      className={classes("min-w-0 data-[orientation=vertical]:grid data-[orientation=vertical]:grid-cols-[fit-content(40%)_minmax(0,1fr)] data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-3", className)}
      {...props}
    />
  );
}

export function TabsList({ className, ...props }: TabsListProps) {
  return <Primitive.List data-slot="tabs-list" className={classes(listStyles, className)} {...props} />;
}

export function TabsTab({ className, ...props }: TabsTabProps) {
  return <Primitive.Tab data-slot="tabs-tab" className={classes(tabStyles, className)} {...props} />;
}

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return <Primitive.Indicator data-slot="tabs-indicator" aria-hidden="true" className={classes(indicatorStyles, className)} {...props} />;
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <Primitive.Panel
      data-slot="tabs-panel"
      className={classes("body-sm min-w-0 wrap-anywhere rounded-base p-3 text-content-base focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold sm:p-4 data-[orientation=vertical]:col-start-2 data-[orientation=vertical]:row-start-1", className)}
      {...props}
    />
  );
}
