import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { FloatingInput } from "@/components/own/dependant/floating-input";
import { FieldDescription, FieldError } from "@/components/own/independant/field";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample } from "./examples";

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

export default function FloatingInputShowcasePage() {
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
              <h1 className="h1">FloatingInput</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                Input + Field · Base UI
              </span>
            </div>
            <p className="subtitle">Campo de texto cuya etiqueta sube al enfocar o cuando contiene un valor.</p>
          </header>
        </div>
        <Behavior title="Etiqueta interior" description={<>Enfoca el campo y escribe para ver cómo la variante <code>inset</code> coloca la etiqueta en una línea sobre el valor.</>}>
          <FloatingInput label="Nombre del informe" name="reportTitle" />
        </Behavior>
        <Behavior title="Etiqueta sobre el borde" description={<>Enfoca el campo para que la variante <code>outline</code> abra el borde superior alrededor de la etiqueta.</>}>
          <FloatingInput variant="outline" label="Código del informe" name="reportCode" />
        </Behavior>
        <Behavior title="Valor inicial" description={<>Con <code>defaultValue</code>, la etiqueta aparece arriba desde el inicio y se mantiene allí mientras haya texto.</>}>
          <FloatingInput variant="outline" label="Equipo responsable" name="team" defaultValue="Operaciones" />
        </Behavior>
        <Behavior title="Valor controlado" description={<>Escribe un término y bórralo con el botón para actualizar <code>value</code> y devolver el foco al campo.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Validación con Field" description={<>Escribe un correo incompleto y sal del campo para que <code>fieldProps.validationMode</code> active la validación.</>}>
          <FloatingInput variant="outline" label="Correo de contacto" name="email" type="email" required autoComplete="email" fieldProps={{ validationMode: "onBlur" }}>
            <FieldDescription>Usa la dirección donde recibirás el informe.</FieldDescription>
            <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
            <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
          </FloatingInput>
        </Behavior>
        <Behavior title="Campo deshabilitado" description={<>Con <code>disabled</code>, el control y su etiqueta se atenúan y Tab omite el campo.</>}>
          <FloatingInput variant="outline" label="Fuente de datos" name="source" defaultValue="Registro central" disabled />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
