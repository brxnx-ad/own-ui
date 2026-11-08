# Number Field

## 1. Identificación

Number Field envuelve las siete piezas de `@base-ui/react/number-field`, combina clases con `clsx` y usa Minus y Plus de own-ui como iconos predeterminados.

## 2. Propósito y casos de uso

Úsalo para editar cantidades, pesos, dimensiones e importes que la aplicación almacena como números. Admite escritura, ajuste por pasos y formato localizado. También puede incorporar arrastre o rueda.

Usa [Input](input.md) para identificadores o códigos que deben conservar ceros iniciales y [Meter](meter.md) para representar un valor de solo consulta dentro de un rango.

## 3. Importación y anatomía

Importa desde la ruta que corresponda en el consumidor. Consulta [estructura y composición](../../structure.md) para resolver el alias y los iconos de soporte.

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@/components/own/base/number-field";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `NumberField` | `div` con un `input[type="number"]` visualmente oculto como hermano | `number-field` en el `div` | Coordina el valor y la configuración. El control oculto participa en el formulario. |
| `NumberFieldGroup` | `div` | `number-field-group` | Agrupa la entrada y los botones. Aloja el borde y el anillo de foco. |
| `NumberFieldInput` | `input[type="text"]` | `number-field-input` | Edita el texto localizado y recibe el foco. |
| `NumberFieldDecrement` | `button` | `number-field-decrement` | Disminuye el valor y muestra Minus por defecto. |
| `NumberFieldIncrement` | `button` | `number-field-increment` | Aumenta el valor y muestra Plus por defecto. |
| `NumberFieldScrubArea` | `span` | `number-field-scrub-area` | Área opcional de arrastre que puede contener la etiqueta. |
| `NumberFieldScrubAreaCursor` | `span` en un portal a `body` | `number-field-scrub-area-cursor` | Cursor decorativo opcional. El consumidor aporta el dibujo. |

También se exportan `NumberFieldProps`, `NumberFieldState`, `NumberFieldChangeEventDetails`, `NumberFieldCommitEventDetails`, `NumberFieldGroupProps`, `NumberFieldInputProps`, `NumberFieldDecrementProps`, `NumberFieldIncrementProps`, `NumberFieldScrubAreaProps` y `NumberFieldScrubAreaCursorProps`.

Coloca las piezas bajo `NumberField` y la entrada dentro del grupo que le da su apariencia. El consumidor aporta la etiqueta, las restricciones y los botones que necesita. El cursor personalizado debe ser descendiente del área de arrastre.

```tsx
<NumberField id="units" name="units" min={1} max={20} defaultValue={3}>
  <label htmlFor="units" className="body-sm font-medium">Unidades</label>
  <NumberFieldGroup>
    <NumberFieldDecrement aria-label="Disminuir unidades" />
    <NumberFieldInput aria-roledescription="Campo numérico" />
    <NumberFieldIncrement aria-label="Aumentar unidades" />
  </NumberFieldGroup>
</NumberField>
```

## 4. Variantes y tamaños

