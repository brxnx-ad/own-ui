# own-ui · Sistema de estilos

> **Objetivo y alcance del documento:** Explicar la generación de paletas, los tokens de Tailwind, las utilidades tipográficas y de sombras, y la ubicación de los estilos de componente. Se considera desactualizado si la configuración global, las utilidades o las reglas locales difieren de lo descrito aquí.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md) · [Pendientes](05-pendientes.md)

---

## 1. Semillas y generación de paletas

El sistema cromático parte de **6 semillas base (Nivel 500)** definidas en el espacio perceptual **OKLCH**, lo que garantiza uniformidad de luminancia y saturación entre distintas familias de color:

| Semilla | Valor OKLCH | Rol cromático |
| :--- | :--- | :--- |
| `--seed-primary` | `oklch(0.58 0.2 264)` | Cobalto (identidad y acciones principales) |
| `--seed-gray` | `oklch(0.55 0.014 264)` | Neutro frío (superficies, textos y bordes) |
| `--seed-success` | `oklch(0.55 0.155 152)` | Jade (confirmación y estados positivos) |
| `--seed-warning` | `oklch(0.6 0.165 65)` | Ámbar (alertas y precaución) |
| `--seed-error` | `oklch(0.58 0.22 27)` | Carmesí (errores, advertencias críticas y acciones destructivas) |
| `--seed-info` | `oklch(0.56 0.14 215)` | Cian (información contextual y soporte) |

### Escalas algorítmicas (`color-mix`)
A partir de cada semilla se calcula automáticamente la escala completa (`50` a `950`) mezclando la semilla con blanco o negro en espacio `oklab`:
* **Tonos claros (`50`–`400`):** `color-mix(in oklab, var(--seed-*), white <porcentaje>%)` (de `97%` en nivel 50 hasta `36%` en nivel 400).
* **Tono base (`500`):** Valor puro de la semilla (`var(--seed-*)`).
* **Tonos oscuros (`600`–`950`):** `color-mix(in oklab, var(--seed-*), black <porcentaje>%)` (de `16%` en nivel 600 hasta `74%` en nivel 950).
* **Escala neutra extendida (`--gray-*`):** Se genera en pasos continuos de **50 en 50** (`50`, `100`, `150` ... `950`) para ofrecer precisión fina en los planos de elevación de la interfaz.

---

## 2. Magnitudes por modo (Tríadas `soft`, `base`, `bold`)

En lugar de exponer las 11 paradas de cada escala directamente en los componentes, cada paleta se abstrae en **3 magnitudes semánticas** que se adaptan automáticamente entre modo claro (`:root`) y modo oscuro (`.dark`):

### Planos de superficie (`surface-*`)
Sustituyen el modelo tradicional de `background` / `card` / `popover` por tres niveles de elevación física derivados de `--gray-*`:

| Magnitud | Modo Claro | Modo Oscuro | Rol en la interfaz |
| :--- | :--- | :--- | :--- |
| `surface-soft` | `--gray-150` | `--gray-950` | Lienzo general de la aplicación (`body`). |
| `surface-base` | `--gray-100` | `--gray-900` | Nivel intermedio: tarjetas, modales, drawers y contenedores. |
| `surface-bold` | `--gray-50` | `--gray-800` | Controles interactivos elevados: inputs, selectores y elevación en hover/active de botones. |

### Tríadas de paletas (`primary`, `gray`, `success`, `warning`, `error`, `info`)

| Magnitud | Modo Claro | Modo Oscuro | Uso principal |
| :--- | :--- | :--- | :--- |
| `*-soft` | Nivel `200` (`100` en `gray`) | Nivel `900` (`850` en `gray`) | Fondos tenues, contenedores de estado y badges suaves. |
| `*-base` | Nivel `500` (`200` en `gray`) | Nivel `600` (`700` en `gray`) | Estado activo base, rellenos sólidos y bordes de acento. |
| `*-bold` | Nivel `600` (`700` en `gray` y `error`) | Nivel `700` (`100` en `gray`, `300` en `error`) | Texto de alto contraste sobre fondos `soft` o `surface`, iconos y estados interactivos. |

---

## 3. Variables de Tailwind disponibles (`@theme inline`)

Al registrar los tokens en `@theme inline`, Tailwind CSS v4 habilita automáticamente las clases utilitarias para cualquier propiedad de color (`bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*`):

* **Superficies:** `*-surface-soft`, `*-surface-base`, `*-surface-bold`.
* **Primario:** `*-primary-soft`, `*-primary-base`, `*-primary-bold`.
* **Neutro (`gray`):** `*-gray-soft`, `*-gray-base`, `*-gray-bold`.
* **Éxito (`success`):** `*-success-soft`, `*-success-base`, `*-success-bold`.
* **Advertencia (`warning`):** `*-warning-soft`, `*-warning-base`, `*-warning-bold`.
* **Error (`error`):** `*-error-soft`, `*-error-base`, `*-error-bold`.
* **Información (`info`):** `*-info-soft`, `*-info-base`, `*-info-bold`.
* **Tipografía:** `font-sans` (vinculada a **Plus Jakarta Sans** con cascada de fallbacks del sistema).

---

## 4. Utilidades disponibles

### Escala tipográfica (`@layer base` y `@layer utilities`)

