# Collapsible

## 1. Identificación

Collapsible envuelve `Root`, `Trigger` y `Panel` de `@base-ui/react/collapsible`. Usa `clsx` para combinar las clases y `Chevron` para indicar visualmente la apertura.

## 2. Propósito y casos de uso

Muestra u oculta un bloque individual desde un activador. Úsalo para detalles secundarios, instrucciones o filtros que pueden permanecer cerrados. Para coordinar varias secciones relacionadas, consulta [Accordion](accordion.md).

## 3. Importación y anatomía

```tsx
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/own/base/collapsible";

<Collapsible>
  <CollapsibleTrigger>Detalles de entrega</CollapsibleTrigger>
  <CollapsiblePanel>El envío tarda de tres a cinco días hábiles.</CollapsiblePanel>
</Collapsible>;
```

| Exportación | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Collapsible` | `div` | Provee el estado compartido de apertura. |
| `CollapsibleTrigger` | `button` | Alterna la apertura e incluye el chevron decorativo. |
| `CollapsiblePanel` | `div` | Muestra el contenido dentro de un contenedor interno con padding. |

Coloca un panel dentro de cada raíz y mantén el activador fuera del panel para poder abrirlo cuando esté cerrado. El consumidor aporta la etiqueta del activador, el contenido y los encabezados que requiera su página.

## 4. Variantes y tamaños

La familia carece de props propias de variante y tamaño. El activador ocupa el ancho disponible y usa padding de `1rem` y un chevron de `1rem` con la escala base de Tailwind. La altura del panel depende de su contenido. La raíz toma su ancho del layout consumidor.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Collapsible` | `defaultOpen` | `boolean` | `false` | Sí | Apertura inicial en modo no controlado. |
| `Collapsible` | `open` | `boolean` | — | Sí | Apertura en modo controlado. Actualízala en `onOpenChange`. |
| `Collapsible` | `onOpenChange` | `(open: boolean, details: CollapsibleRootChangeEventDetails) => void` | — | Sí | Recibe la apertura propuesta. `details.event` contiene el evento nativo, `details.reason` distingue `"trigger-press"` y `"none"`, y `details.cancel()` cancela la solicitud. |
| `Collapsible` | `disabled` | `boolean` | `false` | Sí | Deshabilita el activador por defecto y conserva la apertura actual. |
| `CollapsibleTrigger` | `disabled` | `boolean` | Hereda de la raíz | Sí | Atributo del botón que permite especificar la deshabilitación localmente. |
| `CollapsibleTrigger` | `nativeButton` | `boolean` | `true` | Sí | Usa `false` cuando `render` sustituya el botón por otro elemento. |
| `CollapsiblePanel` | `keepMounted` | `boolean` | `false` | Sí | Conserva el panel en el DOM mientras está cerrado. |
| `CollapsiblePanel` | `hiddenUntilFound` | `boolean` | `false` | Sí | Conserva el panel y permite encontrarlo con la búsqueda nativa en navegadores compatibles. Prevalece sobre `keepMounted`. |
| `CollapsiblePanel` | `id` | `string` | Generado | Sí | Identifica el panel. Base UI enlaza el activador al panel abierto con `aria-controls`. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Aplica clases al nodo de la pieza. El activador y el panel conservan sus clases base. |
| Todas | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo de la pieza. |
| Todas | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Sustituye el elemento y permite conservar sus props, eventos y referencia. |

Las props se heredan de Base UI y del elemento HTML. Las piezas propagan `ref` al nodo visible. El tipo `CollapsibleRootChangeEventDetails` y los tipos de props y estado de cada pieza se importan desde `@base-ui/react/collapsible`.

## 6. Funcionamiento y estados

- Para apertura no controlada, configura el estado inicial con `defaultOpen`. Para controlar el estado desde otro elemento, usa `open` y actualízalo con `onOpenChange`. Un cambio externo de `open` no dispara el callback.
- `onOpenChange` recibe `trigger-press` cuando se activa el botón. La búsqueda de página que revela un panel con `hiddenUntilFound` usa el motivo `none` y el evento `beforematch`. En modo controlado, acepta la apertura solicitada actualizando `open`.
- Por defecto, Base UI desmonta el contenido al terminar el cierre. Con `keepMounted`, el panel permanece en el DOM con `hidden` y conserva el estado local. Con `hiddenUntilFound`, el panel permanece montado y el atributo cambia a `hidden="until-found"` mientras está cerrado.
- `disabled` bloquea la activación mediante el botón que hereda ese estado. El consumidor conserva el control mediante `open` y la búsqueda sigue su flujo cuando está habilitada en el panel.

