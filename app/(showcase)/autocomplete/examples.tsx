"use client";

import { useId, useState, type ReactNode } from "react";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger,
} from "@/components/own/base/autocomplete";
import { Button } from "@/components/own/base/button";

const cities = ["Antofagasta", "Concepción", "La Serena", "Puerto Montt", "Santiago", "Valdivia", "Valparaíso"];

const products = Array.from({ length: 1000 }, (_, index) =>
  `Producto ${String(index + 1).padStart(4, "0")}`,
);

const destinations = [
  {
    name: "Costa",
    items: [
      { id: "arica", name: "Arica" },
      { id: "coquimbo", name: "Coquimbo" },
      { id: "vina", name: "Viña del Mar" },
    ],
  },
  {
    name: "Interior",
    items: [
      { id: "calama", name: "Calama" },
      { id: "santiago", name: "Santiago" },
      { id: "talca", name: "Talca" },
    ],
  },
];

function SuggestionField({ label, action }: { label: string; action?: ReactNode }) {
  const id = useId();

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="body-sm font-medium">{label}</label>
        {action}
      </div>
      <AutocompleteInputGroup>
        <AutocompleteInput id={id} placeholder="Escribe o explora las opciones" />
        <AutocompleteClear aria-label="Borrar texto" />
        <AutocompleteTrigger aria-label="Mostrar sugerencias" />
      </AutocompleteInputGroup>
    </div>
  );
}

function SuggestionPopup({ children }: { children: ReactNode }) {
  return (
    <AutocompletePortal>
      <AutocompletePositioner>
        <AutocompletePopup>
          <AutocompleteEmpty>No se encontraron sugerencias.</AutocompleteEmpty>
          {children}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompletePortal>
  );
}

function TextSuggestions() {
  return (
    <SuggestionPopup>
      <AutocompleteList>
        {(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}
      </AutocompleteList>
    </SuggestionPopup>
  );
}

export function CityExample({ mode = "list" }: { mode?: "list" | "both" }) {
  return (
    <Autocomplete items={cities} mode={mode}>
      <SuggestionField label={mode === "list" ? "Ciudad" : "Ciudad con sugerencia en línea"} />
      <TextSuggestions />
    </Autocomplete>
  );
}

export function LimitedResultsExample() {
  return (
    <Autocomplete items={products} limit={20}>
      <SuggestionField label="Producto" />
      <TextSuggestions />
    </Autocomplete>
  );
}

export function GroupedExample() {
  return (
    <Autocomplete items={destinations} itemToStringValue={(destination) => destination.name}>
      <SuggestionField label="Destino" />
      <SuggestionPopup>
        <AutocompleteList>
          {(group: (typeof destinations)[number]) => (
            <AutocompleteGroup key={group.name} items={group.items}>
              <AutocompleteGroupLabel>{group.name}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(destination: (typeof group.items)[number]) => (
                  <AutocompleteItem key={destination.id} value={destination}>{destination.name}</AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </SuggestionPopup>
    </Autocomplete>
  );
}

export function ControlledExample() {
  const [value, setValue] = useState("Santiago");

  return (
    <Autocomplete items={cities} value={value} onValueChange={setValue}>
      <SuggestionField
        label="Ciudad preferida"
        action={(
          <Button variant="secondary" size="sm" onClick={() => setValue("Santiago")}>
            Restablecer Santiago
          </Button>
        )}
      />
      <TextSuggestions />
    </Autocomplete>
  );
}
