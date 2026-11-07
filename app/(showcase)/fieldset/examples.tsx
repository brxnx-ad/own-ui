"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { CheckboxGroup } from "@/components/own/independant/checkbox-group";
import { Field, FieldControl, FieldItem, FieldLabel } from "@/components/own/independant/field";
import { Fieldset, FieldsetLegend } from "@/components/own/independant/fieldset";

export function BasicExample() {
  return (
    <Fieldset>
      <FieldsetLegend>Contacto del equipo</FieldsetLegend>
      <Field name="contactName">
        <FieldLabel>Nombre</FieldLabel>
        <FieldControl placeholder="Nombre y apellido" />
      </Field>
      <Field name="contactEmail">
        <FieldLabel>Correo de contacto</FieldLabel>
        <FieldControl type="email" placeholder="nombre@ejemplo.cl" />
      </Field>
    </Fieldset>
  );
}

export function SubmissionExample() {
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState<string>();

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const contact = new FormData(event.currentTarget).get("alternateContact");
        setSubmitted(typeof contact === "string" ? `Contacto enviado: ${contact || "vacío"}.` : "El envío no incluyó el contacto alternativo.");
      }}
    >
      <Fieldset disabled={disabled}>
        <FieldsetLegend>Contacto alternativo</FieldsetLegend>
        <Field name="alternateContact">
          <FieldLabel>Nombre de respaldo</FieldLabel>
          <FieldControl defaultValue="Equipo de operaciones" />
        </Field>
      </Fieldset>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setDisabled(!disabled)}>
          {disabled ? "Habilitar grupo" : "Deshabilitar grupo"}
        </Button>
        <Button type="submit">Enviar contacto</Button>
      </div>
      <p role="status" className="body-sm empty:sr-only">{submitted}</p>
    </form>
  );
}

export function NestedExample() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="space-y-4">
      <Fieldset disabled={paused}>
        <FieldsetLegend>Configuración de avisos</FieldsetLegend>
        <Field name="channel">
          <FieldLabel>Canal principal</FieldLabel>
          <FieldControl defaultValue="Operaciones" />
        </Field>
        <Fieldset className="rounded-base border border-gray-base p-4" disabled={false}>
          <FieldsetLegend>Resumen programado</FieldsetLegend>
          <Field name="deliveryTime">
            <FieldLabel>Hora de entrega</FieldLabel>
            <FieldControl type="time" defaultValue="09:00" />
          </Field>
        </Fieldset>
      </Fieldset>
      <Button variant="secondary" onClick={() => setPaused(!paused)}>
        {paused ? "Reanudar edición" : "Pausar edición"}
      </Button>
    </div>
  );
}

export function ComposedExample() {
  return (
    <Field name="reportContents">
      <Fieldset render={<CheckboxGroup defaultValue={["summary"]} />}>
        <FieldsetLegend render={<h3 />}>Contenido del informe</FieldsetLegend>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="summary"><CheckboxIndicator /></Checkbox>
            Resumen del turno
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="incidents"><CheckboxIndicator /></Checkbox>
            Registro de incidencias
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
