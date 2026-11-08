"use client";

import { useRef, useState } from "react";
import { FloatingInput } from "@/components/own/composed/floating-input";
import { Button } from "@/components/own/base/button";

export function ControlledExample() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function clearQuery() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-3">
      <FloatingInput ref={inputRef} label="Término de búsqueda" type="search" value={query} onValueChange={setQuery} />
      <Button type="button" variant="outline" disabled={!query} onClick={clearQuery}>
        Borrar término
      </Button>
    </div>
  );
}
