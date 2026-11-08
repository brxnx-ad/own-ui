import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import { OTPField, OTPFieldSeparator, type OTPFieldProps } from "@/components/own/base/otp-field";
import { Anatomy, ApiReference } from "./api-reference";
import { AutoSubmitExample, ControlledExample, OTPInputs, RecoveryCodeExample } from "./examples";


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
    <ShowcasePage title="OTP Field" implementation="@base-ui/react/otp-field" description="Entrada segmentada para códigos de un solo uso, con avance de foco, pegado y validación de formulario.">
        <ShowcaseExample contentClassName="flex justify-center" title="Código de verificación" description={<>Escribe un dígito por casilla o pega un código de seis dígitos con <code>{'length={6}'}</code>.</>}>
          <LabeledOTPField id="verification-code" label="Código de verificación" length={6} placeholder="–" />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Código agrupado" description={<>Separa dos grupos de tres casillas con <code>OTPFieldSeparator</code> y conserva el recorrido de un solo código.</>}>
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
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Código alfanumérico" description={<>Pega <code>a7c9xz</code> y comprueba cómo <code>normalizeValue</code> convierte las letras admitidas por <code>{'validationType="alphanumeric"'}</code> a mayúsculas.</>}>
          <RecoveryCodeExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Entrada enmascarada" description={<>Escribe un PIN y observa cómo <code>mask</code> oculta cada carácter en pantalla.</>}>
          <LabeledOTPField id="masked-code" label="PIN de acceso" length={4} mask />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Valor controlado" description={<>Escribe en las casillas o borra el código para actualizar el mismo <code>value</code> desde ambos controles.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Validación con Field" description={<>Escribe parte del código y sal del grupo para ver el error con <code>{'validationMode="onBlur"'}</code>.</>}>
          <Field name="deliveryCode" validationMode="onBlur">
            <FieldLabel>Código de entrega</FieldLabel>
            <OTPField length={4} required>
              <OTPInputs length={4} />
            </OTPField>
            <FieldDescription>Usa los cuatro dígitos del comprobante.</FieldDescription>
            <FieldError match="valueMissing">Ingresa el código de entrega.</FieldError>
            <FieldError match="patternMismatch">Completa los cuatro dígitos.</FieldError>
          </Field>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Envío al completar" description={<>Completa las cuatro casillas para enviar el formulario de demostración con <code>autoSubmit</code>.</>}>
          <AutoSubmitExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Solo lectura" description={<>Recorre las casillas con las flechas y comprueba que <code>readOnly</code> impide modificar el código.</>}>
          <LabeledOTPField id="readonly-code" label="Código registrado" length={4} defaultValue="0824" readOnly />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Entrada deshabilitada" description={<>Recorre la página con Tab para comprobar que <code>disabled</code> omite las casillas.</>}>
          <LabeledOTPField id="disabled-code" label="Código de una sesión cerrada" length={4} defaultValue="0317" disabled />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
