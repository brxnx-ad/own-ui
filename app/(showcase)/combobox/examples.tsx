"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { Button } from "@/components/own/base/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxValue,
  createComboboxItems,
} from "@/components/own/base/combobox";

const cities = ["Antofagasta", "Concepción", "La Serena", "Santiago", "Valdivia", "Valparaíso"];
const languages = ["Go", "JavaScript", "Python", "Rust", "TypeScript"];

function SearchField({ label, placeholder }: { label: string; placeholder: string }) {
  const id = useId();

  return (
    <div className="space-y-2">
      <label className="body-sm font-medium" htmlFor={id}>{label}</label>
      <ComboboxInputGroup>
        <ComboboxInput id={id} placeholder={placeholder} />
        <ComboboxClear aria-label="Limpiar selección" />
        <ComboboxTrigger aria-label="Mostrar opciones" />
      </ComboboxInputGroup>
    </div>
  );
}

function OptionsPopup({ children }: { children: ComponentProps<typeof ComboboxList>["children"] }) {
  return (
    <ComboboxPortal>
      <ComboboxPositioner>
        <ComboboxPopup>
          <ComboboxEmpty>No hay coincidencias.</ComboboxEmpty>
          <ComboboxList>{children}</ComboboxList>
        </ComboboxPopup>
      </ComboboxPositioner>
    </ComboboxPortal>
  );
}

function Option<Value>({ label, value, disabled }: { label: string; value: Value; disabled?: boolean }) {
  return (
    <ComboboxItem value={value} disabled={disabled}>
      <span className="min-w-0">{label}</span>
      <ComboboxItemIndicator />
    </ComboboxItem>
  );
}

function cityOption(city: string) {
  return <Option key={city} label={city} value={city} />;
}

export function SingleExample() {
  return (
    <Combobox items={cities}>
      <SearchField label="Ciudad de destino" placeholder="Busca una ciudad" />
      <OptionsPopup>{cityOption}</OptionsPopup>
    </Combobox>
  );
}

export function MultipleExample() {
  const id = useId();

  return (
    <Combobox items={languages} multiple defaultValue={["TypeScript"]}>
      <div className="space-y-2">
        <label className="body-sm font-medium" htmlFor={id}>Lenguajes del proyecto</label>
        <ComboboxInputGroup>
          <ComboboxValue>
            {(selected: string[]) => (
              <ComboboxChips aria-label={selected.length ? "Lenguajes seleccionados" : undefined}>
                {selected.map((language) => (
                  <ComboboxChip key={language} aria-label={language} aria-description="Pulsa Retroceso o Suprimir para quitarlo.">
                    <span className="min-w-0 truncate">{language}</span>
                    <ComboboxChipRemove aria-label={`Quitar ${language}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput
                  id={id}
                  placeholder={selected.length ? undefined : "Busca lenguajes"}
                  aria-description={selected.length ? "Desde el inicio del campo, pulsa Flecha izquierda para ir a las selecciones." : undefined}
                />
              </ComboboxChips>
            )}
          </ComboboxValue>
          <ComboboxTrigger aria-label="Mostrar lenguajes" />
        </ComboboxInputGroup>
      </div>
      <OptionsPopup>{(language: string) => <Option key={language} label={language} value={language} />}</OptionsPopup>
    </Combobox>
  );
}

export function ControlledExample() {
  const [value, setValue] = useState<string | null>("Santiago");

  return (
    <div className="space-y-3">
      <Combobox items={cities} value={value} onValueChange={setValue}>
        <SearchField label="Sede de retiro" placeholder="Busca una sede" />
        <OptionsPopup>{cityOption}</OptionsPopup>
      </Combobox>
      <Button variant="secondary" size="sm" disabled={value === "Santiago"} onClick={() => setValue("Santiago")}>
        Restablecer Santiago
      </Button>
    </div>
  );
}

const groupedItems = [
  { label: "Oficina", items: [
    { value: "cuaderno", label: "Cuaderno" },
    { value: "lapiz", label: "Lápiz" },
  ] },
  { label: "Tecnología", items: [
    { value: "teclado", label: "Teclado" },
    { value: "monitor", label: "Monitor", disabled: true },
  ] },
];
type ProductGroup = (typeof groupedItems)[number];
type Product = ProductGroup["items"][number];

export function GroupedExample() {
  return (
    <Combobox items={groupedItems}>
      <SearchField label="Producto" placeholder="Busca por nombre" />
      <OptionsPopup>
        {(group: ProductGroup) => (
          <ComboboxGroup key={group.label} items={group.items}>
            <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
            <ComboboxCollection>
              {(product: Product) => (
                <Option key={product.value} value={product} label={product.label} disabled={product.disabled} />
              )}
            </ComboboxCollection>
          </ComboboxGroup>
        )}
      </OptionsPopup>
    </Combobox>
  );
}

export function PopupInputExample() {
  return (
    <Combobox items={cities}>
      <div className="space-y-2">
        <ComboboxLabel>Sucursal de atención</ComboboxLabel>
        <ComboboxInputGroup>
          <ComboboxTrigger className="min-h-10 w-full">
            <ComboboxValue placeholder="Elige una sucursal" />
            <ComboboxIcon />
          </ComboboxTrigger>
        </ComboboxInputGroup>
      </div>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxPopup aria-label="Elegir sucursal">
            <div className="p-1">
              <ComboboxInput aria-label="Buscar sucursal" placeholder="Busca una ciudad" />
            </div>
            <ComboboxEmpty>No hay coincidencias.</ComboboxEmpty>
            <ComboboxList>{cityOption}</ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
}

const warehouses = [
  { code: "B01", name: "Bodega Norte" },
  { code: "B02", name: "Bodega Centro" },
  { code: "B03", name: "Bodega Sur" },
];
const warehouseItems = createComboboxItems(warehouses, {
  getValue: (warehouse) => warehouse.code,
  getLabel: (warehouse) => warehouse.name,
});

export function FormExample() {
  const [submittedCode, setSubmittedCode] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedCode(String(new FormData(event.currentTarget).get("bodega")));
  }

  return (
    <form className="space-y-3" onSubmit={submit}>
      <Combobox items={warehouseItems} name="bodega" required>
        <SearchField label="Bodega de origen" placeholder="Busca una bodega" />
        <OptionsPopup>
          {(warehouse: (typeof warehouses)[number]) => (
            <Option key={warehouse.code} value={warehouse.code} label={warehouse.name} />
          )}
        </OptionsPopup>
      </Combobox>
      <Button size="sm" type="submit">Confirmar bodega</Button>
      <output className="block body-sm text-content-base empty:hidden">
        {submittedCode && `Bodega confirmada con el código ${submittedCode}.`}
      </output>
    </form>
  );
}