| Nodo | Slots y atributos |
| :--- | :--- |
| Raíz | `data-slot="collapsible"`, `data-open` o `data-closed`, y `data-starting-style` o `data-ending-style` durante la transición. |
| Activador | `data-slot="collapsible-trigger"`, `aria-expanded`, `aria-controls` al abrir y `data-panel-open` cuando está abierto. Puede recibir los atributos de transición. |
| Panel | `data-slot="collapsible-panel"`, `data-open` o `data-closed`, atributos de transición y `hidden` según su montaje y apertura. |
| Contenedor interno | `data-slot="collapsible-panel-content"`. Recibe el contenido y el padding. |

El estado de las funciones de estilo incluye `open`, `disabled` y `transitionStatus`. `disabled` en ese estado y `data-disabled` reflejan la raíz. Para el estado efectivo del activador, usa `:disabled` o `aria-disabled` según el elemento renderizado.

## 7. Estilos admitidos por pieza

| Pieza | Estilo base | Personalización |
| :--- | :--- | :--- |
| `Collapsible` | Contenedor con los estilos de su elemento HTML. | Define ancho máximo, fondo, borde o separación exterior desde el consumidor. |
| `CollapsibleTrigger` | Ocupa todo el ancho con `rounded-base`, padding de `1rem` y tipografía `text-sm font-semibold`. Usa `gray-bold` para texto y foco y `surface-bold` al pasar el puntero sobre un activador habilitado. La deshabilitación reduce la opacidad. El chevron gira 180° al abrir. | Aplica clases o estilos al botón. Puedes seleccionar su SVG para ajustar el tamaño del chevron y conservar el selector de apertura. Mantén el contorno de foco. |
| `CollapsiblePanel` | Usa `--collapsible-panel-height` y recorta el contenido con `overflow-hidden`. Anima altura y opacidad durante 150 ms. Usa `text-sm` y `gray-bold` con opacidad. | Aplica estilos al panel con cuidado de conservar la medición. Usa el slot `collapsible-panel-content` para ajustar padding horizontal o inferior. |

Los colores de [globals.md](../../globals.md) cambian con el tema. Base UI mide el panel y expone `--collapsible-panel-height` y `--collapsible-panel-width`. La implementación usa la primera y mantiene el padding en el contenedor interno para que el panel pueda colapsar hasta altura cero. Si cambias la animación, conserva los estados de entrada y salida y comprueba cuándo se desmonta el contenido. El panel y el chevron limitan sus transiciones a `motion-safe`.

Al personalizar `hiddenUntilFound`, mantén el panel en el layout con un modo de visualización compatible con la búsqueda del navegador. La raíz acepta `className` y `style` directamente. Las dos piezas estilizadas combinan `className` estático o funcional mediante `clsx`, y la cascada resuelve las utilidades en conflicto. Base UI aplica `style` al nodo indicado.

## 8. Ejemplos de composición

El [ejemplo básico](#3-importación-y-anatomía) se abre y cierra desde el activador. Para controlar el panel y preservar un campo al cerrarlo, combina `open`, `onOpenChange` y `keepMounted` en un módulo cliente.

```tsx
"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/own/base/collapsible";

export function NotaDeEntrega() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Nota de entrega</CollapsibleTrigger>
      <CollapsiblePanel keepMounted>
        <label className="grid gap-2">
          Indicaciones para el reparto
          <input name="indicaciones" />
        </label>
      </CollapsiblePanel>
    </Collapsible>
  );
}
```

Para contenido documental que deba aparecer en la búsqueda de página, usa `hiddenUntilFound` en el panel. Si necesitas que el activador sea un `span`, compón `render={<span />}` con `nativeButton={false}`.

## 9. Accesibilidad e integración

- Da al activador un nombre accesible que identifique el panel. El chevron es decorativo. Tab alcanza el activador habilitado, y Enter o Espacio alternan la apertura.
- Conserva `aria-expanded`, `aria-controls`, el rol, los eventos y la referencia si sustituyes el nodo. En una función `render`, propaga las props recibidas. La semántica de encabezado se añade fuera del botón, por ejemplo con un `h3` que lo contenga.
- Define los handlers y las funciones de estilo en un módulo cliente de App Router. Si el contenido incluye campos de formulario, considera que `keepMounted` conserva esos campos y su participación en el envío mientras están ocultos.

## 10. Límites y verificación

Exporta `collapsible.tsx`, `collapsible.module.css`, el icono `Chevron` y sus archivos de soporte. Usa Base UI 1.9.0, `clsx`, React 19 y Tailwind CSS con los tokens del sistema. Consulta [estructura](../../structure.md) para resolver los imports.

Verifica la apertura por teclado, el montaje por defecto, la persistencia del contenido, ambos temas y el movimiento reducido. Comprueba la búsqueda de un panel cerrado en navegadores compatibles con `hidden="until-found"`. En los demás, el usuario puede abrirlo desde el activador. [Documentación de Collapsible en Base UI](https://base-ui.com/react/components/collapsible).
