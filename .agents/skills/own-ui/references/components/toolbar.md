# Toolbar

## 1. Identificación

Toolbar envuelve `Root`, `Group`, `Button`, `Input`, `Link` y `Separator` de `@base-ui/react/toolbar` y combina sus estilos con `clsx`. [API de Base UI](https://base-ui.com/react/components/toolbar)

## 2. Propósito y casos de uso

Agrupa herramientas relacionadas y permite recorrerlas con las flechas desde un punto de entrada por tabulación. Sirve para acciones de un editor, ajustes de una vista o controles de un documento. Toggle Group aporta selección compartida cuando varias herramientas necesitan estado presionado. Un grupo de enlaces de navegación general puede usar `nav`.

## 3. Importación y anatomía

Adapta los imports a la [estructura del consumidor](../structure.md).

```tsx
"use client";

import Link from "next/link";
import {
  Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator,
} from "@/components/own/independant/toolbar";

export function ReportTools({ undo, redo }: { undo: () => void; redo: () => void }) {
  return (
    <Toolbar aria-label="Herramientas del informe">
      <ToolbarGroup aria-label="Historial">
        <ToolbarButton onClick={undo}>Deshacer</ToolbarButton>
        <ToolbarButton onClick={redo}>Rehacer</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink render={<Link href="/ayuda" />}>Ayuda</ToolbarLink>
      <ToolbarInput aria-label="Buscar en el informe" placeholder="Buscar" />
    </Toolbar>
  );
}
```

| Exportación | Nodo predeterminado y `data-slot` | Responsabilidad |
| :--- | :--- | :--- |
| `Toolbar` | `div[role="toolbar"]`, `toolbar` | Coordina foco, orientación y deshabilitación de los controles compatibles. |
| `ToolbarGroup` | `div[role="group"]`, `toolbar-group` | Agrupa herramientas relacionadas y comparte la deshabilitación. |
| `ToolbarButton` | `button`, `toolbar-button` | Ejecuta una acción o compone un activador. |
| `ToolbarInput` | `input`, `toolbar-input` | Integra un campo nativo con el recorrido. |
| `ToolbarLink` | `a`, `toolbar-link` | Integra un enlace navegable con el recorrido. |
| `ToolbarSeparator` | `div[role="separator"]`, `toolbar-separator` | Separa visual y semánticamente conjuntos de herramientas. |

Coloca las herramientas dentro de Toolbar. Group es opcional. El consumidor aporta el orden, los nombres, el contenido, los destinos y los handlers. Se exportan `ToolbarOrientation` y los tipos `Props` y `State` de cada pieza.

## 4. Variantes y tamaños

Las piezas usan `className` y `style` para ajustes de densidad. La orientación heredada es horizontal por defecto y admite `"vertical"`. En horizontal, la barra y sus subgrupos pueden repartir los controles en varias filas. En vertical los apilan. Botón, enlace y campo tienen una altura mínima de 36 px. El campo mide 176 px con la escala predeterminada y se acota al ancho disponible.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Toolbar | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Configura el eje visual y de navegación. |
| Toolbar | `loopFocus` | `boolean` | `true` | Sí | Permite que las flechas pasen de un extremo al otro. |
| Toolbar, Group, Button, Input | `disabled` | `boolean` | `false` | Sí | La deshabilitación se combina entre raíz, grupo y control. |
| Toolbar y Group | `aria-label`, `aria-labelledby` | `string` | — | Sí | Dan nombre a la barra y a los subgrupos cuando corresponda. |
| Button e Input | `focusableWhenDisabled` | `boolean` | `true` | Sí | Conserva el elemento en el recorrido cuando está deshabilitado. `false` lo omite. |
| Button | `nativeButton` | `boolean` | `true` | Sí | Usa `false` si `render` produce un nodo distinto de `button`. |
| Button | `onClick` | Evento de ratón del botón tipado por Base UI | — | Sí | Conecta una acción. Puedes componer un activador mediante `render`. |
| Input | `value`, `defaultValue` | `string \| number \| readonly string[]` | — | Sí | Valor controlado o inicial del campo. |
| Input | `onChange` | Evento de cambio del input tipado por Base UI | — | Sí | Lee el valor desde `event.currentTarget.value`. |
| Input | `readOnly` | `boolean` | `false` | Sí | Mantiene visible el valor y conserva el foco. El nodo nativo de own-ui también lo activa cuando el estado resuelto es deshabilitado. |
| Link | `href` | `string` | — | Sí | Destino del enlace. En navegación interna se puede proporcionar en un `Link` de Next.js pasado a `render`. |
| Separator | `orientation` | `"horizontal" \| "vertical"` | Eje opuesto al de Toolbar | Sí | Sustituye el eje que se deriva de la barra. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases al nodo según el estado de la pieza. |
| Todas | `style` | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo. |
| Todas | `render` | `React.ReactElement \| ((props, state) => React.ReactElement)` | Nodo predeterminado de la pieza | Sí | Sustituye o compone el nodo y conserva sus props. |
| Todas | `ref`, atributos y eventos HTML | Según el nodo | — | Sí | Permiten acceder al elemento o añadir atributos y eventos compatibles. |

Toolbar gestiona el foco internamente. Las acciones y los cambios de valor usan los eventos de cada control. Si necesitas selección controlada, compón un Toggle Group y gestiona allí `value` y `onValueChange`.

## 6. Funcionamiento y estados

- Base UI registra las herramientas y mantiene un punto de entrada por tabulación. Las flechas recorren el orden de los controles en el DOM. El ajuste de línea visual no cambia ese orden. Separator queda fuera del recorrido.
- `disabled` se propaga desde Toolbar y Group a Button, Input y grupos de Toggle compatibles. Link conserva su destino y su participación en el foco. Los botones deshabilitados se mantienen enfocables por defecto y se omiten con `focusableWhenDisabled={false}`.
- Con el `input` nativo de own-ui, un campo de texto deshabilitado conserva su valor con `readOnly` y puede recibir foco si `focusableWhenDisabled` está activo. Con `focusableWhenDisabled={false}`, también recibe el atributo nativo `disabled`. Si sustituyes el nodo con `render`, usa `state.disabled` y `state.focusable` para aplicar el bloqueo de edición que corresponda al control.
- Todas las piezas exponen `data-orientation`. Toolbar y Group añaden `data-disabled`. Button e Input añaden `data-disabled` y `data-focusable`, que indica si conservan el foco al deshabilitarse. Toolbar expone también `aria-orientation`. Separator refleja su eje propio en `aria-orientation` y `data-orientation`.
- Un Toggle Group compuesto dentro de Toolbar conserva su estado de selección y delega el recorrido de foco a la barra. [Referencia de Toggle Group](toggle-group.md)

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones, apariencia y ajustes |
| :--- | :--- |
| Toolbar | `inline-flex`, ancho máximo del contenedor, `gap-2` y `p-2`. Usa `surface-base`, borde `gray-base`, `rounded-base` y `shadow-s`. En vertical apila y estira las herramientas. El consumidor controla el margen exterior. |
| Group | Adapta su distribución al eje de la barra con `gap-1.5`. Puedes ajustar el espacio o el ancho sin modificar el orden de los controles. |
| Button | Usa texto pequeño de peso medio, altura y ancho mínimos de 36 px y padding horizontal de 10 px. Los SVG sin clase de tamaño miden 16 px. En hover habilitado o con `data-popup-open` usa `surface-bold`. |
| Input | Usa `surface-bold`, borde `gray-base`, texto base en móvil y pequeño desde `sm`. `aria-invalid` aplica `error-base` al borde y al contorno de foco. Puedes cambiar el ancho con `style` o clases. |
| Link | Comparte geometría y foco con Button. El subrayado distingue la navegación y el hover usa `surface-bold`. |
| Separator | Línea de 1 px en `gray-base`. Una línea vertical se estira al alto de la fila. Una horizontal ocupa todo el ancho. En colores forzados usa `CanvasText`. |

Button, Input y Link tienen un contorno exterior de foco de 2 px. Button e Input reducen la opacidad al deshabilitarse. En colores forzados usan `GrayText` y opacidad completa. Button y Link transicionan colores durante 150 ms solo con movimiento permitido. Los tokens normales siguen [globals.css](../globals.md).

Las clases estáticas y funcionales se combinan con `clsx` y la cascada resuelve conflictos. `style` actúa sobre el nodo de la pieza. Usa los `data-slot` y atributos de estado para ajustes localizados. Conserva el espacio del contorno de foco al ajustar la separación o el overflow de la barra.

## 8. Ejemplos de composición

Este menú utiliza un único botón para el activador y la herramienta. El consumidor proporciona `onCompact` y `onComfortable`.

```tsx
"use client";

import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@/components/own/independant/menu";
import { Toolbar, ToolbarButton } from "@/components/own/independant/toolbar";

export function DensityTools({ onCompact, onComfortable }: {
  onCompact: () => void;
  onComfortable: () => void;
}) {
  return (
    <Toolbar aria-label="Densidad de lectura">
      <Menu>
        <ToolbarButton render={<MenuTrigger />}>Densidad</ToolbarButton>
        <MenuPortal>
          <MenuPositioner sideOffset={6}>
            <MenuPopup>
              <MenuItem onClick={onComfortable}>Cómoda</MenuItem>
              <MenuItem onClick={onCompact}>Compacta</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <ToolbarButton onClick={onComfortable}>Restablecer</ToolbarButton>
    </Toolbar>
  );
}
```

Para herramientas presionables, monta un `ToggleGroup` dentro de Toolbar y coloca dentro sus `Toggle` con valores únicos. Para Tooltip, compón `render={<ToolbarButton />}` desde `TooltipTrigger`. Al sustituir el nodo de un activador, comprueba que el componente receptor conserve las props de foco, eventos, `disabled` y ref.

## 9. Accesibilidad e integración

- Nombra la barra y los botones solo icono mediante `aria-label` o `aria-labelledby`. Usa Tab para entrar o salir y las flechas izquierda y derecha en horizontal o arriba y abajo en vertical.
- En una barra horizontal, usa un solo campo de texto y colócalo al final. Las flechas se dedican a la edición mientras el cursor pueda avanzar en esa dirección. Al llegar al extremo, el recorrido puede continuar en la barra.
- Para navegación interna usa `ToolbarLink render={<Link href="…" />}`. Para acciones, conserva la semántica de Button. El separador se puede ocultar a tecnologías de asistencia con `aria-hidden` si la división es solo visual.
- Al componer con `render`, propaga atributos, eventos, hijos y ref. Mantén los callbacks y refs en un módulo cliente de App Router. Si el menú se monta en un portal, conserva su contexto de tema y comprueba el retorno de foco al activador.

## 10. Límites y verificación

Exporta `toolbar.tsx` con Base UI, `clsx` y las utilidades y tokens de Tailwind de own-ui. Los iconos y las familias compuestas se eligen en el consumidor. Comprueba que Tailwind detecte las clases del módulo.

Verifica la entrada y salida por Tab, las flechas de ambos ejes, el salto de controles deshabilitados y el cursor de texto en Input. Comprueba la activación de enlaces y menús, el retorno de foco, ambos temas, colores forzados y la distribución a un ancho móvil.
