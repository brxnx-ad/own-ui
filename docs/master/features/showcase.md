# own-ui · Showcase de componentes

> **Objetivo y alcance del documento:** Documentar la navegación del catálogo interactivo dentro de `app/(showcase)`, sus imports, el centrado de las demostraciones y el patrón de presentación de ejemplos, anatomía y referencia de API establecido en Accordion. Se considera desactualizado si las rutas, los imports, la alineación de los ejemplos o la cobertura de los showcases descritos difieren de lo documentado.

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

* **Encabezado y contexto.** Incluye el enlace `Volver al catálogo`, el alternador de temas `ThemeToggle`, el nombre del componente, su base de implementación y una descripción breve.
* **Separación de responsabilidades:** La página se dedica por completo a desglosar las posibilidades visuales, dimensiones, ranuras y estados del componente.

### 2.1. Rutas e imports del catálogo actual

| Componente | Ruta | Import del componente propio |
| :--- | :--- | :--- |
| Accordion | `/accordion` | `@/components/own/base/accordion` |
| Alert | `/alert` | `@/components/own/simple/alert` |
| Alert Dialog | `/alert-dialog` | `@/components/own/base/alert-dialog` |
| Aspect Ratio | `/aspect-ratio` | `@/components/own/simple/aspect-ratio` |
| Attachment | `/attachment` | `@/components/own/composed/attachment` |
| Autocomplete | `/autocomplete` | `@/components/own/base/autocomplete` |
| Avatar | `/avatar` | `@/components/own/base/avatar` |
| Badge | `/badge` | `@/components/own/simple/badge` |
| Button | `/button` | `@/components/own/base/button` |
| Button Group | `/button-group` | `@/components/own/composed/button-group` |
| Card | `/card` | `@/components/own/simple/card` |
| Checkbox | `/checkbox` | `@/components/own/base/checkbox` |
| Checkbox Group | `/checkbox-group` | `@/components/own/base/checkbox-group` |
| Collapsible | `/collapsible` | `@/components/own/base/collapsible` |
| Combobox | `/combobox` | `@/components/own/base/combobox` |
| Context Menu | `/context-menu` | `@/components/own/base/context-menu` |
| Dialog | `/dialog` | `@/components/own/base/dialog` |
| Drawer | `/drawer` | `@/components/own/base/drawer` |
| Empty | `/empty` | `@/components/own/simple/empty` |
| Field | `/field` | `@/components/own/base/field` |
| Fieldset | `/fieldset` | `@/components/own/base/fieldset` |
| FloatingInput | `/floating-input` | `@/components/own/composed/floating-input` |
| Form | `/form` | `@/components/own/base/form` |
| Input | `/input` | `@/components/own/base/input` |
| Input Group | `/input-group` | `@/components/own/composed/input-group` |
| Item | `/item` | `@/components/own/composed/item` |
| Menu | `/menu` | `@/components/own/base/menu` |
| Menubar | `/menubar` | `@/components/own/base/menubar` |
| Meter | `/meter` | `@/components/own/base/meter` |
| Navigation Menu | `/navigation-menu` | `@/components/own/base/navigation-menu` |
| Number Field | `/number-field` | `@/components/own/base/number-field` |
| OTP Field | `/otp-field` | `@/components/own/base/otp-field` |
| Pagination | `/pagination` | `@/components/own/composed/pagination` |
| Popover | `/popover` | `@/components/own/base/popover` |
| Preview Card | `/preview-card` | `@/components/own/base/preview-card` |
| Progress | `/progress` | `@/components/own/base/progress` |
| Radio Group | `/radio-group` | `@/components/own/base/radio-group` |
| Scroll Area | `/scroll-area` | `@/components/own/base/scroll-area` |
| Select | `/select` | `@/components/own/base/select` |
| Separator | `/separator` | `@/components/own/base/separator` |
| Skeleton | `/skeleton` | `@/components/own/simple/skeleton` |
| Slider | `/slider` | `@/components/own/base/slider` |
| Switch | `/switch` | `@/components/own/base/switch` |
| Table | `/table` | `@/components/own/simple/table` |
| Tabs | `/tabs` | `@/components/own/base/tabs` |
| Textarea | `/textarea` | `@/components/own/simple/textarea` |
| Toast | `/toast` | `@/components/own/base/toast` |
| Toggle | `/toggle` | `@/components/own/base/toggle` |
| Toggle Group | `/toggle-group` | `@/components/own/base/toggle-group` |
| Toolbar | `/toolbar` | `@/components/own/base/toolbar` |
| Tooltip | `/tooltip` | `@/components/own/base/tooltip` |

