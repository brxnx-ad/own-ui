# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui y su distribución prevista entre componentes independientes y dependientes. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente o si la distribución contradice las dependencias internas de sus definiciones y el criterio de clasificación del proyecto.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Componentes independientes (`independant/`)

Los 37 componentes del catálogo se planifican como envolturas de las primitivas de Base UI, con la composición de otros componentes propios decidida por el consumidor mediante `children`, `render` o ranuras. Esta distribución aplica el [criterio de dependencias internas](01-estructura-del-proyecto.md#3-componentes-independientes-y-dependientes) a la implementación prevista; no es una clasificación oficial de Base UI.

Ubicación: `components/own/independant/`. Hay 4 componentes implementados y 33 pendientes:

- [x] Accordion
- [x] Alert Dialog
- [x] Autocomplete
- [ ] Avatar
- [x] Button
- [ ] Checkbox
- [ ] Checkbox Group
- [ ] Collapsible
- [ ] Combobox
- [ ] Context Menu
- [ ] Dialog
- [ ] Drawer
- [ ] Field
- [ ] Fieldset
- [ ] Form
- [ ] Input
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

## 2. Componentes dependientes (`dependant/`)

No hay componentes dependientes implementados ni tareas previstas en esta categoría con la composición descrita. La carpeta `components/own/dependant/` queda reservada para componentes cuya definición importe y renderice otros componentes propios del catálogo.

Si una implementación incorpora esa reutilización interna, su entrada debe trasladarse a esta sección con sus dependencias explícitas, y esas dependencias deben desarrollarse primero. La revisión se realiza sobre la definición del componente; las combinaciones de sus ejemplos no alteran su clasificación.
