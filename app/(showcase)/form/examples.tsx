"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "@/components/own/independant/field";
import { Fieldset, FieldsetLegend } from "@/components/own/independant/fieldset";
import { Form, type FormActions } from "@/components/own/independant/form";
import { checkTeamCode, type RegistrationState } from "./actions";

interface ContactValues {
  name: string;
  email: string;
}

export function SubmitExample() {
  const [contact, setContact] = useState<ContactValues>();

  return (
    <Form<ContactValues> onFormSubmit={setContact}>
      <Fieldset>
        <FieldsetLegend>Contacto del turno</FieldsetLegend>
        <Field name="name">
          <FieldLabel>Nombre del contacto</FieldLabel>
          <FieldControl required />
          <FieldError match="valueMissing">Ingresa el nombre del contacto.</FieldError>
        </Field>
        <Field name="email">
          <FieldLabel>Correo del contacto</FieldLabel>
          <FieldControl type="email" required />
          <FieldError match="valueMissing">Ingresa el correo del contacto.</FieldError>
          <FieldError match="typeMismatch">Usa un correo con formato nombre@ejemplo.cl.</FieldError>
        </Field>
      </Fieldset>
      <Button type="submit" className="self-start">Guardar contacto</Button>
      <p role="status" className="body-sm wrap-anywhere text-success-bold empty:sr-only">
        {contact && `Se recibió el contacto de ${contact.name} (${contact.email}).`}
      </p>
    </Form>
  );
}

export function ValidationModeExample() {
  return (
    <Form validationMode="onBlur">
      <Field name="area">
        <FieldLabel>Código del área</FieldLabel>
        <FieldControl pattern="[A-Z]{2}" placeholder="OP" />
        <FieldError match="patternMismatch">Usa dos letras mayúsculas para el área.</FieldError>
      </Field>
      <Field name="shift" validationMode="onChange">
        <FieldLabel>Código del turno</FieldLabel>
        <FieldControl pattern="[A-Z]{2}" placeholder="AM" />
        <FieldError match="patternMismatch">Usa dos letras mayúsculas para el turno.</FieldError>
      </Field>
    </Form>
  );
}

const initialRegistration: RegistrationState = {};

export function ActionExample() {
  const [code, setCode] = useState("turno-01");
  const [result, formAction, pending] = useActionState(checkTeamCode, initialRegistration);

  return (
    <Form action={formAction} errors={result.errors} aria-busy={pending || undefined}>
      <Field name="teamCode">
        <FieldLabel>Código de equipo</FieldLabel>
        <FieldControl required maxLength={8} value={code} onValueChange={setCode} />
        <FieldDescription>Prueba con turno-01 o turno-02.</FieldDescription>
        <FieldError />
      </Field>
      <Button type="submit" loading={pending} className="self-start">Comprobar código</Button>
      <p role="status" className="body-sm text-success-bold empty:sr-only">
        {result.acceptedCode && `El servidor aceptó ${result.acceptedCode}.`}
      </p>
    </Form>
  );
}

export function ImperativeValidationExample() {
  const actionsRef = useRef<FormActions>(null);

  return (
    <Form actionsRef={actionsRef} onSubmit={(event) => event.preventDefault()}>
      <Field name="project">
        <FieldLabel>Proyecto</FieldLabel>
        <FieldControl required />
        <FieldError match="valueMissing">Ingresa el nombre del proyecto.</FieldError>
      </Field>
      <Field name="owner">
        <FieldLabel>Responsable</FieldLabel>
        <FieldControl required />
        <FieldError match="valueMissing">Ingresa el nombre del responsable.</FieldError>
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => actionsRef.current?.validate("project")}>
          Validar proyecto
        </Button>
        <Button type="button" variant="outline" onClick={() => actionsRef.current?.validate()}>
          Validar todos
        </Button>
      </div>
    </Form>
  );
}

export function NativeDataExample() {
  const [recipients, setRecipients] = useState<string>();

  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      const selected = new FormData(event.currentTarget).getAll("recipients");
      setRecipients(selected.length ? `El informe se envió a ${selected.join(", ")}.` : "El envío quedó sin destinatarios.");
    }}>
      <Fieldset>
        <FieldsetLegend>Destinatarios del informe</FieldsetLegend>
        <label className="body-sm flex items-center gap-2">
          <input type="checkbox" name="recipients" value="Operaciones" defaultChecked className="size-4 accent-primary-base" />
          Operaciones
        </label>
        <label className="body-sm flex items-center gap-2">
          <input type="checkbox" name="recipients" value="Calidad" className="size-4 accent-primary-base" />
          Calidad
        </label>
      </Fieldset>
      <Button type="submit" className="self-start">Enviar destinatarios</Button>
      <p role="status" className="body-sm empty:sr-only">{recipients}</p>
    </Form>
  );
}
