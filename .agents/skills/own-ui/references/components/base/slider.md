# Slider

## 1. Identificación

Slider envuelve las siete piezas de `@base-ui/react/slider` y combina sus estilos con `clsx`. [API de Base UI](https://base-ui.com/react/components/slider)

## 2. Propósito y casos de uso

Permite ajustar un número o un intervalo dentro de límites conocidos con el puntero o el teclado. Úsalo para el volumen, el brillo, el zoom o los extremos de un filtro. Si la tarea exige introducir una cifra exacta o fuera de un recorrido acotado, considera Number Field.

## 3. Importación y anatomía

Adapta los imports a la [estructura del consumidor](../../structure.md).

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/own/base/slider";

export function Volume() {
  return (
    <Slider defaultValue={60} locale="es-CL" format={{ style: "unit", unit: "percent" }}>
      <SliderLabel>Volumen</SliderLabel>
      <SliderValue />
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb />
        </SliderTrack>
      </SliderControl>
    </Slider>
  );
}
```

| Exportación | Nodo predeterminado | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Slider` | `div` | `slider` | Agrupa las piezas y coordina el valor, los límites y la interacción. |
| `SliderLabel` | `div` | `slider-label` | Etiqueta visible asociada a los inputs de los controles. |
| `SliderValue` | `output` | `slider-value` | Muestra el valor o el intervalo formateado. |
| `SliderControl` | `div` | `slider-control` | Área que recibe pulsaciones y arrastre. |
| `SliderTrack` | `div` | `slider-track` | Pista que representa el recorrido completo y da contexto de posición a sus hijos. |
| `SliderIndicator` | `div` | `slider-indicator` | Segmento entre el mínimo y el valor actual, o entre los extremos de un intervalo. |
| `SliderThumb` | `div` con `input[type="range"]` interno | `slider-thumb` | Control visible e input que recibe foco, gestiona el teclado y participa en el envío de formularios. |

Monta `SliderTrack` dentro de `SliderControl` y coloca el indicador y un `SliderThumb` por valor dentro de la pista. El consumidor aporta las etiquetas, los límites y, si las necesita, las marcas. `SliderValue` es opcional. Si omites `SliderLabel`, proporciona un nombre accesible en cada control.

El módulo exporta `SliderProps<Value>`, `SliderState`, `SliderChangeEventDetails`, `SliderCommitEventDetails` y los tipos de props `SliderLabelProps`, `SliderValueProps`, `SliderControlProps`, `SliderTrackProps`, `SliderIndicatorProps` y `SliderThumbProps`.

## 4. Variantes y tamaños

La familia no define props propias de variante o tamaño. `orientation` es una opción funcional heredada, horizontal por defecto.

| Orientación | Área interactiva | Pista |
| :--- | :--- | :--- |
| `"horizontal"` | Ancho disponible y altura `h-10` (40 px). | Ancho completo y altura `h-2` (8 px). |
| `"vertical"` | Altura `h-48` (192 px) y ancho `w-10` (40 px). | Altura completa y ancho `w-2` (8 px). |

Cada control visible mide `size-6` (24 px). Las equivalencias en píxeles corresponden a la escala y tamaño de fuente raíz predeterminados.

## 5. Props y callbacks

`Value` es `number` para un control y un arreglo de números para varios. Conserva el mismo modo durante la vida de la instancia.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slider | `value` | `Value` | — | Sí | Valor controlado. Con un arreglo, aporta un control por posición. |
| Slider | `defaultValue` | `Value` | `min` | Sí | Valor inicial en modo no controlado. |
| Slider | `min`, `max` | `number` | `0`, `100` | Sí | Límites inclusivos. Usa `min < max`. |
| Slider | `step`, `largeStep` | `number` | `1`, `10` | Sí | Paso desde `min` y salto grande de teclado. Admite incrementos decimales. Elige un `step` positivo que divida el rango para alcanzar ambos extremos con pasos completos. |
| Slider | `minStepsBetweenValues` | `number` | `0` | Sí | Separación mínima entre valores adyacentes, calculada como `step * minStepsBetweenValues`. |
| Slider | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sí | Configura el eje visual, la interacción y `aria-orientation`. |
| Slider | `thumbAlignment` | `"center" \| "edge" \| "edge-client-only"` | `"center"` | Sí | Alinea el centro o el borde exterior del control al llegar a un extremo. `edge-client-only` espera a la hidratación para posicionar el control. |
| Slider | `thumbCollisionBehavior` | `"push" \| "swap" \| "none"` | `"push"` | Sí | Al arrastrar, `push` desplaza al vecino, `swap` transfiere el arrastre al vecino y `none` detiene el control activo en el límite. |
| Slider | `disabled` | `boolean` | `false` | Sí | Deshabilita todos los inputs. También se hereda de Field. |
| Slider | `name`, `form` | `string` | — | Sí | Nombre compartido por los inputs e id del formulario propietario si está fuera de él. Field aporta su `name` cuando está definido. |
| Slider | `format`, `locale` | `Intl.NumberFormatOptions`, `Intl.LocalesArgument` | —, locale del entorno | Sí | Formato visible y texto accesible predeterminado. Configura el locale explícitamente si necesitas consistencia entre servidor y cliente. |
| Slider | `onValueChange` | `(value: Value, details: SliderChangeEventDetails) => void` | — | Sí | Se ejecuta al proponer un valor distinto. Incluye `details.activeThumbIndex` y permite `details.cancel()`. |
| Slider | `onValueCommitted` | `(value: Value, details: SliderCommitEventDetails) => void` | — | Sí | Se ejecuta al confirmar un cambio efectivo, por ejemplo al soltar el puntero o tras un ajuste de teclado. Recibe un evento genérico sin método de cancelación. |
| Value | `children` | `null \| ((formattedValues: readonly string[], values: readonly number[]) => React.ReactNode)` | Valores formateados unidos por ` – ` | Sí | Personaliza el texto o el contenido del `output`. |
| Value | `aria-live` | `"off" \| "polite" \| "assertive"` | `"off"` | Sí | Configura el anuncio de cambios del `output`. |
| Thumb | `index` | `number` | Derivado | Sí | Índice del valor asociado. Es necesario en cada control para SSR con varios valores. |
| Thumb | `disabled` | `boolean` | `false` | Sí | Deshabilita ese input. La deshabilitación de la raíz también se aplica. |
| Thumb | `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-valuetext` | `string` | Derivados según la prop | Sí | Configuran el input. Sin un nombre explícito, Base UI utiliza la etiqueta asociada. |
| Thumb | `getAriaLabel` | `null \| ((index: number) => string)` | — | Sí | Calcula `aria-label` y tiene prioridad sobre la prop del mismo nombre. |
| Thumb | `getAriaValueText` | `null \| ((formattedValue: string, value: number, index: number) => string)` | — | Sí | Genera `aria-valuetext` con prioridad sobre el atributo directo. |
| Thumb | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Accede al input. El `ref` de Thumb apunta al `div`. |
| Thumb | `tabIndex`, `onFocus`, `onBlur`, `onKeyDown` | `number` y handlers de React para `HTMLInputElement` | — | Sí | Atributo y eventos reenviados al input. Conserva la gestión de teclado de Base UI al añadir handlers. |
| Todas | `className` | `string \| ((state: SliderState) => string \| undefined)` | — | Sí | Añade clases estáticas o calculadas. |
| Todas | `style` | `React.CSSProperties \| ((state: SliderState) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo de la pieza. |
| Todas | `render` | `React.ReactElement \| ((props, state: SliderState) => React.ReactElement)` | Nodo de la pieza | Sí | Cambia el elemento renderizado y permite conservar las props de Base UI. |
| Todas | `ref` y atributos HTML | Ref y atributos del nodo | — | Sí | Accede al `div` o al `output`. Base UI gestiona el id de Label a partir del id de Slider. |

Los callbacks heredados informan `input-change`, `track-press`, `drag`, `keyboard` o `none` mediante `details.reason`. `onValueChange` también expone el valor y el nombre del campo en `details.event.target`. Si el consumidor cancela el cambio, Base UI descarta la propuesta.

## 6. Funcionamiento y estados

- En modo no controlado, Base UI parte de `defaultValue` o de `min`. Con `value`, actualiza la prop en `onValueChange` para reflejar el ajuste. Mantén los valores iniciales dentro del rango y respeta la separación configurada.
- Pulsar la pista mueve el control disponible más cercano. `thumbCollisionBehavior` actúa con el puntero. Con teclado, Base UI ajusta el valor del control enfocado y comprueba la separación mínima.
- `SliderState` expone `values`, `activeThumbIndex`, `disabled`, `dragging`, `orientation`, `min`, `max`, `step`, `minStepsBetweenValues` y el estado de Field. Las piezas incluyen `data-orientation`, `data-disabled` y `data-dragging` según su estado. Thumb añade `data-index` al nodo visible. Con Field se exponen también `data-valid`, `data-invalid`, `data-touched`, `data-dirty` y `data-focused` cuando corresponda.
- Las piezas se montan dentro de la raíz. Para varios valores, asigna `index` según el orden de cada valor. Con `thumbAlignment="edge"`, Base UI mide los controles y prepara su posición con un script de prehidratación. `"edge-client-only"` difiere esa medición al cliente.

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones, apariencia y personalización |
| :--- | :--- |
| Slider | Rejilla de dos columnas con etiqueta y valor en la primera fila cuando se componen juntos. Limita el ancho o decide el margen exterior desde el consumidor. Conserva espacio para que los controles centrados en los extremos puedan sobresalir. |
| Label | Usa `body-sm`, peso medio y `gray-bold`. Ajusta el texto o su alineación en el nodo de la etiqueta. |
| Value | Usa `body-sm`, peso medio, `gray-bold/75` y cifras tabulares. Ocupa la segunda columna y se alinea al final. Puedes sustituir el formato mediante `children`. |
| Control | Ocupa ambas columnas. Sus dimensiones definen el área interactiva y el recorrido. Para un control vertical más alto, usa por ejemplo `style={{ height: "16rem" }}`. Conserva el gesto táctil en su eje. Cuando se deshabilita, reduce la opacidad del área interactiva. |
| Track | Usa `gray-base`, radio completo y `shadow-inset-s`. Mantén su posición relativa y evita recortar los controles y sus contornos de foco. Si ajustas el grosor, conserva el ancho o alto completo en el eje de recorrido. |
| Indicator | Usa `primary-base` o `error-base` con `data-invalid`. Base UI calcula su largo y posición en función del valor y del eje. Conserva la geometría inline y cambia el color o radio en el nodo del indicador. |
| Thumb | Usa `surface-bold`, borde `primary-base` de 2 px, radio completo y `shadow-s`. Con `data-invalid` cambia el borde a `error-base`. El contorno exterior y el estilo deshabilitado dependen de `:focus-visible` y `:disabled` en el input interno. Así, cada control puede reflejar su propia deshabilitación. Puedes ajustar el diámetro sin reemplazar la posición, el desplazamiento o el `z-index` que calcula Base UI. |

Los tokens se adaptan al tema. Con colores forzados, Track usa `CanvasText`, Indicator usa `Highlight`, Thumb combina `Canvas` y `CanvasText` y el contorno de foco usa `Highlight`. Las piezas deshabilitadas usan `GrayText` en la pista, el segmento y el borde. Cambiar [los tokens globales](../../globals.md) afecta a las demás piezas que los consumen.

Las clases estáticas y funcionales se combinan con `clsx`. Las utilidades en conflicto se resuelven por cascada. Usa los selectores `data-slot` y `data-orientation` para ajustes localizados. Evita sobrescribir las variables de posición de Base UI, incluida `--position` en Thumb y `--start-position` y `--relative-size` en Indicator cuando se usa alineación al borde. El valor se refleja de inmediato. Si añades transiciones propias, conserva la respuesta directa durante el arrastre y respeta `prefers-reduced-motion`.

## 8. Ejemplos de composición

El siguiente intervalo usa dos nombres accesibles. El formulario consumidor puede recuperar los dos valores mediante `FormData.getAll("presupuesto")`.

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/own/base/slider";

export function BudgetRange() {
  return (
    <Slider
      name="presupuesto"
      defaultValue={[20000, 65000]}
      max={100000}
      step={5000}
      minStepsBetweenValues={2}
      thumbCollisionBehavior="none"
      locale="es-CL"
      format={{ style: "currency", currency: "CLP" }}
    >
      <SliderLabel>Presupuesto</SliderLabel>
      <SliderValue />
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb index={0} aria-label="Presupuesto mínimo" />
          <SliderThumb index={1} aria-label="Presupuesto máximo" />
        </SliderTrack>
      </SliderControl>
    </Slider>
  );
}
```

Para un ajuste controlado, declara `const [value, setValue] = useState(60)` en un componente cliente y reemplaza `defaultValue={60}` del ejemplo de volumen por `value={value}` y `onValueChange={setValue}`. Puedes aplicar un ajuste externo con el mismo setter.

Para añadir marcas, colócalas dentro de Track a un porcentaje `(valor - min) / (max - min) * 100` del recorrido. Usa `aria-hidden` para marcas visuales y elige un `step` que coincida con ellas si quieres que el valor se ajuste a las marcas.

## 9. Accesibilidad e integración

- Tab recorre cada input habilitado. Las flechas ajustan por `step`. `Page Up`, `Page Down` y `Shift` con flechas usan `largeStep`. `Home` y `End` mueven a los límites disponibles, teniendo en cuenta los controles vecinos. En vertical, la flecha arriba aumenta el valor.
- Usa Label para nombrar un control único y nombres distintos para los controles de rango. Base UI registra Label al hidratar. Para que el input tenga nombre en el HTML inicial, pasa `aria-label` o `aria-labelledby` directamente a Thumb. Puedes añadir un texto de unidad con `getAriaValueText` si el número formateado necesita contexto. El contorno de foco se dibuja en el `div` de Thumb y el foco real está en el input.
- Los inputs habilitados con `name` se envían con el formulario. En un rango cada input usa el mismo nombre. Puedes componer Slider con Field para compartir etiqueta, estado inválido y deshabilitación.
- Al usar `render`, conserva las props, los eventos, el ref y los hijos que Base UI proporciona, en especial el input interno de Thumb. Define callbacks, refs y personalización funcional en módulos cliente de App Router.

## 10. Límites y verificación

Exporta `slider.tsx` con Base UI, `clsx` y los tokens de Tailwind de own-ui. No requiere iconos ni un bloque propio en `globals.css`. Tailwind debe detectar las clases del módulo, incluidas las de orientación, foco y colores forzados.

Verifica el ajuste con teclado y puntero, los extremos en ambos ejes, la separación del rango, el foco visible y el envío con `FormData`. Comprueba los temas claro y oscuro, el ancho móvil y la ausencia de recorte en los controles y sus contornos.
