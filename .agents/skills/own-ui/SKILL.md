---
name: own-ui
description: "Usa esta skill al crear, integrar, usar, modificar, revisar o depurar componentes de own-ui y sus estilos en proyectos Next.js con App Router. Incluye el trabajo con los tokens y temas de globals.css."
---

# own-ui

own-ui es una colección exportable de componentes React para proyectos Next.js con App Router. Combina HTML nativo y primitivas de Base UI con Tailwind CSS v4. Los componentes y la configuración de `globals.css` comparten superficies, tríadas cromáticas, tipografía, sombras y geometría. Esta skill acompaña esos archivos entre proyectos Next.js y explica su uso sin requerir la aplicación donde se desarrollaron.

## Flujo de trabajo

1. **Lee primero la referencia de cada componente implicado.** Hazlo cada vez que integres, uses, compongas, modifiques, revises o depures una pieza de own-ui, incluso para un ajuste puntual de estilos, estados o accesibilidad. Busca su familia en el índice y abre el archivo enlazado. Si combinas Alert Dialog con Button, por ejemplo, lee ambas referencias.
2. **Añade las referencias de apoyo que exija la tarea.** Consulta estructura, estilos globales o iconos según corresponda. Limita la lectura a las familias y aspectos que intervienen en el trabajo.
3. **Contrasta la referencia con el proyecto consumidor.** Comprueba que estén los archivos necesarios, resuelve los imports y coteja la API y los estilos con la implementación disponible. Si una familia carece de referencia, revisa su código cuando exista y los tipos de las dependencias que use. Al crear una familia, consulta la guía de estructura y las referencias de las piezas que reutilices.

## Referencias de apoyo

- **Estructura.** Lee [structure.md](references/structure.md) para crear, mover, clasificar o exportar familias, resolver imports, dependencias y portales, o localizar la hoja global. Las rutas de los ejemplos se adaptan a la organización del consumidor.
- **Estilos globales.** Lee [globals.md](references/globals.md) para trabajar con colores, temas, superficies, tipografía, sombras, radios o la configuración de `globals.css`.
- **Iconos.** Lee [icons.md](references/icons.md) al usar o ajustar Chevron, Check, Minus, Plus, Close o Spinner.

## Índice de componentes

Cada referencia explica la anatomía, las props, los estados, la accesibilidad y las opciones de estilo de su familia.

