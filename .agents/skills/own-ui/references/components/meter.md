# Meter

## 1. Identificación

Meter es una familia independiente que envuelve `Root`, `Label`, `Value`, `Track` e `Indicator` de `@base-ui/react/meter` y combina sus clases con `clsx`. [API de Base UI](https://base-ui.com/react/components/meter)

## 2. Propósito y casos de uso

Representa gráficamente una medida escalar estática o acotada dentro de un rango conocido, como uso de almacenamiento, nivel de batería, consumo de cuota, ocupación de memoria o puntuación sobre un máximo fijo. Aporta una etiqueta accesible, la lectura formateada del valor y una barra proporcional al porcentaje entre `min` y `max`.

Para indicar el avance de una operación en curso o una carga con duración indeterminada, usa Progress en lugar de Meter. Cuando el usuario deba modificar el valor arrastrando un pulgar o con el teclado, utiliza Slider o Number Field.

## 3. Importación y anatomía

~~~tsx
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  type MeterIndicatorProps,
  type MeterIndicatorState,
  type MeterLabelProps,
  type MeterLabelState,
  type MeterProps,
  type MeterState,
  type MeterTrackProps,
  type MeterTrackState,
  type MeterValueProps,
  type MeterValueState,
} from "@/components/own/independant/meter";
~~~

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Meter` | `div` con `role="meter"` | Raíz que recibe `value`, `min` y `max`, calcula el porcentaje y expone los atributos ARIA del medidor. |
| `MeterLabel` | `span` con `role="presentation"` | Etiqueta visible cuyo `id` se registra automáticamente en `aria-labelledby` de la raíz. |
| `MeterValue` | `span` con `aria-hidden="true"` | Presenta en pantalla el texto formateado o el nodo devuelto por su función hija. |
| `MeterTrack` | `div` | Pista horizontal que representa el recorrido completo entre `min` y `max`. |
| `MeterIndicator` | `div` | Relleno interior cuyo ancho en línea refleja el porcentaje acotado entre `0%` y `100%`. |

Composición mínima recomendada:

~~~tsx
<Meter value={64}>
  <MeterLabel>Almacenamiento utilizado</MeterLabel>
  <MeterValue />
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>
~~~

El consumidor aporta el valor numérico `value`, el texto de `MeterLabel` (o `aria-label` / `aria-labelledby` en la raíz si prescinde de etiqueta visible) y, opcionalmente, el formato o función de `MeterValue`. `MeterIndicator` se anida dentro de `MeterTrack`; `MeterLabel`, `MeterValue` y `MeterTrack` se colocan como hijos directos de `Meter`.

## 4. Variantes y tamaños

Meter carece de props propias `variant` y `size`. La raíz organiza sus piezas en una cuadrícula de dos columnas (`1fr` y `auto`) que ocupa el `100 %` del ancho disponible (`w-full min-w-0`), con separación horizontal `gap-x-4` (`1rem`) y vertical `gap-y-2` (`0.5rem`). `MeterTrack` ocupa ambas columnas (`col-span-full`) con una altura base de `0.625rem` (`h-2.5`, 10 px). Los colores de umbral y las variaciones de grosor se aplican por instancia mediante `className` o `style`.

## 5. Props y callbacks

Las props de comportamiento provienen de `@base-ui/react/meter`. Own-ui añade las clases del sistema visual, los alias de tipos y el atributo `data-slot` en cada pieza.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Meter` | `value` | `number` | — | No | Valor actual del medidor. Se acota al intervalo `[min, max]` para `aria-valuenow`, el formateo y el ancho del indicador. |
| `Meter` | `min` | `number` | `0` | Sí | Límite inferior del rango asignado a `aria-valuemin`. |
| `Meter` | `max` | `number` | `100` | Sí | Límite superior del rango asignado a `aria-valuemax`. |
| `Meter` | `format` | `Intl.NumberFormatOptions` | `{ style: "percent" }` sobre el porcentaje | Sí | Opciones de `Intl.NumberFormat` aplicadas al valor acotado para generar `formattedValue`. |
| `Meter` | `locale` | `Intl.LocalesArgument` | Configuración regional del entorno | Sí | Configuración regional utilizada por `Intl.NumberFormat`. Fíjala explícitamente cuando el servidor y el cliente de Next.js deban coincidir en SSR. |
| `Meter` | `getAriaValueText` | `(formattedValue: string, value: number) => string` | `formattedValue` | Sí | Callback que construye el texto legible de `aria-valuetext`. Recibe el texto formateado (basado en el valor acotado) y el `value` original. No es cancelable ni recibe un evento DOM. |
| `Meter` | `aria-valuetext` | `string` | Retorno de `getAriaValueText` o `formattedValue` | Sí | Atributo ARIA en la raíz. Si se pasa explícitamente en `Meter`, prevalece sobre el valor calculado por defecto. |
| `Meter` | `aria-label`, `aria-labelledby` | `string` | `id` registrado por `MeterLabel` | Sí | Asignan el nombre accesible cuando no se monta `MeterLabel` o cuando se referencia un encabezado externo. |
| `MeterLabel` | `id` | `string` | ID generado por Base UI | Sí | Identificador del `span` registrado en la raíz para `aria-labelledby`. |
| `MeterLabel` | `children` | `ReactNode` | — | Sí | Nombre visible de la métrica. |
| `MeterValue` | `children` | `null \| ((formattedValue: string, value: number) => ReactNode)` | `formattedValue` | Sí | Render prop opcional para componer la lectura visual. Recibe `formattedValue` (valor acotado formateado) y `value` (valor sin acotar). |
| `MeterTrack` | `children` | `ReactNode` | — | Sí | Recibe `MeterIndicator`. |
| Todas | `className` | `string \| ((state: MeterState) => string \| undefined)` | Clases base de la pieza | Sí | Añade clases estáticas o evaluadas con el estado de la pieza. |
| Todas | `style` | `CSSProperties \| ((state: MeterState) => CSSProperties \| undefined)` | `insetInlineStart: 0`, `height: "inherit"`, `width: "${percentageValue}%"` en `MeterIndicator` | Sí | Aplica estilos en línea al nodo. En `MeterIndicator` se combina con el estilo calculado por Base UI. |
| Todas | `render` | `ReactElement \| ((props, state: MeterState) => ReactElement)` | `div` o `span` según la pieza | Sí | Sustituye el elemento conservando las props, los atributos ARIA, el estilo calculado y la `ref`. |
| Todas | `ref` | `Ref<HTMLDivElement>` o `Ref<HTMLSpanElement>` | — | Sí | Referencia directa al nodo DOM en React 19. Las piezas reenvían además los atributos HTML compatibles con su etiqueta. |

