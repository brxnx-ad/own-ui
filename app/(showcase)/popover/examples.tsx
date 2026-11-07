"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Input } from "@/components/own/independant/input";
import {
  createPopoverHandle,
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
  type PopoverChangeEventDetails,
} from "@/components/own/independant/popover";

export function FocusExample() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger render={<Button ref={triggerRef} variant="outline" />}>Editar alias</PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverPopup initialFocus={inputRef} finalFocus={triggerRef}>
            <PopoverClose className="absolute end-4 top-4" render={<Button variant="ghost" size="sm" />}>Cerrar</PopoverClose>
            <PopoverTitle className="pe-20">Alias del equipo</PopoverTitle>
            <PopoverDescription>El alias identifica al equipo en el directorio interno.</PopoverDescription>
            <label className="grid gap-1">
              <span className="body-sm font-medium">Alias</span>
              <Input ref={inputRef} defaultValue="Operaciones" />
            </label>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}

type PanelData = { title: string; description: string; detail?: string };

const availability: PanelData = {
  title: "Disponibilidad",
  description: "El espacio de trabajo está disponible.",
};

const activity: PanelData = {
  title: "Actividad reciente",
  description: "El equipo actualizó el calendario de operaciones.",
  detail: "Los cambios ya se reflejan en la planificación de esta semana.",
};

export function DetachedTriggersExample() {
  const [handle] = useState(createPopoverHandle<PanelData>);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <PopoverTrigger handle={handle} payload={availability} render={<Button variant="outline" />}>Disponibilidad</PopoverTrigger>
        <PopoverTrigger handle={handle} payload={activity} render={<Button variant="outline" />}>Actividad</PopoverTrigger>
      </div>
      <Popover handle={handle}>
        {({ payload }) => (
          <PopoverPortal>
            <PopoverPositioner>
              <PopoverPopup>
                <PopoverViewport>
                  <div className="space-y-2">
                    <PopoverTitle>{payload?.title ?? "Espacio de trabajo"}</PopoverTitle>
                    {payload && <PopoverDescription>{payload.description}</PopoverDescription>}
                    {payload?.detail && <p className="body-sm">{payload.detail}</p>}
                  </div>
                </PopoverViewport>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
    </>
  );
}

export function ControlledExample() {
  const id = useId();
  const summaryId = `${id}-summary`;
  const settingsId = `${id}-settings`;
  const [open, setOpen] = useState(false);
  const [triggerId, setTriggerId] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean, details: PopoverChangeEventDetails) {
    setOpen(nextOpen);
    if (nextOpen && details.trigger) {
      setTriggerId(details.trigger.id);
    }
  }

  function openAtSettings() {
    setTriggerId(settingsId);
    setOpen(true);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Popover open={open} triggerId={triggerId} onOpenChange={handleOpenChange}>
        <PopoverTrigger id={summaryId} render={<Button variant="outline" />}>Resumen</PopoverTrigger>
        <PopoverTrigger id={settingsId} render={<Button variant="outline" />}>Preferencias</PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverPopup>
              <PopoverTitle>Panel de la vista</PopoverTitle>
              <PopoverDescription>El panel se ancla al botón activo de la vista.</PopoverDescription>
              <PopoverClose className="self-start" render={<Button variant="outline" size="sm" />}>Cerrar</PopoverClose>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
      <Button type="button" variant="secondary" onClick={openAtSettings}>Abrir en Preferencias</Button>
    </div>
  );
}
