const anatomy = `<NavigationMenu aria-label="Navegación principal">
  <NavigationMenuList>
    <NavigationMenuItem value="plataforma">
      <NavigationMenuTrigger>
        Plataforma
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/componentes" closeOnClick>
          Catálogo de componentes
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/precios" active>
        Precios
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>

  <NavigationMenuPortal>
    <NavigationMenuPositioner>
      <NavigationMenuPopup>
        <NavigationMenuViewport />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
</NavigationMenu>`;

const parts = [
  [
    "NavigationMenu",
    "Raíz que agrupa la lista y el portal. Renderiza un nav en el nivel superior o un div cuando se anida.",
  ],
  [
    "NavigationMenuList",
    "Renderiza la lista ul con navegación compuesta por teclado según la orientación de la raíz.",
  ],
  [
    "NavigationMenuItem",
    "Renderiza cada elemento li e identifica la sección mediante su prop value.",
  ],
  [
    "NavigationMenuTrigger",
    "Botón que abre el panel de su elemento al pasar el puntero, hacer clic o usar las flechas.",
  ],
  [
    "NavigationMenuIcon",
    "Indicador decorativo dentro del activador. Renderiza Chevron por defecto y gira al abrirse.",
  ],
  [
    "NavigationMenuContent",
    "Contenedor del panel del elemento activo que se proyecta dentro de NavigationMenuViewport.",
  ],
  [
    "NavigationMenuLink",
    "Enlace navegable dentro de la barra o del panel. Admite estado activo y cierre al pulsar.",
  ],
  [
    "NavigationMenuPortal",
    "Traslada el posicionador y el popup al contenedor del portal (body por defecto).",
  ],
  [
    "NavigationMenuBackdrop",
    "Superficie opcional de fondo detrás del popup abierto.",
  ],
  [
    "NavigationMenuPositioner",
    "Posiciona el contenedor flotante frente al activador activo y transiciona su desplazamiento.",
  ],
  [
    "NavigationMenuPopup",
    "Contenedor nav flotante que adapta su ancho y alto a las dimensiones del contenido activo.",
  ],
  [
    "NavigationMenuViewport",
    "Área de recorte donde se montan y animan las transiciones entre paneles de contenido.",
  ],
];

