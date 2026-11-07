# Progress

## 1. Identificación

Progress envuelve las cinco piezas de `@base-ui/react/progress`, combina clases con `clsx` y usa un bloque de `globals.css` para animar el estado indeterminado. [API de Base UI](https://base-ui.com/react/components/progress)

## 2. Propósito y casos de uso

Úsalo para indicar el avance de una operación, como una exportación, una transferencia o el procesamiento de registros. Pasa un número cuando conozcas la cantidad completada y `null` mientras la operación esté en curso y su avance se desconozca.

Usa [Meter](meter.md) para mostrar una medición dentro de un rango, como el uso de memoria. Para un indicador pequeño de carga en una acción, puedes usar el estado `loading` de [Button](button.md).

## 3. Importación y anatomía

Resuelve el alias y los archivos exportados según la [referencia de estructura](../structure.md).

```tsx
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/own/independant/progress";
```

| Exportación | Elemento | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Progress` | `div[role="progressbar"]` | `progress` | Define el rango, el avance y su representación accesible. |
| `ProgressLabel` | `span` | `progress-label` | Registra su ID como nombre accesible de la barra. |
| `ProgressValue` | `span` con `aria-hidden` | `progress-value` | Presenta el texto visible. La raíz comunica el valor a tecnologías de asistencia. |
| `ProgressTrack` | `div` | `progress-track` | Define el carril y recorta el indicador. |
| `ProgressIndicator` | `div` | `progress-indicator` | Rellena la proporción del avance o muestra el segmento indeterminado. |

Se exportan `ProgressProps`, `ProgressState`, `ProgressStatus`, `ProgressLabelProps`, `ProgressLabelState`, `ProgressValueProps`, `ProgressValueState`, `ProgressTrackProps`, `ProgressTrackState`, `ProgressIndicatorProps` y `ProgressIndicatorState`.

Dentro de la raíz, coloca la etiqueta y el valor antes del carril. El indicador va dentro del carril. El consumidor aporta el nombre de la tarea y el valor que debe representar.

```tsx
<Progress value={64} locale="es-CL">
  <ProgressLabel>Exportación del informe</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>
```

## 4. Variantes y tamaños

La familia carece de props propias de variante y tamaño. Los tres estados dependen de `value`. La raíz ocupa el ancho disponible y el carril tiene una altura de `0.625rem` con el espaciado predeterminado. Usa el contenedor para limitar el ancho o personaliza el carril para cambiar su altura.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Progress | `value` | `number \| null` | — | No | Avance actual. `null` indica que el avance se desconoce. |
| Progress | `min`, `max` | `number` | `0`, `100` | Sí | Definen el intervalo de avance. Usa límites finitos y `max > min`. |
| Progress | `format` | `Intl.NumberFormatOptions` | Porcentaje del rango | Sí | Cuando se especifica, formatea el valor acotado en la unidad o escala indicada. |
| Progress | `locale` | `Intl.LocalesArgument` | Locale del entorno | Sí | Configura el formato visible y accesible. Fíjalo para obtener un formato consistente en el servidor y el cliente. |
| Progress | `getAriaValueText` | `(formattedValue: string, value: number \| null) => string` | — | Sí | Personaliza el texto accesible. Recibe el valor original y el texto formateado, que es una cadena vacía en estado indeterminado. |
| Progress | `aria-valuetext` | `string` | Texto calculado o devuelto por `getAriaValueText` | Sí | Sobrescribe el texto accesible calculado. |
| Progress | `aria-label`, `aria-labelledby` | `string` | Según `ProgressLabel` | Sí | Nombra la barra si la etiqueta se resuelve fuera de la familia. |
| ProgressValue | `children` | `null \| ((formattedValue: string \| null, value: number \| null) => ReactNode)` | Texto formateado | Sí | Personaliza el valor visible. Recibe el valor original. En estado indeterminado, la función recibe `"indeterminate"` como texto y el render predeterminado queda vacío. |
| Todas | `className`, `style` | `string`, `CSSProperties` o funciones de `ProgressState` | — | Sí | Personaliza el nodo de cada pieza según `status`. |
| Todas | `render`, `ref`, atributos y eventos HTML | Según la pieza | Elemento de anatomía, —, — | Sí | Compone o accede al nodo y añade atributos. Conserva el rol, el nombre y los atributos del avance. |

Los slots y los estilos son de own-ui. La raíz recibe el valor de la aplicación en cada render y Base UI calcula el estado. Actualiza `value` desde la lógica de la tarea.

## 6. Funcionamiento y estados

- Con un valor finito, Base UI lo acota al rango. El ancho del indicador equivale a `(value - min) / (max - min)`, acotado a la proporción de 0 a 1. `aria-valuenow` y el formato de unidades usan el valor acotado. Sin `format`, el texto usa la proporción como porcentaje.
- Con `null` o un valor no finito, Base UI usa el estado indeterminado y omite `aria-valuenow`. Para indicarlo desde el consumidor usa `null`. El texto accesible predeterminado es `"indeterminate progress"`, que puedes localizar mediante `getAriaValueText` o `aria-valuetext`.
- Todas las piezas exponen `data-progressing` cuando hay un valor determinado por debajo del máximo, `data-complete` cuando el valor acotado alcanza el máximo, o `data-indeterminate` si se desconoce. Las funciones de estilos reciben el mismo estado en `status`, de tipo `"progressing" | "complete" | "indeterminate"`.
- Los modos usan las mismas piezas montadas. Los cambios se reflejan al recibir el nuevo valor. El consumidor decide cuándo presentar u ocultar la barra.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base y ajustes |
| :--- | :--- |
| Progress | Cuadrícula de ancho completo con dos columnas, alineación por línea base, `gap-x-4` y `gap-y-2`. Limita su ancho mediante el contenedor o `style`. |
| Label | Texto `body-sm` de peso medio en `gray-bold`. Permite el quiebre de etiquetas largas. |
| Value | Segunda columna con alineación al final, texto `body-sm` en `gray-bold/75` y cifras tabulares. |
| Track | Ocupa ambas columnas. Usa `h-2.5`, `rounded-base`, borde `gray-base`, fondo `surface-soft`, sombra `shadow-inset-s` y recorte del contenido. |
| Indicator | Barra redondeada con `primary-base` durante el avance y `success-base` al completar. Base UI aplica el ancho determinado mediante estilo inline. En estado indeterminado, el ancho es un tercio del carril y el segmento parte centrado. En colores forzados, el indicador usa el color de sistema `Highlight`. |

Los tokens siguen los temas de [globals.css](../globals.md). En modo determinado, el ancho y el color transicionan durante 150 ms con `motion-safe`. En modo indeterminado, `own-ui-progress-sweep` desplaza el segmento de un extremo al otro durante ciclos de 1,4 s y se invierte en RTL. El bloque global activa el barrido cuando se permite el movimiento. Con movimiento reducido queda un segmento centrado y estático. Si cambias el ancho del segmento, ajusta también el recorrido de la animación.

`className` admite una cadena o una función del estado. Los wrappers combinan las clases con `clsx` sin resolver conflictos entre utilidades. `style` admite un objeto o una función y actúa en el nodo correspondiente. Por ejemplo, `<ProgressTrack style={{ height: "0.875rem" }}>` cambia la altura del carril. Conserva el ancho inline del indicador determinado para mantener la proporción. Usa `render` para sustituir un nodo conservando props, refs, eventos y semántica.

## 8. Ejemplos de composición

Vista que pasa de una duración desconocida a un número de páginas procesadas. El consumidor entrega el avance desde su tarea.

```tsx
"use client";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/own/independant/progress";

export function ConversionProgress({ processed, total }: {
  processed: number | null;
  total: number;
}) {
  return (
    <Progress
      value={processed}
      max={total}
      locale="es-CL"
      format={{ style: "decimal" }}
      getAriaValueText={(formatted, value) => value === null
        ? "Estimando el avance"
        : `${formatted} de ${total} páginas convertidas`}
    >
      <ProgressLabel>Conversión del documento</ProgressLabel>
      <ProgressValue>{(formatted, value) => value === null ? "Calculando…" : `${formatted} de ${total}`}</ProgressValue>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
```

Pasa un `total` positivo. Si la etiqueta ya existe fuera de la barra, puedes usar `aria-labelledby` en la raíz apuntando al ID de esa etiqueta y omitir `ProgressLabel`.

## 9. Accesibilidad e integración

- Nombra la barra con `ProgressLabel`, una etiqueta externa referenciada o `aria-label`. Deja que la raíz calcule `aria-valuemin`, `aria-valuemax` y `aria-valuenow`.
- Usa `getAriaValueText` cuando las unidades, el contexto o la fase de la tarea ayuden a interpretar el valor. `ProgressValue` personaliza el texto visible y se mantiene fuera del árbol accesible para evitar duplicarlo.
- Coloca los botones de inicio, cancelación o reinicio fuera de la barra. Si la tarea carga una región, puedes marcar esa región con `aria-busy` mientras esté en curso y asociarla a la barra con `aria-describedby`.
- Al usar `render`, conserva el rol de la raíz, el nombre, los valores ARIA y los estilos de tamaño de cada pieza.

## 10. Límites y verificación

Exporta `progress.tsx` con los tokens y el bloque `own-ui-progress-sweep` en `@layer components` de [globals.css](../globals.md). El bloque incluye el selector que respeta la preferencia de movimiento. El componente es independiente. Coloca el estado y las funciones de formato personalizadas en una frontera cliente de App Router.

Comprueba el nombre accesible, el valor mínimo, un valor intermedio, el máximo y el paso entre `null` y un número. Verifica que el formato y el ancho correspondan al rango, y prueba ambos temas, colores forzados, RTL y movimiento reducido. Comprueba el quiebre de texto a anchos pequeños.
