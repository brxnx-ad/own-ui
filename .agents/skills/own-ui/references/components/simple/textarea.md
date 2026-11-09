# Textarea

## 1. Identificación

Textarea es un control HTML nativo con clases compuestas por `clsx` y hooks de React para el contador opcional y la validación de longitud.

## 2. Propósito y casos de uso

Recoge texto de varias líneas para comentarios, notas o descripciones. Se ajusta al contenido, admite un contador y se integra en formularios nativos. Usa [Input](../base/input.md) para texto de una sola línea.

## 3. Importación y anatomía

```tsx
import { Textarea } from "@/components/own/simple/textarea";

<>
  <label htmlFor="notes">Notas</label>
  <Textarea id="notes" name="notes" showCount maxLength={120} />
</>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Textarea` | `textarea` | Control que recibe atributos HTML, valor, eventos y ref. |
| Marco interno | `span` | Aparece con showCount y contiene el control y el contador. |
| Contador interno | `span` | Muestra la longitud y el límite cuando existe. |

El módulo exporta `TextareaProps`. El marco y el contador son nodos internos. El consumidor aporta la etiqueta y los mensajes de ayuda o error.

## 4. Variantes y tamaños

La altura se ajusta automáticamente al escribir o borrar. Un campo vacío parte de una línea por defecto. `rows` define el mínimo visible y `maxRows` limita el crecimiento por líneas visuales, incluidas las que se forman al ajustar el texto al ancho disponible. Al llegar al tope, el texto restante se consulta con desplazamiento interno. El tirador permanece deshabilitado y `showCount` añade una fila separada fuera de ese cálculo. La familia carece de variantes visuales y de prop `size`.

## 5. Props y callbacks

`showCount` y `maxRows` son props propias. `rows` y `maxLength` se heredan del elemento nativo y el componente amplía su comportamiento.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Textarea` | `showCount` | `boolean` | `false` | Sí | Muestra el contador en la esquina inferior derecha. |
| `Textarea` | `rows` | `number` | `1` | Sí | Mínimo de líneas visibles. Si el valor no es un entero positivo se usa `1`. Si supera `maxRows`, se reduce al máximo. |
| `Textarea` | `maxRows` | `number` | Sin límite de líneas | Sí | Tope de líneas visibles antes del desplazamiento interno. Se aplica cuando recibe un entero positivo. Usa el mismo valor que `rows` para fijar la altura. |
| `Textarea` | `value`, `defaultValue` | `string \| number \| readonly string[]` | — | Sí | Valor controlado o valor inicial no controlado. Para texto, usa string y elige un solo modo. |
| `Textarea` | `onChange` | `ChangeEventHandler<HTMLTextAreaElement>` | — | Sí | Recibe el evento de edición con el texto ya truncado si hubo exceso. Lee `event.currentTarget.value` para actualizar `value` en modo controlado. |
| `Textarea` | `onInput` | `InputEventHandler<HTMLTextAreaElement>` | — | Sí | Se ejecuta después de truncar el valor cuando corresponde y actualizar la validez del campo. |
| `Textarea` | `maxLength` | `number` | Sin límite de caracteres | Sí | Límite en unidades UTF-16. Acepta enteros no negativos, incluido `0`. Se aplica a la edición nativa y a valores recibidos que excedan el límite. |
| `Textarea` | `minLength` | `number` | — | Sí | Restricción nativa de longitud mínima. |
| `Textarea` | `name`, `form`, `id`, `aria-describedby` | `string` | — | Sí | Vinculan envío, formulario, etiqueta y descripciones. showCount agrega su ID a aria-describedby. |
| `Textarea` | `required`, `disabled`, `readOnly` | `boolean` | Comportamiento nativo | Sí | Controlan obligatoriedad, deshabilitación y solo lectura. |
| `Textarea` | `aria-invalid` | `boolean \| "true" \| "false" \| "grammar" \| "spelling"` | — | Sí | Comunica invalidez. El estilo de error se aplica con true o con :user-invalid. |
| `Textarea` | Props HTML y `ref` | `ComponentPropsWithRef<"textarea">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Las clases, los estilos y ref se aplican al control, también con showCount. |

## 6. Funcionamiento y estados