## 6. Funcionamiento y estados

- Meter es un indicador de solo lectura controlado externamente mediante la prop obligatoria `value`; carece de modo no controlado (`defaultValue`), estados de carga, validación de formulario o interacción por teclado.
- En cada render, Base UI calcula el porcentaje `((value - min) * 100) / (max - min)`. Si el resultado o `value` es `NaN`, utiliza `0` para el porcentaje y `min` para `aria-valuenow`. El porcentaje se acota entre `0` y `100` y el valor numérico se acota entre `min` y `max`.
- Sin `format`, `formattedValue` representa el porcentaje (`percentageValue / 100`) formateado con `{ style: "percent" }`. Cuando se proporciona `format`, `Intl.NumberFormat` formatea directamente el valor acotado (`clampedValue`) con esas opciones.
- `MeterLabel` registra su `id` al montarse y lo libera si se desmonta. `Meter` incluye además un `span` oculto visualmente con `role="presentation"` generado por Base UI para asegurar la lectura consistente del nodo `role="meter"` en lectores de pantalla.
- `MeterState` (`MeterRootState` en Base UI 1.9.0) es un objeto vacío `{}` compartido por las cinco piezas; Base UI no emite atributos `data-*` dinámicos de estado en Meter.

| Pieza | `data-slot` | Atributos gestionados en el DOM |
| :--- | :--- | :--- |
| `Meter` | `data-slot="meter"` | `role="meter"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` y `aria-labelledby`. |
| `MeterLabel` | `data-slot="meter-label"` | `id` y `role="presentation"`. |
| `MeterValue` | `data-slot="meter-value"` | `aria-hidden="true"`. |
| `MeterTrack` | `data-slot="meter-track"` | — |
| `MeterIndicator` | `data-slot="meter-indicator"` | `style` en línea con `insetInlineStart: 0`, `height: "inherit"` y `width: "<porcentaje>%"`. |

