import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AlignmentExample,
  AnchoredExample,
  ControlledExample,
  DisabledExample,
  FormExample,
  GroupedExample,
  MultipleExample,
  ReadOnlyExample,
  ScrollExample,
  SingleExample,
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
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto grid w-full max-w-xs gap-2">{children}</div>
      </div>
    </section>
  );
}

export default function SelectShowcasePage() {
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
              <h1 className="h1">Select</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/select
              </span>
            </div>
            <p className="subtitle">Selección de una o varias opciones predefinidas desde un panel desplegable.</p>
          </header>
        </div>

        <Behavior title="Selección individual" description={<>Muestra un <code>placeholder</code> antes de elegir un formato y usa <code>items</code> para mostrar su etiqueta.</>}>
          <SingleExample />
        </Behavior>
        <Behavior title="Opciones agrupadas" description={<>Organiza las opciones con <code>SelectGroup</code> y marca las que no estén disponibles con <code>disabled</code>.</>}>
          <GroupedExample />
        </Behavior>
        <Behavior title="Selección múltiple" description={<>Con <code>multiple</code>, activa o desactiva varios canales sin cerrar el panel.</>}>
          <MultipleExample />
        </Behavior>
        <Behavior title="Valor controlado" description={<>Comparte <code>value</code> y <code>onValueChange</code> para elegir desde el panel o restablecer desde fuera.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Alineación con la opción" description={<>Abre con el puntero y usa <code>alignItemWithTrigger</code> para superponer el texto de la opción seleccionada con el del activador cuando haya espacio.</>}>
          <AlignmentExample />
        </Behavior>
        <Behavior title="Posición y flecha" description={<>Coloca el panel sobre el activador con <code>{'side="top"'}</code> y señala el anclaje con <code>SelectArrow</code>.</>}>
          <AnchoredExample />
        </Behavior>
        <Behavior title="Lista desplazable" description={<>Recorre las semanas con el teclado, la rueda o pasando el puntero por las flechas de desplazamiento.</>}>
          <ScrollExample />
        </Behavior>
        <Behavior title="Solo lectura" description={<>Con <code>readOnly</code>, consulta las opciones conservando el valor asignado.</>}>
          <ReadOnlyExample />
        </Behavior>
        <Behavior title="Control deshabilitado" description={<>Aplica <code>disabled</code> a la raíz para impedir la apertura y la interacción.</>}>
          <DisabledExample />
        </Behavior>
        <Behavior title="Validación y envío" description={<>Combina <code>required</code> con <code>Field</code> y lee el valor enviado con <code>FormData.get()</code>.</>}>
          <FormExample />
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
