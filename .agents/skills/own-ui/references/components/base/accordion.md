# Accordion

## 1. Identificación

Accordion utiliza la primitiva `@base-ui/react/accordion`, `clsx` y el icono interno Chevron.

## 2. Propósito y casos de uso

Accordion organiza secciones relacionadas que pueden expandirse. Es adecuado para preguntas frecuentes, opciones progresivas o detalles secundarios. El contenido cerrado se oculta según la configuración de montaje y búsqueda; evita depender de que siempre sea visible para explicar una acción esencial.

## 3. Importación y anatomía

La tabla recoge las cinco exportaciones públicas. Dentro de cada Item, coloca Trigger dentro de Header y Panel como hermano de Header. El consumidor aporta las etiquetas y el contenido de cada panel. Trigger añade Chevron y Panel envuelve su contenido en un `div` interno.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/own/base/accordion";

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

## 4. Variantes y tamaños

La familia carece de props propias `variant` y `size`. `multiple`, el modo de control y la persistencia configuran el comportamiento. Las dimensiones base del activador y el panel se ajustan por pieza en la sección 7.

## 5. Props y callbacks

Las opciones de la tabla se heredan de Base UI. Cada pieza conserva los atributos HTML, ARIA, eventos y refs de su primitiva.

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Accordion | `defaultValue` | `Value[]` | `[]` | Sí | Paneles abiertos inicialmente en modo no controlado. |
| Accordion | `value` | `Value[]` | — | Sí | Estado controlado. Usa `onValueChange` para responder a solicitudes. |
| Accordion | `onValueChange` | `(value: Value[], eventDetails) => void` | — | Sí | Solicitud de actualizar el conjunto de paneles abiertos. |
| Accordion | `multiple` | `boolean` | `false` | Sí | Permite abrir varios paneles por interacción. |
| Accordion | `disabled` | `boolean` | `false` | Sí | Deshabilita la interacción en todos los elementos. |
| Accordion | `keepMounted` | `boolean` | `false` | Sí | Conserva el DOM de los paneles cerrados. |
| Accordion | `hiddenUntilFound` | `boolean` | `false` | Sí | Permite buscar el contenido cerrado en navegadores compatibles. Prevalece sobre `keepMounted`. |
| Accordion | `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Sí | Prop obsoleta. Aún informa `data-orientation`. |
| Accordion | `loopFocus` | `boolean` | — | Sí | Prop obsoleta que ya no modifica la navegación por foco. |
| Item | `value` | `any` | ID generado | Sí | Identificador. Proporciona un valor estable para apertura inicial o programática. |
| Item | `disabled` | `boolean` | `false` | Sí | Deshabilita este elemento. La raíz también puede deshabilitarlo. |
| Item | `onOpenChange` | `(open: boolean, eventDetails) => void` | — | Sí | Solicitud de abrir o cerrar este panel. Se ejecuta antes del callback de la raíz. |
| Panel | `keepMounted` | `boolean` | Hereda de Accordion | Sí | Ajusta la persistencia por panel. |
| Panel | `hiddenUntilFound` | `boolean` | Hereda de Accordion | Sí | Ajusta la búsqueda por panel. Prevalece sobre `keepMounted`. |
| Trigger | `nativeButton` | `boolean` | `true` | Sí | Indica si `render` conserva un botón nativo. |
| Piezas DOM | `className` | `string \| ((state) => string \| undefined)` | Clases propias según la pieza | Sí | Añade clases estáticas o calculadas con el estado de la pieza. |
| Piezas DOM | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos directos o calculados al nodo. |
| Piezas DOM | `render` | `ReactElement \| ((props, state) => ReactElement)` | Elemento de la sección 3 | Sí | Compone el comportamiento en un elemento. |

Ambos callbacks reciben `eventDetails` con el motivo (`"trigger-press"` o `"none"`), el evento y `cancel()`. Cancelar en Item impide que la solicitud llegue a la raíz. Cambiar `value` desde el consumidor actualiza la vista directamente.

## 6. Funcionamiento y estados

Elige `defaultValue` para inicializar el estado interno o `value` para controlarlo. Ambos son arrays incluso para apertura individual. Un `value={[]}` cierra todos los paneles. Trata el array recibido como solo lectura.

Un Panel cerrado sale del DOM tras la transición salvo que `keepMounted` o `hiddenUntilFound` lo mantengan. Este último usa `hidden="until-found"`. Un ajuste explícito en Panel prevalece sobre la configuración heredada de la raíz para esa prop.

El estado de raíz expone `value` y `disabled`. Item, Header y Trigger también reciben información como `open`, `hidden` e `index`; Panel añade `transitionStatus`. Comprueba el tipo de la pieza concreta al usar una función, porque no todas tienen el mismo estado.

| Pieza | `data-slot` | Atributos de Base UI |
| :--- | :--- | :--- |
| Accordion | `accordion` | `data-disabled`, `data-orientation` |
| Item | `accordion-item` | `data-open`, `data-disabled`, `data-index` |
| Header | `accordion-header` | `data-open`, `data-disabled`, `data-index` |
| Trigger | `accordion-trigger` | `data-panel-open`, `data-disabled`, `data-index` |
| Panel | `accordion-panel` | `data-open`, `data-disabled`, `data-index`, `data-orientation`, `data-starting-style`, `data-ending-style` |

## 7. Estilos admitidos por pieza

Consulta [globals](../../globals.md) para superficies, tríadas, geometría y tipografía.

| Necesidad | Aplicación aceptable |
| :--- | :--- |
| Ancho y centrado | Define un padre con `w-full max-w-xl` y centrado mediante layout o `mx-auto`; no añadas márgenes externos al componente propio. |
| Superficie del conjunto | Añade clases al Root, por ejemplo `rounded-base border border-gray-base bg-surface-base`. |
| Bordes por elemento | Item incorpora `border-b border-gray-base last:border-b-0`; extiende esa pieza para ajustes de separación visual. |
| Dimensión del activador | Trigger tiene `w-full`, `gap-4`, `px-4 py-4`, `rounded-base` y `text-sm font-semibold`. Chevron mide `size-4` y se mantiene al reducir el ancho. |
| Contenido y padding del panel | El padding pertenece al `div` interior, no al Panel exterior. Para afectarlo desde el uso, usa un selector dirigido como `[&>div]:px-6`. |
| Colores y foco | Item usa el borde `gray-base`, Trigger usa texto `gray-bold` y anillo de foco `primary-base`, y Panel usa texto `gray-bold/75`. Los tokens se reasignan por tema. |
| Estado abierto | Usa `data-panel-open:*` en Trigger, `data-open:*` en Item/Panel o `className={(state) => ...}` de la pieza adecuada. |
| Hover | Trigger eleva un pseudo-elemento `before`: `surface-soft` en claro y `surface-bold` en oscuro. Ajusta `before:*` si personalizas ese plano. |
| Animación | Panel anima altura y opacidad en 150 ms usando `--accordion-panel-height`. Chevron gira 180° al abrirse mediante el estado de Trigger. |
| Movimiento reducido | Se eliminan las transiciones del Panel, Chevron y pseudo-elemento con `motion-reduce:transition-none`. Preserva esa adaptación al extender animaciones. |

Item, Trigger y Panel combinan clases estáticas y funcionales con `clsx` sin fusionar conflictos de Tailwind. Accordion y Header pasan `className` a Base UI. Usa `style` estático o funcional para propiedades directas del nodo y selectores con precedencia comprobada para el pseudo-elemento, Chevron o el contenido interno.

Conserva `overflow-hidden` y el paso entre altura medida y cero durante la entrada y la salida. Base UI publica `--accordion-panel-height` y `--accordion-panel-width`. El wrapper usa la altura. Al ajustar la transición, limita la duración nueva a `prefers-reduced-motion: no-preference` y conserva `motion-reduce:transition-none`.

## 8. Ejemplos de composición

Este ejemplo controla varios paneles y muestra cómo personalizar el encabezado y el padding interno. Para conservar el estado local de un panel cerrado, añade `keepMounted` a Panel o a la raíz.

```tsx
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/own/base/accordion";

