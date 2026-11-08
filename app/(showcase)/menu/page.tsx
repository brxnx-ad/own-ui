import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ActionsExample,
  CheckboxExample,
  ControlledExample,
  FilterExample,
  LinkExample,
  RadioExample,
  SharedMenuExample,
  SubmenuExample,
} from "./examples";


export default function MenuShowcasePage() {
  return (
    <ShowcasePage title="Menu" implementation="@base-ui/react/menu" description="Acciones, enlaces y preferencias que se despliegan desde un botón.">
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Acciones de un documento" description={<>Agrupa las acciones de edición con <code>MenuGroup</code> y habilita «Quitar la copia» después de crearla.</>}>
          <ActionsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Opción con casilla" description={<>Muestra u oculta los detalles con <code>MenuCheckboxItem</code> mientras el menú permanece abierto.</>}>
          <CheckboxExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Orden exclusivo" description={<>Cambia el orden de la lista con <code>MenuRadioGroup</code> y una opción activa a la vez.</>}>
          <RadioExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Submenú de destinos" description={<>Agrupa las carpetas en <code>MenuSubmenu</code> y abre sus opciones con el puntero o con la flecha derecha.</>}>
          <SubmenuExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Apertura controlada" description={<>Coordina el activador y un botón externo con <code>open</code>, <code>onOpenChange</code> y <code>modal={"{false}"}</code>.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Enlaces anclados al activador" description={<>Navega con <code>MenuLinkItem</code> compuesto con <code>Link</code> y señala el botón de origen con <code>MenuArrow</code>.</>}>
          <LinkExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Activadores compartidos" description={<>Usa <code>createMenuHandle</code> para abrir el mismo menú con un contenido distinto según el <code>payload</code> de cada botón.</>}>
          <SharedMenuExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-sm flex-col items-center gap-4" title="Búsqueda de componentes" description={<>Filtra los enlaces por nombre con <code>MenuFilterProvider</code> y recorre las coincidencias con las flechas.</>}>
          <FilterExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
