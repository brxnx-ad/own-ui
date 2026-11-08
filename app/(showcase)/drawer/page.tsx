import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BottomExample,
  DirectionsExample,
  FormExample,
  GripPositionExample,
  IndentExample,
  NestedExample,
  NonModalExample,
  SnapExample,
  SwipeAreaExample,
} from "./examples";


export default function DrawerShowcasePage() {
  return (
    <ShowcasePage title="Drawer" implementation="@base-ui/react/drawer" description="Paneles de borde con gestos de arrastre y alturas de ajuste.">
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Hoja inferior" description="Abre el resumen y arrastra el asa hacia abajo para cerrarlo.">
          <BottomExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Entrada desde otros bordes" description={<>Elige el borde y el sentido de cierre con <code>swipeDirection</code>. El agarre aparece en el lado opuesto.</>}>
          <DirectionsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Posición y borde del agarre" description={<>Coloca el agarre abajo u ocúltalo con <code>gripPosition</code>. Activa <code>showGripBorder</code> para añadir el separador.</>}>
          <GripPositionExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Edición controlada" description={<>Guarda la nota y cierra con <code>open</code> y <code>onOpenChange</code>, con ajuste al teclado virtual mediante <code>DrawerVirtualKeyboardProvider</code>.</>}>
          <FormExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Alturas de ajuste" description={<>Alterna entre los dos <code>snapPoints</code> arrastrando el asa o usando Ampliar y Reducir.</>}>
          <SnapExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Apertura por arrastre" description={<>Abre los accesos arrastrando <code>DrawerSwipeArea</code> hacia la izquierda o usando el botón.</>}>
          <SwipeAreaExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Guía no modal" description={<>Marca el registro desde la página sin cerrar la guía con <code>modal={"{false}"}</code> y <code>disablePointerDismissal</code>.</>}>
          <NonModalExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Paneles anidados" description="Abre el plan desde la ficha y usa Escape para cerrar primero el panel superior.">
          <NestedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Cambio de escala del fondo" description={<>Coordina la vista previa y el panel con <code>DrawerProvider</code> y estiliza el fondo con <code>data-active</code>.</>}>
          <IndentExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
