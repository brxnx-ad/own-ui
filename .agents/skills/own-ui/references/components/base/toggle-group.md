# Toggle Group

## 1. Identificación

Toggle Group envuelve `@base-ui/react/toggle-group` y combina sus estilos de distribución con `clsx`. [API de Base UI](https://base-ui.com/react/components/toggle-group)

## 2. Propósito y casos de uso

Comparte la selección y el recorrido de foco entre botones de dos estados. Úsalo para elegir una vista, activar formatos de texto o combinar filtros. La selección única admite liberar el botón activo y dejar el grupo vacío. Cuando una elección sea obligatoria, puedes conservarla mediante validación en `onValueChange` o usar Radio Group si la interfaz representa opciones de formulario.

## 3. Importación y anatomía

Adapta los imports a la [estructura del consumidor](../../structure.md).

```tsx
import { Toggle } from "@/components/own/base/toggle";
import { ToggleGroup } from "@/components/own/base/toggle-group";

export function FileView() {
  return (
    <ToggleGroup aria-label="Vista de archivos" defaultValue={["list"]}>
      <Toggle size="sm" value="list">Lista</Toggle>
      <Toggle size="sm" value="cards">Tarjetas</Toggle>
      <Toggle size="sm" value="table">Tabla</Toggle>
    </ToggleGroup>
  );
}
```

El módulo exporta `ToggleGroup`, que renderiza un `div` con `role="group"` y `data-slot="toggle-group"`, y los tipos `ToggleGroupProps<Value>`, `ToggleGroupState` y `ToggleGroupChangeEventDetails`.

El consumidor coloca los botones como hijos y aporta el nombre del grupo y el de cada opción. Cada botón necesita un `value` único, no vacío y estable. La composición puede usar los botones de own-ui o la primitiva Toggle de Base UI. [Referencia de Toggle](toggle.md)

## 4. Variantes y tamaños

El grupo carece de props propias de variante o tamaño. La raíz usa `orientation="horizontal"` por defecto y coloca los botones en una fila que puede continuar en otra línea. `orientation="vertical"` los apila y estira al ancho de la columna. `multiple` configura la selección. El tamaño y la variante visual se eligen en cada Toggle.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ToggleGroup | `value` | `readonly Value[]` | — | Sí | Selección controlada. Usa `[]` para liberar todos los botones. |
| ToggleGroup | `defaultValue` | `readonly Value[]` | `[]` | Sí | Selección inicial no controlada. |
| ToggleGroup | `onValueChange` | `(next: Value[], details: ToggleGroupChangeEventDetails) => void` | — | Sí | Notifica el arreglo propuesto. `details.cancel()` impide que Base UI aplique el cambio. |
| ToggleGroup | `multiple` | `boolean` | `false` | Sí | Permite seleccionar varios botones. En modo único, suministra hasta un valor. |
| ToggleGroup | `disabled` | `boolean` | `false` | Sí | Deshabilita los botones del grupo. También se puede heredar de Toolbar. |
| ToggleGroup | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Configura la disposición y el eje de navegación cuando el grupo gestiona el foco. |
| ToggleGroup | `loopFocus` | `boolean` | `true` | Sí | Permite que las flechas pasen de un extremo al otro. |
| ToggleGroup | `aria-label`, `aria-labelledby` | `string` | — | Sí | Identifican el conjunto ante las tecnologías de asistencia. |
| ToggleGroup | `className` | `string \| ((state: ToggleGroupState) => string \| undefined)` | — | Sí | Combina clases estáticas o dependientes del estado con la distribución base. |
| ToggleGroup | `style` | `React.CSSProperties \| ((state: ToggleGroupState) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline a la raíz. |
| ToggleGroup | `render` | `React.ReactElement \| ((props, state: ToggleGroupState) => React.ReactElement)` | `div` | Sí | Sustituye la raíz. Conserva rol, eventos, hijos y ref. |
| ToggleGroup | `ref`, `children` y atributos HTML | `React.Ref<HTMLDivElement>`, `React.ReactNode` y atributos del nodo | — | Sí | Dan acceso a la raíz y permiten componer el contenido. |
| Toggle | `value` | `Value extends string` | — | No dentro del grupo | Identifica el botón en el arreglo de selección. |

`Value` extiende `string`. Si el tipo de la selección importa en un callback, explicita la unión completa con `ToggleGroup<Value>` aunque el arreglo inicial contenga un solo valor. `details.event` contiene el evento nativo y `details.reason` es `"none"`.

## 6. Funcionamiento y estados

- En modo no controlado, Base UI parte de `defaultValue`. Con `value`, el consumidor aplica la propuesta recibida en `onValueChange`. Usa arreglos para ambas modalidades y conserva el mismo modo durante la vida de la instancia.
- En modo único, pulsar otro botón sustituye la selección. Volver a pulsar el activo propone `[]`. Con `multiple`, cada pulsación añade o retira solo el valor de su botón. La primitiva conserva el arreglo proporcionado y aplica la regla de selección al interactuar.
- El contexto del grupo tiene prioridad sobre `pressed` y `defaultPressed` en cada botón. La deshabilitación individual se combina con la del grupo y se conserva el estado presionado de una opción deshabilitada.
- `onPressedChange` del botón se ejecuta antes de `onValueChange` del grupo. Cancelar en el botón impide llegar al callback del grupo. Cancelar en el grupo descarta la selección propuesta.
- La raíz expone `data-orientation`, `data-multiple` y `data-disabled` según `ToggleGroupState`. Cada botón mantiene su `aria-pressed` y sus atributos `data-pressed` y `data-disabled`. Si las opciones cambian y hay que retirar selecciones que dejaron de estar disponibles, usa el modo controlado y reconcilia `value` con los hijos actuales.

## 7. Estilos admitidos por pieza

| Aspecto | Personalización |
| :--- | :--- |
| Distribución | El `div` usa `inline-flex`, `min-w-0`, `max-w-full` y `gap-1.5`, equivalente a 6 px con la escala predeterminada. En horizontal permite `flex-wrap` y alinea al centro en el eje transversal. En vertical usa una columna y alinea los hijos al ancho de esa columna. |
| Dimensiones | Ajusta el ancho del grupo o su separación mediante `className`, `style` o el contenedor. Por ejemplo, `style={{ width: "100%", gap: "0.75rem" }}` amplía el grupo y separa las opciones. El margen exterior pertenece al consumidor. |
| Colores, tipografía y foco | La raíz aporta la distribución. El color, la tipografía, el borde, el radio, el foco y los estados de cada botón provienen de Toggle y sus tokens adaptados al tema. [Referencia de Toggle](toggle.md#7-estilos-admitidos-por-pieza) |
| Estados y movimiento | Aplica selectores de `data-slot="toggle-group"`, `data-orientation`, `data-multiple` o `data-disabled` sobre la raíz. Los cambios de disposición son inmediatos y los botones conservan sus propias transiciones y adaptación a movimiento reducido. |
| Canales de ajuste | `className` admite cadena o función y se combina con `clsx`. La cascada resuelve las utilidades en conflicto. `style` estático o funcional actúa en el nodo del grupo. `render` permite cambiar ese nodo conservando sus props. |

## 8. Ejemplos de composición

Este grupo comparte su selección con el resto de la vista. El botón externo vuelve a mostrar todos los elementos al vaciar el arreglo.

```tsx
"use client";

import { useState } from "react";
import { Toggle } from "@/components/own/base/toggle";
import { ToggleGroup } from "@/components/own/base/toggle-group";

type Filter = "pending" | "completed";

const tasks = [
  { name: "Revisar el contraste", status: "pending" },
  { name: "Actualizar los iconos", status: "completed" },
] as const;

export function TaskFilters() {
  const [filters, setFilters] = useState<Filter[]>(["pending"]);
  const visibleTasks = filters.length === 0 ? tasks : tasks.filter(({ status }) => filters.includes(status));

  return (
    <div className="grid justify-items-start gap-3">
      <ToggleGroup<Filter> aria-label="Estado" value={filters} onValueChange={setFilters}>
        <Toggle value="pending">Pendientes</Toggle>
        <Toggle value="completed">Completadas</Toggle>
      </ToggleGroup>
      <ul>{visibleTasks.map(({ name }) => <li key={name}>{name}</li>)}</ul>
      <button type="button" onClick={() => setFilters([])}>Ver todas</button>
    </div>
  );
}
```

Añade `multiple` al grupo cuando los filtros puedan combinarse. Para conservar una opción activa, usa una selección inicial y llama a `details.cancel()` en `onValueChange` cuando `next.length === 0`.

## 9. Accesibilidad e integración

- Identifica el grupo con `aria-label` o `aria-labelledby`. Mantén un nombre estable por botón. Para iconos sin texto, usa un nombre explícito y marca el icono como decorativo.
- Tab entra o sale del conjunto. Las flechas izquierda y derecha recorren el grupo horizontal y arriba y abajo el vertical. Home y End enfocan los extremos habilitados. Enter y Espacio alternan la opción enfocada. Las opciones deshabilitadas se omiten al navegar.
- Dentro de Toolbar de Base UI, la barra gestiona el recorrido de foco y el grupo sigue gestionando la selección.
- Si sustituyes la raíz con `render`, conserva el rol de grupo, los handlers, los hijos y el ref. Los callbacks y refs se definen en módulos cliente de App Router. Para incluir la selección en un formulario, sincroniza el arreglo controlado con un campo adecuado.

## 10. Límites y verificación

Exporta `toggle-group.tsx` con Base UI, `clsx` y utilidades de Tailwind. Incluye `toggle.tsx` si la composición usa los botones de own-ui. Los iconos se eligen en el consumidor y la distribución se genera a partir de las clases del módulo.

Verifica la selección única y múltiple, la cancelación, las opciones deshabilitadas y los extremos de navegación. Comprueba la orientación vertical y la adaptación de las filas al ancho disponible. Revisa los estados de los botones en ambos temas y con colores forzados.