## 7. Estilos admitidos por pieza

| Aspecto | Cobertura por pieza y alcance de personalización |
| :--- | :--- |
| **Dimensiones y distribución** | `Meter` usa `grid w-full min-w-0 grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2`. `MeterLabel` usa `min-w-0` en la primera columna y `MeterValue` se fija en la segunda con `col-start-2 justify-self-end` incluso si se omite la etiqueta. `MeterTrack` usa `col-span-full h-2.5 w-full overflow-hidden`. `MeterIndicator` usa `block h-full` y recibe su ancho porcentual en línea desde Base UI. El contenedor consumidor define el ancho máximo y los márgenes exteriores. Para cambiar el grosor de la barra en una instancia, aplica `style={{ height: "0.875rem" }}` en `MeterTrack`. |
| **Colores y temas** | `MeterLabel` usa `text-gray-bold` y `MeterValue` usa `text-gray-bold/75`. `MeterTrack` combina `bg-surface-soft` y `border-gray-base` para formar una cavidad neutra. `MeterIndicator` usa `bg-primary-base` por defecto y admite cambiar el relleno por instancia a otras tríadas del sistema (`bg-success-base`, `bg-warning-base`, `bg-error-base` o `bg-info-base`). Todos los tokens se adaptan automáticamente entre modo claro y `.dark`. Modificar las semillas o tríadas en [globals.css](../globals.md) altera todo el sistema; las clases en `MeterIndicator` o `MeterTrack` afectan solo a la instancia. |
| **Tipografía y geometría** | `MeterLabel` y `MeterValue` comparten `.body-sm` (`0.875rem`, `line-height: 1.45`) con `font-medium`. `MeterValue` añade `tabular-nums` y `text-right` para evitar saltos horizontales al actualizar cifras. `MeterTrack` aplica `rounded-base`, `border` (`1px`) y la sombra hundida `shadow-inset-s`, recortando el indicador con `overflow-hidden`. Las piezas no incluyen iconos. |
| **Estados y selectores** | Cada nodo expone su `data-slot` (`[data-slot="meter"]`, `[data-slot="meter-label"]`, `[data-slot="meter-value"]`, `[data-slot="meter-track"]`, `[data-slot="meter-indicator"]`). Si el consumidor necesita estilizar umbrales mediante selectores de datos propios, puede declarar un atributo como `data-status="warning"` en `Meter` y dirigir el indicador con `[[data-status=warning]_&]:bg-warning-base` o pasar la clase directamente a `MeterIndicator`. |
| **Animaciones** | `MeterIndicator` aplica `motion-safe:transition-[width,background-color] motion-safe:duration-150 motion-safe:ease-out`. Al cambiar `value` o la clase de color del indicador, el ancho y el color interpolan durante `150ms`. Con `prefers-reduced-motion: reduce`, el cambio es instantáneo. Si sobrescribes la transición, conserva el prefijo `motion-safe:` o `motion-reduce:transition-none`. |
| **Canales de personalización** | Los cinco wrappers evalúan `className` cuando es una función `(state) => string \| undefined` y concatenan el resultado con las clases base mediante `clsx`. No se utiliza `tailwind-merge`: si dos utilidades de Tailwind compiten sobre la misma propiedad CSS, prevalece el orden en la hoja generada, por lo que para dimensiones puntuales como la altura de `MeterTrack` es preferible `style`. En `MeterIndicator`, evita pasar `width` dentro de `style`, ya que sobrescribiría el porcentaje en línea calculado por Base UI. Al usar `render`, propaga siempre las `props` (que en `MeterIndicator` incluyen el `style` con `width`) y la `ref`. |

## 8. Ejemplos de composición

### Medidor con unidades formateadas y texto accesible detallado

Fija `locale` explícitamente para que el formateo de `Intl.NumberFormat` coincida entre el renderizado en servidor de Next.js y la hidratación en el cliente:

~~~tsx
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/own/independant/meter";

