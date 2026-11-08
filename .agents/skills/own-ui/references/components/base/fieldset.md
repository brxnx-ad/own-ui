# Fieldset

## 1. Identificación

Fieldset pertenece a `base/`, envuelve `@base-ui/react/fieldset` y combina sus clases con `clsx`.

## 2. Propósito y casos de uso

Agrupa controles relacionados bajo un nombre común. Sirve para datos de contacto, preferencias o secciones de un formulario que se habilitan como unidad. Cada control conserva su etiqueta, nombre, valor y reglas de validación. Usa [Field](field.md) cuando necesites asociar esas propiedades a un control individual.

## 3. Importación y anatomía

```tsx
import { Fieldset, FieldsetLegend } from "@/components/own/base/fieldset";
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Fieldset` | `fieldset` | Agrupa los controles y transmite la deshabilitación. |
| `FieldsetLegend` | `div` | Registra su identificador para que la raíz lo use como nombre accesible. |

Coloca una leyenda dentro de cada raíz y aporta los controles mediante `children`. Cada campo de este fragmento usa los imports de [Field](field.md).

```tsx
<Fieldset>
  <FieldsetLegend>Contacto del equipo</FieldsetLegend>
  <Field name="contactName">
    <FieldLabel>Nombre</FieldLabel>
    <FieldControl />
  </Field>
  <Field name="contactEmail">
    <FieldLabel>Correo de contacto</FieldLabel>
    <FieldControl type="email" />
  </Field>
</Fieldset>
```

## 4. Variantes y tamaños

Las piezas carecen de props `variant` y `size`. La raíz organiza sus hijos en una columna con `gap-4` y permite que el contenido se reduzca con `min-w-0`. La leyenda usa `h5`, un borde inferior y `pb-2`. El consumidor define el ancho disponible y la separación exterior.

## 5. Props y callbacks

