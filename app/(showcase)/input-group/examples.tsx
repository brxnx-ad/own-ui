"use client";

import { useRef, useState } from "react";
import { Mail, Search, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/own/composed/input-group";

export function EmailValidationExample() {
  const [invalid, setInvalid] = useState(true);

  return (
    <>
      <label htmlFor="invalid-email" className="mb-2 block text-sm font-medium">Correo electrónico</label>
      <InputGroup>
        <InputGroupAddon><Mail aria-hidden="true" /></InputGroupAddon>
        <InputGroupInput
          id="invalid-email"
          type="email"
          required
          defaultValue="correo"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? "email-error" : undefined}
          onChange={(event) => setInvalid(!event.currentTarget.validity.valid)}
        />
      </InputGroup>
      {invalid && <p id="email-error" className="mt-2 text-sm text-error-bold">Introduce un correo válido.</p>}
    </>
  );
}

export function SearchExample() {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  return <>
    <label htmlFor="group-search" className="mb-2 block text-sm font-medium">Buscar</label>
    <InputGroup><InputGroupAddon><Search aria-hidden="true" /></InputGroupAddon><InputGroupInput ref={ref} id="group-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar..." /><InputGroupAddon align="inline-end"><InputGroupButton icon={<X />} aria-label="Borrar búsqueda" disabled={!query} onClick={() => { setQuery(""); ref.current?.focus(); }} /></InputGroupAddon></InputGroup>
  </>;
}
