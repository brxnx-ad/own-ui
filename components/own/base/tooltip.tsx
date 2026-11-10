"use client";

import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import clsx from "@/components/own/classes";
import styles from "./tooltip.module.css";

export const Tooltip = Primitive.Root;
export const TooltipProvider = Primitive.Provider;
export const createTooltipHandle = Primitive.createHandle;
export type TooltipHandle<Payload = unknown> = Primitive.Handle<Payload>;
export type TooltipProviderProps = Primitive.Provider.Props;
export type TooltipProviderState = Primitive.Provider.State;
export type TooltipProps<Payload = unknown> = Primitive.Root.Props<Payload>;
export type TooltipState = Primitive.Root.State;
export type TooltipActions = Primitive.Root.Actions;
export type TooltipChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type TooltipChangeEventReason = Primitive.Root.ChangeEventReason;
export type TooltipTriggerProps<Payload = unknown> = Primitive.Trigger.Props<Payload>;
export type TooltipTriggerState = Primitive.Trigger.State;
export type TooltipPortalProps = Primitive.Portal.Props;
export type TooltipPortalState = Primitive.Portal.State;
export type TooltipPositionerProps = Primitive.Positioner.Props;
export type TooltipPositionerState = Primitive.Positioner.State;
export type TooltipPopupProps = Primitive.Popup.Props;
export type TooltipPopupState = Primitive.Popup.State;
export type TooltipArrowProps = Primitive.Arrow.Props;
export type TooltipArrowState = Primitive.Arrow.State;
export type TooltipViewportProps = Primitive.Viewport.Props;
export type TooltipViewportState = Primitive.Viewport.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const positionerStyles = clsx(
  "z-50 max-w-(--available-width) data-anchor-hidden:invisible",
  "has-[>[data-slot=tooltip-popup]>[data-slot=tooltip-viewport]]:w-(--positioner-width)",
  "has-[>[data-slot=tooltip-popup]>[data-slot=tooltip-viewport]]:h-(--positioner-height)",
);

const popupStyles = clsx(
  styles.popup,
  "body-sm relative max-h-(--available-height) w-fit min-w-0 max-w-[min(20rem,var(--available-width))] overflow-hidden wrap-anywhere rounded-base",
  "origin-(--transform-origin) border border-gray-base bg-surface-base px-3 py-1.5 text-content-bold shadow-m outline-none",
  "has-[>[data-slot=tooltip-viewport]]:w-(--popup-width) has-[>[data-slot=tooltip-viewport]]:h-(--popup-height)",
  "has-[>[data-slot=tooltip-arrow]]:overflow-visible",
);

const arrowStyles = clsx(
  "pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-uncentered:invisible",
  "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135",
  "data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45",
  "data-[side=inline-start]:-inset-e-1 data-[side=inline-start]:rotate-135",
  "data-[side=inline-end]:-inset-s-1 data-[side=inline-end]:-rotate-45",
);

const viewportStyles = clsx(
  styles.viewport,
  "relative min-w-0 overflow-hidden ",
);

export function TooltipTrigger<Payload>(props: TooltipTriggerProps<Payload>) {
  return <Primitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipPortal(props: TooltipPortalProps) {
  return <Primitive.Portal data-slot="tooltip-portal" {...props} />;
}

export function TooltipPositioner({
  className,
  sideOffset = 8,
  ...props
}: TooltipPositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="tooltip-positioner"
      sideOffset={sideOffset}
      className={classes(positionerStyles, className)}
      {...props}
    />
  );
}

export function TooltipPopup({ className, ...props }: TooltipPopupProps) {
  return (
    <Primitive.Popup
      data-slot="tooltip-popup"
      className={classes(popupStyles, className)}
      {...props}
    />
  );
}

export function TooltipArrow({ className, ...props }: TooltipArrowProps) {
  return (
    <Primitive.Arrow
      data-slot="tooltip-arrow"
      className={classes(arrowStyles, className)}
      {...props}
    />
  );
}

export function TooltipViewport({ className, ...props }: TooltipViewportProps) {
  return (
    <Primitive.Viewport
      data-slot="tooltip-viewport"
      className={classes(viewportStyles, className)}
      {...props}
    />
  );
}