La familia carece de props propias de variante y tamaño. El grupo tiene una altura mínima de `2.5rem` y cada botón mide `2.5rem` de ancho. El `size` de la entrada es un atributo HTML. El ancho del conjunto se ajusta desde la raíz o el contenedor.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| NumberField | `value` | `number \| null` | — | Sí | Valor controlado. Usa `null` para un campo vacío. |
| NumberField | `defaultValue` | `number` | Vacío | Sí | Valor inicial no controlado. |
| NumberField | `onValueChange` | `(value: number \| null, details: NumberFieldChangeEventDetails) => void` | — | Sí | Recibe cambios numéricos. `details.cancel()` cancela la actualización numérica de la primitiva. |
| NumberField | `onValueCommitted` | `(value: number \| null, details: NumberFieldCommitEventDetails) => void` | — | Sí | Recibe el valor confirmado. El evento carece de `cancel()`. |
| NumberField | `min`, `max` | `number` | Sin límites explícitos | Sí | Definen el rango. Para el ajuste, Base UI usa los extremos de enteros seguros como respaldo. |
| NumberField | `step` | `number \| "any"` | `1` | Sí | Paso base. Especifica `min` para validar la alineación en el formulario. Con `"any"`, omite esa validación y ajusta de uno en uno. |
| NumberField | `smallStep`, `largeStep` | `number` | `0.1`, `10` | Sí | Pasos alternativos con Alt y Mayús. |
| NumberField | `snapOnStep` | `boolean` | `false` | Sí | Alinea el ajuste a la rejilla del paso efectivo. |
| NumberField | `allowOutOfRange` | `boolean` | `false` | Sí | Conserva la entrada manual fuera del rango para validarla. Los ajustes por pasos se mantienen dentro de los límites. |
| NumberField | `allowWheelScrub` | `boolean` | `false` | Sí | Habilita la rueda mientras la entrada tiene foco y el puntero está sobre ella. |
| NumberField | `locale`, `format` | `Intl.LocalesArgument`, `Intl.NumberFormatOptions` | Locale del entorno, — | Sí | Guían la interpretación y presentación. Las opciones explícitas de redondeo pueden afectar al valor confirmado. |
| NumberField | `required`, `disabled`, `readOnly` | `boolean` | `false` | Sí | Exige un valor, deshabilita el campo o impide editarlo. La deshabilitación también se hereda de Field. |
| NumberField | `id`, `name`, `form` | `string` | ID generado, —, — | Sí | Identifica la entrada visible y configura el envío del control oculto. El nombre de Field tiene precedencia. |
| NumberField | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Accede al control oculto. |
| NumberFieldGroup | `children` | `ReactNode` | — | Sí | Recibe la entrada y los botones que el consumidor incluya. |
| NumberFieldInput | `placeholder`, `inputMode` | Atributos de input | —, según formato y plataforma | Sí | Configuran la pista del campo vacío sin foco y el teclado sugerido. Configura el valor, los límites y el nombre en la raíz. |
| NumberFieldInput | `aria-roledescription` | `string` | `"Number field"` | Sí | Localiza la descripción del tipo de control. El nombre accesible se aporta por separado. |
| Botones | `children` | `ReactNode` | Minus o Plus | Sí | Sustituye el icono. `null` omite el contenido predeterminado. |
| Botones | `aria-label` | `string` | `"Decrease"` o `"Increase"` | Sí | Localiza el nombre o precisa la cantidad afectada. |
| Botones | `disabled`, `nativeButton` | `boolean` | `false`, `true` | Sí | Deshabilita un botón individual o adapta su semántica al sustituir el nodo con `render`. |
| NumberFieldScrubArea | `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Define el eje del gesto. El estilo del puntero se elige por separado. |
| NumberFieldScrubArea | `pixelSensitivity` | `number` | `2` | Sí | Movimiento en píxeles por paso de arrastre. |
| NumberFieldScrubArea | `teleportDistance` | `number` | — | Sí | Distancia desde el centro a partir de la cual el cursor reaparece por el otro extremo. |
| NumberFieldScrubAreaCursor | `children` | `ReactNode` | — | Sí | Contenido decorativo del cursor. |
| Todas | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Personaliza el nodo de cada pieza. |
| Todas | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone el nodo o añade atributos. La ref de la raíz apunta al `div` y la de la entrada al control visible. |

Los iconos predeterminados, los slots y los estilos pertenecen a own-ui. Las props de estado e interacción provienen de Base UI. Los atributos HTML se aplican a la pieza que renderiza el elemento correspondiente.

`NumberFieldChangeEventDetails.reason` admite `input-change`, `input-clear`, `input-blur`, `input-paste`, `keyboard`, `increment-press`, `decrement-press`, `wheel`, `scrub` y `none`. El detalle incluye el evento y puede incluir `direction` con valor `-1` o `1`. El tipo de confirmación omite `input-change` e `input-paste`. La confirmación ocurre al salir de la entrada tras editar, al soltar un botón o finalizar el arrastre, y durante los ajustes por teclado o rueda.

## 6. Funcionamiento y estados

- En modo controlado, actualiza `value` desde `onValueChange`. En modo no controlado, Base UI conserva el valor a partir de `defaultValue`. El valor numérico vacío es `null`. El primer ajuste por pasos desde vacío parte de cero y lo limita al rango.
- El estado separa `value` de `inputValue`. Mientras se escribe, puede haber texto parcial o una representación temporal antes de normalizar el formato. Cancelar la actualización numérica puede dejar ese texto visible durante la edición.
- Los botones dejan de ajustar al alcanzar su extremo. En solo lectura, la entrada admite foco, selección y envío, y los botones quedan indisponibles. Al deshabilitarla, la entrada sale del recorrido de Tab y del envío.
- Base UI expone `data-scrubbing`, `data-disabled`, `data-readonly` y `data-required` según el estado. También expone `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled` y `data-focused` según el estado de Field. En los botones, `data-disabled` cubre además el límite y la deshabilitación individual. `aria-disabled` cubre también la solo lectura. La entrada refleja la invalidez habilitada de Field con `aria-invalid`.
- El cursor se monta durante el arrastre compatible con Pointer Lock. Se omite con entrada táctil, en WebKit o si se deniega el bloqueo. El consumidor decide el montaje de las demás piezas.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| NumberField | Cuadrícula con `gap-2` y `min-w-0`. Define el ancho máximo aquí o en el contenedor. La composición consumidora controla el espacio exterior. |
| NumberFieldGroup | Fila flexible de ancho completo con `min-h-10`, radio `rounded-base`, borde `gray-base` y fondo `surface-bold`. El foco visible de un descendiente activa el anillo `primary-base`. Un descendiente con `aria-invalid="true"` cambia el borde y el anillo a `error-base`. La opacidad del grupo deshabilitado baja al 50 %. |
| NumberFieldInput | Ocupa el espacio disponible con `flex-1 min-w-0`, `px-3 py-2` y fondo transparente. Centra las cifras tabulares en `gray-bold` con `text-base` en móvil y `text-sm` desde `sm`. Conserva el indicador de foco del grupo al ajustar la geometría. |
| Botones | Usan `w-10` sin encogerse, un borde separador y radios exteriores lógicos. Los SVG sin clase `size-*` escalan a `1.15em`. Pasan de `surface-base` a `surface-bold` al pasar el puntero y a `surface-soft` al presionar. `aria-disabled` atenúa el texto y el icono `gray-bold`. |
| NumberFieldScrubArea | Fila en línea ajustada al contenido con `gap-2` y selección de texto desactivada. Usa un cursor como `cursor-ew-resize` o `cursor-ns-resize` según el eje. Base UI aplica estilos inline para gestionar el gesto táctil. |
| NumberFieldScrubAreaCursor | Base UI fija y desplaza el nodo portaleado. Estiliza su contenido para elegir tamaño, sombra, color y alineación. Conserva la posición, la transformación y `pointer-events: none` del nodo exterior. |

Los colores siguen los temas de [globals.css](../../globals.md). Los botones transicionan colores en 150 ms con `motion-safe`. El cursor sigue al puntero directamente. Las piezas carecen de animaciones de entrada y salida.

Usa `className` como cadena o función del estado. Los wrappers estilizados combinan su resultado mediante `clsx` sin resolver utilidades en conflicto. `style` acepta un objeto o una función del estado y se aplica al nodo. Por ejemplo, `<NumberField style={{ maxWidth: "18rem" }}>` limita una instancia y `<NumberFieldIncrement className={(state) => state.disabled ? "opacity-75" : undefined} />` ajusta el botón cuando alcanza un límite o se deshabilita. También puedes usar selectores por slot y componer el nodo con `render`.

## 8. Ejemplos de composición

Campo controlado con formato local y validación de rango al perder el foco. Si se incluye en un formulario, el valor numérico se serializa bajo el nombre de Field.

```tsx
"use client";

import { useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/own/base/field";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/own/base/number-field";

export function ShipmentWeight() {
  const [weight, setWeight] = useState<number | null>(12.5);

  return (
    <Field name="weight" validationMode="onBlur">
      <FieldLabel>Peso del envío</FieldLabel>
      <NumberField
        value={weight}
        onValueChange={setWeight}
        min={0.25}
        max={25}
        step={0.25}
        required
        allowOutOfRange
        locale="es-CL"
        format={{ style: "unit", unit: "kilogram", maximumFractionDigits: 2 }}
      >
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Disminuir peso" />
          <NumberFieldInput aria-roledescription="Campo numérico" />
          <NumberFieldIncrement aria-label="Aumentar peso" />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Ingresa entre 0,25 y 25 kg.</FieldDescription>
      <FieldError match="valueMissing">Ingresa el peso.</FieldError>
      <FieldError match="rangeUnderflow">Ingresa al menos 0,25 kg.</FieldError>
      <FieldError match="rangeOverflow">Ingresa un máximo de 25 kg.</FieldError>
      <FieldError match="stepMismatch">Usa múltiplos de 0,25 kg.</FieldError>
    </Field>
  );
}
```

Para añadir el ajuste por arrastre al ejemplo de unidades, reemplaza su etiqueta por este fragmento dentro de la misma raíz.

```tsx
<NumberFieldScrubArea className="cursor-ew-resize">
  <label htmlFor="units" className="body-sm cursor-inherit font-medium">Unidades</label>
  <NumberFieldScrubAreaCursor>
    <span className="block -translate-x-1/2 -translate-y-1/2 rounded-base bg-surface-bold px-1 text-gray-bold shadow-s">
      ↔
    </span>
  </NumberFieldScrubAreaCursor>
</NumberFieldScrubArea>
```

## 9. Accesibilidad e integración

- Nombra la entrada mediante `label` y el `id` de la raíz, mediante `FieldLabel` o mediante ARIA. Los botones con icono conservan un nombre accesible que se puede localizar con `aria-label`.
- Tab llega a la entrada y las flechas arriba y abajo ajustan el valor. Alt y Mayús modifican el paso. Home y End van al límite correspondiente si está definido. Los botones quedan fuera del recorrido de Tab. Si añades arrastre, conserva el ajuste por teclado.
- Define `name` en la raíz o en Field. Si el formulario está fuera del árbol, proporciona su ID mediante `form`. Usa la ref de `NumberFieldInput` para enfocar el control visible.
- Con `render`, propaga atributos, clases, estilos, eventos y ref al nodo correspondiente. Conserva un control de texto en `NumberFieldInput`. Si sustituyes el botón nativo por otro elemento, establece `nativeButton={false}`.
- El portal del cursor necesita el tema y los tokens en `body`. Conserva `aria-hidden` en el cursor decorativo.

## 10. Límites y verificación

Exporta `number-field.tsx` con el módulo que resuelva Plus y Minus y con los tokens compartidos de [globals.css](../../globals.md). La familia carece de un bloque CSS específico. Incluye [Field](field.md) si la composición lo utiliza. Mantén la frontera cliente del wrapper y sitúa los estados y handlers del consumidor en un módulo cliente.

Comprueba edición, borrado, pasos, límites, formato y envío. Prueba foco, error, solo lectura y deshabilitación en ambos temas y a un ancho reducido. Verifica la disponibilidad de Pointer Lock en el navegador de destino cuando uses el cursor personalizado. Define un locale explícito si necesitas el mismo formato en servidor y cliente.
