# own-ui · Skill para proyectos consumidores

> **Objetivo y alcance del documento:** Definir el propósito de la skill own-ui, su distribución junto con los componentes y la configuración de estilos exportados, y la estructura que deben seguir sus nuevas referencias de componente. Se considera desactualizado si la organización de la skill, los requisitos de integración de los archivos exportados o la estructura exigida a las nuevas referencias difieren de lo aquí descrito.



---

## 1. Propósito y contexto de uso

La skill **own-ui** acompaña a los componentes React y a la configuración de `globals.css` cuando se exportan a otros proyectos **Next.js con App Router**. Proporciona al agente el contexto necesario para integrar, utilizar, personalizar y mantener esas piezas conservando su comportamiento accesible y su sistema visual.

Este repositorio desarrolla y verifica los componentes; el proyecto consumidor los integra en su propia aplicación Next.js. La skill conserva Next.js como entorno de referencia, con `next/link`, `next/font` y las fronteras servidor/cliente de App Router, y utiliza `next-themes` para el tema por clase. Debe funcionar en ese destino sin requerir la aplicación de showcase, los documentos maestros ni el archivo de layout concreto del origen.

La skill se aplica cuando se trabaja con componentes de own-ui o con interfaces y estilos que utilizan su configuración: composición, props, variantes, estados, accesibilidad, dimensiones, colores, temas, tipografía, elevación, geometría y animaciones. Su descripción debe identificar ese alcance en proyectos Next.js que hayan adoptado own-ui, sin limitarlo a «este repositorio» ni atribuirle autoridad sobre interfaces ajenas al sistema.

La documentación de `docs/master/` establece las directrices para desarrollar y mantener la skill en el origen. El material distribuible reside dentro de la carpeta de la skill.

## 2. Organización y responsabilidades

El material distribuible tiene esta estructura. SKILL.md

```text
.agents/skills/own-ui/
├── SKILL.md
└── references/
    ├── structure.md
    ├── globals.md
    ├── icons.md
    └── components/
        ├── base/
        │   ├── accordion.md
        │   ├── button.md
        │   └── …
        ├── simple/
        │   ├── alert.md
        │   ├── aspect-ratio.md
        │   ├── badge.md
        │   ├── card.md
        │   ├── empty.md
        │   ├── skeleton.md
        │   ├── table.md
        │   └── textarea.md
        ├── composed/
        │   ├── attachment.md
        │   ├── button-group.md
        │   ├── command.md
        │   ├── floating-input.md
        │   ├── input-group.md
        │   ├── item.md
        │   └── pagination.md
        └── dependant/
            ├── carousel.md
            └── chart.md
```

Las referencias siguen la categoría de cada familia en `components/own/`. `simple/` incluye las familias de HTML nativo y `dependant/` las que necesitan un motor externo, como Carousel y Chart.

| Archivo | Responsabilidad |
| :--- | :--- |
| `SKILL.md` | Explicar brevemente own-ui, definir cuándo utilizar la skill y dirigir a las referencias pertinentes. Mantener aquí los criterios compartidos, sin duplicar las API completas. |
| `references/structure.md` | Describir la ubicación de componentes, iconos, dependencias y estilos en el consumidor, la resolución de imports y la clasificación por familia. Distinguir rutas convencionales de requisitos reales. |
| `references/globals.md` | Explicar los bloques de la configuración exportada, los tokens y sus relaciones, los temas, la exposición a Tailwind y el alcance de cada forma de personalización. |
| `references/icons.md` | Documentar la API SVG, los archivos, los estilos y la accesibilidad de los iconos compartidos de `components/own/icons/`. |
| `references/components/<categoría>/<familia>.md` | Describir el uso, la anatomía, las variantes, las props, el comportamiento, la composición y la personalización visual de una familia exportada. |

El primer paso al trabajar con un componente es abrir y leer la referencia de su familia en el índice de la skill. La regla se aplica al integrar, usar, componer, modificar, revisar o depurar una pieza, incluso para ajustes puntuales de estilo o accesibilidad. Si la tarea combina varias familias, se consulta la referencia de cada una. Por ejemplo, una confirmación que compone Alert Dialog con Button requiere leer ambas referencias.

Las guías de apoyo se consultan según la tarea. Usa `structure.md` para resolver rutas, dependencias o exportaciones, `globals.md` para trabajar con los tokens y temas, e `icons.md` para usar o ajustar los iconos compartidos.

