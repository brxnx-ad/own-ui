"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import { Form } from "@/components/own/base/form";
import { Switch, SwitchThumb } from "@/components/own/base/switch";

export function ControlledExample() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-3">
      <label className="body-sm flex cursor-pointer items-center justify-between gap-4 font-medium">
        Mostrar detalles del archivo
        <Switch checked={showDetails} onCheckedChange={setShowDetails}><SwitchThumb /></Switch>
      </label>
      <div className="body-sm space-y-1 rounded-base border border-gray-base bg-surface-bold p-3">
        <p className="font-medium">Manual de instalación</p>
        {showDetails && <p className="caption text-gray-bold/75">PDF · 1,2 MB · Actualizado hoy</p>}
      </div>
    </div>
  );
}

export function RequiredExample() {
  const [saved, setSaved] = useState(false);

  return (
    <Form className="items-start" onFormSubmit={() => setSaved(true)}>
      <Field className="w-full" name="security-alerts">
        <FieldLabel className="flex cursor-pointer items-center justify-between gap-4">
          Alertas de seguridad
          <Switch required onCheckedChange={() => setSaved(false)}><SwitchThumb /></Switch>
        </FieldLabel>
        <FieldDescription>Actívalas para guardar la configuración.</FieldDescription>
        <FieldError match="valueMissing">Activa las alertas de seguridad.</FieldError>
      </Field>
      <Button type="submit" size="sm">Guardar configuración</Button>
      <output className="body-sm text-success-bold empty:hidden">
        {saved && "Alertas de seguridad activadas."}
      </output>
    </Form>
  );
}

export function FormExample() {
  const [applied, setApplied] = useState(true);

  return (
    <div className="space-y-3">
      <form className="space-y-3" onSubmit={(event) => {
        event.preventDefault();
        setApplied(new FormData(event.currentTarget).get("availability") === "available");
      }}>
        <label className="body-sm flex cursor-pointer items-center justify-between gap-4 font-medium">
          Mostrar solo disponibles
          <Switch name="availability" defaultChecked value="available" uncheckedValue="all"><SwitchThumb /></Switch>
        </label>
        <Button type="submit" size="sm" variant="outline">Aplicar filtro</Button>
      </form>
      <ul aria-label="Cursos encontrados" className="body-sm space-y-1 border-t border-gray-base pt-3">
        <li>Diseño de interfaces</li>
        {!applied && <li>Tipografía digital <span className="caption text-gray-bold/75">Sin cupos</span></li>}
      </ul>
    </div>
  );
}
