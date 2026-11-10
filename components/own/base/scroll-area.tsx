"use client";

import { ScrollArea as Primitive } from "@base-ui/react/scroll-area";
import clsx from "@/components/own/classes";

export type ScrollAreaProps = Primitive.Root.Props;
export type ScrollAreaState = Primitive.Root.State;
export type ScrollAreaViewportProps = Primitive.Viewport.Props;
export type ScrollAreaViewportState = Primitive.Viewport.State;
export type ScrollAreaContentProps = Primitive.Content.Props;
export type ScrollAreaContentState = Primitive.Content.State;
export type ScrollAreaScrollbarProps = Primitive.Scrollbar.Props;
export type ScrollAreaScrollbarState = Primitive.Scrollbar.State;
export type ScrollAreaThumbProps = Primitive.Thumb.Props;
export type ScrollAreaThumbState = Primitive.Thumb.State;
export type ScrollAreaCornerProps = Primitive.Corner.Props;
export type ScrollAreaCornerState = Primitive.Corner.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const scrollbarStyles = clsx(
  "z-10 flex items-start bg-surface-soft p-0.75",
  "data-[orientation=vertical]:w-4 data-[orientation=horizontal]:h-4",
  "data-[orientation=vertical]:not-data-has-overflow-y:invisible",
  "data-[orientation=horizontal]:not-data-has-overflow-x:invisible",
);

const thumbStyles = clsx(
  "shrink-0 rounded-full bg-gray-bold/55 hover:bg-gray-bold/75 data-scrolling:bg-gray-bold/75",
  "data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full",
  "motion-safe:transition-colors motion-safe:duration-150",
  "forced-colors:forced-color-adjust-none forced-colors:bg-[CanvasText]",
);

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return (
    <Primitive.Root
      data-slot="scroll-area"
      className={classes("isolate min-h-0 min-w-0", className)}
      {...props}
    />
  );
}

export function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return (
    <Primitive.Viewport
      data-slot="scroll-area-viewport"
      className={classes(
        "relative z-0 size-full rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gray-bold",
        className,
      )}
      {...props}
    />
  );
}

export function ScrollAreaContent(props: ScrollAreaContentProps) {
  return <Primitive.Content data-slot="scroll-area-content" {...props} />;
}

export function ScrollAreaScrollbar({ className, ...props }: ScrollAreaScrollbarProps) {
  return (
    <Primitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      className={classes(scrollbarStyles, className)}
      {...props}
    />
  );
}

export function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return (
    <Primitive.Thumb
      data-slot="scroll-area-thumb"
      className={classes(thumbStyles, className)}
      {...props}
    />
  );
}

export function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return (
    <Primitive.Corner
      data-slot="scroll-area-corner"
      className={classes("z-10 bg-surface-soft", className)}
      {...props}
    />
  );
}
