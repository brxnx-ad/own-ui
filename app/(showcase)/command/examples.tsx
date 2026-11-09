"use client";

import { useRef, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/own/base/button";
import { Command, type CommandGroup, type CommandItem } from "@/components/own/composed/command";

const title = "Informe de avance";
const titleCommands: readonly CommandItem[] = [
  { id: "upper", label: "Convertir a mayúsculas", keywords: ["capitalizar", "uppercase"] },
  { id: "lower", label: "Convertir a minúsculas", keywords: ["lowercase"] },
  { id: "reset", label: "Restaurar título original", keywords: ["deshacer"] },
];

export function TitleCommands() {
  const [format, setFormat] = useState("reset");
  const preview = format === "upper" ? title.toUpperCase() : format === "lower" ? title.toLowerCase() : title;

  return (
    <>
      <p className="h5" role="status">{preview}</p>
      <Command
        title="Formato del título"
        trigger={<Button icon={<Search />}>Buscar acciones de formato</Button>}
        items={titleCommands}
        onSelect={(item) => setFormat(item.id)}
      />
    </>
  );
}

const preferences: readonly CommandGroup[] = [
  {
    id: "theme",
    label: "Apariencia",
    items: [
      { id: "light", label: "Cambiar a tema claro", icon: <Sun /> },
      { id: "dark", label: "Cambiar a tema oscuro", icon: <Moon /> },
    ],
  },
  {
    id: "system",
    label: "Sistema",
    items: [
      { id: "system", label: "Usar el tema del sistema" },
      { id: "sync", label: "Sincronizar preferencias", disabled: true },
    ],
  },
];

export function GroupedCommands() {
  const { setTheme } = useTheme();

  return (
    <Command
      title="Preferencias de apariencia"
      description="Elige el tema del showcase."
      trigger={<Button variant="outline">Buscar preferencias</Button>}
      items={preferences}
      onSelect={(item) => setTheme(item.id)}
    />
  );
}

const spacingCommands: readonly CommandItem[] = [
  { id: "compact", label: "Usar espaciado compacto" },
  { id: "comfortable", label: "Usar espaciado amplio" },
];

export function ControlledCommands() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <ul className={compact ? "space-y-1" : "space-y-4"} aria-label="Vista previa del espaciado">
        <li>Resumen ejecutivo</li>
        <li>Estado del proyecto</li>
        <li>Próximos pasos</li>
      </ul>
      <Button
        ref={trigger}
        variant="outline"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        Ajustar espaciado
      </Button>
      <Command
        title="Espaciado de la lista"
        items={spacingCommands}
        open={open}
        onOpenChange={setOpen}
        finalFocus={trigger}
        onSelect={(item) => setCompact(item.id === "compact")}
      />
    </>
  );
}
