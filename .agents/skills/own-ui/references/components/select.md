# Select

## 1. Identificación

Select envuelve `@base-ui/react/select` y usa `clsx`, Chevron y Check para la presentación. [API de Base UI](https://base-ui.com/react/components/select)

## 2. Propósito y casos de uso

Úsalo para elegir una o varias opciones predefinidas desde un panel compacto. Admite grupos, opciones deshabilitadas, búsqueda por texto mediante teclado, valores de formulario y apertura controlada. Usa [Combobox](combobox.md) cuando sea importante filtrar una lista extensa o [Radio Group](radio-group.md) cuando todas las alternativas deban quedar visibles.

## 3. Importación y anatomía

Adapta el alias y las rutas al proyecto consumidor según la [referencia de estructura](../structure.md).

~~~tsx
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/components/own/independant/select";

const formats = [
  { value: "pdf", label: "Documento PDF" },
  { value: "csv", label: "Tabla CSV" },
];

export function ReportFormat() {
  return (
    <div className="grid gap-2">
      <Select items={formats} name="format">
        <SelectLabel>Formato del informe</SelectLabel>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Elige un formato" />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              <SelectList>
                {formats.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    <SelectItemText>{label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </div>
  );
}
~~~

| Exportación | Elemento predeterminado | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Select` | Contexto e inputs de formulario ocultos | — | Coordina opciones, valor, apertura y formulario. |
| `SelectLabel` | `div` | `select-label` | Etiqueta visible asociada al activador. |
| `SelectTrigger` | `button[role="combobox"]` | `select-trigger` | Activa el panel y recibe el foco en reposo. |
| `SelectValue` | `span` | `select-value` | Muestra la selección o el placeholder. |
| `SelectIcon` | `span` | `select-icon` | Aloja el chevron decorativo. |
| `SelectPortal` | `div` portaleado | `select-portal` | Mueve el panel y el fondo opcional al destino del portal. |
| `SelectBackdrop` | `div[role="presentation"]` | `select-backdrop` | Añade un fondo visual bajo el panel. |
| `SelectPositioner` | `div` | `select-positioner` | Ancla y dimensiona el panel. |
| `SelectPopup` | `div` | `select-popup` | Dibuja el panel y gestiona el foco de cierre. |
| `SelectList` | `div[role="listbox"]` | `select-list` | Contiene las opciones y se desplaza si exceden la altura disponible. |
| `SelectArrow` | `div` | `select-arrow` | Señala el ancla del panel separado. |
| `SelectItem` | `div[role="option"]` | `select-item` | Representa una opción. |
| `SelectItemText` | `div` | `select-item-text` | Proporciona el texto de la opción para navegación y alineación. |
| `SelectItemIndicator` | `span[aria-hidden="true"]` | `select-item-indicator` | Muestra la marca de selección. |
| `SelectGroup` | `div[role="group"]` | `select-group` | Agrupa las opciones relacionadas. |
| `SelectGroupLabel` | `div` | `select-group-label` | Nombra al grupo. |
| `SelectSeparator` | `div[role="presentation"]` | `select-separator` | Divide visualmente grupos u opciones. |
| `SelectScrollUpArrow` | `div[aria-hidden="true"]` | `select-scroll-up-arrow` | Desplaza la lista hacia arriba con el puntero. |
| `SelectScrollDownArrow` | `div[aria-hidden="true"]` | `select-scroll-down-arrow` | Desplaza la lista hacia abajo con el puntero. |

También se exportan `SelectProps<Value, Multiple>`, `SelectChangeEventDetails`, `SelectOpenChangeEventDetails` y `SelectActions`.

Coloca Value e Icon dentro de Trigger y List dentro de Popup. ItemText e ItemIndicator son hijos de Item. Si agrupas opciones, coloca cada Group con su GroupLabel y sus Item dentro de List. Las flechas de desplazamiento y Arrow se colocan dentro de Popup como hermanas de List. Backdrop, cuando se usa, es hermano de Positioner dentro de Portal. El consumidor aporta el contenido y el ancho del control, y decide qué piezas decorativas incorporar.

## 4. Variantes y tamaños

La familia carece de props propias de variante o tamaño. Trigger tiene una altura mínima de `2.5rem` y las opciones una altura mínima de `2.25rem` con la escala de espaciado predeterminada. El contenido largo puede aumentar la altura de una opción. Positioner toma el ancho del ancla y lo limita al espacio disponible. Popup limita su alto a `20rem` y, en modo separado, también al espacio disponible.

`multiple` define el modo de selección. `alignItemWithTrigger` define el modo de posicionamiento. En own-ui, el panel está separado de forma predeterminada y usa un espacio de 4 px. Con `alignItemWithTrigger` activo, Base UI intenta alinear el texto de la opción seleccionada con el texto del activador. En táctil o cuando hay poco espacio, usa el panel separado.

## 5. Props y callbacks

`Value` es el tipo de una opción. En selección múltiple, las entradas aceptan arrays de solo lectura y `onValueChange` entrega un array. Las props siguientes provienen de Base UI, con dos valores iniciales propios de Positioner.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Select | `multiple` | `boolean` | `false` | Sí | Activa la selección múltiple. |
| Select | `value`, `defaultValue` | `Value \| null` o `readonly Value[] \| null` | `null` o `[]` en modo no controlado | Sí | Definen el valor actual controlado o el valor inicial. Usa `[]` para vaciar el modo múltiple. |
| Select | `onValueChange` | `(value: Value \| null, details: SelectChangeEventDetails) => void` o `(value: Value[], details: SelectChangeEventDetails) => void` | — | Sí | Recibe un cambio de selección propuesto. |
| Select | `open`, `defaultOpen` | `boolean` | `false` en modo no controlado | Sí | Definen la apertura controlada o inicial. |
| Select | `onOpenChange` | `(open: boolean, details: SelectOpenChangeEventDetails) => void` | — | Sí | Recibe la apertura o el cierre propuesto. |
| Select | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta tras completar la apertura o el cierre, incluidas las transiciones. |
| Select | `items` | `Record<string, ReactNode>` o listas de `{ value, label }` o `{ label, items }` | — | Sí | Resuelve las etiquetas del valor. Compón los Item con los mismos valores. |
| Select | `itemToStringLabel`, `itemToStringValue` | `(item: Value) => string` | Inferencia de `label` y `value` cuando existen | Sí | Formatea la etiqueta de un objeto y el valor enviado al formulario, respectivamente. |
| Select | `isItemEqualToValue` | `(item: Value, value: Value) => boolean` | `Object.is` | Sí | Permite comparar por una clave estable cuando las referencias de objeto cambian. |
| Select | `name`, `form`, `autoComplete`, `id` | `string` | Nombre de Field o —, —, —, ID generado | Sí | Identifica el campo, asocia un formulario por ID, da una pista de autocompletado o define el ID del activador. |
| Select | `required`, `readOnly`, `disabled` | `boolean` | `false` | Sí | Exige selección, permite consultar sin cambiar el valor o bloquea la interacción. |
| Select | `inputRef`, `actionsRef` | `React.Ref<HTMLInputElement>`, `React.RefObject<SelectActions \| null>` | — | Sí | Acceden al input auxiliar y a las acciones `close()` y `unmount()`. |
| Select | `modal`, `highlightItemOnHover` | `boolean` | `true` | Sí | Controlan la interacción exterior y el resaltado por puntero. |
| SelectTrigger | `disabled`, `nativeButton` | `boolean` | `false`, `true` | Sí | Bloquea el activador o indica si su nodo es un botón nativo al usar `render`. |
| SelectValue | `placeholder`, `children` | `ReactNode`, `ReactNode \| ((value) => ReactNode)` | — | Sí | Configura el texto en vacío o sustituye el contenido del valor con un nodo o formateador. |
| SelectPortal | `container` | `HTMLElement \| ShadowRoot \| RefObject \| null` | `body` | Sí | Define el destino físico del portal. |
| SelectPositioner | `alignItemWithTrigger`, `sideOffset` | `boolean`, `number \| OffsetFunction` | `false`, `4` | Sí | Valores de own-ui. Eligen el modo de alineación y la separación en píxeles del panel separado. |
| SelectPositioner | `side`, `align` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"`, `"start" \| "center" \| "end"` | `"bottom"`, `"center"` | Sí | Indican las preferencias del panel separado, sujetas a colisiones. |
| SelectPositioner | `anchor`, `positionMethod` | Elemento, ancla virtual, ref o función, y `"absolute" \| "fixed"` | Activador, `"absolute"` | Sí | Eligen el ancla y el método de posicionamiento. |
| SelectPositioner | `alignOffset`, `arrowPadding` | `number \| OffsetFunction`, `number` | `0`, `5` | Sí | Desplazan el panel en el eje de alineación y separan Arrow de las esquinas. |
| SelectPositioner | `collisionBoundary`, `collisionPadding`, `collisionAvoidance` | `Boundary`, `Padding`, `CollisionAvoidance` de Base UI | Ancestros de recorte, `5`, estrategia de Base UI | Sí | Delimitan la región y permiten ajustar cambio de lado, desplazamiento y eje alternativo. |
| SelectPositioner | `sticky`, `disableAnchorTracking` | `boolean` | `false`, depende de la alineación | Sí | Mantiene el panel en pantalla al salir el ancla o desactiva el seguimiento de su posición. |
| SelectPopup | `finalFocus` | `boolean \| RefObject<HTMLElement \| null> \| ((closeType) => boolean \| HTMLElement \| null \| void)` | Comportamiento de Base UI | Sí | Elige el destino del foco al cerrar. `true` aplica el retorno predeterminado y `false` evita moverlo. |
| SelectItem | `value`, `label` | `Value`, `string` | `null`, texto de ItemText | Sí | Identifican la opción y permiten indicar un texto específico para búsqueda por teclado. |
| SelectItem | `disabled`, `nativeButton` | `boolean` | `false` | Sí | Impide seleccionar la opción o indica que su sustituto es un botón nativo. |
| SelectItemIndicator, SelectScrollUpArrow, SelectScrollDownArrow | `keepMounted` | `boolean` | `false` | Sí | Conserva el nodo de esa pieza cuando queda oculto. |
| SelectSeparator | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Cambia el eje de la división decorativa. |
| Piezas DOM | `className`, `style` | `string`, `React.CSSProperties` o funciones `(state) => valor \| undefined` | — | Sí | Ajustan las clases o los estilos del nodo. |
| Piezas DOM | `render`, `ref`, atributos HTML | `ReactElement \| ((props, state) => ReactElement)`, ref y atributos según el nodo | Elemento de anatomía, —, — | Sí | Componen, referencian o anotan el nodo. |

`OffsetFunction` recibe `{ anchor, positioner, side, align }` y devuelve píxeles. `anchor` y `positioner` aportan `width` y `height`. `finalFocus` recibe `"mouse"`, `"touch"`, `"pen"` o `"keyboard"` cuando se usa como función.

Los callbacks de cambio reciben `details.event`, `details.reason` y `details.cancel()`. Entre los motivos están `item-press`, `escape-key`, `outside-press`, `trigger-press` y `none`. Cancelar el valor solo cancela la selección. En modo individual, la opción solicita el cierre por separado, de modo que puede cerrarse aunque el valor se conserve. `onOpenChange` también ofrece `details.preventUnmountOnClose()` para completar un cierre animado desde fuera mediante `actionsRef.current?.unmount()`.

## 6. Funcionamiento y estados

- Controla valor y apertura de forma independiente. Usa `defaultValue` o `defaultOpen` para inicializar estado interno. Con `value` u `open`, acepta el cambio actualizando la prop desde el callback correspondiente.
- En selección individual se cierra el panel al elegir una opción. En múltiple, la opción alterna su selección y el panel queda abierto. Las listas múltiples se deben tratar como datos de solo lectura, incluido el array vacío compartido que puede recibir Value.
- Value usa `children` si se proporciona. Al quedar vacío, una etiqueta de `null` en `items` tiene prioridad sobre `placeholder`. Para permitir que el usuario borre una selección individual desde el panel, renderiza también un Item con `value={null}`. Con `items`, la selección muestra las etiquetas correspondientes. Sin un mapa, Base UI usa su resolución de etiquetas, incluida `itemToStringLabel` cuando corresponda.
- El panel se monta para abrir y conserva su fase de salida. Base UI puede montarlo de forma temporal para resolver el autocompletado o la búsqueda con el control cerrado. `keepMounted` en el indicador y en las flechas afecta únicamente a esas piezas.
- El campo hereda el nombre de Field cuando está presente. En modo individual usa `FormData.get(name)`. En múltiple se envía una entrada por opción seleccionada y se lee con `FormData.getAll(name)`.

| Piezas | Atributos de estado |
| :--- | :--- |
| Trigger | `data-popup-open`, `data-popup-side`, `data-pressed`, `data-placeholder`, `data-disabled`, `data-readonly`, `data-required`, `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled`, `data-focused`. |
| Label | Atributos de Field como `data-disabled`, `data-required`, `data-valid` y `data-invalid` según el estado. |
| Value e Icon | `data-placeholder` en Value y `data-popup-open` en Icon. |
| Positioner | `data-open`, `data-closed`, `data-side`, `data-align` y `data-anchor-hidden`. |
| Popup y Backdrop | `data-open`, `data-closed`, `data-starting-style` y `data-ending-style`. Popup también aporta `data-side` y `data-align`. |
| Arrow | `data-open`, `data-closed`, `data-side`, `data-align` y `data-uncentered`. |
| Item e ItemIndicator | Ambas piezas aportan `data-selected`. Item añade `data-highlighted` y `data-disabled`. ItemIndicator puede reflejar la fase de transición y usa `data-selected` para su visibilidad. |
| ScrollUpArrow y ScrollDownArrow | `data-visible`, `data-side`, `data-direction`, `data-starting-style` y `data-ending-style`. |
| Separator | `data-orientation`. |
| Portal, List, ItemText, Group, GroupLabel | El slot identifica la pieza. |

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones, estilos y ajustes locales |
| :--- | :--- |
| Select y Label | Define la separación y el ancho del campo en un contenedor del consumidor. Label usa `body-sm` con peso medio. |
| Trigger | Superficie `surface-bold`, borde `gray-base`, radio base y texto `gray-bold`. Hover y apertura usan `surface-base`. El foco visible tiene contorno `gray-bold` y el estado inválido usa `error-base` en borde y contorno. Ajusta el ancho con `w-full` o clases de ancho en este nodo. |
| Value e Icon | Value se trunca a una línea y el placeholder tiene menor énfasis. Icon no se encoge y dimensiona los SVG sin clase de tamaño a `1rem`. Aporta `children` para sustituir el chevron. |
| Portal, Backdrop y Positioner | El portal va a `body` por defecto. Backdrop cubre el viewport con `z-40`, `gray-bold/40` en claro y `surface-soft/70` en oscuro. Positioner usa `z-50`, ancho de ancla y máximo disponible. Aplica cambios de ancho aquí y conserva la posición calculada por Base UI. |
| Popup, Arrow y List | Popup usa `surface-base`, `gray-base`, radio base y `shadow-m`. Arrow es un cuadrado rotado de `0.5rem`, usa los colores del panel y se oculta con `data-side="none"`. List contiene el overflow vertical, tiene padding de `0.25rem` y hereda el radio. Ajusta el límite de altura en Popup para mantener List como zona desplazable. |
| Item, ItemText e ItemIndicator | Item usa `body-sm`, radio base y dos columnas, con `1rem` reservado para el indicador. ItemText permite partir palabras largas. El resaltado usa `primary-soft`, con contorno en colores forzados. La selección incrementa el peso del texto y la deshabilitación reduce la opacidad. El Check es decorativo y admite reemplazo mediante `children`. |
| Group, GroupLabel y Separator | Group acepta clases sin estilos base propios. GroupLabel usa `caption` seminegrita con padding. Separator usa `gray-base` y 1 px de grosor en el eje transversal. |
| ScrollUpArrow y ScrollDownArrow | Son áreas superpuestas de `1.5rem` con `surface-base` y chevron de `1rem`. Se ocultan si el borde correspondiente se alcanzó o la apertura fue táctil. Mantén su colocación sobre List para que el puntero pueda activar el desplazamiento. |

Positioner expone `--anchor-width`, `--anchor-height`, `--available-width`, `--available-height` y `--transform-origin`. Popup anima opacidad y escala durante 150 ms con `motion-safe` en modo separado. Cuando `data-side="none"`, solo transiciona opacidad para conservar la alineación. Backdrop transiciona opacidad e Icon gira con la misma duración. Con movimiento reducido, se aplican los estados finales sin transición. Conserva los estados de entrada y salida si cambias la animación.

Los wrappers estilizados combinan `className` estático o funcional con sus clases mediante `clsx`. Group y Portal delegan las clases directamente. Base UI combina estilos, eventos y refs en la composición. El estilo inline puede sobrescribir la geometría de la primitiva y las clases en conflicto se resuelven por cascada. Los tokens de [globals.css](../globals.md) cambian con el tema y afectan a todas las familias que los consumen.

## 8. Ejemplos de composición

La composición de anatomía muestra selección individual. Para un formulario con varios canales, usa `multiple`, da un nombre al campo y lee cada selección al enviar.

~~~tsx
"use client";

import type { FormEvent } from "react";
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/components/own/independant/select";

const channels = { email: "Correo", app: "Aplicación" };

export function ChannelForm({ save }: { save: (values: FormDataEntryValue[]) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    save(new FormData(event.currentTarget).getAll("channel"));
  }

  return (
    <form onSubmit={submit} className="grid gap-2">
      <Select multiple name="channel" defaultValue={["email"]} items={channels}>
        <SelectLabel>Canales de aviso</SelectLabel>
        <SelectTrigger><SelectValue placeholder="Elige los canales" /></SelectTrigger>
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              <SelectList>
                {Object.entries(channels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <SelectItemText>{label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
      <button type="submit">Guardar</button>
    </form>
  );
}
~~~

Para usar objetos, renderiza cada objeto como `value` del Item. Si la colección o el valor controlado se reconstruye, pasa `isItemEqualToValue={(item, value) => item.id === value.id}`. Con un objeto de tipo `{ id, title }`, pasa `itemToStringLabel={(item) => item.title}` y `itemToStringValue={(item) => String(item.id)}` si también lo envías en un formulario.

Para solapar la opción seleccionada, añade `alignItemWithTrigger` a Positioner y conserva Value e ItemText como referencias de medición. Para un panel separado con flecha, compón `SelectArrow` dentro de Popup y usa un `sideOffset` que deje espacio suficiente para ella.

## 9. Accesibilidad e integración

- Usa SelectLabel como etiqueta visible o aporta `aria-label` o `aria-labelledby` en Trigger. Pulsar SelectLabel enfoca el activador. El placeholder describe la selección vacía y la etiqueta da nombre al campo.
- Tab enfoca el activador. Enter, espacio y las flechas permiten abrir o navegar según el contexto. Teclear busca por el texto de la opción. Enter o espacio seleccionan y Escape cierra. Base UI restaura el foco según el contexto de cierre.
- Mantén una etiqueta textual por opción y evita controles interactivos dentro de Item. Los iconos decorativos deben quedar ocultos para tecnologías de asistencia. Al reemplazar Trigger o Item con `render`, conserva semántica, atributos, eventos y ref, y ajusta `nativeButton` al nodo final.
- Un Select modal restringe la interacción exterior. En táctil, el bloqueo de scroll de la página depende del espacio que ocupa el panel. Mantén el portal en un contenedor que herede el tema y comprueba su apilamiento junto con otros portales.
- El módulo es cliente. Una página de servidor puede componerlo con props serializables. Coloca callbacks, refs y opciones de posicionamiento funcionales en un componente cliente.

## 10. Límites y verificación

Distribuye `select.tsx`, los iconos de soporte descritos en [structure.md](../structure.md) y la configuración compartida de Tailwind de own-ui. La implementación se apoya en Base UI 1.9.0 y utiliza las utilidades de Tailwind para todos los estilos propios.

La búsqueda por teclado recorre opciones y la lista permanece completa. Comprueba los nombres accesibles, los valores individuales y múltiples, el envío y la validación, las opciones deshabilitadas, el foco de cierre, el desplazamiento de listas largas y la geometría del panel en pantalla estrecha, ambos temas y movimiento reducido.
