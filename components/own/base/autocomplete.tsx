"use client";

import { Autocomplete as Primitive } from "@base-ui/react/autocomplete";
import clsx from "@/components/own/classes";
import { Chevron, Close } from "@/components/own/icons";

export const Autocomplete = Primitive.Root;
export const AutocompleteCollection = Primitive.Collection;
export const AutocompleteValue = Primitive.Value;
export const useAutocompleteFilter = Primitive.useFilter;
export const useAutocompleteFilteredItems = Primitive.useFilteredItems;

function classes<State>(
  base: string,
  className?: string | ((state: State) => string | undefined),
) {
  return typeof className === "function"
    ? (state: State) => clsx(base, className(state))
    : clsx(base, className);
}

const controlClasses = "grid size-8 shrink-0 place-items-center rounded-base text-content-base outline-none hover:bg-surface-base hover:text-content-bold focus-visible:ring-2 focus-visible:ring-primary-base disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-[1.15em]";
const messageClasses = "body-sm px-3 py-2 text-content-base empty:p-0";

export function AutocompleteInputGroup({ className, ...props }: Primitive.InputGroup.Props) {
  return (
    <Primitive.InputGroup
      data-slot="autocomplete-input-group"
      className={classes(
        "flex min-w-0 items-center gap-1 rounded-base border border-gray-base bg-surface-bold pr-1 text-content-bold focus-within:ring-2 focus-within:ring-primary-base data-invalid:border-error-base data-invalid:focus-within:ring-error-base data-disabled:opacity-50 " +
          "*:data-[slot=autocomplete-input]:border-transparent *:data-[slot=autocomplete-input]:bg-transparent *:data-[slot=autocomplete-input]:focus-visible:ring-0 data-disabled:*:data-[slot=autocomplete-input]:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteInput({ className, ...props }: Primitive.Input.Props) {
  return (
    <Primitive.Input
      data-slot="autocomplete-input"
      className={classes(
        "min-h-10 min-w-0 w-full rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-base text-content-bold outline-none placeholder:text-content-soft focus-visible:ring-2 focus-visible:ring-primary-base aria-invalid:border-error-base aria-invalid:focus-visible:ring-error-base disabled:opacity-50 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteTrigger({ className, children = <AutocompleteIcon />, ...props }: Primitive.Trigger.Props) {
  return (
    <Primitive.Trigger data-slot="autocomplete-trigger" className={classes(controlClasses, className)} {...props}>
      {children}
    </Primitive.Trigger>
  );
}

export function AutocompleteIcon({ className, children = <Chevron />, ...props }: Primitive.Icon.Props) {
  return (
    <Primitive.Icon
      data-slot="autocomplete-icon"
      className={classes("inline-flex [&_svg:not([class*='size-'])]:size-[1.15em]", className)}
      {...props}
    >
      {children}
    </Primitive.Icon>
  );
}

export function AutocompleteClear({ className, children = <Close />, ...props }: Primitive.Clear.Props) {
  return (
    <Primitive.Clear data-slot="autocomplete-clear" className={classes(controlClasses, className)} {...props}>
      {children}
    </Primitive.Clear>
  );
}

export function AutocompletePortal(props: Primitive.Portal.Props) {
  return <Primitive.Portal data-slot="autocomplete-portal" {...props} />;
}

export function AutocompleteBackdrop({ className, ...props }: Primitive.Backdrop.Props) {
  return (
    <Primitive.Backdrop
      data-slot="autocomplete-backdrop"
      className={classes(
        "fixed inset-0 z-40 bg-gray-bold/40 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none dark:bg-surface-soft/70",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompletePositioner({ className, sideOffset = 4, ...props }: Primitive.Positioner.Props) {
  return (
    <Primitive.Positioner
      data-slot="autocomplete-positioner"
      sideOffset={sideOffset}
      className={classes("z-50 w-(--anchor-width) max-w-(--available-width) data-anchor-hidden:invisible", className)}
      {...props}
    />
  );
}

export function AutocompletePopup({ className, ...props }: Primitive.Popup.Props) {
  return (
    <Primitive.Popup
      data-slot="autocomplete-popup"
      className={classes(
        "relative flex max-h-[min(var(--available-height),20rem)] origin-(--transform-origin) flex-col rounded-base border border-gray-base bg-surface-base text-content-bold shadow-m outline-none transition-[opacity,scale] duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 motion-safe:data-starting-style:scale-95 motion-safe:data-ending-style:scale-95 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteArrow({ className, ...props }: Primitive.Arrow.Props) {
  return (
    <Primitive.Arrow
      data-slot="autocomplete-arrow"
      className={classes(
        "pointer-events-none size-2 border-t border-l border-gray-base bg-surface-base " +
          "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45 data-[side=top]:-bottom-1 data-[side=top]:-rotate-135 " +
          "data-[side=left]:-right-1 data-[side=left]:rotate-135 data-[side=right]:-left-1 data-[side=right]:-rotate-45 " +
          "data-[side=inline-start]:-inset-e-1 data-[side=inline-start]:rotate-135 " +
          "data-[side=inline-end]:-inset-s-1 data-[side=inline-end]:-rotate-45",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteStatus({ className, ...props }: Primitive.Status.Props) {
  return <Primitive.Status data-slot="autocomplete-status" className={classes(messageClasses, className)} {...props} />;
}

export function AutocompleteEmpty({ className, ...props }: Primitive.Empty.Props) {
  return <Primitive.Empty data-slot="autocomplete-empty" className={classes(messageClasses, className)} {...props} />;
}

export function AutocompleteList({ className, ...props }: Primitive.List.Props) {
  return (
    <Primitive.List
      data-slot="autocomplete-list"
      className={classes("min-h-0 overflow-y-auto overscroll-contain p-1 outline-none empty:p-0", className)}
      {...props}
    />
  );
}

export function AutocompleteItem({ className, ...props }: Primitive.Item.Props) {
  return (
    <Primitive.Item
      data-slot="autocomplete-item"
      className={classes(
        "body-sm cursor-default wrap-break-word rounded-base px-2 py-2 text-content-bold outline-none select-none data-highlighted:bg-primary-soft data-highlighted:text-content-bold data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function AutocompleteRow({ className, ...props }: Primitive.Row.Props) {
  return <Primitive.Row data-slot="autocomplete-row" className={classes("flex gap-1", className)} {...props} />;
}

export function AutocompleteGroup(props: Primitive.Group.Props) {
  return <Primitive.Group data-slot="autocomplete-group" {...props} />;
}

export function AutocompleteGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return (
    <Primitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={classes("caption px-2 py-1 font-semibold text-content-base", className)}
      {...props}
    />
  );
}

export function AutocompleteSeparator({ className, ...props }: Primitive.Separator.Props) {
  return (
    <Primitive.Separator
      data-slot="autocomplete-separator"
      className={classes("bg-gray-base data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  );
}
