import { Catalog, type ComponentItem } from "./catalog";


const components: ComponentItem[] = [
  { name: "Attachment", href: "/attachment", description: "Archivos adjuntos con vista previa, estados y acciones.", category: "Contenido", type: "composed" },
  { name: "Button Group", href: "/button-group", description: "Controles relacionados agrupados horizontal o verticalmente.", category: "Acción", type: "composed" },
  { name: "Input Group", href: "/input-group", description: "Campos con complementos de texto y acciones.", category: "Entrada", type: "composed" },
  { name: "Item", href: "/item", description: "Elementos de contenido con medios y acciones.", category: "Contenido", type: "composed" },
  { name: "Pagination", href: "/pagination", description: "Navegación entre páginas de resultados.", category: "Contenido", type: "composed" },
  { name: "Alert", href: "/alert", description: "Mensajes contextuales con estados y acciones.", category: "Información", type: "simple" },
  {
    name: "Accordion",
    href: "/accordion",
    description: "Paneles expandibles accesibles para organizar contenido relacionado.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Alert Dialog",
    href: "/alert-dialog",
    description:
      "Diálogo modal accesible para confirmar acciones que requieren una decisión explícita.",
    category: "Confirmación",
    type: "base",
  },
  {
    name: "Autocomplete",
    href: "/autocomplete",
    description: "Campo de texto libre con sugerencias mientras se escribe.",
    category: "Entrada",
    type: "base",
  },
  { name: "Aspect Ratio", href: "/aspect-ratio", description: "Contenedor con proporción adaptable para contenido multimedia.", category: "Contenido", type: "simple" },
  {
    name: "Avatar",
    href: "/avatar",
    description: "Imagen de perfil con iniciales o contenido alternativo.",
    category: "Identidad",
    type: "base",
  },
  { name: "Badge", href: "/badge", description: "Etiquetas compactas para categorías y estados.", category: "Información", type: "simple" },
  {
    name: "Button",
    href: "/button",
    description:
      "Botón interactivo base con variantes cromáticas, ranuras de iconos, estado de carga con spinner y compresión física táctil.",
    category: "Acción",
    type: "base",
  },
  { name: "Card", href: "/card", description: "Superficie para agrupar contenido y acciones.", category: "Contenido", type: "simple" },
  {
    name: "Checkbox",
    href: "/checkbox",
    description: "Casilla de selección con estados marcado, desmarcado e indeterminado.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Checkbox Group",
    href: "/checkbox-group",
    description: "Grupo de casillas con selección compartida y opción de seleccionar todo.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Collapsible",
    href: "/collapsible",
    description: "Panel individual que se puede mostrar u ocultar mediante un activador.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Combobox",
    href: "/combobox",
    description: "Selección de una o varias opciones con un campo de búsqueda.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Context Menu",
    href: "/context-menu",
    description: "Acciones contextuales que se abren con clic secundario o pulsación prolongada.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Dialog",
    href: "/dialog",
    description: "Ventanas modales o no modales para editar datos y consultar contenido.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Drawer",
    href: "/drawer",
    description: "Paneles de borde con gestos de arrastre y alturas de ajuste.",
    category: "Contenido",
    type: "base",
  },
  { name: "Empty", href: "/empty", description: "Estado vacío con mensaje y acciones opcionales.", category: "Contenido", type: "simple" },
  {
    name: "Field",
    href: "/field",
    description: "Campos de formulario con etiquetas, descripciones y mensajes de validación asociados.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Fieldset",
    href: "/fieldset",
    description: "Grupos de controles con un nombre accesible y deshabilitación compartida.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "FloatingInput",
    href: "/floating-input",
    description: "Entrada de texto con etiqueta flotante dentro del campo o sobre su borde.",
    category: "Entrada",
    type: "composed",
  },
  {
    name: "Form",
    href: "/form",
    description: "Formularios con envío, validación coordinada y errores por campo.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Input",
    href: "/input",
    description: "Control de texto nativo para usar con una etiqueta HTML o dentro de Field.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Menu",
    href: "/menu",
    description: "Menú de acciones anclado a un botón, con selecciones, submenús y búsqueda opcional.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Menubar",
    href: "/menubar",
    description: "Barra de menús con foco coordinado y navegación por teclado.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Meter",
    href: "/meter",
    description:
      "Representación gráfica de un valor escalar dentro de un rango conocido.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Navigation Menu",
    href: "/navigation-menu",
    description:
      "Colección de enlaces y paneles desplegables para la navegación del sitio.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Number Field",
    href: "/number-field",
    description: "Entrada numérica con botones de ajuste, límites, formato local y arrastre opcional.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "OTP Field",
    href: "/otp-field",
    description: "Entrada segmentada para códigos de un solo uso con pegado y avance de foco.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Popover",
    href: "/popover",
    description: "Panel anclado para mostrar información o editar datos en contexto.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Preview Card",
    href: "/preview-card",
    description: "Vista previa visual del destino de un enlace al pasar el puntero o enfocar.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Progress",
    href: "/progress",
    description: "Barra para mostrar el avance determinado o indeterminado de una tarea.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Radio Group",
    href: "/radio-group",
    description: "Grupo de opciones para elegir un único valor con teclado o puntero.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Scroll Area",
    href: "/scroll-area",
    description: "Contenedor de desplazamiento nativo con barras personalizadas por eje.",
    category: "Contenido",
    type: "base",
  },
  {
    name: "Select",
    href: "/select",
    description: "Selección de una o varias opciones predefinidas desde un panel desplegable.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Separator",
    href: "/separator",
    description: "División horizontal o vertical entre grupos de contenido.",
    category: "Contenido",
    type: "base",
  },
  { name: "Skeleton", href: "/skeleton", description: "Marcadores visuales durante la carga de contenido.", category: "Información", type: "simple" },
  {
    name: "Slider",
    href: "/slider",
    description: "Ajuste de un valor o un intervalo numérico con puntero o teclado.",
    category: "Entrada",
    type: "base",
  },
  {
    name: "Switch",
    href: "/switch",
    description: "Interruptor para activar o desactivar una preferencia.",
    category: "Entrada",
    type: "base",
  },
  { name: "Table", href: "/table", description: "Tabla semántica con desplazamiento horizontal.", category: "Contenido", type: "simple" },
  {
    name: "Tabs",
    href: "/tabs",
    description: "Pestañas para alternar entre paneles relacionados en la misma página.",
    category: "Contenido",
    type: "base",
  },
  { name: "Textarea", href: "/textarea", description: "Campo de texto multilínea con validación nativa.", category: "Entrada", type: "simple" },
  {
    name: "Toast",
    href: "/toast",
    description: "Notificaciones transitorias con acciones, temporizadores y anuncios accesibles.",
    category: "Información",
    type: "base",
  },
  {
    name: "Toggle",
    href: "/toggle",
    description: "Botón de dos estados para activar herramientas o filtros.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Toggle Group",
    href: "/toggle-group",
    description: "Selección compartida y navegación por teclado entre botones de dos estados.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Toolbar",
    href: "/toolbar",
    description: "Barra de herramientas con navegación por flechas entre acciones y controles.",
    category: "Acción",
    type: "base",
  },
  {
    name: "Tooltip",
    href: "/tooltip",
    description: "Indicación breve anclada a un control al pasar el puntero o enfocarlo.",
    category: "Contenido",
    type: "base",
  },
];

export default function ShowcaseHomePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="h1">own-ui</h1>
          <p className="subtitle">
            Catálogo interactivo de componentes React con HTML nativo, Base UI y Tailwind CSS v4.
          </p>
        </header>
        <Catalog components={components} />
      </div>
    </main>
  );
}