Ambas piezas conservan el tipado de Base UI. Las funciones de estilo reciben un estado con `disabled: boolean`.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Fieldset` | `disabled` | `boolean` | `false` | Sí | Deshabilita el grupo. La deshabilitación de un Fieldset padre tiene precedencia. |
| `Fieldset` | `name`, `form` | `string` | — | Sí | Atributos del `fieldset` nativo. Para el envío, cada control usa su propio nombre y asociación a un formulario. |
| `Fieldset` | `children` | `ReactNode` | — | Sí | Leyenda y controles elegidos por el consumidor. |
| `FieldsetLegend` | `id` | `string` | ID generado | Sí | Identificador que la raíz usa en `aria-labelledby`. |
| `FieldsetLegend` | `children` | `ReactNode` | — | Sí | Texto o contenido que nombra el grupo. |
| Ambas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases al nodo según el estado. |
| Ambas | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Añade estilos inline al nodo según el estado. |
| Ambas | `render` | `ReactElement \| ((props, state) => ReactElement)` | `fieldset` / `div` | Sí | Sustituye el nodo. Propaga las props y la ref que Base UI entrega. |
| Ambas | `ref`, eventos y atributos HTML | Según las props de Base UI | — | Sí | Acceso al nodo y a sus atributos y eventos compatibles. |

Los cambios del grupo se expresan mediante `disabled`. Los callbacks de valor, validación y envío pertenecen a los controles o al formulario que los contiene.

## 6. Funcionamiento y estados

- `FieldsetLegend` registra su `id` en la raíz más cercana. `Fieldset` lo aplica en `aria-labelledby`. Una raíz anidada registra su propia leyenda.
- Una raíz nativa deshabilitada bloquea la interacción con sus controles y los excluye del envío. Base UI también propaga el estado por contexto a los Fieldset anidados y los Field compatibles. Volver a habilitar el grupo conserva los valores que siguen montados.
- Al sustituir la raíz mediante `render`, el contexto de Base UI sigue disponible. El nodo o componente elegido debe aportar semántica de grupo y aplicar la deshabilitación cuando corresponda. El bloqueo nativo de todos los controles descendientes corresponde al nodo `fieldset`.

| Pieza | `data-slot` | Estado en el DOM |
| :--- | :--- | :--- |
| Raíz | `fieldset` | `data-disabled` cuando el grupo está deshabilitado. |
| Leyenda | `fieldset-legend` | `data-disabled` cuando su grupo está deshabilitado. |

## 7. Estilos admitidos por pieza

| Pieza | Estilos base y ajustes locales |
| :--- | :--- |
| Fieldset | `flex min-w-0 flex-col gap-4`. Permite ajustar el ancho y la separación en la raíz. Para una instancia con otra separación, usa `style={{ gap: "0.75rem" }}`. El consumidor puede añadir una superficie, borde o relleno si su composición lo pide. |
| FieldsetLegend | `h5 border-b border-gray-base pb-2 text-gray-bold`. El estado deshabilitado usa `text-gray-bold/60`. El nodo acepta estilos y un elemento semántico mediante `render`. |

Los tokens se adaptan a ambos temas. El estado visual cambia de inmediato. Las clases estáticas o funcionales se combinan con `clsx` y la cascada de Tailwind decide la precedencia. Si usas `render` como función, conserva las props, eventos y refs recibidos.

## 8. Ejemplos de composición

Deshabilitación de una sección. El consumidor aporta `locked` y los imports de Fieldset y Field de la sección 3.

```tsx
export function ShippingFields({ locked }: { locked: boolean }) {
  return (
    <Fieldset disabled={locked}>
      <FieldsetLegend>Dirección de entrega</FieldsetLegend>
      <Field name="street">
        <FieldLabel>Calle</FieldLabel>
        <FieldControl autoComplete="address-line1" />
      </Field>
      <Field name="city">
        <FieldLabel>Ciudad</FieldLabel>
        <FieldControl autoComplete="address-level2" />
      </Field>
    </Fieldset>
  );
}
```

Un Field exterior registra el valor del grupo. El ejemplo compone Fieldset con Checkbox Group y usa una leyenda que funciona también como encabezado.

```tsx
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";
import { CheckboxGroup } from "@/components/own/base/checkbox-group";
import { Field, FieldItem, FieldLabel } from "@/components/own/base/field";

export function ReportOptions() {
  return (
    <Field name="reportContents">
      <Fieldset render={<CheckboxGroup defaultValue={["summary"]} />}>
        <FieldsetLegend render={<h3 />}>Contenido del informe</FieldsetLegend>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="summary"><CheckboxIndicator /></Checkbox>
            Resumen del turno
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className="flex items-center gap-2">
            <Checkbox value="incidents"><CheckboxIndicator /></Checkbox>
            Registro de incidencias
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
```

## 9. Accesibilidad e integración

- Usa una leyenda que describa el grupo y una etiqueta por control. Tab recorre los controles habilitados según el orden del documento. La leyenda `div` aporta el nombre a través de `aria-labelledby`.
- Si necesitas una leyenda HTML, usa `render={<legend />}` como primer hijo del `fieldset` nativo. HTML exceptúa de la deshabilitación a los controles dentro de ese primer `legend`. Coloca un control que deba reactivar el grupo fuera de la raíz deshabilitada.
- Conserva el `id` de la leyenda y `aria-labelledby` de la raíz al usar `render`. Si sustituyes la raíz, revisa el nombre accesible, el foco y los valores enviados.
- Fieldset puede renderizarse desde una página servidor de Next.js. Mantén los handlers y el estado interactivo en un componente cliente.

## 10. Límites y verificación

Requiere Base UI 1.9.0, React 19, `clsx` y Tailwind CSS v4 con los tokens de own-ui. El nodo predeterminado de `FieldsetLegend` es `div`, por lo que usa la asociación accesible de Base UI y permite aplicar la disposición normal del grupo. Comprueba que cada raíz tenga el nombre correcto, que la deshabilitación alcance a los controles esperados y que el formulario incluya los valores habilitados. Verifica también el ancho del grupo en pantallas pequeñas y ambos temas.
