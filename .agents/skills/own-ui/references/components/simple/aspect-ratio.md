# Aspect Ratio

## 1. Identificación

Aspect Ratio usa un `div`, la propiedad CSS `aspect-ratio` y `clsx`.

## 2. Propósito y casos de uso

Reserva un marco para imágenes, videos, gráficos o marcadores de carga. Ajusta el ancho en el contenedor y deja que la altura derive de la proporción. El contenido multimedia conserva su propia semántica y reglas de ajuste.

## 3. Importación y anatomía

```tsx
import { AspectRatio } from "@/components/own/simple/aspect-ratio";

<AspectRatio ratio={16 / 9}>
  <div className="absolute inset-0">Contenido del marco</div>
</AspectRatio>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `AspectRatio` | `div` | Marco relativo. El consumidor aporta su contenido y decide cómo ajustarlo al marco. |

El módulo exporta también `AspectRatioProps`.

## 4. Variantes y tamaños

La familia carece de variantes y tamaños propios. `ratio` expresa ancho dividido por altura. Usa `1` para un cuadrado, `16 / 9` para un marco horizontal y `3 / 4` para un marco vertical.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AspectRatio` | `ratio` | `number` | `1` | Sí | Acepta un número finito mayor que cero. Si falla la validación, aplica 1. |
| `AspectRatio` | `style.aspectRatio` | `CSSProperties["aspectRatio"]` | Deriva de `ratio` | Sí | El objeto style del consumidor se aplica después del valor calculado. |
| `AspectRatio` | Props HTML y `ref` | `ComponentPropsWithRef<"div">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

El marco recalcula el estilo inline cuando se vuelve a renderizar con otra proporción. Expone `data-slot="aspect-ratio"`. La familia carece de estado interno y de atributos de variante o tamaño.

## 7. Estilos admitidos por pieza

El `div` solo aporta `relative` y `min-w-0` además de la proporción inline. Define el ancho disponible desde el contenedor o el propio `className`. Una altura fija junto con un ancho fijo deja ambas dimensiones determinadas. Los hijos en flujo pueden exigir más altura. Para un recorte explícito, aplica `overflow-hidden` y `rounded-base` al marco, y `object-cover` al medio. La familia carece de color, tipografía, borde, sombra, animaciones y prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
import Image from "next/image";
import { AspectRatio } from "@/components/own/simple/aspect-ratio";

export function Cover() {
  return (
    <div className="max-w-xl">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-base">
        <Image src="/cover.jpg" alt="Vista del valle al amanecer" fill sizes="(max-width: 576px) 100vw, 576px" className="object-cover" />
      </AspectRatio>
    </div>
  );
}
```

## 9. Accesibilidad e integración

El `div` tiene semántica genérica. Asigna texto alternativo, subtítulos o controles según el contenido. Evita recortar el indicador de foco si el marco contiene un elemento interactivo. Con `next/image`, provee el archivo de imagen y un `sizes` coherente con el ancho real.

## 10. Límites y verificación

Comprueba el resultado con ancho estrecho, contenido en flujo y dimensiones explícitas. La proporción CSS interviene cuando alguna dimensión puede ajustarse. Exporta `aspect-ratio.tsx`. El ejemplo con Image depende de la configuración y los recursos del consumidor.
