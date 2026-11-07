"use client";

import { Form } from "@base-ui/react/form";
import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { CheckboxGroup } from "@/components/own/independant/checkbox-group";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
} from "@/components/own/independant/field";

export function BasicExample() {
  return (
    <Field name="title">
      <FieldLabel>Título del informe</FieldLabel>
      <FieldControl placeholder="Resumen del turno" />
      <FieldDescription>Usa un título que identifique el turno y la fecha.</FieldDescription>
    </Field>
  );
}

export function SubmitExample() {
  const [saved, setSaved] = useState(false);

  return (
    <Form onFormSubmit={() => setSaved(true)} className="space-y-3">
      <Field name="email" validationMode="onSubmit">
        <FieldLabel>Correo de entrega</FieldLabel>
        <FieldControl type="email" required onValueChange={() => setSaved(false)} />
        <FieldDescription>Ingresa la dirección que recibirá el informe.</FieldDescription>
        <FieldError match="valueMissing">Ingresa un correo de entrega.</FieldError>
        <FieldError match="typeMismatch">Usa un correo con formato nombre@dominio.cl.</FieldError>
      </Field>
      <Button type="submit">Guardar correo</Button>
      <p role="status" className="body-sm text-success-bold empty:sr-only">{saved && "Correo guardado en la vista previa."}</p>
    </Form>
  );
}

export function BlurExample() {
  return (
    <Field name="postalCode" validationMode="onBlur">
      <FieldLabel>Código postal</FieldLabel>
      <FieldControl inputMode="numeric" pattern="[0-9]{5}" placeholder="12345" />
      <FieldDescription>Ingresa cinco cifras.</FieldDescription>
      <FieldError match="patternMismatch">El código postal debe contener cinco cifras.</FieldError>
    </Field>
  );
}

function validateAlias(value: unknown) {
  if (typeof value !== "string" || value === "") return;

  const errors = [];
  if (value.length < 4) errors.push("Usa al menos cuatro caracteres.");
  if (!/^[a-z0-9-]+$/.test(value)) errors.push("Usa minúsculas, cifras o guiones.");
  return errors;
}

export function ChangeExample() {
  return (
    <Field name="alias" validationMode="onChange" validationDebounceTime={350} validate={validateAlias}>
      <FieldLabel>Alias del equipo</FieldLabel>
      <FieldControl placeholder="turno-a" />
      <FieldDescription>Escribe un alias de al menos cuatro caracteres.</FieldDescription>
      <FieldError />
      <FieldValidity>
        {({ validity, value }) => (
          <p role="status" className="body-sm text-success-bold empty:sr-only">
            {validity.valid === true && value ? "El alias tiene un formato válido." : null}
          </p>
        )}
      </FieldValidity>
    </Field>
  );
}

export function ControlledExample() {
  const [note, setNote] = useState("");
  const limit = 120;

  return (
    <Field name="note">
      <FieldLabel>Nota del turno</FieldLabel>
      <FieldControl
        value={note}
        onValueChange={setNote}
        maxLength={limit}
        render={<textarea rows={3} className="resize-y" />}
      />
      <FieldDescription>{limit - note.length} caracteres disponibles.</FieldDescription>
    </Field>
  );
}

export function ExternalErrorExample() {
  const [errors, setErrors] = useState<{ code?: string }>();
  const [saved, setSaved] = useState(false);

  return (
    <Form<{ code: string }>
      errors={errors}
      onFormSubmit={({ code }) => {
        const inUse = code.trim().toLowerCase() === "turno-01";
        setErrors(inUse ? { code: "Este código ya está asignado. Elige otro." } : undefined);
        setSaved(!inUse);
      }}
      className="space-y-3"
    >
      <Field name="code">
        <FieldLabel>Código del turno</FieldLabel>
        <FieldControl required defaultValue="turno-01" onValueChange={() => setSaved(false)} />
        <FieldDescription>El registro de ejemplo ya contiene turno-01.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit">Registrar código</Button>
      <p role="status" className="body-sm text-success-bold empty:sr-only">{saved && "Código registrado en la vista previa."}</p>
    </Form>
  );
}

export function ItemsExample() {
  return (
    <Field name="notifications">
      <FieldLabel nativeLabel={false} render={<span />}>Notificaciones del turno</FieldLabel>
      <CheckboxGroup defaultValue={["daily"]}>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="daily"><CheckboxIndicator /></Checkbox>
            Resumen diario
          </FieldLabel>
          <FieldDescription>Recibe los indicadores al final del turno.</FieldDescription>
        </FieldItem>
        <FieldItem disabled>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="alerts"><CheckboxIndicator /></Checkbox>
            Alertas en tiempo real
          </FieldLabel>
          <FieldDescription>Esta opción aún no está habilitada.</FieldDescription>
        </FieldItem>
      </CheckboxGroup>
    </Field>
  );
}

export function DisabledExample() {
  return (
    <Field name="facility" disabled>
      <FieldLabel>Planta asignada</FieldLabel>
      <FieldControl defaultValue="Planta Norte" />
      <FieldDescription>La asignación se gestiona desde el perfil del equipo.</FieldDescription>
    </Field>
  );
}