## 3. Contrato de portabilidad

### 3.1. Archivos y dependencias exportados

Una exportación incluye las familias seleccionadas, sus dependencias propias transitivas, los iconos de soporte, los módulos CSS que importan y la configuración global que utilizan. Por ejemplo, Button necesita Spinner y Accordion necesita Chevron.

`references/structure.md` reúne los archivos de soporte y las versiones de compatibilidad. La integración actual utiliza Next.js 16.4.5 con App Router, React y React DOM 19.3, Base UI 1.9.0, `clsx` 2.1.1, Tailwind CSS v4 y `next-themes` 0.4.6. Las referencias DOM como props se apoyan en React 19. Comprueba la compatibilidad del consumidor al usar otras versiones.

La portabilidad se refiere al traslado entre proyectos Next.js. Se mantiene `next/link` para navegación interna, `next/font/google` para la fuente de referencia y `next-themes` para la integración de temas. Las referencias distinguen la configuración de la aplicación de las dependencias internas de cada familia: por ejemplo, usar Link desde el consumidor no cambia la clasificación de Button.

### 3.2. Rutas, imports y recursos disponibles

- Documentar las rutas reales o la correspondencia de rutas en el proyecto consumidor, que puede usar `src/`, otro alias o una ubicación distinta para su hoja global.
- Mantener válidos los enlaces internos entre `SKILL.md` y `references/` al copiar la carpeta completa.
- Resolver las rutas de código respecto del destino, o identificarlas expresamente como trazabilidad opcional del origen. Un enlace a `app/(showcase)` o `docs/master/` no sustituye una explicación necesaria para usar el componente.
- Evitar rutas absolutas de la máquina del autor. Los imports de ejemplo deben corresponder al código exportado y a los aliases del consumidor.
- Usar la documentación y los tipos de la versión de Base UI disponible en el destino cuando se necesite ampliar una opción. La disponibilidad de documentación dentro de `node_modules` debe comprobarse.
- Mantener en el índice únicamente las familias incluidas en la distribución, o señalar de forma explícita cuáles están disponibles. Una familia pendiente en el origen no es una API exportada.

### 3.3. Integración de estilos y entorno

La referencia de `globals.css` debe permitir integrar los bloques de own-ui en la hoja global del consumidor conservando sus estilos existentes e importarla desde `app/layout.tsx` o `src/app/layout.tsx`. Debe explicar el import de Tailwind, la detección de las clases presentes en los componentes exportados, las semillas y escalas, la asignación semántica por tema y los aliases de `@theme inline`.

El consumidor integra la fuente mediante `next/font` y aplica `.dark` con `next-themes`, reutilizando su configuración si ya existe. El proveedor y las composiciones con estado respetan las fronteras cliente de App Router, mientras el layout puede permanecer como Server Component. Para componentes con portales también debe resolver el apilamiento, el contenedor del backdrop y el acceso al contenido en pantallas pequeñas. Estas condiciones se explican en las referencias sin enlazar al layout del origen.

Los componentes aportan su geometría base; el consumidor aplica los ajustes de dimensiones y la separación respecto del entorno mediante las opciones admitidas por cada pieza. Los colores de los componentes utilizan las superficies y tríadas exportadas. La skill distingue las personalizaciones locales de los cambios globales y conserva los estados accesibles y el movimiento reducido al ajustar estilos.

## 4. Estructura de cada nueva referencia de componente

Crea un archivo en `references/components/<categoría>/<familia>.md`. Usa la categoría del componente en `components/own/` y escribe el nombre de la familia en minúsculas y con guiones. La referencia agrupa todas las piezas públicas de la familia, incluidos sus `Root`, `Trigger` o `Popup` cuando corresponda.

La referencia debe ser suficiente para trabajar en el proyecto consumidor y seguir este orden:

