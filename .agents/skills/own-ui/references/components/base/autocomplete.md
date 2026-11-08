# Autocomplete

## 1. Identificación

Autocomplete pertenece a `base/` y envuelve `@base-ui/react/autocomplete`, `clsx` y los iconos internos Chevron y Close.

## 2. Propósito y casos de uso

Usa Autocomplete en un campo que admite texto libre y ofrece sugerencias para agilizar la escritura, por ejemplo al buscar un producto o introducir una ciudad. Aceptar una opción copia su texto al campo. Si el formulario debe conservar la identidad de una opción y exigir que pertenezca al catálogo, usa una primitiva de selección como Combobox.

## 3. Importación y anatomía

En la composición flotante, coloca `AutocompleteInput` dentro de la raíz y anida `Popup` dentro de `Positioner` dentro de `Portal`. `InputGroup` es opcional y permite compartir un borde y un ancla entre el campo y sus controles. `Empty` y `Status` se colocan como hermanos de `List`. El consumidor aporta los datos, la etiqueta, el contenido de las opciones y los mensajes.

```tsx
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
} from "@/components/own/base/autocomplete";

<Autocomplete items={["Santiago", "Valdivia"]}>
  <label>
    Ciudad
    <AutocompleteInput />
  </label>
  <AutocompletePortal>
    <AutocompletePositioner>
      <AutocompletePopup>
        <AutocompleteList>
          {(city: string) => <AutocompleteItem key={city} value={city}>{city}</AutocompleteItem>}
        </AutocompleteList>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompletePortal>
</Autocomplete>
```

| Exportación | Elemento base | Responsabilidad |
| :--- | :--- | :--- |
| `Autocomplete` | Sin nodo contenedor | Coordina el texto, el filtrado, la apertura y el resaltado. |
| `AutocompleteInputGroup` | `div` | Agrupa los controles y sirve de ancla cuando el campo está fuera del panel. |
| `AutocompleteInput` | `input` | Recibe el texto y la navegación de las sugerencias. |
| `AutocompleteTrigger` | `button` | Alterna el panel. Por defecto incorpora `AutocompleteIcon`. |
| `AutocompleteIcon` | `span` | Icono decorativo del activador. Por defecto muestra Chevron. |
| `AutocompleteClear` | `button` | Borra el texto y devuelve el foco al campo. Por defecto muestra Close. |
| `AutocompleteValue` | Fragmento | Muestra el texto del campo o lo entrega a una función. |
| `AutocompletePortal` | `div` portaleado | Inserta el panel en otro contenedor del DOM. |
| `AutocompleteBackdrop` | `div` | Cubre el fondo si se incluye como hermano de `Positioner`. |
| `AutocompletePositioner` | `div` | Mide el ancla, resuelve colisiones y posiciona el panel. |
| `AutocompletePopup` | `div` | Presenta el panel y coordina foco y transiciones. |
| `AutocompleteArrow` | `div` | Flecha decorativa dentro del panel. Sigue el lado efectivo. |
| `AutocompleteStatus` | `div` | Región viva para mensajes del consumidor. |
| `AutocompleteEmpty` | `div` | Región viva que muestra su contenido cuando faltan resultados. |
| `AutocompleteList` | `div` | Contiene las sugerencias en una lista o cuadrícula desplazable. |
| `AutocompleteItem` | `div` | Opción que puede completar el texto del campo. |
| `AutocompleteRow` | `div` | Agrupa opciones por fila dentro de `List` con `grid`. |
| `AutocompleteGroup` | `div` | Agrupa sugerencias y proporciona sus datos a `Collection`. |
| `AutocompleteGroupLabel` | `div` | Asocia un nombre accesible al grupo que lo contiene. |
| `AutocompleteSeparator` | `div` | Separa visualmente opciones o grupos. |
| `AutocompleteCollection` | Sin nodo propio | Itera sobre resultados filtrados de la raíz o de un grupo. |
| `useAutocompleteFilter` | Hook | Proporciona `contains`, `startsWith` y `endsWith` con comparación por locale. |
| `useAutocompleteFilteredItems` | Hook | Devuelve los resultados de la raíz. Úsalo desde un descendiente de `Autocomplete`. |

