import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import { Input } from "@/components/own/base/input";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample } from "./examples";


export default function InputShowcasePage() {
  return (
    <ShowcasePage title="Input" implementation="@base-ui/react/input" description="Control nativo para editar una línea de texto con una etiqueta HTML o dentro de Field.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Texto editable" description={<>Escribe en el campo para modificar el contenido inicial que establece <code>defaultValue</code>.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Nombre del informe</span>
            <Input name="reportName" defaultValue="Resumen semanal" />
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Valor controlado" description={<>Escribe un término y bórralo con el botón para cambiar el mismo <code>value</code> desde ambos controles.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación con Field" description={<>Escribe un correo incompleto y sal del campo para ver la validación con <code>{'validationMode="onBlur"'}</code>.</>}>
          <Field name="email" validationMode="onBlur">
            <FieldLabel>Correo de contacto</FieldLabel>
            <Input type="email" autoComplete="email" placeholder="nombre@dominio.cl" required />
            <FieldDescription>Usa la dirección donde recibirás el informe.</FieldDescription>
            <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
            <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
          </Field>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Solo lectura" description={<>Selecciona y copia el valor del campo protegido por <code>readOnly</code>.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Código asignado</span>
            <Input name="reportCode" defaultValue="INF-2048" readOnly />
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Entrada deshabilitada" description={<>Usa <code>disabled</code> para impedir la edición y omitir el campo al recorrer el formulario con Tab.</>}>
          <label className="grid gap-2">
            <span className="body-sm font-medium">Fuente de datos</span>
            <Input name="source" defaultValue="Registro central" disabled />
          </label>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