const groups = [
  {
    name: "NavigationMenu",
    rows: [
      [
        "defaultValue",
        "Value | null",
        "null",
        "Valor inicial del elemento abierto en modo no controlado.",
      ],
      [
        "value",
        "Value | null",
        "null",
        "Valor controlado del elemento activo. Cuando es null, el menú permanece cerrado.",
      ],
      [
        "onValueChange",
        "(value: Value | null, details: NavigationMenuChangeEventDetails) => void",
        "—",
        "Se ejecuta al abrir, cambiar o cerrar el elemento activo. Permite cancelar con details.cancel().",
      ],
      [
        "onOpenChangeComplete",
        "(open: boolean) => void",
        "—",
        "Se ejecuta cuando concluyen las animaciones de cierre del popup.",
      ],
      [
        "actionsRef",
        "RefObject<NavigationMenuActions | null>",
        "—",
        "Expone close() para cerrar imperativamente y unmount() para desmontar tras preventUnmountOnClose().",
      ],
      [
        "orientation",
        "'horizontal' | 'vertical'",
        "'horizontal'",
        "Define el eje de la lista, las flechas de navegación y la dirección de activación.",
      ],
      [
        "delay / closeDelay",
        "number",
        "50 / 50",
        "Tiempo de espera en milisegundos antes de abrir o cerrar el popup con el puntero.",
      ],
    ],
  },
  {
    name: "NavigationMenuItem",
    rows: [
      [
        "value",
        "any",
        "ID generado",
        "Identificador único del elemento para coordinar la apertura controlada o inicial.",
      ],
    ],
  },
  {
    name: "NavigationMenuTrigger",
    rows: [
      [
        "disabled",
        "boolean",
        "false",
        "Desactiva la apertura por puntero y clic manteniendo la accesibilidad en la lista.",
      ],
      [
        "nativeButton",
        "boolean",
        "true",
        "Indica a Base UI si el nodo renderizado mediante render sigue siendo un button nativo.",
      ],
    ],
  },
  {
    name: "NavigationMenuContent",
    rows: [
      [
        "keepMounted",
        "boolean",
        "false",
        "Mantiene el contenido en el DOM mientras está cerrado, facilitando el rastreo en SSR y el cambio en submenús en línea.",
      ],
    ],
  },
  {
    name: "NavigationMenuLink",
    rows: [
      [
        "active",
        "boolean",
        "false",
        "Marca el enlace como página actual con aria-current=\"page\" y data-active.",
      ],
      [
        "closeOnClick",
        "boolean",
        "false",
        "Cierra el menú de navegación al activar el enlace con razón 'link-press'.",
      ],
    ],
  },
  {
    name: "NavigationMenuPortal",
    rows: [
      [
        "keepMounted",
        "boolean",
        "false",
        "Conserva el árbol del portal montado en el DOM cuando el popup está oculto.",
      ],
      [
        "container",
        "HTMLElement | ShadowRoot | RefObject | null",
        "document.body",
        "Elemento contenedor donde se inserta el portal.",
      ],
    ],
  },
  {
    name: "NavigationMenuPositioner",
    rows: [
      [
        "side",
        "'top' | 'bottom' | 'left' | 'right' | 'inline-start' | 'inline-end'",
        "'bottom'",
        "Lado preferido respecto del activador activo.",
      ],
      [
        "align",
        "'start' | 'center' | 'end'",
        "'center'",
        "Alineación transversal respecto del activador.",
      ],
      [
        "sideOffset / alignOffset",
        "number | OffsetFunction",
        "8 / 0",
        "Separación en píxeles en el eje principal (own-ui define 8 por defecto en sideOffset) y transversal.",
      ],
      [
        "collisionBoundary / collisionPadding / collisionAvoidance",
        "Opciones de posicionamiento",
        "'clipping-ancestors' / 5 / según anidación",
        "Controlan el ajuste frente a los bordes de la ventana.",
      ],
      [
        "positionMethod / sticky / disableAnchorTracking",
        "'absolute' | 'fixed' / boolean / boolean",
        "'absolute' / false / false",
        "Configuran el método de posicionamiento CSS y el seguimiento del activador.",
      ],
    ],
  },
  {
    name: "Todas las piezas",
    rows: [
      [
        "className",
        "string | ((state) => string | undefined)",
        "Clases de la pieza",
        "Añade clases estáticas o dependientes del estado de la pieza.",
      ],
      [
        "style",
        "CSSProperties | ((state) => CSSProperties | undefined)",
        "—",
        "Aplica estilos en línea al elemento.",
      ],
      [
        "render",
        "ReactElement | ((props, state) => ReactElement)",
        "Elemento de la pieza",
        "Sustituye el nodo conservando atributos ARIA, eventos, posicionamiento y ref.",
      ],
      [
        "ref",
        "Ref del elemento HTML",
        "—",
        "Expone el nodo DOM en React 19.",
      ],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">
        Anatomía
      </h2>
      <pre
        aria-label="Composición de NavigationMenu en JSX"
        className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm text-gray-bold"
      >
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">
            Piezas de NavigationMenu y sus responsabilidades
          </caption>
          <thead className="bg-surface-bold">
            <tr>
              <th scope="col" className="p-4">
                Pieza
              </th>
              <th scope="col" className="p-4">
                Responsabilidad
              </th>
            </tr>
          </thead>
          <tbody>
            {parts.map(([name, description]) => (
              <tr key={name} className="border-t border-gray-base align-top">
                <th scope="row" className="p-4 font-mono text-xs">
                  {name}
                </th>
                <td className="p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">
        Referencia de API
      </h2>
      <div
        role="region"
        aria-label="Tabla de referencia de API de NavigationMenu"
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base"
      >
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">
            Props y callbacks de las piezas de NavigationMenu
          </caption>
          <thead className="bg-surface-bold">
            <tr>
              {[
                "Pieza",
                "Prop o callback",
                "Tipo",
                "Predeterminado",
                "Opcional",
                "Función",
              ].map((label) => (
                <th key={label} scope="col" className="p-4">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          {groups.map(({ name, rows }) => (
            <tbody key={name}>
              {rows.map(([prop, type, defaultValue, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && (
                    <th
                      scope="rowgroup"
                      rowSpan={rows.length}
                      className="p-4 font-medium"
                    >
                      {name}
                    </th>
                  )}
                  <th scope="row" className="p-4 font-mono text-xs">
                    {prop}
                  </th>
                  <td className="p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li>
          <code>NavigationMenuChangeEventReason</code> incluye{" "}
          <code>trigger-press</code>, <code>trigger-hover</code>,{" "}
          <code>outside-press</code>, <code>list-navigation</code>,{" "}
          <code>focus-out</code>, <code>escape-key</code>,{" "}
          <code>link-press</code>, <code>imperative-action</code> y{" "}
          <code>none</code>.
        </li>
        <li>
          <code>NavigationMenuPositioner</code> expone las variables{" "}
          <code>--positioner-width</code>, <code>--positioner-height</code>,{" "}
          <code>--available-width</code>, <code>--available-height</code> y{" "}
          <code>--transform-origin</code>; <code>NavigationMenuPopup</code>{" "}
          expone <code>--popup-width</code> y <code>--popup-height</code>.
        </li>
        <li>
          <code>NavigationMenuContent</code> publica{" "}
          <code>data-activation-direction</code> (<code>left</code>,{" "}
          <code>right</code>, <code>up</code> o <code>down</code>) al cambiar
          entre secciones abiertas. Todas las transiciones respetan{" "}
          <code>prefers-reduced-motion: reduce</code>.
        </li>
        <li>
          En orientación horizontal, las flechas <kbd>←</kbd> y <kbd>→</kbd>{" "}
          recorren la barra y <kbd>↓</kbd> abre el panel del activador enfocado.
          <kbd>Escape</kbd> cierra el panel y devuelve el foco al activador.
        </li>
      </ul>
    </section>
  );
}
