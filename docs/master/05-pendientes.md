# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui, su distribución prevista entre componentes base, simples, compuestos y dependientes, junto con las referencias externas y los conceptos de animación pendientes de evaluar. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente, si la distribución contradice las dependencias de sus definiciones y la estructura vigente del proyecto o si las referencias externas no corresponden a los componentes, ejemplos o transiciones descritos.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Componentes base (`components/own/base/`)

En `components/own/base/` hay 37 familias implementadas, cada una basada en una familia primitiva de Base UI. El consumidor decide cómo componer sus piezas mediante `children`, `render` o ranuras.

- [x] Accordion
- [x] Alert Dialog
- [x] Autocomplete
- [x] Avatar
- [x] Button
- [x] Checkbox
- [x] Checkbox Group
- [x] Collapsible
- [x] Combobox
- [x] Context Menu
- [x] Dialog
- [x] Drawer
- [x] Field
- [x] Fieldset
- [x] Form
- [x] Input
- [x] Menu
- [x] Menubar
- [x] Meter
- [x] Navigation Menu
- [x] Number Field
- [x] OTP Field
- [x] Popover
- [x] Preview Card
- [x] Progress
- [x] Radio Group
- [X] Scroll Area
- [X] Select
- [x] Separator
- [x] Slider
- [x] Switch
- [x] Tabs
- [x] Toast
- [x] Toggle
- [x] Toggle Group
- [x] Toolbar
- [X] Tooltip

### 1.1. Composición decidida por el consumidor

| Componente | Composición prevista en el uso |
| :--- | :--- |
| Alert Dialog | El consumidor proporciona Button u otras acciones mediante `render` o como contenido. Su definición conserva los activadores y controles de cierre de su primitiva. |
| Checkbox Group | Recibe los Checkbox mediante `children`; su definición envuelve la primitiva de agrupación sin importar el Checkbox propio. |
| Radio Group | Exporta RadioGroup, Radio y RadioIndicator desde el mismo módulo. El consumidor compone las tres piezas. |
| Toggle Group | Recibe los Toggle mediante `children`; su definición no necesita importar el Toggle propio. |
| Menubar | Recibe la composición de Menu desde el consumidor, sin construir menús propios internamente. |
| Field | Expone las piezas de su primitiva, incluido Field.Control, y permite al consumidor elegir o componer el control. |
| Fieldset | Expone Root y Legend y recibe los campos o controles mediante `children`. |
| Form | Envuelve su primitiva y recibe los campos y botones desde el consumidor. |
| Input | El consumidor aporta una etiqueta HTML o coloca el control dentro de Field para asociar ayuda y errores. |

## 2. Componentes compuestos (`components/own/composed/`)

