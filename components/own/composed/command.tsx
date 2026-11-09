"use client";

import { useRef, type ComponentProps, type ReactElement, type ReactNode } from "react";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  useAutocompleteFilter,
} from "@/components/own/base/autocomplete";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "@/components/own/base/dialog";
import { Close } from "@/components/own/icons";

export interface CommandItem {
  id: string;
  label: string;
  keywords?: readonly string[];
  icon?: ReactNode;
  disabled?: boolean;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: readonly CommandItem[];
}

type DialogProps = ComponentProps<typeof Dialog>;
type PopupProps = ComponentProps<typeof DialogPopup>;

export interface CommandProps extends Pick<DialogProps, "open" | "defaultOpen" | "onOpenChange">,
  Pick<PopupProps, "className" | "finalFocus"> {
  title: string;
  description?: string;
  trigger?: ReactElement;
  items: readonly CommandItem[] | readonly CommandGroup[];
  onSelect: (item: CommandItem) => void;
  inputLabel?: string;
  placeholder?: string;
  emptyMessage?: string;
  closeLabel?: string;
}

function isGrouped(items: CommandProps["items"]): items is readonly CommandGroup[] {
  const first = items[0];
  return first !== undefined && "items" in first;
}

export function Command({
  title,
  description,
  trigger,
  items,
  onSelect,
  inputLabel = "Buscar comandos",
  placeholder = "Escribe un comando…",
  emptyMessage = "No se encontraron comandos.",
  closeLabel = "Cerrar paleta",
  open,
  defaultOpen,
  onOpenChange,
  finalFocus,
  className,
}: CommandProps) {
  const input = useRef<HTMLInputElement>(null);
  const actions = useRef<NonNullable<DialogProps["actionsRef"]>["current"]>(null);
  const { contains } = useAutocompleteFilter();
  const groups = isGrouped(items) ? items : [{ id: "", label: "", items }];

  function matches(item: CommandItem, query: string) {
    return contains(item.label, query) || item.keywords?.some((keyword) => contains(keyword, query)) === true;
  }

  function select(item: CommandItem) {
    if (item.disabled) return;
    actions.current?.close();
    onSelect(item);
  }

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} actionsRef={actions}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup data-slot="command" className={className} initialFocus={input} finalFocus={finalFocus}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1 wrap-break-word">
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
              </div>
              <DialogClose
                data-slot="command-close"
                aria-label={closeLabel}
                className="grid size-8 shrink-0 place-items-center rounded-base text-gray-bold outline-none hover:bg-surface-bold focus-visible:ring-2 focus-visible:ring-primary-base"
              >
                <Close className="size-4" />
              </DialogClose>
            </div>
            <Autocomplete
              inline
              open
              autoHighlight="always"
              items={groups}
              itemToStringValue={(item) => item.label}
              filter={matches}
            >
              <AutocompleteInput data-slot="command-input" ref={input} aria-label={inputLabel} placeholder={placeholder} />
              <AutocompleteEmpty data-slot="command-empty">{emptyMessage}</AutocompleteEmpty>
              <AutocompleteList data-slot="command-list" className="max-h-64">
                {(group: (typeof groups)[number]) => (
                  <AutocompleteGroup key={group.id} items={group.items} data-slot="command-group">
                    {group.label && <AutocompleteGroupLabel data-slot="command-group-label">{group.label}</AutocompleteGroupLabel>}
                    <AutocompleteCollection>
                      {(item: CommandItem) => (
                        <AutocompleteItem
                          key={item.id}
                          data-slot="command-item"
                          value={item}
                          disabled={item.disabled}
                          onClick={() => select(item)}
                          className="flex items-center gap-2"
                        >
                          {item.icon && <span aria-hidden="true" className="inline-flex shrink-0 [&_svg]:size-4">{item.icon}</span>}
                          <span className="min-w-0 wrap-break-word">{item.label}</span>
                        </AutocompleteItem>
                      )}
                    </AutocompleteCollection>
                  </AutocompleteGroup>
                )}
              </AutocompleteList>
            </Autocomplete>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  );
}
