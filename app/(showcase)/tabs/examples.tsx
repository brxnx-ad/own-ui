"use client";

import { useState } from "react";
import { Button } from "@/components/own/independant/button";
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@/components/own/independant/tabs";

export function ControlledExample() {
  const [value, setValue] = useState("details");

  return (
    <div className="space-y-3">
      <Tabs value={value} onValueChange={setValue}>
        <TabsList aria-label="Información del archivo">
          <TabsTab value="details">Detalles</TabsTab>
          <TabsTab value="notes">Notas</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="details">El archivo fue actualizado el lunes.</TabsPanel>
        <TabsPanel value="notes">Queda pendiente revisar el contraste del encabezado.</TabsPanel>
      </Tabs>
      <Button type="button" variant="outline" size="sm" onClick={() => setValue("notes")}>Ver notas</Button>
    </div>
  );
}

export function RemovedTabExample() {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="space-y-3">
      <Tabs defaultValue="preview">
        <TabsList aria-label="Documento y vista previa">
          <TabsTab value="document">Documento</TabsTab>
          {showPreview && <TabsTab value="preview">Vista previa</TabsTab>}
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="document">Documento original con cambios pendientes.</TabsPanel>
        {showPreview && <TabsPanel value="preview">Vista previa de la versión que se publicará.</TabsPanel>}
      </Tabs>
      <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
        {showPreview ? "Quitar vista previa" : "Agregar vista previa"}
      </Button>
    </div>
  );
}
