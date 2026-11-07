import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { BasicExample, ComposedExample, NestedExample, SubmissionExample } from "./examples";

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
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}

export default function FieldsetShowcasePage() {
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
              <h1 className="h1">Fieldset</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/fieldset
              </span>
            </div>
            <p className="subtitle">Grupos de controles con un nombre accesible y deshabilitación compartida.</p>
          </header>
        </div>
        <Behavior title="Controles con un nombre común" description={<>Agrupa nombre y correo bajo <code>FieldsetLegend</code> y conserva una etiqueta individual para cada control.</>}>
          <BasicExample />
        </Behavior>
        <Behavior title="Deshabilitación y envío" description={<>Envía el formulario con y sin <code>disabled</code> para ver cuándo se incluye el valor del grupo.</>}>
          <SubmissionExample />
        </Behavior>
        <Behavior title="Grupos anidados" description={<>Pausa la edición para deshabilitar ambos grupos aunque el interior tenga <code>disabled={"{false}"}</code>.</>}>
          <NestedExample />
        </Behavior>
        <Behavior title="Composición con Checkbox Group" description={<>Usa <code>render</code> para componer el grupo de casillas y convertir su leyenda en un encabezado.</>}>
          <ComposedExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
