"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/own/base/button";
import { Field, FieldDescription, FieldError, FieldItem, FieldLabel } from "@/components/own/base/field";
import { Form } from "@/components/own/base/form";
import { Radio, RadioGroup, RadioIndicator } from "@/components/own/base/radio-group";

export function RadioOption<Value>({ value, label, disabled }: {
  value: Value;
  label: string;
  disabled?: boolean;
}) {
  const labelId = useId();

  return (
    <label className="body-sm flex min-h-8 cursor-pointer items-center gap-2.5 has-data-readonly:cursor-default has-data-disabled:cursor-not-allowed has-data-disabled:text-content-soft">
      <Radio value={value} disabled={disabled} aria-labelledby={labelId}>
        <RadioIndicator />
      </Radio>
      <span id={labelId}>{label}</span>
    </label>
  );
}

export function ControlledExample() {
  const [days, setDays] = useState<7 | 14 | 30>(14);

  return (
    <div className="grid justify-items-start gap-4">
      <RadioGroup aria-labelledby="radio-retention-label" value={days} onValueChange={setDays}>
        <p id="radio-retention-label" className="body-sm font-semibold">Periodo de retención</p>
        <RadioOption value={7} label="7 días" />
        <RadioOption value={14} label="14 días" />
        <RadioOption value={30} label="30 días" />
      </RadioGroup>
      <Button type="button" size="sm" variant="outline" disabled={days === 7} onClick={() => setDays(7)}>
        Restablecer a 7 días
      </Button>
    </div>
  );
}

const deliveryOptions = [
  { value: "retiro", label: "Retiro en tienda" },
  { value: "despacho", label: "Despacho a domicilio" },
];

export function FormExample() {
  const [submittedLabel, setSubmittedLabel] = useState<string>();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("entrega");
    setSubmittedLabel(deliveryOptions.find((option) => option.value === value)?.label);
  }

  return (
    <Form className="items-start" onSubmit={submit}>
      <Field name="entrega">
        <FieldLabel render={<span />} nativeLabel={false}>Método de entrega</FieldLabel>
        <RadioGroup required onValueChange={() => setSubmittedLabel(undefined)}>
          {deliveryOptions.map((option) => (
            <FieldItem key={option.value}>
              <RadioOption {...option} />
            </FieldItem>
          ))}
        </RadioGroup>
        <FieldDescription>Selecciona una opción para continuar.</FieldDescription>
        <FieldError match="valueMissing">Elige un método de entrega.</FieldError>
      </Field>
      <Button type="submit" size="sm">Confirmar entrega</Button>
      <output className="body-sm text-content-base empty:hidden">
        {submittedLabel && <>Confirmaste «{submittedLabel}» en esta demostración.</>}
      </output>
    </Form>
  );
}
