"use client";

import { Toast as Primitive } from "@base-ui/react/toast";
import clsx from "@/components/own/classes";
import type { ComponentPropsWithRef } from "react";
import styles from "./toast.module.css";

export const ToastProvider = Primitive.Provider;
export const createToastManager = Primitive.createToastManager;
export const useToastManager = Primitive.useToastManager;

export type {
  ToastManager,
  ToastManagerAddOptions,
  ToastManagerPositionerProps,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject,
  UseToastManagerReturnValue,
} from "@base-ui/react/toast";

export type ToastProviderProps = Primitive.Provider.Props;
export type ToastPortalProps = Primitive.Portal.Props;
export type ToastViewportProps = Primitive.Viewport.Props;
export type ToastStackProps = ComponentPropsWithRef<"div">;
export type ToastProps = Primitive.Root.Props;
export type ToastContentProps = Primitive.Content.Props;
export type ToastTitleProps = Primitive.Title.Props;
export type ToastDescriptionProps = Primitive.Description.Props;
export type ToastActionProps = Primitive.Action.Props;
export type ToastCloseProps = Primitive.Close.Props;
export type ToastPositionerProps = Primitive.Positioner.Props;
export type ToastArrowProps = Primitive.Arrow.Props;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const toastStyles = clsx(
  styles.toast,
  "pointer-events-auto relative w-full min-w-0 shrink-0 rounded-base border border-gray-base border-s-4 border-s-gray-bold/50 bg-surface-base text-content-bold shadow-m",
  "data-[type=info]:border-s-info-base data-[type=success]:border-s-success-base data-[type=warning]:border-s-warning-base data-[type=error]:border-s-error-base data-[type=loading]:border-s-primary-base",
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold",
  "data-ending-style:pointer-events-none data-limited:hidden",
);

const buttonStyles = clsx(
  "inline-flex min-h-8 min-w-8 shrink-0 items-center justify-center rounded-base text-sm font-medium",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
  "disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-colors motion-safe:duration-150",
  "[&_svg:not([class*='size-'])]:size-4",
);

const arrowStyles = clsx(
  "pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-uncentered:invisible",
  "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135",
  "data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45",
  "data-[side=inline-start]:-inset-e-1 data-[side=inline-start]:rotate-135",
  "data-[side=inline-end]:-inset-s-1 data-[side=inline-end]:-rotate-45",
);

export function ToastPortal(props: ToastPortalProps) {
  return <Primitive.Portal data-slot="toast-portal" {...props} />;
}

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return <Primitive.Viewport data-slot="toast-viewport" className={classes("group/toast-viewport outline-none", className)} {...props} />;
}

export function ToastStack({ className, ...props }: ToastStackProps) {
  return (
    <div
      data-slot="toast-stack"
      className={clsx(
        "fixed inset-e-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 flex max-h-[calc(100dvh-max(0.5rem,env(safe-area-inset-bottom))-0.5rem)] w-[min(25rem,calc(100%-1rem))] flex-col-reverse gap-2 overflow-x-hidden overflow-y-auto overscroll-contain rounded-base p-2 empty:hidden sm:inset-e-4 sm:w-[min(25rem,calc(100%-2rem))]",
        "group-focus-visible/toast-viewport:outline-2 group-focus-visible/toast-viewport:-outline-offset-2 group-focus-visible/toast-viewport:outline-gray-bold",
        className,
      )}
      {...props}
    />
  );
}

export function Toast({ className, onPointerDown, swipeDirection = "right", toast, ...props }: ToastProps) {
  const directions = Array.isArray(swipeDirection) ? swipeDirection : [swipeDirection];
  const horizontal = directions.includes("left") || directions.includes("right");
  const vertical = directions.includes("up") || directions.includes("down");
  const anchored = toast.positionerProps?.anchor !== undefined;
  const touchAction = horizontal && vertical ? "touch-none" : horizontal ? "touch-pan-y" : vertical && "touch-pan-x";

  return (
    <Primitive.Root
      data-slot="toast"
      toast={toast}
      swipeDirection={swipeDirection}
      className={classes(clsx(toastStyles, !anchored && touchAction), className)}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.pointerType !== "touch" || anchored || !horizontal || vertical) return;

        // Base UI captures swipes from pointer-down. Leave overflowing stacks to native scrolling.
        const stack = event.currentTarget.closest('[data-slot="toast-stack"]');
        if (stack && stack.scrollHeight > stack.clientHeight) {
          event.preventBaseUIHandler();
        }
      }}
      {...props}
    />
  );
}

export function ToastContent({ className, ...props }: ToastContentProps) {
  return <Primitive.Content data-slot="toast-content" className={classes("min-w-0 space-y-2 p-3", className)} {...props} />;
}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <Primitive.Title data-slot="toast-title" className={classes("text-sm leading-snug font-semibold wrap-anywhere", className)} {...props} />;
}

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return <Primitive.Description data-slot="toast-description" className={classes("body-sm wrap-anywhere text-content-base", className)} {...props} />;
}

export function ToastAction({ className, ...props }: ToastActionProps) {
  return <Primitive.Action data-slot="toast-action" className={classes(clsx(buttonStyles, "border border-gray-base bg-surface-bold px-2.5 hover:not-disabled:bg-surface-soft"), className)} {...props} />;
}

export function ToastClose({ className, ...props }: ToastCloseProps) {
  return <Primitive.Close data-slot="toast-close" className={classes(clsx(buttonStyles, "px-1.5 text-content-base hover:not-disabled:bg-surface-bold hover:not-disabled:text-content-bold"), className)} {...props} />;
}

export function ToastPositioner({ className, ...props }: ToastPositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="toast-positioner"
      className={classes("z-50 w-max max-w-[min(20rem,var(--available-width))] data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function ToastArrow({ className, ...props }: ToastArrowProps) {
  return <Primitive.Arrow data-slot="toast-arrow" className={classes(arrowStyles, className)} {...props} />;
}
