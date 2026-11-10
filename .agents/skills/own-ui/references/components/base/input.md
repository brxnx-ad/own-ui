# Input

## 1. Identificación

Input pertenece a `base/`, envuelve `@base-ui/react/input` y combina sus clases con `clsx`.

## 2. Propósito y casos de uso

Usa Input para capturar una línea de texto, un correo, una contraseña o un término de búsqueda. Puede usarse con una etiqueta HTML o colocarse directamente dentro de Field para asociar ayuda y errores. Si la etiqueta debe elevarse con el foco o cuando hay un valor, usa [FloatingInput](../composed/floating-input.md). Para texto multilínea, usa `FieldControl` con `render={<textarea />}`. Para mostrar sugerencias durante la edición, consulta [Autocomplete](autocomplete.md).

## 3. Importación y anatomía

```tsx
import {
  Input,
  type InputProps,
  type InputState,
  type InputChangeEventDetails,
} from "@/components/own/base/input";
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Input` | `input` | Renderiza el control editable y lo registra en Field si existe una raíz cercana. |

`InputProps` es el contrato de la primitiva, `InputState` describe su estado y `InputChangeEventDetails` tipa el segundo argumento de `onValueChange`.

```tsx
<label>
  Título del informe
  <Input name="title" />
</label>
```

El consumidor aporta la etiqueta, el nombre de envío y las restricciones. El nodo `input` es vacío y carece de piezas internas o ranuras para hijos.

## 4. Variantes y tamaños

Input carece de variantes y tamaños propios. `type` y `size` son atributos HTML. El primero determina el comportamiento nativo. El segundo puede influir en el ancho intrínseco de los tipos compatibles. El ancho visible se ajusta al contenedor con `w-full`. Con los valores base de Tailwind, el control tiene una altura mínima de `2.5rem`.

## 5. Props y callbacks

Base UI proporciona estas opciones y los atributos nativos compatibles. Own-ui aplica las clases base y `data-slot="input"` al control.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Input | `defaultValue` | `string \| number \| readonly string[]` | — | Sí | Establece el valor inicial en modo no controlado. |
| Input | `value` | `string \| number \| readonly string[]` | — | Sí | Fija el valor controlado. Usa `""` como valor vacío si controlas el texto. |
| Input | `onValueChange` | `(value: string, details: InputChangeEventDetails) => void` | — | Sí | Recibe el valor del DOM al editar. Actualiza `value` para aceptar el cambio en modo controlado. |
| Input | `onChange` | Handler de cambio de React para `HTMLInputElement` | — | Sí | Recibe el evento de React si necesitas acceder al control o al evento sintético. |
| Input | `type` | `HTMLInputTypeAttribute` | `"text"` en HTML | Sí | Determina la semántica y las restricciones nativas del control. |
| Input | `id`, `name`, `form` | `string` | ID generado, sin nombre, formulario ancestro | Sí | Identifican el control, su clave de envío y el formulario asociado. `Field.name` tiene precedencia sobre `Input.name`. |
| Input | `disabled`, `readOnly` | `boolean` | `false` | Sí | `disabled` bloquea el foco y el envío. `readOnly` impide editar en tipos compatibles y conserva el foco, la selección y el envío. |
| Input | `required`, `pattern`, `minLength`, `maxLength`, `min`, `max`, `step` | Atributos de `input` | Según HTML | Sí | Definen restricciones nativas según el tipo elegido. |
| Input | `placeholder`, `autoComplete`, `inputMode`, `size` | Atributos de `input` | Según HTML | Sí | Configuran la pista visual, el autocompletado, el teclado sugerido y el ancho intrínseco. |
| Input | `aria-invalid`, `aria-describedby` | Atributos ARIA | Estado y asociaciones de Field o — | Sí | Señalan invalidez y enlazan ayuda o errores mediante IDs. Fuera de Field, el consumidor mantiene las asociaciones manuales. |
| Input | `className` | `string \| ((state: InputState) => string \| undefined)` | — | Sí | Añade clases al nodo, incluidas clases derivadas del estado. |
| Input | `style` | `CSSProperties \| ((state: InputState) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo. |
| Input | `render` | `ReactElement \| ((props, state: InputState) => ReactElement)` | `input` | Sí | Compone otro control compatible. Conserva los atributos, eventos y la ref. |
| Input | `ref` | `Ref<HTMLInputElement>` | — | Sí | Permite enfocar el control y acceder a su API DOM. |

`onValueChange` recibe `details.event` con el evento nativo y `details.reason` con el valor `"none"`. En modo no controlado, `details.cancel()` conserva la edición nativa y omite la validación de ese cambio en Field. En modo controlado, Field registra el valor que el consumidor confirma en `value`. Cambiar esa prop desde fuera del control actualiza el DOM sin ejecutar `onValueChange`.

## 6. Funcionamiento y estados

- Con `defaultValue`, el navegador conserva la edición. Con `value`, React aplica el valor suministrado por el consumidor. Elige un modo al montar el control y mantenlo durante su vida útil.
- Dentro de Field, Input se registra automáticamente. `FieldLabel`, `FieldDescription` y `FieldError` se asocian al mismo control. La raíz decide cuándo validar y transmite su `disabled`. Una raíz deshabilitada mantiene Input deshabilitado aunque reciba `disabled={false}`.
- Fuera de Field, el control conserva su comportamiento HTML. Las restricciones se reflejan en la validez nativa. Para mostrar el borde de error desde un estado propio, sincroniza `aria-invalid` con ese estado y asocia el mensaje mediante `aria-describedby`.

| Atributo en `data-slot="input"` | Estado |
| :--- | :--- |
| `data-disabled` | Deshabilitación propia o heredada de Field. |
| `data-focused`, `data-touched` | Field registra el foco y el contacto con el control. Fuera de Field, usa `:focus` o `:focus-visible` para estilizar el foco. |
| `data-filled`, `data-dirty` | Field registra si el valor contiene texto y si difiere del inicial. |
| `data-valid`, `data-invalid` | Field ha determinado la validez. El estado neutral carece de ambos atributos. El control habilitado también recibe `aria-invalid` al quedar inválido. |

## 7. Estilos admitidos por pieza

| Aspecto | Estilo base y personalización de `Input` |
| :--- | :--- |
| Dimensiones | `w-full min-w-0 min-h-10` con `px-3 py-2`. Define el ancho disponible y la separación exterior en el contenedor. Usa `style={{ minHeight: "3rem" }}` para aumentar la altura de una instancia. |
| Colores y temas | `surface-bold` para el fondo, `gray-base` para el borde y `content-bold` para el texto. El placeholder usa `content-soft`. Los tokens se adaptan a claro y oscuro. |
| Tipografía y geometría | `text-base` en móvil y `sm:text-sm` desde el breakpoint `sm`. El borde usa `rounded-base`. El control carece de iconos y sombras decorativas. |
| Estados | `:focus-visible` muestra un anillo de dos píxeles en `primary-base`. `aria-invalid="true"` cambia borde y anillo a `error-base`. `data-disabled` reduce la opacidad y usa el cursor `not-allowed`. `readOnly` conserva la superficie y el indicador de foco. |
| Animación | Los cambios de foco, invalidez y deshabilitación son inmediatos. Si añades transiciones, conserva la adaptación a movimiento reducido. |

`className` evalúa la función si se proporciona y combina su resultado con `clsx`. Salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada determina qué utilidad prevalece. Base UI aplica `style` estático o funcional y combina clases, estilos, eventos y refs con el elemento que recibe por `render`. Cuando `render` es una función, propaga las props recibidas al control real. Modifica los tokens compartidos solo cuando el ajuste deba afectar a todos sus consumidores. Consulta [globals](../../globals.md).

## 8. Ejemplos de composición

Valor controlado con una acción externa que lo borra y devuelve el foco.

```tsx
"use client";

