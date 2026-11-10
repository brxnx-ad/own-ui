# Skeleton

## 1. Identificación

Skeleton es un `span` decorativo que combina `clsx` y un módulo CSS para dibujar un barrido compartido.

## 2. Propósito y casos de uso

Reserva el espacio aproximado del contenido mientras se carga. Úsalo en bloques o junto al texto. La región de carga pertenece al consumidor y puede exponer `aria-busy` y un mensaje accesible. Usa [Empty](empty.md) para una vista sin contenido tras terminar la carga.

## 3. Importación y anatomía

```tsx
import { Skeleton } from "@/components/own/simple/skeleton";

<div aria-busy="true">
  <Skeleton className="h-4 w-40" />
</div>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Skeleton` | `span` | Marcador decorativo vacío. Sus dimensiones se definen desde el consumidor. |

El módulo exporta también `SkeletonProps`. Copia `skeleton.tsx` y `skeleton.module.css` juntos.

## 4. Variantes y tamaños

La familia carece de `variant` y `size`. `inline={false}` aplica `block`. `inline` aplica `inline-block` y `align-middle` para acompañar texto. Define la altura y el ancho con utilidades como `h-4 w-20`, `size-12` o con `style`.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Skeleton` | `inline` | `boolean` | `false` | Sí | Controla la presentación en bloque o en línea. |
| `Skeleton` | Props HTML y `ref` | `ComponentPropsWithRef<"span">` | — | Sí | Omite children, dangerouslySetInnerHTML y tabIndex del tipo. El componente fija aria-hidden a true. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

El `span` expone `data-slot="skeleton"` y, con `inline`, el atributo `data-inline` vacío. Cuando hay un marcador y se permite el movimiento, `:root:has(.wave)` anima una posición compartida. Cada marcador muestra solo el fragmento del gradiente que intersecta su caja. Un marcador que se monta durante el ciclo toma la posición actual. Al desaparecer el último marcador, el selector deja de aplicar la animación. El consumidor controla la carga y el montaje.

## 7. Estilos admitidos por pieza

- El `span` usa `rounded-base` y borde `gray-base`. Su base mezcla `gray-base` al 85% con `gray-bold` en OKLab. El centro del brillo mezcla esa base al 70% con `surface-bold` en claro o `gray-bold` bajo `.dark`. Carece de tipografía propia y sombra.
- `skeleton.module.css` registra `--own-ui-skeleton-wave-x` como longitud heredada. En `prefers-reduced-motion: no-preference`, la animación lineal de 2.4 s mueve una franja vertical de `clamp(5rem, 24vw, 18rem)` de izquierda a derecha. Completa el recorrido al 80% del ciclo y permanece fuera del viewport el resto. `background-attachment: fixed` alinea la franja con el viewport. Con movimiento reducido se conserva el color base sin gradiente.
- Para ajustar una instancia, usa `className`, `style` o un selector para `data-slot="skeleton"`. El módulo declara `--own-ui-skeleton-base` y `--own-ui-skeleton-light` en cada marcador y pueden sobreescribirse de forma local. Conserva la posición heredada y la preferencia de movimiento si personalizas el efecto. La familia carece de prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y, salvo la [excepción de colores `content`](../../globals.md#composición-y-precedencia-de-clases), la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import { Skeleton } from "@/components/own/simple/skeleton";

export function ProfileLoading() {
  return (
    <section aria-labelledby="profile-title">
      <h2 id="profile-title">Perfil</h2>
      <p role="status">Cargando datos del perfil…</p>
      <div aria-busy="true" className="space-y-2">
        <Skeleton className="size-12" />
        <Skeleton className="h-4 w-40" />
        <p>Equipo <Skeleton inline className="h-4 w-20" /></p>
      </div>
    </section>
  );
}
```

## 9. Accesibilidad e integración

El marcador siempre lleva `aria-hidden="true"` y no recibe foco por defecto. Comunica la carga con texto o `role="status"` fuera de la región marcada como ocupada. Retira `aria-busy` al mostrar el contenido. Conserva la presentación estática con movimiento reducido.

## 10. Límites y verificación

Verifica el barrido en varios marcadores, incluidos los que aparecen a mitad de ciclo, y compara ambos temas con y sin movimiento reducido. El efecto usa `:has()`, `@property`, `color-mix()` y fondos fijos. Un ancestro transformado puede alterar la referencia espacial de la franja. En el consumidor, conserva la carga del módulo CSS y comprueba que el estilo de `animation` de la raíz permite que se aplique el barrido.
