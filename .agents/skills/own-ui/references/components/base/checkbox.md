# Checkbox

## 1. Identificación

Checkbox envuelve `Root` e `Indicator` de `@base-ui/react/checkbox`, combina clases con `clsx` y usa los iconos internos `Check` y `Minus`.

## 2. Propósito y casos de uso

Selecciona una opción independiente en un formulario o una lista de selección. El estado indeterminado representa una selección parcial, como un conjunto que contiene elementos marcados y desmarcados. Para elegir una sola opción entre varias mutuamente excluyentes, usa un grupo de radios.

## 3. Importación y anatomía

```tsx
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";

<label className="flex items-center gap-2.5">
  <Checkbox name="resumen" value="semanal" defaultChecked>
    <CheckboxIndicator />
  </Checkbox>
  Enviarme un resumen semanal
</label>;
```

| Exportación | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Checkbox` | `span` con rol `checkbox` y un `input type="checkbox"` visualmente oculto como hermano | El nodo visible recibe foco y refleja el estado. El input asociado participa en el formulario. |
| `CheckboxIndicator` | `span` | Dentro de `Checkbox`, muestra una marca o un guion. El consumidor puede aportar otro contenido decorativo. |

El consumidor aporta la etiqueta y decide si la casilla recibe un nombre y un valor de formulario. Usa la etiqueta envolvente para que el texto amplíe el área que activa el control.

## 4. Variantes y tamaños

La caja exterior mide `1.25rem × 1.25rem` (20 px con la escala base de Tailwind). Los iconos miden `0.875rem` (14 px). La raíz usa un radio de un tercio de `--radius`, equivalente a 4 px en la configuración base. La API conserva los estados de Base UI y carece de props propias de variante o tamaño.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Checkbox` | `checked` | `boolean` | — | Sí | Estado controlado. Actualízalo en `onCheckedChange`. |
| `Checkbox` | `defaultChecked` | `boolean` | `false` | Sí | Estado inicial al usar el modo no controlado. |
| `Checkbox` | `onCheckedChange` | `(checked: boolean, details: CheckboxRootChangeEventDetails) => void` | — | Sí | Recibe el booleano propuesto al activar la casilla. `details.event` contiene el evento nativo, `details.reason` es `"none"` y `details.cancel()` cancela el cambio. Actualizar `checked` desde el consumidor no dispara el callback. |
| `Checkbox` | `indeterminate` | `boolean` | `false` | Sí | Presenta el estado mixto. El valor booleano de `checked` sigue determinando la selección y el envío. |
| `Checkbox` | `disabled` | `boolean` | `false` | Sí | Bloquea la activación, omite el control al navegar con Tab y excluye su valor del formulario. |
| `Checkbox` | `readOnly` | `boolean` | `false` | Sí | Bloquea cambios desde el control. Conserva el foco por teclado y el valor de formulario. |
| `Checkbox` | `required` | `boolean` | `false` | Sí | Aplica la validación nativa que exige marcar la casilla. |
| `Checkbox` | `name`, `form` | `string` | — | Sí | `name` identifica el campo. `form` referencia por ID al formulario propietario, incluso fuera de su árbol. |
| `Checkbox` | `value` | `string` | `"on"` al enviar | Sí | Valor de una casilla marcada. En Checkbox Group de Base UI identifica la opción y puede tomar `name` si falta. |
| `Checkbox` | `uncheckedValue` | `string` | — | Sí | Valor opcional de una casilla independiente desmarcada. Requiere `name`. |
| `Checkbox` | `id` | `string` | Generado | Sí | Identifica el input asociado. Con `nativeButton`, se aplica al botón visible. |
| `Checkbox` | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Referencia al input asociado, separada de `ref` para el control visible. |
| `Checkbox` | `nativeButton` | `boolean` | `false` | Sí | Actívalo si `render` sustituye la raíz por un botón nativo. |
| `Checkbox` | `parent` | `boolean` | `false` | Sí | Reservado al control global de un Checkbox Group de Base UI configurado para derivar el estado de sus opciones. |
| `CheckboxIndicator` | `keepMounted` | `boolean` | `false` | Sí | Conserva el indicador en el DOM al desmarcarlo. En reposo queda invisible. |
| `CheckboxIndicator` | `children` | `ReactNode` | Marca o guion | Sí | Reemplaza el contenido decorativo propio. Si se omite o es `null`, se usan los iconos predeterminados. |
| Ambas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Combina clases adicionales con las de own-ui. |
| Ambas | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo visible de la pieza. |
| Ambas | `render` | `ReactElement \| ((props, state) => ReactElement)` | `span` | Sí | Sustituye el nodo visible y permite propagar sus props, eventos y referencia. |

