"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/own/base/button";
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";
import { Menubar } from "@/components/own/base/menubar";
import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuTrigger,
} from "@/components/own/base/menu";

function CommandMenu({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Menu>
      <MenuTrigger>{label}</MenuTrigger>
      <MenuPortal>
        <MenuPositioner sideOffset={5}>
          <MenuPopup>{children}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}

function Preview({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="body-sm w-full max-w-64 space-y-2 rounded-base border border-gray-base bg-surface-bold px-3 py-2">
      <p className="caption font-semibold text-gray-bold/75">{title}</p>
      {children}
    </div>
  );
}

function ExampleCheckbox({ label, checked, onCheckedChange }: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="body-sm flex max-w-full cursor-pointer items-center gap-2.5">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange}>
        <CheckboxIndicator />
      </Checkbox>
      {label}
    </label>
  );
}

export function DocumentEditorExample() {
  const [renamed, setRenamed] = useState(false);
  const [bold, setBold] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <>
      <Menubar aria-label="Comandos del documento">
        <CommandMenu label="Archivo">
          <MenuItem disabled={renamed} onClick={() => setRenamed(true)}>Renombrar como «Informe de abril»</MenuItem>
          <MenuItem disabled={!renamed} onClick={() => setRenamed(false)}>Recuperar título original</MenuItem>
        </CommandMenu>
        <CommandMenu label="Formato">
          <MenuCheckboxItem checked={bold} onCheckedChange={setBold}>
            <MenuCheckboxItemIndicator keepMounted />
            Título en negrita
          </MenuCheckboxItem>
        </CommandMenu>
        <CommandMenu label="Vista">
          <MenuCheckboxItem checked={showDetails} onCheckedChange={setShowDetails}>
            <MenuCheckboxItemIndicator keepMounted />
            Mostrar detalles
          </MenuCheckboxItem>
        </CommandMenu>
      </Menubar>
      <Preview title="Vista previa del documento">
        <div>
          <p className={bold ? "font-bold" : undefined}>{renamed ? "Informe de abril" : "Informe mensual"}</p>
          {showDetails && <p className="caption text-gray-bold/75">PDF · 12 páginas</p>}
        </div>
      </Preview>
    </>
  );
}

const files = [
  { name: "Acta.pdf", size: "180 KB" },
  { name: "Balance.xlsx", size: "96 KB" },
  { name: "Cronograma.pdf", size: "250 KB" },
];

