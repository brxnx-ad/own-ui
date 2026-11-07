# Avatar

## 1. Identificación

Avatar envuelve `Root`, `Image` y `Fallback` de `@base-ui/react/avatar` y combina las clases con `clsx`.

## 2. Propósito y casos de uso

Representa a una persona, equipo o cuenta con una imagen y contenido alternativo, como iniciales o un icono. La caja conserva sus dimensiones al cambiar entre ambos. Úsalo en perfiles, listas de participantes y comentarios. Si activa navegación o una acción, compón el avatar dentro de un enlace o botón accesible.

## 3. Importación y anatomía

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/own/independant/avatar";

<Avatar role="img" aria-label="Elena Marín">
  <AvatarFallback>EM</AvatarFallback>
  <AvatarImage src="/profiles/elena.jpg" alt="" />
</Avatar>;
```

| Exportación | Nodo predeterminado | Responsabilidad |
| :--- | :--- | :--- |
| `Avatar` | `span` | Establece la caja y comparte el estado de carga. |
| `AvatarFallback` | `span` | Presenta el contenido alternativo que aporta el consumidor. |
| `AvatarImage` | `img` | Presenta la fuente de imagen que aporta el consumidor. |
| `AvatarProps`, `AvatarSize` | — | Tipos de las props de la raíz y de su escala de tamaños. |

Coloca `AvatarImage` y `AvatarFallback` como piezas hermanas dentro de `Avatar`. Cada raíz representa una sola imagen. Puedes omitir `AvatarImage` cuando falte la fuente, u omitir el fallback cuando sea aceptable mostrar la caja vacía durante la carga o el error. Adapta el alias y la URL a tu proyecto.

## 4. Variantes y tamaños

`size` es una prop propia de la raíz. La pieza usa un cuadrado con borde de `1px` y radio `rounded-base` en los tres tamaños. Las dimensiones corresponden a la escala base de Tailwind.

| `size` | Caja exterior | Tipografía heredada por el fallback |
| :--- | :--- | :--- |
| `sm` | `2rem × 2rem` (32 px) | `text-xs` |
| `md` (predeterminado) | `2.5rem × 2.5rem` (40 px) | `text-sm` |
| `lg` | `3rem × 3rem` (48 px) | `text-base` |

La API visual consta de `size`. La carga en el DOM y el tiempo de espera son opciones de comportamiento.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Avatar` | `size` | `AvatarSize` | `"md"` | Sí | Prop propia para la caja y el tamaño de las iniciales. |
| `AvatarFallback` | `delay` | `number` | `0` | Sí | Prop de Base UI. Tiempo desde el montaje hasta que el fallback puede mostrarse, en milisegundos. |
| `AvatarFallback` | `children` | `ReactNode` | — | Sí | Iniciales, texto breve o un icono aportado por el consumidor. |
| `AvatarImage` | `keepMounted` | `boolean` | `false` | Sí | Prop de Base UI. Mantiene el `img` en el DOM y observa su carga. Úsala con `loading="lazy"` o al componer con `next/image`. |
| `AvatarImage` | `onLoadingStatusChange` | `(status: ImageLoadingStatus) => void` | — | Sí | Prop de Base UI. Notifica `loading`, `loaded` o `error` cuando se actualiza el estado. Puede saltar `loading` con una imagen ya cargada. Recibe el estado sin evento, motivo ni mecanismo de cancelación. |
| `AvatarImage` | `src`, `srcSet`, `sizes`, `alt` | `string` | — | Sí | Atributos HTML. Aporta una fuente en esta pieza o en el `render` que carga con `keepMounted`. Usa `sizes` con `srcSet` cuando corresponda. Especifica `alt`, incluso si el valor adecuado es `""`. |
| `AvatarImage` | `loading` | `"eager" \| "lazy"` | Navegador | Sí | Atributo HTML. Usa `keepMounted` para que el navegador pueda diferir la solicitud del nodo real. |
| Todas | `className` | `string \| ((state) => string \| undefined)` | — | Sí | Agrega clases estáticas o dependientes del estado a las de own-ui. |
| Todas | `style` | `CSSProperties \| ((state) => CSSProperties \| undefined)` | — | Sí | Aplica estilos inline al nodo de la pieza. |
| Todas | `render` | `ReactElement \| ((props, state) => ReactElement)` | Nodo de la pieza | Sí | Composición de Base UI. Propaga las props y la referencia recibidas si usas una función. |
| Todas | `ref` | `React.Ref<HTMLSpanElement>` o `React.Ref<HTMLImageElement>` | — | Sí | Referencia al nodo montado. Las piezas propagan sus atributos HTML, incluidos los eventos nativos. |

`ImageLoadingStatus` es el tipo de Base UI `"idle" | "loading" | "loaded" | "error"`. La raíz y el fallback exponen `imageLoadingStatus` en sus callbacks de estilo y `render`. La imagen expone además `transitionStatus`. Consulta los tipos de Base UI de tu instalación para los tipos auxiliares.

## 6. Funcionamiento y estados

- El estado inicial es `idle`. Base UI controla la carga internamente y determina qué pieza se monta. El consumidor cambia la fuente mediante `src` o `srcSet`.
- Por defecto, Base UI precarga la fuente y monta el `img` cuando está lista. El fallback se muestra mientras no haya una imagen cargada y se haya cumplido su `delay`.
- Con `keepMounted`, el `img` está en el HTML inicial y el estado se resuelve con los eventos y las propiedades del nodo real. Base UI aplica `aria-hidden` a la imagen hasta que carga. Si falla, el `img` permanece montado e invisible por CSS.
- `delay` se mide desde el montaje del fallback. Una vez transcurrido, queda habilitado para las siguientes cargas o errores de la misma instancia. Monta una instancia nueva si necesitas reiniciar la espera.