Las opciones de selección, formulario, montaje y composición se heredan de Base UI. `children` se admite como prop HTML y own-ui aporta los iconos predeterminados en el indicador. Las piezas propagan atributos ARIA, eventos HTML y `ref` al nodo visible. El tipo `CheckboxRootChangeEventDetails` se importa desde `@base-ui/react/checkbox`.

## 6. Funcionamiento y estados

- Para el modo no controlado, usa `defaultChecked` si necesitas una selección inicial. Para el modo controlado, pasa `checked` y actualízalo con `onCheckedChange`. Conserva el mismo modo durante la vida de la instancia.
- `indeterminate` prevalece en el indicador y en `aria-checked="mixed"`. El callback entrega un booleano y la aplicación decide cuándo dejar de pasar `indeterminate`. Si la casilla pertenece a un grupo con selección global, deja que el grupo derive el estado correspondiente.
- Con `name`, una casilla marcada aporta `value` o el valor nativo `"on"`. Si está desmarcada, solo aporta un valor cuando se ha definido `uncheckedValue` en una casilla independiente. El estado mixto no cambia esta regla. `required` valida la selección booleana.
- Base UI monta el indicador al marcar o al entrar en estado mixto. Al desmarcar, espera a que termine la transición de salida antes de desmontarlo. Con `keepMounted`, queda montado con opacidad cero en reposo.

| Nodo | Slots y atributos |
| :--- | :--- |
| Control visible | `data-slot="checkbox"`. Base UI aplica uno de `data-checked`, `data-unchecked` o `data-indeterminate`, además de `data-disabled`, `data-readonly`, `data-required` y `data-parent` cuando corresponden. |
| Indicador | `data-slot="checkbox-indicator"`. Comparte los tres estados de selección, `data-disabled`, `data-readonly` y `data-required`. Usa `data-starting-style` y `data-ending-style` durante la transición. |
| Ambas piezas con Field de Base UI | Pueden recibir `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled` y `data-focused` según el estado del campo. |
| Input asociado | Base UI lo oculta visualmente y lo vincula al control. Se accede con `inputRef`. |

El estado de los callbacks de estilo incluye `checked`, `indeterminate`, `disabled`, `readOnly`, `required` y los datos de Field. El indicador añade `transitionStatus`.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base | Personalización |
| :--- | :--- | :--- |
| `Checkbox` | Caja centrada con borde de 1 px y radio derivado de `--radius`. Usa `surface-bold` y `gray-bold` con opacidad para el borde. En hover sobre la casilla editable desmarcada, usa `surface-soft`. Marcada o mixta usa `primary-base`. El foco usa un contorno `gray-bold` de 2 px con separación de 2 px. | Aplica dimensiones a la raíz, por ejemplo `style={{ width: "1.5rem", height: "1.5rem" }}`. La etiqueta o el contenedor del consumidor define el espacio exterior, el área de clic y la tipografía. |
| `CheckboxIndicator` | Ocupa la caja interior, centra los SVG y les da color blanco. Parte de opacidad cero al entrar y vuelve a cero al desmarcar. El cambio de opacidad dura 150 ms con `motion-safe`. | Usa `children` para un glifo propio o aplica clases y estilos al `span`. Ajusta el tamaño del SVG desde su nodo o con un selector de descendientes. Conserva el contraste y el tratamiento de movimiento reducido al sustituir la transición. |

