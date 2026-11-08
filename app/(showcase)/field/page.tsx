import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BasicExample,
  BlurExample,
  ChangeExample,
  ControlledExample,
  DisabledExample,
  ExternalErrorExample,
  ItemsExample,
  SubmitExample,
} from "./examples";


export default function FieldShowcasePage() {
  return (
    <ShowcasePage title="Field" implementation="@base-ui/react/field" description="Campos de formulario con etiquetas, descripciones y mensajes de validación asociados.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Etiqueta y descripción" description={<>Pulsa <code>FieldLabel</code> para enfocar el control asociado y consulta la ayuda de <code>FieldDescription</code>.</>}>
          <BasicExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación al enviar" description={<>Guarda un correo vacío o con formato incorrecto para ver cómo <code>match</code> elige el mensaje en <code>onSubmit</code>.</>}>
          <SubmitExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación al salir" description={<>Escribe un código postal incompleto y sal del control para validarlo con <code>onBlur</code>.</>}>
          <BlurExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación mientras se escribe" description={<>Escribe un alias para validarlo con <code>validate</code> tras la pausa de <code>validationDebounceTime</code> y mostrar el resultado con <code>FieldValidity</code>.</>}>
          <ChangeExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Área de texto controlada" description={<>Usa <code>render</code> para editar una nota en un <code>textarea</code> y actualiza el contador con <code>value</code> y <code>onValueChange</code>.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Error externo" description={<>Intenta registrar el código existente y modifica el valor para quitar el error que <code>Form</code> asocia al campo por nombre.</>}>
          <ExternalErrorExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Opciones con etiquetas propias" description={<>Agrupa casillas con <code>FieldItem</code> para dar una etiqueta y descripción a cada opción, incluida una opción deshabilitada.</>}>
          <ItemsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Campo deshabilitado" description={<>Usa <code>disabled</code> en la raíz para deshabilitar el control y atenuar la etiqueta y la descripción.</>}>
          <DisabledExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
