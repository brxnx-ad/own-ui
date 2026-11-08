import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/own/independant/slider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample } from "./examples";

function Example({ title, description, children }: {
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
        <div className="mx-auto w-full max-w-sm px-2">{children}</div>
      </div>
    </section>
  );
}

function Rail({ children = <SliderThumb /> }: { children?: ReactNode }) {
  return (
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        {children}
      </SliderTrack>
    </SliderControl>
  );
}

export default function SliderShowcasePage() {
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
              <h1 className="h1">Slider</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold">
                @base-ui/react/slider
              </span>
            </div>
            <p className="subtitle">Ajusta un valor o un intervalo numérico con puntero o teclado.</p>
          </header>
        </div>

        <Example title="Ajuste de un valor" description={<>Arrastra el control o usa las flechas para cambiar el volumen que muestra <code>SliderValue</code>.</>}>
          <Slider defaultValue={60} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Volumen</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </Example>

        <Example title="Rango de valores" description={<>Usa un <code>SliderThumb</code> por extremo y <code>minStepsBetweenValues</code> para mantener la diferencia mínima.</>}>
          <Slider defaultValue={[20000, 65000]} max={100000} step={5000} largeStep={10000} minStepsBetweenValues={2} thumbCollisionBehavior="none" locale="es-CL" format={{ style: "currency", currency: "CLP" }}>
            <SliderLabel>Presupuesto</SliderLabel>
            <SliderValue />
            <Rail>
              <SliderThumb index={0} aria-label="Presupuesto mínimo" />
              <SliderThumb index={1} aria-label="Presupuesto máximo" />
            </Rail>
          </Slider>
        </Example>

        <Example title="Pasos con marcas" description={<>Combina <code>{"step={25}"}</code> con marcas en la pista y usa <kbd>Page Up</kbd> o <kbd>Page Down</kbd> para avanzar de a <code>largeStep</code>.</>}>
          <Slider defaultValue={50} step={25} largeStep={50} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Brillo de la pantalla</SliderLabel>
            <SliderValue />
            <Rail>
              {[0, 25, 50, 75, 100].map((position) => (
                <span key={position} aria-hidden className="pointer-events-none absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-surface-bold" style={{ insetInlineStart: `calc(${position}% - 2px)` }} />
              ))}
              <SliderThumb />
            </Rail>
          </Slider>
        </Example>

        <Example title="Orientación vertical" description={<>Con <code>{'orientation="vertical"'}</code>, el valor aumenta hacia arriba.</>}>
          <Slider className="mx-auto max-w-40" orientation="vertical" defaultValue={45} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Nivel de luz</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </Example>

        <Example title="Alineación en el borde" description={<>Usa <code>{'thumbAlignment="edge"'}</code> y lleva el control a un extremo para ver cómo queda dentro de la pista.</>}>
          <Slider defaultValue={0} thumbAlignment="edge" locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Transparencia</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </Example>

        <Example title="Valor controlado" description={<>Sincroniza <code>value</code> y <code>onValueChange</code> para ajustar el zoom desde el control o restablecerlo con un botón.</>}>
          <ControlledExample />
        </Example>

        <Example title="Envío en un formulario" description={<>Asigna <code>name</code> al slider para aplicar el límite al enviar el formulario.</>}>
          <FormExample />
        </Example>

        <Example title="Control deshabilitado" description={<>Aplica <code>disabled</code> para mostrar un ajuste fijo sin permitir cambios.</>}>
          <Slider defaultValue={35} disabled locale="es-CL" format={{ style: "unit", unit: "percent" }}>
            <SliderLabel>Velocidad del ventilador</SliderLabel>
            <SliderValue />
            <Rail />
          </Slider>
        </Example>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