| Componente | Referencia | Contenido |
| :--- | :--- | :--- |
| Accordion | [accordion.md](references/components/base/accordion.md) | Paneles expandibles, apertura individual o múltiple, estado controlado, persistencia y animación. |
| Alert | [alert.md](references/components/simple/alert.md) | Avisos contextuales, variantes, iconos decorativos, acciones y anuncios dinámicos. |
| Alert Dialog | [alert-dialog.md](references/components/base/alert-dialog.md) | Confirmaciones modales, acciones destructivas, foco, operaciones asíncronas y activadores compartidos. |
| Aspect Ratio | [aspect-ratio.md](references/components/simple/aspect-ratio.md) | Marcos proporcionales, dimensiones y ajuste de contenido multimedia. |
| Attachment | [attachment.md](references/components/composed/attachment.md) | Archivos adjuntos, vista previa, estados, acciones y listas desplazables. |
| Autocomplete | [autocomplete.md](references/components/base/autocomplete.md) | Texto libre con sugerencias, anclaje y dirección del panel, filtrado, grupos y límites de resultados. |
| Avatar | [avatar.md](references/components/base/avatar.md) | Imágenes de perfil, iniciales, tamaños, fallback diferido y carga con `keepMounted`. |
| Badge | [badge.md](references/components/simple/badge.md) | Etiquetas de categoría o estado, variantes e iconos. |
| Button | [button.md](references/components/base/button.md) | Acciones, variantes, tamaños, iconos, carga, deshabilitación y composición como enlace. |
| Button Group | [button-group.md](references/components/composed/button-group.md) | Botones agrupados, orientación, texto y separadores con foco accesible. |
| Card | [card.md](references/components/simple/card.md) | Superficies de contenido, densidad, encabezados, acciones y pie. |
| Carousel | [carousel.md](references/components/dependant/carousel.md) | Diapositivas con Embla, arrastre, navegación por teclado, posiciones agrupadas y bucle. |
| Chart | [chart.md](references/components/dependant/chart.md) | Gráficos SVG de TanStack Charts, marcas tipadas, tooltips, leyendas, tamaño adaptable y temas. |
| Checkbox | [checkbox.md](references/components/base/checkbox.md) | Casillas controladas y no controladas, selección parcial, etiquetas y envío de formularios. |
| Checkbox Group | [checkbox-group.md](references/components/base/checkbox-group.md) | Selección compartida, casilla principal, deshabilitación del grupo y formularios. |
| Collapsible | [collapsible.md](references/components/base/collapsible.md) | Panel individual, apertura controlada, persistencia, búsqueda de contenido y animación. |
| Combobox | [combobox.md](references/components/base/combobox.md) | Selección filtrada de una o varias opciones, chips, grupos, posicionamiento y valores de formulario. |
| Command | [command.md](references/components/composed/command.md) | Paleta modal de acciones, búsqueda por alias, grupos, apertura controlada y retorno de foco. |
| Context Menu | [context-menu.md](references/components/base/context-menu.md) | Acciones contextuales, submenús, enlaces, casillas, opciones excluyentes y foco. |
| Dialog | [dialog.md](references/components/base/dialog.md) | Ventanas modales y no modales, edición, persistencia, activadores compartidos y foco. |
| Drawer | [drawer.md](references/components/base/drawer.md) | Paneles de borde, gestos de arrastre, alturas de ajuste, apilamiento y teclado virtual. |
| Empty | [empty.md](references/components/simple/empty.md) | Estados vacíos, variantes de media, borde y fondo personalizables. |
| Field | [field.md](references/components/base/field.md) | Etiquetas, controles, descripciones, validación y mensajes de formulario. |
| Fieldset | [fieldset.md](references/components/base/fieldset.md) | Grupos de controles con un nombre accesible y deshabilitación compartida. |
| FloatingInput | [floating-input.md](references/components/composed/floating-input.md) | Etiqueta flotante interior o recorte animado en el borde, estados de valor y validación con Field. |
| Form | [form.md](references/components/base/form.md) | Envío, validación coordinada, errores externos y acciones de servidor. |
| Input | [input.md](references/components/base/input.md) | Texto en una línea, valor controlado o inicial, restricciones nativas e integración con Field. |
| Input Group | [input-group.md](references/components/composed/input-group.md) | Campos con complementos en línea o en bloque, validación y acciones compactas. |
| Item | [item.md](references/components/composed/item.md) | Filas de contenido con medios, jerarquía, acciones y semántica de lista. |
| Menu | [menu.md](references/components/base/menu.md) | Acciones ancladas, enlaces, casillas, opciones exclusivas, submenús, activadores compartidos y búsqueda. |
| Menubar | [menubar.md](references/components/base/menubar.md) | Barras de comandos, orientación, recorrido de foco y coordinación entre menús. |
| Meter | [meter.md](references/components/base/meter.md) | Medidores escalares en un rango conocido, formato de unidades, texto accesible y umbrales cromáticos. |
| Navigation Menu | [navigation-menu.md](references/components/base/navigation-menu.md) | Barras de navegación con paneles desplegables, enlaces activos, submenús en línea y persistencia SSR. |
| Number Field | [number-field.md](references/components/base/number-field.md) | Entrada numérica, pasos, formato localizado, validación de rango y ajuste por arrastre o rueda. |
| OTP Field | [otp-field.md](references/components/base/otp-field.md) | Códigos de longitud fija, casillas agrupadas, pegado, normalización, máscara y envío al completar. |
| Pagination | [pagination.md](references/components/composed/pagination.md) | Enlaces accesibles para navegar entre páginas y presentar intervalos omitidos. |
| Popover | [popover.md](references/components/base/popover.md) | Paneles anclados, colisiones, foco modal, portales y activadores compartidos con contenido contextual. |
| Preview Card | [preview-card.md](references/components/base/preview-card.md) | Resúmenes visuales de enlaces, demoras, posicionamiento y cambio de contenido entre activadores. |
| Progress | [progress.md](references/components/base/progress.md) | Avance de tareas, rangos y unidades, estado indeterminado, finalización y texto accesible. |
| Radio Group | [radio-group.md](references/components/base/radio-group.md) | Selección exclusiva, navegación con flechas, etiquetas, solo lectura y formularios. |
| Scroll Area | [scroll-area.md](references/components/base/scroll-area.md) | Regiones desplazables, barras por eje, esquina, medición de bordes y foco. |
| Select | [select.md](references/components/base/select.md) | Selección de opciones predefinidas, grupos, valores de formulario y posicionamiento del panel. |
| Separator | [separator.md](references/components/base/separator.md) | Divisiones horizontales o verticales, semántica accesible, uso decorativo y ajuste del grosor. |
| Skeleton | [skeleton.md](references/components/simple/skeleton.md) | Marcadores de carga, barrido sincronizado y movimiento reducido. |
| Slider | [slider.md](references/components/base/slider.md) | Ajuste de un valor o intervalo, pasos, orientación, controles múltiples y envío en formularios. |
| Switch | [switch.md](references/components/base/switch.md) | Preferencias binarias, estado controlado, solo lectura, etiquetas y envío de ambos estados. |
| Table | [table.md](references/components/simple/table.md) | Tablas semánticas, encabezados y desplazamiento horizontal con teclado. |
| Tabs | [tabs.md](references/components/base/tabs.md) | Paneles relacionados, activación manual o automática, orientación, indicador medido y contenido persistente. |
| Textarea | [textarea.md](references/components/simple/textarea.md) | Texto multilínea, contador, ajuste de tamaño y validación nativa. |
| Toast | [toast.md](references/components/base/toast.md) | Notificaciones temporales y ancladas, cola, promesas, acciones, anuncios y cierre por gesto. |
| Toggle | [toggle.md](references/components/base/toggle.md) | Botones de dos estados, variantes, tamaños, iconos, cancelación y composición con grupos. |
| Toggle Group | [toggle-group.md](references/components/base/toggle-group.md) | Selección única o múltiple, estado controlado, orientación y navegación por flechas. |
| Toolbar | [toolbar.md](references/components/base/toolbar.md) | Foco entre herramientas, grupos, separadores, enlaces, campos y activadores compuestos. |
| Tooltip | [tooltip.md](references/components/base/tooltip.md) | Indicaciones breves ancladas, grupos con `TooltipProvider`, flecha, seguimiento de cursor y activadores compartidos. |

