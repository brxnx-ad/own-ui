import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ControlledNavigationExample,
  KeepMountedNavigationExample,
  NestedNavigationExample,
  SiteNavigationExample,
  VerticalNavigationExample,
} from "./examples";


export default function NavigationMenuShowcasePage() {
  return (
    <ShowcasePage title="Navigation Menu" implementation="@base-ui/react/navigation-menu" description="Colección de enlaces y paneles desplegables para la navegación de un sitio o aplicación.">
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-xl flex-col items-center"
          title="Paneles desplegables y enlace activo"
          description={
            <>
              Pasa el puntero o usa el teclado sobre Plataforma y Recursos para
              ver cómo <code>NavigationMenuPopup</code> adapta su tamaño, y
              pulsa un destino con <code>closeOnClick</code> y{" "}
              <code>active</code>.
            </>
          }
        >
          <SiteNavigationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-xl flex-col items-center"
          title="Orientación vertical"
          description={
            <>
              Con <code>{'orientation="vertical"'}</code> y{" "}
              <code>{'side="inline-end"'}</code> en el posicionador, los paneles
              se abren al costado de la lista e incluyen un activador con{" "}
              <code>disabled</code>.
            </>
          }
        >
          <VerticalNavigationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-xl flex-col items-center"
          title="Apertura controlada y cierre imperativo"
          description={
            <>
              Coordina el elemento abierto mediante <code>value</code> y{" "}
              <code>onValueChange</code> o ciérralo desde fuera con{" "}
              <code>actionsRef</code>.
            </>
          }
        >
          <ControlledNavigationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-xl flex-col items-center"
          title="Submenú anidado en línea"
          description={
            <>
              Anida otro <code>NavigationMenu</code> con su propio{" "}
              <code>NavigationMenuViewport</code> dentro de{" "}
              <code>NavigationMenuContent</code> para alternar subcategorías sin
              abrir un segundo portal.
            </>
          }
        >
          <NestedNavigationExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-xl flex-col items-center"
          title="Contenido persistente en el DOM"
          description={
            <>
              Mantén los enlaces renderizados mientras el menú está cerrado con{" "}
              <code>keepMounted</code> en el contenido y el portal, ajustando{" "}
              <code>delay</code> y <code>closeDelay</code>.
            </>
          }
        >
          <KeepMountedNavigationExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