| Sección | Contenido requerido |
| :--- | :--- |
| **1. Identificación** | Una frase con el nombre del componente y las primitivas, utilidades o piezas de soporte que utiliza directamente. |
| **2. Propósito y casos de uso** | Problema que resuelve, escenarios adecuados y condiciones que orientan la elección de otra pieza. Explicar el comportamiento que el consumidor puede esperar. |
| **3. Importación y anatomía** | Import válido, todas las exportaciones públicas, responsabilidad y elemento HTML predeterminado de cada pieza, anidación requerida y composición JSX mínima. Identificar qué contenido aporta el consumidor. |
| **4. Variantes y tamaños** | Valores aceptados, valores predeterminados, diferencias visuales o de densidad y sus dimensiones relevantes. Distinguir variantes propias de modos de funcionamiento. Si no existen props propias de variante o tamaño, declararlo. |
| **5. Props y callbacks** | API agrupada por pieza, con tipos, valores predeterminados, opcionalidad, función y condiciones. Diferenciar opciones propias, heredadas de Base UI y atributos HTML. Documentar firmas de callbacks, motivos y cancelación cuando existan. |
| **6. Funcionamiento y estados** | Modos controlado y no controlado, precedencias, combinaciones necesarias, montaje y desmontaje, persistencia, carga y errores según la API real. Enumerar los slots y atributos de estado disponibles por pieza. |
| **7. Estilos admitidos por pieza** | Mecanismos de personalización efectivos y sus límites, con la cobertura de la sección 5 de este documento. Indicar sobre qué nodo actúa cada ajuste. |
| **8. Ejemplos de composición** | Ejemplo habitual y las composiciones adicionales que expliquen diferencias relevantes. Incluir imports y contexto necesario; si un bloque es un fragmento, identificar las variables o handlers que aporta el consumidor. |
| **9. Accesibilidad e integración** | Teclado, foco, nombres y descripciones accesibles, semántica, requisitos de controles solo icono y conservación de props, eventos y refs al usar `render`. Añadir condiciones de portales, formularios o contenido desplazable cuando correspondan. |
| **10. Límites y verificación** | Limitaciones comprobadas, opciones obsoletas, dependencias de entorno y comprobaciones relevantes para el componente exportado. Identificar el estado real de la implementación. |

Las secciones sin una capacidad aplicable deben indicarlo brevemente; la plantilla no obliga a añadir esa capacidad al componente. Por ejemplo, la ausencia de variantes propias en Alert Dialog no justifica introducir `variant` o imponer un conjunto de botones.

La tabla de API utiliza estas columnas:

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |

La estructura de encabezados reutilizable es:

```markdown
# Nombre del componente

## 1. Identificación
## 2. Propósito y casos de uso
## 3. Importación y anatomía
## 4. Variantes y tamaños
## 5. Props y callbacks
## 6. Funcionamiento y estados
## 7. Estilos admitidos por pieza
## 8. Ejemplos de composición
## 9. Accesibilidad e integración
## 10. Límites y verificación
```

Estos encabezados rigen las referencias nuevas. Al actualizar una referencia existente, conservar su información útil y normalizar su organización dentro del alcance autorizado.

## 5. Cobertura obligatoria de estilos

La sección de estilos debe explicar las formas aceptables de personalización de la implementación descrita, con ejemplos representativos de las que realmente estén disponibles.

| Aspecto | Información que debe documentarse |
| :--- | :--- |
| **Dimensiones y distribución** | Tamaños mediante props, ancho y altura, padding, gaps, límites mínimos y máximos, adaptación al ancho disponible y separación exterior a cargo del consumidor. Señalar restricciones de medición, overflow o altura animada. |
| **Colores y temas** | Superficies y tríadas utilizadas por pieza, texto, bordes, iconos, anillos y estados interactivos. Explicar la adaptación claro/oscuro y qué modificaciones afectan una instancia o todo el sistema. |
| **Tipografía y geometría** | Clases tipográficas, escala de iconos, radios, bordes y sombras. Identificar valores compartidos y ajustes propios de la pieza. |
| **Estados y selectores** | `data-slot`, atributos `data-*`, pseudo-clases y pseudo-elementos realmente presentes. Indicar si el estilo afecta al nodo principal, un descendiente, un icono interno o una pieza portaleada. |
| **Animaciones** | Propiedades y duración base, estados de entrada y salida, variables CSS de medición, sincronización con montaje/desmontaje y tratamiento de `motion-safe` y `motion-reduce`. Explicar las consecuencias de una sobrescritura. |
| **Canales de personalización** | Props de variantes y tamaños, `className`, `style`, sus formas funcionales admitidas, selectores dirigidos y composición mediante `render`. Precisar cómo se combinan clases, estilos, eventos y refs. |

