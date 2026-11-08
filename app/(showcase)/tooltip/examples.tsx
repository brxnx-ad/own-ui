"use client";

import { useId, useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  createTooltipHandle,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
  type TooltipChangeEventDetails,
} from "@/components/own/independant/tooltip";

const shortcuts = [
  { label: "Buscar", hint: "Abre el buscador rápido (Ctrl + K)" },
  { label: "Guardar", hint: "Guarda los cambios pendientes (Ctrl + S)" },
  { label: "Historial", hint: "Muestra las versiones recientes (Ctrl + H)" },
];

export function DetachedTriggersExample() {
  const [handle] = useState(createTooltipHandle<string>);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {shortcuts.map(({ label, hint }) => (
          <TooltipTrigger
            key={label}
            handle={handle}
            payload={hint}
            delay={150}
            render={<Button variant="outline" />}
          >
            {label}
          </TooltipTrigger>
        ))}
      </div>
      <Tooltip handle={handle}>
        {({ payload }) => (
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>
                <TooltipViewport>
                  {payload && <span>{payload}</span>}
                </TooltipViewport>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        )}
      </Tooltip>
    </>
  );
}

export function ControlledExample() {
  const id = useId();
  const filterId = `${id}-filter`;
  const exportId = `${id}-export`;
  const [open, setOpen] = useState(false);
  const [triggerId, setTriggerId] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean, details: TooltipChangeEventDetails) {
    setOpen(nextOpen);
    if (nextOpen && details.trigger) {
      setTriggerId(details.trigger.id);
    }
  }

  function showExportTooltip() {
    setTriggerId(exportId);
    setOpen(true);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Tooltip<string> open={open} triggerId={triggerId} onOpenChange={handleOpenChange}>
        {({ payload }) => (
          <>
            <TooltipTrigger
              id={filterId}
              payload="Filtra los registros visibles por estado o fecha."
              render={<Button variant="outline" />}
            >
              Filtrar vista
            </TooltipTrigger>
            <TooltipTrigger
              id={exportId}
              payload="Descarga la tabla actual en formato CSV."
              render={<Button variant="outline" />}
            >
              Exportar CSV
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipPopup>
                  <span>{payload ?? "Selecciona una acción de la barra."}</span>
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </>
        )}
      </Tooltip>
      <Button type="button" variant="secondary" onClick={showExportTooltip}>
        Mostrar ayuda de Exportar
      </Button>
    </div>
  );
}
