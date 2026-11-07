# OTP Field

## 1. Identificación

OTP Field envuelve `Root`, `Input` y `Separator` de `@base-ui/react/otp-field` y combina clases con `clsx`. [API de Base UI](https://base-ui.com/react/components/otp-field)

## 2. Propósito y casos de uso

Usa OTP Field para introducir códigos de verificación, recuperación o acceso de longitud conocida. Cada posición tiene su propia casilla y todas comparten un valor de texto, de modo que se conservan los ceros iniciales. El usuario puede escribir carácter por carácter, pegar un código o usar el autocompletado que ofrezca su navegador.

Usa [Input](input.md) cuando convenga editar todo el texto en un único control o su longitud sea variable. La aplicación verifica el código con su propio flujo de autenticación.

## 3. Importación y anatomía

Resuelve la ruta y el alias en el consumidor según la [referencia de estructura](../structure.md).

```tsx
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/components/own/independant/otp-field";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `OTPField` | `div[role="group"]` y un `input[type="text"]` visualmente oculto como hermano | `otp-field` en el `div` | Coordina el valor, el foco y la validación. El input oculto lleva el código completo al formulario. |
| `OTPFieldInput` | `input[type="text"]` o `input[type="password"]` con `mask` | `otp-field-input` | Representa una posición y recibe los eventos de edición. |
| `OTPFieldSeparator` | `div[role="separator"]` | `otp-field-separator` | Separa visualmente las casillas. Su orientación se comunica con `aria-orientation`. |

Se exportan `OTPFieldProps`, `OTPFieldState`, `OTPFieldValidationType`, `OTPFieldChangeEventDetails`, `OTPFieldInvalidEventDetails`, `OTPFieldCompleteEventDetails`, `OTPFieldInputProps`, `OTPFieldInputState`, `OTPFieldSeparatorProps` y `OTPFieldSeparatorState`.

El consumidor aporta la etiqueta y monta exactamente `length` casillas dentro de la raíz. Puede agruparlas con contenedores propios o separarlas con `OTPFieldSeparator`. El separador no ocupa una posición del código.

```tsx
<label htmlFor="access-code">Código de verificación</label>
<OTPField id="access-code" name="code" length={4}>
  <OTPFieldInput />
  <OTPFieldInput aria-label="Carácter 2 de 4" />
  <OTPFieldInput aria-label="Carácter 3 de 4" />
  <OTPFieldInput aria-label="Carácter 4 de 4" />
</OTPField>
```

## 4. Variantes y tamaños

La familia carece de variantes y tamaños propios. `validationType` define qué caracteres acepta y `mask` cambia la presentación del texto. Cada casilla mide `1.75rem × 2.5rem` y pasa a `2.75rem × 2.75rem` desde el breakpoint `sm`. El tamaño se ajusta con CSS. `orientation` solo pertenece al separador y modifica su geometría.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| OTPField | `length` | `number` | — | No | Entero positivo que debe coincidir con la cantidad de casillas renderizadas. |
| OTPField | `value`, `defaultValue` | `string` | —, `""` | Sí | Código controlado o valor inicial no controlado. |
| OTPField | `validationType` | `OTPFieldValidationType` | `"numeric"` | Sí | `"numeric"` acepta `0–9`, `"alpha"` acepta letras ASCII y `"alphanumeric"` combina ambos conjuntos. `"none"` omite el filtro y el patrón integrados. |
| OTPField | `normalizeValue` | `(value: string) => string` | — | Sí | Transforma el texto ya filtrado. Debe ser idempotente porque la primitiva puede aplicarla varias veces. |
| OTPField | `onValueChange` | `(value: string, details: OTPFieldChangeEventDetails) => void` | — | Sí | Recibe el nuevo valor normalizado. `details.cancel()` cancela la actualización. |
| OTPField | `onValueInvalid` | `(value: string, details: OTPFieldInvalidEventDetails) => void` | — | Sí | Recibe el texto intentado cuando la edición o el pegado descarta caracteres por filtro, normalización o exceso de longitud. |
| OTPField | `onValueComplete` | `(value: string, details: OTPFieldCompleteEventDetails) => void` | — | Sí | Recibe el código al completarse por entrada o al pegar un código completo, incluso si coincide con el valor actual. |
| OTPField | `autoSubmit` | `boolean` | `false` | Sí | Solicita el envío del formulario asociado mediante `requestSubmit()` después de `onValueComplete`. |
| OTPField | `mask` | `boolean` | `false` | Sí | Muestra cada casilla como `type="password"`. El valor compartido y el dato de formulario siguen siendo cadenas. |
| OTPField | `required`, `disabled`, `readOnly` | `boolean` | `false` | Sí | Exige el código, deshabilita la edición y el foco o permite consultar sin editar, respectivamente. Field puede deshabilitar toda la familia. |
| OTPField | `id` | `string` | ID generado | Sí | ID de la primera casilla. Las siguientes reciben `{id}-2`, `{id}-3` y así sucesivamente. |
| OTPField | `name`, `form` | `string` | — | Sí | Nombra el código enviado e identifica, si corresponde, un formulario externo por su ID. El nombre de Field tiene precedencia. |
| OTPField | `autoComplete`, `inputMode` | Atributos HTML de input | `"one-time-code"`, según `validationType` | Sí | Configura el autocompletado de la primera casilla y del input oculto, y el teclado sugerido para todos los inputs. |
| OTPField | `aria-labelledby`, `aria-describedby` | `string` | Según la etiqueta y Field | Sí | Asocia el nombre y el texto de ayuda del grupo. La descripción se combina con las descripciones de Field. |
| OTPFieldInput | `aria-label` | `string` | — | Sí | Identifica la posición de las casillas posteriores a la primera. Nombra la primera con una etiqueta asociada. |
| OTPFieldInput | `placeholder`, `type` | Atributos HTML de input | —, según `mask` | Sí | Añade una pista o personaliza el tipo de esa casilla. La pista se muestra si la casilla está vacía y sin foco. |
| OTPFieldSeparator | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Define el eje de la línea y la orientación accesible. |
| OTPFieldSeparator | `aria-hidden` | `boolean` | — | Sí | Oculta el separador del árbol de accesibilidad si su función es decorativa. |
| Todas | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Añade clases o estilos al nodo de cada pieza. |
| Todas | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone, accede o añade atributos al nodo. La ref de la raíz apunta al grupo y la de la casilla a su input visible. |

Los slots y los estilos son de own-ui. Las props de comportamiento se heredan de Base UI. Configura valor, restricciones, nombre y autocompletado en la raíz para mantener sincronizadas las casillas y el campo de formulario.

`OTPFieldChangeEventDetails.reason` admite `input-change` para entrada o autocompletado, `input-clear` para borrado mediante un evento de entrada, `input-paste` para pegado y `keyboard` para edición por teclado. Los eventos de texto rechazado y de código completo admiten `input-change` e `input-paste`. Ambos son informativos y carecen de `cancel()`.

## 6. Funcionamiento y estados

- En modo controlado, pasa una cadena como `value` y actualízala desde `onValueChange`. En modo no controlado, `defaultValue` inicia el código. Usa `""` para vaciar un campo controlado.
- Base UI elimina el espacio en blanco, filtra por `validationType`, ejecuta `normalizeValue`, vuelve a filtrar y limita a `length`. Aplica ese proceso también a los valores iniciales y controlados.
- La escritura y el pegado rellenan posiciones consecutivas desde la casilla activa. El foco avanza hasta la siguiente posición disponible. Un borrado intermedio desplaza los caracteres restantes para que el valor permanezca contiguo.
- Al aceptar un cambio que completa el valor, `onValueComplete` se ejecuta tras aplicar el valor nuevo. Pegar el mismo código ya completo vuelve a ejecutar `onValueComplete` sin ejecutar `onValueChange`. En ambos casos `autoSubmit` solicita el envío si está habilitado.
- La raíz y las casillas exponen `data-complete`, `data-filled`, `data-focused`, `data-required`, `data-readonly` y `data-disabled` según el estado. `data-filled` corresponde al código en la raíz y al carácter en cada casilla. `data-focused` indica que alguna casilla tiene foco. Field aporta `data-valid`, `data-invalid`, `data-dirty` y `data-touched`. Base UI 1.9 usa `data-invalid` para la invalidez nativa y también emite `aria-invalid` en las casillas habilitadas con errores externos de Form o `Field invalid`.
- El separador expone `data-orientation` y mantiene su propio estado de orientación. El consumidor decide qué piezas montar. Con `length` válido, la primitiva monta el control de formulario junto al grupo desde el render inicial.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| OTPField | Fila flexible ajustada al contenido y limitada al ancho del contenedor. Permite saltos de línea y usa `gap-1`, con `gap-2` desde `sm`. Ajusta el ancho y la distribución en la raíz o en contenedores propios. La separación respecto del entorno pertenece al consumidor. |
| OTPFieldInput | Casilla de ancho fijo con radio `rounded-base`, fondo `surface-bold` y borde `gray-base`. El carácter centrado usa `text-base font-medium tabular-nums` y `gray-bold`. `data-filled` refuerza el borde si la casilla está llena y sin error. `:focus-visible` dibuja un anillo `primary-base`. `data-invalid` o `aria-invalid="true"` cambian el borde y el anillo a `error-base`. `:disabled` reduce la opacidad al 50 %. `:focus::placeholder` oculta la pista. |
| OTPFieldSeparator | Línea redondeada con `gray-bold/45`. En horizontal mide 1.5 unidades de espaciado de ancho por 0.5 de alto y pasa a 2 de ancho desde `sm`. En vertical mide 0.5 de ancho por 4 de alto. Ajusta la línea mediante su slot o sus clases de orientación. |

Las piezas usan los tokens claro y oscuro de [globals.css](../globals.md). Los cambios visuales de estado son inmediatos. Si añades transiciones, limítalas al movimiento permitido y conserva los indicadores de foco y error.

`className` admite una cadena o una función del estado. La implementación combina su resultado con las clases base mediante `clsx`, sin resolver utilidades en conflicto. `style` admite un objeto o una función del estado y actúa en el nodo correspondiente. Por ejemplo, `<OTPFieldInput style={{ width: "2.5rem" }} />` modifica una casilla. El callback de clases de una casilla también recibe `index`, `value` y `filled`. Con `render` puedes componer el nodo siguiendo el contrato de Base UI.

## 8. Ejemplos de composición

Código alfanumérico controlado, con letras en mayúsculas y un separador decorativo entre dos grupos. El estado y el normalizador se definen en una frontera cliente.

```tsx
"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/independant/field";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@/components/own/independant/otp-field";

export function RecoveryCode() {
  const [code, setCode] = useState("");

  return (
    <Field name="recoveryCode" validationMode="onBlur">
      <FieldLabel>Código de recuperación</FieldLabel>
      <OTPField
        length={4}
        value={code}
        onValueChange={setCode}
        validationType="alphanumeric"
        normalizeValue={(value) => value.toUpperCase()}
        required
      >
        <OTPFieldInput />
        <OTPFieldInput aria-label="Carácter 2 de 4" />
        <OTPFieldSeparator aria-hidden />
        <OTPFieldInput aria-label="Carácter 3 de 4" />
        <OTPFieldInput aria-label="Carácter 4 de 4" />
      </OTPField>
      <FieldDescription>Ingresa cuatro letras o dígitos.</FieldDescription>
      <FieldError match="valueMissing">Ingresa el código de recuperación.</FieldError>
      <FieldError match="patternMismatch">Completa las cuatro casillas.</FieldError>
    </Field>
  );
}
```

Para enviar al completar, coloca el ejemplo mínimo de la anatomía dentro del formulario, añade `required autoSubmit` a la raíz y define el envío en el formulario. El código de cuatro caracteres se envía bajo `name="code"` sin separadores y conserva los ceros iniciales.

## 9. Accesibilidad e integración

- Asocia un `label` al `id` de la raíz o usa `FieldLabel`. La primera casilla usa ese nombre y las siguientes pueden indicar su posición con `aria-label`. Coloca la ayuda en `FieldDescription` o enlázala desde la raíz con `aria-describedby`.
- Tab entra o sale del conjunto como un solo control. Las flechas horizontales siguen la dirección de escritura. Home y flecha arriba van al inicio, y End y flecha abajo van al final del código escrito o a la siguiente casilla vacía. Retroceso borra y retrocede, y Supr borra en la posición activa. Solo lectura conserva la navegación.
- Los modos integrados aplican un patrón de longitud completa al input oculto. Al usar `validationType="none"`, define en la aplicación las reglas de formato y longitud que requiera el formulario. El código final se envía como una única entrada nombrada desde la raíz o Field. Los campos deshabilitados se excluyen del envío.
- Con `render`, conserva el grupo, sus atributos y la ref. Para una casilla, conserva un input real con sus eventos, ref y atributos de foco, selección y autocompletado. Para una separación puramente decorativa, usa `aria-hidden`.

## 10. Límites y verificación

Exporta `otp-field.tsx` y los tokens compartidos de [globals.css](../globals.md). La familia es independiente y carece de iconos, portales y CSS específico. Incluye [Field](field.md) si la composición usa sus etiquetas y errores. Las composiciones con estado, callbacks o normalizadores se ubican en módulos cliente.

Comprueba que `length` coincide con las casillas desde el render inicial. Prueba avance, navegación, borrado, pegado, foco y errores en ambos temas y en pantallas estrechas. Comprueba el autocompletado en los dispositivos de destino y la serialización de códigos con ceros iniciales. Para reglas Unicode propias, verifica caracteres fuera del plano básico en el entorno de destino porque Base UI 1.9 usa índices de cadena para asignar posiciones.
