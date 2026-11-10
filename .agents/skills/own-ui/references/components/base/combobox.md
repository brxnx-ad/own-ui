# Combobox

## 1. Identificación

Combobox compone las piezas de `@base-ui/react/combobox` con `clsx` y los iconos internos `Check`, `Chevron` y `Close`. La raíz conserva los genéricos y el contrato de selección de Base UI.

## 2. Propósito y casos de uso

Filtra una lista y guarda una o varias opciones de esa lista. Sirve para elegir ciudades, asociar etiquetas o buscar registros por un nombre visible mientras la aplicación guarda su identificador. Para un campo que admite texto libre con sugerencias, consulta [Autocomplete](autocomplete.md).

## 3. Importación y anatomía

```tsx
import {
  Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxItemIndicator,
  ComboboxList, ComboboxPopup, ComboboxPortal, ComboboxPositioner,
} from "@/components/own/base/combobox";

const cities = ["Santiago", "Valdivia", "Valparaíso"];

<Combobox items={cities}>
  <label htmlFor="city">Ciudad</label>
  <ComboboxInput id="city" />
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxPopup>
        <ComboboxEmpty>No hay coincidencias.</ComboboxEmpty>
        <ComboboxList>
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              <span>{city}</span>
              <ComboboxItemIndicator />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>;
```

| Exportaciones | Nodo predeterminado y función | `data-slot` |
| :--- | :--- | :--- |
| `Combobox` | Proveedor de estado sin contenedor visible propio. Puede generar inputs de formulario. | — |
| `ComboboxInputGroup`, `ComboboxInput` | `div` que agrupa el campo y los controles y `input` que recibe la consulta. | `combobox-input-group`, `combobox-input` |
| `ComboboxLabel`, `ComboboxValue` | `div` que etiqueta el activador del patrón con búsqueda dentro del popup y pieza sin nodo propio que muestra la selección. | `combobox-label` |
| `ComboboxTrigger`, `ComboboxIcon`, `ComboboxClear` | `button` que abre el panel, `span` decorativo y `button` que limpia la selección. El activador incluye un icono Chevron por defecto y Clear incluye Close. | `combobox-trigger`, `combobox-icon`, `combobox-clear` |
| `ComboboxChips`, `ComboboxChip`, `ComboboxChipRemove` | `div` para el grupo de chips, `div` para cada valor y `button` que lo quita con un icono Close por defecto. | `combobox-chips`, `combobox-chip`, `combobox-chip-remove` |
| `ComboboxPortal`, `ComboboxBackdrop`, `ComboboxPositioner`, `ComboboxPopup`, `ComboboxArrow` | Piezas `div` para portal, fondo opcional, posicionamiento, panel y flecha opcional. | `combobox-portal`, `combobox-backdrop`, `combobox-positioner`, `combobox-popup`, `combobox-arrow` |
| `ComboboxStatus`, `ComboboxEmpty` | `div` para anuncios y para el mensaje que aparece cuando se filtran todos los resultados. | `combobox-status`, `combobox-empty` |
| `ComboboxList`, `ComboboxCollection`, `ComboboxRow` | `div` para la lista, iterador de resultados sin nodo propio y `div` para una fila del modo grid. | `combobox-list`, `combobox-row` |
| `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxSeparator` | `div` para agrupar opciones, `div` para el rótulo de cada grupo y separador visual `div`. | `combobox-group`, `combobox-group-label`, `combobox-separator` |
| `ComboboxItem`, `ComboboxItemIndicator` | Opción `div` e indicador `span` con Check por defecto. | `combobox-item`, `combobox-item-indicator` |
| `createComboboxItems`, `useComboboxFilter`, `useComboboxFilteredItems` | Utilidad para derivar IDs y etiquetas y hooks de filtrado de Base UI. | — |

