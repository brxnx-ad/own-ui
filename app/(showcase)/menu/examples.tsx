"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/own/base/button";
import {
  createMenuHandle,
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuClear,
  MenuEmpty,
  MenuFilterProvider,
  MenuGroup,
  MenuGroupLabel,
  MenuInput,
  MenuItem,
  MenuLinkItem,
  MenuList,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@/components/own/base/menu";

function Popup({
  children,
  popupLabel,
  ...props
}: ComponentProps<typeof MenuPositioner> & { popupLabel?: string }) {
  return (
    <MenuPortal>
      <MenuPositioner align="start" sideOffset={6} {...props}>
        <MenuPopup aria-label={popupLabel}>{children}</MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  );
}

function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="body-sm w-full max-w-64 rounded-base border border-gray-base bg-surface-bold px-3 py-2">
      {children}
    </div>
  );
}

export function ActionsExample() {
  const [duplicated, setDuplicated] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger>Acciones del documento</MenuTrigger>
        <Popup>
          <MenuGroup>
            <MenuGroupLabel>Edición</MenuGroupLabel>
            <MenuItem disabled={duplicated} onClick={() => setDuplicated(true)}>Crear una copia</MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem disabled={!duplicated} onClick={() => setDuplicated(false)}>Quitar la copia</MenuItem>
        </Popup>
      </Menu>
      <Preview>
        <ul>
          <li>Informe mensual</li>
          {duplicated && <li>Copia de Informe mensual</li>}
        </ul>
      </Preview>
    </>
  );
}

export function CheckboxExample() {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <>
      <Menu modal={false}>
        <MenuTrigger>Opciones de vista</MenuTrigger>
        <Popup>
          <MenuCheckboxItem checked={showDetails} onCheckedChange={setShowDetails}>
            <MenuCheckboxItemIndicator keepMounted />
            Mostrar detalles
          </MenuCheckboxItem>
        </Popup>
      </Menu>
      <Preview>
        <p className="font-semibold">Informe mensual</p>
        {showDetails && <p className="caption text-content-base">PDF · 12 páginas</p>}
      </Preview>
    </>
  );
}

const documents = ["Acta", "Balance", "Contrato"];

export function RadioExample() {
  const [order, setOrder] = useState("asc");
  const sortedDocuments = order === "asc" ? documents : [...documents].reverse();

  return (
    <>
      <Menu modal={false}>
        <MenuTrigger>Ordenar archivos</MenuTrigger>
        <Popup>
          <MenuRadioGroup aria-label="Orden de archivos" value={order} onValueChange={setOrder}>
            <MenuRadioItem value="asc"><MenuRadioItemIndicator keepMounted />De A a Z</MenuRadioItem>
            <MenuRadioItem value="desc"><MenuRadioItemIndicator keepMounted />De Z a A</MenuRadioItem>
          </MenuRadioGroup>
        </Popup>
      </Menu>
      <Preview>
        <ul>{sortedDocuments.map((name) => <li key={name}>{name}</li>)}</ul>
      </Preview>
    </>
  );
}

export function SubmenuExample() {
  const [folder, setFolder] = useState("Bandeja de entrada");

  return (
    <>
      <Menu>
        <MenuTrigger>Organizar documento</MenuTrigger>
        <Popup>
          <MenuSubmenu>
            <MenuSubmenuTrigger>Mover a</MenuSubmenuTrigger>
            <Popup sideOffset={4}>
              <MenuItem onClick={() => setFolder("Proyectos")}>Proyectos</MenuItem>
              <MenuItem onClick={() => setFolder("Archivo")}>Archivo</MenuItem>
            </Popup>
          </MenuSubmenu>
        </Popup>
      </Menu>
      <Preview>
        <p className="font-semibold">Informe mensual</p>
        <p className="caption text-content-base">{folder}</p>
      </Preview>
    </>
  );
}

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Menu open={open} onOpenChange={setOpen} modal={false}>
        <MenuTrigger>Vista previa</MenuTrigger>
        <Popup side="top">
          <MenuLinkItem render={<Link href="/dialog" />} closeOnClick>Ver Dialog</MenuLinkItem>
        </Popup>
      </Menu>
      <Button variant="outline" disabled={!open} onClick={() => setOpen(false)}>Cerrar vista previa</Button>
    </div>
  );
}

export function LinkExample() {
  return (
    <Menu>
      <MenuTrigger>Componentes relacionados</MenuTrigger>
      <Popup align="center" sideOffset={9}>
        <MenuArrow />
        <MenuLinkItem render={<Link href="/context-menu" />} closeOnClick>Context Menu</MenuLinkItem>
        <MenuLinkItem render={<Link href="/button" />} closeOnClick>Button</MenuLinkItem>
      </Popup>
    </Menu>
  );
}

const destinations = {
  "Entrada": [{ href: "/input", label: "Input" }, { href: "/checkbox", label: "Checkbox" }],
  "Contenido": [{ href: "/accordion", label: "Accordion" }, { href: "/collapsible", label: "Collapsible" }],
};

export function SharedMenuExample() {
  const [handle] = useState(() => createMenuHandle<keyof typeof destinations>());

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <MenuTrigger handle={handle} payload="Entrada">Entrada</MenuTrigger>
        <MenuTrigger handle={handle} payload="Contenido">Contenido</MenuTrigger>
      </div>
      <Menu handle={handle} modal={false}>
        {({ payload }) => (
          <Popup>
            {payload && destinations[payload].map(({ href, label }) => (
              <MenuLinkItem key={href} render={<Link href={href} />} closeOnClick>{label}</MenuLinkItem>
            ))}
          </Popup>
        )}
      </Menu>
    </>
  );
}

export function FilterExample() {
  return (
    <MenuFilterProvider autoHighlight locale="es">
      <Menu modal={false}>
        <MenuTrigger>Buscar en el catálogo</MenuTrigger>
        <Popup popupLabel="Buscar en el catálogo">
          <div className="flex items-center gap-1 p-1">
            <MenuInput aria-label="Nombre del componente" placeholder="Buscar…" />
            <MenuClear>Borrar</MenuClear>
          </div>
          <MenuEmpty>Sin coincidencias.</MenuEmpty>
          <MenuList>
            {Object.values(destinations).flat().map(({ href, label }) => (
              <MenuLinkItem key={href} render={<Link href={href} />} closeOnClick>{label}</MenuLinkItem>
            ))}
          </MenuList>
        </Popup>
      </Menu>
    </MenuFilterProvider>
  );
}
