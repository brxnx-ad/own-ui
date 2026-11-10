"use client";

import { useState } from "react";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/own/base/accordion";
import { Button } from "@/components/own/base/button";

export function ControlledExample() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue(["details"])}>Abrir desde fuera</Button>
        <Button size="sm" variant="secondary" onClick={() => setValue([])}>Cerrar desde fuera</Button>
      </div>
      <Accordion value={value} onValueChange={setValue}>
        <AccordionItem value="details">
          <AccordionHeader><AccordionTrigger>Estado controlado</AccordionTrigger></AccordionHeader>
          <AccordionPanel>El estado se comparte con los botones externos y el activador.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function PersistenceExample() {
  return (
    <Accordion>
      <AccordionItem value="persist">
        <AccordionHeader><AccordionTrigger>Contenido persistente</AccordionTrigger></AccordionHeader>
        <AccordionPanel keepMounted>
          <label className="block space-y-2">
            <span className="block">Escribe, cierra y vuelve a abrir el panel:</span>
            <input className="w-full rounded-base border border-gray-base bg-surface-bold px-3 py-2 text-content-bold focus-visible:outline-2 focus-visible:outline-primary-base" />
          </label>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
