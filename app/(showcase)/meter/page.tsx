import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/own/base/meter";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { CustomValueExample, ThresholdMeterExample } from "./examples";

function Behavior({
  title,
  description,
  children,
}: {
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

export default function MeterShowcasePage() {
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
              <h1 className="h1">Meter</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/meter
              </span>
            </div>
            <p className="subtitle">
              Representación gráfica de un valor escalar dentro de un rango
              conocido.
            </p>
          </header>
        </div>

        <Behavior
          title="Porcentaje con etiqueta y valor"
          description={
            <>
              Asocia <code>MeterLabel</code> a la raíz y presenta el porcentaje
              calculado entre <code>0</code> y <code>100</code> con{" "}
              <code>MeterValue</code>.
            </>
          }
        >
          <Meter value={64} locale="es-AR">
            <MeterLabel>Almacenamiento utilizado</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </Behavior>

        <Behavior
          title="Rango y formato de unidades"
          description={
            <>
              Define una escala propia con <code>min</code> y <code>max</code>{" "}
              y formatea la magnitud mediante <code>format</code> y{" "}
              <code>locale</code>.
            </>
          }
        >
          <Meter
            value={340}
            min={0}
            max={500}
            locale="es-AR"
            format={{
              style: "unit",
              unit: "gigabyte",
              unitDisplay: "short",
            }}
          >
            <MeterLabel>Volumen de copias de seguridad</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </Behavior>

        <Behavior
          title="Texto visible y accesible personalizados"
          description={
            <>
              Personaliza la lectura en pantalla con la función hija de{" "}
              <code>MeterValue</code> y detalla el anuncio para lectores de
              pantalla con <code>getAriaValueText</code>.
            </>
          }
        >
          <CustomValueExample />
        </Behavior>

        <Behavior
          title="Umbrales cromáticos dinámicos"
          description={
            <>
              Cambia el nivel de carga para observar la transición de ancho y
              color semántico en <code>MeterIndicator</code>.
            </>
          }
        >
          <ThresholdMeterExample />
        </Behavior>

        <Behavior
          title="Medidor sin etiqueta visible"
          description={
            <>
              Cuando el contexto adyacente ya identifica la métrica, omite{" "}
              <code>MeterLabel</code> y nombra la raíz con{" "}
              <code>aria-label</code>.
            </>
          }
        >
          <Meter value={82} locale="es-AR" aria-label="Batería restante">
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