## 4. Variantes y tamaños

La familia carece de props propias `variant` y `size`. El campo tiene una altura mínima de `2.5rem` y los botones tienen `2rem` por lado con la escala de espaciado predeterminada de Tailwind. `mode` configura el comportamiento.

| `mode` | Filtra por lo escrito | Previsualiza la sugerencia resaltada en el campo |
| :--- | :--- | :--- |
| `list` (predeterminado) | Sí | — |
| `both` | Sí | Sí |
| `inline` | — | Sí |
| `none` | — | — |

`inline` como prop booleana de la raíz coloca `List` en el flujo de la página. Se usa con `open` y es independiente de `mode="inline"`.

## 5. Props y callbacks

La raíz conserva el genérico de Base UI para colecciones planas y agrupadas. `Item` en la tabla representa el tipo del dato, `Group<Item>` tiene una propiedad `items` y admite metadatos del consumidor. Los tipos heredados se pueden consultar en `@base-ui/react/autocomplete`.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Autocomplete | `items`, `filteredItems` | `readonly Item[] \| readonly Group<Item>[]` | — | Sí | `items` aporta el conjunto de datos. `filteredItems` suministra resultados calculados por el consumidor con la misma estructura. Excluye entradas nulas. |
| Autocomplete | `filter` | `((item: Item, query: string, itemToString?: (item: Item) => string) => boolean) \| null` | Coincidencia parcial | Sí | Personaliza el filtro interno. `null` desactiva ese filtrado. |
| Autocomplete | `limit`, `locale` | `number`, `Intl.LocalesArgument` | `-1`, locale del entorno | Sí | Limita el número de resultados generados internamente y configura la comparación de texto. `-1` permite todas las coincidencias. Aplica tu propio límite al proporcionar `filteredItems`. |
| Autocomplete | `itemToStringValue` | `(item: Item) => string` | Usa `label` con objetos `{ value, label }` | Sí | Obtiene el texto que se filtra, se muestra al aceptar la opción y se envía con el formulario. |
| Autocomplete | `mode` | `"list" \| "both" \| "inline" \| "none"` | `"list"` | Sí | Configura filtrado y sugerencia dentro del campo. |
| Autocomplete | `value`, `defaultValue` | `string \| number \| readonly string[]` | `defaultValue: ""` | Sí | Controla el texto o fija su valor inicial. Para campos de texto usa un `string`. |
| Autocomplete | `onValueChange` | `(value: string, details: AutocompleteRootChangeEventDetails) => void` | — | Sí | Informa el texto solicitado al escribir, limpiar o aceptar una opción. |
| Autocomplete | `open`, `defaultOpen` | `boolean` | `defaultOpen: false` | Sí | Controla la apertura o su estado inicial. |
| Autocomplete | `onOpenChange` | `(open: boolean, details: AutocompleteRootOpenChangeEventDetails) => void` | — | Sí | Recibe la solicitud de apertura o cierre. Admite `cancel()` y `preventUnmountOnClose()`. |
| Autocomplete | `onOpenChangeComplete` | `(open: boolean) => void` | — | Sí | Se ejecuta al finalizar la apertura o el cierre. |
| Autocomplete | `onItemHighlighted` | `(item: Item \| undefined, details: AutocompleteRootHighlightEventDetails) => void` | — | Sí | Recibe el elemento resaltado y su índice. Al quitar el resaltado recibe `undefined` e índice `-1`. |
| Autocomplete | `autoHighlight` | `boolean \| "always"` | `false` | Sí | `true` resalta al escribir. `"always"` resalta desde la apertura. |
| Autocomplete | `keepHighlight`, `highlightItemOnHover`, `loopFocus`, `openOnInputClick` | `boolean` | `false`, `true`, `true`, `false` | Sí | Controla el resaltado al salir con el puntero, el resaltado al pasar sobre una opción, la vuelta al campo en los extremos y la apertura al pulsar el campo. |
| Autocomplete | `disabled`, `readOnly`, `required` | `boolean` | `false` | Sí | Deshabilita la interacción, bloquea la edición o exige texto en el formulario, respectivamente. |
| Autocomplete | `name`, `form`, `id`, `inputRef` | `string`, `string`, `string`, `Ref<HTMLInputElement>` | — | Sí | Define el nombre enviado, el identificador del formulario asociado, el identificador base y la ref del input interno oculto. Usa `ref` de `Input` para el campo visible. |
| Autocomplete | `submitOnItemClick` | `boolean` | `false` | Sí | Envía el formulario al aceptar una opción mediante el puntero o Enter. |
| Autocomplete | `inline`, `modal`, `grid`, `virtualized` | `boolean` | `false` | Sí | Activa lista en el flujo con `open`, interacción modal, navegación por filas o integración con un virtualizador externo, respectivamente. |
| Autocomplete | `actionsRef` | `RefObject<AutocompleteRootActions \| null>` | — | Sí | Expone `close()` y `unmount()`. Llama a `unmount()` al finalizar una transición externa cuyo cierre hayas retenido. |
| Input, Trigger, Clear | `disabled` | `boolean` | `false` | Sí | Deshabilita la pieza. La deshabilitación de la raíz también se aplica. |
| Trigger, Clear, Item | `nativeButton` | `boolean` | `true` en Trigger y Clear, `false` en Item | Sí | Indica si el elemento proporcionado por `render` es un botón nativo. |
| Trigger, Icon, Clear | `children` | `ReactNode` | `AutocompleteIcon`, Chevron, Close | Sí | Sustituye el contenido predeterminado. |
| Clear | `keepMounted` | `boolean` | `false` | Sí | Mantiene el botón montado cuando el campo está vacío. Usa `data-visible` si quieres distinguir su presentación con y sin texto. |
| Value | `children` | `ReactNode \| ((value: string) => ReactNode)` | Valor del campo | Sí | Personaliza su presentación. |
| Portal | `container`, `keepMounted` | `HTMLElement \| ShadowRoot \| RefObject<HTMLElement \| ShadowRoot \| null> \| null`, `boolean` | Portal padre o `body`, `false` | Sí | Elige el destino y la persistencia al cerrar. Un destino explícito `null` difiere el montaje. |
| Positioner | `anchor` | `Element \| VirtualElement \| RefObject<Element \| null> \| (() => Element \| VirtualElement \| null) \| null` | Ancla automática | Sí | Cambia la referencia de posicionamiento. |
| Positioner | `side`, `align` | `"top" \| "bottom" \| "left" \| "right" \| "inline-start" \| "inline-end"`, `"start" \| "center" \| "end"` | `"bottom"`, `"center"` | Sí | Configura el lado y la alineación preferidos. |
| Positioner | `sideOffset`, `alignOffset` | `number \| ((data: OffsetData) => number)` | `4`, `0` | Sí | Desplaza el panel en cada eje. La función recibe lado, alineación y dimensiones del ancla y del posicionador. El valor `4` es propio de own-ui. |
| Positioner | `positionMethod`, `collisionBoundary`, `collisionAvoidance` | `"absolute" \| "fixed"`, `Boundary`, `CollisionAvoidance` | `"absolute"`, `"clipping-ancestors"`, ajuste de dropdown de Base UI | Sí | Ajusta el posicionamiento y cómo se resuelve el espacio insuficiente. |
| Positioner | `collisionPadding`, `arrowPadding`, `sticky`, `disableAnchorTracking` | `Padding`, `number`, `boolean`, `boolean` | `5`, `5`, `false`, `false` | Sí | Configura separación del límite de colisión y de la flecha respecto del borde, permanencia al desplazar el ancla y seguimiento del ancla. |
| Popup | `initialFocus`, `finalFocus` | `boolean \| RefObject<HTMLElement \| null> \| ((interaction: InteractionType) => void \| boolean \| HTMLElement \| null)` | Comportamiento de Base UI | Sí | Personaliza el foco al abrir o cerrar. |
| List, Collection | `children` | `(item: Item, index: number) => ReactNode` | — | Solo en List | Renderiza los resultados. List también admite nodos JSX. Collection requiere la función. |
| Item | `value`, `disabled`, `index` | `Item`, `boolean`, `number` | `—`, `false`, automático | Sí | Pasa el dato original en `value`. Define el índice del resultado al virtualizar. |
| Group | `items` | `readonly Item[]` | — | Sí | Proporciona los resultados del grupo a la `Collection` anidada. |
| Separator | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Ajusta la orientación del separador. |
| Piezas con nodo | `className`, `style`, `render` | `string`, `CSSProperties`, `ReactElement` o sus funciones de composición | Nodo y estilos de cada pieza | Sí | `className` y `style` reciben `state` en su forma funcional. `render` recibe `(props, state)`. Las piezas también propagan los atributos HTML, ARIA, eventos y refs que admite su tipo. |

