# FloatingInput

## 1. Identificación

FloatingInput es un componente dependiente que compone `Input`, `Field` y `FieldLabel` de own-ui. Usa `clsx` para combinar las clases.

## 2. Propósito y casos de uso

Usa FloatingInput para editar texto en una línea cuando la etiqueta deba compartir el espacio del control. En reposo, la etiqueta ocupa la posición habitual de un placeholder. Al enfocar el campo o cuando tiene un valor, sube y permanece visible. Si necesitas una etiqueta fija con una pista distinta dentro del control, compón [Field](field.md) con [Input](input.md).

## 3. Importación y anatomía

```tsx
import {
  FloatingInput,
  type FloatingInputProps,
  type FloatingInputVariant,
  type FloatingInputType,
  type FloatingInputFieldProps,
} from "@/components/own/dependant/floating-input";
```

| Pieza | Nodo | Responsabilidad |
| :--- | :--- | :--- |
| Raíz | `div` de `Field` | Registra el control, gestiona la validación y contiene los hijos que aporta el consumidor. |
| Contenedor del control | `div` | Alinea el control con su etiqueta y el contorno opcional. |
| Control | `input` de `Input` | Conserva el valor, la edición y las restricciones nativas. |
| Etiqueta | `label` de `FieldLabel` | Nombra el control y cambia de posición según su foco y valor. |
| Contorno de `outline` | `fieldset` decorativo con `legend` | Abre un hueco en el borde superior del ancho de la etiqueta flotante. |

```tsx
<FloatingInput label="Título del informe" name="title" />
```

`FloatingInput` es la única exportación en ejecución. Las demás exportaciones tipan el contrato, la variante, el tipo de entrada y las opciones de la raíz. El consumidor aporta el texto de la etiqueta y puede añadir `FieldDescription` o `FieldError` como hijos. FloatingInput ya crea el contexto de Field y el control asociado.

## 4. Variantes y tamaños

| Variante | Etiqueta elevada | Geometría base |
| :--- | :--- | :--- |
| `inset` (predeterminada) | Dentro del campo, en una línea sobre el valor. | `min-h-14` (`3.5rem`) y `pt-6` para reservar la primera línea. El control puede crecer según la tipografía. |
| `outline` | Centrada sobre la línea superior del contorno, que se abre alrededor del texto. | `min-h-12` (`3rem`) y `pt-2` en el contenedor para alojar la etiqueta elevada. |

Ambas variantes ocupan el ancho disponible y usan `size` con su significado nativo. La geometría no depende de una escala de tamaños propia.

## 5. Props y callbacks

FloatingInput añade `label`, `variant`, `fieldProps` y `children`. Reenvía el resto de las props compatibles a Input, con `name` y `disabled` aplicados desde la raíz de Field. `placeholder` y `render` están reservadas por la composición.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FloatingInput | `label` | `string` | — | No | Texto visible y nombre accesible. Usa un texto breve y significativo. |
| FloatingInput | `variant` | `FloatingInputVariant` | `"inset"` | Sí | Elige `"inset"` u `"outline"`. |
| Input | `type` | `FloatingInputType` | `"text"` | Sí | Acepta `text`, `search`, `email`, `password`, `tel` y `url`. |
| Input | `value`, `defaultValue` | `InputProps['value']`, `InputProps['defaultValue']` | — | Sí | Fijan el valor controlado o el inicial. |
| Input | `onValueChange` | `(value: string, details: InputChangeEventDetails) => void` | — | Sí | Entrega el valor editado. Actualiza `value` para aceptar cambios en modo controlado. |
| Input | `id`, `ref` | `string`, `Ref<HTMLInputElement>` | ID generado, sin ref | Sí | Identifica el control y da acceso a su nodo nativo. |
| Input | `className`, `style` | Según `InputProps`, con opciones funcionales | — | Sí | Personalizan el nodo `input`. Las funciones reciben `InputState`. |
| Input | `required`, `readOnly`, `autoComplete`, `inputMode`, `onChange` | Según `InputProps` | Según HTML o — | Sí | Configuran la entrada nativa y sus eventos. |
| Raíz | `name`, `disabled` | `string`, `boolean` | Sin nombre, `false` | Sí | Identifican el valor de envío y propagan la deshabilitación al control y la etiqueta. |
| Raíz | `fieldProps` | `FloatingInputFieldProps` | — | Sí | Admite las props de Field salvo `children`, `name`, `disabled` y `render`. Incluye `validationMode`, `validate`, `validationDebounceTime`, `invalid`, `actionsRef`, `className` y `style`. |
| Raíz | `children` | `ReactNode` | — | Sí | Añade contenido debajo del control, dentro del mismo contexto de Field. |

