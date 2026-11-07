import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { CityExample, ControlledExample, GroupedExample, LimitedResultsExample } from "./examples";

function Example({ title, description, children }: {
  title: string;
  description: ReactNode;
  children: ReactNode;
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

export default function AutocompleteShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Autocomplete</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/autocomplete
              </span>
            </div>
            <p className="subtitle">Campo de texto libre con sugerencias que se actualizan al escribir.</p>
          </header>
        </div>

        <Example title="Sugerencias al escribir" description={<>Filtra las ciudades de <code>items</code> mientras escribes y conserva cualquier texto personalizado.</>}>
          <CityExample />
        </Example>
        <Example title="Sugerencia en línea" description={<>Previsualiza la opción resaltada dentro del campo al navegar con las flechas con <code>{'mode="both"'}</code>.</>}>
          <CityExample mode="both" />
        </Example>
        <Example title="Sugerencias agrupadas" description={<>Organiza los destinos de <code>items</code> en secciones con <code>AutocompleteGroup</code>.</>}>
          <GroupedExample />
        </Example>
        <Example title="Valor controlado" description={<>Sincroniza el campo con <code>value</code> y <code>onValueChange</code> para restablecerlo desde un botón externo.</>}>
          <ControlledExample />
        </Example>
        <Example title="Límite de sugerencias" description={<>Busca «1000» en un catálogo de 1.000 productos que muestra hasta 20 coincidencias con <code>{"limit={20}"}</code>.</>}>
          <LimitedResultsExample />
        </Example>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
