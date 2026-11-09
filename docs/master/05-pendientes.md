# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui y su distribución prevista entre componentes base, simples, compuestos y dependientes. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente o si la distribución contradice las dependencias de sus definiciones y la estructura vigente del proyecto.

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

En `components/own/composed/` hay seis familias implementadas. FloatingInput se detalla aquí y las cinco familias incorporadas a partir de Takk se registran en [la sección 3.2](#32-familias-compuestas-implementadas).

- [x] FloatingInput. Compone Input y Field para renderizar un campo con etiqueta flotante, con las variantes `inset` y `outline`.

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

Los motores indicados son los utilizados en Takk. Estas familias se ubican en `dependant/`, incluso cuando también componen componentes de own-ui. Su incorporación requiere aprobación antes de añadir la dependencia.

- [ ] Command · `cmdk`. En Takk también compone Dialog e Input Group.
- [ ] Carousel · `embla-carousel-react`. En Takk también compone Button.
- [ ] Chart · `recharts`.
