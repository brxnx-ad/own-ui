"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/own/independant/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  type NavigationMenuActions,
} from "@/components/own/independant/navigation-menu";

const platformLinks = [
  {
    href: "#componentes",
    title: "Catálogo de componentes",
    description: "Primitivas accesibles estilizadas con superficies y tríadas.",
  },
  {
    href: "#tokens",
    title: "Tokens en OKLCH",
    description: "Semillas cromáticas y escalas adaptadas a claro y oscuro.",
  },
  {
    href: "#sombras",
    title: "Elevación física",
    description: "Recetas de sombra cenital y cavidades de relieve hundido.",
  },
  {
    href: "#tipografia",
    title: "Escala tipográfica",
    description: "Jerarquía fluida de encabezados, cuerpo y etiquetas.",
  },
] as const;

const resourceLinks = [
  {
    href: "#instalacion",
    title: "Guía de integración",
    description: "Configuración en proyectos Next.js con App Router.",
  },
  {
    href: "#accesibilidad",
    title: "Contrato ARIA y teclado",
    description: "Recorrido de foco, portales y preferencia de movimiento.",
  },
] as const;

export function SiteNavigationExample() {
  const [currentSection, setCurrentSection] = useState("#precios");

  function handleSelect(href: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setCurrentSection(href);
    };
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <NavigationMenu aria-label="Navegación principal">
        <NavigationMenuList>
          <NavigationMenuItem value="plataforma">
            <NavigationMenuTrigger>
              Plataforma
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-1 sm:grid-cols-2">
                {platformLinks.map((item) => (
                  <NavigationMenuLink
                    key={item.href}
                    href={item.href}
                    active={currentSection === item.href}
                    closeOnClick
                    onClick={handleSelect(item.href)}
                  >
                    <span className="font-medium text-gray-bold">
                      {item.title}
                    </span>
                    <span className="caption text-gray-bold/75">
                      {item.description}
                    </span>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="recursos">
            <NavigationMenuTrigger>
              Recursos
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(20rem,calc(var(--available-width,100vw)-2rem))]">
              <div className="flex flex-col gap-1">
                {resourceLinks.map((item) => (
                  <NavigationMenuLink
                    key={item.href}
                    href={item.href}
                    active={currentSection === item.href}
                    closeOnClick
                    onClick={handleSelect(item.href)}
                  >
                    <span className="font-medium text-gray-bold">
                      {item.title}
                    </span>
                    <span className="caption text-gray-bold/75">
                      {item.description}
                    </span>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#precios"
              active={currentSection === "#precios"}
              onClick={handleSelect("#precios")}
            >
              Precios
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPortal>
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>

      <p className="caption text-gray-bold/75">
        Destino activo: <code>{currentSection}</code>
      </p>
    </div>
  );
}

export function VerticalNavigationExample() {
  return (
    <div className="flex w-full justify-center">
      <NavigationMenu
        aria-label="Secciones de arquitectura"
        orientation="vertical"
      >
        <NavigationMenuList className="w-48">
          <NavigationMenuItem value="servidor">
            <NavigationMenuTrigger className="w-full justify-between">
              Infraestructura
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(18rem,calc(var(--available-width,100vw)-2rem))]">
              <div className="flex flex-col gap-1">
                <NavigationMenuLink
                  href="#nodos"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Clúster de nodos
                  </span>
                  <span className="caption text-gray-bold/75">
                    Distribución regional y réplicas activas.
                  </span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#redes"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Redes privadas
                  </span>
                  <span className="caption text-gray-bold/75">
                    Túneles internos y reglas de cortafuegos.
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="seguridad">
            <NavigationMenuTrigger className="w-full justify-between">
              Seguridad
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(18rem,calc(var(--available-width,100vw)-2rem))]">
              <div className="flex flex-col gap-1">
                <NavigationMenuLink
                  href="#llaves"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Rotación de claves
                  </span>
                  <span className="caption text-gray-bold/75">
                    Certificados TLS y secretos de servicio.
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="auditoria">
            <NavigationMenuTrigger disabled className="w-full justify-between">
              Auditoría (restringido)
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPortal>
          <NavigationMenuPositioner side="inline-end" align="start">
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </div>
  );
}

export function ControlledNavigationExample() {
  const [value, setValue] = useState<string | null>(null);
  const actionsRef = useRef<NavigationMenuActions | null>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant={value === "guias" ? "primary" : "secondary"}
          onClick={() => setValue("guias")}
        >
          Abrir Guías
        </Button>
        <Button
          size="sm"
          variant={value === "api" ? "primary" : "secondary"}
          onClick={() => setValue("api")}
        >
          Abrir Referencia API
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={value === null}
          onClick={() => actionsRef.current?.close()}
        >
          Cerrar con actionsRef
        </Button>
      </div>

      <NavigationMenu
        aria-label="Documentación controlada"
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        actionsRef={actionsRef}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="guias">
            <NavigationMenuTrigger>
              Guías
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(20rem,calc(var(--available-width,100vw)-2rem))]">
              <div className="flex flex-col gap-1">
                <NavigationMenuLink
                  href="#inicio-rapido"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Inicio rápido
                  </span>
                  <span className="caption text-gray-bold/75">
                    Primeros pasos con own-ui en 5 minutos.
                  </span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#temas"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Configuración de temas
                  </span>
                  <span className="caption text-gray-bold/75">
                    Sincronización entre modo claro y oscuro.
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="api">
            <NavigationMenuTrigger>
              Referencia API
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(20rem,calc(var(--available-width,100vw)-2rem))]">
              <div className="flex flex-col gap-1">
                <NavigationMenuLink
                  href="#primitivas"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Contratos de primitivas
                  </span>
                  <span className="caption text-gray-bold/75">
                    Tipos, callbacks y composición con render.
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPortal>
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </div>
  );
}

