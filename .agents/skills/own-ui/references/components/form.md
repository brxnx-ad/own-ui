# Form

## 1. Identificación

Form envuelve `@base-ui/react/form` y combina sus clases con `clsx`. Es una familia independiente. El consumidor elige los campos, grupos y botones de su composición.

## 2. Propósito y casos de uso

Form coordina el envío, la validación de los campos registrados y los errores externos asociados por nombre. Compón [Field](field.md) para registrar cada valor y asociar mensajes al control. Usa [Fieldset](fieldset.md) si varios controles comparten un nombre de grupo. Elige `onFormSubmit` para procesar los valores registrados como objeto o el envío nativo para trabajar con `FormData` y acciones.

## 3. Importación y anatomía

```tsx
import {
  Form,
  type FormActions,
  type FormProps,
  type FormSubmitEventDetails,
  type FormValidationMode,
} from "@/components/own/independant/form";
```

La familia exporta un componente que genera un `form` nativo y los cuatro tipos indicados. En este fragmento, el consumidor aporta `saveContact` y los imports de Field.

```tsx
<Form<{ email: string }> onFormSubmit={saveContact}>
  <Field name="email">
    <FieldLabel>Correo de contacto</FieldLabel>
    <FieldControl type="email" required />
    <FieldError />
  </Field>
  <button type="submit">Guardar</button>
</Form>
```

## 4. Variantes y tamaños

Form carece de props `variant` y `size`. La raíz dispone sus hijos en una columna con `gap-4` y `min-w-0`. El ancho, la separación exterior y la disposición interna de los grupos corresponden al consumidor. `validationMode` regula cuándo se valida cada campo, con independencia de los estilos.

## 5. Props y callbacks

`FormProps<Values>` conserva la API nativa y la extensión de Base UI. El parámetro `Values` describe en TypeScript el objeto de `onFormSubmit`. Los valores en ejecución proceden de los controles registrados.

| Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- |
| `validationMode` | `FormValidationMode` | `"onSubmit"` | Sí | Define el modo para los campos que lo heredan. Acepta `onSubmit`, `onBlur` y `onChange`. |
| `errors` | `Record<string, string \| string[]>` | Sin errores externos | Sí | Asocia uno o varios mensajes al nombre de un Field. |
| `onFormSubmit` | `(values: Values, details: FormSubmitEventDetails) => void` | — | Sí | Recibe los valores registrados después de la validación y cancela el envío nativo. |
| `onSubmit` | `FormProps<Values>["onSubmit"]` | — | Sí | Recibe el evento de React si la validación permite enviar. `event.currentTarget` es el formulario. Si se definen ambos callbacks, este se ejecuta antes de `onFormSubmit`. |
| `action` | `FormProps<Values>["action"]` | — | Sí | URL de envío o acción de React que recibe `FormData`. Requiere que el envío siga su curso. |
| `actionsRef` | `RefObject<FormActions \| null>` | — | Sí | Expone `validate(fieldName?: string): void` para validar un campo por nombre o todos los registrados. |
| `noValidate` | `boolean` | `true` | Sí | Con `false`, el navegador también puede validar sus restricciones antes del evento `submit`. |
| `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases a la raíz. El estado de Base UI de esta pieza es un objeto vacío. |
| `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos a la raíz. |
| `render` | `ReactElement \| ((props, state) => ReactElement)` | `form` | Sí | Compone el nodo. Conserva el elemento `form` y propaga sus props, eventos y ref. |
| `children`, `ref` y atributos HTML | Según `FormProps<Values>` | Según HTML | Sí | Contenido, ref al formulario y opciones nativas como `id`, `method`, `encType` y `onReset`. |

`FormSubmitEventDetails` expone el evento nativo en `event` y el motivo `"none"` en `reason`.

## 6. Funcionamiento y estados

