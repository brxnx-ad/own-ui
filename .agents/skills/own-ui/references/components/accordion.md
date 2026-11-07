# Accordion

Lee esta referencia al crear, consumir o ajustar paneles expandibles, su estado o su presentación en own-ui.

El módulo convencional es `components/own/independant/accordion.tsx`. Localiza su archivo y resuelve los imports de los ejemplos en el proyecto consumidor mediante [estructura](../structure.md); comprueba las piezas y los tipos de la implementación distribuida.

## Compatibilidad y archivos necesarios

Este contrato se comprobó en Next.js 16.4.5 con React y React DOM 19.3, Base UI 1.9.0, `clsx` 2.1.1, Tailwind CSS v4 y tipos de React 19. Son versiones de referencia, no una obligación de fijarlas exactamente en todo proyecto consumidor; valida las versiones compatibles del destino. Los wrappers usan refs como props de React 19.

Exporta `accordion.tsx` junto con Chevron y el helper SVG `Icon` que utiliza, actualmente definidos en `icons/index.tsx`, y la configuración de [globals](../globals.md). Si conservas ese barrel completo, incluye también `spinner.tsx`, que se reexporta desde él aunque Accordion no renderice Spinner. Otra opción es distribuir un módulo reducido de Chevron e Icon y adaptar el import de Accordion para resolverlo.

En App Router, conserva `"use client"` en el módulo de la familia. Una página o layout puede permanecer en servidor y componer sus piezas; cuando el consumidor añade handlers o estado controlado, aísla esa lógica en un componente cliente en lugar de convertir toda la página.

## Propósito y casos de uso

Accordion organiza secciones relacionadas que pueden expandirse. Es adecuado para preguntas frecuentes, opciones progresivas o detalles secundarios. El contenido cerrado se oculta según la configuración de montaje y búsqueda; evita depender de que siempre sea visible para explicar una acción esencial.

Es independiente: sus cinco piezas envuelven la familia `@base-ui/react/accordion`. El Chevron de `own/icons` es soporte compartido. Que un ejemplo añada Button como control externo no introduce esa dependencia dentro de Accordion; ver [estructura](../structure.md).

## Import y anatomía

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/own/independant/accordion";

<Accordion defaultValue={["details"]}>
  <AccordionItem value="details">
    <AccordionHeader>
      <AccordionTrigger>Detalles del proyecto</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>Contenido expandible.</AccordionPanel>
  </AccordionItem>
</Accordion>
```

| Pieza | Elemento base | Responsabilidad |
| :--- | :--- | :--- |
| `Accordion` | `div` | Coordina valor, deshabilitación y configuración compartida. |
| `AccordionItem` | `div` | Vincula el encabezado y el panel de una sección. |
| `AccordionHeader` | `h3` | Aporta el encabezado semántico. |
| `AccordionTrigger` | `button` | Alterna el panel; incorpora el Chevron decorativo. |
| `AccordionPanel` | `div` | Anima y presenta contenido dentro de un `div` con `px-4 pb-4`. |

No tiene variantes propias `variant` ni `size`. Los modos individual/múltiple, controlado/no controlado y persistente configuran funcionamiento mediante las props de Base UI.

## Props de estado y funcionamiento

| Pieza | Prop | Tipo / predeterminado | Función |
| :--- | :--- | :--- | :--- |
| `Accordion` | `defaultValue` | `Value[]` / `[]` | Paneles abiertos inicialmente en modo no controlado. |
| `Accordion` | `value` | `Value[]` / sin valor controlado | Estado controlado; usa `onValueChange`. |
| `Accordion` | `onValueChange` | `(value: Value[], eventDetails) => void` | Solicitud de cambio; admite `eventDetails.cancel()`. |
| `Accordion` | `multiple` | `boolean` / `false` | Permite varios paneles abiertos. |
| `Accordion` | `disabled` | `boolean` / `false` | Deshabilita la interacción en todos los elementos. |
| `Accordion` | `keepMounted` | `boolean` / `false` | Conserva el DOM de paneles cerrados. |
| `Accordion` | `hiddenUntilFound` | `boolean` / `false` | Habilita búsqueda nativa del contenido cerrado cuando el navegador lo soporta; prevalece sobre `keepMounted`. |
| `AccordionItem` | `value` | `any` / ID generado | Identificador del elemento; define valores estables para apertura inicial o programática. |
| `AccordionItem` | `disabled` | `boolean` / `false` | Deshabilita ese elemento; la raíz también puede deshabilitarlo. |
| `AccordionItem` | `onOpenChange` | `(open: boolean, eventDetails) => void` | Solicitud de abrir/cerrar ese elemento. |
| `AccordionPanel` | `keepMounted` | `boolean` / hereda de raíz | Configura persistencia por panel. |
| `AccordionPanel` | `hiddenUntilFound` | `boolean` / hereda de raíz | Configura búsqueda por panel; prevalece sobre `keepMounted`. |
| `AccordionTrigger` | `nativeButton` | `boolean` / `true` | Indica si el elemento elegido con `render` sigue siendo un botón nativo. |

`value` y `defaultValue` son arrays incluso con un solo panel abierto. No combines ambos modos. Un `value={[]}` cierra todos los paneles. Trata el array de estado recibido como solo lectura.

Los callbacks corresponden a solicitudes originadas por la interacción; cambiar las props controladas desde fuera no dispara por sí mismo esos callbacks. `eventDetails` contiene motivo, evento original y cancelación.

```tsx
"use client";

