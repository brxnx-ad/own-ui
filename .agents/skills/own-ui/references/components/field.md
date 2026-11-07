# Field

## 1. Identificación

Field es una familia independiente que envuelve `@base-ui/react/field` y combina sus clases con `clsx`.

## 2. Propósito y casos de uso

Usa Field para asociar una etiqueta, una descripción y mensajes de validación a un control. Sirve para inputs, áreas de texto y controles compatibles con el contexto de Field, como Checkbox o Combobox. Con Base UI Form, los campos registrados se validan al enviar y los errores externos se asocian por nombre. Para un grupo de opciones, cada `FieldItem` aporta la etiqueta y la descripción de una opción.

## 3. Importación y anatomía

```tsx
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
  type FieldActions,
  type FieldValidityData,
  type FieldValidityState,
} from "@/components/own/independant/field";
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Field` | `div` | Agrupa las piezas y mantiene el estado, el nombre y las reglas del campo. |
| `FieldLabel` | `label` | Nombra el control y se asocia a su identificador. |
| `FieldControl` | `input` | Registra el control y su valor. Puede reemplazarse por un control que ya consuma el contexto de Field. |
| `FieldDescription` | `p` | Proporciona texto de ayuda asociado al control. |
| `FieldError` | `div` al mostrarse | Muestra y asocia un mensaje cuando se cumple su condición. |
| `FieldValidity` | Ninguno | Entrega la validez a la función hija para que el consumidor renderice su propio contenido. |
| `FieldItem` | `div` | Crea un contexto de etiqueta y descripción para una opción dentro de un grupo. |

`FieldActions` tipa la acción imperativa. `FieldValidityData` describe los datos de validación de Base UI. `FieldValidityState` describe lo que recibe la función hija de `FieldValidity`, donde `validity` expone las condiciones de validez y `transitionStatus` indica la transición.

```tsx
<Field name="email">
  <FieldLabel>Correo de entrega</FieldLabel>
  <FieldControl type="email" required />
  <FieldDescription>Ingresa la dirección que recibirá el informe.</FieldDescription>
  <FieldError />
</Field>
```

El consumidor aporta la etiqueta, la ayuda y las restricciones. Si se usa un control que ya se integra con Base UI Field, colócalo dentro de `Field` en lugar de envolverlo con `FieldControl`.

## 4. Variantes y tamaños

Field carece de props `variant` y `size`. `validationMode` configura el comportamiento. La raíz usa una columna flex con una separación predeterminada de `0.5rem`. El control ocupa el ancho disponible, con altura mínima de `2.5rem` y altura adaptable al tipo de elemento. La separación exterior y el ancho del campo se definen en el consumidor.

## 5. Props y callbacks

