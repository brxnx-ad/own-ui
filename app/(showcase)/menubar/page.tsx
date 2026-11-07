import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  DocumentEditorExample,
  FilePanelExample,
  InboxExample,
  ProjectPermissionsExample,
  ReportSectionsExample,
} from "./examples";

function Behavior({ title, description, children }: {
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
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">{children}</div>
      </div>
    </section>
  );
}

export default function MenubarShowcasePage() {
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
              <h1 className="h1">Menubar</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/menubar
              </span>
            </div>
            <p className="subtitle">Una barra de comandos que coordina la apertura y el foco de varios menús.</p>
          </header>
        </div>

        <Behavior title="Comandos de un editor" description={<>Abre Archivo y usa <kbd>→</kbd> o el puntero para pasar a Formato y Vista, donde puedes modificar la vista previa.</>}>
          <DocumentEditorExample />
        </Behavior>
        <Behavior title="Herramientas en un panel lateral" description={<>Con <code>{'orientation="vertical"'}</code>, usa <kbd>↑</kbd> y <kbd>↓</kbd> para pasar de Ordenar a Columnas y ajustar la tabla de archivos.</>}>
          <FilePanelExample />
        </Behavior>
        <Behavior title="Recorrido por secciones de un informe" description={<>Enfoca Anexo y pulsa <kbd>→</kbd> con la casilla desmarcada y marcada para comprobar cuándo <code>loopFocus</code> devuelve el foco a Resumen.</>}>
          <ReportSectionsExample />
        </Behavior>
        <Behavior title="Acciones junto a un menú abierto" description={<>Abre Filtro y pulsa «Mostrar extractos» con la casilla desmarcada y marcada para ver cómo <code>modal</code> afecta al botón exterior.</>}>
          <InboxExample />
        </Behavior>
        <Behavior title="Comandos en una vista de solo lectura" description={<>Desmarca «Modo de solo lectura» para retirar <code>disabled</code> de la barra y cambiar el estado o la prioridad del proyecto.</>}>
          <ProjectPermissionsExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
