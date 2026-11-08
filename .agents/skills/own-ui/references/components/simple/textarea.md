# Textarea

## 1. Identificación

Textarea es un control HTML nativo con clases compuestas por `clsx` y hooks de React para el contador opcional.

## 2. Propósito y casos de uso

Recoge texto de varias líneas para comentarios, notas o descripciones. Puede enviar su valor en un formulario nativo, mostrar longitud y crecer con el contenido. Usa [Input](../base/input.md) para texto de una sola línea.

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

La familia carece de variante visual y prop `size`. El modo habitual arranca con `rows=3` y permite ajuste vertical. `resize="none"` quita el tirador manual. `autoGrow` usa dos filas como mínimo por defecto y desactiva el ajuste manual. `showCount` es independiente y añade una fila al pie del control.

## 5. Props y callbacks

`showCount`, `resize` y `autoGrow` son propias. El resto extiende las props nativas de React para `textarea`.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Textarea` | `showCount` | `boolean` | `false` | Sí | Muestra el contador en la esquina inferior derecha. |
| `Textarea` | `resize` | `"vertical" \| "none"` | `vertical` | Sí | Configura el ajuste manual. autoGrow prevalece y desactiva el tirador. |
| `Textarea` | `autoGrow` | `boolean` | `false` | Sí | Ajusta la altura al contenido mediante field-sizing: content. |
| `Textarea` | `rows` | `number` | `3` o `2` con autoGrow | Sí | Filas iniciales. Con autoGrow, define el mínimo visual. La fórmula usa 2 si el valor no es un entero positivo. |
| `Textarea` | `value`, `defaultValue` | `string \| number \| readonly string[]` | — | Sí | Valor controlado o valor inicial no controlado. Para texto, usa string y elige un solo modo. |
| `Textarea` | `onChange` | `ChangeEventHandler<HTMLTextAreaElement>` | — | Sí | Recibe el evento React cuando el usuario edita. Lee event.currentTarget.value y actualiza value en modo controlado. |
| `Textarea` | `maxLength`, `minLength` | `number` | — | Sí | Restricciones nativas. Un maxLength no negativo también aparece en el contador. |
| `Textarea` | `name`, `form`, `id`, `aria-describedby` | `string` | — | Sí | Vinculan envío, formulario, etiqueta y descripciones. showCount agrega su ID a aria-describedby. |
| `Textarea` | `required`, `disabled`, `readOnly` | `boolean` | Comportamiento nativo | Sí | Controlan obligatoriedad, deshabilitación y solo lectura. |
| `Textarea` | `aria-invalid` | `boolean \| "true" \| "false" \| "grammar" \| "spelling"` | — | Sí | Comunica invalidez. El estilo de error se aplica con true o con :user-invalid. |
| `Textarea` | Props HTML y `ref` | `ComponentPropsWithRef<"textarea">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Las clases, los estilos y ref se aplican al control, también con showCount. |

Los eventos se reenvían al `textarea`. La familia carece de callbacks propios. El contador no modifica el valor ni invoca `onChange` al sincronizarse.

## 6. Funcionamiento y estados

- En modo controlado, el contador deriva de `value`. En modo no controlado parte de `defaultValue`, lee el valor nativo en `input` y vuelve a leerlo tras el reinicio del formulario asociado. Cuenta unidades UTF-16, como `maxLength`, y normaliza los saltos de línea a LF al contar valores de props.
- El control siempre expone `data-slot="textarea"`. Con `showCount`, el marco `textarea-frame` y el contador `textarea-count` se montan alrededor del control. La cifra se muestra sola o como `actual / máximo`. Sin esa opción, se renderiza el `textarea` directo.
- Los estados nativos incluyen `:disabled`, `:focus-visible` y `:user-invalid`. `aria-invalid="true"` también activa el estilo de error. `readOnly` se pasa al control nativo.

## 7. Estilos admitidos por pieza

- **Control.** `block w-full min-w-0`, `px-3 py-2`, `rounded-base`, texto `gray-bold`, placeholder `gray-bold/80` y tipografía `text-base` con `sm:text-sm`. El mínimo normal es `min-h-16`. Con `autoGrow`, el mínimo usa `--own-ui-textarea-rows` multiplicado por `1lh`, más padding vertical y borde. Puedes limitar el crecimiento con `maxHeight` en `style` o una utilidad `max-h-*`. Una altura explícita puede fijar la altura aunque `autoGrow` esté activo.
- **Superficie y foco.** Sin contador, el control usa `surface-bold`, borde `gray-bold/70` y contorno exterior `gray-bold` en `:focus-visible`. Con contador, el marco aporta la superficie, el borde y el contorno mediante `:has()` sobre el control directo. El campo queda transparente. El borde de error y su contorno usan `error-bold`. El estado deshabilitado aplica `opacity-50` al control o al marco y cursor `not-allowed` al campo.
- **Contador.** Es una fila aparte, alineada a la derecha, con `caption`, `tabular-nums`, `px-3`, `pb-2` y `gray-bold/80`. Ajusta los nodos internos por sus slots desde un contenedor. La familia carece de sombras, transiciones y prop `render`.

`clsx` concatena `className` de tipo `string` con las clases del control. `style` admite un objeto CSS y, en `autoGrow`, se aplica después de la variable de filas. Los eventos y `ref` conservan el nodo `textarea`. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

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
        autoGrow
        className="max-h-48"
      />
    </div>
  );
}
```

## 9. Accesibilidad e integración

Asocia una etiqueta mediante `htmlFor` e `id` o envolviendo el control. Usa `aria-describedby` para ayuda y errores, y `aria-invalid` cuando corresponda. El contador lleva `aria-hidden="true"` y el control lo referencia como descripción sin convertirlo en región viva. Conserva el foco visible y los atributos de formulario. Para una altura fija, usa `resize="none"` con `rows` y deja `autoGrow` desactivado.

## 10. Límites y verificación

Exporta `textarea.tsx` con su directiva `"use client"`. En navegadores sin `field-sizing`, la altura conserva las filas iniciales y el contenido desborda dentro del control. Cambiar `showCount` tras el montaje cambia la estructura y remonta el control. Para alternarlo, conserva el valor desde el consumidor si necesitas mantener el texto. Comprueba escritura, borrado, pegado, reinicio, foco, ancho móvil y crecimiento hasta el límite elegido.
