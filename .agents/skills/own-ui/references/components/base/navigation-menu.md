# Navigation Menu

## 1. Identificación

Navigation Menu pertenece a `base/`, envuelve 12 piezas de `@base-ui/react/navigation-menu`, utiliza `Chevron` de `@/components/own/icons` en su indicador predeterminado y combina sus clases con `clsx`. [API de Base UI](https://base-ui.com/react/components/navigation-menu)

## 2. Propósito y casos de uso

Construye barras de navegación principal o secundaria que combinan enlaces directos con paneles desplegables de enlaces agrupados. Cuando el usuario pasa de un activador a otro con el puntero o el teclado, el posicionador, el popup y el contenido animan su tamaño y dirección de desplazamiento dentro de un viewport compartido.

Úsalo para la navegación entre páginas o secciones de un sitio o aplicación (encabezados globales, directorios de documentación o menús laterales con subcategorías). Para ejecutar comandos de aplicación, alternar casillas de preferencias o abrir menús contextuales, utiliza [Menu](menu.md), [Menubar](menubar.md) o [Context Menu](context-menu.md), que implementan los roles `menu` y `menubar` en lugar de una región `<nav>`.

## 3. Importación y anatomía

~~~tsx
import {
  NavigationMenu,
  NavigationMenuBackdrop,
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
  type NavigationMenuBackdropProps,
  type NavigationMenuBackdropState,
  type NavigationMenuChangeEventDetails,
  type NavigationMenuChangeEventReason,
  type NavigationMenuContentProps,
  type NavigationMenuContentState,
  type NavigationMenuIconProps,
  type NavigationMenuIconState,
  type NavigationMenuItemProps,
  type NavigationMenuItemState,
  type NavigationMenuLinkProps,
  type NavigationMenuLinkState,
  type NavigationMenuListProps,
  type NavigationMenuListState,
  type NavigationMenuPopupProps,
  type NavigationMenuPopupState,
  type NavigationMenuPortalProps,
  type NavigationMenuPortalState,
  type NavigationMenuPositionerProps,
  type NavigationMenuPositionerState,
  type NavigationMenuProps,
  type NavigationMenuState,
  type NavigationMenuTriggerProps,
  type NavigationMenuTriggerState,
  type NavigationMenuViewportProps,
  type NavigationMenuViewportState,
} from "@/components/own/base/navigation-menu";
~~~

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `NavigationMenu` | `nav` en la raíz, `div` al anidarse | Agrupa la lista y el portal/viewport, gestiona el valor activo y coordina la orientación. |
| `NavigationMenuList` | `ul` | Lista que registra el recorrido compuesto por teclado entre activadores y enlaces de primer nivel. |
| `NavigationMenuItem` | `li` | Agrupa un enlace directo o la pareja `NavigationMenuTrigger` + `NavigationMenuContent` bajo un `value`. |
| `NavigationMenuTrigger` | `button` | Abre el contenido de su elemento al pasar el puntero, hacer clic o usar las flechas. |
| `NavigationMenuIcon` | `span` con `aria-hidden="true"` | Muestra `Chevron` por defecto dentro del activador y rota `180deg` cuando su panel está abierto. |
| `NavigationMenuContent` | `div` | Contenedor del panel de un elemento; se proyecta mediante un portal de React dentro de `NavigationMenuViewport`. |
| `NavigationMenuLink` | `a` | Enlace navegable utilizable tanto en la barra (`NavigationMenuList`) como dentro de `NavigationMenuContent`. |
| `NavigationMenuPortal` | `div` | Monta el backdrop y el posicionador en el contenedor del portal (`document.body` por defecto). |
| `NavigationMenuBackdrop` | `div` con `role="presentation"` | Capa opcional de fondo que atenúa el lienzo mientras el popup está abierto. |
| `NavigationMenuPositioner` | `div` | Ancla el popup al activador activo y anima el traslado entre activadores. |
| `NavigationMenuPopup` | `nav` | Contenedor flotante que interpola su ancho y alto (`--popup-width`, `--popup-height`) al cambiar de sección. |
| `NavigationMenuViewport` | `div` | Recorta e inserta el `NavigationMenuContent` activo y los paneles en transición de salida. |

Composición mínima con un elemento desplegable y un enlace directo:

~~~tsx
<NavigationMenu aria-label="Navegación principal">
  <NavigationMenuList>
    <NavigationMenuItem value="plataforma">
      <NavigationMenuTrigger>
        Plataforma
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/componentes" closeOnClick>
          Catálogo de componentes
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink href="/precios" active>
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
~~~

El consumidor aporta el nombre accesible de `NavigationMenu`, los valores identificadores de cada `NavigationMenuItem` cuando controla el estado, las rutas de `NavigationMenuLink` y la disposición interna de `NavigationMenuContent`.

## 4. Variantes y tamaños

Navigation Menu carece de props propias `variant` y `size`. La disposición se controla con `orientation="horizontal"` (predeterminada) o `orientation="vertical"` en `NavigationMenu`, que añade `data-orientation` en la raíz y adapta automáticamente `NavigationMenuList` de fila flexible (`flex-wrap items-center`) a columna (`flex-col flex-nowrap items-stretch`).

Los activadores y enlaces de primer nivel comparten una altura mínima de `2.5rem` (`min-h-10`, 40 px) con `px-3 py-1.5` y tipografía `.body-sm font-medium`. En la raíz no anidada, `NavigationMenuContent` usa un ancho predeterminado `w-(--navigation-menu-content-width,min(28rem,calc(var(--available-width,100vw)-2rem)))` con `p-(--navigation-menu-content-padding,--spacing(3))`; dentro de un `NavigationMenu` anidado (`data-nested`), la raíz fija `--navigation-menu-content-width: 100%` y `--navigation-menu-content-padding: 0px`, de modo que los paneles anidados ocupan el 100% de su `NavigationMenuViewport` sin padding adicional.

## 5. Props y callbacks

Las props de comportamiento e interacción provienen de `@base-ui/react/navigation-menu`. Own-ui aporta las clases base, `data-slot`, `data-orientation` en la raíz, `Chevron` como icono por defecto en `NavigationMenuIcon` y `sideOffset = 8` por defecto en `NavigationMenuPositioner`.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NavigationMenu` | `defaultValue` | `Value \| null` | `null` | Sí | Valor del `NavigationMenuItem` abierto inicialmente en modo no controlado. |
| `NavigationMenu` | `value` | `Value \| null` | `null` | Sí | Valor controlado del elemento abierto. Pasa `null` para mantener cerrado el menú. |
| `NavigationMenu` | `onValueChange` | `(value: Value \| null, details: NavigationMenuChangeEventDetails) => void` | — | Sí | Informa el próximo valor y el motivo en `details.reason`. Permite cancelar con `details.cancel()` o posponer el desmontaje al cerrar con `details.preventUnmountOnClose()`. |
| `NavigationMenu` | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta tras finalizar las animaciones de cierre del popup. |
| `NavigationMenu` | `actionsRef` | `RefObject<NavigationMenuActions \| null>` | — | Sí | Expone `close()` para cerrar imperativamente y `unmount()` para desmontar tras `preventUnmountOnClose()`. |
| `NavigationMenu` | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Define el eje de `NavigationMenuList`, las teclas de flecha y la dirección de activación (`left`/`right` o `up`/`down`). |
| `NavigationMenu` | `delay`, `closeDelay` | `number` | `50`, `50` | Sí | Espera en milisegundos antes de abrir o cerrar el popup al interactuar con el puntero. |
| `NavigationMenuItem` | `value` | `any` | ID generado | Sí | Identificador único del elemento que se compara con `value` / `defaultValue` de la raíz. |
| `NavigationMenuTrigger` | `disabled` | `boolean` | `false` | Sí | Ignora la interacción del usuario y publica `data-disabled`. Permanece enfocable dentro de la lista. |
| `NavigationMenuTrigger` | `nativeButton` | `boolean` | `true` | Sí | Pasa `false` si sustituyes el activador mediante `render` por un elemento distinto de `<button>`. |
| `NavigationMenuIcon` | `children` | `ReactNode` | `<Chevron className="size-3.5" />` | Sí | Sustituye el icono decorativo conservando el giro en `data-popup-open`. |
| `NavigationMenuContent` | `keepMounted` | `boolean` | `false` | Sí | Mantiene el contenido montado en el DOM (con `hidden`) mientras el panel está cerrado, útil para indexación SSR/SEO y submenús en línea. |
| `NavigationMenuLink` | `active` | `boolean` | `false` | Sí | Marca el enlace como página actual con `aria-current="page"` y `data-active`. |
| `NavigationMenuLink` | `closeOnClick` | `boolean` | `false` | Sí | Cierra el menú (`setValue(null)`) con motivo `"link-press"` al hacer clic en el enlace. |
| `NavigationMenuPortal` | `keepMounted` | `boolean` | `false` | Sí | Mantiene el portal montado mientras el popup está cerrado. Úsalo junto con `keepMounted` en `NavigationMenuContent` cuando quieras persistir el árbol portaleado. |
| `NavigationMenuPortal` | `container` | `HTMLElement \| ShadowRoot \| RefObject \| null` | `document.body` | Sí | Contenedor DOM donde se monta el portal. |
| `NavigationMenuPositioner` | `side` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"` | `"bottom"` | Sí | Lado respecto del activador activo. En barras verticales suele usarse `"inline-end"`. |
| `NavigationMenuPositioner` | `align` | `"start" \| "center" \| "end"` | `"center"` | Sí | Alineación transversal respecto del activador. |
| `NavigationMenuPositioner` | `sideOffset`, `alignOffset` | `number \| OffsetFunction` | `8`, `0` | Sí | Desplazamiento en píxeles respecto del activador. Own-ui fija `sideOffset = 8` por defecto. |
| `NavigationMenuPositioner` | `collisionBoundary`, `collisionPadding`, `collisionAvoidance` | Opciones de anclaje de Base UI | `"clipping-ancestors"`, `5`, según anidación | Sí | Configuran la detección de bordes de ventana. |
| `NavigationMenuPositioner` | `anchor`, `positionMethod`, `arrowPadding`, `sticky`, `disableAnchorTracking` | Opciones de anclaje de Base UI | Activo, `"absolute"`, `5`, `false`, `false` | Sí | Ajustan el elemento de referencia y el modo de seguimiento del posicionador. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | Clases base de la pieza | Sí | Combina clases adicionales estáticas o evaluadas según el estado de cada pieza. |
| Todas | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos en línea al nodo. |
| Todas | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Sustituye el elemento conservando atributos ARIA, eventos, estilos de posicionamiento y `ref`. |
| Todas | `ref` | `Ref` del elemento correspondiente | — | Sí | Referencia al nodo DOM en React 19. |

`NavigationMenuChangeEventReason` admite `"trigger-press"`, `"trigger-hover"`, `"outside-press"`, `"list-navigation"`, `"focus-out"`, `"escape-key"`, `"link-press"`, `"imperative-action"` y `"none"`.

## 6. Funcionamiento y estados

- **Modo controlado y no controlado:** Con `defaultValue`, Base UI gestiona internamente qué `NavigationMenuItem` está abierto (`open` es `true` cuando el valor no es `null`). Con `value` y `onValueChange`, el consumidor controla el elemento activo.
- **Interacción con puntero y polígono seguro:** Al pasar el puntero sobre un `NavigationMenuTrigger` tras `delay` (`50ms`), se abre su panel; si el menú ya estaba abierto en otro activador y existe `NavigationMenuPositioner`, el cambio al nuevo activador es inmediato (`restMs: 0`). Base UI calcula un polígono seguro entre el activador y el popup para que el cursor pueda desplazarse diagonalmente hacia el panel sin cerrarlo. En pantallas táctiles (`pointerType === "touch"`), la apertura se realiza por toque/clic en lugar de hover.
- **Medición y transición compartida:** Al cambiar de un elemento a otro, `NavigationMenuTrigger` mide el tamaño del nuevo contenido y actualiza `--positioner-width` y `--positioner-height` en `NavigationMenuPositioner`, además de interpolar `--popup-width` y `--popup-height` en `NavigationMenuPopup`. Un `MutationObserver` y un `ResizeObserver` reajustan las dimensiones si cambia el contenido activo o el tamaño de la ventana.
- **Submenús anidados en línea:** Si se coloca otro `<NavigationMenu>` dentro de `NavigationMenuContent`, Base UI detecta la anidación (`state.nested === true`) y renderiza un `<div>` con `data-nested` en lugar de un segundo `<nav>`. Para un submenú en línea que permanezca en el mismo panel, omite `NavigationMenuPortal` y renderiza `NavigationMenuList` + `NavigationMenuViewport` con un `defaultValue` en el `NavigationMenu` anidado; al no existir `NavigationMenuPositioner` y tener un valor activo, Base UI mantiene abierta la subcategoría activa y alterna entre elementos al pasar el puntero o hacer clic.
- **Persistencia (`keepMounted`):** Con `keepMounted` en `NavigationMenuContent` (antes de que el portal se monte o junto con `keepMounted` en `NavigationMenuPortal`), el contenido permanece en el DOM con el atributo `hidden` mientras está cerrado, permitiendo que los rastreadores indexen los enlaces en SSR.

| Pieza | `data-slot` | Atributos de estado y variables CSS |
| :--- | :--- | :--- |
| `NavigationMenu` | `navigation-menu` | `data-orientation="horizontal" \| "vertical"`, `data-open`, `data-closed`, `data-nested`. |
| `NavigationMenuList` | `navigation-menu-list` | `data-open`, `data-closed`. |
| `NavigationMenuItem` | `navigation-menu-item` | — |
| `NavigationMenuTrigger` | `navigation-menu-trigger` | `data-popup-open`, `data-pressed`, `data-disabled`, `aria-expanded`, `aria-controls`. |
| `NavigationMenuIcon` | `navigation-menu-icon` | `data-popup-open`. |
| `NavigationMenuContent` | `navigation-menu-content` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-activation-direction="left" \| "right" \| "up" \| "down"`. |
| `NavigationMenuLink` | `navigation-menu-link` | `data-active`, `aria-current="page"` (cuando `active={true}`). |
| `NavigationMenuPortal` | `navigation-menu-portal` | — |
| `NavigationMenuBackdrop` | `navigation-menu-backdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`. |
| `NavigationMenuPositioner` | `navigation-menu-positioner` | `data-open`, `data-closed`, `data-side`, `data-align`, `data-anchor-hidden`, `data-instant`; variables `--positioner-width`, `--positioner-height`, `--available-width`, `--available-height`, `--anchor-width`, `--anchor-height`, `--transform-origin`. |
| `NavigationMenuPopup` | `navigation-menu-popup` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`, `data-side`, `data-align`, `data-anchor-hidden`, `data-instant`; variables `--popup-width`, `--popup-height`. |
| `NavigationMenuViewport` | `navigation-menu-viewport` | — |

## 7. Estilos admitidos por pieza

| Aspecto | Cobertura por pieza y alcance de personalización |
| :--- | :--- |
| **Dimensiones y distribución** | `NavigationMenu` usa `relative w-(--navigation-menu-width,fit-content) max-w-full min-w-0` sin forzar `display` y en instancias anidadas (`data-nested`) fija `--navigation-menu-width: 100%`, permitiendo aplicar `grid` o `flex` directamente en submenús anidados. `NavigationMenuList` usa `flex flex-wrap items-center gap-1 p-1` en horizontal y cambia a `flex-col flex-nowrap items-stretch` cuando su raíz directa tiene `data-orientation="vertical"`. `NavigationMenuTrigger` y los `NavigationMenuLink` de primer nivel comparten `min-h-10 px-3 py-1.5 gap-1.5`. Dentro de `NavigationMenuContent`, `NavigationMenuLink` se dispone como bloque vertical (`flex flex-col gap-0.5 px-3 py-2`) para alojar título y descripción. `NavigationMenuContent` define su ancho y padding base mediante `w-(--navigation-menu-content-width,min(28rem,calc(var(--available-width,100vw)-2rem)))` y `p-(--navigation-menu-content-padding,--spacing(3))`, que en un `NavigationMenu` anidado (`data-nested`) se redefinen a `100%` y `0px`. No fuerces `width` o `height` fijos en `NavigationMenuPopup` ni en `NavigationMenuPositioner`, ya que dependen de `--popup-width`, `--popup-height`, `--positioner-width` y `--positioner-height`. |
| **Colores y temas** | `NavigationMenuList` se asienta sobre `bg-surface-soft` con `border-gray-base`. `NavigationMenuTrigger` y `NavigationMenuLink` usan texto `text-gray-bold` y se elevan a `bg-surface-bold` en `hover` o `data-popup-open`. Un `NavigationMenuLink` con `active` aplica `bg-primary-soft text-primary-bold`. `NavigationMenuPopup` emplea `bg-surface-base` y `border-gray-base`. `NavigationMenuBackdrop` usa `bg-gray-bold/40 dark:bg-surface-soft/70`. Todos los colores se adaptan al tema mediante los tokens de [globals.md](../../globals.md). |
| **Tipografía y geometría** | Los activadores y enlaces usan `.body-sm` (`0.875rem`). En la barra superior aplican `font-medium`. La lista, los activadores, los enlaces y el popup comparten `rounded-base`. `NavigationMenuList` usa `shadow-s` y `NavigationMenuPopup` usa `shadow-m`. `NavigationMenuIcon` renderiza `Chevron` a `size-3.5` (`0.875rem`). |
| **Estados y selectores** | El foco visible en `NavigationMenuTrigger` y `NavigationMenuLink` muestra `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base`. `data-disabled` en el activador aplica `opacity-50 cursor-not-allowed`. `NavigationMenuViewport` recorta el contenido con `relative size-full min-w-0 overflow-hidden rounded-[inherit]` y asegura contexto de posicionamiento relativo en su contenedor interno (`[&>div]:relative`) sin sobreescribir el ancho de `NavigationMenuContent`. |
| **Animaciones** | `NavigationMenuPositioner` interpola su posición (`top,left,right,bottom,transform`) en `200ms ease-out`; `NavigationMenuPopup` interpola `width,height,opacity,scale` en `200ms ease-out` desde `--transform-origin`; `NavigationMenuContent` interpola `opacity,transform,translate` en `200ms ease-out` desplazándose `0.5rem` según `data-activation-direction` (`left`, `right`, `up`, `down`); `NavigationMenuIcon` gira `180deg` en `150ms`. Todas las animaciones están protegidas con `motion-safe:` o `motion-reduce:transition-none` y se desactivan cuando Base UI marca `data-instant`. |
| **Canales de personalización** | Todas las piezas con clases propias aceptan `className` como `string` o función `(state) => string \| undefined` y la combinan con `clsx`. Al usar utilidades basadas en variables CSS (`w-(--navigation-menu-content-width,...)`, `p-(--navigation-menu-content-padding,...)`, `w-(--navigation-menu-width,...)`), cualquier utilidad estándar de ancho o padding (`w-80`, `w-full`, `w-[min(20rem,...)]`, `p-4`) pasada en `className` prevalece en la cascada de Tailwind v4 sin necesidad de `tailwind-merge`. Al usar `render` (por ejemplo, `render={<Link href="/ruta" />}` en `NavigationMenuLink`), Base UI fusiona clases, estilos, eventos y `ref`. |

## 8. Ejemplos de composición

### Integración con `next/link` en Next.js App Router

Usa `render={<Link href="..." />}` en `NavigationMenuLink` para conservar la navegación cliente de Next.js junto con el cierre del panel (`closeOnClick`) y el estado `active`:

~~~tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "@/components/own/base/navigation-menu";

export function HeaderNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu aria-label="Navegación principal">
      <NavigationMenuList>
        <NavigationMenuItem value="documentacion">
          <NavigationMenuTrigger>
            Documentación
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 sm:grid-cols-2">
              <NavigationMenuLink
                render={<Link href="/docs/instalacion" />}
                active={pathname === "/docs/instalacion"}
                closeOnClick
              >
                <span className="font-medium text-gray-bold">Instalación</span>
                <span className="caption text-gray-bold/75">
                  Configuración inicial de estilos y dependencias.
                </span>
              </NavigationMenuLink>
              <NavigationMenuLink
                render={<Link href="/docs/componentes" />}
                active={pathname === "/docs/componentes"}
                closeOnClick
              >
                <span className="font-medium text-gray-bold">Componentes</span>
                <span className="caption text-gray-bold/75">
                  Referencia de las familias exportadas.
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="/changelog" />}
            active={pathname === "/changelog"}
          >
            Novedades
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
  );
}
~~~

