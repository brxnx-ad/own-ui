import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ControlledExample,
  FormExample,
  GroupedExample,
  MultipleExample,
  PopupInputExample,
  SingleExample,
} from "./examples";


export default function ComboboxShowcasePage() {
  return (
    <ShowcasePage title="Combobox" implementation="@base-ui/react/combobox" description="Busca y selecciona una o varias opciones de una lista.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Selección única" description={<>Escribe para filtrar <code>items</code> y elige una opción con Enter o el puntero.</>}>
          <SingleExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Selección múltiple" description={<>Activa <code>multiple</code> y muestra las opciones elegidas como chips que se pueden quitar.</>}>
          <MultipleExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Estado controlado" description={<>Sincroniza la selección con <code>value</code> y <code>onValueChange</code> para restablecerla desde un botón externo.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Opciones agrupadas" description={<>Organiza los resultados con <code>ComboboxGroup</code> y conserva visibles las opciones deshabilitadas.</>}>
          <GroupedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Búsqueda dentro del desplegable" description={<>Muestra la selección en el activador con <code>ComboboxValue</code> y coloca el campo de búsqueda dentro del panel.</>}>
          <PopupInputExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Envío de un identificador" description={<>Usa <code>createComboboxItems</code> para mostrar el nombre de cada bodega y enviar su código mediante <code>name</code>.</>}>
          <FormExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
