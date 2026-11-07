import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ControlledExample,
  FormExample,
  GroupedExample,
  MultipleExample,
  PopupInputExample,
  SingleExample,
} from "./examples";

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
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </section>
  );
}

export default function ComboboxShowcasePage() {
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
              <h1 className="h1">Combobox</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/combobox
              </span>
            </div>
            <p className="subtitle">Busca y selecciona una o varias opciones de una lista.</p>
          </header>
        </div>

        <Behavior title="Selección única" description={<>Escribe para filtrar <code>items</code> y elige una opción con Enter o el puntero.</>}>
          <SingleExample />
        </Behavior>
        <Behavior title="Selección múltiple" description={<>Activa <code>multiple</code> y muestra las opciones elegidas como chips que se pueden quitar.</>}>
          <MultipleExample />
        </Behavior>
        <Behavior title="Estado controlado" description={<>Sincroniza la selección con <code>value</code> y <code>onValueChange</code> para restablecerla desde un botón externo.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Opciones agrupadas" description={<>Organiza los resultados con <code>ComboboxGroup</code> y conserva visibles las opciones deshabilitadas.</>}>
          <GroupedExample />
        </Behavior>
        <Behavior title="Búsqueda dentro del desplegable" description={<>Muestra la selección en el activador con <code>ComboboxValue</code> y coloca el campo de búsqueda dentro del panel.</>}>
          <PopupInputExample />
        </Behavior>
        <Behavior title="Envío de un identificador" description={<>Usa <code>createComboboxItems</code> para mostrar el nombre de cada bodega y enviar su código mediante <code>name</code>.</>}>
          <FormExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
