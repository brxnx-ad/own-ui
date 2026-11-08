"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Toggle } from "@/components/own/independant/toggle";

export function ControlledExample() {
  const [compact, setCompact] = useState(false);

  return (
    <div className="grid w-full max-w-xs justify-items-center gap-3">
      <Toggle pressed={compact} onPressedChange={setCompact}>Vista compacta</Toggle>
      <ul className={`body-sm w-full divide-y divide-gray-base rounded-base border border-gray-base bg-surface-bold ${compact ? "[&>li]:py-1" : "[&>li]:py-3"}`} aria-label="Archivos del equipo">
        <li className="px-3">Guía de colores</li>
        <li className="px-3">Mapa de navegación</li>
        <li className="px-3">Biblioteca de iconos</li>
      </ul>
    </div>
  );
}

export function CanceledExample() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle
        size="sm"
        defaultPressed
        onPressedChange={(_, details) => {
          if (locked) details.cancel();
        }}
      >
        Mostrar cuadrícula
      </Toggle>
      <Button type="button" size="sm" variant="outline" onClick={() => setLocked(!locked)}>
        {locked ? "Permitir cambios" : "Bloquear cambios"}
      </Button>
    </div>
  );
}
