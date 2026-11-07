"use client";

import { Drawer as Primitive } from "@base-ui/react/drawer";
import clsx from "clsx";
import { createContext, useContext } from "react";

export const createDrawerHandle = Primitive.createHandle;
export const DrawerProvider = Primitive.Provider;
export const DrawerVirtualKeyboardProvider = Primitive.VirtualKeyboardProvider;
export type DrawerHandle<Payload = unknown> = Primitive.Handle<Payload>;
export type DrawerSnapPoint = Primitive.Root.SnapPoint;
export type DrawerSwipeDirection = NonNullable<Primitive.Root.Props["swipeDirection"]>;
export type DrawerGripPosition = "auto" | "top" | "right" | "bottom" | "left" | "none";

const oppositeGripPosition = {
  down: "top",
  up: "bottom",
  left: "right",
  right: "left",
} as const satisfies Record<DrawerSwipeDirection, DrawerGripPosition>;

const DrawerLayoutContext = createContext<{
  swipeDirection: DrawerSwipeDirection;
  verticalSnap?: "down" | "up";
}>({ swipeDirection: "down" });

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

export function Drawer<Payload>({ swipeDirection = "down", snapPoints, ...props }: Primitive.Root.Props<Payload>) {
  const verticalSnap = snapPoints?.length && (swipeDirection === "down" || swipeDirection === "up")
    ? swipeDirection
    : undefined;

  return (
    <DrawerLayoutContext.Provider value={{ swipeDirection, verticalSnap }}>
      <Primitive.Root swipeDirection={swipeDirection} snapPoints={snapPoints} {...props} />
    </DrawerLayoutContext.Provider>
  );
}

export function DrawerTrigger<Payload>(props: Primitive.Trigger.Props<Payload>) {
  return <Primitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="drawer-portal" {...props} />;
}

export function DrawerBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="drawer-backdrop"
      className={classes(
        "fixed inset-0 z-50 bg-gray-bold/40 opacity-[max(0.25,calc(1-var(--drawer-swipe-progress,0)))] transition-opacity duration-300 ease-out data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*300ms)] motion-reduce:transition-none dark:bg-surface-soft/70",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerViewport({ className, ...props }: Primitive.Viewport.Props) {
  return (
    <Primitive.Viewport
      data-slot="drawer-viewport"
      className={classes(
        "pointer-events-none fixed inset-x-0 top-0 bottom-(--drawer-keyboard-inset,0px) z-50 overflow-clip",
        className,
      )}
      {...props}
    />
  );
}

const popupClass = clsx(
  "pointer-events-auto absolute flex min-h-0 min-w-0 flex-col border-gray-base bg-surface-base text-gray-bold shadow-l outline-none",
  "[transform:translate(var(--drawer-swipe-movement-x,0px),calc(var(--drawer-swipe-movement-y,0px)+var(--drawer-snap-point-offset,0px)))]",
  "transition-transform duration-300 ease-out data-swiping:select-none data-swiping:duration-0 data-closed:pointer-events-none motion-reduce:transition-none",
  "data-starting-style:[transform:var(--own-drawer-exit)] data-ending-style:[transform:var(--own-drawer-exit)] motion-safe:data-ending-style:duration-[calc(var(--drawer-swipe-strength,1)*300ms)]",
  "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[calc(100%-1rem)] data-[swipe-direction=down]:rounded-t-base data-[swipe-direction=down]:border-t data-[swipe-direction=down]:[--own-drawer-exit:translateY(calc(100%+2rem))]",
  "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[calc(100%-1rem)] data-[swipe-direction=up]:rounded-b-base data-[swipe-direction=up]:border-b data-[swipe-direction=up]:[--own-drawer-exit:translateY(calc(-100%-2rem))]",
  "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-[min(26rem,calc(100%-2rem))] data-[swipe-direction=left]:rounded-r-base data-[swipe-direction=left]:border-r data-[swipe-direction=left]:[--own-drawer-exit:translateX(calc(-100%-2rem))]",
  "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-[min(26rem,calc(100%-2rem))] data-[swipe-direction=right]:rounded-l-base data-[swipe-direction=right]:border-l data-[swipe-direction=right]:[--own-drawer-exit:translateX(calc(100%+2rem))]",
  "data-snap-points:h-[calc(100%-1rem)]",
);

export interface DrawerPopupProps extends Primitive.Popup.Props {
  gripPosition?: DrawerGripPosition;
  showGripBorder?: boolean;
}

export function DrawerPopup({
  className,
  children,
  gripPosition = "auto",
  showGripBorder = false,
  ...props
}: DrawerPopupProps) {
  const { swipeDirection, verticalSnap } = useContext(DrawerLayoutContext);
  const position = gripPosition === "auto" ? oppositeGripPosition[swipeDirection] : gripPosition;

  return (
    <Primitive.Popup
      data-slot="drawer-popup"
      data-snap-points={verticalSnap}
      data-grip-position={position}
      className={classes(popupClass, className)}
      {...props}
    >
      {position !== "none" && (
        <div data-slot="drawer-grip" data-grip-border={showGripBorder ? "" : undefined} aria-hidden="true">
          <span data-slot="drawer-grip-indicator" className="rounded-full bg-gray-bold/40" />
        </div>
      )}
      {children}
    </Primitive.Popup>
  );
}

export function DrawerContent({ className, ...props }: Primitive.Content.Props) {
  return (
    <Primitive.Content
      data-slot="drawer-content"
      className={classes(
        "flex min-h-0 min-w-0 flex-auto flex-col gap-4 overflow-y-auto overscroll-contain pt-[max(1.5rem,env(safe-area-inset-top,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pl-[max(1.5rem,env(safe-area-inset-left,0px))]",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerTitle({ className, ...props }: Primitive.Title.Props) {
  return (
    <Primitive.Title
      data-slot="drawer-title"
      className={classes("h4 text-gray-bold", className)}
      {...props}
    />
  );
}

export function DrawerDescription({ className, ...props }: Primitive.Description.Props) {
  return (
    <Primitive.Description
      data-slot="drawer-description"
      className={classes("body-sm text-gray-bold/75", className)}
      {...props}
    />
  );
}

export function DrawerClose(props: Primitive.Close.Props) {
  return <Primitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerSwipeArea(props: Primitive.SwipeArea.Props) {
  return <Primitive.SwipeArea data-slot="drawer-swipe-area" {...props} />;
}

export function DrawerIndent(props: Primitive.Indent.Props) {
  return <Primitive.Indent data-slot="drawer-indent" {...props} />;
}

export function DrawerIndentBackground(props: Primitive.IndentBackground.Props) {
  return <Primitive.IndentBackground data-slot="drawer-indent-background" {...props} />;
}
