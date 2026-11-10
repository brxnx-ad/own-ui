"use client";

import { NavigationMenu as Primitive } from "@base-ui/react/navigation-menu";
import clsx from "@/components/own/classes";
import { Chevron } from "@/components/own/icons";
import styles from "./navigation-menu.module.css";

export type NavigationMenuProps<Value = unknown> = Primitive.Root.Props<Value>;
export type NavigationMenuState = Primitive.Root.State;
export type NavigationMenuActions = Primitive.Root.Actions;
export type NavigationMenuChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type NavigationMenuChangeEventReason = Primitive.Root.ChangeEventReason;
export type NavigationMenuListProps = Primitive.List.Props;
export type NavigationMenuListState = Primitive.List.State;
export type NavigationMenuItemProps = Primitive.Item.Props;
export type NavigationMenuItemState = Primitive.Item.State;
export type NavigationMenuTriggerProps = Primitive.Trigger.Props;
export type NavigationMenuTriggerState = Primitive.Trigger.State;
export type NavigationMenuIconProps = Primitive.Icon.Props;
export type NavigationMenuIconState = Primitive.Icon.State;
export type NavigationMenuContentProps = Primitive.Content.Props;
export type NavigationMenuContentState = Primitive.Content.State;
export type NavigationMenuLinkProps = Primitive.Link.Props;
export type NavigationMenuLinkState = Primitive.Link.State;
export type NavigationMenuPortalProps = Primitive.Portal.Props;
export type NavigationMenuPortalState = Primitive.Portal.State;
export type NavigationMenuPositionerProps = Primitive.Positioner.Props;
export type NavigationMenuPositionerState = Primitive.Positioner.State;
export type NavigationMenuBackdropProps = Primitive.Backdrop.Props;
export type NavigationMenuBackdropState = Primitive.Backdrop.State;
export type NavigationMenuPopupProps = Primitive.Popup.Props;
export type NavigationMenuPopupState = Primitive.Popup.State;
export type NavigationMenuViewportProps = Primitive.Viewport.Props;
export type NavigationMenuViewportState = Primitive.Viewport.State;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const triggerClasses = clsx(
  "body-sm inline-flex min-h-10 min-w-0 items-center justify-between gap-1.5 rounded-base px-3 py-1.5 font-medium text-content-bold outline-none select-none",
  "transition-colors duration-150 motion-reduce:transition-none",
  "hover:not-data-disabled:bg-surface-bold data-popup-open:bg-surface-bold",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
  "data-disabled:cursor-not-allowed data-disabled:opacity-50",
);

const linkClasses = clsx(
  "body-sm flex min-w-0 flex-col gap-0.5 rounded-base px-3 py-2 text-content-bold no-underline outline-none",
  "transition-colors duration-150 motion-reduce:transition-none",
  "[[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:min-h-10 [[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:flex-row [[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:items-center [[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:gap-1.5 [[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:py-1.5 [[data-slot=navigation-menu-list]>[data-slot=navigation-menu-item]>&]:font-medium",
  "hover:bg-surface-bold data-active:bg-primary-soft data-active:text-primary-bold",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
);

export function NavigationMenu<Value = unknown>({
  className,
  orientation = "horizontal",
  ...props
}: NavigationMenuProps<Value>) {
  return (
    <Primitive.Root
      data-slot="navigation-menu"
      data-orientation={orientation}
      orientation={orientation}
      className={classes(
        "relative w-(--navigation-menu-width,fit-content) max-w-full min-w-0 data-nested:[--navigation-menu-content-padding:0px] data-nested:[--navigation-menu-content-width:100%] data-nested:[--navigation-menu-width:100%]",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuList({
  className,
  ...props
}: NavigationMenuListProps) {
  return (
    <Primitive.List
      data-slot="navigation-menu-list"
      className={classes(
        clsx(
          "m-0 flex max-w-full min-w-0 list-none flex-wrap items-center gap-1 rounded-base border border-gray-base bg-surface-soft p-1 shadow-s",
          "[[data-slot=navigation-menu][data-orientation=vertical]>&]:flex-col [[data-slot=navigation-menu][data-orientation=vertical]>&]:flex-nowrap [[data-slot=navigation-menu][data-orientation=vertical]>&]:items-stretch",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuItemProps) {
  return (
    <Primitive.Item
      data-slot="navigation-menu-item"
      className={classes("relative min-w-0 list-none", className)}
      {...props}
    />
  );
}

export function NavigationMenuTrigger({
  className,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <Primitive.Trigger
      data-slot="navigation-menu-trigger"
      className={classes(triggerClasses, className)}
      {...props}
    />
  );
}

export function NavigationMenuIcon({
  className,
  children = <Chevron className="size-3.5" />,
  ...props
}: NavigationMenuIconProps) {
  return (
    <Primitive.Icon
      data-slot="navigation-menu-icon"
      className={classes(
        "inline-flex shrink-0 items-center justify-center text-content-base transition-transform duration-150 data-popup-open:rotate-180 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </Primitive.Icon>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuContentProps) {
  return (
    <Primitive.Content
      data-slot="navigation-menu-content"
      className={classes(
        clsx(
          styles.content,
          "w-(--navigation-menu-content-width,min(28rem,calc(var(--available-width,100vw)-2rem))) min-w-0 p-(--navigation-menu-content-padding,--spacing(3)) text-content-bold",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <Primitive.Link
      data-slot="navigation-menu-link"
      className={classes(linkClasses, className)}
      {...props}
    />
  );
}

export function NavigationMenuPortal(props: NavigationMenuPortalProps) {
  return <Primitive.Portal data-slot="navigation-menu-portal" {...props} />;
}

export function NavigationMenuBackdrop({
  className,
  ...props
}: NavigationMenuBackdropProps) {
  return (
    <Primitive.Backdrop
      data-slot="navigation-menu-backdrop"
      className={classes(
        clsx(styles.backdrop, "pointer-events-none fixed inset-0 z-40 bg-gray-bold/40 dark:bg-surface-soft/70"),
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuPositioner({
  className,
  sideOffset = 8,
  ...props
}: NavigationMenuPositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="navigation-menu-positioner"
      sideOffset={sideOffset}
      className={classes(
        clsx(
          styles.positioner,
          "z-50 h-(--positioner-height,auto) w-(--positioner-width,auto) max-w-(--available-width)",
          "data-anchor-hidden:invisible",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuPopup({
  className,
  ...props
}: NavigationMenuPopupProps) {
  return (
    <Primitive.Popup
      data-slot="navigation-menu-popup"
      className={classes(
        clsx(
          styles.popup,
          "relative h-(--popup-height,auto) w-(--popup-width,auto) max-w-(--available-width) origin-(--transform-origin) rounded-base border border-gray-base bg-surface-base text-content-bold shadow-m outline-none",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuViewportProps) {
  return (
    <Primitive.Viewport
      data-slot="navigation-menu-viewport"
      className={classes(
        "relative size-full min-w-0 overflow-hidden rounded-[inherit] [&>div]:relative",
        className,
      )}
      {...props}
    />
  );
}
