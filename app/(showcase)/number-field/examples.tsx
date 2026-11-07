"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  type NumberFieldInputProps,
} from "@/components/own/independant/number-field";

export function NumberControl(props: NumberFieldInputProps) {
  return (
    <NumberFieldGroup>
      <NumberFieldDecrement aria-label="Disminuir valor" />
      <NumberFieldInput aria-roledescription="Campo numérico" {...props} />
      <NumberFieldIncrement aria-label="Aumentar valor" />
    </NumberFieldGroup>
  );
}

export function ControlledExample() {
  const [value, setValue] = useState<number | null>(4);
  const inputRef = useRef<HTMLInputElement>(null);

  function clearValue() {
    setValue(null);
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-3">
      <NumberField id="controlled-quantity" value={value} onValueChange={setValue} min={0}>
        <label htmlFor="controlled-quantity" className="body-sm font-medium">Cantidad del pedido</label>
        <NumberControl ref={inputRef} placeholder="Sin cantidad" />
      </NumberField>
      <Button type="button" variant="outline" size="sm" onClick={clearValue} disabled={value === null}>
        Borrar cantidad
      </Button>
    </div>
  );
}