`onValueChange` conserva la firma de Input. `details.event` contiene el evento nativo y `details.reason` es `"none"`. En modo no controlado, `details.cancel()` omite la validación de ese cambio y conserva la edición nativa. En modo controlado, Field registra el valor confirmado en `value`. Consulta los tipos y condiciones de [Input](input.md) y [Field](field.md).

## 6. Funcionamiento y estados

- Vacío y sin foco, el texto de la etiqueta queda centrado en el control. El foco lo eleva incluso si el valor sigue vacío. Cualquier valor presente mantiene elevada la etiqueta tras perder el foco, incluidos los valores iniciales y los que llegan mediante `value`. Cuando el DOM vuelve a quedar vacío y sin foco, la etiqueta desciende.
- La posición se calcula con `:focus` y `:placeholder-shown` sobre el control nativo. Se reserva `placeholder=" "` como señal de campo vacío. La etiqueta visible y el nombre accesible provienen de `FieldLabel`.
- Field asocia las piezas de ayuda y error y expone los estados de la última validación. Para un error que gestiones externamente, usa `fieldProps.invalid` y renderiza `FieldError` con `match={true}` y el mensaje mientras exista el error. En formularios con `Form`, los errores externos también pueden asociarse por `name`.
- Un campo de solo lectura conserva el foco y la selección nativos. En un campo deshabilitado, la etiqueta sigue la posición que corresponda a su valor y el control se omite del recorrido de Tab.

| Nodo | Atributos de selección |
| :--- | :--- |
| Raíz | `data-slot="field"`, `data-floating-input`, `data-variant="inset"` o `"outline"` y los atributos de Field. |
| Contenedor | `data-slot="floating-input-control"`. |
| Control | `data-slot="input"`, `data-disabled`, `data-filled`, `data-focused`, `data-touched`, `data-dirty`, `data-valid` y `data-invalid` según el estado. Un control habilitado inválido recibe `aria-invalid="true"`. |
| Etiqueta | `data-slot="field-label"` y los estados heredados de Field. |
| Contorno de `outline` | `data-slot="floating-input-border"`, con `aria-hidden="true"`. |

## 7. Estilos admitidos por pieza

| Pieza | Estilos base y ajustes locales |
| :--- | :--- |
| Raíz | Usa la columna y el `--field-gap` de Field. Define el ancho y la separación exterior en el contenedor consumidor. `fieldProps.className` y `fieldProps.style` actúan sobre esta raíz. |
| Control | Superficie `surface-bold`, texto `gray-bold`, radio `rounded-base` y tipografía de Input. En `inset`, el borde y el anillo siguen los tokens de Input. En `outline`, el contorno decorativo dibuja el borde y el foco visible. |
| Etiqueta | Tiene fondo transparente y usa `gray-bold` al 75 % para tener menos énfasis que el valor. Si el control tiene `aria-invalid="true"`, usa `error-bold` al 75 %. Al deshabilitarse, adopta el color atenuado de Field. El texto elevado usa el tamaño `xs`, con una línea de `1rem`. En reposo usa el tamaño `base` en móvil y `sm` a partir del breakpoint `sm`. Se trunca si el ancho disponible es insuficiente. |
| Contorno de `outline` | Radio `rounded-base` y borde `gray-base`. El foco visible engrosa el borde de uno a dos píxeles y usa `primary-base`. La invalidez aplica `error-base`, también al enfocar. Un `legend` mide el hueco con una copia invisible del texto. El recorte queda en el tramo recto del borde y termina con extremos redondeados. |