Los callbacks de cambio reciben `reason` y el evento. Entre los motivos del valor están `input-change`, `input-clear`, `item-press` y `clear-press`. Entre los de apertura o cierre están `trigger-press`, `list-navigation`, `outside-press`, `focus-out`, `escape-key` e `imperative-action`. `cancel()` detiene el manejo de Base UI. Si necesitas vetar un cambio de texto, controla `value` y decide si lo actualizas en el callback. La raíz de Autocomplete actualiza su estado de texto no controlado antes de invocar `onValueChange`.

`onItemHighlighted` informa `keyboard`, `pointer` o `none`. Su evento puede ser `MouseEvent` o `PointerEvent` con motivo `pointer`. Este callback solo notifica el resaltado.

## 6. Funcionamiento y estados

- Controla el texto con `value` y `onValueChange` o inicialízalo con `defaultValue`. La apertura tiene su propio par `open` y `onOpenChange`, o se inicializa con `defaultOpen`. Una previsualización en `mode="both"` puede cambiar temporalmente el texto visible mientras el filtro sigue usando lo escrito.
- Al cerrar, el panel permanece montado mientras termina la transición. `Portal keepMounted` conserva el DOM cerrado. Para una animación de salida externa, llama a `details.preventUnmountOnClose()` en el cierre y después a `actionsRef.current?.unmount()`.
- El consumidor controla la carga, los errores y la vigencia de las respuestas asíncronas. Entrega resultados externos mediante `filteredItems` y usa `Status` para informar el progreso. `Empty` muestra su contenido cuando no quedan resultados. Conserva el nodo de cada región viva mientras el panel esté montado y actualiza su contenido.

