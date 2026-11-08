# Context Menu

## 1. Identificación

Context Menu envuelve las piezas de `@base-ui/react/context-menu`. Usa `clsx` para las clases, `Check` para las casillas y `Chevron` para los submenús.

## 2. Propósito y casos de uso

Muestra acciones asociadas a un elemento, como fijar una tarea, mover un archivo o cambiar la presentación de una lista. Abre el menú con clic secundario, pulsación prolongada o el gesto de menú contextual del teclado que ofrece el navegador. Ofrece también controles visibles para esas acciones.

## 3. Importación y anatomía

```tsx
"use client";

import { useState } from "react";
import {
  ContextMenu, ContextMenuItem, ContextMenuPopup,
  ContextMenuPortal, ContextMenuPositioner, ContextMenuTrigger,
} from "@/components/own/base/context-menu";

export function TaskActions() {
  const [pinned, setPinned] = useState(false);
  const label = pinned ? "Desfijar tarea" : "Fijar tarea";
  const toggle = () => setPinned((value) => !value);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="p-3">Revisar inventario</ContextMenuTrigger>
      <button type="button" onClick={toggle}>{label}</button>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup aria-label="Acciones de la tarea">
            <ContextMenuItem onClick={toggle}>{label}</ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  );
}
```

| Exportaciones | Nodo predeterminado y función |
| :--- | :--- |
| `ContextMenu`, `ContextMenuSubmenu` | Proveedores sin nodo visible. Coordinan la raíz y cada submenú. |
| `ContextMenuTrigger`, `ContextMenuSubmenuTrigger` | `div` para el área contextual y `div` para la opción que abre un submenú. La segunda pieza incluye un chevron. |
| `ContextMenuPortal`, `ContextMenuPositioner`, `ContextMenuPopup` | `div` para montar, posicionar y contener el menú. |
| `ContextMenuBackdrop`, `ContextMenuArrow` | `div` para el fondo opcional y `div` para la flecha. |
| `ContextMenuItem`, `ContextMenuLinkItem` | `div` para una acción y `a` para un enlace. |
| `ContextMenuGroup`, `ContextMenuGroupLabel`, `ContextMenuSeparator` | `div` para el grupo, su título y el separador. |
| `ContextMenuCheckboxItem`, `ContextMenuCheckboxItemIndicator` | `div` para una opción booleana y `span` para su marca. |
| `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRadioItemIndicator` | `div` para el grupo y cada opción excluyente y `span` para el indicador circular. |

El consumidor aporta los rótulos y las acciones. Coloca las opciones dentro de `Popup`, el fondo opcional junto a `Positioner` dentro de `Portal` y la flecha opcional como hija directa de `Popup`. Cada submenú lleva su propio activador y árbol `Portal > Positioner > Popup` dentro del menú padre.

## 4. Variantes y tamaños

