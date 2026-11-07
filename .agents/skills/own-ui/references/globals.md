# own-ui · Estructura y uso de globals.css

Lee esta referencia al integrar los estilos de own-ui en un proyecto Next.js con App Router, elegir colores, tipografía, geometría o elevación, cambiar el tema o modificar los tokens compartidos. Para los estados y las dimensiones de un componente concreto, consulta también su referencia.

La ruta convencional del CSS es `assets/styles/globals.css`; resuelve su ubicación y la de los componentes en el entorno consumidor mediante [estructura](structure.md). Las tablas describen la configuración base exportada de own-ui. El consumidor puede cambiar las semillas y adaptar los tokens: comprueba su CSS efectivo antes de editarlo y conserva los contratos semánticos que utilizan sus componentes.

## 1. Organización física del archivo

| Bloque, en orden | Responsabilidad |
| :--- | :--- |
| `@import "tailwindcss"` | Carga Tailwind CSS v4 y sus capas. |
| `@custom-variant dark (&:is(.dark *))` | Vincula `dark:*` a una clase `.dark` en un ancestro. |
| `@theme inline` | Expone los tokens a las utilidades de Tailwind; no contiene las paletas completas. |
| Primer `:root` de `@layer base` | Semillas, escalas calculadas, sombras y radio general. |
| Segundo `:root` de `@layer base` | `color-scheme: light`, superficies y tríadas del modo claro. |
| `.dark` de `@layer base` | `color-scheme: dark` y reasignación de superficies y tríadas. |
| Encabezados de `@layer base` | Estilos de `h1` a `h6` y sus clases equivalentes `.h1` a `.h6`. |
| `@layer utilities` | Subtítulos, cuerpo, caption y overline. |

Mantén las variables base, su asignación por tema y su exposición a Tailwind en sus respectivos bloques. Para estilos globales, usa este archivo; la disposición particular de una pantalla pertenece a su consumidor.

### Integración en Next.js App Router con Tailwind CSS v4

Importa el CSS global desde el layout raíz, `app/layout.tsx` o `src/app/layout.tsx`, según la organización del proyecto. Resuelve la ruta real del CSS mediante [estructura](structure.md). Al integrarlo en una hoja existente, combina los bloques `@theme inline`, `@layer base` y `@layer utilities` con los del consumidor; conserva un único import de Tailwind y revisa colisiones de nombres y precedencia.

La compilación debe detectar las clases literales de los componentes de own-ui, también si sus archivos están en un paquete compartido. Comprueba el alcance real del escaneo de Tailwind; si esos archivos quedan fuera, registra la fuente necesaria mediante `@source` en el CSS consumidor. Resuelve la ruta según dónde estén instalados los componentes; la ubicación de los componentes no depende de que App Router esté en `app/` o `src/app/`.

## 2. Flujo de color

La cadena es **semilla OKLCH → escala mediante mezclas en OKLab → token semántico por tema → alias de Tailwind → clase del consumidor**.

Las seis semillas de la configuración base corresponden al nivel 500:

| Variable | Valor base | Familia |
| :--- | :--- | :--- |
| `--seed-primary` | `oklch(0.58 0.2 264)` | Cobalto. |
| `--seed-gray` | `oklch(0.55 0.014 264)` | Neutro frío. |
| `--seed-success` | `oklch(0.55 0.155 152)` | Jade. |
| `--seed-warning` | `oklch(0.6 0.165 65)` | Ámbar. |
| `--seed-error` | `oklch(0.58 0.22 27)` | Carmesí. |
| `--seed-info` | `oklch(0.56 0.14 215)` | Cian. |

