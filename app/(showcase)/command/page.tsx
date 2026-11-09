import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";
import { ControlledCommands, GroupedCommands, TitleCommands } from "./examples";

const exampleLayout = "flex flex-col items-center gap-4 text-center";

export default function Page() {
  return (
    <ShowcasePage
      title="Command"
      implementation="Autocomplete + Dialog"
      description="Busca y ejecuta acciones desde una paleta modal."
    >
      <ShowcaseExample
        title="Buscar y ejecutar una acción"
        description={<>Escribe el nombre de una acción o un alias de <code>keywords</code> como «capitalizar» y ejecútala con Enter.</>}
        contentClassName={exampleLayout}
      >
        <TitleCommands />
      </ShowcaseExample>
      <ShowcaseExample
        title="Comandos agrupados"
        description={<>Cambia el tema del showcase desde una lista de grupos que incluye una acción con <code>disabled</code>.</>}
        contentClassName={exampleLayout}
      >
        <GroupedCommands />
      </ShowcaseExample>
      <ShowcaseExample
        title="Apertura controlada"
        description={<>Abre la paleta desde un botón externo con <code>open</code> y devuelve el foco a ese botón con <code>finalFocus</code>.</>}
        contentClassName={exampleLayout}
      >
        <ControlledCommands />
      </ShowcaseExample>
      <ComposedReference
        name="Command"
        code={`<Command
  title="Formato del título"
  trigger={<Button>Buscar acciones</Button>}
  items={[
    { id: "upper", label: "Convertir a mayúsculas", keywords: ["capitalizar"] },
    { id: "lower", label: "Convertir a minúsculas" },
  ]}
  onSelect={(item) => applyFormat(item.id)}
/>`}
        parts={[
          ["Command", "Compone el diálogo modal y la lista de resultados en el mismo panel."],
          ["trigger", "Elemento de botón que abre el diálogo y recibe el foco al cerrar."],
          ["title / description", "Encabezado y descripción accesible opcional del diálogo."],
          ["Campo y lista", "Autocomplete filtra los comandos y mantiene el foco en el campo mientras se recorren las opciones."],
          ["Cerrar", "Botón con nombre accesible que cierra la paleta sin ejecutar un comando."],
        ]}
        groups={[
          { piece: "Command", rows: [
            { prop: "title", type: "string", defaultValue: "—", optional: "No", description: "Nombre visible y accesible del diálogo." },
            { prop: "description", type: "string", defaultValue: "—", description: "Añade contexto visible y accesible al diálogo." },
            { prop: "trigger", type: "ReactElement", defaultValue: "—", description: "Botón que recibe las props y la ref de DialogTrigger. Puede omitirse si la apertura se controla externamente." },
            { prop: "items", type: "readonly CommandItem[] | readonly CommandGroup[]", defaultValue: "—", optional: "No", description: "Comandos planos o agrupados." },
            { prop: "onSelect", type: "(item: CommandItem) => void", defaultValue: "—", optional: "No", description: "Recibe el comando habilitado tras solicitar el cierre." },
            { prop: "open / defaultOpen", type: "boolean", defaultValue: "— / false", description: "Controlan la visibilidad actual o inicial, respectivamente." },
            { prop: "onOpenChange", type: "(open: boolean, details: DialogChangeEventDetails) => void", defaultValue: "—", description: "Recibe solicitudes de apertura y cierre. Una ejecución solicita el cierre con el motivo imperative-action." },
            { prop: "finalFocus", type: "DialogPopupProps[\"finalFocus\"]", defaultValue: "Comportamiento de Dialog", description: "Define el destino del foco al cerrar, por ejemplo un botón externo." },
            { prop: "className", type: "DialogPopupProps[\"className\"]", defaultValue: "—", description: "Añade clases al panel y permite seleccionar sus piezas por data-slot." },
          ] },
          { piece: "Textos", rows: [
            { prop: "inputLabel", type: "string", defaultValue: "Buscar comandos", description: "Nombre accesible del campo." },
            { prop: "placeholder", type: "string", defaultValue: "Escribe un comando…", description: "Texto de ayuda dentro del campo vacío." },
            { prop: "emptyMessage", type: "string", defaultValue: "No se encontraron comandos.", description: "Mensaje anunciado cuando el filtro no devuelve coincidencias." },
            { prop: "closeLabel", type: "string", defaultValue: "Cerrar paleta", description: "Nombre accesible del botón de cierre." },
          ] },
          { piece: "CommandItem", rows: [
            { prop: "id / label", type: "string", defaultValue: "—", optional: "No", description: "Identificador estable del comando y texto visible que participa en la búsqueda." },
            { prop: "keywords", type: "readonly string[]", defaultValue: "—", description: "Alias de búsqueda." },
            { prop: "icon", type: "ReactNode", defaultValue: "—", description: "Contenido decorativo al inicio del comando." },
            { prop: "disabled", type: "boolean", defaultValue: "false", description: "Mantiene visible el comando e impide ejecutarlo." },
          ] },
          { piece: "CommandGroup", rows: [
            { prop: "id / label", type: "string", defaultValue: "—", optional: "No", description: "Identificador estable y nombre accesible del grupo." },
            { prop: "items", type: "readonly CommandItem[]", defaultValue: "—", optional: "No", description: "Comandos del grupo." },
          ] },
        ]}
        note="Usa las flechas para recorrer las coincidencias, Enter para ejecutar el comando resaltado y Escape para cerrar la paleta."
      />
    </ShowcasePage>
  );
}