Las piezas DOM usan `data-slot="autocomplete-<pieza>"`. En la tabla se abrevia el prefijo `data-` de los estados.

| `data-slot` | Atributos de estado de Base UI |
| :--- | :--- |
| `autocomplete-input`, `autocomplete-input-group`, `autocomplete-trigger` | `popup-open`, `popup-side`, `list-empty`, `pressed`, `disabled`, `readonly` y estados de validación de Field según la pieza. `required` corresponde a Input y Trigger. |
| `autocomplete-clear` | `popup-open`, `disabled`, `visible`, `starting-style`, `ending-style` |
| `autocomplete-positioner` | `open`, `closed`, `side`, `align`, `anchor-hidden`, `empty` |
| `autocomplete-popup` | Estados de Positioner, `starting-style`, `ending-style` |
| `autocomplete-backdrop` | `open`, `closed`, `starting-style`, `ending-style` |
| `autocomplete-arrow` | `open`, `closed`, `side`, `align`, `uncentered` |
| `autocomplete-list` | `empty` |
| `autocomplete-item` | `highlighted`, `disabled` |
| `autocomplete-separator` | `orientation` |
| `autocomplete-icon`, `autocomplete-portal`, `autocomplete-status`, `autocomplete-empty`, `autocomplete-row`, `autocomplete-group`, `autocomplete-group-label` | Sin atributos de estado propios. |