### Barra de navegación vertical con apertura lateral

~~~tsx
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
} from "@/components/own/base/navigation-menu";

export function SidebarNavigation() {
  return (
    <NavigationMenu aria-label="Menú de arquitectura" orientation="vertical">
      <NavigationMenuList className="w-48">
        <NavigationMenuItem value="redes">
          <NavigationMenuTrigger className="w-full justify-between">
            Redes y dominios
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[min(18rem,calc(var(--available-width,100vw)-2rem))]">
            <div className="flex flex-col gap-1">
              <NavigationMenuLink href="/redes/dns" closeOnClick>
                Zonas DNS
              </NavigationMenuLink>
              <NavigationMenuLink href="/redes/certificados" closeOnClick>
                Certificados TLS
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
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
  );
}
~~~

## 9. Accesibilidad e integración

- **Etiquetado de la región `<nav>`:** Proporciona un `aria-label` o `aria-labelledby` descriptivo en el `NavigationMenu` raíz, especialmente cuando la página contenga más de una región de navegación. Un `NavigationMenu` anidado renderiza automáticamente un `<div>` para evitar regiones `<nav>` redundantes.
- **Teclado y gestión de foco:**
  - `Tab` entra en la barra y recorre los elementos enfocables; cuando un panel está abierto, Base UI inserta guardas de foco para que `Tab` pase del activador al contenido dentro de `NavigationMenuViewport` y luego continúe con el resto de la barra.
  - En orientación horizontal, `ArrowLeft` y `ArrowRight` mueven el foco entre los elementos de `NavigationMenuList`, y `ArrowDown` abre el panel del activador enfocado. En orientación vertical, `ArrowUp` y `ArrowDown` recorren la lista y `ArrowRight` abre el panel.
  - Dentro de `NavigationMenuContent`, las flechas navegan entre los `NavigationMenuLink` y activadores anidados.
  - `Escape` cierra el panel abierto y devuelve el foco al `NavigationMenuTrigger` que lo abrió.
