import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  BasicExample,
  ControlledExample,
  DetachedTriggersExample,
  ExplicitDismissalExample,
  NestedExample,
  NonModalExample,
  PersistenceExample,
  ScrollableExample,
} from "./examples";


export default function DialogShowcasePage() {
  return (
    <ShowcasePage title="Dialog" implementation="@base-ui/react/dialog" description="Ventanas modales y no modales para editar datos y consultar contenido.">
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Consulta modal" description="Abre los detalles y ciérralos con el botón Cerrar, Escape o un clic en el fondo.">
          <BasicExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Edición controlada" description={<>Gestiona la apertura con <code>open</code> y <code>onOpenChange</code>, y enfoca el campo con <code>initialFocus</code>.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Cierre con botón o Escape" description={<>Mantiene abierta la ventana al pulsar el fondo con <code>disablePointerDismissal</code>.</>}>
          <ExplicitDismissalExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Ayuda no modal" description={<>Permite accionar el botón exterior mientras se muestra la ayuda con <code>modal={"{false}"}</code> y sin backdrop.</>}>
          <NonModalExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Conservar un borrador" description={<>Mantiene el texto del campo entre aperturas con <code>keepMounted</code> en el portal.</>}>
          <PersistenceExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Un diálogo, varios activadores" description={<>Conecta los botones externos mediante <code>handle</code> y muestra el informe elegido con <code>payload</code>.</>}>
          <DetachedTriggersExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Diálogos anidados" description="Abre la fórmula desde la ficha y usa Escape para cerrar primero la ventana superior.">
          <NestedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Contenido desplazable" description="Desplaza la lista de criterios dentro del diálogo mientras el título y el botón de cierre siguen visibles.">
          <ScrollableExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
