# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui y su distribución prevista entre componentes independientes y dependientes. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente o si la distribución contradice las dependencias de sus definiciones y el criterio de clasificación del proyecto.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Componentes independientes (`independant/`)

En `components/own/independant/` hay 37 familias implementadas basadas en primitivas de Base UI. El consumidor decide cómo componerlas mediante `children`, `render` o ranuras. La distribución aplica el [criterio de clasificación](01-estructura-del-proyecto.md#3-componentes-independientes-y-dependientes) de own-ui.

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

### 1.1. Casos de composición que conservan la independencia

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

## 2. Componentes dependientes (`dependant/`)

En `components/own/dependant/` hay 1 componente implementado.

- [x] FloatingInput. Compone Input y Field para renderizar un campo con etiqueta flotante, con las variantes `inset` y `outline`.

Si una familia reutiliza otra en su definición o incorpora un motor externo especializado, se clasifica como dependiente. Sus dependencias se registran junto a la entrada.

## 3. Ampliación del catálogo a partir de Takk

### 3.1. Familias previstas en `independant/`

Estas piezas de Takk se implementan sobre HTML nativo o con utilidades de composición. Antes de desarrollarlas, queda por definir su encaje con la guía de creación de componentes.

- [ ] Alert
- [ ] Aspect Ratio
- [ ] Badge
- [ ] Card
- [ ] Empty
- [ ] Skeleton
- [ ] Table
- [ ] Textarea

### 3.2. Familias previstas en `dependant/`

La composición prevista se basa en las familias que cada definición reutiliza en Takk.

- [ ] Attachment · Button.
- [ ] Button Group · Separator.
- [ ] Input Group · Button, Input y Textarea. Requiere implementar Textarea primero.
- [ ] Item · Separator.
- [ ] Pagination · Button.

### 3.3. Familias con motor externo en `dependant/`

Los motores indicados son los utilizados en Takk. Su incorporación a own-ui requiere aprobación antes de añadir la dependencia.

- [ ] Command · `cmdk`. En Takk también compone Dialog e Input Group.
- [ ] Carousel · `embla-carousel-react`. En Takk también compone Button.
- [ ] Chart · `recharts`.