import { useId, useRef, useState } from "react";
import { Input } from "@/components/own/base/input";

export function SearchDraft() {
  const id = useId();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function clearQuery() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div>
      <label htmlFor={id}>Término de búsqueda</label>
      <Input id={id} ref={inputRef} value={query} onValueChange={setQuery} />
      <button type="button" disabled={!query} onClick={clearQuery}>Borrar término</button>
    </div>
  );
}
```

Validación de correo al salir del control. Coloca Input directamente en la raíz para que Field lo registre una sola vez.

```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import { Input } from "@/components/own/base/input";

export function ContactEmail() {
  return (
    <Field name="email" validationMode="onBlur">
      <FieldLabel>Correo de contacto</FieldLabel>
      <Input type="email" required autoComplete="email" />
      <FieldDescription>Usa la dirección donde recibirás el informe.</FieldDescription>
      <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
      <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
    </Field>
  );
}
```

## 9. Accesibilidad e integración

- Usa una etiqueta visible con `label` o `FieldLabel`. Reserva `placeholder` para una pista breve. Fuera de Field, enlaza la ayuda y los errores con `aria-describedby` y marca `aria-invalid` cuando corresponda.
- Conserva la edición y el foco nativos. Un control `readOnly` sigue en el recorrido de Tab. Un control `disabled` queda fuera. Enter puede activar el envío implícito según el formulario. Mantén el indicador de foco al personalizar el estilo.
- Si usas `render`, conserva el elemento editable, su ID, los atributos ARIA, los eventos y la ref en el nodo real. Los handlers, funciones de estilo y refs que aporta el consumidor viven en un módulo cliente de App Router.
- En un `<form>` nativo, un control habilitado y con nombre puede aportar su valor a `FormData`, incluso si es de solo lectura. Usa [Field](field.md) y [Form](form.md) cuando necesites validar campos registrados al enviar y mostrar errores asociados.

## 10. Límites y verificación

La base verificada usa React 19, Base UI 1.9.0, `clsx` y Tailwind CSS v4 con los tokens de own-ui. La presentación está pensada para entradas de texto de una línea. Para casillas, selectores o editores numéricos con pasos personalizados, usa controles dedicados. Los adornos nativos de otros tipos dependen del navegador. Verifica el modo de edición, la semántica de `type`, los datos enviados, el foco visible, la asociación de los errores y el comportamiento con el ancho disponible en ambos temas.
