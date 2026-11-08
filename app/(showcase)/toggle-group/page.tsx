import { ArrowLeft, Bold, Italic, Underline } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Toggle } from "@/components/own/independant/toggle";
import { ToggleGroup } from "@/components/own/independant/toggle-group";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, RequiredSelectionExample } from "./examples";

function Example({ title, description, children }: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="flex justify-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function ToggleGroupShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold">
              <ArrowLeft aria-hidden className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Toggle Group</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">@base-ui/react/toggle-group</span>
            </div>
            <p className="subtitle">Coordina la selección y el foco entre botones de dos estados.</p>
          </header>
        </div>

        <Example title="Selección única" description={<>Usa <code>defaultValue</code> para seleccionar una vista inicial y vuelve a pulsar la vista activa para limpiar la selección.</>}>
          <ToggleGroup aria-label="Vista de archivos" defaultValue={["list"]}>
            <Toggle size="sm" value="list">Lista</Toggle>
            <Toggle size="sm" value="cards">Tarjetas</Toggle>
            <Toggle size="sm" value="table">Tabla</Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Selección múltiple" description={<>Activa <code>multiple</code> para aplicar varios formatos a la vez.</>}>
          <ToggleGroup aria-label="Formato de texto" multiple defaultValue={["bold", "italic"]}>
            <Toggle value="bold" variant="ghost" iconOnly aria-label="Negrita"><Bold aria-hidden /></Toggle>
            <Toggle value="italic" variant="ghost" iconOnly aria-label="Cursiva"><Italic aria-hidden /></Toggle>
            <Toggle value="underline" variant="ghost" iconOnly aria-label="Subrayado"><Underline aria-hidden /></Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Selección controlada" description={<>Sincroniza <code>value</code> y <code>onValueChange</code> con los filtros de la lista y usa el botón externo para limpiarlos.</>}>
          <ControlledExample />
        </Example>

        <Example title="Orientación vertical" description={<>Configura <code>{'orientation="vertical"'}</code> para apilar las opciones y recorrerlas con las flechas arriba y abajo.</>}>
          <ToggleGroup aria-label="Escala de vista previa" orientation="vertical" defaultValue={["normal"]}>
            <Toggle size="sm" value="compact">Compacta</Toggle>
            <Toggle size="sm" value="normal">Normal</Toggle>
            <Toggle size="sm" value="wide">Amplia</Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Recorrido sin vuelta" description={<>Con <code>{'loopFocus={false}'}</code>, las flechas se detienen en los extremos. <kbd>Home</kbd> y <kbd>End</kbd> saltan al primero o al último.</>}>
          <ToggleGroup aria-label="Zoom del lienzo" loopFocus={false}>
            <Toggle size="sm" value="75">75 %</Toggle>
            <Toggle size="sm" value="100">100 %</Toggle>
            <Toggle size="sm" value="125">125 %</Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Opción deshabilitada" description={<>Aplica <code>disabled</code> a un <code>Toggle</code> para omitirlo al recorrer el grupo con las flechas.</>}>
          <ToggleGroup aria-label="Vistas de auditoría" defaultValue={["summary"]}>
            <Toggle size="sm" value="summary">Resumen</Toggle>
            <Toggle size="sm" value="history" disabled>Historial</Toggle>
            <Toggle size="sm" value="details">Detalles</Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Grupo deshabilitado" description={<>Deshabilita todos los botones desde <code>ToggleGroup</code> y conserva visible la selección.</>}>
          <ToggleGroup aria-label="Periodo de un informe cerrado" disabled defaultValue={["week"]}>
            <Toggle size="sm" value="week">Semana</Toggle>
            <Toggle size="sm" value="month">Mes</Toggle>
          </ToggleGroup>
        </Example>

        <Example title="Conservar una opción activa" description={<>Cancela el cambio con <code>details.cancel()</code> si el nuevo arreglo quedaría vacío.</>}>
          <RequiredSelectionExample />
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
