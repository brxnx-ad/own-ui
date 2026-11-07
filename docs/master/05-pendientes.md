# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui y su distribución prevista entre componentes independientes y dependientes. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente o si la distribución contradice las dependencias internas de sus definiciones y el criterio de clasificación del proyecto.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Componentes independientes (`independant/`)

El plan incluye 37 familias independientes basadas en primitivas de Base UI. El consumidor decide cómo componerlas mediante `children`, `render` o ranuras. La distribución aplica el [criterio de dependencias internas](01-estructura-del-proyecto.md#3-componentes-independientes-y-dependientes) de own-ui.

En `components/own/independant/` hay 16 componentes implementados y 21 pendientes.

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
- [ ] Menu
- [ ] Menubar
- [ ] Meter
- [ ] Navigation Menu
- [ ] Number Field
- [ ] OTP Field
- [ ] Popover
- [ ] Preview Card
- [ ] Progress
- [ ] Radio Group
- [ ] Scroll Area
- [ ] Select
- [ ] Separator
- [ ] Slider
- [ ] Switch
- [ ] Tabs
- [ ] Toast
- [ ] Toggle
- [ ] Toggle Group
- [ ] Toolbar
- [ ] Tooltip

### 1.1. Casos de composición que conservan la independencia

| Componente | Composición prevista en el uso |
| :--- | :--- |
| Alert Dialog | El consumidor proporciona Button u otras acciones mediante `render` o como contenido. Su definición conserva los activadores y controles de cierre de su primitiva. |
| Checkbox Group | Recibe los Checkbox mediante `children`; su definición envuelve la primitiva de agrupación sin importar el Checkbox propio. |
| Radio Group | Se desarrolla junto con las piezas Radio de Base UI. Las envolturas propias se exportan para que el consumidor las componga, sin renderizarse unas a otras internamente. |
| Toggle Group | Recibe los Toggle mediante `children`; su definición no necesita importar el Toggle propio. |
| Menubar | Recibe la composición de Menu desde el consumidor, sin construir menús propios internamente. |
| Field | Expone las piezas de su primitiva, incluido Field.Control, y permite al consumidor elegir o componer el control. |
| Fieldset | Expone Root y Legend y recibe los campos o controles mediante `children`. |
| Form | Envuelve su primitiva y recibe los campos y botones desde el consumidor. |
| Input | El consumidor aporta una etiqueta HTML o coloca el control dentro de Field para asociar ayuda y errores. |

## 2. Componentes dependientes (`dependant/`)

En `components/own/dependant/` hay 1 componente implementado.

- [x] FloatingInput. Compone Input y Field para renderizar un campo con etiqueta flotante, con las variantes `inset` y `outline`.

Si una implementación incorpora esa reutilización interna, su entrada debe trasladarse a esta sección con sus dependencias explícitas, y esas dependencias deben desarrollarse primero. La revisión se realiza sobre la definición del componente; las combinaciones de sus ejemplos no alteran su clasificación.
