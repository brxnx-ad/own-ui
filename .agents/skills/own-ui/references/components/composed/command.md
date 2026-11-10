# Command

## 1. Identificación

Command compone Autocomplete y Dialog de own-ui en una paleta modal y utiliza el icono Close para el control de cierre.

## 2. Propósito y casos de uso

Permite buscar y ejecutar acciones de una aplicación, como ajustar una preferencia o aplicar formato. La búsqueda admite el nombre visible y los alias de cada comando. Usa [Combobox](../base/combobox.md) para elegir un valor de formulario y [Autocomplete](../base/autocomplete.md) para sugerir texto dentro de un campo editable.

## 3. Importación y anatomía

```tsx
import {
  Command,
  type CommandProps,
  type CommandItem,
  type CommandGroup,
} from "@/components/own/composed/command";
```

`Command` es la única exportación con renderizado. Los otros tres nombres son tipos. El consumidor aporta el botón activador, los comandos y la acción que ejecuta al elegir uno.

```tsx
<Command
  title="Acciones del documento"
  trigger={<button type="button">Abrir acciones</button>}
  items={[{ id: "duplicate", label: "Duplicar documento" }]}
  onSelect={handleCommand}
/>
```

| Pieza interna | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| Activador | Botón aportado por `trigger` | Abre el diálogo mediante `DialogTrigger`. |
| Panel | `div` con rol `dialog` | Se monta en el portal de Dialog, sobre un fondo modal y dentro de su viewport. |
| Título, descripción y cierre | `h2`, `p` y `button` | Nombran el diálogo, aportan contexto y permiten cerrarlo. |
| Búsqueda | `input` con rol `combobox` | Controla el filtro y el foco virtual de la lista. |
| Mensaje vacío | `div` | Comunica la ausencia de coincidencias. |
| Lista, grupo y comando | `div` con roles `listbox`, `group` y `option` | Presentan los resultados filtrados. Los grupos con etiqueta reciben un nombre accesible. |

## 4. Variantes y tamaños

Command tiene una presentación modal. El ancho máximo inicial es `max-w-lg`, el viewport aporta padding adaptable y la lista tiene una altura máxima de `max-h-64`. Los datos admiten una lista plana o una colección de grupos. La API carece de props `variant` y `size`.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Command | `title` | `string` | — | No | Encabezado visible y nombre accesible del diálogo. |
| Command | `description` | `string` | — | Sí | Añade una descripción visible asociada al diálogo. |
| Command | `trigger` | `ReactElement` | — | Sí | Botón nativo o componente que propaga al botón las props y la ref de DialogTrigger. Puede omitirse para apertura externa. |
| Command | `items` | `readonly CommandItem[] \| readonly CommandGroup[]` | — | No | Lista plana o agrupada. Usa una sola estructura por instancia. |
| Command | `onSelect` | `(item: CommandItem) => void` | — | No | Recibe el objeto habilitado después de solicitar el cierre. |
| Command | `open` | `boolean` | — | Sí | Controla si el diálogo está abierto. |
| Command | `defaultOpen` | `boolean` | `false` | Sí | Define la apertura inicial en modo no controlado. |
| Command | `onOpenChange` | `(open: boolean, details: DialogChangeEventDetails) => void` | — | Sí | Heredado de Dialog. En modo controlado, actualiza `open` para aplicar la solicitud. `details.cancel()` puede cancelar la solicitud de cierre. |
| Command | `finalFocus` | `ComponentProps<typeof DialogPopup>["finalFocus"]` | Activador o foco anterior | Sí | Heredado de Dialog. Define dónde vuelve el foco al cerrar. |
| Command | `className` | `ComponentProps<typeof DialogPopup>["className"]` | — | Sí | Clase o función de estado del panel. |
| Command | `inputLabel` | `string` | `"Buscar comandos"` | Sí | Nombre accesible del campo. |
| Command | `placeholder` | `string` | `"Escribe un comando…"` | Sí | Ayuda visible cuando el campo está vacío. |
| Command | `emptyMessage` | `string` | `"No se encontraron comandos."` | Sí | Mensaje para una búsqueda sin resultados. |
| Command | `closeLabel` | `string` | `"Cerrar paleta"` | Sí | Nombre accesible del botón de cierre. |
| CommandItem | `id` | `string` | — | No | Identificador estable y único dentro de su grupo o lista. |
| CommandItem | `label` | `string` | — | No | Nombre visible y buscable de la acción. |
| CommandItem | `keywords` | `readonly string[]` | — | Sí | Alias buscables. |
| CommandItem | `icon` | `ReactNode` | — | Sí | Contenido decorativo junto al nombre. |
| CommandItem | `disabled` | `boolean` | `false` | Sí | Mantiene visible la acción sin permitir su ejecución. |
| CommandGroup | `id` | `string` | — | No | Identificador estable y único entre los grupos. |
| CommandGroup | `label` | `string` | — | No | Nombre visible y accesible del grupo. |
| CommandGroup | `items` | `readonly CommandItem[]` | — | No | Acciones pertenecientes al grupo. |

