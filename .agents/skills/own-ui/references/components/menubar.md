# Menubar

## 1. Identificación

Menubar es una familia independiente que aplica los estilos de own-ui con clsx sobre la primitiva Menubar de Base UI. [API de Base UI](https://base-ui.com/react/components/menubar)

## 2. Propósito y casos de uso

Agrupa varios menús de comandos que comparten un recorrido de teclado y permiten cambiar de panel mientras la barra está activa. Úsala, por ejemplo, para separar los comandos de un editor en Archivo, Edición y Vista. Para un solo activador usa Menu. Para la navegación principal de un sitio, usa enlaces de navegación o Navigation Menu según la composición.

## 3. Importación y anatomía

~~~tsx
import {
  Menubar,
  type MenubarProps,
  type MenubarState,
} from "@/components/own/independant/menubar";
import {
  Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger,
} from "@/components/own/independant/menu";
~~~

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| Menubar | `div` con rol `menubar` | Única pieza de esta familia. Coordina el foco y la apertura entre las raíces Menu que recibe como hijas. |
| Menu | Sin nodo | Raíz de cada rama, aportada por el consumidor. |
| MenuTrigger | `button` con rol `menuitem` dentro de la barra | Activador registrado para recorrer la barra y ancla del panel de su propia raíz. |
| MenuPortal, MenuPositioner, MenuPopup | `div` por pieza | Mueven el contenido al destino del portal, lo posicionan y exponen el panel de opciones. |
| MenuItem y otras opciones de Menu | Depende de la pieza | Ejecutan comandos, navegan, ajustan preferencias o abren submenús. |

`MenubarProps` y `MenubarState` son alias de los tipos de la primitiva. Importa las piezas de Menu desde su propio módulo. Cada activador y su portal pertenecen a la misma raíz Menu, y todas esas raíces pertenecen a la misma Menubar.

~~~tsx
<Menubar aria-label="Comandos del editor">
  <Menu>
    <MenuTrigger>Archivo</MenuTrigger>
    <MenuPortal>
      <MenuPositioner sideOffset={5}>
        <MenuPopup>
          <MenuItem onClick={onSave}>Guardar</MenuItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
  <Menu>
    <MenuTrigger>Edición</MenuTrigger>
    <MenuPortal>
      <MenuPositioner sideOffset={5}>
        <MenuPopup>
          <MenuItem onClick={onUndo}>Deshacer</MenuItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
</Menubar>
~~~

En este fragmento el consumidor aporta `onSave` y `onUndo` en un módulo cliente.

## 4. Variantes y tamaños

Menubar carece de props propias `variant` y `size`. Su orientación horizontal es la predeterminada y permite distribuir los activadores en varias filas si el espacio es estrecho. La orientación vertical los apila en una columna. La orientación también cambia el eje de navegación con flechas. La barra toma su tamaño de los hijos y del ancho disponible.

## 5. Props y callbacks

Las opciones de comportamiento y composición son de Base UI 1.9.0. El wrapper aporta estilos, `data-slot="menubar"` y `aria-disabled` al deshabilitar la barra.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Menubar | `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Sí | Define el eje de la barra y la colocación inicial de los paneles de sus menús. |
| Menubar | `loopFocus` | `boolean` | `true` | Sí | Permite pasar del último activador al primero y viceversa con las flechas. El recorrido dentro de cada panel se configura en su Menu. |
| Menubar | `modal` | `boolean` | `true` | Sí | Limita las interacciones exteriores cuando un menú de la barra está abierto. |
| Menubar | `disabled` | `boolean` | `false` | Sí | Deshabilita todos los activadores de Menu. También puedes aplicar `disabled` a una sola raíz Menu. |
| Menubar | `children` | `ReactNode` | — | Sí | Recibe la composición de las raíces Menu. |
| Menubar | `className` | `string \| ((state: MenubarState) => string \| undefined)` | Clases base | Sí | Añade clases al nodo de la barra. |
| Menubar | `style` | `CSSProperties \| ((state: MenubarState) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo de la barra. |
| Menubar | `render` | `ReactElement \| ((props, state: MenubarState) => ReactElement)` | `div` | Sí | Sustituye el nodo conservando las props y la ref que entrega Base UI. |
| Menubar | `ref` | `Ref<HTMLDivElement>` | — | Sí | Referencia al elemento de la barra en React 19. |
| Menubar | `id`, `aria-label`, `aria-labelledby` | Atributos HTML | ID generado y nombre aportado por el consumidor | Sí | Identifican el nodo y permiten asignarle un nombre accesible. |

Menubar también reenvía atributos y eventos DOM compatibles. La raíz de la barra carece de callbacks propios de apertura. Si necesitas controlar o cancelar una solicitud de apertura o cierre, usa `open` y `onOpenChange(open, details)` en la raíz Menu correspondiente. [Referencia de Menu](menu.md#5-props-y-callbacks)

## 6. Funcionamiento y estados

- Con la barra cerrada, enfocar otro activador con las flechas mantiene los paneles cerrados. Al abrir una rama, navegar a otra con las flechas o pasar el puntero sobre otro activador cambia el panel activo.
- Configura la modalidad en Menubar. Base UI toma ese valor para las ramas de la barra, incluso cuando el puntero cambia de una a otra. Con `modal={false}` se puede activar un control exterior y el menú se cierra conforme al comportamiento de Menu. Con `modal` habilitado, Base UI bloquea las pulsaciones exteriores y aplica su política de bloqueo de scroll según el dispositivo.
- La orientación de la barra cambia su recorrido. La orientación y la persistencia del contenido de cada panel pertenecen a su Menu. En horizontal, sus posicionadores prefieren `side="bottom"`. En vertical prefieren `side="inline-end"`. Ambos usan `align="start"` y pueden reajustarse por colisión.
- La barra no tiene un valor de formulario, un modo de apertura controlado ni estados de carga o error propios. Cada Menu gestiona su montaje, apertura y comandos. `disabled` bloquea la interacción de los activadores.

| Nodo | Atributos de estado |
| :--- | :--- |
| Menubar | `data-slot="menubar"`, `data-orientation="horizontal"` o `"vertical"`, `data-modal` si es modal, `data-has-submenu-open` si hay una rama activa y `aria-disabled="true"` si está deshabilitada. |
| MenuTrigger | `data-slot="menu-trigger"`, `data-popup-open`, `data-pressed`, `data-disabled` y los atributos ARIA de expansión y relación con el panel. |

Las funciones de `className`, `style` y `render` reciben `MenubarState` con `orientation`, `modal` y `hasSubmenuOpen`. Para estilos condicionados por la deshabilitación, usa el atributo `aria-disabled` o el valor de `disabled` que aporta el consumidor.

## 7. Estilos admitidos por pieza

| Nodo | Geometría y personalización |
| :--- | :--- |
| Menubar | Contenedor `inline-flex` con ancho máximo del 100 %, ancho mínimo de 0, gap y padding de 0.25 rem. La variante de `data-orientation` apila los activadores y evita el salto de fila en vertical. Ajusta ancho, altura, gap y padding en la barra y define su separación exterior desde el contenedor consumidor. |
| Menubar | Fondo `surface-soft`, borde de 1 px `gray-base`, radio `rounded-base` y sombra `shadow-s`. Los tokens se resuelven en ambos temas. La barra hereda tipografía y color. |
| MenuTrigger y paneles | Las dimensiones, la tipografía, el indicador de foco, las sombras y las transiciones vienen de Menu. Personaliza el activador en su propio nodo y el panel en Popup o Positioner, ya que se monta en un portal. |

El wrapper combina `className` con sus clases mediante clsx. Base UI resuelve `style` y compone el nodo, los eventos y las refs con `render`. Para un ajuste local de geometría, usa por ejemplo `style={{ gap: "0.5rem" }}`. También puedes dirigir un selector a `[data-slot="menubar"][data-has-submenu-open]`. Comprueba la cascada si dos utilidades afectan la misma propiedad. Cambiar tokens compartidos altera las demás piezas que los consumen. [Sistema de estilos](../globals.md)

La barra no aplica transiciones propias. Las transiciones de opacidad y escala del panel pertenecen a Menu y respetan movimiento reducido. Conserva el foco visible de cada activador y el ajuste al espacio disponible al modificar estilos. [Estilos de Menu](menu.md#7-estilos-admitidos-por-pieza)

## 8. Ejemplos de composición

Esta barra vertical admite un control exterior mientras su panel está abierto. El consumidor puede añadir más ramas Menu hermanas siguiendo la anatomía anterior.

~~~tsx
import Link from "next/link";
import { Menubar } from "@/components/own/independant/menubar";
import {
  Menu, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger,
} from "@/components/own/independant/menu";

export function WorkspaceCommands() {
  return (
    <Menubar
      aria-label="Comandos del espacio de trabajo"
      orientation="vertical"
      modal={false}
      loopFocus={false}
      style={{ gap: "0.5rem" }}
    >
      <Menu>
        <MenuTrigger>Documentos</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={5}>
            <MenuPopup>
              <MenuLinkItem render={<Link href="/documentos" />} closeOnClick>
                Abrir documentos
              </MenuLinkItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenuTrigger>Preferencias</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={5}>
            <MenuPopup>
              <MenuLinkItem render={<Link href="/preferencias" />} closeOnClick>
                Abrir preferencias
              </MenuLinkItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  );
}
~~~

## 9. Accesibilidad e integración

- Da un nombre a la barra con `aria-label` o `aria-labelledby` y mantén un nombre accesible en cada activador, también si solo muestra un icono.
- Tab entra en la barra como control compuesto. En horizontal, Izquierda y Derecha recorren los activadores. En vertical, usa Arriba y Abajo. Inicio y Fin llevan el foco a los extremos. La dirección horizontal sigue la configuración LTR o RTL de Base UI.
- Enter y Espacio abren la rama enfocada. También se puede abrir con la flecha hacia el panel, por ejemplo Abajo en una barra horizontal o Derecha en una barra vertical LTR. Escape cierra la rama y al usar teclado devuelve el foco al activador.
- Al sustituir el elemento con `render`, conserva el rol `menubar`, la orientación ARIA, los eventos y la ref. Conserva la relación de cada activador con su panel. Usa la semántica y las opciones de composición de Menu para los enlaces y controles de sus paneles.
- Con un destino de portal personalizado, comprueba el apilamiento, la herencia de tema y la colocación junto a los bordes. En ancho estrecho, las filas que genere la barra horizontal mantienen el recorrido horizontal por orden de las opciones. Si el diseño requiere un recorrido vertical, ajusta también `orientation`.
- Mantén el wrapper como componente cliente. Las composiciones con estado, handlers o `render` funcional también deben ejecutarse dentro de una frontera cliente. [Integración en App Router](../structure.md)

## 10. Límites y verificación

Exporta `menubar.tsx` junto con los tokens y utilidades compartidos. La implementación depende de Base UI y clsx. Para reproducir las composiciones de esta referencia, incluye también Menu y sus archivos de soporte. El wrapper no requiere iconos propios ni un bloque de CSS específico.

Comprueba el cambio entre ramas con puntero y teclado, el foco tras Escape, ambas orientaciones, la deshabilitación y la modalidad. Revisa ambos temas, el ancho disponible y los paneles cerca de los bordes. [Archivos de exportación](../structure.md#compatibilidad-y-archivos-necesarios)
