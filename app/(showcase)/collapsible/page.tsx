import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/own/base/collapsible";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, PersistenceExample } from "./examples";

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
        <div className="mx-auto w-full max-w-xl">{children}</div>
      </div>
    </section>
  );
}

export default function CollapsibleShowcasePage() {
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
              <h1 className="h1">Collapsible</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/collapsible
              </span>
            </div>
            <p className="subtitle">Panel individual que se puede mostrar u ocultar mediante un activador.</p>
          </header>
        </div>

        <Behavior
          title="Detalles desplegables"
          description={<>Empieza con el contenido visible mediante <code>defaultOpen</code> y alterna el panel desde su activador.</>}
        >
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Detalles de entrega</CollapsibleTrigger>
            <CollapsiblePanel>El envío estándar tarda de tres a cinco días hábiles.</CollapsiblePanel>
          </Collapsible>
        </Behavior>

        <Behavior
          title="Estado controlado"
          description={<>Sincroniza el panel y el botón externo mediante <code>open</code> y <code>onOpenChange</code>.</>}
        >
          <ControlledExample />
        </Behavior>

        <Behavior
          title="Deshabilitación"
          description={<>Aplica <code>disabled</code> a la raíz para bloquear la interacción desde el activador.</>}
        >
          <Collapsible defaultOpen disabled>
            <CollapsibleTrigger>Detalle de la tarifa</CollapsibleTrigger>
            <CollapsiblePanel>El pedido incluye la tarifa de envío estándar.</CollapsiblePanel>
          </Collapsible>
        </Behavior>

        <Behavior
          title="Conservar contenido"
          description={<>Escribe una nota y cierra el panel para comprobar que <code>keepMounted</code> conserva su valor.</>}
        >
          <PersistenceExample />
        </Behavior>

        <Behavior
          title="Buscar contenido"
          description={<>Usa la búsqueda de la página y avanza hasta la coincidencia de «heliotropo» dentro del panel cerrado con <code>hiddenUntilFound</code>.</>}
        >
          <Collapsible>
            <CollapsibleTrigger>Ficha de la muestra</CollapsibleTrigger>
            <CollapsiblePanel hiddenUntilFound>La muestra identificada corresponde a un heliotropo.</CollapsiblePanel>
          </Collapsible>
        </Behavior>

        <Behavior
          title="Activador con otro elemento"
          description={<>Renderiza el activador como <code>span</code> y conserva el comportamiento de botón con <code>nativeButton=false</code>.</>}
        >
          <Collapsible>
            <CollapsibleTrigger render={<span />} nativeButton={false}>Requisitos de retiro</CollapsibleTrigger>
            <CollapsiblePanel>Presenta el comprobante al retirar el pedido.</CollapsiblePanel>
          </Collapsible>
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