Los ejemplos pueden combinar familias del catálogo. Alert Dialog permanece en `base/` cuando el showcase aporta Button mediante `render` o como acción con cierre controlado. La clasificación se determina por la definición de cada familia. [Estructura del proyecto](../01-estructura-del-proyecto.md#3-clasificación-de-componentes)

El showcase de Avatar carga una silueta genérica de usuario desde `public/showcase/avatar.svg`. La imagen se sirve en `/showcase/avatar.svg` y deja visible la superficie del avatar a través de su fondo transparente.

---

## 3. Patrón de presentación basado en Accordion

Accordion establece el patrón de referencia para nuevos showcases. La página presenta primero todos los ejemplos, después la anatomía y finalmente la referencia de API.

### 3.1. Ejemplos individuales

* **Un comportamiento por sección:** Cada ejemplo tiene título, descripción y contenedor propios. No se agrupan ejemplos distintos en una tarjeta compartida ni bajo categorías intermedias.
* **Inicio descriptivo:** El primer ejemplo muestra el comportamiento habitual y se titula por su función, como `Apertura individual`, sin etiquetas genéricas como `Ejemplo principal`.
* **Una sola descripción:** Debajo del título hay una frase breve que integra la prop o indicación necesaria con código en línea, por ejemplo: `Permite abrir varios paneles a la vez con multiple.` No se añaden filas independientes de props, etiquetas de opcionalidad ni explicaciones redundantes.
* **Contenido demostrable:** Se cubren los comportamientos relevantes mediante ejemplos interactivos. Los tipos, valores predeterminados y detalles de callbacks se reservan para la referencia de API; se evitan mensajes auxiliares que solo registren cambios de estado.
* **Espacio y superficies:** La página usa `max-w-4xl` y separación vertical `space-y-12`. Cada sección usa `space-y-4`; el ejemplo se presenta en un contenedor `rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8`.
* **Centrado del ejemplo:** Los componentes demostrados se centran horizontalmente dentro de su contenedor. Esta disposición se define en el showcase; los componentes propios conservan su neutralidad de maquetación. Los títulos y las descripciones de las secciones, los bloques de código y las tablas mantienen su alineación de lectura.

#### 3.1.1. Aplicación del centrado por componente

| Componente | Disposición del ejemplo |
| :--- | :--- |
| Button | El contenedor usa `flex flex-col items-center gap-6`. Las etiquetas de estado y las filas de tamaños se centran con `justify-center`; las filas usan `flex-wrap` para adaptarse al ancho disponible. Los botones individuales conservan su ancho natural. |
| Accordion | Cada ejemplo se presenta en un bloque interior `mx-auto w-full max-w-xl`, centrado y adaptable al ancho disponible. Los botones externos del ejemplo controlado usan `flex flex-wrap justify-center gap-2`. El texto de los encabezados y paneles conserva su alineación de lectura. |
| Alert Dialog | El contenedor usa `flex flex-col items-center`. Los ejemplos con estado o activadores externos usan `flex w-full flex-col items-center gap-4 text-center`, y las filas de activadores, `flex flex-wrap justify-center gap-2`. El popup renderizado en el portal conserva la disposición propia de su contenido y sus acciones. |

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
* **Separadores limpios:** Cada estado se delimita mediante un divisor sutil de ancho completo (`h-px w-full bg-gray-base/40`).

### 4.3. Criterio de alineación horizontal (lado a lado)

Dentro de la fila de cada estado específico:

* **Centrado y adaptación:** La etiqueta y la píldora de estado se centran como grupo. La fila de tamaños usa `flex flex-wrap items-center justify-center gap-4 sm:gap-6`; cada grupo de botón e icono permanece unido y las filas resultantes se centran también en móvil.
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

## 6. Cobertura de Input y FloatingInput

| Ruta | Ejemplos en orden |
| :--- | :--- |
| `/input` | Texto editable, valor controlado, validación con Field, solo lectura y entrada deshabilitada. |
| `/floating-input` | Etiqueta interior (`inset`), etiqueta sobre el borde (`outline`), valor inicial, valor controlado, validación con Field y campo deshabilitado. |

Cada ejemplo se centra en un bloque `mx-auto w-full max-w-md`. Los ejemplos controlados viven en `examples.tsx` y los botones de borrado devuelven el foco al control. Ambas rutas cierran con Anatomía y Referencia de API. Para verificar `outline`, enfoca un campo vacío y observa cómo la etiqueta sube mientras el recorte se abre desde su centro. Escribe un valor y sal del campo para comprobar que la etiqueta queda arriba.

## 7. Cobertura de Number Field a Radio Group

| Ruta | Ejemplos en orden |
| :--- | :--- |
| `/number-field` | Cantidad editable, ajuste por pasos, formato localizado, valor controlado, ajuste por arrastre, ajuste con la rueda, validación con Field, solo lectura y entrada deshabilitada. |
| `/otp-field` | Código de verificación, código agrupado, código alfanumérico, entrada enmascarada, valor controlado, validación con Field, envío al completar, solo lectura y entrada deshabilitada. |
| `/popover` | Panel informativo, lado y alineación, apertura al pasar el puntero, modo modal, foco contenido, foco inicial y retorno, contenido persistente, activadores separados y apertura controlada. |
| `/preview-card` | Vista previa de un enlace, demoras de apertura y cierre, lado y alineación, fondo visual, activadores separados y apertura controlada. |
| `/progress` | Avance determinado, rango y unidades, avance indeterminado, procesamiento por lotes y tarea completada. |
| `/radio-group` | Selección exclusiva, opción deshabilitada, grupo deshabilitado, solo lectura, valor controlado, validación y envío, y botón nativo. |

Las seis rutas cierran con Anatomía y Referencia de API. Number Field y Progress centran sus ejemplos en bloques de ancho máximo `max-w-xs` y `max-w-md`, respectivamente. OTP Field y Radio Group centran el conjunto en un contenedor flexible. Popover y Preview Card centran los activadores en la demostración y colocan el contenido portaleado respecto al ancla.

Para comprobar el foco en un campo vacío, borra la cantidad en Number Field o enfoca una casilla vacía de OTP Field. El placeholder reaparece al salir si el campo sigue vacío. En Popover y Preview Card, alterna entre los activadores separados para comprobar que el contenido anterior se oculta al cambiar el anclaje. En Progress, comprueba que el segmento indeterminado queda estático con movimiento reducido. Radio Group muestra la selección con un punto centrado.

## 8. Cobertura de los componentes compuestos de Takk

| Ruta | Ejemplos en orden |
| :--- | :--- |
| `/attachment` | Archivo adjunto, estados de carga, tamaños, orientación vertical, vista previa como enlace, quitar y restaurar un archivo, y grupo desplazable. |
| `/button-group` | Acciones en fila, orientación vertical, contador con texto y acciones, y separador con orientación inferida. |
| `/input-group` | Campo con prefijo, búsqueda con borrado, complementos en bloque y contador, validación de correo y campo deshabilitado. |
| `/item` | Elemento con acción, variantes, tamaños, lista con separador, encabezado y pie, y elemento completo como enlace. |
| `/pagination` | Navegación entre páginas, intervalos omitidos y tamaños de enlaces. |

Las cinco rutas cierran con Anatomía y Referencia de API mediante `ComposedReference`. Attachment, Button Group e Input Group tienen ejemplos con estado local en sus respectivos `examples.tsx`. Al quitar o restaurar un adjunto, el foco pasa a la acción disponible. Al borrar una búsqueda, el foco vuelve al campo. En la validación de correo, el borde y el mensaje de error desaparecen cuando el valor es válido.

Pagination lee `?pagina=` dentro de un límite de `Suspense` que cubre solo la demostración de navegación. El ejemplo usa la página 1 cuando falta el parámetro, es inválido o está repetido. En los extremos se omite el enlace anterior o siguiente según corresponda.

## 9. Cobertura de los componentes simples

En el índice, el filtro `Simple` reúne estas ocho rutas. Cada página presenta sus ejemplos en contenedores centrados y cierra con Anatomía y Referencia de API mediante `SimpleShowcase`.

| Ruta | Ejemplos en orden |
| :--- | :--- |
| `/alert` | Mensaje informativo (`info`), Aviso neutro (`default`), Confirmación (`success`), Advertencia (`warning`), Error (`destructive`) y Aviso dinámico. |
| `/aspect-ratio` | Formato panorámico (`16 / 9`), Formato cuadrado (`1`), Formato vertical (`3 / 4`) y Proporción por estilo (`3 / 1` mediante `style.aspectRatio`). |
| `/badge` | Categoría destacada (`default`), Etiqueta secundaria (`secondary`), Estado informativo (`info`), Estado positivo (`success`), Estado de advertencia (`warning`), Estado de error (`destructive`), Etiqueta con contorno (`outline`) y Etiqueta con icono. |
| `/card` | Tarjeta con acciones en `CardAction` y `CardFooter`, y Tamaño compacto (`size="sm"`). |
| `/empty` | Sin resultados con icono y enlace al catálogo, Estado vacío sencillo, Recurso visual libre con `EmptyMedia` y superficie `soft`, Borde y superficie con `solid` y `bold`, y Borde y fondo personalizados con `none` y `className`. |
| `/skeleton` | Carga de un perfil, Barrido sincronizado entre marcadores y Marcador en línea (`inline`). |
| `/table` | Tabla de datos con título, encabezados y fila de totales, y Desplazamiento horizontal. |
| `/textarea` | Texto editable, Valor controlado, Contador de caracteres, Crecimiento automático, Altura inicial y máxima, Valor por encima del límite, Validación nativa, Error comunicado, Solo lectura y Campo deshabilitado. |

Los ejemplos con estado local de Alert, Skeleton y Textarea viven en `examples.tsx` dentro de su ruta. En Alert, `Mostrar resultado` actualiza una región `role="status"` y el foco permanece en el botón. En Skeleton, `Mostrar perfil` sustituye los marcadores por el contenido y cambia `aria-busy` a `false`. Con movimiento reducido, los marcadores se muestran estáticos.

Para comprobar el desplazamiento de Table, enfoca la región `Resumen trimestral` con Tab y usa las flechas. En Textarea, el formulario bloquea el envío vacío o con menos de cinco caracteres. Un comentario válido muestra `Comentario válido` en la misma página y `Limpiar` restablece el campo y el contador.
