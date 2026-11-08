import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import { ActionExample, ImperativeValidationExample, NativeDataExample, SubmitExample, ValidationModeExample } from "./examples";


export default function FormShowcasePage() {
  return (
    <ShowcasePage title="Form" implementation="@base-ui/react/form" description="Formularios con envío, validación coordinada y errores por campo.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Envío de valores registrados" description={<>Intenta guardar con campos vacíos para ver dónde se mueve el foco y completa los datos para recibirlos con <code>onFormSubmit</code>.</>}>
          <SubmitExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación por formulario y por campo" description={<>Escribe una sola letra en ambos campos para comparar el <code>onBlur</code> heredado con el <code>onChange</code> del segundo campo.</>}>
          <ValidationModeExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Acción de servidor y errores externos" description={<>Comprueba un código con <code>action</code> para ver cómo <code>errors</code> asocia al campo la respuesta del servidor.</>}>
          <ActionExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Validación imperativa" description={<>Usa <code>actionsRef</code> para validar solo el proyecto o todos los campos sin enviar el formulario.</>}>
          <ImperativeValidationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Valores nativos con FormData" description={<>Selecciona ambos destinatarios y envía para leer los valores repetidos con <code>onSubmit</code> y <code>FormData.getAll</code>.</>}>
          <NativeDataExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
