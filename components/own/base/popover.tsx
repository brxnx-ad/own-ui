"use client";

import { Popover as Primitive } from "@base-ui/react/popover";
import clsx from "clsx";
import styles from "./popover.module.css";

export const Popover = Primitive.Root;
export const createPopoverHandle = Primitive.createHandle;
export type PopoverHandle<Payload = unknown> = Primitive.Handle<Payload>;
export type PopoverProps<Payload = unknown> = Primitive.Root.Props<Payload>;
export type PopoverActions = Primitive.Root.Actions;
export type PopoverChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type PopoverTriggerProps<Payload = unknown> = Primitive.Trigger.Props<Payload>;
export type PopoverPortalProps = Primitive.Portal.Props;
export type PopoverBackdropProps = Primitive.Backdrop.Props;
export type PopoverPositionerProps = Primitive.Positioner.Props;
export type PopoverPopupProps = Primitive.Popup.Props;
export type PopoverViewportProps = Primitive.Viewport.Props;
export type PopoverTitleProps = Primitive.Title.Props;
export type PopoverDescriptionProps = Primitive.Description.Props;
export type PopoverCloseProps = Primitive.Close.Props;

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
  "has-[>[data-slot=popover-popup]>[data-slot=popover-viewport]]:w-(--positioner-width)",
  "has-[>[data-slot=popover-popup]>[data-slot=popover-viewport]]:h-(--positioner-height)",
);

const popupStyles = clsx(
  styles.popup,
  "relative flex max-h-(--available-height) w-80 min-w-0 max-w-(--available-width) flex-col gap-2",
  "origin-(--transform-origin) overflow-y-auto overscroll-contain rounded-base border border-gray-base bg-surface-base p-4 text-gray-bold shadow-m outline-hidden focus-visible:ring-2 focus-visible:ring-primary-base",
  "has-[>[data-slot=popover-viewport]]:h-(--popup-height)",
);

const viewportStyles = clsx(
  styles.viewport,
  "relative min-h-0 min-w-0 overflow-y-auto overscroll-contain data-transitioning:overflow-hidden",
  "",
);

export function PopoverTrigger<Payload>(props: PopoverTriggerProps<Payload>) {
  return <Primitive.Trigger data-slot="popover-trigger" {...props} />;
}

export function PopoverPortal(props: PopoverPortalProps) {
  return <Primitive.Portal data-slot="popover-portal" {...props} />;
}

export function PopoverBackdrop({ className, ...props }: PopoverBackdropProps) {
  return (
    <Primitive.Backdrop
      data-slot="popover-backdrop"
      className={classes(
        clsx(styles.backdrop, "pointer-events-none fixed inset-0 z-40 bg-gray-bold/40 dark:bg-surface-soft/70"),
        className,
      )}
      {...props}
    />
  );
}

export function PopoverPositioner({
  className,
  sideOffset = 8,
  ...props
}: PopoverPositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="popover-positioner"
      sideOffset={sideOffset}
      className={classes(positionerStyles, className)}
      {...props}
    />
  );
}

export function PopoverPopup({ className, ...props }: PopoverPopupProps) {
  return <Primitive.Popup data-slot="popover-popup" className={classes(popupStyles, className)} {...props} />;
}

export function PopoverViewport({ className, ...props }: PopoverViewportProps) {
  return <Primitive.Viewport data-slot="popover-viewport" className={classes(viewportStyles, className)} {...props} />;
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return <Primitive.Title data-slot="popover-title" className={classes("h4 wrap-anywhere text-gray-bold", className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return <Primitive.Description data-slot="popover-description" className={classes("body-sm wrap-anywhere text-gray-bold/75", className)} {...props} />;
}

export function PopoverClose(props: PopoverCloseProps) {
  return <Primitive.Close data-slot="popover-close" {...props} />;
}