## 7. Estilos admitidos por pieza

| Pieza | Estilos y ajustes locales |
| :--- | :--- |
| InputGroup e Input | El grupo usa un borde `gray-base`, superficie `surface-bold`, `gap-1` y `rounded-base`. Su anillo usa `primary-base` al contener el foco y `error-base` en estado inválido. El input tiene `w-full min-w-0 min-h-10 px-3 py-2`, `text-base sm:text-sm`, texto `gray-bold` y placeholder atenuado. Como hijo directo del grupo cede a este el borde visible, el fondo y el anillo. Fuera del grupo aplica sus propios estilos de foco y `aria-invalid`. |
| Trigger, Clear e Icon | Los botones usan `size-8`, `rounded-base`, texto `gray-bold` atenuado, `surface-base` en hover y anillo `primary-base` en foco visible. Los SVG sin clase `size-*` se escalan a `1.15em`. Cambia el icono con `children`. |
| Positioner y Portal | Positioner usa `z-50`, ancho `--anchor-width`, máximo `--available-width` y se oculta visualmente con `data-anchor-hidden`. Ajusta el ancho en el posicionador y la separación exterior del campo desde el contenedor consumidor. Portal conserva los estilos del ámbito donde se inserta. |
| Popup y Backdrop | Popup usa `rounded-base`, borde `gray-base`, `surface-base`, `gray-bold` y `shadow-m`. Su altura máxima es `min(var(--available-height), 20rem)`. Backdrop cubre el viewport en `z-40` con `gray-bold/40` en claro y `surface-soft/70` en oscuro. |
| Arrow | Cuadrado de `0.5rem` con borde `gray-base` y fondo `surface-base`. Su posición y giro siguen `data-side`. |
| List, Item y Row | List aporta `p-1`, `min-h-0`, scroll vertical y contención del desplazamiento. Item usa `body-sm`, `px-2 py-2` y `rounded-base`. `data-highlighted` aplica `primary-soft` con texto `gray-bold` y `data-disabled` atenúa la opción. Row distribuye sus hijos con flex y `gap-1`. |
| Group, GroupLabel y Separator | Group conserva las clases del consumidor. GroupLabel usa `caption`, peso seminegrita y `gray-bold/75`. Separator aplica una línea `gray-base` de 1 px en el eje correspondiente. |
| Empty y Status | Usan `body-sm`, `px-3 py-2` y `gray-bold/75`. El selector CSS `:empty` quita el padding mientras el mensaje no tiene contenido. |

**Ancla y dirección.** Sin un `anchor` explícito, el panel toma `InputGroup` o, si falta el grupo, `Input`. Si el campo está dentro del popup, usa `Trigger`. El lado preferido es abajo, centrado y a 4 px. Las colisiones pueden llevarlo al lado opuesto. Usa `data-side` y `data-align` para estilizar según la posición efectiva. El ancho del panel queda limitado por el espacio disponible. Para reducir su altura sin perder ese límite, aplica a Popup `style={{ maxHeight: "min(var(--available-height), 16rem)" }}` y conserva el scroll de List.

**Animación.** Popup transiciona opacidad y escala en 150 ms. `--transform-origin` vincula la escala al punto de anclaje y la entrada y salida usan `data-starting-style` y `data-ending-style`. La escala del 95 % se aplica con `motion-safe`. Backdrop transiciona opacidad en 150 ms. Ambas piezas desactivan la transición con `motion-reduce`. Conserva estos estados si personalizas el cierre o su duración.

En las piezas con estilos propios, `clsx` combina las clases base con `className` estático o con el resultado de `className(state)`. Comprueba la cascada al cambiar utilidades que compiten. `style` estático o funcional llega al nodo correspondiente. Al usar `render`, conserva las props de posicionamiento, estilos, eventos y refs de Base UI. Los tokens responden al tema del destino del portal. [Sistema de estilos](../../globals.md)

## 8. Ejemplos de composición

