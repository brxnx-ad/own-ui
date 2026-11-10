"use client";

import { Dialog as Primitive } from "@base-ui/react/dialog";
import clsx from "@/components/own/classes";

export const createDialogHandle = Primitive.createHandle;
export type DialogHandle<Payload = unknown> = Primitive.Handle<Payload>;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Dialog<Payload>(props: Primitive.Root.Props<Payload>) {
  return <Primitive.Root {...props} />;
}

export function DialogTrigger<Payload>(props: Primitive.Trigger.Props<Payload>) {
  return <Primitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="dialog-portal" {...props} />;
}

export function DialogBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="dialog-backdrop"
      className={classes(
        "fixed inset-0 z-50 bg-gray-bold/40 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none dark:bg-surface-soft/70",
        className,
      )}
      {...props}
    />
  );
}

export function DialogViewport({ className, ...props }: Primitive.Viewport.Props) {
  return (
    <Primitive.Viewport
      data-slot="dialog-viewport"
      className={classes(
        "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function DialogPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="dialog-popup"
      className={classes(
        "pointer-events-auto flex max-h-full w-full min-h-0 min-w-0 max-w-lg flex-col gap-4 overflow-y-auto overscroll-contain rounded-base border border-gray-base bg-surface-base p-6 text-content-bold shadow-l outline-none transition-[opacity,scale] duration-150 ease-out data-closed:pointer-events-none data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title
      data-slot="dialog-title"
      className={classes("h4 text-content-bold", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="dialog-description"
      className={classes("body-sm text-content-base", className)}
      {...props}
    />
  );
}

export function DialogClose(props: Primitive.Close.Props) {
  return <Primitive.Close data-slot="dialog-close" {...props} />;
}