- **Página actual (`aria-current`):** Pasa `active={true}` al `NavigationMenuLink` que coincida con la ruta actual para exponer `aria-current="page"`.
- **Portales y apilamiento:** `NavigationMenuPortal` monta el posicionador en `document.body` por defecto (`z-50`). Mantén el contenedor principal de la aplicación en un contexto de apilamiento aislado (`isolate`) como se describe en [globals.md](../../globals.md#6-layout-tema-portales-y-movimiento).

## 10. Límites y verificación

- **Dependencias de exportación:** Requiere `components/own/base/navigation-menu.tsx`, `Chevron` desde `components/own/icons` (si se copia el barrel completo de iconos, incluye también `icons/spinner.tsx`), `@base-ui/react` 1.9.0, `clsx`, React 19 y los tokens de `globals.css`. No requiere bloques adicionales en `@layer components`. Consulta [structure.md](../../structure.md#compatibilidad-y-archivos-necesarios).
- **Lista de verificación en el consumidor:**
  1. Comprobar que el cambio entre dos activadores con contenidos de distinto tamaño interpola suavemente el ancho, el alto y la posición del popup, y que `NavigationMenuViewport` está presente dentro de `NavigationMenuPopup`.
  2. Verificar la navegación completa con teclado (`Tab`, flechas, `Enter`/`Espacio` y `Escape`) y la devolución de foco al activador.
  3. Confirmar que los enlaces compuestos con `next/link` mediante `render` navegan sin recargar la página y cierran el panel cuando tienen `closeOnClick`.
  4. Revisar ambos temas, el ajuste dentro de `--available-width` en pantallas estrechas y el comportamiento instantáneo con `prefers-reduced-motion: reduce`.

Para exportar esta familia, incluye `navigation-menu.module.css` junto con `navigation-menu.tsx`. El módulo contiene las transiciones propias y respeta la preferencia de movimiento reducido.
