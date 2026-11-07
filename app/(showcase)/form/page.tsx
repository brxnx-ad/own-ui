import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ActionExample, ImperativeValidationExample, NativeDataExample, SubmitExample, ValidationModeExample } from "./examples";

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

export default function FormShowcasePage() {
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
              <h1 className="h1">Form</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/form
              </span>
            </div>
            <p className="subtitle">Formularios con envío, validación coordinada y errores por campo.</p>
          </header>
        </div>
        <Behavior title="Envío de valores registrados" description={<>Intenta guardar con campos vacíos para ver dónde se mueve el foco y completa los datos para recibirlos con <code>onFormSubmit</code>.</>}>
          <SubmitExample />
        </Behavior>
        <Behavior title="Validación por formulario y por campo" description={<>Escribe una sola letra en ambos campos para comparar el <code>onBlur</code> heredado con el <code>onChange</code> del segundo campo.</>}>
          <ValidationModeExample />
        </Behavior>
        <Behavior title="Acción de servidor y errores externos" description={<>Comprueba un código con <code>action</code> para ver cómo <code>errors</code> asocia al campo la respuesta del servidor.</>}>
          <ActionExample />
        </Behavior>
        <Behavior title="Validación imperativa" description={<>Usa <code>actionsRef</code> para validar solo el proyecto o todos los campos sin enviar el formulario.</>}>
          <ImperativeValidationExample />
        </Behavior>
        <Behavior title="Valores nativos con FormData" description={<>Selecciona ambos destinatarios y envía para leer los valores repetidos con <code>onSubmit</code> y <code>FormData.getAll</code>.</>}>
          <NativeDataExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
