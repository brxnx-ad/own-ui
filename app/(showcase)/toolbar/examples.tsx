"use client";

import { Bold, Italic, Minus, Plus, Redo2, Undo2 } from "lucide-react";
import { useState } from "react";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@/components/own/independant/menu";
import { Toggle } from "@/components/own/independant/toggle";
import { ToggleGroup } from "@/components/own/independant/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarSeparator } from "@/components/own/independant/toolbar";

const history = ["Informe", "Informe mensual", "Informe mensual de diseño"];

export function HistoryExample() {
  const [revision, setRevision] = useState(1);

  return (
    <div className="grid w-full max-w-sm justify-items-center gap-3">
      <Toolbar aria-label="Edición del título">
        <ToolbarGroup aria-label="Historial">
          <ToolbarButton aria-label="Deshacer" disabled={revision === 0} onClick={() => setRevision(revision - 1)}><Undo2 aria-hidden /></ToolbarButton>
          <ToolbarButton aria-label="Rehacer" disabled={revision === history.length - 1} onClick={() => setRevision(revision + 1)}><Redo2 aria-hidden /></ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton disabled={revision === 0} onClick={() => setRevision(0)}>Restablecer título</ToolbarButton>
      </Toolbar>
      <p className="body-sm font-medium">{history[revision]}</p>
    </div>
  );
}

type TextStyle = "bold" | "italic";

export function FormattingExample() {
  const [formats, setFormats] = useState<TextStyle[]>(["bold"]);

  return (
    <div className="grid justify-items-center gap-3">
      <Toolbar aria-label="Herramientas de formato">
        <ToggleGroup<TextStyle> aria-label="Formato" value={formats} onValueChange={setFormats} multiple>
          <Toggle value="bold" size="sm" variant="ghost" iconOnly aria-label="Negrita"><Bold aria-hidden /></Toggle>
          <Toggle value="italic" size="sm" variant="ghost" iconOnly aria-label="Cursiva"><Italic aria-hidden /></Toggle>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => setFormats([])} disabled={formats.length === 0}>Quitar formato</ToolbarButton>
      </Toolbar>
      <p className={`body-sm ${formats.includes("bold") ? "font-bold" : ""} ${formats.includes("italic") ? "italic" : ""}`}>
        Vista previa del texto
      </p>
    </div>
  );
}

const files = ["Guía de colores", "Mapa de navegación", "Biblioteca de iconos"];

export function SearchExample() {
  const [query, setQuery] = useState("");
  const results = files.filter((file) => file.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="grid w-full max-w-sm justify-items-center gap-3">
      <Toolbar aria-label="Filtro de archivos">
        <ToolbarButton disabled={query.length === 0} onClick={() => setQuery("")}>Limpiar filtro</ToolbarButton>
        <ToolbarInput aria-label="Filtrar archivos" placeholder="Nombre del archivo" value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
      </Toolbar>
      <ul aria-label="Archivos filtrados" className="body-sm w-full list-disc space-y-1 ps-5">
        {results.map((file) => <li key={file}>{file}</li>)}
      </ul>
    </div>
  );
}

export function MenuExample() {
  const [density, setDensity] = useState("Cómoda");

  return (
    <div className="grid justify-items-center gap-3">
      <Toolbar aria-label="Preferencias de lectura">
        <Menu>
          <ToolbarButton render={<MenuTrigger />}>Densidad</ToolbarButton>
          <MenuPortal>
            <MenuPositioner sideOffset={6}>
              <MenuPopup>
                <MenuItem onClick={() => setDensity("Cómoda")}>Cómoda</MenuItem>
                <MenuItem onClick={() => setDensity("Compacta")}>Compacta</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
        <ToolbarButton onClick={() => setDensity("Cómoda")}>Restablecer</ToolbarButton>
      </Toolbar>
      <p className={`body-sm rounded-base border border-gray-base bg-surface-bold px-3 ${density === "Compacta" ? "py-1" : "py-3"}`}>
        Vista {density.toLowerCase()}
      </p>
    </div>
  );
}

export function VerticalExample() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex items-center justify-center gap-4">
      <Toolbar aria-label="Zoom de la vista" orientation="vertical" loopFocus={false}>
        <ToolbarButton aria-label="Acercar" disabled={zoom === 125} onClick={() => setZoom(zoom + 5)}><Plus aria-hidden /></ToolbarButton>
        <ToolbarButton aria-label="Alejar" disabled={zoom === 75} onClick={() => setZoom(zoom - 5)}><Minus aria-hidden /></ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton onClick={() => setZoom(100)}>100 %</ToolbarButton>
      </Toolbar>
      <output className="body-sm font-medium tabular-nums">{zoom} %</output>
    </div>
  );
}

export function DisabledItemsExample() {
  const [label, setLabel] = useState("Borrador");

  return (
    <div className="grid justify-items-center gap-3">
      <Toolbar aria-label="Acciones sobre el borrador">
        <ToolbarButton onClick={() => setLabel("Borrador revisado")}>Revisar</ToolbarButton>
        <ToolbarGroup disabled aria-label="Acciones reservadas">
          <ToolbarButton>Publicar</ToolbarButton>
          <ToolbarButton focusableWhenDisabled={false}>Eliminar</ToolbarButton>
        </ToolbarGroup>
        <ToolbarButton onClick={() => setLabel("Borrador")}>Restablecer</ToolbarButton>
      </Toolbar>
      <p className="body-sm">{label}</p>
    </div>
  );
}
