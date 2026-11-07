"use client";

import { Combobox as Primitive } from "@base-ui/react/combobox";
import clsx from "clsx";
import { Check, Chevron, Close } from "@/components/own/icons";

export const Combobox = Primitive.Root;
export const ComboboxCollection = Primitive.Collection;
export const ComboboxValue = Primitive.Value;
export const createComboboxItems = Primitive.createItems;
export const useComboboxFilter = Primitive.useFilter;
export const useComboboxFilteredItems = Primitive.useFilteredItems;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const controlClasses = "inline-flex shrink-0 items-center justify-center rounded-base text-gray-bold/75 outline-none hover:bg-surface-base hover:text-gray-bold focus-visible:ring-2 focus-visible:ring-primary-base disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4";
const messageClasses = "body-sm px-3 py-2 text-gray-bold/75 empty:p-0";

export function ComboboxLabel({ className, ...props }: Primitive.Label.Props) {
  return (
    <Primitive.Label
      data-slot="combobox-label"
      className={classes("body-sm font-medium text-gray-bold", className)}
      {...props}
    />
  );
}

export function ComboboxInputGroup({ className, ...props }: Primitive.InputGroup.Props) {
  return (
    <Primitive.InputGroup
      data-slot="combobox-input-group"
      className={classes("flex min-w-0 items-center gap-1 rounded-base border border-gray-base bg-surface-bold pr-1 text-gray-bold focus-within:ring-2 focus-within:ring-primary-base data-invalid:border-error-base data-invalid:focus-within:ring-error-base data-disabled:opacity-50 [&>[data-slot=combobox-input]]:border-transparent [&>[data-slot=combobox-input]]:bg-transparent [&>[data-slot=combobox-input]]:focus-visible:ring-0 data-disabled:[&_[data-slot=combobox-input]]:opacity-100", className)}
      {...props}
    />
  );
}

export function ComboboxInput({ className, ...props }: Primitive.Input.Props) {
  return (
    <Primitive.Input
      data-slot="combobox-input"
      className={classes("min-h-10 w-full min-w-0 rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-base text-gray-bold outline-none placeholder:text-gray-bold/60 focus-visible:ring-2 focus-visible:ring-primary-base aria-invalid:border-error-base aria-invalid:focus-visible:ring-error-base disabled:opacity-50 sm:text-sm", className)}
      {...props}
    />
  );
}

export function ComboboxTrigger({ className, children = <ComboboxIcon />, ...props }: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger
      data-slot="combobox-trigger"
      className={classes(clsx(controlClasses, "min-h-8 min-w-8 justify-between gap-2 px-2"), className)}
      {...props}
    >
      {children}
    </Primitive.Trigger>
  );
}

export function ComboboxIcon({ className, children = <Chevron />, ...props }: Primitive.Icon.Props) {
  return (
    <Primitive.Icon
      data-slot="combobox-icon"
      className={classes("inline-flex shrink-0 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
    </Primitive.Icon>
  );
}

export function ComboboxClear({ className, children = <Close />, ...props }: Primitive.Clear.Props) {
  return (
    <Primitive.Clear
      data-slot="combobox-clear"
      className={classes(clsx(controlClasses, "size-8 not-data-visible:invisible"), className)}
      {...props}
    >
      {children}
    </Primitive.Clear>
  );
}

export function ComboboxChips({ className, ...props }: Primitive.Chips.Props) {
  return (
    <Primitive.Chips
      data-slot="combobox-chips"
      className={classes("flex min-w-0 flex-1 flex-wrap items-center gap-1 p-1 [&>[data-slot=combobox-input]]:min-h-8 [&>[data-slot=combobox-input]]:min-w-24 [&>[data-slot=combobox-input]]:flex-1 [&>[data-slot=combobox-input]]:border-transparent [&>[data-slot=combobox-input]]:bg-transparent [&>[data-slot=combobox-input]]:px-2 [&>[data-slot=combobox-input]]:py-1 [&>[data-slot=combobox-input]]:focus-visible:ring-0", className)}
      {...props}
    />
  );
}

export function ComboboxChip({ className, ...props }: Primitive.Chip.Props) {
  return (
    <Primitive.Chip
      data-slot="combobox-chip"
      className={classes("body-sm inline-flex min-w-0 max-w-full items-center gap-1 rounded-base bg-gray-soft py-0.5 ps-2 pe-1 text-gray-bold outline-none focus-visible:ring-2 focus-visible:ring-primary-base", className)}
      {...props}
    />
  );
}

export function ComboboxChipRemove({ className, children = <Close />, ...props }: Primitive.ChipRemove.Props) {
  return (
    <Primitive.ChipRemove
      data-slot="combobox-chip-remove"
      className={classes(clsx(controlClasses, "size-6"), className)}
      {...props}
    >
      {children}
    </Primitive.ChipRemove>
  );
}

export function ComboboxBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="combobox-backdrop"
      className={classes("fixed inset-0 z-40 bg-gray-bold/40 motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 dark:bg-surface-soft/70", className)}
      {...props}
    />
  );
}

