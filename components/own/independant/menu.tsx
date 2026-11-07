"use client";

import { Menu as Primitive } from "@base-ui/react/menu";
import clsx from "clsx";
import { Check, Chevron } from "@/components/own/icons";

export const Menu = Primitive.Root;
export const MenuSubmenu = Primitive.SubmenuRoot;
export const MenuFilterProvider = Primitive.FilterProvider;
export const createMenuHandle = Primitive.createHandle;
export const useMenuFilter = Primitive.useFilter;
export type MenuHandle<Payload = unknown> = Primitive.Handle<Payload>;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const itemClasses = clsx(
  "body-sm flex min-h-9 min-w-0 cursor-default items-center gap-2 wrap-anywhere rounded-base px-2 py-1.5 text-gray-bold outline-none select-none",
  "data-highlighted:bg-primary-soft data-disabled:opacity-50",
);

const indicatorClasses =
  "inline-flex size-4 shrink-0 items-center justify-center text-gray-bold invisible data-checked:visible";

export function MenuTrigger<Payload>(props: Primitive.Trigger.Props<Payload>) {
  const { className, ...triggerProps } = props;

  return (
    <Primitive.Trigger
      data-slot="menu-trigger"
      className={classes(clsx(
        "body-sm inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-base border border-gray-base bg-surface-base px-3 py-1.5 font-medium text-gray-bold outline-none",
        "hover:bg-surface-bold data-popup-open:bg-surface-bold data-disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base",
      ), className)}
      {...triggerProps}
    />
  );
}

export function MenuPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="menu-portal" {...props} />;
}

export function MenuBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="menu-backdrop"
      className={classes("pointer-events-none fixed inset-0 z-40 bg-gray-bold/40 dark:bg-surface-soft/70 motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0", className)}
      {...props}
    />
  );
}

export function MenuPositioner({ className, ...props }: Primitive.Positioner.Props) {
  return (
    <Primitive.Positioner
      data-slot="menu-positioner"
      className={classes("z-50 max-w-(--available-width) data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function MenuPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="menu-popup"
      className={classes(clsx(
        "min-w-[min(12rem,var(--available-width))] max-w-[min(20rem,var(--available-width))] max-h-(--available-height) origin-(--transform-origin) overflow-y-auto overscroll-contain rounded-base border border-gray-base bg-surface-base p-1 text-gray-bold shadow-m outline-none",
        "motion-safe:transition-[opacity,scale] motion-safe:duration-150 motion-safe:ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95 data-instant:transition-none",
        "has-[>[data-slot=menu-arrow]]:overflow-visible",
      ), className)}
      {...props}
    />
  );
}

export function MenuArrow({ className, ...props }: Primitive.Arrow.Props) {
  return (
    <Primitive.Arrow
      data-slot="menu-arrow"
      className={classes(clsx(
        "pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-uncentered:invisible",
        "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135",
        "data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45",
        "data-[side=inline-start]:-end-1 ltr:data-[side=inline-start]:rotate-135 rtl:data-[side=inline-start]:rotate-45",
        "data-[side=inline-end]:-start-1 ltr:data-[side=inline-end]:rotate-45 rtl:data-[side=inline-end]:rotate-135",
      ), className)}
      {...props}
    />
  );
}

export function MenuItem({ className, ...props }: Primitive.Item.Props) {
  return <Primitive.Item data-slot="menu-item" className={classes(itemClasses, className)} {...props} />;
}

export function MenuLinkItem({ className, ...props }: Primitive.LinkItem.Props) {
  return <Primitive.LinkItem data-slot="menu-link-item" className={classes(itemClasses, className)} {...props} />;
}

export function MenuGroup(props: Primitive.Group.Props) {
  return <Primitive.Group data-slot="menu-group" {...props} />;
}

export function MenuGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="menu-group-label"
      className={classes("caption px-2 py-1 font-semibold text-gray-bold/75", className)}
      {...props}
    />
  );
}

export function MenuSeparator({ className, ...props }: Primitive.Separator.Props) {
  return (
    <Primitive.Separator
      data-slot="menu-separator"
      className={classes("bg-gray-base data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}

export function MenuCheckboxItem({ className, ...props }: Primitive.CheckboxItem.Props) {
  return <Primitive.CheckboxItem data-slot="menu-checkbox-item" className={classes(itemClasses, className)} {...props} />;
}

export function MenuCheckboxItemIndicator({
  className,
  children = <Check className="size-4" />,
  ...props
}: Primitive.CheckboxItemIndicator.Props) {
  return (
    <Primitive.CheckboxItemIndicator
      data-slot="menu-checkbox-item-indicator"
      className={classes(indicatorClasses, className)}
      {...props}
    >
      {children}
    </Primitive.CheckboxItemIndicator>
  );
}

export function MenuRadioGroup(props: Primitive.RadioGroup.Props) {
  return <Primitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

export function MenuRadioItem({ className, ...props }: Primitive.RadioItem.Props) {
  return <Primitive.RadioItem data-slot="menu-radio-item" className={classes(itemClasses, className)} {...props} />;
}

export function MenuRadioItemIndicator({
  className,
  children = <span className="size-2 rounded-full bg-current" />,
  ...props
}: Primitive.RadioItemIndicator.Props) {
  return (
    <Primitive.RadioItemIndicator
      data-slot="menu-radio-item-indicator"
      className={classes(indicatorClasses, className)}
      {...props}
    >
      {children}
    </Primitive.RadioItemIndicator>
  );
}

export function MenuSubmenuTrigger({ className, children, ...props }: Primitive.SubmenuTrigger.Props) {
  return (
    <Primitive.SubmenuTrigger
      data-slot="menu-submenu-trigger"
      className={classes(clsx(itemClasses, "justify-between data-popup-open:bg-primary-soft"), className)}
      {...props}
    >
      {children}
      <Chevron className="size-4 shrink-0 -rotate-90 rtl:rotate-90" />
    </Primitive.SubmenuTrigger>
  );
}

export function MenuViewport(props: Primitive.Viewport.Props) {
  return <Primitive.Viewport data-slot="menu-viewport" {...props} />;
}

export function MenuInput({ className, ...props }: Primitive.Input.Props) {
  return (
    <Primitive.Input
      data-slot="menu-input"
      className={classes("body-sm min-h-9 w-full min-w-0 rounded-base border border-gray-base bg-surface-bold px-2 py-1.5 text-gray-bold outline-none placeholder:text-gray-bold/70 focus:border-primary-base focus-visible:ring-1 focus-visible:ring-primary-base", className)}
      {...props}
    />
  );
}

export function MenuClear({ className, ...props }: Primitive.Clear.Props) {
  return (
    <Primitive.Clear
      data-slot="menu-clear"
      className={classes("body-sm inline-flex min-h-9 shrink-0 items-center justify-center rounded-base px-2 text-gray-bold outline-none hover:bg-surface-bold focus-visible:outline-2 focus-visible:outline-primary-base data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

export function MenuList({ className, ...props }: Primitive.List.Props) {
  return <Primitive.List data-slot="menu-list" className={classes("outline-none", className)} {...props} />;
}

export function MenuEmpty({ className, ...props }: Primitive.Empty.Props) {
  return (
    <Primitive.Empty
      data-slot="menu-empty"
      className={classes("body-sm px-2 py-1.5 text-gray-bold/75", className)}
      {...props}
    />
  );
}