import { useState } from "react";

const [value, setValue] = useState<string[]>([]);

<Accordion value={value} onValueChange={setValue} multiple>
  {/* Piezas de los elementos con value estable. */}
</Accordion>
```

El ejemplo controlado pertenece a un componente cliente que importa `useState` desde React. Mantén los handlers y el estado en esa frontera cliente.

## Props compartidas y estados

Cada pieza conserva los atributos HTML, ARIA, eventos y `ref` de su primitiva. También admite:

- `className`: cadena o `(state) => string | undefined`. Los wrappers con clases propias evalúan y combinan la función con sus clases; Root y Header la propagan a Base UI.
- `style`: `CSSProperties` o función del estado; se propaga a Base UI.
- `render`: elemento o función `(props, state) => ReactElement`. En la forma de función, propaga las props y `ref` recibidas.

El estado de raíz expone `value` y `disabled`. Item, Header y Trigger también reciben información como `open`, `hidden` e `index`; Panel añade `transitionStatus`. Comprueba el tipo de la pieza concreta al usar una función, porque no todas tienen el mismo estado.

Los slots son `accordion`, `accordion-item`, `accordion-header`, `accordion-trigger` y `accordion-panel`. Item y Panel exponen `data-open`; Trigger expone `data-panel-open`; los estados deshabilitados usan `data-disabled`. Panel además expone `data-starting-style` y `data-ending-style` para transiciones.

## Formas de aplicar estilos

Consulta [globals](../globals.md) para superficies, tríadas, geometría y tipografía.

| Necesidad | Aplicación aceptable |
| :--- | :--- |
| Ancho y centrado | Define un padre con `w-full max-w-xl` y centrado mediante layout o `mx-auto`; no añadas márgenes externos al componente propio. |
| Superficie del conjunto | Añade clases al Root, por ejemplo `rounded-base border border-gray-base bg-surface-base`. |
| Bordes por elemento | Item incorpora `border-b border-gray-base last:border-b-0`; extiende esa pieza para ajustes de separación visual. |
| Dimensión del activador | Trigger tiene `w-full`, `gap-4`, `px-4 py-4` y `text-sm`; para una medida específica determinista usa `style` o una sobrescritura CSS con precedencia comprobada. |
| Contenido y padding del panel | El padding pertenece al `div` interior, no al Panel exterior. Para afectarlo desde el uso, usa un selector dirigido como `[&>div]:px-6`. |
| Colores | Usa `surface-*` y tríadas semánticas. Trigger usa `text-gray-bold`; Panel usa `text-gray-bold/75`. |
| Estado abierto | Usa `data-panel-open:*` en Trigger, `data-open:*` en Item/Panel o `className={(state) => ...}` de la pieza adecuada. |
| Hover | Trigger eleva un pseudo-elemento `before`: `surface-soft` en claro y `surface-bold` en oscuro. Ajusta `before:*` si personalizas ese plano. |
| Animación | El Panel anima altura y opacidad en 150ms usando `--accordion-panel-height`; el Chevron gira 180° mediante el estado del Trigger. |
| Movimiento reducido | Se eliminan las transiciones del Panel, Chevron y pseudo-elemento con `motion-reduce:transition-none`. Preserva esa adaptación al extender animaciones. |

Las clases se concatenan con `clsx`; no hay `tailwind-merge`. El orden de las clases en la cadena no garantiza una sobrescritura. `style` sirve para propiedades directas; los pseudo-elementos y el Chevron requieren selectores dirigidos o cambios autorizados en el componente.

No impongas una altura fija al Panel mientras conserve la transición de expansión: el estado inicial/final necesita poder pasar por altura cero. Al personalizar la duración, conserva la condición de movimiento reducido. Evita un `transitionDuration` inline incondicional que reactive la transición sobre `motion-reduce:transition-none`; aplica el ajuste cuando `prefers-reduced-motion: no-preference` y conserva la ausencia de transición en modo reducido.

```tsx
<Accordion className="rounded-base border border-gray-base bg-surface-base">
  <AccordionItem value="settings">
    <AccordionHeader render={<h2 />}>
      <AccordionTrigger style={{ paddingBlock: "1.25rem" }}>
        Configuración
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel className="[&>div]:px-6">
      Preferencias del proyecto.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
```

El `h2` es un ejemplo: elige el nivel que corresponda a la jerarquía real de la página. Usa `render` para semántica, no para descartar ARIA o desactivar el comportamiento de la primitiva.

## Teclado, montaje y verificación

- Tab recorre los activadores; Enter y Espacio alternan el panel. `orientation` y `loopFocus` están obsoletos en Base UI 1.9.0 y ya no cambian la navegación del foco.
- Mantén `AccordionTrigger` dentro de `AccordionHeader` y Panel como su hermano dentro de Item.
- El Chevron es decorativo y no se reemplaza mediante una prop de icono pública; ese slot no existe hoy.
- `keepMounted` permite preservar, por ejemplo, un input sin controlar al cerrar/reabrir. `hiddenUntilFound` añade descubrimiento por búsqueda nativa en navegadores compatibles.
- Comprueba apertura individual/múltiple, estado controlado si se usa, disabled, persistencia cuando importe, nivel de encabezado, foco y transición en ambos temas.
