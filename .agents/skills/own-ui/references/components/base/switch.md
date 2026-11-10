# Switch

## 1. Identificación

Switch envuelve `Root` y `Thumb` de `@base-ui/react/switch` y combina sus clases con `clsx`. [API de Base UI](https://base-ui.com/react/components/switch)

## 2. Propósito y casos de uso

Activa o desactiva una preferencia, como las notificaciones o la sincronización. Para marcar elementos de una lista o representar un estado parcial, usa Checkbox. Mantén la misma etiqueta en ambos estados para que el nombre identifique la preferencia y el estado comunique si está activa.

## 3. Importación y anatomía

Adapta el import a la [estructura del proyecto consumidor](../../structure.md).

```tsx
import { Switch, SwitchThumb } from "@/components/own/base/switch";

export function NotificationSetting() {
  return (
    <label className="body-sm flex cursor-pointer items-center justify-between gap-4">
      Notificaciones
      <Switch defaultChecked>
        <SwitchThumb />
      </Switch>
    </label>
  );
}
```

| Exportación | Nodo predeterminado | `data-slot` | Responsabilidad |
| :--- | :--- | :--- | :--- |
| `Switch` | `span[role="switch"]` y un `input[type="checkbox"]` visualmente oculto como hermano | `switch` en el nodo visible | Coordina el foco, el estado y la integración con formularios. |
| `SwitchThumb` | `span[aria-hidden="true"]` | `switch-thumb` | Se coloca dentro de Switch e indica visualmente el estado con su posición. |

El consumidor aporta la etiqueta y monta `SwitchThumb` dentro de `Switch`. El módulo exporta también `SwitchProps`, `SwitchState`, `SwitchChangeEventDetails`, `SwitchThumbProps` y `SwitchThumbState`.

## 4. Variantes y tamaños

La familia no define props propias de variante o tamaño. La pista mide `w-11` × `h-6` (44 × 24 px con la escala predeterminada de Tailwind). El indicador mide 16 px y queda a 3 px del borde interior en el eje horizontal. `checked` y `defaultChecked` determinan el estado funcional.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Switch | `checked` | `boolean` | — | Sí | Controla si la preferencia está activa. Usa `onCheckedChange` para aplicar los cambios del usuario. |
| Switch | `defaultChecked` | `boolean` | `false` | Sí | Estado inicial en modo no controlado. |
| Switch | `onCheckedChange` | `(checked: boolean, details: SwitchChangeEventDetails) => void` | — | Sí | Recibe el estado propuesto. `details.reason` es `"none"`, `details.event` contiene el evento original y `details.cancel()` descarta el cambio interno. |
| Switch | `disabled` | `boolean` | `false` | Sí | Impide la interacción, excluye el campo del envío y lo saca del orden de tabulación. También se hereda de Field. |
| Switch | `readOnly` | `boolean` | `false` | Sí | Impide los cambios del usuario y conserva el foco y el envío. |
| Switch | `required` | `boolean` | `false` | Sí | Exige que el campo esté encendido para validar el formulario. |
| Switch | `name`, `form` | `string` | — | Sí | Nombre enviado e id del formulario propietario si el campo está fuera de él. El nombre de Field tiene prioridad cuando está definido. |
| Switch | `value` | `string` | `"on"` al enviar | Sí | Valor enviado si el interruptor está encendido. |
| Switch | `uncheckedValue` | `string` | — | Sí | Valor enviado si está apagado. Requiere `name`. Si se omite, el campo apagado queda fuera de `FormData`. |
| Switch | `nativeButton` | `boolean` | `false` | Sí | Usa `true` cuando `render` produzca un botón nativo. |
| Switch | `id` | `string` | Generado | Sí | Se aplica al input de tipo checkbox o, con `nativeButton`, al nodo raíz. |
| Switch | `inputRef` | `React.Ref<HTMLInputElement>` | — | Sí | Referencia al input de tipo checkbox. `ref` apunta al control visible. |
| Ambas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Añade clases a la pieza. El estado es `SwitchState` o `SwitchThumbState`. |
| Ambas | `style` | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo visible de la pieza. |
| Ambas | `render` | `React.ReactElement \| ((props, state) => React.ReactElement)` | `span` | Sí | Sustituye el nodo visible. Conserva las props y los hijos que recibe la pieza. |
| Ambas | `ref`, atributos y eventos HTML | Según el nodo y los tipos de Base UI | — | Sí | Accede al nodo o añade atributos, como `aria-label` o `aria-labelledby` en Switch. |

## 6. Funcionamiento y estados

- Base UI mantiene el estado a partir de `defaultChecked` o lo lee de `checked`. En modo controlado, aplica el estado propuesto dentro de `onCheckedChange` para reflejar la interacción. Mantén el mismo modo durante la vida de la instancia.
- El nodo visible recibe `role="switch"` y `aria-checked`. El input checkbox queda fuera del árbol de accesibilidad y del orden de tabulación. El input se usa para la validación y el envío. Cuando está apagado y recibe `name` y `uncheckedValue`, Base UI monta un input adicional de tipo `hidden` con ese valor.
- Tanto `switch` como `switch-thumb` exponen `data-checked` o `data-unchecked`, además de `data-disabled`, `data-readonly` y `data-required` cuando corresponde. Con Field también se exponen `data-valid`, `data-invalid`, `data-touched`, `data-dirty`, `data-filled` y `data-focused`. `SwitchState` y `SwitchThumbState` incluyen `checked`, `disabled`, `readOnly` y `required` junto con el estado de Field.
- El indicador permanece montado y se desplaza mediante `inset-inline-start` al cambiar de estado.

## 7. Estilos admitidos por pieza

| Pieza | Dimensiones y personalización |
| :--- | :--- |
| Switch | Pista de radio completo y borde de 1 px. Apagada usa `surface-bold` con borde `gray-bold/70`. Encendida usa `primary-base` para el fondo y el borde. Cuando admite interacción, el fondo cambia a `surface-soft` o `primary-bold` al pasar el puntero. El foco visible usa un contorno `gray-bold` de 2 px. `data-invalid` o `aria-invalid="true"` cambian el borde y el contorno a `error-base`. El estado deshabilitado reduce la opacidad y solo lectura conserva los colores de reposo. |
| SwitchThumb | Círculo con `shadow-s`. Apagado usa `gray-bold`. Encendido usa `surface-bold` en claro y `gray-bold` en oscuro para contrastar con la pista. Ajusta su radio o fondo en `switch-thumb`. Mantén el posicionamiento absoluto para que siga el recorrido. |

La familia carece de tipografía propia. Coloca la etiqueta y su separación exterior en el consumidor. Para modificar el tamaño, ajusta el ancho y el alto de Switch junto con `--switch-thumb-size` y `--switch-thumb-inset` en el mismo nodo. La posición encendida se calcula restando el tamaño y el margen interior del indicador al ancho interno de la pista. Por ejemplo, `style={{ width: 52, height: 28, "--switch-thumb-size": "20px" } as React.CSSProperties}` amplía la pista y el indicador sin fijar un desplazamiento manual.

Con colores forzados, la pista usa `Canvas` o `Highlight` y el indicador usa `CanvasText` o `HighlightText`. El contorno usa `Highlight`. En estado deshabilitado el borde y el indicador usan `GrayText` y la opacidad se conserva completa. En ambos temas, los tokens normales siguen la configuración de [globals.css](../../globals.md).

Con `motion-safe`, la pista transiciona sus colores durante 150 ms. El indicador transiciona la posición y el fondo durante 150 ms con `ease-out`. Con movimiento reducido, ambos cambios son inmediatos.

Usa `data-slot` junto con los atributos de estado para seleccionar la pieza. Las clases estáticas o funcionales se combinan con `clsx`. Salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada resuelve las utilidades en conflicto. `style` actúa sobre la pieza visible y un estilo inline incondicional puede prevalecer sobre los colores de estado.

## 8. Ejemplos de composición

Esta composición deja la etiqueta fuera del control. El id se asigna al botón nativo, por lo que `htmlFor` apunta a ese botón.

```tsx
import { Switch, SwitchThumb } from "@/components/own/base/switch";

export function SoundSetting() {
  return (
    <div className="body-sm flex items-center justify-between gap-4">
      <label htmlFor="interface-sounds">Sonidos de la interfaz</label>
      <Switch id="interface-sounds" nativeButton render={<button type="button" />}>
        <SwitchThumb />
      </Switch>
    </div>
  );
}
```

Para controlar la preferencia, declara `const [enabled, setEnabled] = useState(false)` en un componente cliente y pasa `checked={enabled}` y `onCheckedChange={setEnabled}`. Conserva la etiqueta y el indicador del ejemplo de anatomía.

Dentro de un formulario, `name="availability" value="available" uncheckedValue="all"` permite leer ambos estados con `FormData.get("availability")`. Para validar un requisito con las piezas de own-ui, coloca Switch dentro de Field, asígnale `required` y utiliza `FieldError match="valueMissing"` en Form.

## 9. Accesibilidad e integración

- Tab enfoca el control habilitado. Espacio y Enter alternan el estado mediante el comportamiento de Base UI. En solo lectura, el control conserva el foco y expone `aria-readonly`. `disabled` impide la interacción y el envío.
- Usa un `<label>` envolvente, FieldLabel, `aria-label` o `aria-labelledby`. Base UI resuelve la etiqueta envolvente del `span` durante la hidratación. Para que el control visible tenga nombre desde el HTML inicial, proporciona `aria-labelledby` apuntando a texto visible o un `aria-label` explícito.
- Con botón nativo y etiqueta hermana, vincula `id` y `htmlFor`. Para envolver un botón nativo con una etiqueta, usa la forma funcional de `render` y devuelve `<label><button {...props} />Texto</label>` desde el callback, de modo que el input de formulario quede fuera de la etiqueta.
- Si sustituyes una pieza mediante `render`, conserva las props, eventos, refs y contenido recibidos. Mantén los callbacks y refs en un componente cliente de App Router. El indicador es decorativo y debe permanecer fuera de la navegación por teclado.

## 10. Límites y verificación

Exporta `switch.tsx` con Base UI, `clsx` y la configuración común de Tailwind de own-ui. La familia no requiere iconos ni un bloque propio de `globals.css`. Comprueba que Tailwind genere sus selectores de estado, colores forzados y movimiento reducido.

Verifica el cambio con etiqueta, clic y teclado, el foco visible y ambos temas. Comprueba también solo lectura, deshabilitación y los valores de `FormData` con el interruptor encendido y apagado.
