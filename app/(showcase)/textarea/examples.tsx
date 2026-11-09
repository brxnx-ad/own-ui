"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { Textarea } from "@/components/own/simple/textarea";

export function ControlledTextarea() {
  const [value, setValue] = useState("");
  return (
    <label className="mx-auto block max-w-md space-y-2">
      <span className="body-sm block">Observaciones</span>
      <Textarea showCount value={value} onChange={(event) => setValue(event.target.value)} maxLength={120} />
    </label>
  );
}

export function NativeValidationExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mx-auto max-w-md space-y-3"
      onChange={() => setSubmitted(false)}
      onReset={() => setSubmitted(false)}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="required-comment" className="body-sm block">Comentario obligatorio</label>
      <p id="comment-length-hint" className="body-sm text-gray-bold/75">Escribe entre 5 y 120 caracteres.</p>
      <Textarea id="required-comment" name="comment" aria-describedby="comment-length-hint" required minLength={5} maxLength={120} showCount />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm">Enviar</Button>
        <Button type="reset" size="sm" variant="outline">Limpiar</Button>
        <span role="status" className="body-sm text-success-bold">{submitted ? "Comentario válido" : ""}</span>
      </div>
    </form>
  );
}
