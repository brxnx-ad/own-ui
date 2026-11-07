import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import {
  ControlledNavigationExample,
  KeepMountedNavigationExample,
  NestedNavigationExample,
  SiteNavigationExample,
  VerticalNavigationExample,
} from "./examples";

function Behavior({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function NavigationMenuShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Navigation Menu</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/navigation-menu
              </span>
            </div>
            <p className="subtitle">
              Colección de enlaces y paneles desplegables para la navegación de
              un sitio o aplicación.
            </p>
          </header>
        </div>

        <Behavior
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
        </Behavior>

        <Behavior
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
        </Behavior>

        <Behavior
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
        </Behavior>

        <Behavior
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
        </Behavior>

        <Behavior
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
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
