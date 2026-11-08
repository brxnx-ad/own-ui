import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Toolbar, ToolbarButton, ToolbarInput, ToolbarLink, ToolbarSeparator } from "@/components/own/base/toolbar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { DisabledItemsExample, FormattingExample, HistoryExample, MenuExample, SearchExample, VerticalExample } from "./examples";

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

export default function ToolbarShowcasePage() {
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
              <h1 className="h1">Toolbar</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">@base-ui/react/toolbar</span>
            </div>
            <p className="subtitle">Agrupa herramientas y recorre sus controles con las flechas.</p>
          </header>
        </div>

        <Example title="Acciones agrupadas" description={<>Reúne las acciones de historial en <code>ToolbarGroup</code> y sepáralas de la acción de restablecer con <code>ToolbarSeparator</code>.</>}>
          <HistoryExample />
        </Example>

        <Example title="Selección de formatos" description={<>Compón un <code>ToggleGroup</code> dentro de la barra para conservar su selección y recorrer sus botones junto al resto de herramientas.</>}>
          <FormattingExample />
        </Example>

        <Example title="Campo al final de la barra" description={<>Escribe en <code>ToolbarInput</code> y usa las flechas para mover el cursor dentro del texto o salir del campo al llegar a su extremo.</>}>
          <SearchExample />
        </Example>

        <Example title="Menú desde la barra" description={<>Pasa <code>{'render={<MenuTrigger />}'}</code> a <code>ToolbarButton</code> para abrir el menú desde un control de la barra.</>}>
          <MenuExample />
        </Example>

        <Example title="Enlaces internos" description={<>Compón <code>ToolbarLink</code> con <code>Link</code> de Next.js para conservar la navegación del sitio y el recorrido de foco.</>}>
          <Toolbar aria-label="Referencias relacionadas">
            <ToolbarLink render={<Link href="/toggle" />}>Ver Toggle</ToolbarLink>
            <ToolbarLink render={<Link href="/toggle-group" />}>Ver Toggle Group</ToolbarLink>
          </Toolbar>
        </Example>

        <Example title="Orientación vertical" description={<>Usa <code>{'orientation="vertical"'}</code> para recorrer la columna con las flechas arriba y abajo y <code>{'loopFocus={false}'}</code> para detenerte en los extremos.</>}>
          <VerticalExample />
        </Example>

        <Example title="Deshabilitación y foco" description={<>Deshabilita un subgrupo y usa <code>{'focusableWhenDisabled={false}'}</code> para que las flechas omitan la acción Eliminar.</>}>
          <DisabledItemsExample />
        </Example>

        <Example title="Barra deshabilitada" description={<>Deshabilita la edición desde la raíz. El campo conserva su valor y el enlace sigue disponible para consultar la referencia.</>}>
          <Toolbar aria-label="Informe de solo lectura" disabled>
            <ToolbarButton>Guardar</ToolbarButton>
            <ToolbarSeparator />
            <ToolbarLink render={<Link href="/input" />}>Ver Input</ToolbarLink>
            <ToolbarInput aria-label="Título protegido" defaultValue="Informe de auditoría" />
          </Toolbar>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
