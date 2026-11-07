import Link from "next/link";
import { ArrowLeft, MoveHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/independant/field";
import {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  type NumberFieldProps,
} from "@/components/own/independant/number-field";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, NumberControl } from "./examples";

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
        <div className="mx-auto w-full max-w-xs">{children}</div>
      </div>
    </section>
  );
}

function LabeledNumberField({ id, label, ...props }: NumberFieldProps & { id: string; label: string }) {
  return (
    <NumberField id={id} {...props}>
      <label htmlFor={id} className="body-sm font-medium">{label}</label>
      <NumberControl />
    </NumberField>
  );
}

export default function NumberFieldShowcasePage() {
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
              <h1 className="h1">Number Field</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/number-field
              </span>
            </div>
            <p className="subtitle">Entrada numérica editable con botones de ajuste, límites y formato local.</p>
          </header>
        </div>
        <Behavior title="Cantidad editable" description={<>Escribe una cantidad o ajústala con los botones y las flechas entre <code>min</code> y <code>max</code>.</>}>
          <LabeledNumberField id="order-items" label="Unidades del pedido" defaultValue={3} min={1} max={8} />
        </Behavior>
        <Behavior title="Ajuste por pasos" description={<>Alinea los saltos de <code>step</code> con <code>snapOnStep</code> y usa Alt o Mayús con las flechas para aplicar <code>smallStep</code> o <code>largeStep</code>.</>}>
          <LabeledNumberField
            id="cut-length"
            label="Longitud de corte (cm)"
            defaultValue={23}
            min={0}
            max={100}
            step={5}
            smallStep={1}
            largeStep={10}
            snapOnStep
          />
        </Behavior>
        <Behavior title="Formato localizado" description={<>Edita el peso con coma decimal y sal del campo para aplicar <code>format</code> según <code>{'locale="es-CL"'}</code>.</>}>
          <LabeledNumberField
            id="shipment-weight"
            label="Peso del envío"
            defaultValue={12.5}
            min={0}
            step={0.25}
            locale="es-CL"
            format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 2 }}
          />
        </Behavior>
        <Behavior title="Valor controlado" description={<>Edita la cantidad o usa el botón para vaciar el mismo <code>value</code> con <code>null</code>.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Ajuste por arrastre" description={<>Arrastra la etiqueta hacia los lados en <code>NumberFieldScrubArea</code> para ajustar el valor.</>}>
          <NumberField id="rotation" defaultValue={45} min={0} max={180}>
            <NumberFieldScrubArea className="cursor-ew-resize">
              <label htmlFor="rotation" className="body-sm cursor-inherit font-medium">Rotación (°)</label>
              <MoveHorizontal aria-hidden className="size-4 text-gray-bold/70" />
              <NumberFieldScrubAreaCursor>
                <MoveHorizontal aria-hidden className="size-5 -translate-x-1/2 -translate-y-1/2 rounded-base bg-surface-bold text-gray-bold shadow-s" />
              </NumberFieldScrubAreaCursor>
            </NumberFieldScrubArea>
            <NumberControl />
          </NumberField>
        </Behavior>
        <Behavior title="Ajuste con la rueda" description={<>Enfoca el campo y gira la rueda sobre él para cambiar el valor con <code>allowWheelScrub</code>.</>}>
          <LabeledNumberField id="magnification" label="Aumento (%)" defaultValue={100} min={50} max={200} step={5} allowWheelScrub />
        </Behavior>
        <Behavior title="Validación con Field" description={<>Escribe un número fuera del rango y sal del campo para ver el error que permite <code>allowOutOfRange</code>.</>}>
          <Field name="pallets" validationMode="onBlur">
            <FieldLabel>Palés por envío</FieldLabel>
            <NumberField defaultValue={4} min={1} max={12} required allowOutOfRange>
              <NumberControl />
            </NumberField>
            <FieldDescription>Ingresa entre 1 y 12 palés.</FieldDescription>
            <FieldError match="valueMissing">Ingresa una cantidad.</FieldError>
            <FieldError match="rangeUnderflow">Ingresa al menos 1 palé.</FieldError>
            <FieldError match="rangeOverflow">Ingresa un máximo de 12 palés.</FieldError>
            <FieldError match="stepMismatch">Ingresa un número entero.</FieldError>
          </Field>
        </Behavior>
        <Behavior title="Solo lectura" description={<>Enfoca y copia el valor sin modificarlo gracias a <code>readOnly</code>.</>}>
          <LabeledNumberField id="reserved-stock" label="Stock reservado" defaultValue={24} readOnly />
        </Behavior>
        <Behavior title="Entrada deshabilitada" description={<>Recorre la página con Tab para comprobar que <code>disabled</code> omite el campo.</>}>
          <LabeledNumberField id="confirmed-stock" label="Stock confirmado" defaultValue={48} disabled />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