La familia carece de variantes visuales y tamaños propios. Con la escala base de Tailwind, cada fila tiene una altura mínima de `2.25rem`. El popup ajusta su ancho al contenido entre `12rem` y `20rem`, con ambos límites sujetos al espacio disponible.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Raíz y submenú | `open`, `defaultOpen` | `boolean` | `false` sin control | Sí | Apertura controlada o inicial. |
| Raíz y submenú | `onOpenChange` | `(open: boolean, details) => void` | — | Sí | Recibe una solicitud de apertura o cierre. En modo controlado, actualiza `open`. |
| Raíz y submenú | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Notifica cuando termina la animación. |
| Raíz y submenú | `disabled`, `loopFocus`, `highlightItemOnHover` | `boolean` | `false`, `true`, `true` | Sí | Configuran deshabilitación, recorrido circular y resaltado por puntero. |
| Raíz y submenú | `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Sí | Cambia el eje de navegación. Ajusta también el layout si usas una fila horizontal. |
| Raíz y submenú | `onItemHighlighted` | `(item: HTMLElement \| undefined, details) => void` | — | Sí | Notifica el elemento resaltado y su etiqueta, evento y motivo `keyboard`, `pointer` o `none`. |
| Raíz y submenú | `actionsRef` | `RefObject<ContextMenuRootActions \| null>` | — | Sí | Expone `close()` y `unmount()` para las acciones imperativas de Base UI. |
| Submenú | `closeParentOnEsc` | `boolean` | `false` | Sí | Permite que Escape cierre el árbol padre. En la raíz contextual la prop está obsoleta. |
| `Trigger` | `tabIndex` | `number` | `0` en own-ui | Sí | Incluye el área en el recorrido con Tab. Ajusta el valor si la composición ya ofrece un nodo enfocable para el gesto. |
| `Portal` | `container`, `keepMounted` | Elemento, ShadowRoot, ref o `null` y booleano | `body`, `false` | Sí | Elige el destino y si conserva el árbol cerrado en el DOM. |
| `Positioner` | `anchor`, `side`, `align` | Ancla, lado, alineación | Automático, `bottom` o `inline-end`, `start` | Sí | Define el anclaje y la colocación preferida. |
| `Positioner` | `sideOffset`, `alignOffset` | Número o función | Según colocación | Sí | Ajusta la distancia y el desplazamiento. En la raíz con `side` omitido y alineación distinta de `center`, Base UI usa `-5` y `2`. En los demás casos usa `0`. |
| `Positioner` | `collisionBoundary`, `collisionPadding`, `collisionAvoidance`, `sticky`, `arrowPadding`, `disableAnchorTracking` | Opciones de Base UI | Base UI | Sí | Ajusta colisiones, seguimiento y espacio de la flecha. Context Menu usa posición fija. |
| `Popup` | `finalFocus` | Booleano, ref o función de interacción | Base UI | Sí | Elige el destino del foco después de cerrar. |
| `Item`, `LinkItem`, `CheckboxItem`, `RadioItem` | `closeOnClick` | `boolean` | `true` en Item, `false` en las demás | Sí | Cierra el menú al activar la opción si está habilitado. |
| Opciones y `SubmenuTrigger` | `label` | `string` | Texto visible | Sí | Define el texto usado para buscar con el teclado. |
| `Item`, `CheckboxItem`, `RadioItem`, `SubmenuTrigger` | `disabled`, `nativeButton` | `boolean` | `false`, `false` | Sí | Deshabilita la opción o indica que `render` devuelve un botón nativo. |
| `CheckboxItem` | `checked`, `defaultChecked`, `onCheckedChange` | Booleanos y `(checked: boolean, details) => void` | `false` sin control | Sí | Controla o inicializa la marca y notifica el próximo estado. |
| `RadioGroup` | `value`, `defaultValue`, `onValueChange`, `disabled` | Valores de selección, `(value, details) => void` y booleano | —, `false` para disabled | Sí | Controla o inicializa la selección exclusiva. Puede deshabilitar el grupo. |
| `RadioItem` | `value` | Tipo del valor del grupo | — | No | Identifica la opción seleccionable. |
| Indicadores | `children`, `keepMounted` | Nodo y booleano | Marca propia, `false` | Sí | Sustituye el indicador o reserva su espacio sin mostrarlo al desmarcar. |
| `SubmenuTrigger` | `openOnHover`, `delay`, `closeDelay` | Booleano y milisegundos | `true`, `100`, `0` | Sí | Controla la apertura por puntero y la espera antes de abrir o cerrar. |
| `Separator` | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Define el eje del divisor. |
| Piezas con nodo | `className`, `style`, `render`, `ref` | Props de la primitiva | Nodo de cada pieza | Sí | Ajusta el nodo o compón otro conservando sus props, eventos y referencia. |

Las opciones aceptan sus atributos y eventos HTML. Usa `onClick` para ejecutar una acción y `href` o `render` para enlaces. Los callbacks de apertura y selección incluyen el evento y un motivo como `trigger-press`, `item-press`, `escape-key`, `outside-press` o `imperative-action`. `details.cancel()` cancela la solicitud. Consulta los tipos de las piezas en `@base-ui/react/context-menu` para la unión completa y para las firmas de animación externa.

## 6. Funcionamiento y estados

- La raíz usa un ancla virtual en el punto de apertura. El submenú usa su activador. Base UI ajusta el lado según el espacio y puede recibir un `anchor` explícito, por ejemplo al abrir desde un control visible.
- Usa `defaultOpen` para inicializar un menú no controlado, o `open` y `onOpenChange` para sincronizarlo desde fuera. El cierre conserva el popup durante su transición y el portal puede mantenerlo montado después.
- Una casilla cambia de forma independiente. Cada `RadioGroup` mantiene un solo valor seleccionado. Conserva el estado en el consumidor si debe sobrevivir al desmontaje de las opciones al cerrar.
- El clic secundario y la pulsación prolongada los gestiona Base UI. El área también recibe el evento contextual que envía el navegador cuando el foco está dentro de ella. Si deshabilitas la raíz, el navegador puede mostrar su propio menú contextual.

| Nodo | Atributos |
| :--- | :--- |
| Piezas visibles | `data-slot="context-menu-…"` con el sufijo de cada pieza, como `context-menu-submenu-trigger`. |
| Activador | `data-popup-open` cuando el menú está abierto. |
| Popup y fondo | `data-open` o `data-closed` y atributos de inicio o salida según la pieza. El popup puede recibir `data-instant`. |
| Posicionador, popup y flecha | `data-side`, `data-align` y atributos de ancla según la pieza. |
| Opciones | `data-highlighted`, `data-disabled` y, en las piezas de selección, `data-checked` o `data-unchecked`. El activador del submenú puede recibir `data-popup-open`. |

## 7. Estilos admitidos por pieza

| Piezas | Estilo base y personalización |
| :--- | :--- |
| `Trigger` | Radio base y contorno neutro de foco. El consumidor define la superficie y el área de interacción. |
| `Positioner`, `Popup` | `z-50`, límites con `--available-width` y `--available-height`, borde neutro, `surface-base`, radio base y `shadow-m`. El popup desplaza listas altas. Con una flecha como hija directa permite el desbordamiento para que la flecha sobresalga. En ese caso, un contenedor interior puede encargarse del scroll de listas largas. |
| `Arrow`, `Backdrop` | La flecha usa el lado calculado y la superficie del popup. El fondo ocupa el viewport con `z-40` y un tinte adaptado al tema. |
| `Item`, `LinkItem`, `CheckboxItem`, `RadioItem`, `SubmenuTrigger` | Filas compactas con `body-sm`, radio base y resaltado `primary-soft`. La deshabilitación reduce la opacidad. El chevron del submenú apunta hacia la derecha. |
| Indicadores, `GroupLabel`, `Separator` | Marcas decorativas neutras, rótulo `caption` y divisor `gray-base`. Sustituye el contenido del indicador mediante `children`. |

El popup anima opacidad y escala durante 150 ms con origen en `--transform-origin`. El fondo anima opacidad. Ambas transiciones se limitan a `motion-safe` y el popup respeta `data-instant`. Los tokens se reasignan por tema. [Referencia de globals](../../globals.md).

Las piezas estilizadas combinan `className` estático o funcional con sus clases base. `style` se aplica al nodo según el contrato de Base UI. Si usas una función en `render`, propaga el estado y las props que necesita la pieza, incluidos eventos y referencia DOM. Las utilidades en conflicto siguen la cascada CSS.

## 8. Ejemplos de composición

Dentro de `ContextMenuPopup`, puedes montar un submenú. Este fragmento presupone los imports de las piezas desde el módulo own-ui y un handler `archive` definido por el consumidor.

```tsx
<ContextMenuSubmenu>
  <ContextMenuSubmenuTrigger>Mover a carpeta</ContextMenuSubmenuTrigger>
  <ContextMenuPortal>
    <ContextMenuPositioner>
      <ContextMenuPopup aria-label="Carpetas">
        <ContextMenuItem onClick={archive}>Archivo</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenuSubmenu>