La raíz recibe los datos y las piezas mediante `children`. En una lista plana, `ComboboxList` puede recibir una función que renderiza cada resultado. En una lista agrupada, cada resultado exterior es un grupo. Coloca `ComboboxGroupLabel` y `ComboboxCollection` dentro de `ComboboxGroup` y pasa sus `items` filtrados. Coloca `ComboboxEmpty` y `ComboboxStatus` junto a la lista en el popup para que sus anuncios se mantengan disponibles.

## 4. Variantes y tamaños

La API carece de variantes visuales y tamaños propios. `multiple` cambia la forma del valor y permite componer chips. El campo independiente tiene una altura mínima de `2.5rem`, los controles del campo parten de `2rem` y el botón de quitar un chip mide `1.5rem` con la escala base de Tailwind. El popup sigue el ancho del ancla y limita su altura a `20rem` o al espacio disponible.

## 5. Props y callbacks

`Combobox<Value, Multiple, Item>` conserva el tipo de selección `Value` y el tipo de dato renderizado `Item`. Por defecto coinciden y `Multiple` es `false`. La selección única admite `Value | null` en `onValueChange`. La múltiple recibe `readonly Value[]` como entrada de selección y devuelve `Value[]` en el callback.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Raíz | `items` | Arreglo plano o agrupado, o colección de `createComboboxItems` | — | Sí | Fuente de opciones. Excluye entradas nulas. Necesaria para la lista filtrada y el mensaje vacío. |
| Raíz | `multiple` | `boolean` | `false` | Sí | Activa la selección múltiple. |
| Raíz | `value`, `defaultValue` | `Value \| readonly Value[] \| null` según modo | `null` o `[]` sin control | Sí | Selección controlada o inicial. Usa `[]` para vaciar el modo múltiple. |
| Raíz | `onValueChange` | `(value, details: ComboboxRootChangeEventDetails) => void` | — | Sí | Notifica la selección propuesta. Actualiza `value` si lo controlas. |
| Raíz | `inputValue`, `defaultInputValue` | Tipo de valor del `input` de React | Según modo y selección | Sí | Consulta controlada o inicial. Usa texto para controlar la búsqueda. |
| Raíz | `onInputValueChange` | `(inputValue: string, details: ComboboxRootChangeEventDetails) => void` | — | Sí | Notifica cambios del texto, incluidos los reinicios hechos por Base UI. |
| Raíz | `open`, `defaultOpen` | `boolean` | `false` sin control | Sí | Controla o inicializa el panel. |
| Raíz | `onOpenChange` | `(open: boolean, details: ComboboxRootOpenChangeEventDetails) => void` | — | Sí | Notifica solicitudes de apertura o cierre. |
| Raíz | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Notifica después de las animaciones de apertura o cierre. |
| Raíz | `filter` | `null \| ((item: Item, query: string, itemToString?: (item: Item) => string) => boolean)` | Filtro de Base UI | Sí | Personaliza la coincidencia. Usa `null` para desactivar el filtrado interno. |
| Raíz | `filteredItems` | `readonly Item[] \| readonly Group<Item>[]` | Resultado interno | Sí | Resultados controlados. Preserva la estructura de `items` y usa los datos fuente aunque el valor guardado sea un ID. |
| Raíz | `itemToStringLabel`, `itemToStringValue` | `(value: Value) => string` | Según el valor | Sí | Resuelven etiqueta y serialización. Base UI reconoce objetos `{ label, value }`. En una colección, `getLabel` prevalece para valores conocidos. |
| Raíz | `isItemEqualToValue` | `(item: Value, value: Value) => boolean` | `Object.is` | Sí | Define igualdad si se recrean objetos equivalentes. |
| Raíz | `locale`, `limit` | `Intl.LocalesArgument`, `number` | Locale del entorno, `-1` | Sí | Configura la comparación y el límite de resultados. |
| Raíz | `autoHighlight`, `highlightItemOnHover`, `loopFocus` | `boolean` | `false`, `true`, `true` | Sí | Controlan el resaltado al filtrar, al pasar el puntero y el recorrido de flechas. |
| Raíz | `onItemHighlighted` | `(item: Value \| undefined, details: ComboboxRootHighlightEventDetails) => void` | — | Sí | Notifica cambios de resaltado. Incluye índice y motivo `keyboard`, `pointer` o `none`. |
| Raíz | `openOnInputClick`, `modal` | `boolean` | `true`, `false` | Sí | Controlan la apertura por clic en el campo y la interacción exterior con el popup abierto. |
| Raíz | `name`, `form`, `autoComplete`, `inputRef` | Strings y `Ref<HTMLInputElement>` | — | Sí | Identifican el campo y su formulario, sugieren autocompletado del navegador y dan acceso al input interno de formulario. |
| Raíz | `disabled`, `readOnly`, `required` | `boolean` | `false` | Sí | Deshabilitan el control, bloquean cambios de selección o exigen una selección para enviar. |
| Raíz | `grid`, `virtualized`, `inline` | `boolean` | `false` | Sí | Activa filas navegables, virtualización externa o lista en línea. Para lista en línea usa también `open`. |
| Raíz | `actionsRef` | `RefObject<ComboboxRootActions \| null>` | — | Sí | Expone `close()` y `unmount()` para cierre imperativo y animación externa. |
| `Value` | `children`, `placeholder` | Nodo o función de valor para `children`, nodo para `placeholder` | Etiqueta resuelta | Sí | Renderiza la selección o el placeholder. La función recibe el valor de la raíz. |
| `Input`, `Trigger`, `Clear` | `disabled` | `boolean` | `false` local | Sí | Añade deshabilitación local a la de la raíz. |
| `Trigger`, `Clear`, `ChipRemove`, `Item` | `nativeButton` | `boolean` | `true` en botones, `false` en Item | Sí | Indica si el nodo compuesto es un botón nativo. |
| `List`, `Collection` | `children` | Nodo o `(item, index) => ReactNode` | — | Sí en List | La función itera los resultados visibles. Es obligatoria en Collection. |
| `Group` | `items` | Arreglo de opciones | — | Sí | Fuente de la colección hija del grupo. |
| `Separator` | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Define el eje del divisor. |
| `Item` | `value`, `index`, `disabled` | Valor de selección, número, booleano | `null`, automático, `false` | Sí | Identifica la opción, fija su índice si es necesario y permite deshabilitarla. |
| `ItemIndicator`, `Clear`, `Portal` | `keepMounted` | `boolean` | `false` | Sí | Conserva la pieza cuando queda inactiva. |
| `Portal` | `container` | Elemento, ShadowRoot, referencia o `null` | `body` | Sí | Selecciona el destino del portal. |
| `Positioner` | `anchor`, `side`, `align`, `sideOffset` | Ancla, lado, alineación, número o función | Automático, `bottom`, `center`, `4` | Sí | Coloca el panel y permite separarlo del ancla. Solo `sideOffset=4` es un valor propio de own-ui. |
| `Positioner` | `alignOffset`, `collisionBoundary`, `collisionPadding`, `collisionAvoidance`, `positionMethod`, `sticky`, `arrowPadding`, `disableAnchorTracking` | Props de posicionamiento de Base UI | Base UI | Sí | Ajustan colisiones, alineación, seguimiento y posición CSS. |
| `Popup` | `initialFocus`, `finalFocus` | Booleano, ref o función de interacción | Base UI | Sí | Ajustan el foco al abrir y cerrar. |
| Piezas con nodo | `className`, `style`, `render`, `ref` | Props de la primitiva | Nodo de cada pieza | Sí | Personalizan el nodo y conservan el acceso DOM. Las piezas estilizadas combinan clases estáticas o funcionales con sus clases base. |

