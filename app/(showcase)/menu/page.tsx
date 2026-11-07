import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ActionsExample,
  CheckboxExample,
  ControlledExample,
  FilterExample,
  LinkExample,
  RadioExample,
  SharedMenuExample,
  SubmenuExample,
} from "./examples";

function Behavior({ title, description, children }: {
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
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">{children}</div>
      </div>
    </section>
  );
}

export default function MenuShowcasePage() {
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
              <h1 className="h1">Menu</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/menu
              </span>
            </div>
            <p className="subtitle">Acciones, enlaces y preferencias que se despliegan desde un botón.</p>
          </header>
        </div>

        <Behavior title="Acciones de un documento" description={<>Agrupa las acciones de edición con <code>MenuGroup</code> y habilita «Quitar la copia» después de crearla.</>}>
          <ActionsExample />
        </Behavior>
        <Behavior title="Opción con casilla" description={<>Muestra u oculta los detalles con <code>MenuCheckboxItem</code> mientras el menú permanece abierto.</>}>
          <CheckboxExample />
        </Behavior>
        <Behavior title="Orden exclusivo" description={<>Cambia el orden de la lista con <code>MenuRadioGroup</code> y una opción activa a la vez.</>}>
          <RadioExample />
        </Behavior>
        <Behavior title="Submenú de destinos" description={<>Agrupa las carpetas en <code>MenuSubmenu</code> y abre sus opciones con el puntero o con la flecha derecha.</>}>
          <SubmenuExample />
        </Behavior>
        <Behavior title="Apertura controlada" description={<>Coordina el activador y un botón externo con <code>open</code>, <code>onOpenChange</code> y <code>modal={"{false}"}</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Enlaces anclados al activador" description={<>Navega con <code>MenuLinkItem</code> compuesto con <code>Link</code> y señala el botón de origen con <code>MenuArrow</code>.</>}>
          <LinkExample />
        </Behavior>
        <Behavior title="Activadores compartidos" description={<>Usa <code>createMenuHandle</code> para abrir el mismo menú con un contenido distinto según el <code>payload</code> de cada botón.</>}>
          <SharedMenuExample />
        </Behavior>
        <Behavior title="Búsqueda de componentes" description={<>Filtra los enlaces por nombre con <code>MenuFilterProvider</code> y recorre las coincidencias con las flechas.</>}>
          <FilterExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
