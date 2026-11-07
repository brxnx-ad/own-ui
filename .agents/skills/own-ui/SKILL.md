---
name: own-ui
description: "Crear, integrar, usar, modificar, revisar o depurar componentes y estilos en proyectos Next.js con App Router que incorporen own-ui y su configuración de globals.css. Utilizar siempre que el trabajo en esas interfaces afecte componentes, variantes, props, estados, accesibilidad, composición, layout, dimensiones, colores, temas, tipografía, sombras o animaciones."
---

# own-ui

own-ui es una colección exportable de componentes React para proyectos Next.js con App Router, construida sobre Base UI para el comportamiento accesible y Tailwind CSS v4 para la presentación. Los componentes y la configuración de `globals.css` comparten superficies, tríadas cromáticas, tipografía, sombras y geometría. Esta skill acompaña esos archivos entre proyectos Next.js y explica su uso sin requerir la aplicación donde se desarrollaron.

## Referencias según la tarea

Lee las referencias necesarias para el trabajo concreto. Los enlaces de esta skill son internos; las rutas de código y los imports de ejemplo son convenciones que deben resolverse en el proyecto consumidor con [structure.md](references/structure.md).

### Componentes

Antes de integrar o modificar un componente, lee su referencia. Describe su API propia, variantes, props, funcionamiento, casos de uso y las opciones de estilo que admite cada pieza.

| Componente | Referencia | Cuándo consultarla |
| :--- | :--- | :--- |
| Button | [button.md](references/components/button.md) | Acciones, variantes, tamaños, iconos, carga, deshabilitación y composición como enlace. |
| Accordion | [accordion.md](references/components/accordion.md) | Paneles expandibles, apertura individual o múltiple, estado controlado, persistencia y animación. |
| Alert Dialog | [alert-dialog.md](references/components/alert-dialog.md) | Confirmaciones modales, acciones destructivas, foco, operaciones asíncronas y activadores compartidos. |
| Autocomplete | [autocomplete.md](references/components/autocomplete.md) | Texto libre con sugerencias, anclaje y dirección del panel, filtrado, grupos y límites de resultados. |

Estas referencias describen las familias implementadas incluidas en este material. Comprueba cuáles se han copiado al proyecto antes de importarlas. Para una familia aún sin referencia, localiza su código y los tipos de la versión de Base UI instalada; consulta su documentación si está disponible. Distingue la API de la primitiva de las extensiones propias. Si faltan los archivos necesarios, identifica qué debe incorporarse y actúa según el alcance autorizado; no supongas que la familia ya está disponible.

### Estructura y ubicación

Lee [structure.md](references/structure.md) al integrar la exportación, crear, mover, importar o clasificar componentes, localizar la hoja global o resolver dependencias, temas y portales. Adapta rutas y aliases a la organización existente del consumidor.

La dependencia se determina por la definición: importar y reutilizar un componente propio de otra familia convierte al componente en dependiente. La composición de piezas de su familia, los iconos de soporte y los componentes recibidos desde el consumidor mediante `children` o `render` conservan su independencia.

### Sistema de estilos

Lee [globals.md](references/globals.md) cuando el trabajo afecte colores, temas, superficies, tipografía, sombras, radios o la estructura de `globals.css`. Para dimensiones, estados y animaciones de una pieza concreta, consulta también la referencia del componente.

## Criterios de aplicación

- Resuelve los imports de own-ui según los archivos y aliases del proyecto Next.js consumidor y compón sus piezas conservando eventos, referencias DOM y semántica accesible. Las rutas convencionales se adaptan a `app/` o `src/app/` y a la ubicación existente de los componentes.
- Conserva las fronteras de App Router: páginas y layouts pueden permanecer como Server Components; el estado y los handlers de la interfaz residen en módulos con `"use client"`. Usa `next/link` para navegación interna y `next/font` para la fuente; integra el tema por clase con `next-themes`, según las referencias de estructura y globals.
- Elige primero las variantes y tamaños existentes; ajusta la composición y el espaciado del entorno desde el consumidor. Los componentes reutilizables mantienen su neutralidad de maquetación.
- Emplea los tokens semánticos del proyecto. Para estilos locales, usa `className`, `style`, `render` y los atributos de estado que admita la pieza, según su referencia.
- La implementación actual combina clases con `clsx`. No garantiza resolver conflictos entre utilidades de Tailwind; revisa la cascada y las limitaciones específicas antes de sobrescribir estilos. No presupongas que existen `cn`, `tailwind-merge` o `cva`.
- La cantidad, las variantes y los tipos de botones que recibe un componente compuesto se eligen en su uso. Mantén esa libertad cuando trabajes con Alert Dialog.
- Verifica cambios visuales e interactivos en una vista o ejemplo del proyecto consumidor: estados afectados, ambos temas y adaptación al ancho disponible. Ejecuta sus comprobaciones con el gestor y los scripts que el proyecto utilice.

Las referencias describen la implementación exportada; su base de compatibilidad se detalla en [structure.md](references/structure.md). Si el código del consumidor ha evolucionado y contradice una referencia, identifica la diferencia antes de basar cambios en ella. Esta skill respeta las convenciones y autorizaciones del proyecto receptor y no amplía el alcance de la tarea.
