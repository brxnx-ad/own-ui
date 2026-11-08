import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AlignmentExample,
  AnchoredExample,
  ControlledExample,
  DisabledExample,
  FormExample,
  GroupedExample,
  MultipleExample,
  ReadOnlyExample,
  ScrollExample,
  SingleExample,
} from "./examples";


export default function SelectShowcasePage() {
  return (
    <ShowcasePage title="Select" implementation="@base-ui/react/select" description="Selección de una o varias opciones predefinidas desde un panel desplegable.">
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Selección individual" description={<>Muestra un <code>placeholder</code> antes de elegir un formato y usa <code>items</code> para mostrar su etiqueta.</>}>
          <SingleExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Opciones agrupadas" description={<>Organiza las opciones con <code>SelectGroup</code> y marca las que no estén disponibles con <code>disabled</code>.</>}>
          <GroupedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Selección múltiple" description={<>Con <code>multiple</code>, activa o desactiva varios canales sin cerrar el panel.</>}>
          <MultipleExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Valor controlado" description={<>Comparte <code>value</code> y <code>onValueChange</code> para elegir desde el panel o restablecer desde fuera.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Alineación con la opción" description={<>Abre con el puntero y usa <code>alignItemWithTrigger</code> para superponer el texto de la opción seleccionada con el del activador cuando haya espacio.</>}>
          <AlignmentExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Posición y flecha" description={<>Coloca el panel sobre el activador con <code>{'side="top"'}</code> y señala el anclaje con <code>SelectArrow</code>.</>}>
          <AnchoredExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Lista desplazable" description={<>Recorre las semanas con el teclado, la rueda o pasando el puntero por las flechas de desplazamiento.</>}>
          <ScrollExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Solo lectura" description={<>Con <code>readOnly</code>, consulta las opciones conservando el valor asignado.</>}>
          <ReadOnlyExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Control deshabilitado" description={<>Aplica <code>disabled</code> a la raíz para impedir la apertura y la interacción.</>}>
          <DisabledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto grid w-full max-w-xs gap-2" title="Validación y envío" description={<>Combina <code>required</code> con <code>Field</code> y lee el valor enviado con <code>FormData.get()</code>.</>}>
          <FormExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
