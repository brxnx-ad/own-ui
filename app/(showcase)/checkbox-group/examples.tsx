"use client";

import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { Button } from "@/components/own/base/button";
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";
import { CheckboxGroup } from "@/components/own/base/checkbox-group";

type OptionProps = Pick<ComponentProps<typeof Checkbox>, "value" | "name" | "parent"> & {
  label: string;
};

function Option({ label, ...props }: OptionProps) {
  const labelId = useId();

  return (
    <label className="flex items-center gap-2.5 body-sm">
      <Checkbox aria-labelledby={labelId} {...props}><CheckboxIndicator /></Checkbox>
      <span id={labelId}>{label}</span>
    </label>
  );
}

export function SelectionExample({ disabled = false }: { disabled?: boolean }) {
  const labelId = useId();

  return (
    <CheckboxGroup aria-labelledby={labelId} defaultValue={["inventario"]} disabled={disabled}>
      <p id={labelId} className="body-sm font-semibold">Informes semanales</p>
      <Option value="inventario" label="Inventario" />
      <Option value="despachos" label="Despachos" />
      <Option value="ventas" label="Ventas" />
    </CheckboxGroup>
  );
}

export function ControlledExample() {
  const labelId = useId();
  const [value, setValue] = useState<string[]>(["pdf"]);

  return (
    <div className="flex flex-col items-start gap-4">
      <CheckboxGroup aria-labelledby={labelId} value={value} onValueChange={setValue}>
        <p id={labelId} className="body-sm font-semibold">Formatos de exportación</p>
        <Option value="pdf" label="PDF" />
        <Option value="csv" label="CSV" />
      </CheckboxGroup>
      <Button size="sm" variant="secondary" disabled={value.length === 0} onClick={() => setValue([])}>
        Limpiar selección
      </Button>
    </div>
  );
}

const permissions = ["ver", "editar", "publicar"];

export function ParentExample() {
  const labelId = useId();
  const [value, setValue] = useState<string[]>(["ver"]);

  return (
    <CheckboxGroup aria-labelledby={labelId} allValues={permissions} value={value} onValueChange={setValue}>
      <p id={labelId} className="body-sm font-semibold">Permisos del equipo</p>
      <Option parent label="Seleccionar todos los permisos" />
      <div className="grid gap-2.5 border-s border-gray-base ps-4">
        <Option value="ver" label="Ver informes" />
        <Option value="editar" label="Editar informes" />
        <Option value="publicar" label="Publicar informes" />
      </div>
    </CheckboxGroup>
  );
}

export function FormExample() {
  const labelId = useId();
  const [result, setResult] = useState<string>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const channels = new FormData(event.currentTarget).getAll("canales");
    setResult(channels.length
      ? `Canales guardados (${channels.join(", ")}).`
      : "Preferencias guardadas sin canales activos.");
  }

  return (
    <form className="flex flex-col items-start gap-4" onSubmit={submit}>
      <CheckboxGroup aria-labelledby={labelId} defaultValue={["correo"]}>
        <p id={labelId} className="body-sm font-semibold">Canales de aviso</p>
        <Option name="canales" value="correo" label="Correo electrónico" />
        <Option name="canales" value="sms" label="SMS" />
      </CheckboxGroup>
      <Button type="submit" size="sm">Guardar canales</Button>
      <output className="body-sm text-content-base empty:hidden">{result}</output>
    </form>
  );
}
