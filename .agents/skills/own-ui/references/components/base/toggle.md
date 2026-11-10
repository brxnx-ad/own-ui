# Toggle

## 1. Identificación

Toggle envuelve `@base-ui/react/toggle` y usa `clsx` para combinar las variantes, tamaños y clases de own-ui. [API de Base UI](https://base-ui.com/react/components/toggle)

## 2. Propósito y casos de uso

Mantiene presionado o liberado un botón que activa una herramienta, un formato de texto o un filtro. Usa Button para una acción puntual y Switch para una preferencia presentada como interruptor. Toggle también se puede componer dentro de ToggleGroup de Base UI para coordinar varios botones.

## 3. Importación y anatomía

Adapta el import a la [estructura del consumidor](../../structure.md).

```tsx
import { Toggle } from "@/components/own/base/toggle";

export function PinView() {
  return <Toggle defaultPressed>Fijar vista</Toggle>;
}
```

La familia consta de `Toggle`, que renderiza un `button` con `type="button"` y `aria-pressed`. El consumidor aporta el texto, los iconos o el elemento sustituto. El módulo exporta también `ToggleProps<Value>`, `ToggleVariant`, `ToggleSize`, `ToggleState` y `ToggleChangeEventDetails`.

## 4. Variantes y tamaños

El valor predeterminado es `variant="outline"` con `size="md"`. Ambas variantes tienen borde de 1 px para conservar la geometría al alternar entre ellas.

| Variante | Reposo | Uso |
| :--- | :--- | :--- |
| `outline` | Fondo transparente con borde `gray-base`. | Botones independientes y filtros que requieren un límite visible. |
| `ghost` | Fondo y borde transparentes. | Controles junto a otras herramientas. |

Ambas variantes usan `surface-bold` al pasar el puntero sobre un botón habilitado y liberado. El estado presionado usa `primary-soft`, borde `primary-base` y `shadow-inset-s`.

| Tamaño | Altura mínima con texto | Padding horizontal y vertical | Separación y texto | Con `iconOnly` |
| :--- | :--- | :--- | :--- | :--- |
| `sm` | 32 px | 12 px y 4 px | 6 px, `text-xs` | 32 × 32 px |
| `md` | 40 px | 16 px y 6 px | 8 px, `text-sm` | 40 × 40 px |
| `lg` | 48 px | 24 px y 8 px | 10 px, `text-base` | 48 × 48 px |

Las medidas en píxeles corresponden a la escala predeterminada de Tailwind. Con texto, el alto puede crecer si la etiqueta ocupa más de una línea.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Toggle | `variant` | `ToggleVariant` | `"outline"` | Sí | Prop propia. Elige el tratamiento del borde en reposo. |
| Toggle | `size` | `ToggleSize` | `"md"` | Sí | Prop propia. Controla dimensiones, tipografía y espaciado. |
| Toggle | `iconOnly` | `boolean` | `false` | Sí | Prop propia. Aplica una huella cuadrada al mismo nodo. Aporta un nombre accesible si solo renderizas un icono. |
| Toggle | `pressed` | `boolean` | — | Sí | Prop heredada. Controla el estado de un botón independiente. |
| Toggle | `defaultPressed` | `boolean` | `false` | Sí | Prop heredada. Estado inicial de un botón independiente no controlado. |
| Toggle | `disabled` | `boolean` | `false` | Sí | Impide interacción. Un grupo deshabilitado también deshabilita sus botones. |
| Toggle | `onPressedChange` | `(pressed: boolean, details: ToggleChangeEventDetails) => void` | — | Sí | Recibe el estado propuesto antes de aplicarlo. `details.reason` es `"none"`, `details.event` es el evento original y `details.cancel()` descarta el cambio. |
| Toggle | `value` | `Value extends string` | — | Sí fuera de un grupo | Identificador único y no vacío para ToggleGroup. |
| Toggle | `nativeButton` | `boolean` | `true` | Sí | Usa `false` si `render` produce un elemento distinto de `button`. |
| Toggle | `className` | `string \| ((state: ToggleState) => string \| undefined)` | — | Sí | Añade clases estáticas o calculadas según `pressed` y `disabled`. |
| Toggle | `style` | `React.CSSProperties \| ((state: ToggleState) => React.CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo. |
| Toggle | `render` | `React.ReactElement \| ((props, state: ToggleState) => React.ReactElement)` | `button` | Sí | Sustituye el elemento visible. |
| Toggle | `ref`, `children` y atributos HTML | Según el nodo y los tipos de Base UI | — | Sí | Permiten acceder al elemento, aportar contenido y añadir atributos como `aria-label`. |

## 6. Funcionamiento y estados

- El botón independiente parte de `defaultPressed` en modo no controlado. En modo controlado, el consumidor aplica el valor recibido en `onPressedChange` mediante `pressed`. Mantén el mismo modo durante la vida de la instancia.
- Dentro de ToggleGroup, el grupo determina `pressed` a partir de su selección y del `value` del botón. La deshabilitación del grupo se combina con la del botón. `onPressedChange` se ejecuta antes del cambio del grupo, de modo que `details.cancel()` también puede impedir ese cambio.
- El nodo expone `data-slot="toggle"`, `data-variant` y `data-size`. `data-icon-only` aparece con `iconOnly`. Base UI añade `data-pressed` y `data-disabled` cuando corresponde y mantiene `aria-pressed` como `true` o `false`.
- El estado presionado persiste al soltar el botón. La pseudo-clase `:active` solo controla la compresión durante la interacción. `ToggleState` contiene `pressed` y `disabled`.

## 7. Estilos admitidos por pieza

| Aspecto | Personalización de Toggle |
| :--- | :--- |
| Dimensiones y distribución | Usa `size` e `iconOnly` como primera opción. El nodo se adapta hasta el ancho disponible y permite partir etiquetas largas. El consumidor controla margen y separación exterior. `style={{ width: "100%" }}` permite extender una instancia con texto. |
| Tipografía, geometría e iconos | Usa `font-medium`, `rounded-base` y un borde de 1 px. Los SVG descendientes sin clase `size-*` se ajustan a `1.15em` y conservan su tamaño frente al texto. Aporta un SVG decorativo o el contenido que necesites como hijo. |
| Colores y estados | Usa los tokens de la tabla de variantes y `content-bold` para texto y `gray-bold` para el contorno exterior de foco de 2 px. `data-disabled` reduce la opacidad. En colores forzados, el estado liberado usa `Canvas` y `CanvasText`, el presionado `Highlight` y `HighlightText`, y el deshabilitado liberado `GrayText` en texto y borde. |
| Movimiento | Con movimiento permitido, colores, borde, sombra y escala transicionan durante 150 ms con `ease-out`. `:active` comprime a `0.98`. Con movimiento reducido, el cambio de estado es inmediato. |
| Canales de ajuste | Usa las props propias, `className`, `style` o selectores de `data-slot`, `data-pressed` y `data-disabled`. `className` estático o funcional se combina con `clsx`. Salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada resuelve utilidades en conflicto. `style` actúa sobre el mismo nodo. |

Los tokens se adaptan al tema. La personalización de tokens compartidos se aplica a todas las piezas que los consumen. [globals.css](../../globals.md)

## 8. Ejemplos de composición

Este botón cambia la presentación de una vista. Declara el estado y el handler en un componente cliente.

```tsx
"use client";

import { useState } from "react";
import { Toggle } from "@/components/own/base/toggle";

export function ViewDensity() {
  const [compact, setCompact] = useState(false);

  return (
    <div className="space-y-3">
      <Toggle pressed={compact} onPressedChange={setCompact}>Vista compacta</Toggle>
      <ul className={compact ? "space-y-1" : "space-y-3"}>
        <li>Guía de colores</li>
        <li>Mapa de navegación</li>
      </ul>
    </div>
  );
}
```

Para un botón solo icono, usa `iconOnly`, un `aria-label` estable y el icono decorativo como hijo. Si el icono debe cambiar al presionar, usa un selector sobre `data-pressed` o la función `render` con `state.pressed`.

Para agrupar botones, importa `ToggleGroup` desde `@base-ui/react/toggle-group`, coloca dentro los `Toggle` y proporciona un `value` distinto a cada uno. Un ejemplo de selección inicial es `defaultValue={["bold"]}` para el grupo y `value="bold"` para el botón Negrita. La agrupación sigue siendo una elección del consumidor.

## 9. Accesibilidad e integración

- Tab enfoca un botón habilitado. Enter y Espacio alternan su estado. Mantén la misma etiqueta en ambos estados para que el lector de pantalla pueda anunciarla junto con `aria-pressed`.
- Los botones solo icono necesitan un nombre con `aria-label` o `aria-labelledby`. Marca el icono decorativo con `aria-hidden`. Dentro de ToggleGroup, nombra el grupo y deja que su navegación compuesta gestione el foco con flechas.
- Al sustituir el nodo con `render`, conserva las props, eventos, ref y semántica accesible. Por ejemplo, `<Toggle nativeButton={false} render={<span />}>Marcar revisión</Toggle>` delega el rol de botón y el teclado en Base UI. Los callbacks y refs requieren un módulo cliente en App Router.
- Base UI fija `type="button"` e ignora `type` y `form` pasados directamente. Para enviar el estado como dato de formulario, sincronízalo desde `pressed` con un campo apropiado o léelo al procesar el formulario.

## 10. Límites y verificación

Exporta `toggle.tsx` con Base UI, `clsx` y los tokens y utilidades de Tailwind de own-ui. El consumidor aporta los iconos que use. Los estilos residen en el módulo, por lo que Tailwind debe incluirlo entre sus fuentes.

Verifica clic, teclado, foco visible, cancelación, deshabilitación y la etiqueta accesible. Comprueba el cambio de aspecto en ambos temas, con colores forzados y movimiento reducido. Si se usa dentro de un grupo, verifica la selección compartida y el recorrido con flechas.