Las props son las de Base UI. Own-ui aporta los estilos y `data-slot` en las piezas con nodo. `ValidationResult` representa `string | string[] | null | void`. `Form.Values` y `Field.Control.ChangeEventDetails` se pueden consultar en los tipos públicos de `@base-ui/react/form` y `@base-ui/react/field`, respectivamente.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Field` | `name` | `string` | Nombre del control | Sí | Identifica el campo al enviar. Prevalece sobre `name` de `FieldControl`. |
| `Field` | `disabled` | `boolean` | `false` | Sí | Deshabilita los controles compatibles. Hereda la deshabilitación de un Fieldset de Base UI. |
| `Field` | `validate` | `(value: unknown, formValues: Form.Values) => ValidationResult \| Promise<ValidationResult>` | — | Sí | Devuelve errores propios. Un resultado vacío indica que la regla propia se cumple. El objeto de valores corresponde a los campos con nombre registrados en Base UI Form. |
| `Field` | `validationMode` | `"onSubmit" \| "onBlur" \| "onChange"` | Modo de Form o `"onSubmit"` | Sí | Configura el momento de validación. Prevalece sobre el modo del formulario. |
| `Field` | `validationDebounceTime` | `number` | `0` | Sí | Espera en milisegundos antes de validar un valor no vacío tras un cambio. Se aplica en `onChange` y cuando `onSubmit` revalida tras un envío. |
| `Field` | `invalid` | `boolean` | `undefined` | Sí | Con `true`, fuerza el estado inválido. Con `false`, se siguen evaluando las reglas del campo y los errores de Form. |
| `Field` | `dirty`, `touched` | `boolean` | Estado interno | Sí | Controla si el valor difiere del inicial o si el campo fue visitado, respectivamente. |
| `Field` | `actionsRef` | `RefObject<FieldActions \| null>` | — | Sí | Expone `validate(): void` para solicitar validación. |
| `FieldControl` | `value`, `defaultValue` | `string \| number \| readonly string[]` | — | Sí | Valor controlado o valor inicial. Al editar, el callback recibe un `string`. |
| `FieldControl` | `onValueChange` | `(value: string, details: ChangeEventDetails) => void` | — | Sí | Informa el valor del DOM. Actualiza `value` para aceptar un cambio en modo controlado. |
| `FieldControl` | `name`, `id` | `string` | Sin nombre, ID generado | Sí | Nombre de envío e identificador para la etiqueta. El nombre de la raíz tiene precedencia. |
| `FieldControl` | `disabled`, `readOnly` | `boolean` | `false` | Sí | Un control deshabilitado queda fuera de la interacción y del envío. Un control de solo lectura puede recibir foco y aportar su valor. |
| `FieldControl` | `type`, `required`, `pattern`, `minLength`, `maxLength`, `min`, `max`, `step` | Atributos de `input` | Según HTML | Sí | Aplican las restricciones nativas compatibles con el tipo de control. |
| `FieldLabel` | `nativeLabel` | `boolean` | `true` | Sí | Usa `false` si `render` produce un elemento distinto de `label`. |
| `FieldError` | `match` | `boolean \| keyof ValidityState` | `undefined` | Sí | Una clave muestra el mensaje cuando esa condición es verdadera. `true` lo muestra siempre. `false` u omitir la prop usa los errores registrados del campo. |
| `FieldError` | `children` | `ReactNode` | Mensaje de Base UI | Sí | Permite sustituir el mensaje nativo, personalizado o externo. |
| `FieldValidity` | `children` | `(state: FieldValidityState) => ReactNode` | — | No | Recibe `validity`, `value`, `initialValue`, `error`, `errors` y `transitionStatus`. |
| `FieldItem` | `disabled` | `boolean` | `false` | Sí | Deshabilita una opción compatible. Un Field deshabilitado también deshabilita sus opciones. |
| Piezas con nodo | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases estáticas o derivadas del estado. |
| Piezas con nodo | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo. |
| Piezas con nodo | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Sustituye el elemento o lo compone con otro componente. |
| Piezas con nodo | `ref`, eventos y atributos HTML | Según la pieza de Base UI | — | Sí | Acceso al nodo y a sus atributos y eventos compatibles. |

`onValueChange` recibe el evento nativo en `details.event` y usa `details.reason === "none"`. En modo no controlado, `details.cancel()` omite la validación de ese cambio, mientras el valor del DOM sigue su curso nativo. En modo controlado, Field registra y valida el valor confirmado en `value`. La función `validate` puede devolver varias cadenas, que `FieldError` presenta como lista cuando conserva el mensaje automático.

## 6. Funcionamiento y estados

- `onSubmit` valida al enviar con Base UI Form y revalida al editar después del intento. `onBlur` valida al perder el foco y `onChange` valida al cambiar el valor. `actionsRef.current?.validate()` permite solicitar validación sin esperar a esos eventos.
- `data-valid` y `data-invalid` corresponden a `valid === true` y `valid === false`. `valid === null` es el estado neutral. El error obligatorio puede mantenerse oculto mientras el campo está intacto. El intento de envío hace visible el error si falta el valor.
- Los errores de `Form.errors` marcan inválido el campo con el mismo `name`. Base UI retira ese error externo cuando se edita el control. Si gestionas `invalid` por tu cuenta, renderiza `FieldError match={true}` con tu mensaje mientras el error exista. `invalid` por sí sola no crea un mensaje.
- `FieldError` monta el mensaje cuando coincide su condición y lo retira después de la salida. Base UI asocia el mensaje al control mientras coincide la condición. Si el mensaje proviene de `validate` o de un error externo con varias cadenas, el mensaje automático puede contener una lista.
- `FieldValidity` entrega el estado de la última validación. Para mostrar un contador que cambie con cada pulsación, usa el valor controlado de `FieldControl`.

| Pieza | `data-slot` y estados |
| :--- | :--- |
| Raíz | `field` |
| Label | `field-label` |
| Control | `field-control` |
| Description | `field-description` |
| Error | `field-error`, `data-starting-style`, `data-ending-style`. El contenedor interno usa `field-error-content`. |
| Item | `field-item` |
| Validity | Expone estado por función hija y carece de nodo propio. |

Todas las piezas con nodo exponen `data-disabled`, `data-touched`, `data-dirty`, `data-valid`, `data-invalid`, `data-filled` y `data-focused` cuando corresponde. El estado de `FieldItem` incluye su deshabilitación local. `FieldControl` combina la deshabilitación propia y la de la raíz y recibe `aria-invalid` si está habilitado y el campo es inválido.

## 7. Estilos admitidos por pieza

| Pieza | Estilos base y ajustes locales |
| :--- | :--- |
| Field | `flex min-w-0 flex-col`. Usa `--field-gap` para ajustar la separación entre piezas y sincronizarla con la transición del error. |
| FieldControl | `min-h-10 w-full min-w-0`, `px-3 py-2`, borde `gray-base`, superficie `surface-bold`, texto `gray-bold`, `rounded-base`. Usa texto de `1rem` en móvil y `sm:text-sm` a partir del breakpoint. El foco visible usa un anillo `primary-base`, y `aria-invalid` cambia el borde y el anillo a `error-base`. El estado deshabilitado reduce opacidad y cambia el cursor. |
| FieldLabel y FieldDescription | `body-sm`. La etiqueta usa peso medio y `gray-bold`; la descripción, `gray-bold/75`. Ambas usan `gray-bold/60` si se deshabilitan. |
| FieldError | `body-sm text-error-bold`. Estiliza las listas automáticas con viñetas y sangría. El bloque de Field en `@layer components` de `globals.css` transiciona la opacidad y la altura durante `150ms` cuando se permite el movimiento. Si es hijo directo de Field, también transiciona la separación que ocupa al aparecer o desaparecer. Incluye ese bloque al exportar la familia. |
| FieldItem | `grid min-w-0 gap-1`. El consumidor decide la disposición de la casilla y su etiqueta. |
| FieldValidity | El contenido que devuelve la función hija decide su estilo. |

Las clases base no aplican sombras decorativas, iconos ni márgenes exteriores. Los colores se adaptan al tema por sus tokens. Puedes usar `style={{ minHeight: "5rem" }}` para dimensionar un área de texto o un selector de estado local para ajustar un anillo. Al modificar los tokens en [globals](../globals.md), el cambio afecta a todos los componentes que los consumen.

Las piezas estilizadas evalúan `className` funcional y combinan su resultado con `clsx`. Base UI aplica `style` estático o funcional y combina clases, estilos, eventos y refs al componer un elemento con `render`. En su forma de función, propaga las props recibidas. La cascada decide qué utilidad prevalece si las clases entran en conflicto.

## 8. Ejemplos de composición

Validación y envío con Base UI Form. Usa los imports de la sección 3 en el mismo módulo cliente. El consumidor aporta `onSave`.

```tsx
"use client";