Los tokens se reasignan según el tema mediante [globals.md](../../globals.md). La raíz aplica opacidad reducida y cursor de deshabilitación con `data-disabled`, y cursor normal con `data-readonly`. Las piezas carecen de sombra predeterminada. Si modificas la duración o las propiedades animadas del indicador, comprueba la salida y su desmontaje.

`className` admite strings y funciones de estado en ambas piezas. `clsx` conserva las clases base y la cascada de CSS resuelve las utilidades en conflicto. `style` también acepta una función de estado y se aplica al nodo visible correspondiente. Para estilos sobre el input asociado, usa la referencia que ofrece `inputRef` si necesitas acceder al nodo. Conserva las clases, el estilo, los eventos y la referencia al usar una función de `render`.

## 8. Ejemplos de composición

La [composición habitual](#3-importación-y-anatomía) usa una etiqueta envolvente y `defaultChecked`. En un módulo cliente, puedes controlar y resolver una selección mixta a partir de tu propio estado.

```tsx
"use client";

import { useState } from "react";
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";

export function PermissionsCheckbox() {
  const [selection, setSelection] = useState<boolean | "mixed">("mixed");

  return (
    <label className="flex items-center gap-2.5">
      <Checkbox
        checked={selection === true}
        indeterminate={selection === "mixed"}
        onCheckedChange={setSelection}
      >
        <CheckboxIndicator />
      </Checkbox>
      Seleccionar todos los permisos
    </label>
  );
}
```

Para una etiqueta separada, vincula `htmlFor` al `id` del botón visible. Usa un ID único por instancia.

```tsx
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";

<div className="flex items-center gap-2.5">
  <Checkbox id="archivados" nativeButton render={<button type="button" />}>
    <CheckboxIndicator />
  </Checkbox>
  <label htmlFor="archivados">Incluir elementos archivados</label>
</div>;
```

## 9. Accesibilidad e integración

- Asigna un nombre accesible mediante un `<label>` o los atributos `aria-labelledby` o `aria-label` cuando la composición lo requiera. El indicador es decorativo. Coloca el texto descriptivo fuera de él.
- Tab enfoca la casilla habilitada y Espacio cambia su valor cuando es editable. Enter puede activar el botón de envío predeterminado de un formulario asociado. La variante de solo lectura conserva el foco y comunica `aria-readonly`.
- Para usar un botón nativo con una etiqueta envolvente, usa una función de `render` que devuelva la etiqueta y el botón con las props recibidas. Así Base UI puede colocar el input asociado fuera de la etiqueta. La [guía de Checkbox de Base UI](https://base-ui.com/react/components/checkbox#rendering-as-a-native-button) explica esa composición.
- Conserva `role`, atributos ARIA, eventos y refs al sustituir el nodo visible. Define handlers, refs y props funcionales de estilo en un módulo cliente de App Router.

## 10. Límites y verificación

Exporta `checkbox.tsx`, los iconos `Check` y `Minus` y los archivos que resuelva su import de soporte. Usa Base UI 1.9.0, `clsx`, React 19 y los tokens de Tailwind del sistema. Consulta [estructura](../../structure.md) para ubicar los archivos. La familia expone las dos piezas de Checkbox. Para una selección coordinada, la composición con Checkbox Group es una integración aparte.

Verifica la activación con la etiqueta y Espacio, el foco visible, los tres estados de selección, la diferencia entre deshabilitada y solo lectura y los valores que recibe `FormData`. Comprueba el contraste en ambos temas y el indicador con movimiento reducido. Si el control se usa en un formulario con reinicio, sincroniza el estado controlado con el evento de reinicio del formulario.
