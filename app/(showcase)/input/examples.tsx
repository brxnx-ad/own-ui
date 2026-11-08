"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/own/base/button";
import { Input } from "@/components/own/base/input";

export function ControlledExample() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setSearch("");
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-2">
      <label htmlFor="input-search" className="body-sm font-medium">Término de búsqueda</label>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <Input
          ref={inputRef}
          id="input-search"
          value={search}
          onValueChange={setSearch}
          placeholder="Nombre del componente"
        />
        <Button type="button" variant="outline" disabled={!search} onClick={clearSearch}>
          Borrar término
        </Button>
      </div>
    </div>
  );
}
