import Link from "next/link";

interface ComponentItem {
  name: string;
  href: string;
  description: string;
  category: string;
}

const components: ComponentItem[] = [
  { name: "Alert", href: "/alert", description: "Mensajes contextuales con estados y acciones.", category: "Información" },
  {
    name: "Accordion",
    href: "/accordion",
    description: "Paneles expandibles accesibles para organizar contenido relacionado.",
    category: "Contenido",
  },
  {
    name: "Alert Dialog",
    href: "/alert-dialog",
    description:
      "Diálogo modal accesible para confirmar acciones que requieren una decisión explícita.",
    category: "Confirmación",
  },
  {
    name: "Autocomplete",
    href: "/autocomplete",
    description: "Campo de texto libre con sugerencias mientras se escribe.",
    category: "Entrada",
  },
  { name: "Aspect Ratio", href: "/aspect-ratio", description: "Contenedor con proporción adaptable para contenido multimedia.", category: "Contenido" },
  {
    name: "Avatar",
    href: "/avatar",
    description: "Imagen de perfil con iniciales o contenido alternativo.",
    category: "Identidad",
  },
  { name: "Badge", href: "/badge", description: "Etiquetas compactas para categorías y estados.", category: "Información" },
  {
    name: "Button",
    href: "/button",
    description:
      "Botón interactivo base con variantes cromáticas, ranuras de iconos, estado de carga con spinner y compresión física táctil.",
    category: "Acción",
  },
  { name: "Card", href: "/card", description: "Superficie para agrupar contenido y acciones.", category: "Contenido" },
  {
    name: "Checkbox",
    href: "/checkbox",
    description: "Casilla de selección con estados marcado, desmarcado e indeterminado.",
    category: "Entrada",
  },
  {
    name: "Checkbox Group",
    href: "/checkbox-group",
    description: "Grupo de casillas con selección compartida y opción de seleccionar todo.",
    category: "Entrada",
  },
  {
    name: "Collapsible",
    href: "/collapsible",
    description: "Panel individual que se puede mostrar u ocultar mediante un activador.",
    category: "Contenido",
  },
  {
    name: "Combobox",
    href: "/combobox",
    description: "Selección de una o varias opciones con un campo de búsqueda.",
    category: "Entrada",
  },
  {
    name: "Context Menu",
    href: "/context-menu",
    description: "Acciones contextuales que se abren con clic secundario o pulsación prolongada.",
    category: "Acción",
  },
  {
    name: "Dialog",
    href: "/dialog",
    description: "Ventanas modales o no modales para editar datos y consultar contenido.",
    category: "Contenido",
  },
  {
    name: "Drawer",
    href: "/drawer",
    description: "Paneles de borde con gestos de arrastre y alturas de ajuste.",
    category: "Contenido",
  },
  { name: "Empty", href: "/empty", description: "Estado vacío con mensaje y acciones opcionales.", category: "Contenido" },
  {
    name: "Field",
    href: "/field",
    description: "Campos de formulario con etiquetas, descripciones y mensajes de validación asociados.",
    category: "Entrada",
  },
  {
    name: "Fieldset",
    href: "/fieldset",
    description: "Grupos de controles con un nombre accesible y deshabilitación compartida.",
    category: "Entrada",
  },
  {
    name: "FloatingInput",
    href: "/floating-input",
    description: "Entrada de texto con etiqueta flotante dentro del campo o sobre su borde.",
    category: "Entrada",
  },
  {
    name: "Form",
    href: "/form",
    description: "Formularios con envío, validación coordinada y errores por campo.",
    category: "Entrada",
  },
  {
    name: "Input",
    href: "/input",
    description: "Control de texto nativo para usar con una etiqueta HTML o dentro de Field.",
    category: "Entrada",
  },
  {
    name: "Menu",
    href: "/menu",
    description: "Menú de acciones anclado a un botón, con selecciones, submenús y búsqueda opcional.",
    category: "Acción",
  },
  {
    name: "Menubar",
    href: "/menubar",
    description: "Barra de menús con foco coordinado y navegación por teclado.",
    category: "Acción",
  },
  {
    name: "Meter",
    href: "/meter",
    description:
      "Representación gráfica de un valor escalar dentro de un rango conocido.",
    category: "Contenido",
  },
  {
    name: "Navigation Menu",
    href: "/navigation-menu",
    description:
      "Colección de enlaces y paneles desplegables para la navegación del sitio.",
    category: "Contenido",
  },
  {
    name: "Number Field",
    href: "/number-field",
    description: "Entrada numérica con botones de ajuste, límites, formato local y arrastre opcional.",
    category: "Entrada",
  },
  {
    name: "OTP Field",
    href: "/otp-field",
    description: "Entrada segmentada para códigos de un solo uso con pegado y avance de foco.",
    category: "Entrada",
  },
  {
    name: "Popover",
    href: "/popover",
    description: "Panel anclado para mostrar información o editar datos en contexto.",
    category: "Contenido",
  },
  {
    name: "Preview Card",
    href: "/preview-card",
    description: "Vista previa visual del destino de un enlace al pasar el puntero o enfocar.",
    category: "Contenido",
  },
  {
    name: "Progress",
    href: "/progress",
    description: "Barra para mostrar el avance determinado o indeterminado de una tarea.",
    category: "Contenido",
  },
  {
    name: "Radio Group",
    href: "/radio-group",
    description: "Grupo de opciones para elegir un único valor con teclado o puntero.",
    category: "Entrada",
  },
  {
    name: "Scroll Area",
    href: "/scroll-area",
    description: "Contenedor de desplazamiento nativo con barras personalizadas por eje.",
    category: "Contenido",
  },
  {
    name: "Select",
    href: "/select",
    description: "Selección de una o varias opciones predefinidas desde un panel desplegable.",
    category: "Entrada",
  },
  {
    name: "Separator",
    href: "/separator",
    description: "División horizontal o vertical entre grupos de contenido.",
    category: "Contenido",
  },
  { name: "Skeleton", href: "/skeleton", description: "Marcadores visuales durante la carga de contenido.", category: "Información" },
  {
    name: "Slider",
    href: "/slider",
    description: "Ajuste de un valor o un intervalo numérico con puntero o teclado.",
    category: "Entrada",
  },
  {
    name: "Switch",
    href: "/switch",
    description: "Interruptor para activar o desactivar una preferencia.",
    category: "Entrada",
  },
  { name: "Table", href: "/table", description: "Tabla semántica con desplazamiento horizontal.", category: "Contenido" },
  {
    name: "Tabs",
    href: "/tabs",
    description: "Pestañas para alternar entre paneles relacionados en la misma página.",
    category: "Contenido",
  },
  { name: "Textarea", href: "/textarea", description: "Campo de texto multilínea con validación nativa.", category: "Entrada" },
  {
    name: "Toast",
    href: "/toast",
    description: "Notificaciones transitorias con acciones, temporizadores y anuncios accesibles.",
    category: "Información",
  },
  {
    name: "Toggle",
    href: "/toggle",
    description: "Botón de dos estados para activar herramientas o filtros.",
    category: "Acción",
  },
  {
    name: "Toggle Group",
    href: "/toggle-group",
    description: "Selección compartida y navegación por teclado entre botones de dos estados.",
    category: "Acción",
  },
  {
    name: "Toolbar",
    href: "/toolbar",
    description: "Barra de herramientas con navegación por flechas entre acciones y controles.",
    category: "Acción",
  },
  {
    name: "Tooltip",
    href: "/tooltip",
    description: "Indicación breve anclada a un control al pasar el puntero o enfocarlo.",
    category: "Contenido",
  },
];

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function ShowcaseHomePage() {
  return (
    <main className="min-h-screen bg-surface-soft text-gray-bold px-6 py-12 sm:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Cabecera */}
        <header className="space-y-3">
          <h1 className="h1">own-ui</h1>
          <p className="subtitle">
            Catálogo y showcase de componentes propios construidos sobre Base UI y Tailwind CSS v4.
          </p>
        </header>

        {/* Listado de componentes */}
        <section aria-labelledby="components-heading" className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-base pb-3">
            <h2 id="components-heading" className="h3">
              Componentes
            </h2>
            <span className="caption uppercase tracking-wider text-gray-bold/70 font-semibold">
              {components.length} {components.length === 1 ? "disponible" : "disponibles"}
            </span>
          </div>

          <nav className="grid gap-3" aria-label="Listado de componentes">
            {components.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-base border border-gray-base bg-surface-base p-5 shadow-s transition-colors duration-150 hover:border-primary-base hover:bg-surface-bold"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading text-base font-semibold text-gray-bold group-hover:text-primary-base transition-colors">
                      {item.name}
                    </span>
                    <span className="caption rounded-base bg-gray-soft px-2 py-0.5 font-medium text-gray-bold/80">
                      {item.category}
                    </span>
                  </div>
                  <p className="body-sm text-gray-bold/75 truncate sm:text-pretty">
                    {item.description}
                  </p>
                </div>

                <div className="text-gray-bold/50 group-hover:text-primary-base transition-colors">
                  <ArrowRightIcon />
                </div>
              </Link>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
