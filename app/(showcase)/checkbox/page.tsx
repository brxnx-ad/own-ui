import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, IndeterminateExample } from "./examples";

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
      <div className="flex flex-col items-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function CheckboxShowcasePage() {
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
              <h1 className="h1">Checkbox</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/checkbox
              </span>
            </div>
            <p className="subtitle">
              Casilla para seleccionar una opción y representar selecciones parciales.
            </p>
          </header>
        </div>

        <Behavior
          title="Selección individual"
          description={<>Empieza con la casilla marcada mediante <code>defaultChecked</code> y cámbiala con la etiqueta o la tecla Espacio.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked><CheckboxIndicator /></Checkbox>
            Enviarme un resumen semanal
          </label>
        </Behavior>

        <Behavior
          title="Estado controlado"
          description={<>Sincroniza la casilla y el botón con <code>checked</code> y <code>onCheckedChange</code>.</>}
        >
          <ControlledExample />
        </Behavior>

        <Behavior
          title="Selección parcial"
          description={<>Representa una selección parcial con <code>indeterminate</code> y resuélvela al activar la casilla.</>}
        >
          <IndeterminateExample />
        </Behavior>

        <Behavior
          title="Deshabilitación"
          description={<>Usa <code>disabled</code> para bloquear el control y omitirlo del recorrido con Tab.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked disabled><CheckboxIndicator /></Checkbox>
            Exportación incluida en el plan
          </label>
        </Behavior>

        <Behavior
          title="Solo lectura"
          description={<>Con <code>readOnly</code>, la casilla admite foco y conserva su valor al intentar cambiarla.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked readOnly><CheckboxIndicator /></Checkbox>
            Preferencia administrada por el equipo
          </label>
        </Behavior>

        <Behavior
          title="Envío de formulario"
          description={<>Exige una confirmación con <code>required</code> y envía la preferencia opcional mediante <code>value</code> o <code>uncheckedValue</code>.</>}
        >
          <FormExample />
        </Behavior>

        <Behavior
          title="Etiqueta separada"
          description={<>Vincula <code>htmlFor</code> con <code>id</code> al renderizar la raíz como botón mediante <code>nativeButton</code> y <code>render</code>.</>}
        >
          <div className="flex items-center gap-2.5 body-sm">
            <Checkbox id="checkbox-archive" nativeButton render={<button type="button" />}>
              <CheckboxIndicator />
            </Checkbox>
            <label htmlFor="checkbox-archive">Incluir elementos archivados</label>
          </div>
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
