import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Avatar role="img" aria-label="Elena Marín">
  <AvatarFallback>EM</AvatarFallback>
  <AvatarImage src="/showcase/avatar.svg" alt="" />
</Avatar>`;

const parts = [
  ["Avatar", "Renderiza un span que define el tamaño y coordina el estado de la imagen."],
  ["AvatarFallback", "Renderiza un span con el contenido alternativo mientras la imagen no está disponible."],
  ["AvatarImage", "Renderiza el img que ocupa la caja del avatar."],
];

const groups = [
  { name: "Avatar", rows: [
    ["size", '"sm" | "md" | "lg"', '"md"', "Ajusta la caja y el texto a 32, 40 o 48 px de lado con la escala base."],
  ] },
  { name: "AvatarFallback", rows: [
    ["delay", "number", "0", "Milisegundos desde el montaje antes de permitir que aparezca el contenido alternativo."],
  ] },
  { name: "AvatarImage", rows: [
    ["src / srcSet", "string", "—", "Fuente de la imagen o conjunto de fuentes. Usa sizes cuando corresponda."],
    ["alt", "string", "—", "Alternativa textual. Usa una cadena vacía si la raíz o un texto adyacente ya identifica a la persona."],
    ["keepMounted", "boolean", "false", "Mantiene el img en el DOM y carga la imagen en el propio nodo. Permite usar loading=\"lazy\" y componer con next/image."],
    ["onLoadingStatusChange", "(status: ImageLoadingStatus) => void", "—", "Notifica loading, loaded o error. Recibe el estado sin detalles de evento ni mecanismo de cancelación."],
  ] },
  { name: "Todas las piezas", rows: [
    ["className", "string | (state) => string | undefined", "—", "Combina clases adicionales estáticas o dependientes del estado con las clases base."],
    ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos inline al nodo de la pieza."],
    ["render", "ReactElement | (props, state) => ReactElement", "Elemento de la pieza", "Sustituye el nodo conservando las props, los eventos y la referencia DOM."],
  ] },
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Avatar" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <p className="body-sm text-gray-bold/75">
        <code>size</code> es propia de own-ui. Las demás opciones se heredan de Base UI o del elemento HTML de la pieza.
      </p>
      <ShowcaseApiTable
        name="Avatar"
        groups={groups.map(({ name, rows }) => ({
          piece: name,
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }))}
      />
      <ul className="list-disc space-y-2 pl-5 body-sm text-gray-bold/75">
        <li><code>ImageLoadingStatus</code> admite <code>idle</code>, <code>loading</code>, <code>loaded</code> y <code>error</code>. El estado inicial es <code>idle</code>.</li>
        <li>Con <code>keepMounted</code>, el nodo de imagen queda invisible durante la carga o el error y conserva su caja para la carga diferida.</li>
        <li>Avatar no recibe foco por defecto. Si abre un perfil, compón el avatar dentro de un enlace con nombre accesible.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