El ejemplo de la sección 3 usa el filtro habitual. Para ofrecer hasta 20 sugerencias de un catálogo grande y permitir que una búsqueda alcance el último elemento, conserva la lista completa en `items`. Este ejemplo controla el texto y solicita abrir el panel hacia arriba.

```tsx
"use client";

import { useId, useState } from "react";
import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger,
} from "@/components/own/base/autocomplete";

const products = Array.from({ length: 1000 }, (_, index) =>
  `Producto ${String(index + 1).padStart(4, "0")}`,
);

export function ProductSearch() {
  const id = useId();
  const [value, setValue] = useState("");

  return (
    <Autocomplete items={products} limit={20} value={value} onValueChange={setValue}>
      <label htmlFor={id}>Producto</label>
      <AutocompleteInputGroup>
        <AutocompleteInput id={id} placeholder="Busca 1000" />
        <AutocompleteClear aria-label="Borrar búsqueda" />
        <AutocompleteTrigger aria-label="Mostrar sugerencias" />
      </AutocompleteInputGroup>
      <AutocompletePortal>
        <AutocompletePositioner side="top" sideOffset={8}>
          <AutocompletePopup>
            <AutocompleteEmpty>Sin coincidencias.</AutocompleteEmpty>
            <AutocompleteList>
              {(product: string) => (
                <AutocompleteItem key={product} value={product}>{product}</AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </Autocomplete>
  );
}
```

Para agrupar objetos, pasa `items` con entradas `{ name, items }` y define `itemToStringValue` para cada objeto de opción. En el render de List, entrega `group.items` a `AutocompleteGroup`, muestra `group.name` con `AutocompleteGroupLabel` y usa `AutocompleteCollection` para iterar los resultados del grupo. Pasa el objeto de cada opción a `AutocompleteItem value`.

## 9. Accesibilidad e integración

- Asocia una etiqueta visible con el campo. Da un nombre a Trigger y Clear si contienen solo iconos. Chevron, Close y Arrow son decorativos.
- Las flechas recorren las sugerencias, Enter acepta la resaltada y Escape cierra el panel. Base UI gestiona el foco virtual desde el campo. En la composición habitual con el campo fuera del panel, Trigger y Clear quedan fuera de la secuencia de Tab.
- Al usar `render`, propaga atributos ARIA, eventos y ref al nodo correspondiente. Ajusta `nativeButton` cuando cambies la semántica de un control. Mantén `Empty` y `Status` montados durante la apertura y deja que su contenido cambie para anunciarlo.
- Integra el portal en un destino que herede los tokens de tema y tenga un contexto de apilamiento compatible. Si usas Backdrop o cambias el foco inicial, prueba que el campo y las opciones sigan siendo accesibles. Mantén las composiciones con estado, funciones de renderizado o handlers en un módulo cliente de Next.js. [Integración del entorno](../../structure.md)
- Define `name` para enviar el texto y `required` para exigirlo. El envío admite texto escrito libremente. Con `submitOnItemClick`, comprueba el envío mediante puntero y Enter.

## 10. Límites y verificación

- La altura máxima acota la superficie visible. El renderizado habitual monta todos los resultados entregados a List. `limit` acota el filtrado interno y permite encontrar opciones más allá del primer grupo de resultados. Con `filteredItems`, aplica el límite al calcular esa colección.
- `virtualized` coordina Base UI con una virtualización externa. El consumidor monta las filas de la ventana visible y conserva sus índices y la navegación por teclado. Consulta el ejemplo compatible con la versión instalada. [Virtualización en Base UI](https://base-ui.com/react/components/autocomplete#virtualized)
- Para exportar, incluye `autocomplete.tsx`, Chevron y Close con su soporte y los tokens de own-ui. Verifica los imports y la generación de utilidades en el consumidor. Prueba texto libre, búsqueda fuera de las primeras coincidencias, selección por teclado, foco al limpiar, lista vacía y un panel con poco espacio alrededor del ancla. Revisa los dos temas y el movimiento reducido. [Archivos y compatibilidad](../../structure.md)