export function FilePanelExample() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [showSizes, setShowSizes] = useState(true);
  const orderedFiles = order === "asc" ? files : [...files].reverse();

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-4">
      <Menubar aria-label="Herramientas de archivos" orientation="vertical">
        <CommandMenu label="Ordenar">
          <MenuRadioGroup aria-label="Orden por nombre" value={order} onValueChange={setOrder}>
            <MenuRadioItem value="asc"><MenuRadioItemIndicator keepMounted />De A a Z</MenuRadioItem>
            <MenuRadioItem value="desc"><MenuRadioItemIndicator keepMounted />De Z a A</MenuRadioItem>
          </MenuRadioGroup>
        </CommandMenu>
        <CommandMenu label="Columnas">
          <MenuCheckboxItem checked={showSizes} onCheckedChange={setShowSizes}>
            <MenuCheckboxItemIndicator keepMounted />
            Mostrar tamaño
          </MenuCheckboxItem>
        </CommandMenu>
      </Menubar>
      <Preview title="Archivos del proyecto">
        <table aria-label="Archivos del proyecto" className="w-full">
          <thead>
            <tr className="border-b border-gray-base">
              <th scope="col" className="py-1 text-left font-medium">Nombre</th>
              {showSizes && <th scope="col" className="py-1 text-right font-medium">Tamaño</th>}
            </tr>
          </thead>
          <tbody>
            {orderedFiles.map(({ name, size }) => (
              <tr key={name}>
                <td className="py-1">{name}</td>
                {showSizes && <td className="py-1 text-right tabular-nums">{size}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </Preview>
    </div>
  );
}

const reportSections = [
  { title: "Resumen", pages: [
    { title: "Objetivo", content: "Ampliar la capacidad del taller." },
    { title: "Alcance", content: "El análisis abarca la línea de ensamblaje." },
  ] },
  { title: "Resultados", pages: [
    { title: "Producción", content: "La producción aumentó un 12 %." },
    { title: "Tiempos de espera", content: "La espera se redujo en seis minutos por lote." },
  ] },
  { title: "Anexo", pages: [
    { title: "Metodología", content: "Se observaron cuatro semanas de operación." },
    { title: "Muestra", content: "Se registraron 48 lotes en dos turnos." },
  ] },
];

export function ReportSectionsExample() {
  const [loopFocus, setLoopFocus] = useState(false);
  const [page, setPage] = useState(reportSections[0].pages[0]);

  return (
    <>
      <ExampleCheckbox label="Permitir el recorrido circular" checked={loopFocus} onCheckedChange={setLoopFocus} />
      <Menubar aria-label="Secciones del informe" loopFocus={loopFocus}>
        {reportSections.map(({ title, pages }) => (
          <CommandMenu key={title} label={title}>
            {pages.map((entry) => (
              <MenuItem key={entry.title} onClick={() => setPage(entry)}>{entry.title}</MenuItem>
            ))}
          </CommandMenu>
        ))}
      </Menubar>
      <Preview title={page.title}>
        <p>{page.content}</p>
      </Preview>
    </>
  );
}

const inboxMessages = [
  { subject: "Cierre de abril", excerpt: "Adjunto el consolidado del mes.", read: false },
  { subject: "Reunión de equipo", excerpt: "La reunión será el martes a las 10.", read: true },
];

export function InboxExample() {
  const [modal, setModal] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const [showExcerpts, setShowExcerpts] = useState(false);
  const messages = unreadOnly ? inboxMessages.filter(({ read }) => !allRead && !read) : inboxMessages;

  return (
    <>
      <ExampleCheckbox label="Bloquear clics fuera del menú" checked={modal} onCheckedChange={setModal} />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm" variant="secondary" aria-pressed={showExcerpts} onClick={() => setShowExcerpts((value) => !value)}>
          Mostrar extractos
        </Button>
        <Menubar aria-label="Comandos de la bandeja" modal={modal}>
          <CommandMenu label="Filtro">
            <MenuCheckboxItem checked={unreadOnly} onCheckedChange={setUnreadOnly}>
              <MenuCheckboxItemIndicator keepMounted />
              Solo mensajes sin leer
            </MenuCheckboxItem>
          </CommandMenu>
          <CommandMenu label="Mensajes">
            <MenuItem disabled={allRead} onClick={() => setAllRead(true)}>Marcar todo como leído</MenuItem>
          </CommandMenu>
        </Menubar>
      </div>
      <Preview title="Bandeja de entrada">
        {messages.length === 0 ? <p>No hay mensajes sin leer.</p> : (
          <ul className="space-y-2">
            {messages.map(({ subject, excerpt, read }) => (
              <li key={subject}>
                <p>{subject}{!allRead && !read && <span className="caption ms-2 text-gray-bold/75">Sin leer</span>}</p>
                {showExcerpts && <p className="caption text-gray-bold/75">{excerpt}</p>}
              </li>
            ))}
          </ul>
        )}
      </Preview>
    </>
  );
}

export function ProjectPermissionsExample() {
  const [readOnly, setReadOnly] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState(false);

  return (
    <>
      <ExampleCheckbox label="Modo de solo lectura" checked={readOnly} onCheckedChange={setReadOnly} />
      {/* Base UI puede conservar deshabilitados los activadores que se montaron en modo de solo lectura. */}
      <Menubar key={readOnly ? "read-only" : "editing"} aria-label="Edición del proyecto" disabled={readOnly}>
        <CommandMenu label="Estado">
          <MenuItem onClick={() => setCompleted((value) => !value)}>
            {completed ? "Reabrir proyecto" : "Marcar como completado"}
          </MenuItem>
        </CommandMenu>
        <CommandMenu label="Prioridad">
          <MenuItem onClick={() => setPriority((value) => !value)}>
            {priority ? "Restablecer prioridad" : "Marcar como prioritario"}
          </MenuItem>
        </CommandMenu>
      </Menubar>
      <Preview title="Proyecto de inventario">
        <dl className="space-y-1">
          <div className="flex justify-between gap-2"><dt>Estado</dt><dd>{completed ? "Completado" : "En curso"}</dd></div>
          <div className="flex justify-between gap-2"><dt>Prioridad</dt><dd>{priority ? "Alta" : "Normal"}</dd></div>
        </dl>
      </Preview>
    </>
  );
}