| Nodo | Slots y atributos de estado |
| :--- | :--- |
| Raíz | `data-slot="avatar"`, `data-size="sm"`, `"md"` o `"lg"`. |
| Imagen | `data-slot="avatar-image"`. `data-loading` y `data-error` se emiten con `keepMounted`. Base UI puede emitir `data-starting-style` en la entrada y `data-ending-style` en la salida del modo predeterminado. |
| Fallback | `data-slot="avatar-fallback"`. El estado se observa mediante las funciones de `className`, `style` o `render` mientras se renderiza la pieza. |

## 7. Estilos admitidos por pieza

| Pieza | Estilo base | Personalización |
| :--- | :--- | :--- |
| `Avatar` | Caja `inline-flex` que no se encoge, con `rounded-base`, `border-gray-base`, `bg-surface-bold` y `text-gray-bold`. Su contexto relativo y aislado contiene y recorta las dos capas. | Elige `size` o ajusta ancho y alto desde `style`. El contenedor consumidor controla los márgenes, gaps y la posición en el layout. |
| `AvatarImage` | Capa absoluta sobre el fallback que cubre el interior con `object-cover`. Se oculta con `visibility: hidden` en `data-loading` y `data-error` para conservar la caja. | Ajusta `objectPosition` o `objectFit` en el `img`. Conserva la caja cuando uses carga diferida. |
| `AvatarFallback` | Capa absoluta con contenido centrado, `font-semibold` y tipografía y color heredados de la raíz. | Ajusta color, fondo, tipografía, padding o gap en el `span` y el tamaño del icono en su propio nodo. Mantén el contenido breve para que quepa en el recorte. |

Las superficies, el borde y el texto se adaptan al tema desde [globals.md](../globals.md). Personaliza una instancia desde sus props o selectores de slot. Cambiar los tokens globales también afecta a las demás familias que los usan. Avatar carece de sombra y transición predeterminadas. Si añades una transición con los atributos de entrada y salida, respeta `prefers-reduced-motion` y comprueba el desmontaje. Para carga diferida, conserva `visibility` u `opacity` para ocultar la imagen durante la carga y el error.

`className` funcional se evalúa con el estado de cada pieza y se combina con las clases de own-ui mediante `clsx`. Las utilidades en conflicto siguen la cascada de CSS. Para cambiar una dimensión puntual de la raíz, por ejemplo, usa `style={{ width: "3.5rem", height: "3.5rem" }}`. Base UI aplica `style` y compone el elemento de `render`; una función de `render` debe propagar las clases, estilos, eventos y `ref` que recibe.

## 8. Ejemplos de composición

La [composición habitual](#3-importación-y-anatomía) muestra una imagen con iniciales mientras se carga. Si el perfil solo dispone de un nombre, puedes presentar el fallback junto a ese texto.

```tsx
import { Avatar, AvatarFallback } from "@/components/own/independant/avatar";

<div className="flex items-center gap-2">
  <Avatar size="sm" aria-hidden="true">
    <AvatarFallback>EM</AvatarFallback>
  </Avatar>
  <span>Elena Marín</span>
</div>;
```

Usa `keepMounted` con `next/image` para cargar el recurso que resuelve Next.js. El ejemplo supone que existe `/profiles/elena.jpg` en el proyecto consumidor.

```tsx
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/own/independant/avatar";

<Avatar size="lg" role="img" aria-label="Elena Marín">
  <AvatarFallback delay={150}>EM</AvatarFallback>
  <AvatarImage
    keepMounted
    render={<Image src="/profiles/elena.jpg" width={48} height={48} alt="" />}
  />
</Avatar>;
```

## 9. Accesibilidad e integración

- Usa `role="img"` y `aria-label` en la raíz cuando el avatar comunique por sí solo la identidad. El nombre completo queda disponible tanto con la imagen como con las iniciales. Si un texto adyacente ya identifica a la persona, puedes usar `aria-hidden="true"` en la raíz.
- Avatar no agrega foco ni atajos de teclado. Cuando se integra en un enlace o botón, el control aporta el nombre, la interacción por teclado y el estilo de foco.
- Si sustituyes `AvatarImage` mediante `render`, usa un componente que reenvíe la referencia al `img` y conserve sus eventos `load` y `error`. Los handlers y las props funcionales se definen dentro de una frontera cliente de App Router.

## 10. Límites y verificación

La familia requiere `avatar.tsx`, Base UI 1.9.0, `clsx`, React 19 y los tokens y utilidades de Tailwind del sistema. Consulta [estructura](../structure.md) para resolver el import y las versiones. La implementación carece de avatar grupal e indicador de presencia integrados. El consumidor aporta la imagen, las iniciales o el icono.

Comprueba la carga correcta, una fuente inválida, la ausencia de imagen y la recuperación al cambiar la fuente. Revisa también el tiempo de espera, el nombre accesible, ambos temas y el recorte de los tamaños en el contenedor real. Con `keepMounted`, verifica que la imagen invisible conserva la caja y que su componente propaga los eventos y la referencia. [Avatar en Base UI](https://base-ui.com/react/components/avatar).