En `components/own/composed/` hay siete familias implementadas. FloatingInput y Command se detallan aquí y las cinco familias incorporadas a partir de Takk se registran en [la sección 3.2](#32-familias-compuestas-implementadas).

- [x] FloatingInput. Compone Input y Field para renderizar un campo con etiqueta flotante, con las variantes `inset` y `outline`.
- [x] Command. Compone Autocomplete y Dialog de own-ui para buscar y ejecutar acciones desde una paleta modal. [Showcase](features/showcase.md#10-cobertura-de-command) · [Referencia en la skill](features/skill-own-ui.md#7-estado-de-la-skill-en-este-repositorio)

Las familias que reutilizan otros componentes de own-ui en su definición se ubican en `composed/`.

## 3. Ampliación del catálogo a partir de Takk

### 3.1. Familias previstas en `components/own/simple/`

Estas ocho familias de Takk están implementadas con HTML nativo o utilidades de composición, sin necesitar primitivas de Base UI ni librerías externas especializadas. Se ubican en `components/own/simple/`.

- [x] Alert
- [x] Aspect Ratio
- [x] Badge
- [x] Card
- [x] Empty
- [x] Skeleton
- [x] Table
- [x] Textarea

### 3.2. Familias compuestas implementadas

Cada familia reutiliza las piezas de own-ui indicadas y cuenta con una [página de showcase](features/showcase.md#8-cobertura-de-los-componentes-compuestos-de-takk) y una [referencia en la skill](features/skill-own-ui.md#7-estado-de-la-skill-en-este-repositorio).

- [x] Attachment · Button.
- [x] Button Group · Separator.
- [x] Input Group · Button, Input y Textarea.
- [x] Item · Separator.
- [x] Pagination · Button.

### 3.3. Familias con motor externo en `components/own/dependant/`

Estas familias se ubican en `dependant/`, incluso cuando también componen componentes de own-ui. Su incorporación requiere aprobación antes de añadir la dependencia.

- [x] Carousel · Embla (`embla-carousel-react`) y Button. [Showcase](features/showcase.md#11-cobertura-de-carousel) · [Referencia en la skill](features/skill-own-ui.md#7-estado-de-la-skill-en-este-repositorio)
- [x] Chart · TanStack Charts (`@tanstack/charts`). [Showcase](features/showcase.md#12-cobertura-de-chart) · [Referencia en la skill](features/skill-own-ui.md#7-estado-de-la-skill-en-este-repositorio)

## 4. Referencias de Interior para componentes propios

Selección de referencias de [Interior](https://www.interior.dev/docs) agrupadas por categoría de origen. Se evaluará qué patrones de interacción y animación conviene adaptar e integrar en componentes propios de own-ui.

### 4.1. Action Feedback

You did something. Did it land?

- [Copy Button](https://www.interior.dev/docs/copy-button)
- [Loading Button](https://www.interior.dev/docs/loading-button)
- [Hold to Confirm](https://www.interior.dev/docs/hold-to-confirm)
- [Like Burst](https://www.interior.dev/docs/like-burst)
- [Ripple](https://www.interior.dev/docs/ripple)
- [Icon Morph](https://www.interior.dev/docs/icon-morph)
- [Press Depth](https://www.interior.dev/docs/press-depth)

### 4.2. Input

You are telling the system something it might reject.

- [Password Strength](https://www.interior.dev/docs/password-strength)
- [Tag Input](https://www.interior.dev/docs/tag-input)
- [Expanding Search](https://www.interior.dev/docs/expanding-search)

### 4.3. Async

You are waiting, and you deserve to know on what.

- [Skeleton Swap](https://www.interior.dev/docs/skeleton-swap)
- [Progress Bar](https://www.interior.dev/docs/progress-bar)
- [Load More](https://www.interior.dev/docs/load-more)
- [Streaming Text](https://www.interior.dev/docs/streaming-text)
- [Task Steps](https://www.interior.dev/docs/task-steps)

### 4.4. Notification

The system is telling you something you did not ask for.

- [Collapsible Banner](https://www.interior.dev/docs/collapsible-banner)
- [New Items Pill](https://www.interior.dev/docs/new-items-pill)

### 4.5. Overlay

Something came on top. It has to know where it came from.

- [Command Palette](https://www.interior.dev/docs/command-palette)
- [Dropdown](https://www.interior.dev/docs/dropdown)

### 4.6. Navigation

You moved. The interface should agree about where.

- [Segmented Control](https://www.interior.dev/docs/segmented-control)
- [Accordion](https://www.interior.dev/docs/accordion)
- [Wizard Steps](https://www.interior.dev/docs/wizard-steps)
- [Pagination](https://www.interior.dev/docs/pagination)
- [Tree View](https://www.interior.dev/docs/tree-view)

### 4.7. Scroll

You are reading, and the page is reacting to that.

- [Sticky Header](https://www.interior.dev/docs/sticky-header)
- [Reading Progress](https://www.interior.dev/docs/reading-progress)
- [Scroll Spy](https://www.interior.dev/docs/scroll-spy)
- [Snap Carousel](https://www.interior.dev/docs/snap-carousel)
- [Hide on Scroll](https://www.interior.dev/docs/hide-on-scroll)

### 4.8. Data

A number changed. Which one, and by how much?

- [Sortable Table](https://www.interior.dev/docs/sortable-table)
- [Filter Grid](https://www.interior.dev/docs/filter-grid)
- [Value Flash](https://www.interior.dev/docs/value-flash)

### 4.9. Gesture

Your finger is on it. Physics is now part of the API.

- [Slider Detents](https://www.interior.dev/docs/slider-detents)
- [Reorder List](https://www.interior.dev/docs/reorder-list)
- [Long Press](https://www.interior.dev/docs/long-press)
- [Lightbox](https://www.interior.dev/docs/lightbox)

### 4.10. Content

The thing itself arrives, resolves, or is missing.

- [Text Reveal](https://www.interior.dev/docs/text-reveal)
- [Logo Marquee](https://www.interior.dev/docs/logo-marquee)
- [Blur-up Image](https://www.interior.dev/docs/blur-up-image)
- [Show More](https://www.interior.dev/docs/show-more)

## 5. Conceptos de animación por evaluar

- Desenfoque al sustituir texto o valores, como letras y números.
- Ondas expansivas durante las transiciones.
