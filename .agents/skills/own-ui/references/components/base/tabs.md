# Tabs

## 1. Identificación

Tabs envuelve `Root`, `List`, `Tab`, `Indicator` y `Panel` de `@base-ui/react/tabs` y combina sus estilos con `clsx`. [API de Base UI](https://base-ui.com/react/components/tabs)

## 2. Propósito y casos de uso

Alterna entre paneles relacionados de una misma vista, como el resumen, la actividad y las preferencias de un proyecto. Usa una lista de enlaces para destinos independientes. Usa Accordion cuando resulte útil expandir secciones dentro del flujo o mantener varias abiertas a la vez.

## 3. Importación y anatomía

Adapta el import a la [estructura del consumidor](../../structure.md).

```tsx
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@/components/own/base/tabs";

export function ReportTabs() {
  return (
    <Tabs defaultValue="summary">
      <TabsList aria-label="Información del informe">
        <TabsTab value="summary">Resumen</TabsTab>
        <TabsTab value="activity">Actividad</TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="summary">Resultados de la revisión.</TabsPanel>
      <TabsPanel value="activity">Últimas observaciones.</TabsPanel>
    </Tabs>
  );
}
```

| Exportación | Nodo predeterminado | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Tabs` | `div` | `tabs` | Coordina selección y orientación. |
| `TabsList` | `div[role="tablist"]` | `tabs-list` | Agrupa las pestañas y gestiona el recorrido por teclado. |
| `TabsTab` | `button[role="tab"]` | `tabs-tab` | Activa el panel con el mismo valor. |
| `TabsIndicator` | `span` con `aria-hidden="true"` | `tabs-indicator` | Muestra un acento decorativo que sigue la pestaña activa. Es opcional. |
| `TabsPanel` | `div[role="tabpanel"]` | `tabs-panel` | Contiene el contenido asociado a una pestaña. |

Dentro de `TabsList`, coloca las pestañas y el indicador. Coloca los paneles bajo la misma raíz y fuera de la lista. El consumidor aporta etiquetas y contenido. Usa un valor único para cada pareja de pestaña y panel y reserva `null` para representar una selección vacía.

El módulo exporta `TabsProps`, `TabsState`, `TabsValue` y `TabsChangeEventDetails`, además de `TabsListProps`, `TabsListState`, `TabsTabProps`, `TabsTabState`, `TabsIndicatorProps`, `TabsIndicatorState`, `TabsPanelProps` y `TabsPanelState`.

## 4. Variantes y tamaños

La familia carece de props propias de variante o tamaño. `orientation` es una opción funcional heredada. En horizontal la lista ocupa una fila desplazable encima del panel. En vertical la lista se apila en la primera columna y el panel ocupa la segunda. Las pestañas tienen una altura mínima `min-h-10` (40 px con la escala predeterminada), con padding horizontal `px-3` y vertical `py-2`. El indicador tiene 2 px de grosor y ajusta su largo a la pestaña activa.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Tabs | `value` | `TabsValue` | — | Sí | Selección controlada. `null` representa una raíz sin pestaña activa. |
| Tabs | `defaultValue` | `TabsValue` | `0` | Sí | Selección inicial no controlada. Pasa un valor habilitado explícito para mostrar el panel correcto desde SSR. |
| Tabs | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Configura el eje visual y la navegación por flechas. |
| Tabs | `onValueChange` | `(value: TabsValue, details: TabsChangeEventDetails) => void` | — | Sí | Notifica el cambio propuesto o automático. `details.cancel()` solo cancela cambios del usuario. |
| List | `activateOnFocus` | `boolean` | `false` | Sí | Activa una pestaña habilitada al recibir foco. En modo manual el usuario confirma con Enter o Espacio. |
| List | `loopFocus` | `boolean` | `true` | Sí | Permite pasar del último elemento al primero y viceversa con las flechas. |
| List | `aria-label`, `aria-labelledby` | `string` | — | Sí | Dan nombre accesible a la lista. |
| Tab | `value` | `TabsValue` | — | No | Identifica la pestaña. Debe coincidir con el valor de Panel. |
| Tab | `disabled` | `boolean` | `false` | Sí | Impide la activación. La pestaña sigue siendo alcanzable con las flechas. |
| Tab | `nativeButton` | `boolean` | `true` | Sí | Usa `false` cuando `render` devuelve un elemento distinto de `button`. |
| Indicator | `renderBeforeHydration` | `boolean` | `false` | Sí | Permite que Base UI mida y muestre el indicador con un script antes de hidratar. |
| Panel | `value` | `TabsValue` | — | No | Identificador de la pestaña asociada. |
| Panel | `keepMounted` | `boolean` | `false` | Sí | Conserva el nodo y el contenido cuando el panel queda oculto. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases a la pieza. La función recibe su estado específico. |
| Todas | `style` | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline estáticos o calculados al nodo. |
| Todas | `render` | `React.ReactElement \| ((props, state) => React.ReactElement)` | Nodo de la pieza | Sí | Sustituye el elemento y permite conservar la semántica y las props de la primitiva. |
| Todas | `ref`, atributos y eventos HTML | Según el nodo | — | Sí | Permiten acceder al nodo o añadir atributos y eventos compatibles. |

`TabsValue` conserva el tipo abierto de Base UI. Las cadenas o los números suelen ser suficientes como identificadores. `TabsChangeEventDetails` expone `event`, `reason` y `activationDirection`, que puede ser `left`, `right`, `up`, `down` o `none`.

| Motivo | Cuándo se emite |
| :--- | :--- |
| `none` | Selección iniciada por el usuario. Se puede cancelar. |
| `initial` | Primera selección automática si se omite `defaultValue`, incluida la búsqueda de una pestaña habilitada si el valor implícito no sirve. |
| `disabled` | La pestaña seleccionada se deshabilita en modo no controlado. |
| `missing` | La pestaña seleccionada se retira o el `defaultValue` explícito no coincide con una pestaña montada. |

Los cambios automáticos llevan `activationDirection: "none"` y pueden seleccionar `null` si no queda una pestaña habilitada.

## 6. Funcionamiento y estados

- Con `value`, el consumidor conserva el control de la selección, incluso si la pestaña indicada desaparece o queda deshabilitada. En modo no controlado, Base UI elige la primera habilitada ante una selección faltante o deshabilitada. Un `defaultValue` que apunta explícitamente a una pestaña deshabilitada se puede conservar al montar. `defaultValue={null}` permite iniciar sin selección.
- Panel se monta al activarse y se desmonta al completar la salida. Durante la salida se vuelve inerte y sale del orden de tabulación. Con `keepMounted` permanece montado y se oculta al terminar la transición. Usa esa opción para conservar campos no controlados o estado local.
- Todas las piezas exponen `data-orientation` y `data-activation-direction`. Tab añade `data-active` y `data-disabled`. Panel añade `data-index` y refleja su ciclo con `data-hidden`, `data-starting-style` y `data-ending-style`.
- `TabsState` y `TabsListState` incluyen `orientation` y `tabActivationDirection`. Tab añade `active` y `disabled` a su estado. Panel añade `hidden` y `transitionStatus`. Indicator añade `activeTabPosition` y `activeTabSize`, que pueden ser `null` antes de medir.
- Indicator se oculta mientras Base UI mide la pestaña activa. Si la selección es `null`, no se monta. Base UI recalcula la geometría cuando cambian las dimensiones de la lista o de las pestañas.

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones, apariencia y personalización |
| :--- | :--- |
| Tabs | En horizontal sigue el flujo del contenedor. En vertical usa una rejilla con primera columna `fit-content(40%)`, segunda columna flexible y `gap-3`. El consumidor fija ancho máximo, margen y separación exterior. |
| List | Fila o columna flex con `gap-1` y borde `gray-base`. En horizontal usa `overflow-x-auto`. Conserva su posición relativa y la pertenencia de Indicator a la lista para alinear la medición y el desplazamiento. |
| Tab | Usa `text-sm`, peso medio, radio en el borde exterior, texto `content-base` y fondo `surface-bold` al pasar el puntero sobre una pestaña habilitada e inactiva. La activa usa `primary-soft` y texto `content-bold`. El foco dibuja un contorno interior `gray-bold` de 2 px. La deshabilitada reduce su opacidad. |
| Indicator | Usa `primary-base`, radio completo y posición absoluta. En horizontal toma el ancho y la distancia izquierda medidos y se apoya al fondo. En vertical toma la altura y la distancia superior y se apoya al final lógico de la lista. |
| Panel | Usa `body-sm`, texto `content-base`, `rounded-base`, padding adaptable y contorno interior de foco. En vertical ocupa la segunda columna si es hijo directo de la raíz. Puedes envolver los paneles para controlar su maquetación o superponerlos durante una transición. |

Indicator recibe `--active-tab-left`, `--active-tab-right`, `--active-tab-top`, `--active-tab-bottom`, `--active-tab-width` y `--active-tab-height` de Base UI. Conserva las variables que determinan su largo y posición. El indicador anima posición y dimensiones durante 150 ms con `ease-out` y la pestaña transiciona sus colores durante 150 ms. Ambas transiciones se limitan a `motion-safe`. Panel expone estados de transición para composiciones del consumidor.

En colores forzados, la pestaña inactiva usa `Canvas` y `CanvasText`, la activa usa `Highlight` y `HighlightText` y la inactiva deshabilitada usa `GrayText`. El indicador usa `Highlight`. Los tokens normales siguen [globals.css](../../globals.md).

Usa `data-slot` y los atributos de estado para localizar cada nodo. `className` estático o funcional se combina con `clsx` y, salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada resuelve utilidades en conflicto. `style` actúa sobre el nodo de la pieza. Si ajustas la animación, conserva las geometrías medidas, la inercia del panel saliente y el movimiento reducido.

## 8. Ejemplos de composición

Esta lista vertical activa el panel al mover el foco. El campo conserva su valor al alternar entre pestañas.

```tsx
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@/components/own/base/tabs";

export function ProjectSettings() {
  return (
    <Tabs defaultValue="profile" orientation="vertical">
      <TabsList aria-label="Ajustes del proyecto" activateOnFocus>
        <TabsTab value="profile">Perfil</TabsTab>
        <TabsTab value="alerts">Alertas</TabsTab>
        <TabsIndicator />
      </TabsList>
      <TabsPanel value="profile" keepMounted>
        <label>Nombre <input className="max-w-full" defaultValue="Proyecto A" /></label>
      </TabsPanel>
      <TabsPanel value="alerts">Configura los avisos del proyecto.</TabsPanel>
    </Tabs>
  );
}
```

Para coordinar la selección con otro control, declara `const [view, setView] = useState("summary")` en un componente cliente y sustituye `defaultValue` del ejemplo de anatomía por `value={view}` y `onValueChange={setView}`. El mismo setter puede seleccionar un panel desde fuera de la lista.

Para un fundido horizontal, coloca los paneles en la misma celda de una rejilla y usa `motion-safe:transition-opacity` junto a `motion-safe:data-starting-style:opacity-0` y `motion-safe:data-ending-style:opacity-0` en cada panel. La superposición evita que el saliente y el entrante se apilen durante el cambio.

## 9. Accesibilidad e integración

- Da un nombre accesible a la lista y etiqueta cada pestaña. Base UI relaciona la pestaña y su panel por valor, asigna `aria-selected` a la pestaña y enlaza los nodos montados mediante `aria-controls` y `aria-labelledby`.
- Usa flechas izquierda y derecha en horizontal y arriba y abajo en vertical. `Home` y `End` enfocan los extremos. En modo manual, activa con Enter o Espacio. Tab permite continuar al panel activo. Las pestañas deshabilitadas son detectables con el foco, pero no se activan.
- Si renderizas una pestaña con `render={<Link href="…" />}` de `next/link`, usa `nativeButton={false}` y conserva sus props, eventos y ref. Mantén los callbacks, refs y personalizaciones funcionales en un módulo cliente de App Router. Una página de servidor puede componer las piezas con contenido y props serializables.

## 10. Límites y verificación

Exporta `tabs.tsx` con Base UI, `clsx` y la configuración común de Tailwind. No necesita iconos, otras familias propias ni un bloque específico de `globals.css`. Verifica que Tailwind genere las clases de orientación, estado y movimiento.

Comprueba el panel inicial desde SSR, la selección por clic y teclado, la geometría del indicador tras desplazar o redimensionar la lista y la conservación de datos con `keepMounted`. Verifica ambos temas, movimiento reducido, colores forzados y el ancho móvil.
