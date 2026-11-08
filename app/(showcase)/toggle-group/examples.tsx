"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { Toggle } from "@/components/own/base/toggle";
import { ToggleGroup } from "@/components/own/base/toggle-group";

type Status = "pending" | "completed";

const tasks: { name: string; status: Status }[] = [
  { name: "Revisar el contraste", status: "pending" },
  { name: "Actualizar los iconos", status: "completed" },
  { name: "Preparar la entrega", status: "pending" },
];

export function ControlledExample() {
  const [selected, setSelected] = useState<Status[]>(["pending"]);
  const visibleTasks = selected.length === 0 ? tasks : tasks.filter(({ status }) => selected.includes(status));

  return (
    <div className="grid w-full max-w-sm justify-items-center gap-3">
      <ToggleGroup<Status> aria-label="Estado de las tareas" value={selected} onValueChange={setSelected}>
        <Toggle size="sm" value="pending">Pendientes</Toggle>
        <Toggle size="sm" value="completed">Completadas</Toggle>
      </ToggleGroup>
      <ul aria-label="Tareas filtradas" className="body-sm w-full divide-y divide-gray-base rounded-base border border-gray-base bg-surface-bold">
        {visibleTasks.map(({ name }) => <li key={name} className="px-3 py-2">{name}</li>)}
      </ul>
      <Button type="button" size="sm" variant="outline" disabled={selected.length === 0} onClick={() => setSelected([])}>
        Ver todas
      </Button>
    </div>
  );
}

export function RequiredSelectionExample() {
  return (
    <ToggleGroup
      aria-label="Unidad de tiempo del informe"
      defaultValue={["hours"]}
      onValueChange={(next, details) => {
        if (next.length === 0) details.cancel();
      }}
    >
      <Toggle size="sm" value="hours">Horas</Toggle>
      <Toggle size="sm" value="minutes">Minutos</Toggle>
    </ToggleGroup>
  );
}