import { Form } from "@base-ui/react/form";

export function DeliveryForm({ onSave }: { onSave: (email: string) => void }) {
  return (
    <Form<{ email: string }> onFormSubmit={({ email }) => onSave(email)}>
      <Field name="email">
        <FieldLabel>Correo de entrega</FieldLabel>
        <FieldControl type="email" required />
        <FieldError match="valueMissing">Ingresa un correo.</FieldError>
        <FieldError match="typeMismatch">Revisa el formato del correo.</FieldError>
      </Field>
      <button type="submit">Guardar</button>
    </Form>
  );
}
```

Opciones con etiquetas y descripciones individuales. Usa los imports de la sección 3 y las familias Checkbox y Checkbox Group.

```tsx
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { CheckboxGroup } from "@/components/own/independant/checkbox-group";

export function NotificationOptions() {
  return (
    <Field name="notifications">
      <FieldLabel nativeLabel={false} render={<span />}>Notificaciones</FieldLabel>
      <CheckboxGroup defaultValue={["daily"]}>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="daily"><CheckboxIndicator /></Checkbox>
            Resumen diario
          </FieldLabel>
          <FieldDescription>Recibe los indicadores al final del turno.</FieldDescription>
        </FieldItem>
        <FieldItem disabled>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="alerts"><CheckboxIndicator /></Checkbox>
            Alertas en tiempo real
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </Field>
  );
}
```

Para un área de texto, usa `FieldControl render={<textarea rows={3} />}`. La API de `FieldControl` se tipa a partir de `input`. Pasa `rows` y otros atributos específicos a `textarea` en `render`.

## 9. Accesibilidad e integración

- Usa una etiqueta visible. Base UI asocia `FieldLabel` al control y combina las descripciones y errores activos en `aria-describedby`. Conserva el foco visible al personalizar el control. Mantén Tab y la activación de etiquetas nativas.
- Para anunciar cambios mientras se escribe, usa una región viva persistente si la interacción lo necesita. `FieldError` vincula el mensaje mediante `aria-describedby` y carece de un rol de anuncio propio.
- Usa un solo control lógico por raíz. Para grupos compatibles, da un nombre al grupo y usa `FieldItem` por opción. Al componer con `render`, conserva los IDs, props ARIA, refs y eventos que recibe el elemento.
- Base UI Form ejecuta la validación registrada al enviar y enfoca el primer campo inválido utilizable. Un `<form>` nativo aplica las restricciones del navegador, pero su envío no ejecuta el ciclo de Base UI Form. En Next.js, mantén los handlers y el estado en componentes cliente.

## 10. Límites y verificación

Field requiere Base UI 1.9.0, React 19, `clsx` y Tailwind CSS v4 con los tokens de own-ui. Una promesa pendiente de `validate` no bloquea por sí sola el envío de Base UI Form. Si una regla asíncrona debe decidir si se acepta el envío, coordínala con el flujo de envío de la aplicación. Comprueba en el consumidor las restricciones del tipo de control, los nombres enviados, el foco al fallar, ambos temas y el movimiento reducido.
