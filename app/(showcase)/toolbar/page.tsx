import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import Link from "next/link";
import { Toolbar, ToolbarButton, ToolbarInput, ToolbarLink, ToolbarSeparator } from "@/components/own/base/toolbar";
import { Anatomy, ApiReference } from "./api-reference";
import { DisabledItemsExample, FormattingExample, HistoryExample, MenuExample, SearchExample, VerticalExample } from "./examples";


export default function ToolbarShowcasePage() {
  return (
    <ShowcasePage title="Toolbar" implementation="@base-ui/react/toolbar" description="Agrupa herramientas y recorre sus controles con las flechas.">
        <ShowcaseExample contentClassName="flex justify-center" title="Acciones agrupadas" description={<>Reúne las acciones de historial en <code>ToolbarGroup</code> y sepáralas de la acción de restablecer con <code>ToolbarSeparator</code>.</>}>
          <HistoryExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Selección de formatos" description={<>Compón un <code>ToggleGroup</code> dentro de la barra para conservar su selección y recorrer sus botones junto al resto de herramientas.</>}>
          <FormattingExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Campo al final de la barra" description={<>Escribe en <code>ToolbarInput</code> y usa las flechas para mover el cursor dentro del texto o salir del campo al llegar a su extremo.</>}>
          <SearchExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Menú desde la barra" description={<>Pasa <code>{'render={<MenuTrigger />}'}</code> a <code>ToolbarButton</code> para abrir el menú desde un control de la barra.</>}>
          <MenuExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Enlaces internos" description={<>Compón <code>ToolbarLink</code> con <code>Link</code> de Next.js para conservar la navegación del sitio y el recorrido de foco.</>}>
          <Toolbar aria-label="Referencias relacionadas">
            <ToolbarLink render={<Link href="/toggle" />}>Ver Toggle</ToolbarLink>
            <ToolbarLink render={<Link href="/toggle-group" />}>Ver Toggle Group</ToolbarLink>
          </Toolbar>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Orientación vertical" description={<>Usa <code>{'orientation="vertical"'}</code> para recorrer la columna con las flechas arriba y abajo y <code>{'loopFocus={false}'}</code> para detenerte en los extremos.</>}>
          <VerticalExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Deshabilitación y foco" description={<>Deshabilita un subgrupo y usa <code>{'focusableWhenDisabled={false}'}</code> para que las flechas omitan la acción Eliminar.</>}>
          <DisabledItemsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Barra deshabilitada" description={<>Deshabilita la edición desde la raíz. El campo conserva su valor y el enlace sigue disponible para consultar la referencia.</>}>
          <Toolbar aria-label="Informe de solo lectura" disabled>
            <ToolbarButton>Guardar</ToolbarButton>
            <ToolbarSeparator />
            <ToolbarLink render={<Link href="/input" />}>Ver Input</ToolbarLink>
            <ToolbarInput aria-label="Título protegido" defaultValue="Informe de auditoría" />
          </Toolbar>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
