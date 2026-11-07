# Radio Group

## 1. Identificación

Radio Group envuelve `@base-ui/react/radio-group` y las piezas Root e Indicator de `@base-ui/react/radio`. Usa `clsx` para combinar sus estilos. [API de Base UI](https://base-ui.com/react/components/radio-group)

## 2. Propósito y casos de uso

Úsalo para elegir una alternativa entre varias visibles, como un método de entrega, un periodo de retención o un canal de notificación. Las opciones comparten un valor y se recorren con las flechas del teclado.

Usa [Checkbox Group](checkbox-group.md) si pueden seleccionarse varias alternativas. Usa un selector cuando el espacio disponible requiera presentar las alternativas en un panel.

## 3. Importación y anatomía

Resuelve la ruta del módulo y el alias en el consumidor según la [referencia de estructura](../structure.md).

```tsx
import { Radio, RadioGroup, RadioIndicator } from "@/components/own/independant/radio-group";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `RadioGroup` | `div[role="radiogroup"]` | `radio-group` | Comparte la selección, el nombre de formulario y la navegación. |
| `Radio` | `span[role="radio"]` y un `input[type="radio"]` visualmente oculto como hermano | `radio` en el `span` | Representa una opción. El input nativo participa en la validación y el envío. |
| `RadioIndicator` | `span` decorativo | `radio-indicator` | Dibuja el punto de selección dentro de una opción. |

También se exportan `RadioGroupProps<Value>`, `RadioGroupState`, `RadioGroupChangeEventDetails`, `RadioProps<Value>`, `RadioState`, `RadioIndicatorProps` y `RadioIndicatorState`.

Coloca las opciones dentro de `RadioGroup` y monta un `RadioIndicator` dentro de cada `Radio` para mostrar su selección. El consumidor aporta las etiquetas y compone las opciones mediante `children`.

```tsx
<p id="notification-channel">Canal de notificación</p>
<RadioGroup name="channel" aria-labelledby="notification-channel" defaultValue="correo">
  <label className="body-sm flex items-center gap-2.5">
    <Radio value="correo"><RadioIndicator /></Radio>
    Correo electrónico
  </label>
  <label className="body-sm flex items-center gap-2.5">
    <Radio value="sms"><RadioIndicator /></Radio>
    SMS
  </label>
</RadioGroup>
```

## 4. Variantes y tamaños

La familia carece de props propias de variante, tamaño y orientación. La raíz dispone las opciones en una cuadrícula con `gap-2.5`. El círculo mide `1.25rem` de diámetro y el punto `0.5rem` con el espaciado predeterminado. El consumidor puede ajustar tamaño y distribución con CSS.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| RadioGroup | `value`, `defaultValue` | `Value` | — | Sí | Selección controlada o inicial. Si se omite el valor inicial, el grupo empieza sin selección. |
| RadioGroup | `onValueChange` | `(value: Value, details: RadioGroupChangeEventDetails) => void` | — | Sí | Recibe la selección propuesta. `details.event` es el evento nativo, `details.reason` es `"none"` y `details.cancel()` cancela el cambio. |
| RadioGroup | `name`, `form` | `string` | Nombre de Field o —, — | Sí | Define el nombre enviado y permite asociar los inputs con un formulario externo por su ID. El nombre de Field tiene precedencia. |
| RadioGroup | `disabled`, `readOnly`, `required` | `boolean` | `false` | Sí | Deshabilita el grupo, protege la selección o exige una opción. Los estados se propagan a las opciones. |
| RadioGroup | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Accede al input representativo. Base UI prioriza la opción marcada y habilitada. |
| RadioGroup | `aria-label`, `aria-labelledby` | `string` | Etiqueta de Field o leyenda de Fieldset si corresponde | Sí | Nombra el conjunto. Usa una referencia explícita cuando aportes una etiqueta externa. |
| Radio | `value` | `Value` | — | No | Identifica la opción. Usa valores únicos y estables dentro de cada grupo. |
| Radio | `disabled`, `readOnly`, `required` | `boolean` | `false` | Sí | Aplica el estado local sin cancelar el estado heredado. Usa `required` en el grupo para comunicar el requisito compartido. |
| Radio | `nativeButton` | `boolean` | `false` | Sí | Actívalo con `render={<button />}` cuando el nodo visible sea un botón nativo. |
| Radio | `id` | `string` | ID generado | Sí | Identifica el input oculto en la composición predeterminada o el botón visible con `nativeButton`. |
| Radio | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Accede al input oculto de esa opción. |
| RadioIndicator | `keepMounted` | `boolean` | `false` | Sí | Conserva el punto al desmarcar. El estilo base lo oculta con `data-unchecked`. |
| Todas | `className`, `style` | `string`, `CSSProperties` o funciones del estado | — | Sí | Añade clases o estilos al nodo correspondiente. |
| Todas | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone o accede al nodo visible y añade atributos. |

Las props de comportamiento provienen de Base UI. En modo controlado, actualiza `value` desde `onValueChange` para aceptar el cambio. Una actualización externa de `value` se refleja en la selección sin invocar el callback.

## 6. Funcionamiento y estados

- La selección usa igualdad estricta entre `RadioGroup.value` y el valor de cada `Radio`. Usa el mismo tipo en ambos. Para objetos, conserva la misma referencia entre renders. Las cadenas son convenientes cuando el valor se envía a un formulario.
- El input de la opción marcada y habilitada aporta el dato a `FormData.get(name)`. Base UI envía las cadenas tal cual y serializa otros tipos a texto con JSON cuando es posible. Usa un nombre distinto para cada grupo lógico dentro del mismo formulario.
- Una opción hereda `disabled`, `readOnly` y `required` del grupo. Field también puede deshabilitar la raíz y FieldItem puede deshabilitar una opción. El modo de solo lectura permite enfocar opciones y conserva la selección.
- La raíz, las opciones y los indicadores exponen `data-disabled`, `data-readonly` y `data-required` cuando corresponde. Las opciones y sus indicadores añaden `data-checked` o `data-unchecked`. Con Field se propagan `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-focused` y `data-filled` según el estado del campo.
- El indicador refleja `data-starting-style` y `data-ending-style` durante su transición. Base UI lo desmonta al terminar la salida, salvo cuando se activa `keepMounted`.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| RadioGroup | Cuadrícula `min-w-0` con `gap-2.5`. Personaliza las columnas o el ancho desde la raíz y deja la separación exterior a la composición consumidora. Las etiquetas y el área clicable pertenecen al consumidor. |
| Radio | Círculo de `size-5` con borde `gray-bold/70` y fondo `surface-bold`. El borde de selección y el color heredado por el punto usan `primary-base`. Una opción habilitada, sin marcar y editable usa `surface-soft` al pasar el puntero. |
| Radio | El foco visible usa un contorno `gray-bold` de 2 px separado 2 px. `data-invalid` o `aria-invalid="true"` aplican `error-base` al borde, el punto y el contorno de foco. Una opción deshabilitada reduce su opacidad al 50 %. |
| RadioIndicator | Punto de `size-2` con `bg-current`, redondeado y centrado. Los atributos de transición y `data-unchecked` ajustan su opacidad. En colores forzados usa `Highlight`. |

Los tokens se adaptan a los temas de [globals.css](../globals.md). El punto desvanece su entrada y salida durante 150 ms con movimiento permitido. Con movimiento reducido, la opacidad cambia de inmediato.

`className` admite una cadena o función del estado y se combina con las clases base mediante `clsx`. Las utilidades en conflicto se resuelven por la cascada. `style` admite un objeto o función y actúa en el nodo visible de cada pieza. Por ejemplo, `<RadioGroup style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>` distribuye las opciones en dos columnas y `<RadioIndicator style={{ width: "0.375rem", height: "0.375rem" }} />` reduce el punto. Al usar `render`, conserva los atributos, eventos y refs que entrega Base UI.

## 8. Ejemplos de composición

Grupo obligatorio con etiqueta de conjunto y etiquetas por opción en contextos separados. El consumidor entrega `onConfirm` desde un módulo cliente y usa `FormData` para obtener la opción enviada.

```tsx
"use client";

import { Field, FieldError, FieldItem, FieldLabel } from "@/components/own/independant/field";
import { Form } from "@/components/own/independant/form";
import { Radio, RadioGroup, RadioIndicator } from "@/components/own/independant/radio-group";

export function DeliveryMethod({ onConfirm }: { onConfirm: (method: string) => void }) {
  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      const method = new FormData(event.currentTarget).get("delivery");
      if (typeof method === "string") onConfirm(method);
    }}>
      <Field name="delivery">
        <FieldLabel nativeLabel={false} render={<span />}>Método de entrega</FieldLabel>
        <RadioGroup required>
          <FieldItem>
            <FieldLabel className="flex items-center gap-2.5">
              <Radio value="retiro"><RadioIndicator /></Radio>
              Retiro en tienda
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel className="flex items-center gap-2.5">
              <Radio value="despacho"><RadioIndicator /></Radio>
              Despacho a domicilio
            </FieldLabel>
          </FieldItem>
        </RadioGroup>
        <FieldError match="valueMissing">Elige un método de entrega.</FieldError>
      </Field>
      <button type="submit">Confirmar</button>
    </Form>
  );
}
```

Para usar una etiqueta hermana con `htmlFor`, sustituye una opción del ejemplo básico por un botón nativo. El fragmento va dentro de `RadioGroup`.

```tsx
<div className="flex items-center gap-2.5">
  <Radio id="notification-sms" value="sms" nativeButton render={<button type="button" />}>
    <RadioIndicator />
  </Radio>
  <label htmlFor="notification-sms">SMS</label>