En los callbacks de cambio, `details.event` conserva el evento original y `details.cancel()` cancela la solicitud. Los motivos incluyen `input-change`, `item-press`, `clear-press`, `chip-remove-press`, `escape-key` y `outside-press`, según el evento. Para un cierre con animación externa, llama `details.preventUnmountOnClose()` en `onOpenChange` y luego `actionsRef.current?.unmount()` al terminar. Consulta los tipos exportados desde `@base-ui/react/combobox` para la unión completa.

## 6. Funcionamiento y estados

- Separa la selección (`value`), la consulta (`inputValue`) y la apertura (`open`). Cada estado puede controlarse con su callback o inicializarse con su prop `default*`.
- En modo único, Base UI muestra la etiqueta al elegir una opción y cierra el popup. En múltiple, `ComboboxValue` permite renderizar las selecciones como chips dentro de `ComboboxChips`, con el campo de búsqueda en el mismo contenedor.
- `createComboboxItems(datos, { getValue, getLabel })` usa IDs primitivos únicos para seleccionar y mantiene los datos originales al renderizar y filtrar. Crea las colecciones estáticas fuera del render y memoriza las dinámicas por datos.
- `useComboboxFilter` proporciona comparadores de texto basados en el locale. `useComboboxFilteredItems<Item>()` se usa dentro de la raíz para leer los resultados filtrados. Trata el resultado como de solo lectura.
- El formulario recibe el valor seleccionado bajo `name`. En modo múltiple, usa `FormData.getAll(name)` para recuperar los valores. Para objetos, define la serialización con `itemToStringValue` o usa una colección con IDs.
- El popup permanece montado durante la salida. `ComboboxPortal keepMounted` conserva el árbol después del cierre. El posicionador usa como ancla el grupo del campo o el input. Cuando el campo está dentro del popup, usa el activador.