- Al enviar, Base UI valida los campos registrados. Si encuentra un error, cancela el envío y enfoca el primer control inválido que puede recibir foco. `validationMode` decide la validación durante la edición. Los campos con modo propio conservan esa configuración y también se validan al enviar.
- Con `onSubmit` como modo de validación, un intento de envío activa la revalidación posterior al editar. `onBlur` valida al salir del control y `onChange` valida al cambiar el valor. `actionsRef.current?.validate()` solicita la validación sin enviar.
- `onFormSubmit` usa un objeto con una entrada por nombre registrado. `FormData` lee los controles nativos que pertenecen al formulario y conserva nombres repetidos. Usa `getAll()` para leer todas las entradas de un nombre.
- Cuando la aplicación actualiza `errors`, Base UI asocia los mensajes con los campos del mismo nombre. Editar un control integrado limpia su error externo del estado interno. Para mostrarlo, incluye `FieldError` dentro del campo.
- La raíz expone `data-slot="form"`. Gestiona el estado pendiente en la composición, por ejemplo con el resultado de `useActionState`, y aplica `aria-busy` o un indicador al botón de envío según corresponda.

## 7. Estilos admitidos por pieza

Form aporta `flex min-w-0 flex-col gap-4`. Añade `className` o `style` a la raíz para cambiar el ancho y la separación. Para un ajuste local de espaciado, usa `style={{ gap: "0.75rem" }}`. `clsx` conserva las clases base y las del consumidor, y la cascada decide qué utilidad prevalece si entran en conflicto.

Los estilos, mensajes y animaciones de los campos se gestionan en sus piezas respectivas. Para los errores de Field, incluye su bloque de estilos al exportar la composición. [Referencia de Field](field.md)

## 8. Ejemplos de composición

Procesa los valores registrados y ofrece una acción para validar solo el correo. El consumidor aporta `save` y los imports de Form, Field y React indicados.

```tsx
"use client";

import { useRef } from "react";
import { Field, FieldControl, FieldError, FieldLabel } from "@/components/own/independant/field";
import { Form, type FormActions } from "@/components/own/independant/form";

export function ContactForm({ save }: { save: (email: string) => void }) {
  const actionsRef = useRef<FormActions>(null);

  return (
    <Form<{ email: string }> actionsRef={actionsRef} onFormSubmit={({ email }) => save(email)}>
      <Field name="email">
        <FieldLabel>Correo de contacto</FieldLabel>
        <FieldControl type="email" required />
        <FieldError />
      </Field>
      <button type="button" onClick={() => actionsRef.current?.validate("email")}>Validar correo</button>
      <button type="submit">Guardar</button>
    </Form>
  );
}
```

Para una acción de servidor, pasa a `action` la función que devuelve `useActionState` y a `errors` los errores de su resultado. La acción recibe `FormData` y puede devolver, por ejemplo, `{ errors: { email: "Este correo ya está registrado." } }`. Usa `onSubmit` con `new FormData(event.currentTarget)` si quieres consultar los datos nativos en el cliente.

## 9. Accesibilidad e integración

- Usa etiquetas por campo y mensajes asociados mediante `FieldError`. Los controles de envío deben ser botones con `type="submit"`. Usa `type="button"` para acciones que solo validan o cambian la interfaz.
- Conserva la semántica del `form` y sus eventos al personalizar con `render`. Para un control portaleado que deba participar en `FormData`, asócialo al `id` del formulario con el atributo `form`.
- En Next.js, coloca handlers, refs y `useActionState` en un módulo cliente. La acción de servidor puede vivir en un módulo con `"use server"` y mantener sus reglas de validación en el servidor.

## 10. Límites y verificación

Requiere Base UI 1.9.0, React 19, `clsx` y Tailwind CSS v4. Una validación asíncrona pendiente de Field no bloquea por sí sola el envío. Para reglas que dependan del servidor, valida dentro de la acción o espera el resultado en el flujo de envío de la aplicación. Comprueba el foco al fallar, los mensajes por nombre y los valores que llegan a la vía de envío elegida.