| Selector / Clase | Tamaño | Peso | Line-height | Tracking | Propósito |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `h1`, `.h1` | `clamp(1.875rem, 1.6rem + 1.2vw, 2.375rem)` | `700` | `1.15` | `-0.035em` | Título principal de página (`text-wrap: balance`). |
| `h2`, `.h2` | `clamp(1.5rem, 1.35rem + 0.75vw, 1.75rem)` | `700` | `1.20` | `-0.025em` | Título de sección (`text-wrap: balance`). |
| `h3`, `.h3` | `clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)` | `600` | `1.25` | `-0.015em` | Subsección o encabezado de bloque (`text-wrap: balance`). |
| `h4`, `.h4` | `1.125rem` (18px) | `600` | `1.30` | `-0.010em` | Encabezado de tarjeta o diálogo. |
| `h5`, `.h5` | `1.000rem` (16px) | `600` | `1.35` | `-0.005em` | Agrupador interno. |
| `h6`, `.h6` | `0.875rem` (14px) | `500` | `1.40` | `+0.010em` | Subtítulo menor. |
| `.subtitle` | `1.125rem` (18px) | `400` | `1.45` | `-0.010em` | Bajada descriptiva bajo H1/H2 (`text-wrap: pretty`). |
| `.subtitle-sm` | `0.875rem` (14px) | `400` | `1.40` | `0em` | Bajada secundaria en tarjetas y modales. |
| `.body`, `.body-base` | `1.000rem` (16px) | `400` | `1.50` | `-0.012em` | Texto principal de lectura (`text-wrap: pretty`). |
| `.body-sm` | `0.875rem` (14px) | `400` | `1.45` | `-0.005em` | Texto compacto, descripciones técnicas y listas. |
| `.caption` | `0.800rem` (12.8px) | `400` | `1.40` | `+0.015em` | Metadatos, notas al pie y sellos de tiempo. |
| `.overline` | `0.6875rem` (11px) | `600` | `1.30` | `+0.080em` | Etiqueta superior en mayúsculas (`uppercase`). |

### Sistema de sombras (`shadow-*` y `shadow-inset-*`)

Compuesto por dos familias de 3 magnitudes universales (funcionan en modo claro y oscuro mediante canales alfa neutros):

* **Sombras cenitales (`shadow-s`, `shadow-m`, `shadow-l`):**  
  Combinan un bisel superior interior iluminado (`inset 0 1px 2px #ffffff*`), una sombra oscura de contacto y una sombra suave de dispersión ambiental.
* **Sombras de relieve hundido (`shadow-inset-s`, `shadow-inset-m`, `shadow-inset-l`):**  
  Invierten el plano físico aplicando sombra interior en el borde superior y un reflejo especular claro en el borde inferior, simulando cavidades o controles presionados.

## 5. Animaciones y estilos de componente

Cada familia que requiera animaciones propias o transiciones coordinadas entre piezas las define, junto con los estados y la geometría asociados, en un archivo `<componente>.module.css` que importa desde su implementación. Las reglas locales usan `@layer components` para admitir ajustes con utilidades de Tailwind. Las transiciones simples pueden usar las utilidades existentes en el componente. `globals.css` reúne los estilos compartidos por toda la aplicación.

El import local permite que Next.js agrupe el CSS según las dependencias de cada ruta y mantiene el módulo junto al componente al exportarlo. El coste por fotograma depende de las propiedades animadas y los elementos que afectan.

| Archivo | Responsabilidad |
| :--- | :--- |
| `accordion.module.css` | Controla la altura y la opacidad del panel durante la apertura y el cierre. |
| `collapsible.module.css` | Controla la altura y la opacidad del panel durante la apertura y el cierre. |
| `drawer.module.css` | Coordina la opacidad del fondo y la traslación del panel al abrir, arrastrar y cerrar. Define la geometría del agarre y la reserva de espacio en los puntos de ajuste. |
| `field.module.css` | Define la separación entre piezas y coordina la altura, la opacidad y el espacio que ocupa `FieldError` al aparecer o desaparecer. |
| `floating-input.module.css` | Posiciona la etiqueta según el foco y el valor. En `outline`, el recorte abre desde el centro y sus extremos quedan en el tramo recto del borde. |
| `navigation-menu.module.css` | Coordina la posición, las dimensiones y la entrada direccional del contenido. |
| `popover.module.css` | Coordina el tamaño del popup y el contenido al cambiar de activador. |
| `preview-card.module.css` | Coordina el tamaño del popup y el contenido al cambiar de activador. |
| `select.module.css` | Coordina el indicador, el fondo y la apertura del popup. |
| `tooltip.module.css` | Coordina el tamaño del popup y el contenido al cambiar de activador. |
| `progress.module.css` | Define el barrido del indicador indeterminado mediante `own-ui-progress-sweep` e `inset-inline-start`. |
| `skeleton.module.css` | Sincroniza el barrido de los marcadores visibles mediante una posición de fondo compartida. |
| `toast.module.css` | Coordina la entrada, la salida y la transformación aplicada al arrastrar el aviso. |

La etiqueta de FloatingInput y el recorte de `outline` empiezan a moverse juntos. El bloque centraliza la transición de posición, tamaño de fuente y altura de línea, además de la apertura y el cierre del borde. Con `prefers-reduced-motion: reduce`, los estados cambian de inmediato.

El barrido indeterminado de Progress se activa con `prefers-reduced-motion: no-preference`. Con movimiento reducido, el segmento queda centrado y estático.

Drawer usa una duración base de `300ms`. Durante el arrastre, el panel sigue el gesto con duración cero. El cierre ajusta la duración con `--drawer-swipe-strength`. Con movimiento reducido, el panel sigue respondiendo al arrastre y los cambios de estado se aplican de inmediato.