</div>
```

## 9. Accesibilidad e integración

- Nombra el conjunto con `aria-labelledby`, `aria-label` o una etiqueta de Field. Dentro de Field, usa un `FieldItem` por opción para que cada una tenga su propio contexto de ID, etiqueta y descripción.
- Nombra cada opción mediante una etiqueta envolvente con el `span` predeterminado, o usa un botón nativo con etiqueta hermana. Conserva `aria-hidden` en el indicador decorativo.
- Tab entra al grupo por la opción seleccionada cuando está habilitada. Las flechas recorren las opciones habilitadas y cambian la selección. Espacio selecciona la opción enfocada. En solo lectura, el foco se puede mover y el valor se conserva. Con el `span` predeterminado de Base UI 1.9, la opción marcada de un grupo deshabilitado puede conservar su parada de Tab con `aria-disabled="true"` y la selección bloqueada.
- Si usas `render`, conserva `role="radio"`, `aria-checked`, eventos y refs. Al utilizar `nativeButton`, aporta un botón real. Para etiquetas envolventes con botón nativo, usa la función `render` para colocar el botón dentro de la etiqueta y dejar el input oculto fuera de ella.

## 10. Límites y verificación

Exporta `radio-group.tsx` con los tokens de [globals.css](../globals.md). La familia es independiente y usa las clases del módulo. Incluye [Field](field.md) y [Form](form.md) si la composición usa su validación. Coloca el estado y los callbacks en una frontera cliente de App Router.

Comprueba el nombre del conjunto y de cada opción, la selección exclusiva con teclado y puntero, la deshabilitación y el valor de formulario. Verifica el error de un grupo obligatorio vacío, el retorno a un estado válido al elegir, los dos temas, el ancho reducido, los colores forzados y el movimiento reducido.
