import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/independant/field";
import { OTPField, OTPFieldSeparator, type OTPFieldProps } from "@/components/own/independant/otp-field";
import { Anatomy, ApiReference } from "./api-reference";
import { AutoSubmitExample, ControlledExample, OTPInputs, RecoveryCodeExample } from "./examples";

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

function LabeledOTPField({ id, label, length, placeholder, ...props }: OTPFieldProps & {
  id: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="body-sm font-medium">{label}</label>
      <OTPField id={id} length={length} {...props}>
        <OTPInputs length={length} placeholder={placeholder} />
      </OTPField>
    </div>
  );
}

export default function OTPFieldShowcasePage() {
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
              <h1 className="h1">OTP Field</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/otp-field
              </span>
            </div>
            <p className="subtitle">Entrada segmentada para códigos de un solo uso, con avance de foco, pegado y validación de formulario.</p>
          </header>
        </div>
        <Behavior title="Código de verificación" description={<>Escribe un dígito por casilla o pega un código de seis dígitos con <code>{'length={6}'}</code>.</>}>
          <LabeledOTPField id="verification-code" label="Código de verificación" length={6} placeholder="–" />
        </Behavior>
        <Behavior title="Código agrupado" description={<>Separa dos grupos de tres casillas con <code>OTPFieldSeparator</code> y conserva el recorrido de un solo código.</>}>
          <div className="grid min-w-0 gap-2">
            <label htmlFor="grouped-code" className="body-sm font-medium">Código de invitación</label>
            <OTPField id="grouped-code" length={6}>
              <div className="flex gap-1 sm:gap-2">
                <OTPInputs length={6} count={3} />
              </div>
              <OTPFieldSeparator aria-hidden />
              <div className="flex gap-1 sm:gap-2">
                <OTPInputs length={6} count={3} start={3} />
              </div>
            </OTPField>
          </div>
        </Behavior>
        <Behavior title="Código alfanumérico" description={<>Pega <code>a7c9xz</code> y comprueba cómo <code>normalizeValue</code> convierte las letras admitidas por <code>{'validationType="alphanumeric"'}</code> a mayúsculas.</>}>
          <RecoveryCodeExample />
        </Behavior>
        <Behavior title="Entrada enmascarada" description={<>Escribe un PIN y observa cómo <code>mask</code> oculta cada carácter en pantalla.</>}>
          <LabeledOTPField id="masked-code" label="PIN de acceso" length={4} mask />
        </Behavior>
        <Behavior title="Valor controlado" description={<>Escribe en las casillas o borra el código para actualizar el mismo <code>value</code> desde ambos controles.</>}>
          <ControlledExample />
        </Behavior>
        <Behavior title="Validación con Field" description={<>Escribe parte del código y sal del grupo para ver el error con <code>{'validationMode="onBlur"'}</code>.</>}>
          <Field name="deliveryCode" validationMode="onBlur">
            <FieldLabel>Código de entrega</FieldLabel>
            <OTPField length={4} required>
              <OTPInputs length={4} />
            </OTPField>
            <FieldDescription>Usa los cuatro dígitos del comprobante.</FieldDescription>
            <FieldError match="valueMissing">Ingresa el código de entrega.</FieldError>
            <FieldError match="patternMismatch">Completa los cuatro dígitos.</FieldError>
          </Field>
        </Behavior>
        <Behavior title="Envío al completar" description={<>Completa las cuatro casillas para enviar el formulario de demostración con <code>autoSubmit</code>.</>}>
          <AutoSubmitExample />
        </Behavior>
        <Behavior title="Solo lectura" description={<>Recorre las casillas con las flechas y comprueba que <code>readOnly</code> impide modificar el código.</>}>
          <LabeledOTPField id="readonly-code" label="Código registrado" length={4} defaultValue="0824" readOnly />
        </Behavior>
        <Behavior title="Entrada deshabilitada" description={<>Recorre la página con Tab para comprobar que <code>disabled</code> omite las casillas.</>}>
          <LabeledOTPField id="disabled-code" label="Código de una sesión cerrada" length={4} defaultValue="0317" disabled />
        </Behavior>
        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
