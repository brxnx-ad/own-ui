import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, ParentExample, SelectionExample } from "./examples";


export default function CheckboxGroupShowcasePage() {
  return (
    <ShowcasePage title="Checkbox Group" implementation="@base-ui/react/checkbox-group" description="Coordina la selección de varias casillas relacionadas.">
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Selección múltiple"
          description={<>Elige varias opciones a partir de la selección inicial definida por <code>defaultValue</code>.</>}
        >
          <SelectionExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Estado controlado"
          description={<>Comparte <code>value</code> y <code>onValueChange</code> para cambiar la selección desde las casillas o el botón externo.</>}
        >
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Seleccionar todo"
          description={<>Vincula una casilla <code>parent</code> con <code>allValues</code> para alternar la selección del grupo y mostrar su estado parcial.</>}
        >
          <ParentExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Deshabilitación del grupo"
          description={<>Aplica <code>disabled</code> a la raíz para deshabilitar todas las casillas a la vez.</>}
        >
          <SelectionExample disabled />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Envío de formulario"
          description={<>Usa el mismo <code>name</code> en cada casilla y recupera los valores seleccionados con <code>FormData.getAll()</code>.</>}
        >
          <FormExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
