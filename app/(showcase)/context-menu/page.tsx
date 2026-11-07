import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ActionsExample,
  CheckboxExample,
  ControlledExample,
  LinkExample,
  RadioExample,
  SubmenuExample,
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

export default function ContextMenuShowcasePage() {
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
              <h1 className="h1">Context Menu</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/context-menu
              </span>
            </div>
            <p className="subtitle">Acciones asociadas a un elemento que aparecen al invocar su menú contextual.</p>
          </header>
        </div>

        <Behavior title="Acciones contextuales" description={<>Abre el menú desde el área con clic secundario, pulsación prolongada o <kbd>Mayús</kbd> + <kbd>F10</kbd>.</>}>
          <ActionsExample />
        </Behavior>
        <Behavior title="Opción con casilla" description={<>Cambia una preferencia con <code>checked</code> y <code>onCheckedChange</code> mientras el menú permanece abierto.</>}>
          <CheckboxExample />
        </Behavior>
        <Behavior title="Selección exclusiva" description={<>Usa <code>ContextMenuRadioGroup</code> para elegir una sola densidad de lista.</>}>
          <RadioExample />
        </Behavior>
        <Behavior title="Submenú" description={<>Agrupa los destinos en <code>ContextMenuSubmenu</code> y abre sus opciones con el puntero o la flecha derecha.</>}>
          <SubmenuExample />
        </Behavior>
        <Behavior title="Apertura controlada" description={<>Comparte <code>open</code> y <code>onOpenChange</code> con un botón visible que también sirve de <code>anchor</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Enlace de navegación" description={<>Compón <code>ContextMenuLinkItem</code> con <code>Link</code> para navegar a otra página del catálogo.</>}>
          <LinkExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
