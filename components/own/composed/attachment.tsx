"use client";

import type { ComponentPropsWithRef } from "react";
import { useRender } from "@base-ui/react/use-render";
import clsx from "@/components/own/classes";
import { Button, type ButtonProps } from "@/components/own/base/button";

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";
export type AttachmentSize = "default" | "sm" | "xs";
export type AttachmentOrientation = "horizontal" | "vertical";
export type AttachmentMediaVariant = "icon" | "image";

export interface AttachmentProps extends ComponentPropsWithRef<"div"> {
  state?: AttachmentState;
  size?: AttachmentSize;
  orientation?: AttachmentOrientation;
}

export interface AttachmentMediaProps extends ComponentPropsWithRef<"div"> {
  variant?: AttachmentMediaVariant;
}

export type AttachmentTriggerProps = useRender.ComponentProps<"button">;

const sizeStyles: Record<AttachmentSize, string> = {
  default: "gap-2.5 p-2.5 text-sm",
  sm: "gap-2 p-2 text-xs",
  xs: "gap-1.5 p-1.5 text-xs",
};

export function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: AttachmentProps) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      aria-busy={state === "uploading" || state === "processing" || undefined}
      className={clsx(
        "group/attachment relative flex max-w-full min-w-0 rounded-base border border-gray-base bg-surface-base text-content-bold",
        "data-[state=idle]:border-dashed data-[state=error]:border-error-base",
        "has-[>[data-slot=attachment-trigger]:hover]:bg-surface-bold motion-safe:transition-colors",
        orientation === "vertical" ? "w-28 flex-col" : "w-fit items-center",
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export function AttachmentGroup({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="attachment-group"
      role="group"
      tabIndex={0}
      className={clsx(
        "flex min-w-0 snap-x snap-proximity items-start gap-3 overflow-x-auto overscroll-x-contain rounded-base p-1",
        "[&>[data-slot=attachment]]:shrink-0 [&>[data-slot=attachment]]:snap-start",
        "focus-visible:outline-2 focus-visible:outline-primary-base",
        className,
      )}
      {...props}
    />
  );
}

export function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: AttachmentMediaProps) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={clsx(
        "flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-base bg-surface-bold",
        "group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7",
        "group-data-[orientation=vertical]/attachment:w-full!",
        "group-data-[state=error]/attachment:bg-error-soft group-data-[state=error]/attachment:text-error-bold",
        "[&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6",
        variant === "image" && [
          "[&_img]:size-full [&_img]:object-cover",
          "group-data-[state=uploading]/attachment:opacity-60 group-data-[state=processing]/attachment:opacity-60",
        ],
        className,
      )}
      {...props}
    />
  );
}

export function AttachmentContent({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={clsx("flex min-w-0 flex-1 flex-col gap-0.5 leading-tight", className)}
      {...props}
    />
  );
}

export function AttachmentTitle({ className, ...props }: ComponentPropsWithRef<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={clsx("block truncate font-medium", className)}
      {...props}
    />
  );
}

export function AttachmentDescription({ className, ...props }: ComponentPropsWithRef<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={clsx(
        "block truncate text-xs text-content-base group-data-[state=error]/attachment:text-error-bold",
        className,
      )}
      {...props}
    />
  );
}

export function AttachmentActions({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={clsx(
        "relative z-20 flex shrink-0 flex-wrap items-center gap-1",
        "group-data-[orientation=vertical]/attachment:group-has-[>[data-slot=attachment-media]]/attachment:absolute",
        "group-data-[orientation=vertical]/attachment:group-has-[>[data-slot=attachment-media]]/attachment:end-2",
        "group-data-[orientation=vertical]/attachment:group-has-[>[data-slot=attachment-media]]/attachment:top-2",
        "group-data-[orientation=vertical]/attachment:group-has-[>[data-slot=attachment-media]]/attachment:rounded-base",
        "group-data-[orientation=vertical]/attachment:group-has-[>[data-slot=attachment-media]]/attachment:bg-surface-base",
        className,
      )}
      {...props}
    />
  );
}

export function AttachmentAction({ variant = "ghost", size = "sm", ...props }: ButtonProps) {
  return <Button data-slot="attachment-action" variant={variant} size={size} {...props} />;
}

export function AttachmentTrigger({ className, render, ref, type, ...props }: AttachmentTriggerProps) {
  const rendersButton = !render || (typeof render !== "function" && render.type === "button");

  return useRender({
    defaultTagName: "button",
    render,
    ref,
    props: {
      "data-slot": "attachment-trigger",
      type: type ?? (rendersButton ? "button" : undefined),
      className: clsx(
        "absolute inset-0 z-10 rounded-base",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
        className,
      ),
      ...props,
    },
  });
}
