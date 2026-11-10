# Attachment

## 1. Identificación

Attachment compone piezas HTML, `Button` de own-ui, `useRender` de Base UI, y `clsx` para presentar archivos adjuntos.

## 2. Propósito y casos de uso

Presenta uno o varios archivos con medios, nombre, descripción, estado y acciones. La API deja al consumidor la carga, eliminación y acciones de archivos. AttachmentGroup agrupa varios elementos en una región horizontal desplazable.

## 3. Importación y anatomía

```tsx
import {
  Attachment, AttachmentAction, AttachmentActions, AttachmentContent,
  AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle,
  AttachmentTrigger,
} from "@/components/own/composed/attachment";
```

| Pieza | Elemento predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Attachment` | `div` | Expone el tamaño, la orientación y el estado. |
| `AttachmentGroup` | `div[role=group]` | Agrupa tarjetas en una región desplazable y enfocable. |
| `AttachmentMedia` | `div` | Contiene icono, imagen u otro medio aportado por el consumidor. |
| `AttachmentContent` | `div` | Reúne título y descripción. |
| `AttachmentTitle`, `AttachmentDescription` | `span` | Presentan los datos textuales del archivo. |
| `AttachmentActions` | `div` | Agrupa acciones. |
| `AttachmentAction` | Button de own-ui | Acción individual. |
| `AttachmentTrigger` | `button` | Activa el archivo y cubre la superficie disponible. |

```tsx
<Attachment state="done">
  <AttachmentMedia>Icono</AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>Informe.pdf</AttachmentTitle>
    <AttachmentDescription>2,4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions><AttachmentAction aria-label="Quitar" /></AttachmentActions>
