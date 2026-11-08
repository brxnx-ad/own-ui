import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Separator } from "@/components/own/base/separator";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";

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
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </section>
  );
}

export default function SeparatorShowcasePage() {
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
              <h1 className="h1">Separator</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">
                @base-ui/react/separator
              </span>
            </div>
            <p className="subtitle">División horizontal o vertical entre grupos de contenido.</p>
          </header>
        </div>

        <Example title="Separación entre bloques" description={<>Inserta <code>Separator</code> entre bloques apilados para marcar una división horizontal.</>}>
          <div className="grid gap-4">
            <div className="space-y-1">
              <h3 className="h5">Resumen del pedido</h3>
              <p className="body-sm text-gray-bold/75">Tres productos confirmados.</p>
            </div>
            <Separator />
            <div className="space-y-1">
              <h3 className="h5">Entrega</h3>
              <p className="body-sm text-gray-bold/75">Retiro en tienda desde el jueves.</p>
            </div>
          </div>
        </Example>

        <Example title="Separación entre columnas" description={<>Usa <code>{'orientation="vertical"'}</code> para que la línea cubra el alto de la fila.</>}>
          <div className="flex gap-3 sm:gap-5">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="h5">En curso</h3>
              <p className="body-sm text-gray-bold/75">3 tareas</p>
            </div>
            <Separator orientation="vertical" />
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="h5">Terminadas</h3>
              <p className="body-sm text-gray-bold/75">8 tareas</p>
            </div>
          </div>
        </Example>

        <Example title="División decorativa" description={<>Añade <code>aria-hidden</code> si la línea solo separa elementos visualmente.</>}>
          <div className="body-sm flex justify-center gap-3 text-gray-bold/75">
            <span>Guía de diseño</span>
            <Separator orientation="vertical" aria-hidden />
            <span>4 min de lectura</span>
          </div>
        </Example>

        <Example title="Cambio de tema en un texto" description={<>Usa <code>{'render={<hr />}'}</code> para representar un cambio temático con el elemento HTML correspondiente.</>}>
          <div className="body-sm grid gap-4">
            <p>La primera prueba confirmó el diseño.</p>
            <Separator render={<hr />} />
            <p>Al día siguiente comenzó la revisión de accesibilidad.</p>
          </div>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
