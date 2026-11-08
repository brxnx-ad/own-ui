# Menu

## 1. Identificación

Menu es una familia independiente que envuelve la primitiva homónima de Base UI y usa clsx y los iconos de soporte Check y Chevron. [Menu de Base UI](https://base-ui.com/react/components/menu)

## 2. Propósito y casos de uso

Agrupa acciones breves, destinos y preferencias detrás de un botón. Admite acciones que cierran el menú, selecciones que pueden permanecer visibles, submenús y una consulta para filtrar opciones. Usa Context Menu para acciones invocadas sobre una superficie con clic secundario o pulsación prolongada. Para elegir el valor de un campo de formulario, usa Select o Combobox según la interacción requerida. Para contenido libre o una tarea con varios campos, usa un Popover o Dialog.

## 3. Importación y anatomía

~~~tsx
import {
  Menu,
  MenuArrow,
  MenuBackdrop,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuClear,
  MenuEmpty,
  MenuFilterProvider,
  MenuGroup,
  MenuGroupLabel,
  MenuInput,
  MenuItem,
  MenuLinkItem,
  MenuList,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  MenuViewport,
  createMenuHandle,
  useMenuFilter,
  type MenuHandle,
} from "@/components/own/independant/menu";
~~~

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| Menu | Sin nodo | Coordina apertura, activador, navegación y selección. |
| MenuTrigger | `button` | Abre el menú y actúa como ancla. El consumidor aporta el nombre. |
| MenuPortal | `div` en el destino | Monta el panel fuera de su árbol DOM original, en `body` de forma predeterminada. |
| MenuBackdrop | `div` | Fondo visual opcional dentro del portal, antes del posicionador. |
| MenuPositioner | `div` | Calcula la posición y el espacio disponible. |
| MenuPopup | `div` | Contiene las opciones. Su rol es `menu` sin List, `presentation` con List sin filtro y `dialog` con filtro. |
| MenuArrow | `div` | Flecha decorativa opcional, hija directa de Popup. |
| MenuGroup | `div` | Reúne opciones relacionadas. |
| MenuGroupLabel | `div` | Nombra el Group o RadioGroup que lo contiene. |
| MenuSeparator | `div` | Separa visual y semánticamente dos bloques. |
| MenuItem | `div` | Ejecuta una acción que aporta el consumidor. |
| MenuLinkItem | `a` | Navega a un destino que aporta el consumidor. |
| MenuCheckboxItem | `div` | Alterna una opción booleana. |
| MenuCheckboxItemIndicator | `span` | Presenta la marca decorativa dentro de CheckboxItem. |
| MenuRadioGroup | `div` | Coordina los RadioItem que contiene. |
| MenuRadioItem | `div` | Representa una opción exclusiva identificada por `value`. |
| MenuRadioItemIndicator | `span` | Presenta el punto decorativo dentro de RadioItem. |
| MenuSubmenu | Sin nodo | Agrupa el activador hijo y su propia composición Portal → Positioner → Popup. Vive en el menú padre. |
| MenuSubmenuTrigger | `div` | Abre el submenú desde una fila del padre. Incluye un chevron decorativo. |
| MenuViewport | `div` | Aloja el contenido entrante y saliente al cambiar de activador. Se coloca dentro de Popup cuando se anima ese cambio. |
| MenuFilterProvider | Sin nodo | Configura la búsqueda del Menu o MenuSubmenu situado directamente dentro. |
| MenuInput | `input` | Captura la consulta dentro de Popup. |
| MenuClear | `button` | Borra la consulta. El consumidor aporta un nombre accesible. |
| MenuList | `div` | Agrupa las opciones y recibe el rol `menu` dentro del popup filtrable. |
| MenuEmpty | `div` | Presenta el contenido que aporta el consumidor cuando no hay coincidencias. |

`createMenuHandle<Payload>()` conecta la raíz y los activadores externos. `MenuHandle<Payload>` es el tipo de ese objeto. `useMenuFilter(options?)` devuelve los comparadores `contains`, `startsWith` y `endsWith` para composiciones con filtrado propio.

~~~tsx
import {
  Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger,
} from "@/components/own/independant/menu";

export function DocumentMenu({ onDuplicate }: { onDuplicate: () => void }) {
  return (
    <Menu>
      <MenuTrigger>Acciones del documento</MenuTrigger>
      <MenuPortal>
        <MenuPositioner align="start" sideOffset={6}>
          <MenuPopup>
            <MenuItem onClick={onDuplicate}>Duplicar</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}
~~~

Coloca esta composición en un módulo cliente cuando el consumidor aporte handlers.

## 4. Variantes y tamaños

La familia carece de props propias `variant` y `size`. El activador tiene altura mínima de 2.5 rem y las filas de 2.25 rem. El panel usa un ancho mínimo de hasta 12 rem y un máximo de hasta 20 rem, limitados ambos por el espacio disponible. La orientación, la modalidad y el filtrado cambian el funcionamiento.

## 5. Props y callbacks

La API hereda las props de Base UI y los atributos HTML del nodo que renderiza cada pieza. Los valores siguientes corresponden a Base UI 1.9.0. Las clases de own-ui y el contenido predeterminado de los indicadores se detallan en la sección 7.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Menu, Submenu | `open`, `defaultOpen` | `boolean` | —, `false` | Sí | Apertura controlada o estado inicial. |
| Menu, Submenu | `onOpenChange` | `(open: boolean, details: ChangeDetails) => void` | — | Sí | Recibe la solicitud de abrir o cerrar. |
| Menu, Submenu | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al terminar la transición de apertura o cierre. |
| Menu, Submenu | `onItemHighlighted` | `(item: HTMLElement \| undefined, details: HighlightDetails) => void` | — | Sí | Informa cambios de resaltado y entrega `label` cuando corresponde. |
| Menu, Submenu | `orientation`, `loopFocus` | `'vertical' \| 'horizontal'`, `boolean` | `'vertical'`, `true` | Sí | Determinan el eje de las flechas y si el foco vuelve al extremo opuesto. El layout horizontal lo define el consumidor. |
| Menu, Submenu | `highlightItemOnHover`, `disabled` | `boolean` | `true`, `false` | Sí | Regulan el resaltado al mover el puntero y la interacción de las piezas sensibles a la raíz. |
| Menu, Submenu | `actionsRef` | `RefObject<MenuRootActions \| null>` | — | Sí | Expone `close()` y `unmount()` para cierre imperativo y transiciones gestionadas externamente. |
| Menu, Submenu | `closeParentOnEsc` | `boolean` | `false` | Sí | En un submenú, cierra toda la cadena con Escape. |
| Menu | `modal` | `boolean` | `true` | Sí | Limita la interacción exterior en un menú superior abierto por pulsación o teclado. |
| Menu | `triggerId`, `defaultTriggerId` | `string \| null` | — | Sí | Identifica el activador asociado en modo controlado o al comenzar abierto. |
| Menu | `handle`, `children` | `MenuHandle<Payload>`, `ReactNode \| (({ payload }) => ReactNode)` | — | Sí | Asocia activadores separados y permite renderizar el contenido a partir de su payload. |
| Trigger | `handle`, `payload` | `MenuHandle<Payload>`, `Payload` | — | Sí | Conecta el activador con la raíz y suministra sus datos. |
| Trigger, SubmenuTrigger | `openOnHover`, `delay`, `closeDelay` | `boolean`, `number`, `number` | `false` en Trigger aislado y `true` en SubmenuTrigger, `100`, `0` | Sí | Configura la apertura por puntero y sus demoras en ms. Dentro de Menubar, Trigger adapta la apertura a la rama activa. |
| Trigger, SubmenuTrigger, Item, CheckboxItem, RadioItem, Clear | `disabled`, `nativeButton` | `boolean` | `false`; `true` en Trigger y Clear, `false` en las filas | Sí | Deshabilita la interacción y comunica a Base UI si el elemento renderizado es un botón nativo. |
| Portal | `container` | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null` | `body` | Sí | Cambia el destino del portal. |
| Portal | `keepMounted` | `boolean` | `false` | Sí | Mantiene el contenido montado al cerrar. |
| Positioner | `anchor`, `positionMethod` | `Element \| VirtualElement \| RefObject<Element \| null> \| (() => Element \| VirtualElement \| null) \| null`, `'absolute' \| 'fixed'` | Activador, `'absolute'` | Sí | Cambia el ancla o la estrategia CSS. |
| Positioner | `side`, `align` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'inline-start' \| 'inline-end'`, `'start' \| 'center' \| 'end'` | `'bottom'`, `'center'` en Menu aislado y `'inline-end'`, `'start'` en Submenu | Sí | Colocación preferida. Menubar adapta los valores iniciales a su orientación. |
| Positioner | `sideOffset`, `alignOffset` | `number \| OffsetFunction` | `0` | Sí | Separación o desplazamiento en píxeles. La función recibe `{side, align, anchor, positioner}` con las dimensiones de ambos nodos. |
| Positioner | `collisionBoundary`, `collisionPadding`, `collisionAvoidance` | `Boundary`, `Padding`, `CollisionAvoidance` | `'clipping-ancestors'`, `5`, estrategia de Base UI según la rama | Sí | Controla los límites, el margen y el ajuste cuando falta espacio. |
| Positioner | `arrowPadding`, `sticky`, `disableAnchorTracking` | `number`, `boolean`, `boolean` | `5`, `false`, `false` | Sí | Limita el recorrido de la flecha, mantiene el panel en vista o desactiva el seguimiento del ancla. |
| Popup | `finalFocus` | `boolean \| RefObject<HTMLElement \| null> \| ((closeType) => boolean \| HTMLElement \| null \| void)` | Foco de Base UI | Sí | Devuelve el foco según el tipo de interacción `mouse`, `touch`, `pen` o `keyboard`. `true` usa el destino predeterminado y `false` evita moverlo. |
| Item, LinkItem, CheckboxItem, RadioItem, SubmenuTrigger | `label`, `id` | `string` | Texto, generado | Sí | Personaliza el texto que se usa para buscar o navegar por escritura y el identificador de la opción. |
| Item, LinkItem, CheckboxItem, RadioItem | `closeOnClick` | `boolean` | `true` en Item, `false` en el resto | Sí | Cierra el menú al activar la opción. |
| Item, CheckboxItem, RadioItem, SubmenuTrigger | `onClick` | Handler de ratón de su elemento | — | Sí | Maneja la activación del elemento. LinkItem hereda los eventos nativos del enlace. |
| LinkItem | `href`, `target`, `rel` | Atributos de `a` | — | Sí | Aporta un destino válido mediante `href` o mediante el enlace que pases a `render`. |
| CheckboxItem | `checked`, `defaultChecked` | `boolean` | —, `false` | Sí | Marcado controlado o estado inicial. |
| CheckboxItem | `onCheckedChange` | `(checked: boolean, details: ChangeDetails) => void` | — | Sí | Recibe el cambio booleano solicitado. |
| RadioGroup | `value`, `defaultValue`, `disabled` | `any`, `any`, `boolean` | —, —, `false` | Sí | Selección controlada o inicial y deshabilitación del grupo. |
| RadioGroup | `onValueChange` | `(value: any, details: ChangeDetails) => void` | — | Sí | Recibe el valor solicitado. |
| RadioItem | `value` | `any` | — | No | Valor comparado por igualdad estricta con el de RadioGroup. Usa identificadores estables y únicos. |
| Indicadores | `keepMounted`, `children` | `boolean`, `ReactNode` | `false`, marca de selección | Sí | Conserva el nodo y su espacio o sustituye el icono. |
| Separator | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Sí | Cambia la semántica y el eje del trazo. |
| FilterProvider | `filter`, `locale` | `((text: string, query: string) => boolean) \| null`, `Intl.LocalesArgument` | Coincidencia por contenido, entorno | Sí | Compara cada texto con la consulta recortada. Pasa `null` para filtrar externamente. |
| FilterProvider | `autoHighlight` | `boolean \| 'always'` | `false` | Sí | Resalta la primera coincidencia durante la búsqueda o incluso con consulta vacía usando `'always'`. |
| FilterProvider | `value`, `defaultValue` | `string` | —, `''` | Sí | Controla o inicializa la consulta. El proveedor administra el valor del input. |
| FilterProvider | `onValueChange` | `(value: string, details: FilterDetails) => void` | — | Sí | Recibe escritura, borrado y reinicio al cerrar. |
| Piezas con nodo | `className`, `style` | `string \| ((state) => string \| undefined)`, `CSSProperties \| ((state) => CSSProperties \| undefined)` | Clases de la pieza, — | Sí | Aplica clases o estilos al nodo renderizado. |
| Piezas con nodo | `render`, `ref` | `ReactElement \| ((props, state) => ReactElement)`, ref compatible | Nodo de la pieza, — | Sí | Sustituye el nodo y permite referenciar el elemento resultante. |

`ChangeDetails` incluye `event`, `reason`, `trigger` cuando está disponible y `cancel()`. En apertura o cierre, los motivos tipados son `trigger-hover`, `trigger-focus`, `trigger-press`, `outside-press`, `focus-out`, `list-navigation`, `escape-key`, `item-press`, `close-press`, `sibling-open`, `cancel-open`, `imperative-action` y `none`. Las casillas y los radios notifican `item-press`. `HighlightDetails` describe el evento, la etiqueta y el motivo `keyboard`, `pointer` o `none`. `FilterDetails` permite cancelar y distingue `input-change`, `input-clear`, `clear-press` y `popup-close`. Consulta los tipos `MenuRoot`, `MenuCheckboxItem`, `MenuRadioGroup` y `MenuFilterProvider` de `@base-ui/react/menu` para tipar los handlers.

## 6. Funcionamiento y estados

- Pasa `open` y `onOpenChange` para actualizar la apertura desde el consumidor. `defaultOpen` fija la apertura inicial en modo no controlado. Aplica la misma distinción a `checked` y `defaultChecked`, `value` y `defaultValue`. Mantén el modo durante la vida de la pieza.
- El cierre normal desmonta el portal al acabar la transición. Con `keepMounted` el panel cerrado se oculta y conserva su contenido. Para terminar una animación de salida externa, llama a `details.preventUnmountOnClose()` al recibir el cierre y luego a `actionsRef.current?.unmount()`. El montaje de los indicadores se controla por separado.
- Las selecciones no controladas guardadas en piezas que se desmontan vuelven a sus valores iniciales al remontar. Para conservarlas, usa estado controlado por encima del portal o `keepMounted`. Con un filtro, la consulta se reinicia al cerrar salvo que canceles el cambio o conserves explícitamente el valor controlado.
- Un menú abierto por hover permite interactuar con el exterior aunque `modal` esté habilitado. En menús modales abiertos por otros medios, Base UI limita las pulsaciones exteriores y aplica su política de bloqueo de scroll según el dispositivo. Backdrop aporta la capa visual. La lógica de cierre y modalidad pertenece a Base UI.
- Con varios botones, `children` puede leer el `payload` activo. Si controlas la apertura, sincroniza `triggerId` con el `id` del botón activo. Un handle estable conecta botones externos con la raíz superior. `handle.open(triggerId)` y `handle.close()` se ejecutan desde handlers o efectos mientras la raíz está montada. `handle.isOpen` informa el estado.
- MenuFilterProvider usa coincidencia por texto sin distinguir mayúsculas, acentos ni puntuación. Coloca Input, Clear y Empty dentro de Popup y las opciones dentro de List. Para filtrar un submenú, envuelve su propia raíz con otro proveedor. Loading y los errores de operaciones quedan a cargo del consumidor.

El prefijo de `data-slot` es `menu-`. Menu, Submenu y FilterProvider carecen de nodo.

| Pieza | Sufijo de `data-slot` | Atributos de estado relevantes |
| :--- | :--- | :--- |
| Trigger | `trigger` | `data-popup-open`, `data-pressed`, `data-disabled`. |
| Portal | `portal` | Sin estado propio. |
| Backdrop | `backdrop` | `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`. |
| Positioner | `positioner` | `data-open`, `data-closed`, `data-side`, `data-align`, `data-anchor-hidden`; `data-nested` en submenús y `data-instant` según interacción. |
| Popup | `popup` | `data-open`, `data-closed`, `data-side`, `data-align`, `data-starting-style`, `data-ending-style`, `data-instant` y `data-nested` en submenús. |
| Arrow | `arrow` | `data-open`, `data-closed`, `data-side`, `data-align`, `data-uncentered`. |
| Item | `item` | `data-highlighted`, `data-disabled`. |
| LinkItem | `link-item` | `data-highlighted`. |
| CheckboxItem, RadioItem | `checkbox-item`, `radio-item` | `data-checked`, `data-unchecked`, `data-highlighted`, `data-disabled`. |
| Indicadores | `checkbox-item-indicator`, `radio-item-indicator` | Estados de su fila y atributos de transición `data-starting-style`, `data-ending-style`. |
| RadioGroup | `radio-group` | `data-disabled`. |
| SubmenuTrigger | `submenu-trigger` | `data-popup-open`, `data-highlighted`, `data-disabled`. |
| Separator | `separator` | `data-orientation`. |
| Viewport | `viewport` | `data-activation-direction`, `data-transitioning`, `data-instant`. Los descendientes de transición llevan `data-current` y `data-previous`. |
| Input, Clear | `input`, `clear` | `data-highlighted` en el input y `data-disabled` en Clear. |
| Group, GroupLabel, List, Empty | `group`, `group-label`, `list`, `empty` | Sin estado propio. |

## 7. Estilos admitidos por pieza

| Pieza | Geometría y estados |
| :--- | :--- |
| Trigger | `body-sm`, altura mínima de 2.5 rem, padding horizontal de 0.75 rem, fondo `surface-base`, borde `gray-base`, texto `gray-bold` y radio `rounded-base`. En hover y apertura usa `surface-bold`. `:focus-visible` muestra un contorno primario con offset. |
| Backdrop | Capa fija de viewport en `z-40`. Usa `gray-bold/40` en claro y `surface-soft/70` en oscuro. El puntero atraviesa la capa visual. |
| Positioner | `z-50` y ancho máximo `--available-width`. Se oculta visualmente si el ancla queda oculta. Usa sus props de posición para cambiar distancias. |
| Popup | `surface-base`, texto `gray-bold`, borde `gray-base`, `rounded-base`, `shadow-m` y padding de 0.25 rem. Usa `--available-height` para limitar la altura y habilita scroll vertical. Con Arrow como hijo directo permite desborde para mostrar la flecha. Si ese panel contiene muchas opciones, limita y desplaza un contenedor interior, dejando la flecha fuera de él. |
| Arrow | Cuadrado de 0.5 rem rotado según `data-side` con fondo y borde del panel. Se oculta si Base UI indica `data-uncentered`. |
| Filas y SubmenuTrigger | `body-sm`, altura mínima de 2.25 rem, gap de 0.5 rem, padding y radio compartidos. El texto usa `gray-bold` y el fondo `primary-soft` señala el resaltado o el submenú abierto. Las filas deshabilitadas atenúan su opacidad. SubmenuTrigger muestra un chevron de 1 rem que apunta a la derecha. |
| Indicadores | Caja de 1 rem y color `gray-bold`. Check usa 1 rem y el punto ocupa 0.5 rem. Cambia `children` para sustituir la marca. Usa `keepMounted` para reservar su ancho entre estados. |
| GroupLabel, Separator | La etiqueta usa `caption`, peso seminegrita y `gray-bold/75`. El separador dibuja un trazo neutro de 1 px en su eje. |
| Input, Clear, List, Empty | Input usa ancho completo, altura mínima de 2.25 rem, `surface-bold`, borde neutro y foco primario. Clear usa esa misma altura mínima, fondo elevado al pasar el puntero y contorno primario al enfocarlo. List conserva la distribución del consumidor. Empty usa `body-sm` y texto neutro atenuado. |
| Portal, Group, RadioGroup, Viewport | Aceptan la distribución y estilos que añada el consumidor. Viewport delega las transiciones de contenido al consumidor. |

Popup anima opacidad y escala durante 150 ms, desde y hacia una escala del 95 %, con origen `--transform-origin` y `ease-out`. Backdrop anima opacidad durante 150 ms. Las transiciones base se aplican con `motion-safe`, y `data-instant` omite la transición de Popup. Si animas cambios de contenido con Viewport, Base UI expone `--popup-width` y `--popup-height`, y el Positioner puede fijar su caja durante el cambio con `--positioner-width` y `--positioner-height`. Conserva los estados de montaje y el movimiento reducido al sustituir estas reglas.

Las clases base se combinan con `className` estático o funcional mediante clsx. Los estilos estáticos o funcionales pasan a Base UI, que también coordina eventos y refs al componer con `render`. El orden textual de utilidades incompatibles no resuelve su precedencia. Para ajustar una instancia, aplica un selector dirigido por slot o estado, o usa `style={{ minWidth: "min(14rem, var(--available-width))" }}` en Popup. El centrado y la separación exterior corresponden al consumidor. Para cambiar la paleta o la geometría de todas las instancias, modifica los tokens compartidos. [Referencia de estilos](../globals.md)

## 8. Ejemplos de composición

### Preferencia controlada y navegación interna

~~~tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu, MenuCheckboxItem, MenuCheckboxItemIndicator, MenuLinkItem,
  MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger,
} from "@/components/own/independant/menu";

export function ViewMenu() {
  const [details, setDetails] = useState(true);

  return (
    <>
      <Menu>
        <MenuTrigger>Vista</MenuTrigger>
        <MenuPortal>
          <MenuPositioner align="start" sideOffset={6}>
            <MenuPopup>
              <MenuCheckboxItem checked={details} onCheckedChange={setDetails}>
                <MenuCheckboxItemIndicator keepMounted />
                Mostrar detalles
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuLinkItem render={<Link href="/preferencias" />} closeOnClick>
                Abrir preferencias
              </MenuLinkItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      {details && <p>Informe mensual · 12 páginas</p>}
    </>
  );
}
~~~

### Acciones con filtro

~~~tsx
"use client";

import {
  Menu, MenuClear, MenuEmpty, MenuFilterProvider, MenuInput, MenuItem,
  MenuList, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger,
} from "@/components/own/independant/menu";

export function FileMenu({ onArchive }: { onArchive: () => void }) {
  return (
    <MenuFilterProvider autoHighlight locale="es">
      <Menu modal={false}>
        <MenuTrigger>Buscar acción</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={6}>
            <MenuPopup aria-label="Buscar acción">
              <div className="flex items-center gap-1 p-1">
                <MenuInput aria-label="Nombre de la acción" />
                <MenuClear>Borrar</MenuClear>
              </div>
              <MenuEmpty>Sin coincidencias.</MenuEmpty>
              <MenuList>
                <MenuItem onClick={onArchive}>Archivar</MenuItem>
              </MenuList>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </MenuFilterProvider>
  );
}
~~~

Para compartir el panel entre botones de otra rama del árbol, crea un `createMenuHandle<Payload>()` estable, pasa el resultado a los activadores y a Menu y lee `{ payload }` desde el hijo de función. Para un submenú, coloca MenuSubmenu en la lista del padre y deja MenuSubmenuTrigger dentro de esa raíz junto a su propio portal.

## 9. Accesibilidad e integración

- Los botones necesitan un nombre. Si el activador o Clear solo muestra un icono, aporta `aria-label`. Da un nombre accesible al popup filtrable y a MenuInput, y un texto a las acciones. Si el nombre visible de una fila es complejo, usa `label` para la búsqueda por escritura y conserva un nombre accesible en el nodo.
- En el menú normal, Enter y Espacio activan el botón u opción, las flechas recorren la lista según su orientación y escribir navega por coincidencias de prefijo. La flecha derecha abre el submenú vertical y la izquierda vuelve. Escape cierra y restaura el foco según la rama y `finalFocus`.
- En el menú filtrable, al abrir con teclado o clic el foco va al input. La apertura por hover, toque o lápiz evita abrir el teclado en pantalla. Las flechas cambian el elemento activo sin sacar el foco del campo. Tab cierra el menú y Mayús+Tab devuelve el foco al activador.
- Al usar `render`, conserva los atributos ARIA, el ref y los handlers recibidos. Ajusta `nativeButton` si cambias la semántica del nodo, por ejemplo al renderizar un botón real en Item. Para navegación usa LinkItem con un enlace y un destino válido.
- El portal debe heredar los tokens y la tipografía de ambos temas y quedar en un contexto de apilamiento adecuado. Si cambias `container`, verifica colisiones, visibilidad de submenús y orden con otras capas. En móvil, prueba el scroll del panel, especialmente si hay flecha.
- Mantén `"use client"` en el módulo propio y en las composiciones que contienen estado, funciones pasadas como hijos o handlers. [Integración en App Router](../structure.md)

## 10. Límites y verificación

Exporta `menu.tsx`, Check y Chevron con su helper SVG y los tokens y utilidades compartidos. Si conservas el barrel completo de iconos, incluye su reexportación de Spinner. Menu usa las utilidades de Tailwind v4 y no requiere un bloque CSS propio. Las piezas de filtro requieren la API de Menu de Base UI 1.9.0. El menú tampoco registra valores en formularios.

Verifica navegación y retorno de foco con teclado, opciones deshabilitadas, persistencia de las selecciones, coincidencias y borrado del filtro, destinos Link y posicionamiento junto a los bordes. Prueba ambos temas, un viewport estrecho y la preferencia de movimiento reducido.