- En modo controlado, el contador deriva del `value` que muestra el campo. En modo no controlado parte de `defaultValue`, se actualiza al editar y vuelve a leer el campo tras el reinicio del formulario asociado. Tanto el contador como el límite usan unidades UTF-16. Los saltos de línea de los valores suministrados por props se normalizan a LF.
- El atributo nativo `maxlength` limita la edición ordinaria. Si un valor de `value`, de `defaultValue` o de un evento de edición llega por encima del límite, el campo conserva el prefijo permitido. Si el corte divide un par sustituto UTF-16, se descarta el par completo. El contador refleja la longitud del texto conservado.
- El exceso activa `data-length-overflow` y establece un error con `setCustomValidity`. El formulario bloquea el envío mientras el campo participe en su validación y el error siga activo. Una edición dentro del límite limpia el error de edición. Un `value` controlado que aún excede el límite requiere que el consumidor actualice esa prop. Al reiniciar el formulario, se vuelve a evaluar el valor inicial.
- El control siempre expone `data-slot="textarea"`. Con `showCount`, el marco `textarea-frame` y el contador `textarea-count` se montan alrededor del control. La cifra se muestra sola o como `actual / máximo`. Sin esa opción, se renderiza el `textarea` directo.
- Los estados nativos incluyen `:disabled`, `:focus-visible` y `:user-invalid`. `aria-invalid="true"` también activa el estilo de error. `readOnly` se pasa al control nativo.

## 7. Estilos admitidos por pieza

- **Control.** `block w-full min-w-0`, `px-3 py-2`, `rounded-base`, texto `gray-bold`, placeholder `gray-bold/80` y tipografía `text-base` con `sm:text-sm`. El ajuste usa `field-sizing: content`. Los límites de altura multiplican las líneas por `1lh` y suman el padding vertical y, cuando pertenece al control, el borde. `overflow-y-auto` permite desplazarse dentro del campo.
- **Superficie y foco.** Sin contador, el control usa `surface-bold`, borde `gray-bold/70` y contorno exterior `gray-bold` en `:focus-visible`. Con contador, el marco aporta la superficie, el borde y el contorno mediante `:has()` sobre el control directo. El campo queda transparente. Los estados `aria-invalid="true"`, `:user-invalid` y `data-length-overflow` aplican el borde y contorno de error con `error-bold`. El estado deshabilitado aplica `opacity-50` al control o al marco y cursor `not-allowed` al campo.
- **Contador.** Es una fila aparte, alineada a la derecha, con `caption`, `tabular-nums`, `px-3`, `pb-2` y `gray-bold/80`. Ajusta los nodos internos por sus slots desde un contenedor. La familia carece de sombras, transiciones y prop `render`.

`clsx` concatena `className` de tipo `string` con las clases del control. El componente aplica `resize: none` y la altura mínima después de `style`. Un `maxRows` válido también prevalece sobre `style.maxHeight`. Con `maxRows` omitido, `style.maxHeight` permite definir un tope en unidades CSS. Los eventos y `ref` conservan el nodo `textarea`. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
"use client";

import { useState } from "react";
import { Textarea } from "@/components/own/simple/textarea";

export function CommentField() {
  const [value, setValue] = useState("");
  return (
    <div>
      <label htmlFor="comment">Comentario</label>
      <p id="comment-help">Escribe hasta 120 caracteres.</p>
      <Textarea
        id="comment"
        name="comment"
        aria-describedby="comment-help"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        showCount
        maxLength={120}
        rows={2}
        maxRows={5}
      />
    </div>
  );
}
```

## 9. Accesibilidad e integración

Asocia una etiqueta mediante `htmlFor` e `id` o envolviendo el control. Usa `aria-describedby` para vincular mensajes de ayuda y error y `aria-invalid` para comunicar errores del consumidor. El contador lleva `aria-hidden="true"` y el control lo referencia como descripción sin convertirlo en región viva. Conserva el foco visible y los atributos de formulario.

## 10. Límites y verificación

Exporta `textarea.tsx` con su directiva `"use client"`. En navegadores sin `field-sizing`, el campo conserva la altura inicial y el contenido adicional se consulta con desplazamiento interno. Cambiar `showCount` tras el montaje cambia la estructura y remonta el control. Para conservar el texto al alternarlo, gestiona `value` desde el consumidor.

Para cargar texto desde código, actualiza `value` en modo controlado. Una escritura directa en `ref.current.value` requiere un evento `input` para activar el truncamiento y la validación.

Comprueba el crecimiento y la reducción de altura al escribir y borrar, el desplazamiento al alcanzar `maxRows` y la recuperación del estado válido tras editar un valor que excedió `maxLength`. Verifica también pegado, reinicio, foco y ancho móvil.