El detalle de apertura es el segundo parámetro de `NonNullable<CommandProps["onOpenChange"]>`. Consulta los motivos y la cancelación en [Dialog](../base/dialog.md).

## 6. Funcionamiento y estados

- Autocomplete aplica coincidencia parcial a la etiqueta y a cada alias. Conserva el orden de los datos y muestra los grupos con coincidencias.
- La lista se monta dentro del diálogo. El primer resultado se resalta automáticamente y las flechas permiten recorrer los resultados. El texto de búsqueda se reinicia cuando el diálogo termina de cerrar y se desmonta.
- Elegir un comando habilitado solicita el cierre de Dialog con el motivo `imperative-action` y llama a `onSelect`. Si el consumidor cancela ese cierre o mantiene `open` en `true`, la acción se ejecuta y la paleta permanece abierta.
- Los slots son `command`, `command-close`, `command-input`, `command-empty`, `command-list`, `command-group`, `command-group-label` y `command-item`. El panel hereda los atributos de apertura y transición de Dialog. Las opciones heredan `data-highlighted` y `data-disabled` de Autocomplete.

## 7. Estilos admitidos por pieza

- `className` se combina con las clases de Dialog mediante `clsx`. El panel utiliza `surface-base`, borde `gray-base`, texto `content-bold`, radio `rounded-base` y sombra `shadow-l`. Hereda el padding del diálogo y se limita al viewport.
- El campo utiliza `surface-bold` y un anillo de foco `primary-base`. Las opciones resaltadas usan `primary-soft`, las deshabilitadas reducen su opacidad y la lista desplaza su contenido cuando excede la altura máxima. Los iconos SVG decorativos se ajustan a `size-4`.
- Personaliza los descendientes desde el panel portaleado mediante sus slots, por ejemplo `className="max-w-md! [&_[data-slot=command-list]]:max-h-48!"`. El modificador `!` da precedencia sobre las utilidades de ancho y altura predeterminadas. El activador conserva los estilos que le aporta el consumidor.
- El fondo y el panel heredan la transición de Dialog de 150 ms. El panel anima opacidad y escala. Dialog aplica el movimiento reducido del sistema.

## 8. Ejemplos de composición

```tsx
"use client";

import { useRef, useState } from "react";
import { Command, type CommandGroup } from "@/components/own/composed/command";

const commands: readonly CommandGroup[] = [
  {
    id: "format",
    label: "Formato",
    items: [
      { id: "uppercase", label: "Convertir a mayúsculas", keywords: ["capitalizar"] },
      { id: "original", label: "Restaurar título" },
    ],
  },
];

export function TitleActions() {
  const [open, setOpen] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = "Informe de avance";

  return (
    <>
      <p role="status">{uppercase ? title.toUpperCase() : title}</p>
      <button ref={trigger} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        Buscar acciones
      </button>
      <Command
        title="Formato del título"
        items={commands}
        open={open}
        onOpenChange={setOpen}
        finalFocus={trigger}
        onSelect={(item) => setUppercase(item.id === "uppercase")}
      />
    </>
  );
}
```

## 9. Accesibilidad e integración

- El campo recibe el foco al abrir. Usa las flechas para recorrer las opciones, Enter para ejecutar la opción resaltada, Escape para cerrar y Tab o Mayús+Tab para moverte entre los controles del diálogo.
- Proporciona un título que identifique el conjunto de acciones. Localiza el nombre del campo, su placeholder, el mensaje vacío y el nombre del botón de cierre según el idioma de la interfaz.
- Al usar un activador personalizado, propaga los atributos, los eventos y la ref al botón. Para apertura controlada desde otro elemento, usa `finalFocus` si el foco debe volver a un destino concreto.
- Los iconos de los comandos son decorativos. El nombre accesible proviene de `label`. Mantén fuera de las opciones los controles interactivos anidados.

## 10. Límites y verificación

- El consumidor define las acciones, su estado asíncrono y cualquier atajo global de apertura. Para integrar un atajo, controla `open` desde el componente cliente que registra el evento.
- La paleta filtra la colección suministrada y renderiza las coincidencias dentro de la lista desplazable. Exporta los archivos y los iconos indicados en [Estructura](../../structure.md#compatibilidad-y-archivos-necesarios).
- Comprueba el filtrado por etiqueta y alias, los resultados vacíos, la selección por puntero y Enter, el bloqueo de las opciones deshabilitadas, Escape y el retorno de foco. Revisa el portal en ambos temas y con ancho reducido.
