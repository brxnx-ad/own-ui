import Link from "next/link";

interface ComponentItem {
  name: string;
  href: string;
  description: string;
  category: string;
}

const components: ComponentItem[] = [
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
  {
    name: "Avatar",
    href: "/avatar",
    description: "Imagen de perfil con iniciales o contenido alternativo.",
    category: "Identidad",
  },
  {
    name: "Button",
    href: "/button",
    description:
      "Botón interactivo base con variantes cromáticas, ranuras de iconos, estado de carga con spinner y compresión física táctil.",
    category: "Acción",
  },
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
    name: "Form",
    href: "/form",
    description: "Formularios con envío, validación coordinada y errores por campo.",
    category: "Entrada",
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