export function NestedNavigationExample() {
  return (
    <div className="flex w-full justify-center">
      <NavigationMenu aria-label="Navegación con submenú en línea">
        <NavigationMenuList>
          <NavigationMenuItem value="catalogo">
            <NavigationMenuTrigger>
              Explorar áreas
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[min(34rem,calc(var(--available-width,100vw)-2rem))]">
              <NavigationMenu
                defaultValue="interfaz"
                orientation="vertical"
                className="grid w-full gap-3 sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                <NavigationMenuList className="w-full self-start">
                  <NavigationMenuItem value="interfaz">
                    <NavigationMenuTrigger className="w-full justify-between">
                      Interfaz
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex flex-col gap-1">
                        <NavigationMenuLink
                          href="#botones"
                          closeOnClick
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-medium text-gray-bold">
                            Controles interactivos
                          </span>
                          <span className="caption text-gray-bold/75">
                            Botones, menús y barras de herramientas.
                          </span>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="#formularios"
                          closeOnClick
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-medium text-gray-bold">
                            Entrada de datos
                          </span>
                          <span className="caption text-gray-bold/75">
                            Campos validados, selectores y casillas.
                          </span>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem value="superficies">
                    <NavigationMenuTrigger className="w-full justify-between">
                      Superficies
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex flex-col gap-1">
                        <NavigationMenuLink
                          href="#dialogos"
                          closeOnClick
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-medium text-gray-bold">
                            Capas superpuestas
                          </span>
                          <span className="caption text-gray-bold/75">
                            Diálogos modales, paneles de borde y portales.
                          </span>
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          href="#elevacion"
                          closeOnClick
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="font-medium text-gray-bold">
                            Planos y sombras
                          </span>
                          <span className="caption text-gray-bold/75">
                            Superficies semánticas y relieves hundidos.
                          </span>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuViewport className="rounded-base border border-gray-base bg-surface-soft p-2" />
              </NavigationMenu>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPortal>
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </div>
  );
}

export function KeepMountedNavigationExample() {
  return (
    <div className="flex w-full justify-center">
      <NavigationMenu
        aria-label="Navegación persistente en el DOM"
        delay={150}
        closeDelay={120}
      >
        <NavigationMenuList>
          <NavigationMenuItem value="guias-seo">
            <NavigationMenuTrigger>
              Documentación indexable
              <NavigationMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent
              keepMounted
              className="w-[min(22rem,calc(var(--available-width,100vw)-2rem))]"
            >
              <div className="flex flex-col gap-1">
                <NavigationMenuLink
                  href="#arquitectura"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Estructura del sistema
                  </span>
                  <span className="caption text-gray-bold/75">
                    Permanece montado en el HTML inicial con keepMounted.
                  </span>
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#exportacion"
                  closeOnClick
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="font-medium text-gray-bold">
                    Contrato de exportación
                  </span>
                  <span className="caption text-gray-bold/75">
                    Integración directa en proyectos consumidores.
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuPortal keepMounted>
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    </div>
  );
}
