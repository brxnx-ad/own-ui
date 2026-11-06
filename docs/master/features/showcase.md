# own-ui · Showcase de componentes

> **Objetivo y alcance del documento:** Documentar la navegación del catálogo interactivo dentro de `app/(showcase)` y el patrón de presentación de ejemplos, anatomía y referencia de API establecido en Accordion. Se considera desactualizado si las rutas, la organización de Accordion o la presentación específica de Button difieren de lo descrito en este documento.

[Estructura del proyecto](../01-estructura-del-proyecto.md) · [Sistema de estilos](../02-estilos.md) · [Objetivos](../03-objetivos.md) · [Mantenimiento](../04-mantenimiento.md) · [Pendientes](../05-pendientes.md) · [Creación de componentes](creacion-de-componentes.md)

---

## 1. Página inicial del showcase (`app/(showcase)/page.tsx`)

La página de inicio (`/`) funciona exclusivamente como un **directorio o índice navegable** de componentes:

* **Listado limpio:** Muestra una colección estructurada de tarjetas que resumen cada componente disponible (nombre, categoría semántica y descripción técnica concisa).
* **Navegación directa:** Cada elemento del listado es un enlace interactivo hacia la página dedicada del componente correspondiente.
* **Sin sobrecarga visual:** No embebe variantes completas ni controles interactivos en la portada, preservando la ligereza y escalabilidad del índice a medida que el catálogo crezca.

---

## 2. Páginas dedicadas por componente (`app/(showcase)/[componente]/page.tsx`)

Cada componente registrado cuenta con su propia ruta independiente (por ejemplo, `/button`):

* **Encabezado y contexto:** Incluye un enlace de retorno (`Volver al catálogo`), el alternador de temas claro y oscuro (`ThemeToggle`), el nombre del componente, la referencia a la primitiva headless de Base UI que lo sustenta (`@base-ui/react/*`) y una descripción breve de su función.
* **Separación de responsabilidades:** La página se dedica por completo a desglosar las posibilidades visuales, dimensiones, ranuras y estados del componente.

---

## 3. Patrón de presentación basado en Accordion

Accordion establece el patrón de referencia para nuevos showcases. La página presenta primero todos los ejemplos, después la anatomía y finalmente la referencia de API.

### 3.1. Ejemplos individuales

* **Un comportamiento por sección:** Cada ejemplo tiene título, descripción y contenedor propios. No se agrupan ejemplos distintos en una tarjeta compartida ni bajo categorías intermedias.
* **Inicio descriptivo:** El primer ejemplo muestra el comportamiento habitual y se titula por su función, como `Apertura individual`, sin etiquetas genéricas como `Ejemplo principal`.
* **Una sola descripción:** Debajo del título hay una frase breve que integra la prop o indicación necesaria con código en línea, por ejemplo: `Permite abrir varios paneles a la vez con multiple.` No se añaden filas independientes de props, etiquetas de opcionalidad ni explicaciones redundantes.
* **Contenido demostrable:** Se cubren los comportamientos relevantes mediante ejemplos interactivos. Los tipos, valores predeterminados y detalles de callbacks se reservan para la referencia de API; se evitan mensajes auxiliares que solo registren cambios de estado.
* **Espacio y superficies:** La página usa `max-w-4xl` y separación vertical `space-y-12`. Cada sección usa `space-y-4`; el ejemplo se presenta en un contenedor `rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8`.

### 3.2. Anatomía después de los ejemplos

* **Composición real:** Un bloque JSX muestra las piezas exportadas por own-ui y su anidación real, no una API alternativa de Base UI.
* **Responsabilidades:** Una tabla de dos columnas (`Pieza` y `Responsabilidad`) explica la función de cada parte.
* **Semántica:** Los encabezados de los ejemplos siguen la jerarquía de la página. Cuando se sustituye un elemento mediante `render`, se conserva su comportamiento accesible.

### 3.3. Referencia de API al final

