"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/own/base/slider";

export function ControlledExample() {
  const [zoom, setZoom] = useState(125);

  return (
    <div className="space-y-3">
      <Slider value={zoom} onValueChange={setZoom} min={75} max={150} step={5} largeStep={25} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
        <SliderLabel>Zoom</SliderLabel>
        <SliderValue />
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <Button type="button" variant="outline" size="sm" onClick={() => setZoom(100)}>Restablecer al 100 %</Button>
    </div>
  );
}

const recentFiles = ["Guía de colores", "Ficha de tipografía", "Mapa de navegación", "Biblioteca de iconos"];

export function FormExample() {
  const [limit, setLimit] = useState(recentFiles.length);

  return (
    <div className="space-y-4">
      <form className="space-y-3" onSubmit={(event) => {
        event.preventDefault();
        setLimit(Number(new FormData(event.currentTarget).get("limit")));
      }}>
        <Slider name="limit" defaultValue={recentFiles.length} min={1} max={recentFiles.length}>
          <SliderLabel>Archivos recientes</SliderLabel>
          <SliderValue />
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb />
            </SliderTrack>
          </SliderControl>
        </Slider>
        <Button type="submit" size="sm">Aplicar límite</Button>
      </form>
      <ul aria-label="Archivos recientes" className="body-sm list-disc space-y-1 border-t border-gray-base pt-3 ps-5">
        {recentFiles.slice(0, limit).map((file) => <li key={file}>{file}</li>)}
      </ul>
    </div>
  );
}