export function ProjectDetails() {
  const [value, setValue] = useState<string[]>(["settings"]);

  return (
    <Accordion value={value} onValueChange={setValue} multiple>
      <AccordionItem value="settings">
        <AccordionHeader render={<h2 />}>
          <AccordionTrigger style={{ paddingBlock: "1.25rem" }}>
            Configuración
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel className="[&>div]:px-6">Preferencias del proyecto.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="access">
        <AccordionHeader render={<h2 />}>
          <AccordionTrigger>Acceso</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Permisos del equipo.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
```

## 9. Accesibilidad e integración

- Tab recorre los activadores habilitados. Enter y Espacio alternan el panel.
- Da un nombre comprensible a cada Trigger y elige el nivel de Header según la jerarquía de la página. Conserva las relaciones ARIA y el foco visible. Chevron es decorativo.
- Con `render` funcional, propaga atributos, eventos y ref al nodo. Si sustituyes el botón por otro elemento, ajusta `nativeButton` y comprueba su semántica y teclado.
- Conserva `"use client"` en la familia y en las composiciones con estado o handlers. Un layout o página servidor puede renderizar esas piezas cliente.

## 10. Límites y verificación

- Chevron forma parte del wrapper. Su personalización visual usa un selector dirigido. `orientation` y `loopFocus` están obsoletos desde la perspectiva de navegación en Base UI 1.9.0.
- Comprueba apertura individual y múltiple, deshabilitación, montaje, búsqueda nativa cuando se use, jerarquía de encabezados, foco y transiciones en ambos temas, con ancho estrecho y movimiento reducido.