```

Para una casilla persistente, usa `checked` y `onCheckedChange` con un estado externo y coloca `ContextMenuCheckboxItemIndicator` dentro de la opción. Para opciones excluyentes, agrupa `ContextMenuRadioItem` con valores únicos en `ContextMenuRadioGroup`. Para una ruta interna, compón `ContextMenuLinkItem` con `render={<Link href="/ruta" />}` y usa `closeOnClick` si debe cerrar el menú inmediatamente.

## 9. Accesibilidad e integración

- Proporciona controles visibles para las mismas acciones. Incluye el área contextual en el recorrido de teclado y explica el gesto cuando sea necesario. En navegadores que lo admiten, Mayús + F10 o la tecla Menú abren el menú desde el área enfocada.
- Las flechas recorren las opciones, escribir busca por su etiqueta y Enter o Espacio activa la opción. La flecha derecha abre el submenú y la izquierda vuelve al padre. Escape cierra el nivel correspondiente.
- Da un nombre al popup y conserva sus roles, eventos y referencias al componer las piezas. Usa `finalFocus` si el foco debe regresar a un control concreto.
- Mantén los handlers y las referencias en un módulo cliente de App Router. Comprueba el apilamiento y la herencia de tema si el portal usa un contenedor personalizado.

## 10. Límites y verificación

Exporta `context-menu.tsx`, `Check` y `Chevron` con sus archivos de soporte. Usa Base UI 1.9.0, `clsx`, React 19 y Tailwind CSS con los tokens de own-ui. [Estructura de exportación](../../structure.md).

Verifica los gestos en los dispositivos objetivo, el retorno del foco, los estados marcado y deshabilitado y la colocación cerca de los bordes. La activación por teclado depende de los gestos contextuales que emite el navegador. [Context Menu en Base UI](https://base-ui.com/react/components/context-menu).
