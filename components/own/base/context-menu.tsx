"use client";

import { ContextMenu as Primitive } from "@base-ui/react/context-menu";
import clsx from "clsx";
import { Check, Chevron } from "@/components/own/icons";

export const ContextMenu = Primitive.Root;
export const ContextMenuSubmenu = Primitive.SubmenuRoot;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const itemClasses = "body-sm flex min-h-9 min-w-0 cursor-default items-center gap-2 wrap-break-word rounded-base px-2 py-1.5 text-gray-bold outline-none select-none data-highlighted:bg-primary-soft data-disabled:opacity-50";
const indicatorClasses = "inline-flex size-4 shrink-0 items-center justify-center text-gray-bold invisible data-checked:visible";

export function ContextMenuTrigger({ className, tabIndex = 0, ...props }: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      data-slot="context-menu-trigger"
      tabIndex={tabIndex}
      className={classes("rounded-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold", className)}
      {...props}
    />
  );
}

export function ContextMenuBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="context-menu-backdrop"
      className={classes("fixed inset-0 z-40 bg-gray-bold/40 motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 dark:bg-surface-soft/70", className)}
      {...props}
    />
  );
}

export function ContextMenuPositioner({ className, ...props }: Primitive.Positioner.Props) {
  return (
    <Primitive.Positioner
      data-slot="context-menu-positioner"
      className={classes("z-50 max-w-(--available-width) data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function ContextMenuPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="context-menu-popup"
      className={classes("min-w-[min(12rem,var(--available-width))] max-w-[min(20rem,var(--available-width))] max-h-(--available-height) origin-(--transform-origin) overflow-y-auto overscroll-contain rounded-base border border-gray-base bg-surface-base p-1 text-gray-bold shadow-m outline-none motion-safe:transition-[opacity,scale] motion-safe:duration-150 motion-safe:ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95 data-instant:transition-none has-[>[data-slot=context-menu-arrow]]:overflow-visible", className)}
      {...props}
    />
  );
}

export function ContextMenuArrow({ className, ...props }: Primitive.Arrow.Props) {
  return (
    <Primitive.Arrow
      data-slot="context-menu-arrow"
      className={classes("pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135 data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45 data-[side=inline-start]:-end-1 data-[side=inline-start]:rotate-135 data-[side=inline-end]:-start-1 data-[side=inline-end]:-rotate-45", className)}
      {...props}
    />
  );
}

export function ContextMenuItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="context-menu-item"
      className={classes(itemClasses, className)}
      {...props}
    />
  );
}

export function ContextMenuLinkItem({ className, ...props }: Primitive.LinkItem.Props) {
  return (
    <Primitive.LinkItem
      data-slot="context-menu-link-item"
      className={classes(itemClasses, className)}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItem({ className, ...props }: Primitive.CheckboxItem.Props) {
  return (
    <Primitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={classes(itemClasses, className)}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItemIndicator({ className, children = <Check className="size-4" />, ...props }: Primitive.CheckboxItemIndicator.Props) {
  return (
    <Primitive.CheckboxItemIndicator
      data-slot="context-menu-checkbox-item-indicator"
      className={classes(indicatorClasses, className)}
      {...props}
    >
      {children}
    </Primitive.CheckboxItemIndicator>
  );
}

export function ContextMenuRadioItem({ className, ...props }: Primitive.RadioItem.Props) {
  return (
    <Primitive.RadioItem
      data-slot="context-menu-radio-item"
      className={classes(itemClasses, className)}
      {...props}
    />
  );
}

export function ContextMenuRadioItemIndicator({ className, children = <span className="size-2 rounded-full bg-current" />, ...props }: Primitive.RadioItemIndicator.Props) {
  return (
    <Primitive.RadioItemIndicator
      data-slot="context-menu-radio-item-indicator"
      className={classes(indicatorClasses, className)}
      {...props}
    >
      {children}
    </Primitive.RadioItemIndicator>
  );
}

export function ContextMenuGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="context-menu-group-label"
      className={classes("caption px-2 py-1 font-semibold text-gray-bold/75", className)}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: Primitive.Separator.Props) {
  return (
    <Primitive.Separator
      data-slot="context-menu-separator"
      className={classes("bg-gray-base data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=vertical]:mx-1 data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}

export function ContextMenuSubmenuTrigger({
  className,
  children,
  ...props
}: Primitive.SubmenuTrigger.Props) {
  return (
    <Primitive.SubmenuTrigger
      data-slot="context-menu-submenu-trigger"
      className={classes(clsx(itemClasses, "justify-between data-popup-open:bg-primary-soft"), className)}
      {...props}
    >
      {children}
      <Chevron className="size-4 shrink-0 -rotate-90" />
    </Primitive.SubmenuTrigger>
  );
}

export function ContextMenuPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="context-menu-portal" {...props} />;
}

export function ContextMenuGroup(props: Primitive.Group.Props) {
  return <Primitive.Group data-slot="context-menu-group" {...props} />;
}

export function ContextMenuRadioGroup(props: Primitive.RadioGroup.Props) {
  return <Primitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}
