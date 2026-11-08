"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/own/independant/scroll-area";

const previousActivity = [
  "Se generó la vista previa",
  "Se revisaron los estados de foco",
  "Se probaron los tamaños de pantalla",
  "Se actualizaron los ejemplos",
];

export function KeepMountedExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <Button
          size="sm"
          variant="secondary"
          aria-controls="scroll-area-activity"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Ocultar historial" : "Mostrar historial"}
        </Button>
      </div>
      <ScrollArea className="w-full rounded-base border border-gray-base bg-surface-bold">
        <ScrollAreaViewport
          id="scroll-area-activity"
          role="region"
          aria-label="Actividad reciente"
          className="h-28"
        >
          <ScrollAreaContent className="px-4 pe-6">
            <ul className="body-sm divide-y divide-gray-base">
              <li className="py-2.5">Se guardó el borrador</li>
              {expanded && previousActivity.map((activity) => (
                <li key={activity} className="py-2.5">{activity}</li>
              ))}
            </ul>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar keepMounted><ScrollAreaThumb /></ScrollAreaScrollbar>
      </ScrollArea>
    </div>
  );
}
