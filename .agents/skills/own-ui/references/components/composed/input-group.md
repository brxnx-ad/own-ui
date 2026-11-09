# Input Group

## 1. Identificación

Input Group compone `Input`, `Textarea` y `Button` de own-ui con HTML, CSS Module y `clsx`. Usa la superficie y los tokens globales.

## 2. Propósito y casos de uso

Combina un control de texto con un prefijo, sufijo, icono o acción. Los complementos pueden quedar al inicio, al final, arriba o abajo. Para etiquetas, mensajes de ayuda y validación coordinada usa `Field` alrededor del grupo.

## 3. Importación y anatomía

```tsx
import {
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput,
  InputGroupText, InputGroupTextarea,
} from "@/components/own/composed/input-group";
```

| Pieza | Elemento o componente | Responsabilidad |
| :--- | :--- | :--- |
| `InputGroup` | `div[role=group]` | Borde y distribución del control y complementos. |
| `InputGroupAddon` | `div` | Contenido auxiliar en una de cuatro ubicaciones. |
| `InputGroupText` | `span` | Texto o icono decorativo. |
| `InputGroupButton` | Button de own-ui | Acción interactiva compacta. |
| `InputGroupInput` | Input de own-ui | Control de una línea. |
| `InputGroupTextarea` | Textarea de own-ui | Control de varias líneas. |

```tsx
<InputGroup>
  <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
  <InputGroupInput aria-label="Sitio web" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Buscar</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

El archivo exporta los tipos `InputGroupAddonAlignment`, `InputGroupButtonSize`, `InputGroupAddonProps` y `InputGroupButtonProps`.

## 4. Variantes y tamaños

`align` acepta `inline-start`, `inline-end`, `block-start` o `block-end`. El inicio en línea es el valor predeterminado. El flujo admite complementos múltiples en un mismo borde y el texto puede envolver. El control ocupa el espacio que queda y las filas de bloque usan el ancho disponible.

InputGroupButton acepta los tamaños `xs`, `sm`, `icon-xs` e `icon-sm`. Parte de `xs`; cuando no recibe texto pero tiene icon o loading, ajusta automáticamente el tamaño a `icon-xs`. Hereda las cinco variantes y `loading` de Button.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| InputGroup | `className`, `style`, `ref` y atributos | Props de `div` | — | Sí | Actúan sobre el marco con `role=group`. |
| InputGroupAddon | `align` | `InputGroupAddonAlignment` | `"inline-start"` | Sí | Ubica el contenido. |
| InputGroupAddon | `onClick` | `MouseEventHandler<HTMLDivElement>` | — | Sí | Se llama antes de transferir foco al input o textarea. Si cancela el evento, se omite el foco. |
| InputGroupAddon | `className`, `style`, `ref`, children | Props de `div` | — | Sí | Personalizan el complemento. |
| InputGroupButton | `size` | `InputGroupButtonSize` | `"xs"` | Sí | Ajusta la densidad; un botón solo icono con el tamaño inicial usa `icon-xs`. |
| InputGroupButton | `variant`, `icon`, `loading`, `disabled` | Props de Button | `"ghost"`, sin icono ni carga | Sí | Hereda la API y los estados de Button. |
| InputGroupText | Props de `span` | `ComponentPropsWithRef<"span">` | — | Sí | Se usa para contenido de presentación, no para acciones. |
| InputGroupInput | Props de Input | `InputProps` | — | Sí | Expone validación, valor, callbacks, `render`, `className`, `style` y ref de Input. |
| InputGroupTextarea | Props de Textarea | `TextareaProps` | — | Sí | Incluye `showCount`, `maxRows`, `maxLength`, valor, eventos, `className`, `style` y ref. |

## 6. Funcionamiento y estados

- El grupo no mantiene el valor del control. Input conserva los estados controlado y no controlado de Base UI; Textarea conserva los suyos. Sus formularios y restricciones siguen funcionando de manera nativa.
- Pulsar en una zona no interactiva de un complemento enfoca el input o textarea descendiente directo. Si no existe, no se transfiere el foco. Los botones, enlaces y demás controles interactivos del complemento mantienen sus handlers.
- El marco detecta el foco visible, `aria-invalid`, `data-length-overflow` y `:user-invalid`. El contador de Textarea se conserva y su marco se integra con el foco y el error del grupo.
- Los slots son `input-group`, `input-group-addon`, `input-group-button`, `input-group-text` y `input-group-control`. Input conserva además sus estados Base UI; Textarea conserva `textarea-frame` y `textarea-count` cuando muestra el contador.

## 7. Estilos admitidos por pieza

| Pieza | Estilos y selectores |
| :--- | :--- |
| InputGroup | Flex wrapping, borde `gray-base`, fondo de control `surface-bold`, radio `rounded-base` y ancho del contenedor. Al enfocar el campo muestra un contorno `primary-base`; los estados inválidos usan `error-bold`. |
| InputGroupAddon | Texto `gray-bold/75`, SVG sin tamaño explícito `size-4` y padding de acuerdo con `data-align`. `basis-full` coloca complementos en filas superiores e inferiores. |
| InputGroupText | Conserva la tipografía del complemento; admite `className`, `style` y SVG del consumidor. |
| InputGroupButton | Usa Button; los tamaños compactos sustituyen altura, anchura, separación y padding. Mantiene sus tokens, estados y foco. |
| InputGroupInput | El CSS Module elimina borde, fondo, radio, sombra y anillo propios de Input dentro del marco y alinea su altura. El grupo asume esas responsabilidades visuales. |
| InputGroupTextarea | El marco del contador se integra con el grupo. `maxRows` mantiene el límite de altura y el campo puede desplazarse verticalmente. |

Al exportar incluye `input-group.module.css`. Sus selectores internos combinan complementos y controles directos, incluido el contenedor generado por Textarea con contador. Ajusta el grupo con `className`; el CSS Module tiene reglas propias de borde y fondo para que la superficie se mantenga en una única pieza. `clsx` concatena clases y no fusiona conflictos de Tailwind. Los tokens se adaptan por tema.

## 8. Ejemplos de composición

```tsx
"use client";

import { useRef, useState } from "react";
import {
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput,
} from "@/components/own/composed/input-group";

export function SearchField() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup>
      <InputGroupInput aria-label="Buscar" ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton disabled={!value} onClick={() => {
          setValue("");
          inputRef.current?.focus();
        }}>Borrar</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

Si prefieres una etiqueta visible, vincúlala con `id` y `htmlFor`. Compón con Field para añadir descripciones y mensajes de validación.

## 9. Accesibilidad e integración

`role=group` da contexto a los complementos, pero no nombra el campo. Proporciona una etiqueta mediante `htmlFor`/`id`, `aria-label` o `aria-labelledby`. Los iconos decorativos se ocultan a tecnologías de asistencia. Nombra cada botón que solo contiene un icono. Los complementos interactivos deben tener su propio nombre y conservan su foco.

Si el componente usa estado, handlers o refs aportados por el consumidor, colócalo dentro de una frontera cliente. El input sigue siendo compatible con Field y formularios.

## 10. Límites y verificación

El componente busca el primer control compatible como hijo directo o como textarea dentro del marco del contador. No localiza campos dentro de contenedores arbitrarios. Exporta el módulo TSX, `input-group.module.css`, Button, Input, Textarea, sus iconos de Button y los tokens propios. Verifica cuatro alineaciones, complementos repetidos, contador, inválido, disabled, foco mediante el complemento y teclado en ambos temas y anchos móviles.