export function StorageQuotaMeter({ usedGb }: { usedGb: number }) {
  return (
    <Meter
      value={usedGb}
      min={0}
      max={500}
      locale="es-AR"
      format={{ style: "unit", unit: "gigabyte", unitDisplay: "short" }}
      getAriaValueText={(formattedValue) => `${formattedValue} de 500 GB en uso`}
    >
      <MeterLabel>Volumen de copias de seguridad</MeterLabel>
      <MeterValue>{(formattedValue) => `${formattedValue} / 500 GB`}</MeterValue>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
~~~

### Umbrales cromáticos dinámicos en un módulo cliente

Cuando la interfaz cambia el color del indicador según el nivel de saturación, acompaña el cambio visual con una descripción equivalente en `getAriaValueText`:

~~~tsx
"use client";

import clsx from "clsx";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/own/independant/meter";

export function MemoryLoadMeter({ loadPercent }: { loadPercent: number }) {
  const toneClass =
    loadPercent >= 90
      ? "bg-error-base"
      : loadPercent >= 70
        ? "bg-warning-base"
        : "bg-success-base";

  return (
    <Meter
      value={loadPercent}
      locale="es-AR"
      getAriaValueText={(formattedValue, value) => {
        const status =
          value >= 90 ? "crítico" : value >= 70 ? "elevado" : "óptimo";
        return `${formattedValue}, nivel ${status}`;
      }}
    >
      <MeterLabel>Carga de memoria del nodo</MeterLabel>
      <MeterValue />
      <MeterTrack>
        <MeterIndicator className={clsx(toneClass)} />
      </MeterTrack>
    </Meter>
  );
}
~~~

## 9. Accesibilidad e integración

- **Nombre accesible obligatorio:** Todo `role="meter"` requiere un nombre accesible. Si incluyes `MeterLabel` dentro de `Meter`, Base UI vincula automáticamente su `id` mediante `aria-labelledby`. Si omites `MeterLabel` (por ejemplo, en una celda de tabla cuyo encabezado ya describe la columna), proporciona `aria-label` o `aria-labelledby` directamente en `Meter`.
- **No depender solo del color:** Si cambias el color de `MeterIndicator` para reflejar niveles de advertencia o error (`bg-warning-base`, `bg-error-base`), incorpora el estado en `getAriaValueText` o en el texto visible de `MeterValue` para que los usuarios de lectores de pantalla reciban la misma información.
- **Teclado y foco:** Meter es un elemento informativo no interactivo y no forma parte de la secuencia de tabulación (`Tab`).
- **Conservación del contrato en `render`:** Si reemplazas `Meter` o `MeterIndicator` mediante `render`, propaga todas las props recibidas para conservar `role="meter"`, los atributos `aria-value*`, el `style` con el ancho porcentual y la `ref`.
- **Hidratación en App Router:** El formateo por defecto usa la configuración regional del entorno de ejecución. En aplicaciones Next.js donde el servidor y el navegador puedan tener configuraciones regionales distintas, especifica la prop `locale` (por ejemplo, `locale="es-AR"`) para evitar discrepancias de hidratación en `MeterValue` y `aria-valuetext`.

## 10. Límites y verificación

- **Dependencias de exportación:** Requiere `components/own/independant/meter.tsx`, `@base-ui/react` 1.9.0, `clsx`, React 19 y los tokens de `globals.css` (`surface-soft`, `gray-base`, `gray-bold`, `primary-base`, `rounded-base`, `shadow-inset-s` y `.body-sm`). No requiere iconos de soporte, portales ni bloques adicionales en `@layer components`. Consulta [structure.md](../structure.md#compatibilidad-y-archivos-necesarios).
- **Alcance de la implementación:** El componente representa un único tramo continuo desde el inicio de la pista (`insetInlineStart: 0`) hasta el porcentaje actual; no incluye marcas de graduación ni múltiples segmentos apilados.
- **Lista de verificación en el consumidor:**
  1. Comprobar que `Meter` tiene un nombre accesible resuelto (`aria-labelledby` hacia `MeterLabel` o `aria-label`).
  2. Verificar que los valores extremos (`value <= min`, `value >= max` y actualizaciones intermedias) acotan el relleno entre `0 %` y `100 %` sin desbordar `MeterTrack`.
  3. Confirmar que `locale` mantiene idéntico el texto entre SSR y cliente, y revisar el contraste en temas claro y oscuro junto con el respeto a `prefers-reduced-motion: reduce`.
