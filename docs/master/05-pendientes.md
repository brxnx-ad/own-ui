# own-ui · Pendientes

> **Objetivo y alcance del documento:** Registrar el estado de implementación del catálogo de own-ui, su distribución prevista entre componentes base, simples, compuestos y dependientes y las referencias externas pendientes de evaluar. Se considera desactualizado si los componentes marcados como implementados difieren del catálogo existente, si la distribución contradice las dependencias de sus definiciones y la estructura vigente del proyecto o si los inventarios de referencias externas difieren de sus índices enlazados.

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

## 4. Por clasificar utilidad

Inventario de componentes de [Interior](https://www.interior.dev/docs) pendientes de evaluar para own-ui, agrupados según el catálogo de origen.

### 4.1. Action Feedback

You did something. Did it land?

- [ ] [Copy Button](https://www.interior.dev/docs/copy-button)
- [ ] [Loading Button](https://www.interior.dev/docs/loading-button)
- [ ] [Hold to Confirm](https://www.interior.dev/docs/hold-to-confirm)
- [ ] [Like Burst](https://www.interior.dev/docs/like-burst)
- [ ] [Ripple](https://www.interior.dev/docs/ripple)
- [ ] [Icon Morph](https://www.interior.dev/docs/icon-morph)
- [ ] [Press Depth](https://www.interior.dev/docs/press-depth)

### 4.2. Input

You are telling the system something it might reject.

- [ ] [Floating Label](https://www.interior.dev/docs/floating-label)
- [ ] [Inline Validation](https://www.interior.dev/docs/inline-validation)
- [ ] [Password Strength](https://www.interior.dev/docs/password-strength)
- [ ] [OTP Input](https://www.interior.dev/docs/otp-input)
- [ ] [Tag Input](https://www.interior.dev/docs/tag-input)
- [ ] [Expanding Search](https://www.interior.dev/docs/expanding-search)

### 4.3. Async

You are waiting, and you deserve to know on what.

- [ ] [Skeleton Swap](https://www.interior.dev/docs/skeleton-swap)
- [ ] [Progress Bar](https://www.interior.dev/docs/progress-bar)
- [ ] [Load More](https://www.interior.dev/docs/load-more)
- [ ] [Streaming Text](https://www.interior.dev/docs/streaming-text)
- [ ] [Task Steps](https://www.interior.dev/docs/task-steps)

### 4.4. Notification

The system is telling you something you did not ask for.

- [ ] [Live Activity](https://www.interior.dev/docs/live-activity)
- [ ] [Collapsible Banner](https://www.interior.dev/docs/collapsible-banner)
- [ ] [Presence Avatars](https://www.interior.dev/docs/presence-avatars)
- [ ] [Typing Indicator](https://www.interior.dev/docs/typing-indicator)
- [ ] [New Items Pill](https://www.interior.dev/docs/new-items-pill)

### 4.5. Overlay

Something came on top. It has to know where it came from.

- [ ] [Modal](https://www.interior.dev/docs/modal)
- [ ] [Popover](https://www.interior.dev/docs/popover)
- [ ] [Tooltip Group](https://www.interior.dev/docs/tooltip-group)
- [ ] [Command Palette](https://www.interior.dev/docs/command-palette)
- [ ] [Drawer](https://www.interior.dev/docs/drawer)
- [ ] [Context Menu](https://www.interior.dev/docs/context-menu)
- [ ] [Dropdown](https://www.interior.dev/docs/dropdown)

### 4.6. Navigation

You moved. The interface should agree about where.

- [ ] [Tabs](https://www.interior.dev/docs/tabs)
- [ ] [Segmented Control](https://www.interior.dev/docs/segmented-control)
- [ ] [Accordion](https://www.interior.dev/docs/accordion)
- [ ] [Wizard Steps](https://www.interior.dev/docs/wizard-steps)
- [ ] [Pagination](https://www.interior.dev/docs/pagination)
- [ ] [Tree View](https://www.interior.dev/docs/tree-view)

### 4.7. Scroll

You are reading, and the page is reacting to that.

- [ ] [Sticky Header](https://www.interior.dev/docs/sticky-header)
- [ ] [Reading Progress](https://www.interior.dev/docs/reading-progress)
- [ ] [Scroll Spy](https://www.interior.dev/docs/scroll-spy)
- [ ] [Snap Carousel](https://www.interior.dev/docs/snap-carousel)
- [ ] [Hide on Scroll](https://www.interior.dev/docs/hide-on-scroll)

### 4.8. Data

A number changed. Which one, and by how much?

- [ ] [Sortable Table](https://www.interior.dev/docs/sortable-table)
- [ ] [Filter Grid](https://www.interior.dev/docs/filter-grid)
- [ ] [Value Flash](https://www.interior.dev/docs/value-flash)
- [ ] [Poll Results](https://www.interior.dev/docs/poll-results)

### 4.9. Gesture

Your finger is on it. Physics is now part of the API.

- [ ] [Slider Detents](https://www.interior.dev/docs/slider-detents)
- [ ] [Swipe Deck](https://www.interior.dev/docs/swipe-deck)
- [ ] [Reorder List](https://www.interior.dev/docs/reorder-list)
- [ ] [Long Press](https://www.interior.dev/docs/long-press)
- [ ] [Lightbox](https://www.interior.dev/docs/lightbox)

### 4.10. Content

The thing itself arrives, resolves, or is missing.

- [ ] [Text Reveal](https://www.interior.dev/docs/text-reveal)
- [ ] [Logo Marquee](https://www.interior.dev/docs/logo-marquee)
- [ ] [Blur-up Image](https://www.interior.dev/docs/blur-up-image)
- [ ] [Show More](https://www.interior.dev/docs/show-more)

## 5. Por clasificar utilidad · Motion

Inventario de 61 ejemplos de [Motion para React](https://motion.dev/examples?platform=react) pendientes de evaluar para own-ui. Incluye ejemplos con código fuente público que usan las API gratuitas de Motion. Las categorías y el orden de los ejemplos siguen el índice oficial.

### 5.1. Basics

- [ ] [AnimatePresence modes](https://motion.dev/examples/react-animate-presence-modes) · React
- [ ] [Color interpolation](https://motion.dev/examples/react-color-interpolation) · React
- [ ] [Drag: Lock direction](https://motion.dev/examples/react-drag-lock-direction) · React
- [ ] [Aspect ratio](https://motion.dev/examples/react-aspect-ratio) · React
- [ ] [Bounce easing](https://motion.dev/examples/react-bounce-easing) · React
- [ ] [usePresenceData](https://motion.dev/examples/react-use-presence-data) · React
- [ ] [Follow pointer with spring](https://motion.dev/examples/react-follow-pointer-with-spring) · React
- [ ] [HTML content](https://motion.dev/examples/react-html-content) · React
- [ ] [Keyframe wildcards](https://motion.dev/examples/react-keyframes-wildcards) · React
- [ ] [Reorder animation](https://motion.dev/examples/react-reorder-items) · React
- [ ] [Element scroll-linked animation](https://motion.dev/examples/react-scroll-container) · React
- [ ] [Track element within viewport](https://motion.dev/examples/react-scroll-track-element-in-viewport) · React
- [ ] [Animate state](https://motion.dev/examples/react-state-updates) · React
- [ ] [Spinning 3D cube](https://motion.dev/examples/react-use-animation-frame) · React
- [ ] [useTime](https://motion.dev/examples/react-use-time) · React
- [ ] [CSS spring](https://motion.dev/examples/react-css-spring) · React
- [ ] [Exit animation](https://motion.dev/examples/react-exit-animation) · React
- [ ] [Drag](https://motion.dev/examples/react-drag) · React
- [ ] [Drag: Constraints](https://motion.dev/examples/react-drag-constraints) · React
- [ ] [Enter animation](https://motion.dev/examples/react-enter-animation) · React
- [ ] [Gestures](https://motion.dev/examples/react-gestures) · React
- [ ] [Keyframes](https://motion.dev/examples/react-keyframes) · React
- [ ] [Layout animation](https://motion.dev/examples/react-layout-animation) · React
- [ ] [Motion along a path](https://motion.dev/examples/react-motion-path) · React
- [ ] [Path drawing](https://motion.dev/examples/react-path-drawing) · React
- [ ] [Path morphing](https://motion.dev/examples/react-path-morphing) · React
- [ ] [Scroll-linked animations](https://motion.dev/examples/react-scroll-linked) · React
- [ ] [Scroll-linked spring animation](https://motion.dev/examples/react-scroll-linked-with-spring) · React
- [ ] [Scroll-triggered animations](https://motion.dev/examples/react-scroll-triggered) · React
- [ ] [Shared layout animation](https://motion.dev/examples/react-shared-layout-animation) · React
- [ ] [Transition options](https://motion.dev/examples/react-transition) · React
- [ ] [Value transform & path drawing](https://motion.dev/examples/react-use-transform) · React
- [ ] [Variants](https://motion.dev/examples/react-variants) · React
- [ ] [Rotate](https://motion.dev/examples/react-rotate) · React

### 5.2. Buttons

- [ ] [Long press](https://motion.dev/examples/react-press-hold) · React
- [ ] [Press and hold to repeat](https://motion.dev/examples/react-press-repeat) · React

### 5.3. Clerk

- [ ] [Clerk: Card Stack](https://motion.dev/examples/react-clerk-card-stack) · React
- [ ] [Clerk: Conditional Field](https://motion.dev/examples/react-clerk-conditional-field) · React
- [ ] [Clerk: Sign-in-or-up](https://motion.dev/examples/react-clerk-sign-in) · React
- [ ] [Clerk: User Button](https://motion.dev/examples/react-clerk-user-button) · React

### 5.4. Dialog

- [ ] [Accordion](https://motion.dev/examples/react-accordion) · React

### 5.5. Experimental

- [ ] [Conic gradient pointer](https://motion.dev/examples/react-conic-gradient-pointer) · React

### 5.6. Forms

- [ ] [Characters remaining](https://motion.dev/examples/react-characters-remaining) · React

### 5.7. Interactions

- [ ] [Double tap to like](https://motion.dev/examples/react-tap-double) · React
- [ ] [Add to basket](https://motion.dev/examples/react-add-to-basket) · React

### 5.8. Layout animations

- [ ] [Layout Anchor](https://motion.dev/examples/react-layout-anchor) · React

### 5.9. Lenis

- [ ] [Lenis smooth scroll](https://motion.dev/examples/react-lenis-smooth-scroll) · React

### 5.10. Lists

- [ ] [Multidimensional reorder](https://motion.dev/examples/react-reorder-grid) · React

### 5.11. Loading

- [ ] [Skeleton Shimmer](https://motion.dev/examples/react-skeleton-shimmer) · React
- [ ] [Loading: Circle spinner](https://motion.dev/examples/react-loading-circle-spinner) · React
- [ ] [Loading: Jumping dots](https://motion.dev/examples/react-loading-jumping-dots) · React
- [ ] [Loading: Pulse dots](https://motion.dev/examples/react-loading-three-dots-pulse) · React

### 5.12. Scroll

- [ ] [Scroll Direction: Hide Header](https://motion.dev/examples/react-scroll-hide-header) · React
- [ ] [Scroll Horizontal Gallery](https://motion.dev/examples/react-scroll-horizontal) · React

### 5.13. Text

- [ ] [Rolling text button](https://motion.dev/examples/react-rolling-text-button) · React
- [ ] [Scroll word reveal](https://motion.dev/examples/react-text-scroll-word-reveal) · React

### 5.14. View

- [ ] [AnimateView: Clip path](https://motion.dev/examples/react-animate-view-clip-path) · React
- [ ] [AnimateView: Reorder items](https://motion.dev/examples/react-animate-view-reorder) · React
- [ ] [AnimateView: Toggle](https://motion.dev/examples/react-animate-view-toggle) · React
- [ ] [AnimateView: Transition types](https://motion.dev/examples/react-animate-view-types) · React
- [ ] [AnimateView: App Store](https://motion.dev/examples/react-animate-view-app-store) · React

## 6. Por clasificar utilidad · Transitions.dev

Inventario de 33 transiciones de [Transitions.dev](https://transitions.dev/library.html) con código React público, pendientes de evaluar para own-ui. Las categorías y el orden dentro de cada una siguen la biblioteca oficial. Los enlaces a fichas interactivas muestran el código en la pestaña React.

### 6.1. Essential

- [ ] [Card resize](https://transitions.dev/transitions/card-resize/)
- [ ] [Notification badge](https://transitions.dev/transitions/notification-badge/)
- [ ] [Text states swap](https://transitions.dev/transitions/text-states-swap/)
- [ ] [Menu dropdown](https://transitions.dev/transitions/menu-dropdown/)
- [ ] [Modal open/close](https://transitions.dev/transitions/modal-open-close/)
- [ ] [Panel reveal](https://transitions.dev/transitions/panel-reveal/)
- [ ] [Page side-by-side](https://transitions.dev/transitions/page-side-by-side/)
- [ ] [Icon swap](https://transitions.dev/transitions/icon-swap/)
- [ ] [Success check](https://transitions.dev/transitions/success-check/)
- [ ] [Error state shake](https://transitions.dev/transitions/error-state-shake/)
- [ ] [Skeleton loader and reveal](https://transitions.dev/transitions/skeleton-loader-and-reveal/)
- [ ] [Tabs sliding](https://transitions.dev/transitions/tabs-sliding/)
- [ ] [Tooltip open/close](https://transitions.dev/transitions/tooltip-open-close/)
- [ ] [Dropdown menu morph](https://transitions.dev/transitions/dropdown-menu-morph/)
- [ ] [Accordion](https://transitions.dev/transitions/accordion/)
- [ ] [Toast open/close](https://transitions.dev/transitions/toast-open-close/)
- [ ] [Learn more hover](https://transitions.dev/transitions/learn-more-hover/)
- [ ] [Checkbox check](https://transitions.dev/transitions/checkbox-check/)
- [ ] [Toggle](https://transitions.dev/transitions/toggle/)
- [ ] [Banner stacking](https://transitions.dev/detail.html?t=banner-stacking)

### 6.2. AI Agents

- [ ] [Thinking states](https://transitions.dev/detail.html?t=thinking-states)
- [ ] [Reasoning stream](https://transitions.dev/detail.html?t=reasoning-stream)
- [ ] [Streaming text](https://transitions.dev/detail.html?t=streaming-text)
- [ ] [Matrix dot loader](https://transitions.dev/detail.html?t=matrix-dot-loader)

Shimmer text también figura en esta categoría y se registra en [Texts](#64-texts).

### 6.3. Effects

- [ ] [Avatar group hover](https://transitions.dev/transitions/avatar-group-hover/)
- [ ] [Input clear with dissolve](https://transitions.dev/transitions/input-clear-with-dissolve/)
- [ ] [3D tilt](https://transitions.dev/transitions/3d-tilt/)
- [ ] [Like button](https://transitions.dev/transitions/like-button/)

### 6.4. Texts

- [ ] [Number pop-in](https://transitions.dev/transitions/number-pop-in/)
- [ ] [Texts reveal](https://transitions.dev/transitions/texts-reveal/)
- [ ] [Shimmer text](https://transitions.dev/transitions/shimmer-text/)
- [ ] [Spinning counter](https://transitions.dev/transitions/spinning-counter/)
- [ ] [Number subtle change](https://transitions.dev/transitions/number-subtle-change/)
