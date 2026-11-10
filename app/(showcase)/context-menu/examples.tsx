"use client";

import Link from "next/link";
import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/own/base/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "@/components/own/base/context-menu";

function ContextArea({ children }: { children: ReactNode }) {
  return (
    <ContextMenuTrigger className="border border-dashed border-gray-base bg-surface-bold px-4 py-5 text-center body-sm">
      {children}
    </ContextMenuTrigger>
  );
}

function Popup({ label, anchor, finalFocus, children }: {
  label: string;
  anchor?: ComponentProps<typeof ContextMenuPositioner>["anchor"];
  finalFocus?: ComponentProps<typeof ContextMenuPopup>["finalFocus"];
  children: ReactNode;
}) {
  return (
    <ContextMenuPortal>
      <ContextMenuPositioner anchor={anchor}>
        <ContextMenuPopup aria-label={label} finalFocus={finalFocus}>{children}</ContextMenuPopup>
      </ContextMenuPositioner>
    </ContextMenuPortal>
  );
}

export function ActionsExample() {
  const [pinned, setPinned] = useState(false);
  const action = pinned ? "Desfijar tarea" : "Fijar tarea";

  function togglePinned() {
    setPinned((value) => !value);
  }

  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextArea>
          <span className="block font-semibold">Revisar inventario</span>
          <span className="text-content-base">{pinned ? "Tarea fijada" : "Tarea pendiente"}</span>
        </ContextArea>
        <Popup label="Acciones de la tarea">
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Tarea</ContextMenuGroupLabel>
            <ContextMenuItem onClick={togglePinned}>{action}</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem disabled>Duplicar tarea</ContextMenuItem>
        </Popup>
      </ContextMenu>
      <Button variant="secondary" size="sm" onClick={togglePinned}>{action}</Button>
    </div>
  );
}

export function CheckboxExample() {
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextArea>
          <span className="block font-semibold">Lista de tareas</span>
          <span className="block">Revisar pedidos</span>
          {showCompleted && <span className="block text-content-base line-through">Actualizar tarifas</span>}
        </ContextArea>
        <Popup label="Visibilidad de tareas">
          <ContextMenuCheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
            <ContextMenuCheckboxItemIndicator keepMounted />
            Mostrar tareas completadas
          </ContextMenuCheckboxItem>
        </Popup>
      </ContextMenu>
      <label className="flex items-center gap-2 body-sm">
        <input
          type="checkbox"
          className="accent-primary-base"
          checked={showCompleted}
          onChange={(event) => setShowCompleted(event.target.checked)}
        />
        Mostrar tareas completadas
      </label>
    </div>
  );
}

export function RadioExample() {
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextArea>
          <span className={density === "compact" ? "grid gap-0" : "grid gap-3"}>
            <span>Pedido 1041</span>
            <span>Pedido 1042</span>
            <span>Pedido 1043</span>
          </span>
        </ContextArea>
        <Popup label="Densidad de la lista">
          <ContextMenuRadioGroup value={density} onValueChange={setDensity}>
            <ContextMenuGroupLabel>Densidad</ContextMenuGroupLabel>
            <ContextMenuRadioItem value="comfortable">
              <ContextMenuRadioItemIndicator keepMounted />
              Espaciada
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">
              <ContextMenuRadioItemIndicator keepMounted />
              Compacta
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </Popup>
      </ContextMenu>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setDensity((value) => value === "compact" ? "comfortable" : "compact")}
      >
        {density === "compact" ? "Usar vista espaciada" : "Usar vista compacta"}
      </Button>
    </div>
  );
}

export function SubmenuExample() {
  const [folder, setFolder] = useState("Entrada");

  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextArea>
          <span className="block font-semibold">Informe de ventas</span>
          <span className="text-content-base">Carpeta «{folder}»</span>
        </ContextArea>
        <Popup label="Acciones del informe">
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>Mover a carpeta</ContextMenuSubmenuTrigger>
            <Popup label="Carpetas">
              <ContextMenuItem onClick={() => setFolder("Entrada")}>Entrada</ContextMenuItem>
              <ContextMenuItem onClick={() => setFolder("Archivo")}>Archivo</ContextMenuItem>
            </Popup>
          </ContextMenuSubmenu>
        </Popup>
      </ContextMenu>
      <label className="flex flex-wrap items-center gap-2 body-sm">
        Mover a carpeta
        <select
          className="rounded-base border border-gray-base bg-surface-bold px-2 py-1 text-content-bold"
          value={folder}
          onChange={(event) => setFolder(event.target.value)}
        >
          <option>Entrada</option>
          <option>Archivo</option>
        </select>
      </label>
    </div>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [order, setOrder] = useState<"Ascendente" | "Descendente">("Ascendente");

  return (
    <div className="space-y-3">
      <ContextMenu open={open} onOpenChange={setOpen}>
        <ContextArea>Orden actual «{order}»</ContextArea>
        <Button
          ref={buttonRef}
          variant="secondary"
          size="sm"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          Opciones de orden
        </Button>
        <Popup label="Opciones de orden" anchor={buttonRef} finalFocus={buttonRef}>
          <ContextMenuItem onClick={() => setOrder("Ascendente")}>Orden ascendente</ContextMenuItem>
          <ContextMenuItem onClick={() => setOrder("Descendente")}>Orden descendente</ContextMenuItem>
        </Popup>
      </ContextMenu>
    </div>
  );
}

export function LinkExample() {
  return (
    <div className="space-y-3">
      <ContextMenu>
        <ContextArea>Documentación de Accordion</ContextArea>
        <Popup label="Navegación">
          <ContextMenuLinkItem render={<Link href="/accordion" />} closeOnClick>
            Abrir Accordion
          </ContextMenuLinkItem>
        </Popup>
      </ContextMenu>
      <Link href="/accordion" className="body-sm font-medium underline underline-offset-4">
        Abrir Accordion
      </Link>
    </div>
  );
}
