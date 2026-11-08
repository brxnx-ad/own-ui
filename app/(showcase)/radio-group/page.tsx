import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Radio, RadioGroup, RadioIndicator } from "@/components/own/base/radio-group";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, RadioOption } from "./examples";

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
      <div className="flex justify-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function RadioGroupShowcasePage() {
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
              <h1 className="h1">Radio Group</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/radio-group
              </span>
            </div>
            <p className="subtitle">Selección de una opción entre varias alternativas, con navegación por teclado y envío de formulario.</p>
          </header>
        </div>
        <Behavior title="Selección exclusiva" description={<>Parte de <code>defaultValue</code> y elige otra opción con el puntero o las flechas para cambiar la selección.</>}>
          <RadioGroup aria-labelledby="radio-channel-label" defaultValue="correo">
            <p id="radio-channel-label" className="body-sm font-semibold">Canal de notificación</p>
            <RadioOption value="correo" label="Correo electrónico" />
            <RadioOption value="sms" label="SMS" />
            <RadioOption value="app" label="Notificación en la app" />
          </RadioGroup>
        </Behavior>
        <Behavior title="Opción deshabilitada" description={<>Aplica <code>disabled</code> a una opción agotada y usa las flechas para recorrer las alternativas disponibles.</>}>
          <RadioGroup aria-labelledby="radio-shift-label" defaultValue="manana">
            <p id="radio-shift-label" className="body-sm font-semibold">Turno de retiro</p>
            <RadioOption value="manana" label="Mañana" />
            <RadioOption value="tarde" label="Tarde · Sin cupos" disabled />
            <RadioOption value="noche" label="Noche" />
          </RadioGroup>
        </Behavior>
        <Behavior title="Grupo deshabilitado" description={<>Aplica <code>disabled</code> a la raíz para deshabilitar todas sus opciones.</>}>
          <RadioGroup aria-labelledby="radio-export-label" defaultValue="pdf" disabled>
            <p id="radio-export-label" className="body-sm font-semibold">Formato de exportación</p>
            <RadioOption value="pdf" label="PDF" />
            <RadioOption value="csv" label="CSV" />
          </RadioGroup>
        </Behavior>
        <Behavior title="Solo lectura" description={<>Con <code>readOnly</code> puedes recorrer las opciones con las flechas y consultar la selección guardada.</>}>
          <RadioGroup aria-labelledby="radio-frequency-label" defaultValue="semanal" readOnly>
            <p id="radio-frequency-label" className="body-sm font-semibold">Frecuencia del informe</p>
            <RadioOption value="diaria" label="Diaria" />
            <RadioOption value="semanal" label="Semanal" />
          </RadioGroup>
        </Behavior>
        <Behavior title="Valor controlado" description={<>Comparte <code>value</code> y <code>onValueChange</code> para actualizar la selección numérica desde el grupo o desde el botón externo.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Validación y envío" description={<>Usa <code>required</code> con <code>Field</code> para exigir una selección y lee el valor enviado mediante <code>FormData.get()</code>.</>}>
          <FormExample />
        </Behavior>
        <Behavior title="Botón nativo" description={<>Usa <code>nativeButton</code> y <code>render</code> para vincular un botón a una etiqueta hermana mediante <code>htmlFor</code>.</>}>
          <RadioGroup aria-labelledby="radio-priority-label" defaultValue="normal">
            <p id="radio-priority-label" className="body-sm font-semibold">Prioridad de atención</p>
            <div className="flex min-h-8 items-center gap-2.5">
              <Radio id="radio-priority-normal" value="normal" nativeButton render={<button type="button" />}>
                <RadioIndicator />
              </Radio>
              <label htmlFor="radio-priority-normal" className="body-sm cursor-pointer">Normal</label>
            </div>
            <div className="flex min-h-8 items-center gap-2.5">
              <Radio id="radio-priority-alta" value="alta" nativeButton render={<button type="button" />}>
                <RadioIndicator />
              </Radio>
              <label htmlFor="radio-priority-alta" className="body-sm cursor-pointer">Alta</label>
            </div>
          </RadioGroup>
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
