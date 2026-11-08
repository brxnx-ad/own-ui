# own-ui · Iconos compartidos

## Importación y archivos

```tsx
import { Chevron, Check, Minus, Plus, Close, Spinner } from "@/components/own/icons";
import type { SpinnerProps } from "@/components/own/icons";
```

`components/own/icons/index.tsx` define los cinco iconos estáticos con un helper SVG privado y reexporta `Spinner` y `SpinnerProps` desde `spinner.tsx`. Copia ambos archivos para conservar esa ruta de importación. Si solo necesitas Spinner y ningún archivo exportado importa el índice, puedes copiar `spinner.tsx` e importarlo directamente desde `@/components/own/icons/spinner`.

| Icono | Dibujo y uso |
| :--- | :--- |
| `Chevron` | Flecha hacia abajo. La pieza que lo contiene puede rotarla para indicar dirección o apertura. |
| `Check` | Marca de verificación para una selección o confirmación. |
| `Minus` | Trazo horizontal para disminuir un valor o acompañar una selección parcial. |
| `Plus` | Signo más para aumentar un valor o añadir contenido. |
| `Close` | Aspa para cerrar o limpiar. |
| `Spinner` | Aro tenue y arco giratorio para acompañar un estado de carga. |

## Props y estilos

Los seis aceptan `React.ComponentProps<"svg">`, incluidos `className`, `style`, eventos y `ref`. El tipo público `SpinnerProps` es un alias de ese tipo. Los componentes aportan el dibujo de su SVG. `children` forma parte del tipo nativo, pero los trazos internos son los que se renderizan.

Los cinco iconos estáticos usan `viewBox="0 0 24 24"`, `fill="none"`, trazo `currentColor` de grosor `2` y extremos y uniones redondeados. Define sus dimensiones con `className`, `style` o atributos SVG. Props como `strokeWidth` se aplican al SVG raíz y pueden sobrescribir los valores predeterminados.

Spinner usa el mismo `viewBox`, `data-slot="spinner"` y `clsx` para combinar `size-4 shrink-0 animate-spin` con `className`. El aro tiene `opacity-25` y tanto el aro como el arco usan trazos propios con `currentColor` y grosor `2.5`. Para cambiar el color, ajusta `color` en el SVG o en un ancestro. Para fijar sus dimensiones sin depender de la cascada de utilidades, usa `style` con `width` y `height`.

## Accesibilidad y composición

Los SVG son decorativos por defecto mediante `aria-hidden="true"`. Si un botón muestra solo el icono, nombra el botón con texto accesible o `aria-label`. El consumidor controla el estado de carga y puede comunicarlo con `aria-busy` y texto de estado. La animación predeterminada de Spinner gira de forma continua. En una instancia directa, añade `motion-reduce:animate-none` para conservar un indicador estático cuando el usuario prefiera menos movimiento.

```tsx
import { Close, Spinner } from "@/components/own/icons";

export function SearchIndicators({ pending }: { pending: boolean }) {
  return (
    <form aria-busy={pending}>
      <label>
        Buscar
        <input type="search" name="query" />
      </label>
      <button type="reset" aria-label="Limpiar búsqueda">
        <Close className="size-4" />
      </button>
      {pending && (
        <span className="inline-flex items-center gap-2">
          <Spinner className="motion-reduce:animate-none" />
          Buscando…
        </span>
      )}
    </form>
  );
}
```

Los iconos conservan la semántica del control que los contiene. Consulta la [estructura de exportación](structure.md#iconos-de-soporte) para los componentes que dependen de estos archivos.
