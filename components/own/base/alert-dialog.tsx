"use client";

import { AlertDialog as Primitive } from "@base-ui/react/alert-dialog";
import clsx from "clsx";

export const createAlertDialogHandle = Primitive.createHandle;
export type AlertDialogHandle<Payload = unknown> = Primitive.Handle<Payload>;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function AlertDialog<Payload>(props: Primitive.Root.Props<Payload>) {
  return <Primitive.Root {...props} />;
}

export function AlertDialogTrigger<Payload>(props: Primitive.Trigger.Props<Payload>) {
  return <Primitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

export function AlertDialogPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

export function AlertDialogBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="alert-dialog-backdrop"
      className={classes(
        "absolute inset-0 z-50 bg-gray-bold/40 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none dark:bg-surface-soft/70",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogViewport({ className, ...props }: Primitive.Viewport.Props) {
  return (
    <Primitive.Viewport
      data-slot="alert-dialog-viewport"
      className={classes(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="alert-dialog-popup"
      className={classes(
        "flex max-h-full w-full min-w-0 max-w-lg flex-col gap-6 overflow-y-auto overscroll-contain rounded-base border border-gray-base bg-surface-base p-6 text-gray-bold shadow-l outline-none transition-[opacity,transform] duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDialogTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title
      data-slot="alert-dialog-title"
      className={classes("h4 text-gray-bold", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="alert-dialog-description"
      className={classes("body-sm text-gray-bold/75", className)}
      {...props}
    />
  );
}

export function AlertDialogClose(props: Primitive.Close.Props) {
  return <Primitive.Close data-slot="alert-dialog-close" {...props} />;
}
