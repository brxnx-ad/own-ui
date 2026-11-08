import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/own/base/collapsible";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, PersistenceExample } from "./examples";


export default function CollapsibleShowcasePage() {
  return (
    <ShowcasePage title="Collapsible" implementation="@base-ui/react/collapsible" description="Panel individual que se puede mostrar u ocultar mediante un activador.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Detalles desplegables"
          description={<>Empieza con el contenido visible mediante <code>defaultOpen</code> y alterna el panel desde su activador.</>}
        >
          <Collapsible defaultOpen>
            <CollapsibleTrigger>Detalles de entrega</CollapsibleTrigger>
            <CollapsiblePanel>El envío estándar tarda de tres a cinco días hábiles.</CollapsiblePanel>
          </Collapsible>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Estado controlado"
          description={<>Sincroniza el panel y el botón externo mediante <code>open</code> y <code>onOpenChange</code>.</>}
        >
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Deshabilitación"
          description={<>Aplica <code>disabled</code> a la raíz para bloquear la interacción desde el activador.</>}
        >
          <Collapsible defaultOpen disabled>
            <CollapsibleTrigger>Detalle de la tarifa</CollapsibleTrigger>
            <CollapsiblePanel>El pedido incluye la tarifa de envío estándar.</CollapsiblePanel>
          </Collapsible>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Conservar contenido"
          description={<>Escribe una nota y cierra el panel para comprobar que <code>keepMounted</code> conserva su valor.</>}
        >
          <PersistenceExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Buscar contenido"
          description={<>Usa la búsqueda de la página y avanza hasta la coincidencia de «heliotropo» dentro del panel cerrado con <code>hiddenUntilFound</code>.</>}
        >
          <Collapsible>
            <CollapsibleTrigger>Ficha de la muestra</CollapsibleTrigger>
            <CollapsiblePanel hiddenUntilFound>La muestra identificada corresponde a un heliotropo.</CollapsiblePanel>
          </Collapsible>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl"
          title="Activador con otro elemento"
          description={<>Renderiza el activador como <code>span</code> y conserva el comportamiento de botón con <code>nativeButton=false</code>.</>}
        >
          <Collapsible>
            <CollapsibleTrigger render={<span />} nativeButton={false}>Requisitos de retiro</CollapsibleTrigger>
            <CollapsiblePanel>Presenta el comprobante al retirar el pedido.</CollapsiblePanel>
          </Collapsible>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