Los nodos incluyen `data-slot="combobox-…"`, con el sufijo de la pieza en minúsculas y guiones, como `combobox-input-group` o `combobox-item-indicator`. Las opciones exponen `data-highlighted`, `data-selected` y `data-disabled`. El control de limpieza usa `data-visible` y el indicador usa `data-selected`. El posicionador usa `data-anchor-hidden`, y el posicionador, el panel y la flecha exponen lado y alineación cuando corresponde. El panel y el fondo usan `data-starting-style` y `data-ending-style`. Los estados de campo y de apertura dependen de cada primitiva.

## 7. Estilos admitidos por pieza

| Piezas | Estilo base y personalización |
| :--- | :--- |
| `Label`, `Input`, `InputGroup` | Etiqueta `body-sm`, campo de ancho completo con `surface-bold`, borde `gray-base`, radio `rounded-base` y anillo `primary-base`. El grupo sustituye visualmente el borde y anillo del input directo. Los estados de error usan `error-base`. Ajusta el ancho desde el consumidor y conserva el foco visible. |
| `Trigger`, `Icon`, `Clear`, `ChipRemove` | Controles compactos con texto neutro y foco visible. El tamaño base de los iconos es `1rem`. Sustituye sus `children` o ajusta el SVG desde su propio nodo. |
| `Chips`, `Chip` | Los chips fluyen en varias líneas y el campo ocupa el espacio libre. Cada chip usa `gray-soft`, radio base y texto neutro. Ajusta gaps y contenido desde las piezas o el contenedor. |
| `Positioner`, `Popup`, `Backdrop`, `Arrow` | El posicionador usa `z-50`, `--anchor-width` y `--available-width`. El popup limita su altura con `--available-height`, usa `surface-base`, borde neutro y `shadow-m`. El fondo ocupa el viewport y usa `z-40`. La flecha se orienta según `data-side`. |
| `List`, `Item`, `ItemIndicator` | Lista con scroll y padding interior. El resaltado usa `primary-soft`, la selección usa texto seminegrita y la marca es decorativa. El indicador conservado se oculta cuando la opción está desmarcada. |
| `Row`, `GroupLabel`, `Separator`, `Status`, `Empty` | Filas flex, títulos compactos, divisor neutro y mensajes con padding cuando tienen contenido. Personaliza cada nodo con sus props. |

