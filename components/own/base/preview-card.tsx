"use client";

import { PreviewCard as Primitive } from "@base-ui/react/preview-card";
import clsx from "clsx";

export const PreviewCard = Primitive.Root;
export const createPreviewCardHandle = Primitive.createHandle;
export type PreviewCardHandle<Payload = unknown> = Primitive.Handle<Payload>;
export type PreviewCardProps<Payload = unknown> = Primitive.Root.Props<Payload>;
export type PreviewCardActions = Primitive.Root.Actions;
export type PreviewCardChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type PreviewCardTriggerProps<Payload = unknown> = Primitive.Trigger.Props<Payload>;
export type PreviewCardPortalProps = Primitive.Portal.Props;
export type PreviewCardBackdropProps = Primitive.Backdrop.Props;
export type PreviewCardPositionerProps = Primitive.Positioner.Props;
export type PreviewCardPopupProps = Primitive.Popup.Props;
export type PreviewCardViewportProps = Primitive.Viewport.Props;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const triggerStyles = clsx(
  "rounded-sm font-medium text-primary-bold underline decoration-current underline-offset-4 dark:text-gray-bold",
  "hover:decoration-2 data-popup-open:decoration-2",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
);

const positionerStyles = clsx(
  "z-50 max-w-(--available-width) data-anchor-hidden:invisible",
  "has-[>[data-slot=preview-card-popup]>[data-slot=preview-card-viewport]]:w-(--positioner-width)",
  "has-[>[data-slot=preview-card-popup]>[data-slot=preview-card-viewport]]:h-(--positioner-height)",
);

const popupStyles = clsx(
  "relative max-h-(--available-height) w-72 min-w-0 max-w-(--available-width) overflow-hidden rounded-base",
  "origin-(--transform-origin) border border-gray-base bg-surface-base p-4 text-gray-bold shadow-m",
  "has-[>[data-slot=preview-card-viewport]]:h-(--popup-height)",
  "motion-safe:transition-[opacity,scale,height] motion-safe:duration-150 motion-safe:ease-out",
  "data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95",
  "data-instant:transition-none",
);

const viewportStyles = clsx(
  "relative min-w-0 overflow-hidden [&>[data-previous]]:hidden",
  "motion-safe:[&>[data-current]]:transition-opacity motion-safe:[&>[data-current]]:duration-150",
  "motion-safe:[&>[data-current][data-starting-style]]:opacity-0 data-instant:[&>[data-current]]:transition-none",
);

export function PreviewCardTrigger<Payload>({ className, ...props }: PreviewCardTriggerProps<Payload>) {
  return <Primitive.Trigger data-slot="preview-card-trigger" className={classes(triggerStyles, className)} {...props} />;
}

export function PreviewCardPortal(props: PreviewCardPortalProps) {
  return <Primitive.Portal data-slot="preview-card-portal" {...props} />;
}

export function PreviewCardBackdrop({ className, ...props }: PreviewCardBackdropProps) {
  return (
    <Primitive.Backdrop
      data-slot="preview-card-backdrop"
      className={classes(
        "fixed inset-0 z-40 bg-gray-bold/40 dark:bg-surface-soft/70 motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export function PreviewCardPositioner({ className, sideOffset = 8, ...props }: PreviewCardPositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="preview-card-positioner"
      sideOffset={sideOffset}
      className={classes(positionerStyles, className)}
      {...props}
    />
  );
}

export function PreviewCardPopup({ className, ...props }: PreviewCardPopupProps) {
  return (
    <Primitive.Popup
      data-slot="preview-card-popup"
      aria-hidden="true"
      tabIndex={undefined}
      className={classes(popupStyles, className)}
      {...props}
    />
  );
}

export function PreviewCardViewport({ className, ...props }: PreviewCardViewportProps) {
  return <Primitive.Viewport data-slot="preview-card-viewport" className={classes(viewportStyles, className)} {...props} />;
}
