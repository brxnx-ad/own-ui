# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui, su distribución prevista entre componentes base, simples, compuestos y dependientes, junto con las referencias externas y los conceptos de animación pendientes de evaluar. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente, si la distribución contradice las dependencias de sus definiciones y la estructura vigente del proyecto o si las referencias externas no corresponden a los componentes, ejemplos o transiciones descritos.



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

En `components/own/composed/` hay siete familias implementadas. FloatingInput y Command se detallan aquí y las cinco familias incorporadas a partir de Takk se registran en la sección 3.2.

- [x] FloatingInput. Compone Input y Field para renderizar un campo con etiqueta flotante, con las variantes `inset` y `outline`.
- [x] Command. Compone Autocomplete y Dialog de own-ui para buscar y ejecutar acciones desde una paleta modal. Showcase · Referencia en la skill

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

Cada familia reutiliza las piezas de own-ui indicadas y cuenta con una página de showcase y una referencia en la skill.

- [x] Attachment · Button.
- [x] Button Group · Separator.
- [x] Input Group · Button, Input y Textarea.
- [x] Item · Separator.
- [x] Pagination · Button.

### 3.3. Familias con motor externo en `components/own/dependant/`

Estas familias se ubican en `dependant/`, incluso cuando también componen componentes de own-ui. Su incorporación requiere aprobación antes de añadir la dependencia.

- [x] Carousel · Embla (`embla-carousel-react`) y Button. Showcase · Referencia en la skill
- [x] Chart · TanStack Charts (`@tanstack/charts`). Showcase · Referencia en la skill

## 4. Referencias de Interior para componentes propios

Selección de referencias de Interior agrupadas por categoría de origen. Se evaluará qué patrones de interacción y animación conviene adaptar e integrar en componentes propios de own-ui.

### 4.1. Action Feedback

You did something. Did it land?

- Copy Button
- Loading Button
- Hold to Confirm
- Like Burst
- Ripple
- Icon Morph
- Press Depth

### 4.2. Input

You are telling the system something it might reject.

- Password Strength
- Tag Input
- Expanding Search

### 4.3. Async

You are waiting, and you deserve to know on what.

- Skeleton Swap
- Progress Bar
- Load More
- Streaming Text
- Task Steps

### 4.4. Notification

The system is telling you something you did not ask for.

- Collapsible Banner
- New Items Pill

### 4.5. Overlay

Something came on top. It has to know where it came from.

- Command Palette
- Dropdown

### 4.6. Navigation

You moved. The interface should agree about where.

- Segmented Control
- Accordion
- Wizard Steps
- Pagination
- Tree View

### 4.7. Scroll

You are reading, and the page is reacting to that.

- Sticky Header
- Reading Progress
- Scroll Spy
- Snap Carousel
- Hide on Scroll

### 4.8. Data

A number changed. Which one, and by how much?

- Sortable Table
- Filter Grid
- Value Flash

### 4.9. Gesture

Your finger is on it. Physics is now part of the API.

- Slider Detents
- Reorder List
- Long Press
- Lightbox

### 4.10. Content

The thing itself arrives, resolves, or is missing.

- Text Reveal
- Logo Marquee
- Blur-up Image
- Show More

## 5. Conceptos de animación por evaluar

- Desenfoque al sustituir texto o valores, como letras y números.
- Ondas expansivas durante las transiciones.
