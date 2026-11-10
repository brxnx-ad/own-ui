"use client";

import { Select as Primitive } from "@base-ui/react/select";
import clsx from "@/components/own/classes";
import { Check, Chevron } from "@/components/own/icons";
import styles from "./select.module.css";

export const Select = Primitive.Root;
export type SelectProps<Value, Multiple extends boolean | undefined = false> =
  Primitive.Root.Props<Value, Multiple>;
export type SelectChangeEventDetails = Primitive.Root.ChangeEventDetails;
export type SelectOpenChangeEventDetails = Primitive.Root.OpenChangeEventDetails;
export type SelectActions = Primitive.Root.Actions;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const iconStyles = "inline-flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4";
const scrollArrowStyles = "inset-x-px z-10 flex h-6 items-center justify-center rounded-base bg-surface-base text-content-bold not-data-visible:invisible [&_svg:not([class*='size-'])]:size-4";

export function SelectLabel({ className, ...props }: Primitive.Label.Props) {
  return (
    <Primitive.Label
      data-slot="select-label"
      className={classes("body-sm font-medium text-content-bold", className)}
      {...props}
    />
  );
}

export function SelectTrigger({ className, ...props }: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      data-slot="select-trigger"
      className={classes(
        clsx(
          "inline-flex min-h-10 min-w-0 max-w-full items-center justify-between gap-2 rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-start text-base text-content-bold sm:text-sm",
          "hover:not-data-disabled:bg-surface-base data-popup-open:bg-surface-base",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
          "data-invalid:border-error-base data-invalid:focus-visible:outline-error-base aria-invalid:border-error-base aria-invalid:focus-visible:outline-error-base",
          "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function SelectValue({ className, ...props }: Primitive.Value.Props) {
  return (
    <Primitive.Value
      data-slot="select-value"
      className={classes("min-w-0 flex-1 truncate data-placeholder:text-content-base", className)}
      {...props}
    />
  );
}

export function SelectIcon({ className, children = <Chevron />, ...props }: Primitive.Icon.Props) {
  return (
    <Primitive.Icon
      data-slot="select-icon"
      className={classes(clsx(iconStyles, styles.icon), className)}
      {...props}
    >
      {children}
    </Primitive.Icon>
  );
}

export function SelectPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="select-portal" {...props} />;
}

export function SelectBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="select-backdrop"
      className={classes(
        clsx(styles.backdrop, "fixed inset-0 z-40 bg-gray-bold/40 dark:bg-surface-soft/70"),
        className,
      )}
      {...props}
    />
  );
}

export function SelectPositioner({
  alignItemWithTrigger = false,
  sideOffset = 4,
  className,
  ...props
}: Primitive.Positioner.Props) {
  return (
    <Primitive.Positioner
      data-slot="select-positioner"
      alignItemWithTrigger={alignItemWithTrigger}
      sideOffset={sideOffset}
      className={classes("z-50 w-(--anchor-width) max-w-(--available-width) data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function SelectPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="select-popup"
      className={classes(
        clsx(
          styles.popup,
          "relative flex max-h-[min(var(--available-height,20rem),20rem)] origin-(--transform-origin) flex-col rounded-base border border-gray-base bg-surface-base text-content-bold shadow-m outline-none data-[side=none]:max-h-80",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function SelectList({ className, ...props }: Primitive.List.Props) {
  return (
    <Primitive.List
      data-slot="select-list"
      className={classes("min-h-0 overflow-y-auto overscroll-contain rounded-[inherit] p-1 outline-none", className)}
      {...props}
    />
  );
}

export function SelectArrow({ className, ...props }: Primitive.Arrow.Props) {
  return (
    <Primitive.Arrow
      data-slot="select-arrow"
      className={classes(
        clsx(
          "pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-[side=none]:hidden",
          "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135",
          "data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45",
          "data-[side=inline-start]:-inset-e-1 data-[side=inline-start]:rotate-135",
          "data-[side=inline-end]:-inset-s-1 data-[side=inline-end]:rotate-45",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function SelectItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="select-item"
      className={classes(
        clsx(
          "body-sm grid min-h-9 min-w-0 cursor-default grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-base px-2 py-2 text-content-bold outline-none select-none",
          "data-highlighted:bg-primary-soft data-selected:font-semibold data-disabled:opacity-50",
          "forced-colors:data-highlighted:outline-2 forced-colors:data-highlighted:-outline-offset-2 forced-colors:data-highlighted:outline-solid",
        ),
        className,
      )}
      {...props}
    />
  );
}

export function SelectItemText({ className, ...props }: Primitive.ItemText.Props) {
  return (
    <Primitive.ItemText
      data-slot="select-item-text"
      className={classes("min-w-0 wrap-anywhere", className)}
      {...props}
    />
  );
}

export function SelectItemIndicator({ className, children = <Check />, ...props }: Primitive.ItemIndicator.Props) {
  return (
    <Primitive.ItemIndicator
      data-slot="select-item-indicator"
      className={classes(clsx(iconStyles, "col-start-2 row-start-1 invisible data-selected:visible"), className)}
      {...props}
    >
      {children}
    </Primitive.ItemIndicator>
  );
}

export function SelectGroup(props: Primitive.Group.Props) {
  return <Primitive.Group data-slot="select-group" {...props} />;
}

export function SelectGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="select-group-label"
      className={classes("caption px-2 py-1 font-semibold text-content-base", className)}
      {...props}
    />
  );
}

export function SelectSeparator({ className, ...props }: Primitive.Separator.Props) {
  return (
    <Primitive.Separator
      data-slot="select-separator"
      className={classes("bg-gray-base data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}

export function SelectScrollUpArrow({ className, children = <Chevron className="size-4 rotate-180" />, ...props }: Primitive.ScrollUpArrow.Props) {
  return (
    <Primitive.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={classes(clsx(scrollArrowStyles, "top-px"), className)}
      {...props}
    >
      {children}
    </Primitive.ScrollUpArrow>
  );
}

export function SelectScrollDownArrow({ className, children = <Chevron />, ...props }: Primitive.ScrollDownArrow.Props) {
  return (
    <Primitive.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={classes(clsx(scrollArrowStyles, "bottom-px"), className)}
      {...props}
    >
      {children}
    </Primitive.ScrollDownArrow>
  );
}
