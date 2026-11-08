import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/own/base/progress";
import { Anatomy, ApiReference } from "./api-reference";
import { BatchExample, IndeterminateExample } from "./examples";

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

export default function ProgressShowcasePage() {
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
              <h1 className="h1">Progress</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-gray-bold">
                @base-ui/react/progress
              </span>
            </div>
            <p className="subtitle">Barra de progreso para tareas con avance conocido o duración aún indeterminada.</p>
          </header>
        </div>
        <Behavior title="Avance determinado" description={<>Usa <code>value</code> para indicar cuánto ha avanzado la tarea y muestra el porcentaje con <code>ProgressValue</code>.</>}>
          <Progress value={64} locale="es-CL">
            <ProgressLabel>Exportación del informe</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </Behavior>
        <Behavior title="Rango y unidades" description={<>Representa una copia reanudada entre <code>{'min={1}'}</code> y <code>{'max={4}'}</code> y muestra los gigabytes copiados con <code>format</code>.</>}>
          <Progress value={2.5} min={1} max={4} locale="es-CL" format={{ style: "unit", unit: "gigabyte" }}>
            <ProgressLabel>Datos copiados</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </Behavior>
        <Behavior title="Avance indeterminado" description={<>Usa <code>{'value={null}'}</code> mientras calculas el avance y cambia a un valor numérico cuando tengas una estimación.</>}>
          <IndeterminateExample />
        </Behavior>
        <Behavior title="Procesamiento por lotes" description={<>Procesa lotes para actualizar <code>value</code> y anunciar la cantidad con <code>getAriaValueText</code>.</>}>
          <BatchExample />
        </Behavior>
        <Behavior title="Tarea completada" description={<>Cuando <code>value</code> alcanza <code>max</code>, la barra se llena y el indicador usa el color de éxito con <code>data-complete</code>.</>}>
          <Progress value={100} locale="es-CL">
            <ProgressLabel>Sincronización completada</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
