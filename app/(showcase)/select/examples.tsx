"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/own/independant/button";
import { Field, FieldDescription, FieldError } from "@/components/own/independant/field";
import { Form } from "@/components/own/independant/form";
import {
  Select,
  SelectArrow,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/own/independant/select";

const exportOptions = [
  { value: "pdf", label: "Documento PDF" },
  { value: "csv", label: "Tabla CSV" },
  { value: "json", label: "Datos JSON" },
];

const workAreas = [
  {
    label: "Operaciones",
    items: [
      { value: "logistics", label: "Logística" },
      { value: "production", label: "Producción", disabled: true },
    ],
  },
  {
    label: "Soporte",
    items: [
      { value: "quality", label: "Calidad" },
      { value: "planning", label: "Planificación" },
    ],
  },
];

const channels = [
  { value: "email", label: "Correo" },
  { value: "app", label: "Aplicación" },
  { value: "sms", label: "SMS" },
];

const weeks = Array.from({ length: 24 }, (_, index) => ({
  value: String(index + 1),
  label: `Semana ${index + 1}`,
}));

function Option({ value, label, disabled }: { value: string; label: string; disabled?: boolean }) {
  return (
    <SelectItem value={value} disabled={disabled}>
      <SelectItemText>{label}</SelectItemText>
      <SelectItemIndicator />
    </SelectItem>
  );
}

function Control({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <>
      <SelectLabel>{label}</SelectLabel>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
        <SelectIcon />
      </SelectTrigger>
    </>
  );
}

function Panel({ children, placement }: {
  children: ReactNode;
  placement?: "aligned" | "scroll";
}) {
  return (
    <SelectPortal>
      <SelectPositioner alignItemWithTrigger={placement === "aligned"}>
        <SelectPopup>
          {placement === "scroll" && <SelectScrollUpArrow />}
          <SelectList>{children}</SelectList>
          {placement === "scroll" && <SelectScrollDownArrow />}
        </SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  );
}

export function SingleExample() {
  return (
    <Select items={exportOptions}>
      <Control label="Formato de exportación" placeholder="Elige un formato" />
      <Panel>{exportOptions.map((option) => <Option key={option.value} {...option} />)}</Panel>
    </Select>
  );
}

export function GroupedExample() {
  return (
    <Select items={workAreas}>
      <Control label="Área de trabajo" placeholder="Elige un área" />
      <Panel>
        {workAreas.map(({ label, items }, index) => (
          <div key={label} role="presentation">
            {index > 0 && <SelectSeparator />}
            <SelectGroup>
              <SelectGroupLabel>{label}</SelectGroupLabel>
              {items.map((option) => <Option key={option.value} {...option} />)}
            </SelectGroup>
          </div>
        ))}
      </Panel>
    </Select>
  );
}

export function MultipleExample() {
  return (
    <Select items={channels} multiple defaultValue={["email"]}>
      <Control label="Canales de aviso" placeholder="Elige uno o más canales" />
      <Panel>{channels.map((option) => <Option key={option.value} {...option} />)}</Panel>
    </Select>
  );
}

export function ControlledExample() {
  const [format, setFormat] = useState<string | null>("csv");

  return (
    <>
      <Select items={exportOptions} value={format} onValueChange={setFormat}>
        <Control label="Formato preferido" placeholder="Sin preferencia" />
        <Panel>{exportOptions.map((option) => <Option key={option.value} {...option} />)}</Panel>
      </Select>
      <Button size="sm" variant="outline" className="justify-self-start" onClick={() => setFormat(null)}>
        Restablecer formato
      </Button>
    </>
  );
}

export function AlignmentExample() {
  return (
    <Select items={exportOptions} defaultValue="csv">
      <Control label="Formato con alineación de opción" />
      <Panel placement="aligned">
        {exportOptions.map((option) => <Option key={option.value} {...option} />)}
      </Panel>
    </Select>
  );
}

export function ScrollExample() {
  return (
    <Select items={weeks}>
      <Control label="Semana de planificación" placeholder="Elige una semana" />
      <Panel placement="scroll">{weeks.map((option) => <Option key={option.value} {...option} />)}</Panel>
    </Select>
  );
}

export function ReadOnlyExample() {
  return (
    <Select items={exportOptions} defaultValue="pdf" readOnly>
      <Control label="Formato asignado" />
      <Panel>{exportOptions.map((option) => <Option key={option.value} {...option} />)}</Panel>
    </Select>
  );
}

export function DisabledExample() {
  return (
    <Select items={exportOptions} defaultValue="json" disabled>
      <Control label="Formato bloqueado" />
      <Panel>{exportOptions.map((option) => <Option key={option.value} {...option} />)}</Panel>
    </Select>
  );
}

export function FormExample() {
  const [submitted, setSubmitted] = useState<string>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const format = new FormData(event.currentTarget).get("formato");
    setSubmitted(exportOptions.find((option) => option.value === format)?.label);
  }

  return (
    <Form className="w-full items-start" onSubmit={submit}>
      <Field name="formato" className="w-full">
        <Select items={exportOptions} required onValueChange={() => setSubmitted(undefined)}>
          <Control label="Formato del informe" placeholder="Elige un formato" />
          <Panel>{exportOptions.map((option) => <Option key={option.value} {...option} />)}</Panel>
        </Select>
        <FieldDescription>El formato determina el archivo que recibes.</FieldDescription>
        <FieldError match="valueMissing">Selecciona un formato para continuar.</FieldError>
      </Field>
      <Button size="sm" type="submit">Confirmar formato</Button>
      <output className="body-sm text-gray-bold/75 empty:hidden">
        {submitted && <>Formato confirmado · {submitted}</>}
      </output>
    </Form>
  );
}

export function AnchoredExample() {
  return (
    <Select items={exportOptions} modal={false}>
      <Control label="Formato de vista previa" placeholder="Elige un formato" />
      <SelectPortal>
        <SelectPositioner side="top" align="start" sideOffset={8}>
          <SelectPopup>
            <SelectArrow />
            <SelectList>
              {exportOptions.map((option) => <Option key={option.value} {...option} />)}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