La descripción debe distinguir lo que acepta TypeScript de lo que el wrapper hace en ejecución. Button y los wrappers estilizados de Accordion y Alert Dialog evalúan `className` funcional. El helper `components/own/classes.ts` usa `clsx` y elimina colores de texto reconocidos anteriores cuando recibe un `text-content-*` posterior con el mismo prefijo de variantes. No es `tailwind-merge`: los demás conflictos siguen la cascada. Incluye el helper al exportar sus consumidores.

Documentar estas condiciones permite elegir un ajuste válido, como un estilo inline para una dimensión concreta o un selector con precedencia comprobada para un estado. Un ajuste de animación debe seguir respetando el movimiento reducido; un estilo inline incondicional puede anular esa adaptación.

## 6. Mantenimiento y preparación de una exportación

1. Identificar las familias que se distribuirán y reunir sus dependencias propias y de soporte. Registrar las versiones verificadas junto con los archivos.
2. Integrar la configuración de estilos necesaria en el entorno receptor, incluida la generación de las utilidades utilizadas, la fuente y los temas.
3. Copiar la carpeta de la skill con sus referencias y adaptar la descripción, el índice, los imports y las rutas al material que realmente se entrega.
4. Comprobar que las instrucciones necesarias no requieren `docs/master/`, el showcase, archivos no exportados ni configuración exclusiva del origen. El proyecto consumidor conserva sus propias convenciones y autorizaciones de trabajo.
5. Verificar los ejemplos y el contrato documentado contra los componentes exportados: resolución de imports, tipado, estilos generados, estados relevantes, foco, ambos temas y adaptación a pantallas pequeñas según corresponda.
6. Validar el formato de la skill y los enlaces desde su ubicación final. Una validación de formato no sustituye la revisión del contenido ni la comprobación de las composiciones.

Las referencias evolucionan junto con el código que acompañan. Al documentar una ampliación autorizada, actualizar la referencia de la familia y su entrada en `SKILL.md`; si afecta tokens o ubicación compartidos, actualizar también la referencia general correspondiente. La skill no autoriza por sí sola añadir dependencias o modificar otros archivos del consumidor.

## 7. Estado de la skill en este repositorio

El índice de la skill enlaza 54 referencias del catálogo, que cubren 37 familias en `base/`, ocho en `simple/`, siete en `composed/` y dos en `dependant/`. Una referencia compartida cubre los seis iconos de soporte. Índice · Estructura · Globals · Iconos

Las nuevas referencias compuestas cubren anatomía, props, estilos y accesibilidad. Para exportarlas, reúne sus dependencias transitivas según la guía de estructura e incluye los módulos CSS de Button Group e Input Group. Attachment · Button Group · Input Group · Item · Pagination

La referencia de Command documenta la búsqueda por alias, los grupos, la apertura controlada y el retorno de foco. Para exportarlo, reúne Command, Autocomplete, Dialog y los módulos de iconos indicados en la guía de estructura. Command

La referencia de Carousel cubre la orientación, las posiciones agrupadas, los controles y el movimiento reducido. Su exportación incluye Carousel, Button, los módulos de iconos y `embla-carousel-react` 8.6.0. Carousel

La referencia de Chart cubre las definiciones tipadas, el SVG adaptable, el tooltip y la paleta por tema. Su exportación incluye `chart.tsx`, `chart.module.css` y `@tanstack/charts` 1.5.0. Chart

La entrada y las referencias están orientadas a proyectos Next.js consumidores y sus enlaces se resuelven dentro de la carpeta de la skill. Las rutas de componentes y de la hoja global se presentan como convenciones adaptables dentro de App Router; se explican las dependencias de soporte, la integración con Link, fuentes, temas y portales sin requerir el showcase ni `docs/master/`.

Esta portabilidad documental requiere que la distribución incluya los componentes y el CSS descritos. Cada consumidor debe verificar las rutas reales, las versiones compatibles y la generación de estilos y comprobar el comportamiento de su integración.

Para exportar Drawer, incluye `drawer.tsx` y `drawer.module.css`, que define las transiciones, la geometría del agarre y los ajustes de espacio del panel. Para FloatingInput, incluye `floating-input.tsx` y `floating-input.module.css` junto con Input, Field y `field.module.css`.

Para exportar Number Field, incluye el módulo que provee Minus y Plus. Para Progress, incluye `progress.module.css`, que contiene el barrido indeterminado y respeta la preferencia de movimiento.
