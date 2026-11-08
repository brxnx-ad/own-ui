import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { FloatingInput } from "@/components/own/composed/floating-input";
import { FieldDescription, FieldError } from "@/components/own/base/field";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample } from "./examples";


export default function FloatingInputShowcasePage() {
  return (
    <ShowcasePage title="FloatingInput" implementation="Input + Field · Base UI" description="Campo de texto cuya etiqueta sube al enfocar o cuando contiene un valor.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Etiqueta interior" description={<>Enfoca el campo y escribe para ver cómo la variante <code>inset</code> coloca la etiqueta en una línea sobre el valor.</>}>
          <FloatingInput label="Nombre del informe" name="reportTitle" />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Etiqueta sobre el borde" description={<>Enfoca el campo para que la variante <code>outline</code> abra el borde superior alrededor de la etiqueta.</>}>
          <FloatingInput variant="outline" label="Código del informe" name="reportCode" />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Valor inicial" description={<>Con <code>defaultValue</code>, la etiqueta aparece arriba desde el inicio y se mantiene allí mientras haya texto.</>}>
          <FloatingInput variant="outline" label="Equipo responsable" name="team" defaultValue="Operaciones" />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Valor controlado" description={<>Escribe un término y bórralo con el botón para actualizar <code>value</code> y devolver el foco al campo.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación con Field" description={<>Escribe un correo incompleto y sal del campo para que <code>fieldProps.validationMode</code> active la validación.</>}>
          <FloatingInput variant="outline" label="Correo de contacto" name="email" type="email" required autoComplete="email" fieldProps={{ validationMode: "onBlur" }}>
            <FieldDescription>Usa la dirección donde recibirás el informe.</FieldDescription>
            <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
            <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
          </FloatingInput>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Campo deshabilitado" description={<>Con <code>disabled</code>, el control y su etiqueta se atenúan y Tab omite el campo.</>}>
          <FloatingInput variant="outline" label="Fuente de datos" name="source" defaultValue="Registro central" disabled />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