Cada familia tiene 11 paradas: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900` y `950`.

- En `50` a `400`, `color-mix(in oklab, var(--seed-*), white P%)` usa, respectivamente, `97`, `91`, `81`, `64` y `36` por ciento de blanco.
- En `500`, la escala usa directamente la semilla.
- En `600` a `950`, la mezcla con negro usa `16`, `32`, `50`, `62` y `74` por ciento.
- Gray añade `150`, `250`, `350`, `450`, `550`, `650`, `750` y `850`: completa 19 paradas cada 50 unidades.

Las variables como `--primary-500` o `--gray-850` son materia prima del sistema. La configuración base no las expone como una escala propia `--color-primary-500` o `--color-gray-850`. Una clase numérica que Tailwind aporte por defecto no representa automáticamente una semilla de own-ui.

## 3. Superficies y tríadas por tema

Los componentes consumen roles semánticos que ya se adaptan a ambos modos.

La integración base usa `next-themes` 0.4.6 con `attribute="class"`, `defaultTheme="system"`, `enableSystem` y `disableTransitionOnChange`. El proveedor coloca `.dark` en `html` cuando corresponde; el CSS aporta `color-scheme` y la reasignación de tokens. La sección de integración al final muestra cómo conservar este contrato entre proyectos Next.js.

| Superficie | Claro | Oscuro | Uso |
| :--- | :--- | :--- | :--- |
| `surface-soft` | `gray-150` | `gray-950` | Lienzo general. |
| `surface-base` | `gray-100` | `gray-900` | Tarjetas, popup y contenedores. |
| `surface-bold` | `gray-50` | `gray-800` | Controles elevados e interacción. |

Usa superficies para los planos neutros y las tríadas para acciones, texto, bordes y acentos de estado. Los fondos de estado pueden usar un tono semántico suave, por ejemplo `bg-error-soft`; no sustituyas el sistema de planos por colores numéricos.

| Familia | Claro: soft / base / bold | Oscuro: soft / base / bold |
| :--- | :--- | :--- |
| Primary | `200 / 500 / 600` | `900 / 600 / 700` |
| Success | `200 / 500 / 600` | `900 / 600 / 700` |
| Warning | `200 / 500 / 600` | `900 / 600 / 700` |
| Info | `200 / 500 / 600` | `900 / 600 / 700` |
| Gray | `100 / 200 / 700` | `850 / 700 / 100` |
| Error | `200 / 500 / 700` | `900 / 600 / 300` |

Gray y Error tienen asignaciones particulares; no les apliques automáticamente la fórmula de Primary. En especial, `error-bold` cambia a `error-300` en oscuro para sus usos de texto e iconos.

La asignación semántica evita duplicar los colores con `dark:*` en cada componente. Reserva una variante `dark:*` para un ajuste específico que el componente realmente necesite, como la opacidad o superficie del backdrop.

## 4. Exposición a Tailwind

`@theme inline` vincula `--color-surface-*` y `--color-{familia}-{magnitud}` a sus variables semánticas. Esto permite usarlas con `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*` y `stroke-*`.

Ejemplos de combinación:

```tsx
<div className="rounded-base border border-gray-base bg-surface-base p-4 text-gray-bold shadow-s">
  <p className="body-sm text-gray-bold/75">Contenido secundario</p>
</div>

<p className="rounded-base border border-error-base bg-error-soft p-3 text-error-bold">
  No se pudo completar la operación.
