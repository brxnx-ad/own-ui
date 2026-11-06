# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar los componentes pendientes de desarrollar para ampliar el catálogo de own-ui y su orden de trabajo. Se considera desactualizado si los componentes pendientes o sus relaciones de composición difieren del estado del catálogo y de las primitivas disponibles en Base UI.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Desarrollar los componentes independientes

Desarrollar los componentes propios basados en primitivas que pueden utilizarse sin importar otra familia de componentes de Base UI. Una primitiva puede requerir varias piezas de su propia API.

- [x] Accordion
- [ ] Alert Dialog
- [ ] Autocomplete
- [ ] Avatar
- [x] Button
- [ ] Checkbox
- [ ] Collapsible
- [ ] Combobox
- [ ] Context Menu
- [ ] Dialog
- [ ] Drawer
- [ ] Input
- [ ] Menu
- [ ] Meter
- [ ] Navigation Menu
- [ ] Number Field
- [ ] OTP Field
- [ ] Popover
- [ ] Preview Card
- [ ] Progress
- [ ] Scroll Area
- [ ] Select
- [ ] Separator
- [ ] Slider
- [ ] Switch
- [ ] Tabs
- [ ] Toast
- [ ] Toggle
- [ ] Toolbar
- [ ] Tooltip

## 2. Desarrollar los componentes de agrupación y composición

Desarrollar estos componentes considerando primero las piezas propias que reutilizarán, para que sus variantes, estados y correcciones se propaguen mediante la composición. Field, Fieldset y Form pueden trabajar con distintos controles, incluidos controles nativos; su inclusión en este grupo responde a su función de composición.

- [ ] Checkbox Group: coordina componentes Checkbox.
- [ ] Radio Group: coordina opciones Radio; diseñar ambas piezas como una unidad.
- [ ] Toggle Group: coordina componentes Toggle.
- [ ] Menubar: organiza componentes Menu.
- [ ] Field: añade etiqueta, descripción y validación a un control.
- [ ] Fieldset: agrupa controles relacionados.
- [ ] Form: organiza controles y gestiona errores de formulario.
