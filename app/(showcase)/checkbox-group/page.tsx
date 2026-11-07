import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, ParentExample, SelectionExample } from "./examples";

function Behavior({ title, description, children }: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
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

export default function CheckboxGroupShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Checkbox Group</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/checkbox-group
              </span>
            </div>
            <p className="subtitle">
              Coordina la selección de varias casillas relacionadas.
            </p>
          </header>
        </div>

        <Behavior
          title="Selección múltiple"
          description={<>Elige varias opciones a partir de la selección inicial definida por <code>defaultValue</code>.</>}
        >
          <SelectionExample />
        </Behavior>

        <Behavior
          title="Estado controlado"
          description={<>Comparte <code>value</code> y <code>onValueChange</code> para cambiar la selección desde las casillas o el botón externo.</>}
        >
          <ControlledExample />
        </Behavior>

        <Behavior
          title="Seleccionar todo"
          description={<>Vincula una casilla <code>parent</code> con <code>allValues</code> para alternar la selección del grupo y mostrar su estado parcial.</>}
        >
          <ParentExample />
        </Behavior>

        <Behavior
          title="Deshabilitación del grupo"
          description={<>Aplica <code>disabled</code> a la raíz para deshabilitar todas las casillas a la vez.</>}
        >
          <SelectionExample disabled />
        </Behavior>

        <Behavior
          title="Envío de formulario"
          description={<>Usa el mismo <code>name</code> en cada casilla y recupera los valores seleccionados con <code>FormData.getAll()</code>.</>}
        >
          <FormExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
