import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import { Input } from "@/components/own/base/input";
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

export default function InputShowcasePage() {
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
              <h1 className="h1">Input</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/input
              </span>
            </div>
            <p className="subtitle">Control nativo para editar una línea de texto con una etiqueta HTML o dentro de Field.</p>
          </header>
        </div>
        <Behavior title="Texto editable" description={<>Escribe en el campo para modificar el contenido inicial que establece <code>defaultValue</code>.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Nombre del informe</span>
            <Input name="reportName" defaultValue="Resumen semanal" />
          </label>
        </Behavior>
        <Behavior title="Valor controlado" description={<>Escribe un término y bórralo con el botón para cambiar el mismo <code>value</code> desde ambos controles.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Validación con Field" description={<>Escribe un correo incompleto y sal del campo para ver la validación con <code>{'validationMode="onBlur"'}</code>.</>}>
          <Field name="email" validationMode="onBlur">
            <FieldLabel>Correo de contacto</FieldLabel>
            <Input type="email" autoComplete="email" placeholder="nombre@dominio.cl" required />
            <FieldDescription>Usa la dirección donde recibirás el informe.</FieldDescription>
            <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
            <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
          </Field>
        </Behavior>
        <Behavior title="Solo lectura" description={<>Selecciona y copia el valor del campo protegido por <code>readOnly</code>.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Código asignado</span>
            <Input name="reportCode" defaultValue="INF-2048" readOnly />
          </label>
        </Behavior>
        <Behavior title="Entrada deshabilitada" description={<>Usa <code>disabled</code> para impedir la edición y omitir el campo al recorrer el formulario con Tab.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Fuente de datos</span>
            <Input name="source" defaultValue="Registro central" disabled />
          </label>
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