Los colores se adaptan al tema mediante [globals](../globals.md). `className` se combina con `clsx` y `style` se aplica al input. Ambas props aceptan funciones de estado. `inset` fija su reserva superior con `pt-6!`. `outline` fija el borde del input como transparente y desactiva su anillo para que el contorno decorativo dibuje ambos. Para ajustar el color o grosor de todo el contorno, define `--floating-input-border-color` o `--floating-input-border-width` en `[data-slot="floating-input-border"]`. Mantén alineadas la etiqueta y su copia invisible si cambias su tipografía o posición.

El bloque de FloatingInput en `@layer components` de `globals.css` anima la posición durante `180ms` y suaviza el cambio de tamaño y altura de línea. En `outline`, la etiqueta y el borde empiezan a moverse juntos. El hueco se abre de forma simétrica desde su centro en `125ms` y se cierra hacia el centro en `180ms`. Con movimiento reducido, la etiqueta y el hueco cambian de inmediato.

## 8. Ejemplos de composición

Etiqueta sobre el borde con validación al salir del control.

```tsx
import { FloatingInput } from "@/components/own/dependant/floating-input";
import { FieldDescription, FieldError } from "@/components/own/independant/field";

export function ContactEmail() {
  return (
    <FloatingInput
      variant="outline"
      label="Correo de contacto"
      type="email"
      name="email"
      autoComplete="email"
      required
      fieldProps={{ validationMode: "onBlur" }}
    >
      <FieldDescription>Usa tu correo de trabajo.</FieldDescription>
      <FieldError match="typeMismatch">Ingresa un correo con un formato válido.</FieldError>
      <FieldError match="valueMissing">Ingresa un correo de contacto.</FieldError>
    </FloatingInput>
  );
}
```

Etiqueta interior con valor controlado.

```tsx
"use client";

import { useState } from "react";
import { FloatingInput } from "@/components/own/dependant/floating-input";

export function ReportTitle() {
  const [title, setTitle] = useState("Resumen semanal");

  return (
    <FloatingInput label="Título del informe" name="title" value={title} onValueChange={setTitle} />
  );
}
```

## 9. Accesibilidad e integración

- Proporciona una etiqueta visible mediante `label`. `FieldLabel` enlaza el elemento `label` con el control para que pulsar su texto lo enfoque. Evita sustituir ese nombre con otra etiqueta ARIA salvo que el contexto lo requiera.
- Usa una raíz de FloatingInput por control. Añade las descripciones y los errores como hijos directos para que Field pueda asociarlos. Las opciones de validación se pasan mediante `fieldProps`.
- Conserva la semántica y el foco del input al personalizarlo. El contorno de `outline` es decorativo y su `legend` está oculto para tecnologías de asistencia. La etiqueta real permanece visible y asociada en ambas posiciones.
- En App Router, los handlers, las funciones de estilo y las refs que aporta el consumidor van en un módulo cliente. Conserva `name` para enviar el valor desde un formulario nativo o desde [Form](form.md).

## 10. Límites y verificación

La familia está diseñada para tipos de texto de una sola línea que admiten `:placeholder-shown`. Exporta `floating-input.tsx`, `input.tsx`, `field.tsx`, los tokens de own-ui con Tailwind CSS v4 y el bloque de FloatingInput en `@layer components` de `globals.css`. Ese bloque define las posiciones, el contraste de la etiqueta y las transiciones. Si usas `FieldError`, exporta también su bloque de estilos para conservar la transición de altura y opacidad. Comprueba las dos posiciones con el campo vacío, enfocado y lleno, además del foco visible, la validación, los dos temas, el ancho móvil y el movimiento reducido. Para el comportamiento nativo del recorte, consulta [HTML Standard](https://html.spec.whatwg.org/multipage/rendering.html#the-fieldset-and-legend-elements).
