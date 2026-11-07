# Checkbox Group

## 1. Identificación

`CheckboxGroup` envuelve la primitiva de `@base-ui/react/checkbox-group` y usa `clsx` para combinar las clases del contenedor.

## 2. Propósito y casos de uso

Coordina varias casillas relacionadas mediante un arreglo de valores seleccionados. Úsalo para elegir varios filtros, preferencias o permisos. Una casilla principal puede cambiar la selección del grupo y mostrar un estado mixto cuando solo hay algunas opciones marcadas.

## 3. Importación y anatomía

```tsx
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { CheckboxGroup } from "@/components/own/independant/checkbox-group";

<CheckboxGroup aria-labelledby="informes" defaultValue={["inventario"]}>
  <p id="informes">Informes semanales</p>
  <label className="flex items-center gap-2.5">
    <Checkbox value="inventario" aria-labelledby="opcion-inventario">
      <CheckboxIndicator />
    </Checkbox>
    <span id="opcion-inventario">Inventario</span>
  </label>
  <label className="flex items-center gap-2.5">
    <Checkbox value="ventas" aria-labelledby="opcion-ventas">
      <CheckboxIndicator />
    </Checkbox>
    <span id="opcion-ventas">Ventas</span>
  </label>
</CheckboxGroup>;
```

| Pieza | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `CheckboxGroup` | `div` con `role="group"` | Única exportación de `checkbox-group.tsx`. Provee el contexto de selección y deshabilitación. |
| `Checkbox` | `span` con `role="checkbox"` y un input asociado | Opción identificada mediante `value` o control global mediante `parent`. Se importa desde la familia Checkbox. |
| `CheckboxIndicator` | `span` | Indicador visual que se coloca dentro de cada `Checkbox`. Se importa desde la familia Checkbox. |

El consumidor aporta el título, las etiquetas y las casillas mediante `children`. Las casillas pueden estar dentro de etiquetas u otros contenedores, siempre dentro del contexto del grupo. Adapta el alias y usa un ID único si renderizas varias instancias.

## 4. Variantes y tamaños

La raíz carece de props propias de variante y tamaño. Dispone sus hijos en una cuadrícula con `grid gap-2.5`, equivalente a 10 px de separación con la escala base de Tailwind. Las dimensiones de las casillas pertenecen a la familia Checkbox.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CheckboxGroup` | `defaultValue` | `string[]` | `[]` | Sí | Selección inicial en modo no controlado. |
| `CheckboxGroup` | `value` | `string[]` | — | Sí | Selección en modo controlado. Actualízala mediante `onValueChange`. |
| `CheckboxGroup` | `onValueChange` | `(value: string[], details: CheckboxGroupChangeEventDetails) => void` | — | Sí | Recibe la selección propuesta al activar una casilla. `details.event` es el evento nativo, `details.reason` es `"none"` y `details.cancel()` cancela el cambio. Actualizar `value` externamente no dispara el callback. |
| `CheckboxGroup` | `allValues` | `string[]` | — | Sí | Contiene todos los valores de las opciones. Para selección global, úsalo con `value`, `onValueChange` y una casilla con `parent`. |
| `CheckboxGroup` | `disabled` | `boolean` | `false` | Sí | Deshabilita las casillas del grupo, incluida la principal. |
| `CheckboxGroup` | `children` | `ReactNode` | — | Sí | Recibe el contenido del grupo, incluidas las casillas y sus etiquetas. |
| `CheckboxGroup` | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Combina clases adicionales con la cuadrícula base. |
| `CheckboxGroup` | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al contenedor. |
| `CheckboxGroup` | `render` | `ReactElement \| ((props, state) => ReactElement)` | `div` | Sí | Sustituye el nodo conservando sus props, eventos y referencia. |

La API se hereda de Base UI y admite los atributos HTML y ARIA del contenedor. `ref` apunta al nodo del grupo, tipado como `HTMLDivElement` por defecto. `CheckboxGroupChangeEventDetails` y `CheckboxGroupState` se importan desde `@base-ui/react/checkbox-group`. Consulta la [referencia de Checkbox](checkbox.md) para `parent`, `name`, `value` y los atributos de cada casilla.

## 6. Funcionamiento y estados

- Usa `defaultValue` para el estado inicial no controlado o `value` para controlar la selección desde el consumidor. Usa valores únicos y estables por opción. Las casillas identificadas por `value` derivan su selección del grupo. Si falta `value`, Base UI usa `name` como identificador, por lo que debes dar valores explícitos si las opciones comparten nombre.
- Con una casilla `parent`, pasa `allValues` con los identificadores de las opciones y mantén un arreglo `value` controlado que contenga solo esos valores. La casilla principal refleja si están seleccionadas todas, ninguna o solo algunas. Base UI conserva el estado de las opciones deshabilitadas en cambios globales. Si hay una selección parcial previa, el ciclo puede recuperarla después de marcar y desmarcar las opciones.
- En un formulario HTML, el grupo no genera un campo propio. Las casillas marcadas y habilitadas aportan sus valores mediante sus inputs. Usa el mismo `name` en las opciones y lee `FormData.getAll(name)`. La casilla principal se excluye del envío. `uncheckedValue` se aplica a casillas independientes.
- La raíz expone `data-slot="checkbox-group"` y recibe `data-disabled` cuando está deshabilitada. En un `Field.Root` de Base UI también puede recibir `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled` y `data-focused`. Los callbacks de estilo reciben `disabled` y el estado de Field. Cada casilla conserva sus propios atributos de selección.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base | Personalización |
| :--- | :--- | :--- |
| `CheckboxGroup` | Cuadrícula con separación vertical por defecto. Hereda tipografía y color. | Define columnas, ancho y separación con `className` o `style`. Por ejemplo, `className="sm:grid-cols-2"` distribuye opciones en dos columnas y `style={{ gap: "0.5rem" }}` ajusta la distancia. Si el título está dentro, usa `col-span-full` para que ocupe toda la fila. |
| `Checkbox` y `CheckboxIndicator` | Aportan la geometría, el foco, los colores y la transición del indicador. | Ajusta la casilla o el indicador desde sus propias props. Consulta [Checkbox](checkbox.md) para sus estados y estilos. |

La raíz carece de borde, superficie, sombra y animación propios. Puedes darle una superficie con los tokens de [globals.md](../globals.md) o seleccionar su estado mediante `data-disabled`. Los estilos de la raíz se aplican al contenedor y se heredan según las reglas normales de CSS. El consumidor controla la separación respecto del resto de la interfaz.

`className` y `style` admiten una función de estado. El wrapper conserva las clases base con `clsx` y la cascada resuelve utilidades en conflicto. Si usas `render` con una función, propaga las props recibidas, incluidos los estilos, los eventos y `ref`.

## 8. Ejemplos de composición

El [ejemplo básico](#3-importación-y-anatomía) inicializa la selección con `defaultValue`. Para seleccionar todo desde una casilla principal, usa un grupo controlado.

```tsx
"use client";

