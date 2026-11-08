import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ActionsExample,
  CheckboxExample,
  ControlledExample,
  LinkExample,
  RadioExample,
  SubmenuExample,
} from "./examples";


export default function ContextMenuShowcasePage() {
  return (
    <ShowcasePage title="Context Menu" implementation="@base-ui/react/context-menu" description="Acciones asociadas a un elemento que aparecen al invocar su menú contextual.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Acciones contextuales" description={<>Abre el menú desde el área con clic secundario, pulsación prolongada o <kbd>Mayús</kbd> + <kbd>F10</kbd>.</>}>
          <ActionsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Opción con casilla" description={<>Cambia una preferencia con <code>checked</code> y <code>onCheckedChange</code> mientras el menú permanece abierto.</>}>
          <CheckboxExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Selección exclusiva" description={<>Usa <code>ContextMenuRadioGroup</code> para elegir una sola densidad de lista.</>}>
          <RadioExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Submenú" description={<>Agrupa los destinos en <code>ContextMenuSubmenu</code> y abre sus opciones con el puntero o la flecha derecha.</>}>
          <SubmenuExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Apertura controlada" description={<>Comparte <code>open</code> y <code>onOpenChange</code> con un botón visible que también sirve de <code>anchor</code>.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Enlace de navegación" description={<>Compón <code>ContextMenuLinkItem</code> con <code>Link</code> para navegar a otra página del catálogo.</>}>
          <LinkExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