</p>
```

`ring-primary-base` es una utilidad de color válida; no existe un token semántico adicional llamado `ring` en este archivo. Tampoco hay tokens de sidebar o una geometría por componente.

### Radio y geometría

`--radius` vale `0.75rem`; `--radius-base: var(--radius)` permite `rounded-base`. Este es el radio compartido de los componentes propios. Los anchos, alturas, espaciados y límites adaptables se eligen según la referencia del componente; no se generan a partir de `--radius`.

La separación exterior, el centrado y el ancho disponible pertenecen al contenedor consumidor. La referencia de [estructura](structure.md) explica la ubicación de estas decisiones.

### Sombras

| Variables y clases | Intención |
| :--- | :--- |
| `--shadow-s`, `--shadow-m`, `--shadow-l`; `shadow-s`, `shadow-m`, `shadow-l` | Bisel interior superior claro más sombra de contacto y dispersión exterior. |
| `--shadow-inset-s`, `--shadow-inset-m`, `--shadow-inset-l`; `shadow-inset-s`, `shadow-inset-m`, `shadow-inset-l` | Relieve hundido: sombra interior superior y reflejo inferior. |

Las seis recetas usan canales alfa neutros y se comparten entre temas. `s`, `m` y `l` aumentan la magnitud del efecto.

`shadow-inset-s` procede del token `--shadow-inset-s` dentro del espacio `--shadow-*`: su receta completa es un `box-shadow` con componentes `inset`. No lo confundas con otro nombre de utilidad como `inset-shadow-s`.

## 5. Tipografía

El diseño base carga Plus Jakarta Sans mediante `Plus_Jakarta_Sans` de `next/font/google`, con `subsets: ["latin"]` y `variable: "--font-sans"`. Aplica la clase `.variable` generada a `html` y `font-sans antialiased` a `body`; `@theme inline` conecta esa variable con los fallbacks del sistema. Mantén el layout raíz como componente servidor. Si el proyecto aloja los archivos de fuente, `next/font/local` puede proporcionar la misma variable; adapta la ruta a los archivos reales sin cambiar las clases consumidoras. La escala siguiente conserva sus valores independientemente de esa elección.

| Selector o clase | Tamaño | Peso | Line-height | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| `h1`, `.h1` | `clamp(1.875rem, 1.6rem + 1.2vw, 2.375rem)` | 700 | 1.15 | -0.035em |
| `h2`, `.h2` | `clamp(1.5rem, 1.35rem + 0.75vw, 1.75rem)` | 700 | 1.20 | -0.025em |
| `h3`, `.h3` | `clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)` | 600 | 1.25 | -0.015em |
| `h4`, `.h4` | 1.125rem | 600 | 1.30 | -0.010em |
| `h5`, `.h5` | 1rem | 600 | 1.35 | -0.005em |
| `h6`, `.h6` | 0.875rem | 500 | 1.40 | +0.010em |
| `.subtitle` | 1.125rem | 400 | 1.45 | -0.010em |
| `.subtitle-sm` | 0.875rem | 400 | 1.40 | 0em |
| `.body`, `.body-base` | 1rem | 400 | 1.50 | -0.012em |
| `.body-sm` | 0.875rem | 400 | 1.45 | -0.005em |
| `.caption` | 0.8rem | 400 | 1.40 | +0.015em |
| `.overline` | 0.6875rem | 600 | 1.30 | +0.080em |

Los encabezados usan `text-wrap: balance`; subtítulos y cuerpo usan `text-wrap: pretty`. Overline transforma el texto a mayúsculas. Selecciona la semántica del encabezado por la jerarquía del documento; una clase como `h4` puede dar apariencia a otra etiqueta adecuada.

## 6. Layout, tema, portales y movimiento

La configuración base no define un reset propio para `body`, un fondo general ni estilos de interacción universales. El consumidor asigna las superficies y los colores de sus pantallas; Tailwind aporta sus estilos base mediante el import.

Este fragmento corresponde al layout raíz de App Router. El import de CSS usa un alias `@/` que debe resolver a su ubicación real; ajusta ese import al proyecto de destino. `ThemeProvider` se importa directamente desde `next-themes`, que lo exporta como componente cliente de la biblioteca: puede componerse desde este layout servidor sin añadirle `"use client"`.

```tsx
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/assets/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="relative font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="isolate">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` en `html` contempla la clase de tema que cambia en el cliente. Los selectores de tema que usen `useTheme` de `next-themes`, estado, efectos o eventos viven en módulos con `"use client"`; cuando su contenido dependa del tema resuelto en el navegador, contempla el montaje para evitar discrepancias de hidratación. Un wrapper de ThemeProvider también debe ser cliente si el proyecto decide crearlo; el layout raíz permanece servidor.

Para las piezas con portales, separa el apilamiento del contenido de la aplicación mediante un contenedor con `isolation: isolate`, dejando el destino del portal fuera cuando corresponda. Al montar Alert Dialog en `body` con su Backdrop absoluto, establece `position: relative` en `body` para darle el contexto de posicionamiento adecuado. Si se utiliza otro destino, comprueba su bloque contenedor, límites, cobertura y orden de apilamiento en lugar de trasladar esas reglas sin revisión.

El destino del portal debe recibir los tokens de tema y la tipografía necesarios. Si no hereda el contexto de la interfaz, proporciona allí la clase o las variables correspondientes. En un ShadowRoot, carga los estilos en el ámbito que renderiza las piezas y verifica también cómo se resuelven la variante `dark`, las fuentes y las variables heredadas.

El CSS base no contiene keyframes o recetas de animación propios. Las transiciones están en las clases de [Button](components/button.md), [Accordion](components/accordion.md) y [Alert Dialog](components/alert-dialog.md); consulta su referencia antes de modificarlas. Conserva sus selectores de estado y su tratamiento de `motion-reduce` o `motion-safe`.

## 7. Elegir el alcance del cambio

- Para cambiar una familia cromática completa, ajusta su semilla y revisa la escala y los dos temas.
- Para cambiar el papel de un tono en claro u oscuro, modifica la asignación semántica en el bloque de ese tema.
- Para añadir una utilidad semántica de Tailwind, define el valor y su alias en el espacio de nombres apropiado de `@theme inline`.
- Para cambiar la escala tipográfica o una receta de elevación global, modifica su definición compartida y revisa sus consumidores.
- Para adaptar una instancia, usa la API y las formas de estilo de su referencia; evita alterar tokens compartidos para resolver una sola pantalla.
- Comprueba el comportamiento visual en ambos temas y, si afecta geometría o movimiento, también con poco espacio y movimiento reducido.