import { useId, useState } from "react";
import { Checkbox, CheckboxIndicator } from "@/components/own/independant/checkbox";
import { CheckboxGroup } from "@/components/own/independant/checkbox-group";

const allValues = ["ver", "editar"];

export function Permisos() {
  const labelId = useId();
  const [value, setValue] = useState<string[]>(["ver"]);

  return (
    <CheckboxGroup aria-labelledby={labelId} allValues={allValues} value={value} onValueChange={setValue}>
      <p id={labelId}>Permisos de informes</p>
      <label><Checkbox parent><CheckboxIndicator /></Checkbox> Seleccionar todos</label>
      <label><Checkbox value="ver"><CheckboxIndicator /></Checkbox> Ver</label>
      <label><Checkbox value="editar"><CheckboxIndicator /></Checkbox> Editar</label>
    </CheckboxGroup>
  );
}
```

En un formulario, añade `name="permisos"` a las opciones `ver` y `editar`. El manejador de envío puede leer la selección con `new FormData(event.currentTarget).getAll("permisos")`.

## 9. Accesibilidad e integración

- Nombra el grupo con `aria-labelledby` cuando haya un título visible, o con `aria-label`. Da a cada casilla su propia etiqueta. Puedes vincular el texto de la etiqueta al control visible mediante `aria-labelledby` para que su nombre esté disponible desde el HTML inicial. La casilla principal expone `aria-checked="mixed"` cuando la selección es parcial y Base UI vincula las opciones registradas mediante `aria-controls`.
- Tab recorre las casillas habilitadas según el orden del DOM. Espacio activa la casilla enfocada. Mantén el foco visible al personalizar la presentación.
- Si sustituyes el contenedor, conserva `role`, el nombre accesible y la referencia. Define handlers y props funcionales en un módulo cliente de App Router.

## 10. Límites y verificación

Exporta `checkbox-group.tsx` con Base UI 1.9.0, `clsx`, React 19 y Tailwind CSS. Si la composición usa las casillas de own-ui, incluye también su archivo e iconos. Consulta la [estructura de exportación](../structure.md).

Verifica la selección inicial y controlada, el estado mixto, el bloqueo por `disabled`, la activación por teclado y los valores del formulario. Al anidar grupos, coordina los arreglos de selección desde el consumidor. [Documentación de Checkbox Group en Base UI](https://base-ui.com/react/components/checkbox-group).
