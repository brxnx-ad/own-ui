"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/own/independant/button";
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";

export function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="flex items-center gap-2.5 body-sm">
        <Checkbox checked={checked} onCheckedChange={setChecked}>
          <CheckboxIndicator />
        </Checkbox>
        Guardar una copia
      </label>
      <Button variant="secondary" size="sm" onClick={() => setChecked((value) => !value)}>
        {checked ? "Desmarcar casilla" : "Marcar casilla"}
      </Button>
    </div>
  );
}

export function IndeterminateExample() {
  const [selection, setSelection] = useState<boolean | "mixed">("mixed");

  return (
    <div className="flex flex-col items-center gap-4">
      <label className="flex items-center gap-2.5 body-sm">
        <Checkbox
          checked={selection === true}
          indeterminate={selection === "mixed"}
          onCheckedChange={setSelection}
        >
          <CheckboxIndicator />
        </Checkbox>
        Seleccionar todos los permisos
      </label>
      <Button variant="secondary" size="sm" onClick={() => setSelection("mixed")}>
        Restablecer selección parcial
      </Button>
    </div>
  );
}

export function FormExample() {
  const [result, setResult] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preference = data.get("novedades") ?? "sin respuesta";
    setResult(`Registro confirmado con «${preference}» como preferencia de novedades.`);
  }

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={submit}>
      <div className="space-y-3">
        <label className="flex items-center gap-2.5 body-sm">
          <Checkbox name="confirmacion" value="aceptada" required>
            <CheckboxIndicator />
          </Checkbox>
          Acepto las condiciones (obligatorio)
        </label>
        <label className="flex items-center gap-2.5 body-sm">
          <Checkbox name="novedades" value="sí" uncheckedValue="no">
            <CheckboxIndicator />
          </Checkbox>
          Recibir novedades por correo
        </label>
      </div>
      <Button type="submit" size="sm">Confirmar registro</Button>
      <output className="text-center body-sm text-gray-bold/75 empty:hidden">{result}</output>
    </form>
  );
}
