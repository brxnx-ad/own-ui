# own-ui · Showcase de componentes

> **Objetivo y alcance del documento:** Documentar la arquitectura de navegación, responsabilidades y reglas de maquetación del catálogo interactivo dentro de `app/(showcase)`. Se considera desactualizado si la estructura de rutas del showcase difiere de este esquema o si las páginas de componentes individuales no respetan el patrón de presentación y espaciado aquí establecido.

[Estructura del proyecto](../01-estructura-del-proyecto.md) · [Sistema de estilos](../02-estilos.md) · [Objetivos](../03-objetivos.md) · [Mantenimiento](../04-mantenimiento.md) · [Creación de componentes](creacion-de-componentes.md)

---

## 1. Página inicial del showcase (`app/(showcase)/page.tsx`)

La página de inicio (`/`) funciona exclusivamente como un **directorio o índice navegable** de componentes:

* **Listado limpio:** Muestra una colección estructurada de tarjetas que resumen cada componente disponible (nombre, categoría semántica y descripción técnica concisa).
* **Navegación directa:** Cada elemento del listado es un enlace interactivo hacia la página dedicada del componente correspondiente.
* **Sin sobrecarga visual:** No embebe variantes completas ni controles interactivos en la portada, preservando la ligereza y escalabilidad del índice a medida que el catálogo crezca.

---

## 2. Páginas dedicadas por componente (`app/(showcase)/[componente]/page.tsx`)

Cada componente registrado cuenta con su propia ruta independiente (por ejemplo, `/button`):

* **Encabezado y contexto:** Incluye un enlace de retorno (`Volver al catálogo`), el alternador de temas claro y oscuro (`ThemeToggle`), el nombre del componente, la referencia a la primitiva headless de Base UI que lo sustenta (`@base-ui/react/*`) y un párrafo descriptivo sobre su rol en el sistema de diseño.
* **Separación de responsabilidades:** La página se dedica por completo a desglosar las posibilidades visuales, dimensiones, ranuras y estados del componente.

---

## 3. Estructura y reglas de organización de una página de componente

La exhibición de cada componente debe organizarse bajo una pauta visual modular y predecible:

### A. Bloques dedicados por variante
Cada variante visual (`Primary`, `Secondary`, `Outline`, `Ghost`, `Destructive`) cuenta con su propia sección (`ShowcaseSection`), que incluye:
* **Título y descripción:** Nombre de la variante y su rol de jerarquía en el sistema.
* **Píldora de prop:** Código monoespaciado con el valor de la API (ej. `variant="primary"`).
* **Contenedor integral de estados:** Un lienzo delimitado (`bg-surface-base`, `border-gray-base`, `rounded-2xl`, `shadow-s`) donde se integran todos los estados de esa variante (`Normal`, `Loading` y `Disabled`).

### B. Señalización explícita de estados
Dentro del contenedor de cada variante, cada estado interactivo se exhibe en una fila dedicada y etiquetada:
* **Normal:** Estado en reposo con interactividad completa.
* **Loading:** Señalizado con la etiqueta de estado y la píldora `loading`.
* **Disabled:** Señalizado con la etiqueta de estado y la píldora `disabled`.
* **Separadores limpios:** Cada estado se delimita mediante un divisor sutil (`h-px bg-gray-base/40`).

### C. Criterio de alineación horizontal (lado a lado)
Dentro de la fila de cada estado específico:
* **Permitido exclusivamente lado a lado:** Únicamente los distintos tamaños disponibles (`sm`, `md`, `lg`) y sus respectivas versiones con/sin ícono (o solo ícono) se disponen horizontalmente para contrastar su escala óptica y proporción.
* **Prohibido:** No se deben mezclar variantes distintas en el mismo contenedor ni disponer estados diferentes en una misma fila sin su debida separación.
