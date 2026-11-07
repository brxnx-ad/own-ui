import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BasicExample,
  BlurExample,
  ChangeExample,
  ControlledExample,
  DisabledExample,
  ExternalErrorExample,
  ItemsExample,
  SubmitExample,
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
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </section>
  );
}

export default function FieldShowcasePage() {
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
              <h1 className="h1">Field</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/field
              </span>
            </div>
            <p className="subtitle">Campos de formulario con etiquetas, descripciones y mensajes de validación asociados.</p>
          </header>
        </div>
        <Behavior title="Etiqueta y descripción" description={<>Pulsa <code>FieldLabel</code> para enfocar el control asociado y consulta la ayuda de <code>FieldDescription</code>.</>}>
          <BasicExample />
        </Behavior>
        <Behavior title="Validación al enviar" description={<>Guarda un correo vacío o con formato incorrecto para ver cómo <code>match</code> elige el mensaje en <code>onSubmit</code>.</>}>
          <SubmitExample />
        </Behavior>
        <Behavior title="Validación al salir" description={<>Escribe un código postal incompleto y sal del control para validarlo con <code>onBlur</code>.</>}>
          <BlurExample />
        </Behavior>
        <Behavior title="Validación mientras se escribe" description={<>Escribe un alias para validarlo con <code>validate</code> tras la pausa de <code>validationDebounceTime</code> y mostrar el resultado con <code>FieldValidity</code>.</>}>
          <ChangeExample />
        </Behavior>
        <Behavior title="Área de texto controlada" description={<>Usa <code>render</code> para editar una nota en un <code>textarea</code> y actualiza el contador con <code>value</code> y <code>onValueChange</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Error externo" description={<>Intenta registrar el código existente y modifica el valor para quitar el error que <code>Form</code> asocia al campo por nombre.</>}>
          <ExternalErrorExample />
        </Behavior>
        <Behavior title="Opciones con etiquetas propias" description={<>Agrupa casillas con <code>FieldItem</code> para dar una etiqueta y descripción a cada opción, incluida una opción deshabilitada.</>}>
          <ItemsExample />
        </Behavior>
        <Behavior title="Campo deshabilitado" description={<>Usa <code>disabled</code> en la raíz para deshabilitar el control y atenuar la etiqueta y la descripción.</>}>
          <DisabledExample />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
