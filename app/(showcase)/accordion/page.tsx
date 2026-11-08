import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/own/base/accordion";
import { ControlledExample, PersistenceExample } from "./examples";
import { Anatomy, ApiReference } from "./api-reference";


function Example({ multiple = false }: { multiple?: boolean }) {
  return (
    <Accordion multiple={multiple} defaultValue={["one"]}>
      <AccordionItem value="one">
        <AccordionHeader>
          <AccordionTrigger>¿Qué es own-ui?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Una colección de componentes accesibles construidos sobre Base UI.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionHeader>
          <AccordionTrigger>¿Cómo se aplican los estilos?</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Los componentes utilizan las superficies y los tokens semánticos del
          proyecto.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="disabled" disabled>
        <AccordionHeader>
          <AccordionTrigger>Sección deshabilitada</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Este contenido no se puede abrir mientras el elemento esté
          deshabilitado.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default function AccordionShowcasePage() {
  return (
    <ShowcasePage title="Accordion" implementation="@base-ui/react/accordion" description="Paneles expandibles para organizar contenido relacionado.">
        <ShowcaseExample title="Apertura individual" description="Un solo panel abierto a la vez.">
          <Example />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Apertura múltiple" description={<>Permite abrir varios paneles a la vez con <code>multiple</code>.</>}><Example multiple /></ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Estado controlado" description={<>Controla la apertura desde fuera con <code>value</code> y <code>onValueChange</code>.</>}><ControlledExample /></ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Deshabilitación global" description={<>Deshabilita todos los elementos con <code>disabled</code>.</>}>
              <Accordion disabled><AccordionItem><AccordionHeader><AccordionTrigger>Sin interacción</AccordionTrigger></AccordionHeader><AccordionPanel>Contenido deshabilitado.</AccordionPanel></AccordionItem></Accordion>
            </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Conservar contenido" description={<>Conserva el valor del campo al cerrar el panel con <code>keepMounted</code>.</>}><PersistenceExample /></ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Buscar contenido" description={<>Busca «heliotropo» en el panel cerrado mediante <code>hiddenUntilFound</code>.</>}>
              <Accordion hiddenUntilFound><AccordionItem><AccordionHeader><AccordionTrigger>Buscar contenido</AccordionTrigger></AccordionHeader><AccordionPanel>La palabra heliotropo está dentro del panel.</AccordionPanel></AccordionItem></Accordion>
            </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xl space-y-4" title="Nivel de encabezado" description={<>Adapta el nivel del encabezado con <code>render</code>.</>}>
              <h3 className="h5">Sección interna</h3>
              <Accordion><AccordionItem><AccordionHeader render={<h4 />}><AccordionTrigger>Encabezado personalizado</AccordionTrigger></AccordionHeader><AccordionPanel>El nivel del encabezado sigue la jerarquía de esta página.</AccordionPanel></AccordionItem></Accordion>
            </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