export function ComboboxPositioner({ className, sideOffset = 4, ...props }: Primitive.Positioner.Props) {
  return (
    <Primitive.Positioner
      data-slot="combobox-positioner"
      sideOffset={sideOffset}
      className={classes("z-50 w-(--anchor-width) max-w-(--available-width) data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function ComboboxPopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="combobox-popup"
      className={classes("relative flex max-h-[min(var(--available-height),20rem)] origin-(--transform-origin) flex-col rounded-base border border-gray-base bg-surface-base text-gray-bold shadow-m outline-none motion-safe:transition-[opacity,scale] motion-safe:duration-150 motion-safe:ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95", className)}
      {...props}
    />
  );
}

export function ComboboxArrow({ className, ...props }: Primitive.Arrow.Props) {
  return (
    <Primitive.Arrow
      data-slot="combobox-arrow"
      className={classes("pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135 data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45 data-[side=inline-start]:-end-1 ltr:data-[side=inline-start]:rotate-135 rtl:data-[side=inline-start]:-rotate-45 data-[side=inline-end]:-start-1 ltr:data-[side=inline-end]:-rotate-45 rtl:data-[side=inline-end]:rotate-135", className)}
      {...props}
    />
  );
}

export function ComboboxStatus({ className, ...props }: Primitive.Status.Props) {
  return (
    <Primitive.Status
      data-slot="combobox-status"
      className={classes(messageClasses, className)}
      {...props}
    />
  );
}

export function ComboboxEmpty({ className, ...props }: Primitive.Empty.Props) {
  return (
    <Primitive.Empty
      data-slot="combobox-empty"
      className={classes(messageClasses, className)}
      {...props}
    />
  );
}

export function ComboboxList({ className, ...props }: Primitive.List.Props) {
  return (
    <Primitive.List
      data-slot="combobox-list"
      className={classes("min-h-0 overflow-y-auto overscroll-contain p-1 outline-none empty:p-0", className)}
      {...props}
    />
  );
}

export function ComboboxItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="combobox-item"
      className={classes("body-sm flex min-w-0 cursor-default items-center justify-between gap-2 wrap-break-word rounded-base px-2 py-2 text-gray-bold outline-none select-none data-highlighted:bg-primary-soft data-selected:font-semibold data-disabled:opacity-50", className)}
      {...props}
    />
  );
}

export function ComboboxItemIndicator({ className, children = <Check />, ...props }: Primitive.ItemIndicator.Props) {
  return (
    <Primitive.ItemIndicator
      data-slot="combobox-item-indicator"
      className={classes("inline-flex shrink-0 invisible data-selected:visible [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
    </Primitive.ItemIndicator>
  );
}

export function ComboboxRow({ className, ...props }: Primitive.Row.Props) {
  return (
    <Primitive.Row
      data-slot="combobox-row"
      className={classes("flex gap-1", className)}
      {...props}
    />
  );
}

export function ComboboxGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="combobox-group-label"
      className={classes("caption px-2 py-1 font-semibold text-gray-bold/75", className)}
      {...props}
    />
  );
}

export function ComboboxSeparator({ className, ...props }: Primitive.Separator.Props) {
  return (
    <Primitive.Separator
      data-slot="combobox-separator"
      className={classes("bg-gray-base data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}

export function ComboboxPortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="combobox-portal" {...props} />;
}

export function ComboboxGroup(props: Primitive.Group.Props) {
  return <Primitive.Group data-slot="combobox-group" {...props} />;
}
