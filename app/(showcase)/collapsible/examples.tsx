"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/own/independant/collapsible";

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button size="sm" variant="secondary" onClick={() => setOpen((value) => !value)}>
          {open ? "Ocultar instrucciones" : "Mostrar instrucciones"}
        </Button>
      </div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>Instrucciones de montaje</CollapsibleTrigger>
        <CollapsiblePanel>Fija primero el soporte y comprueba que esté nivelado.</CollapsiblePanel>
      </Collapsible>
    </div>
  );
}

export function PersistenceExample() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Borrador de entrega</CollapsibleTrigger>
      <CollapsiblePanel keepMounted>
        <label className="grid gap-2">
          <span className="font-medium">Nota de entrega</span>
          <input
            type="text"
            className="w-full rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-gray-bold outline-offset-2 focus-visible:outline-2 focus-visible:outline-gray-bold"
          />
        </label>
      </CollapsiblePanel>
    </Collapsible>
  );
}
