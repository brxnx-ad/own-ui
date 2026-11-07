import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BasicExample,
  ControlledExample,
  DetachedTriggersExample,
  ExplicitDismissalExample,
  NestedExample,
  NonModalExample,
  PersistenceExample,
  ScrollableExample,
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
      <div className="flex flex-col items-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function DialogShowcasePage() {
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
              <h1 className="h1">Dialog</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/dialog
              </span>
            </div>
            <p className="subtitle">Ventanas modales y no modales para editar datos y consultar contenido.</p>
          </header>
        </div>
        <Behavior title="Consulta modal" description="Abre los detalles y ciérralos con el botón Cerrar, Escape o un clic en el fondo.">
          <BasicExample />
        </Behavior>
        <Behavior title="Edición controlada" description={<>Gestiona la apertura con <code>open</code> y <code>onOpenChange</code>, y enfoca el campo con <code>initialFocus</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Cierre con botón o Escape" description={<>Mantiene abierta la ventana al pulsar el fondo con <code>disablePointerDismissal</code>.</>}>
          <ExplicitDismissalExample />
        </Behavior>
        <Behavior title="Ayuda no modal" description={<>Permite accionar el botón exterior mientras se muestra la ayuda con <code>modal={"{false}"}</code> y sin backdrop.</>}>
          <NonModalExample />
        </Behavior>
        <Behavior title="Conservar un borrador" description={<>Mantiene el texto del campo entre aperturas con <code>keepMounted</code> en el portal.</>}>
          <PersistenceExample />
        </Behavior>
        <Behavior title="Un diálogo, varios activadores" description={<>Conecta los botones externos mediante <code>handle</code> y muestra el informe elegido con <code>payload</code>.</>}>
          <DetachedTriggersExample />
        </Behavior>
        <Behavior title="Diálogos anidados" description="Abre la fórmula desde la ficha y usa Escape para cerrar primero la ventana superior.">
          <NestedExample />
        </Behavior>
        <Behavior title="Contenido desplazable" description="Desplaza la lista de criterios dentro del diálogo mientras el título y el botón de cierre siguen visibles.">
          <ScrollableExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