* **Tabla por pieza:** Las columnas son `Pieza`, `Prop o callback`, `Tipo`, `Predeterminado`, `Opcional` y `Función`. Las props compartidas se agrupan sin repetirlas para cada pieza.
* **Opcionalidad y condiciones:** La tabla indica qué opciones son opcionales y explica las combinaciones necesarias, la herencia desde la raíz y la precedencia entre opciones.
* **Callbacks:** Se muestra su firma, cuándo se ejecutan y las consideraciones relevantes del evento.
* **Notas complementarias:** Tipos auxiliares, teclado, movimiento reducido, atributos HTML y opciones obsoletas se explican con notas breves debajo de la tabla.
* **Lectura accesible:** Las tablas tienen encabezados y títulos accesibles. La tabla de API permite desplazamiento horizontal dentro de un contenedor enfocable, sin ensanchar la página en móvil.

---

## 4. Presentación específica de Button

El showcase de Button conserva su organización por variantes y estados:

### 4.1. Bloques dedicados por variante
En Button, cada variante visual (`Primary`, `Secondary`, `Outline`, `Ghost`, `Destructive`) cuenta con su propia sección (`ShowcaseSection`), que incluye:
* **Título y descripción:** Nombre de la variante y su rol de jerarquía en el sistema.
* **Píldora de prop:** Código monoespaciado con el valor de la API (ej. `variant="primary"`).
* **Contenedor integral de estados:** Un lienzo delimitado (`bg-surface-base`, `border-gray-base`, `rounded-2xl`, `shadow-s`) donde se integran todos los estados de esa variante (`Normal`, `Loading` y `Disabled`).

### 4.2. Señalización explícita de estados
En Button, dentro del contenedor de cada variante, cada estado interactivo se exhibe en una fila dedicada y etiquetada:
* **Normal:** Estado en reposo con interactividad completa.
* **Loading:** Señalizado con la etiqueta de estado y la píldora `loading`.
* **Disabled:** Señalizado con la etiqueta de estado y la píldora `disabled`.
* **Separadores limpios:** Cada estado se delimita mediante un divisor sutil (`h-px bg-gray-base/40`).

### 4.3. Criterio de alineación horizontal (lado a lado)
Dentro de la fila de cada estado específico:
* **Permitido exclusivamente lado a lado:** Únicamente los distintos tamaños disponibles (`sm`, `md`, `lg`) y sus respectivas versiones con/sin ícono (o solo ícono) se disponen horizontalmente para contrastar su escala óptica y proporción.
* **Prohibido:** No se deben mezclar variantes distintas en el mismo contenedor ni disponer estados diferentes en una misma fila sin su debida separación.

---

## 5. Cobertura del showcase de Accordion

La ruta `/accordion` presenta estos ejemplos independientes, en este orden:

1. **Apertura individual:** Un panel inicialmente abierto y un elemento deshabilitado.
2. **Apertura múltiple:** Varios paneles pueden permanecer abiertos con `multiple`.
3. **Estado controlado:** Botones externos coordinados mediante `value` y `onValueChange`.
4. **Deshabilitación global:** Todos los elementos deshabilitados desde la raíz con `disabled`.
5. **Conservar contenido:** Un campo mantiene su valor al cerrar y reabrir el panel con `keepMounted`.
6. **Buscar contenido:** Búsqueda del navegador sobre un panel cerrado con `hiddenUntilFound`.
7. **Nivel de encabezado:** Personalización de la semántica mediante `render`.

Después de los ejemplos, Anatomía muestra la composición `Accordion > AccordionItem > AccordionHeader > AccordionTrigger`, con `AccordionPanel` como hermano de `AccordionHeader`. La referencia de API explica las opciones de la raíz, el elemento, el activador y el panel, además de las props compartidas.

Los ejemplos con estado local residen en `examples.tsx`; la anatomía y la tabla de API, en `api-reference.tsx`, dentro de la ruta. El panel anima altura y opacidad, el chevron gira al abrirse y se respeta la preferencia de movimiento reducido.
