import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import { BasicExample, ComposedExample, NestedExample, SubmissionExample } from "./examples";


export default function FieldsetShowcasePage() {
  return (
    <ShowcasePage title="Fieldset" implementation="@base-ui/react/fieldset" description="Grupos de controles con un nombre accesible y deshabilitación compartida.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Controles con un nombre común" description={<>Agrupa nombre y correo bajo <code>FieldsetLegend</code> y conserva una etiqueta individual para cada control.</>}>
          <BasicExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Deshabilitación y envío" description={<>Envía el formulario con y sin <code>disabled</code> para ver cuándo se incluye el valor del grupo.</>}>
          <SubmissionExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Grupos anidados" description={<>Pausa la edición para deshabilitar ambos grupos aunque el interior tenga <code>disabled={"{false}"}</code>.</>}>
          <NestedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-md" title="Composición con Checkbox Group" description={<>Usa <code>render</code> para componer el grupo de casillas y convertir su leyenda en un encabezado.</>}>
          <ComposedExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
