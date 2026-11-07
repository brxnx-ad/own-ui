import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BottomExample,
  DirectionsExample,
  FormExample,
  GripPositionExample,
  IndentExample,
  NestedExample,
  NonModalExample,
  SnapExample,
  SwipeAreaExample,
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

export default function DrawerShowcasePage() {
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
              <h1 className="h1">Drawer</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/drawer
              </span>
            </div>
            <p className="subtitle">Paneles de borde con gestos de arrastre y alturas de ajuste.</p>
          </header>
        </div>
        <Behavior title="Hoja inferior" description="Abre el resumen y arrastra el asa hacia abajo para cerrarlo.">
          <BottomExample />
        </Behavior>
        <Behavior title="Entrada desde otros bordes" description={<>Elige el borde y el sentido de cierre con <code>swipeDirection</code>. El agarre aparece en el lado opuesto.</>}>
          <DirectionsExample />
        </Behavior>
        <Behavior title="Posición y borde del agarre" description={<>Coloca el agarre abajo u ocúltalo con <code>gripPosition</code>. Activa <code>showGripBorder</code> para añadir el separador.</>}>
          <GripPositionExample />
        </Behavior>
        <Behavior title="Edición controlada" description={<>Guarda la nota y cierra con <code>open</code> y <code>onOpenChange</code>, con ajuste al teclado virtual mediante <code>DrawerVirtualKeyboardProvider</code>.</>}>
          <FormExample />
        </Behavior>
        <Behavior title="Alturas de ajuste" description={<>Alterna entre los dos <code>snapPoints</code> arrastrando el asa o usando Ampliar y Reducir.</>}>
          <SnapExample />
        </Behavior>
        <Behavior title="Apertura por arrastre" description={<>Abre los accesos arrastrando <code>DrawerSwipeArea</code> hacia la izquierda o usando el botón.</>}>
          <SwipeAreaExample />
        </Behavior>
        <Behavior title="Guía no modal" description={<>Marca el registro desde la página sin cerrar la guía con <code>modal={"{false}"}</code> y <code>disablePointerDismissal</code>.</>}>
          <NonModalExample />
        </Behavior>
        <Behavior title="Paneles anidados" description="Abre el plan desde la ficha y usa Escape para cerrar primero el panel superior.">
          <NestedExample />
        </Behavior>
        <Behavior title="Cambio de escala del fondo" description={<>Coordina la vista previa y el panel con <code>DrawerProvider</code> y estiliza el fondo con <code>data-active</code>.</>}>
          <IndentExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