## Criterios de aplicación

- Conserva eventos, referencias DOM y semántica accesible al componer piezas. Distingue la API de la primitiva de las extensiones de own-ui.
- Conserva las fronteras de App Router: páginas y layouts pueden permanecer como Server Components; el estado y los handlers de la interfaz residen en módulos con `"use client"`. Usa `next/link` para navegación interna y `next/font` para la fuente; integra el tema por clase con `next-themes`, según las referencias de estructura y globals.
- Elige primero las variantes y tamaños existentes; ajusta la composición y el espaciado del entorno desde el consumidor. Los componentes reutilizables mantienen su neutralidad de maquetación.
- Emplea los tokens semánticos del proyecto. Para estilos locales, usa `className`, `style`, `render` y los atributos de estado que admita la pieza, según su referencia.
- Conserva las animaciones propias y las transiciones coordinadas de cada familia en su módulo `<componente>.module.css`. Exporta el módulo junto con el componente y respeta la preferencia de movimiento reducido. Usa las utilidades existentes de Tailwind para transiciones simples y reserva `globals.css` para estilos compartidos.
- La implementación actual combina clases con `clsx`. No garantiza resolver conflictos entre utilidades de Tailwind; revisa la cascada y las limitaciones específicas antes de sobrescribir estilos. No presupongas que existen `cn`, `tailwind-merge` o `cva`.
- Cuando una familia recibe acciones del consumidor, deja que el uso determine su cantidad, sus tipos y sus variantes. Alert Dialog sigue ese patrón.
- Verifica cambios visuales e interactivos en una vista o ejemplo del proyecto consumidor: estados afectados, ambos temas y adaptación al ancho disponible. Ejecuta sus comprobaciones con el gestor y los scripts que el proyecto utilice.

Las referencias describen la implementación exportada; su base de compatibilidad se detalla en [structure.md](references/structure.md). Si el código del consumidor ha evolucionado y contradice una referencia, identifica la diferencia antes de basar cambios en ella. Esta skill respeta las convenciones y autorizaciones del proyecto receptor y no amplía el alcance de la tarea.