El popup anima opacidad y escala durante 150 ms con `--transform-origin`. El fondo anima opacidad durante el mismo intervalo. Las transiciones se limitan a `motion-safe`. Ajusta el tamaño de la lista sin eliminar su capacidad de desplazarse y conserva los atributos de salida si personalizas las transiciones. Los tokens de [globals.md](../../globals.md) se reasignan por tema.

`className` y `style` pueden ser estáticos o funciones de estado donde la primitiva los admite. `clsx` combina las clases base y las adicionales. Salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), las utilidades en conflicto siguen la cascada. En una función `render`, propaga las props, estilos, eventos y referencias recibidos.

## 8. Ejemplos de composición

El [ejemplo básico](#3-importación-y-anatomía) usa cadenas como selección. Para guardar IDs, sustituye `items` por una colección y pasa a cada opción el valor derivado por `getValue`.

```tsx
import { createComboboxItems } from "@/components/own/base/combobox";

const warehouses = [
  { code: "B01", name: "Bodega Norte" },
  { code: "B02", name: "Bodega Centro" },
];
const items = createComboboxItems(warehouses, {
  getValue: (warehouse) => warehouse.code,
  getLabel: (warehouse) => warehouse.name,
});
```

En la composición básica, usa `items={items}` en la raíz y `value={warehouse.code}` dentro del render de la lista.

Para selección múltiple, conserva la lista del ejemplo básico, activa `multiple` en la raíz y sustituye el campo por esta composición. El valor de cada chip debe corresponder al orden del arreglo seleccionado.

```tsx
import {
  ComboboxChip, ComboboxChipRemove, ComboboxChips, ComboboxInput,
  ComboboxInputGroup, ComboboxValue,
} from "@/components/own/base/combobox";

<ComboboxInputGroup>
  <ComboboxValue>
    {(selected: string[]) => (
      <ComboboxChips aria-label="Ciudades seleccionadas">
        {selected.map((city) => (
          <ComboboxChip key={city} aria-label={city} aria-description="Pulsa Retroceso o Suprimir para quitarlo.">
            <span>{city}</span>
            <ComboboxChipRemove aria-label={`Quitar ${city}`} />
          </ComboboxChip>
        ))}
        <ComboboxInput
          id="city"
          aria-description="Desde el inicio del campo, pulsa Flecha izquierda para ir a las selecciones."
        />
      </ComboboxChips>
    )}
  </ComboboxValue>
</ComboboxInputGroup>;
```

Para búsqueda dentro del popup, coloca `ComboboxValue` y `ComboboxIcon` dentro del activador y etiqueta el activador con `ComboboxLabel`.

## 9. Accesibilidad e integración

- Si el input está fuera del popup, asócialo a una etiqueta HTML mediante `htmlFor` e `id`. Si el input está dentro, etiqueta el activador con `ComboboxLabel` y da un nombre accesible al input. Nombra los controles de solo icono y cada acción de quitar un chip.
- Las flechas mueven el resaltado, Enter selecciona y Escape cierra. Para los chips, explica cómo ir a ellos desde el inicio del campo y cómo quitar el chip enfocado con Retroceso o Suprimir.
- Conserva la región de `ComboboxEmpty` en el DOM mientras el popup esté abierto para anunciar cambios. Al personalizar un portal, verifica el apilamiento, la herencia de tema y el espacio disponible.
- Define handlers, funciones de renderizado de listas y hooks en un módulo cliente de App Router.

## 10. Límites y verificación

Exporta `combobox.tsx` con sus iconos de soporte, Base UI 1.9.0, `clsx`, React 19 y Tailwind CSS. El consumidor aporta datos, las etiquetas, el estado externo y la virtualización si corresponde. Consulta [estructura](../../structure.md) para preparar los archivos.

Verifica filtrado, selección por teclado, eliminación de chips, resultados vacíos y valores de formulario. Prueba el panel en ambos temas, a un ancho reducido y cerca de los bordes del viewport. [Documentación de Combobox en Base UI](https://base-ui.com/react/components/combobox).