</Attachment>
```

Todas las piezas se exportan desde este módulo, junto con los tipos `AttachmentState`, `AttachmentSize`, `AttachmentOrientation`, `AttachmentMediaVariant`, `AttachmentProps`, `AttachmentMediaProps` y `AttachmentTriggerProps`.

## 4. Variantes y tamaños

| Prop | Valores y valor inicial | Efecto |
| :--- | :--- | :--- |
| `state` | `idle`, `uploading`, `processing`, `error`, `done`; predeterminado `done` | Presenta estilos del estado. `uploading` y `processing` agregan `aria-busy`. |
| `size` | `default`, `sm`, `xs`; predeterminado `default` | Reduce padding, separación y, en `AttachmentMedia`, el ancho del medio. |
| `orientation` | `horizontal`, `vertical`; predeterminado `horizontal` | Ordena el contenido en una fila o una tarjeta de ancho `w-28`. |
| `AttachmentMedia.variant` | `icon`, `image`; predeterminado `icon` | La variante imagen dimensiona el `img` descendiente y atenúa la vista previa durante carga y procesamiento. |

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Attachment | `state` | `AttachmentState` | `"done"` | Sí | Estado informativo; el componente no realiza la carga. |
| Attachment | `size` / `orientation` | `AttachmentSize` / `AttachmentOrientation` | `"default"` / `"horizontal"` | Sí | Cambian densidad y composición. |
| AttachmentMedia | `variant` | `AttachmentMediaVariant` | `"icon"` | Sí | Elige tratamiento de icono o imagen. |
| AttachmentAction | Props de Button | `ButtonProps` | `variant="ghost"`, `size="sm"` | Sí | Admite disabled, icon, loading, callbacks y atributos de Button. |
| AttachmentTrigger | `render` | Elemento o callback de `useRender` | `button` | Sí | Sustituye el activador. En la forma callback propaga props y ref al elemento. Un botón nativo recibe `type="button"` por defecto. |
| AttachmentTrigger | Props HTML de botón | `useRender.ComponentProps<"button">` | Según HTML | Sí | Incluye nombre accesible, type, handlers, className, style y ref. |
| Todas las piezas | Atributos HTML, `className`, `style`, `ref` | Según el nodo | Según HTML | Sí | Se aplican al elemento que renderiza la pieza. |

Las piezas de contenedor y texto extienden `ComponentPropsWithRef` de sus nodos HTML. `AttachmentAction` sigue el contrato de Button.

## 6. Funcionamiento y estados

- El estado lo controla el consumidor. Solo `uploading` y `processing` generan `aria-busy="true"`; el resto omite el atributo.
- `AttachmentGroup` es una superficie con desplazamiento horizontal, ajuste de desplazamiento y `tabIndex=0`. Coloca Attachment como hijo directo para que sus reglas de ancho y ajuste actúen sobre la tarjeta.
- Los slots son `attachment`, `attachment-group`, `attachment-media`, `attachment-content`, `attachment-title`, `attachment-description`, `attachment-actions`, `attachment-action` y `attachment-trigger`. Attachment expone `data-state`, `data-size` y `data-orientation`. Media expone `data-variant`.
- En orientación vertical, las acciones se superponen en la esquina del medio cuando existe AttachmentMedia; sin medio, permanecen en el flujo. El trigger superpuesto debe ocupar una superficie que no contenga botones o enlaces interactivos.

## 7. Estilos admitidos por pieza

| Pieza | Estilos y selectores |
| :--- | :--- |
| Attachment | Usa `surface-base`, `gray-base` y `content-bold`. `idle` usa borde discontinuo y `error` `error-base`. `w-fit`, `max-w-full` y `min-w-0` contienen contenido largo. |
| AttachmentMedia | `surface-bold`, `rounded-base`; en error usa `error-soft` y `error-bold`. Los SVG sin tamaño explícito tienen `size-4`, o `size-6` en vertical. `variant="image"` ajusta `img` a su marco. |
| AttachmentContent / Title / Description | Contenido flexible y texto truncado. La descripción usa `content-base`, que pasa a `error-bold` en error. |
| AttachmentActions | Elementos flexibles sobre el contenido vertical; usan fondo `surface-base` en la posición superpuesta. |
| AttachmentGroup | Desplazamiento horizontal, snap y `p-1`; su foco visible utiliza `primary-base`. El ancho corresponde al contenedor. |
| AttachmentTrigger | Posición absoluta sobre la tarjeta. Foco visible `primary-base`, con offset de dos píxeles. |

`className` permite ajustar los slots. Los botones usan las variantes semánticas de Button. Los colores se adaptan a ambos temas. No hay módulo CSS propio. `clsx` combina clases con la excepción de colores descrita en [globals](../../globals.md#composición-y-precedencia-de-clases); no usa Tailwind Merge.

## 8. Ejemplos de composición

```tsx
<Attachment orientation="vertical" state="uploading">
  <AttachmentMedia variant="image"><Image src={src} alt="" fill /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>Foto.webp</AttachmentTitle>
    <AttachmentDescription>Subiendo</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Cancelar carga" onClick={cancel} />
  </AttachmentActions>
</Attachment>
```

`src` y `cancel` pertenecen al consumidor. Next.js requiere que el tamaño de la imagen se determine con dimensiones o `fill` y un contenedor posicionado. Si el Trigger cubre la tarjeta, no incluyas acciones dentro de su área interactiva.

## 9. Accesibilidad e integración

Proporciona nombres visibles para los archivos y `aria-label` para botones que solo contienen iconos. Da nombre a AttachmentGroup con `aria-label` o `aria-labelledby`. El grupo crea una parada de Tab para desplazarlo, además de las acciones y el trigger. El estado `aria-busy` identifica carga y procesamiento, pero el mensaje de progreso debe proporcionarlo el consumidor. Conserva el trigger como único activador principal por tarjeta.

## 10. Límites y verificación

Attachment no implementa selector de archivos, carga, cancelación, reintento, porcentajes ni eliminación. Incluye `attachment.tsx`, Button y sus archivos de iconos `index.tsx` y `spinner.tsx`, además de los estilos y tokens compartidos. Verifica cinco estados, tamaños, orientaciones, acciones, etiquetas y desplazamiento por teclado en ambos temas y en espacios estrechos.
