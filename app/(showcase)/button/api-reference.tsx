import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Button icon={<ProjectIcon />} iconPosition="start">
  Abrir proyecto
</Button>`;

const options = [
  ["variant", '"primary" | "secondary" | "outline" | "ghost" | "destructive"', '"primary"', "Define la jerarquía visual de la acción."],
  ["size", '"sm" | "md" | "lg"', '"md"', "Ajusta la altura, el espaciado y el tamaño del texto."],
  ["loading", "boolean", "false", "Muestra el Spinner, deshabilita la interacción y añade aria-busy."],
  ["disabled", "boolean", "false", "Deshabilita la acción. loading también activa este estado."],
  ["icon", "ReactNode", "—", "Recibe un icono del consumidor. Sin children, el botón adopta proporciones cuadradas."],
  ["iconPosition", '"start" | "end"', '"start"', "Coloca el icono o el Spinner antes o después del contenido."],
  ["children", "ReactNode", "—", "Contenido del botón. Si solo hay un icono, proporciona aria-label."],
  ["focusableWhenDisabled", "boolean", "false", "Permite el foco de teclado estando deshabilitado; la acción permanece bloqueada."],
  ["render", "ReactElement | (props, state) => ReactElement", "button", "Sustituye el elemento. En la forma de función, propaga las props y ref recibidas."],
  ["nativeButton", "boolean", "true", "Indica si el elemento de render es un button nativo. Para un enlace, usa false y role=link."],
  ["className", "string", "—", "Añade clases al botón."],
  ["style", "CSSProperties | (state) => CSSProperties", "—", "Añade estilos estáticos o dependientes del estado de Base UI."],
  ["onClick", "(event) => void", "—", "Se ejecuta al activar el botón habilitado con ratón o teclado."],
  ["type", '"button" | "submit" | "reset"', '"button"', "Define la acción nativa dentro de un formulario."],
];

export function ButtonAnatomy() {
  return (
    <ShowcaseAnatomy id="button-anatomy">
      <p className="body-sm text-gray-bold/75">Una pieza pública con contenido e icono opcionales.</p>
      <ShowcaseAnatomyContent name="Button" code={anatomy} parts={[[<>Button</>, <>Gestiona la acción, los estilos y el foco mediante Base UI.</>], [<>icon</>, <>Ranura opcional; no es un subcomponente exportado. ProjectIcon representa un icono del consumidor.</>], [<>children</>, <>Texto o contenido opcional del botón.</>], [<>Spinner</>, <>Indicador interno que sustituye al icono durante loading; no se compone manualmente dentro de Button.</>]]} />
    </ShowcaseAnatomy>
  );
}

export function ButtonApiReference() {
  return (
    <ShowcaseApiReference id="button-api">
      <p className="body-sm text-gray-bold/75">Opciones de Button. Todas son opcionales.</p>
      <ShowcaseApiTable
        name="Button"
        groups={[{
          piece: "Button",
          rows: options.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }]}
      />
      <p className="body-sm text-gray-bold/75">Tab recorre los botones habilitados; Enter y Espacio activan un botón nativo. Los enlaces conservan su navegación nativa. Los botones de solo icono necesitan un nombre accesible y los iconos decorativos deben ocultarse a lectores de pantalla.</p>
      <p className="caption text-gray-bold/75">También se admiten atributos HTML, ARIA, ref y eventos nativos. La prop className se documenta como cadena porque el wrapper actual no evalúa funciones de clases.</p>
    </ShowcaseApiReference>
  );
}
