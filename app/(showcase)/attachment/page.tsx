import { FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@/components/own/composed/attachment";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";
import { RemovableAttachment } from "./examples";

function File({ state = "done", size = "default", orientation = "horizontal", name = "Informe.pdf" }: {
  state?: "idle" | "uploading" | "processing" | "error" | "done";
  size?: "default" | "sm" | "xs";
  orientation?: "horizontal" | "vertical";
  name?: string;
}) {
  const descriptions = { idle: "En espera", uploading: "Subiendo", processing: "Procesando", error: "Error de carga", done: "2,4 MB" };
  return <Attachment state={state} size={size} orientation={orientation}>
    <AttachmentMedia><FileText aria-hidden="true" /></AttachmentMedia>
    <AttachmentContent><AttachmentTitle>{name}</AttachmentTitle><AttachmentDescription>{descriptions[state]}</AttachmentDescription></AttachmentContent>
  </Attachment>;
}

export default function Page() {
  return <ShowcasePage title="Attachment" implementation="Componente compuesto" description="Presenta archivos con información, estados y acciones.">
    <ShowcaseExample title="Archivo adjunto" description="Muestra el nombre y los detalles de un archivo." contentClassName="flex justify-center"><File /></ShowcaseExample>
    <ShowcaseExample title="Estados de carga" description="Comunica las etapas de un archivo mediante state." contentClassName="flex flex-wrap justify-center gap-3">
      {(["idle", "uploading", "processing", "error", "done"] as const).map(state => <File key={state} state={state} />)}
    </ShowcaseExample>
    <ShowcaseExample title="Tamaños" description="Ajusta la densidad con size." contentClassName="flex flex-wrap items-center justify-center gap-3">
      {(["default", "sm", "xs"] as const).map(size => <File key={size} size={size} />)}
    </ShowcaseExample>
    <ShowcaseExample title="Orientación vertical" description="Organiza la vista previa sobre la información con orientation." contentClassName="flex justify-center">
      <Attachment orientation="vertical"><AttachmentMedia variant="image"><Image src="/showcase/avatar.svg" width={96} height={96} alt="" /></AttachmentMedia><AttachmentContent><AttachmentTitle>Avatar.svg</AttachmentTitle><AttachmentDescription>Imagen</AttachmentDescription></AttachmentContent></Attachment>
    </ShowcaseExample>
    <ShowcaseExample title="Vista previa y enlace" description="Compón AttachmentTrigger con un enlace para abrir el archivo." contentClassName="flex justify-center">
      <Attachment><AttachmentMedia variant="image"><Image src="/showcase/avatar.svg" width={40} height={40} alt="" /></AttachmentMedia><AttachmentContent><AttachmentTitle>Avatar.svg</AttachmentTitle><AttachmentDescription>Abrir imagen</AttachmentDescription></AttachmentContent><AttachmentTrigger render={<Link href="/showcase/avatar.svg" />} aria-label="Abrir imagen Avatar.svg" /></Attachment>
    </ShowcaseExample>
    <ShowcaseExample title="Acción sobre un archivo" description="El botón elimina el archivo de la lista; puedes restaurarlo."><RemovableAttachment /></ShowcaseExample>
    <ShowcaseExample title="Grupo desplazable" description="Agrupa archivos en una región desplazable con AttachmentGroup.">
      <AttachmentGroup aria-label="Archivos adjuntos">
        {["Informe.pdf", "Presupuesto.pdf", "Anexo.pdf", "Cronograma.pdf", "Resumen.pdf"].map((name) => (
          <File key={name} name={name} size="sm" />
        ))}
      </AttachmentGroup>
    </ShowcaseExample>
    <ComposedReference name="Attachment" code={`<Attachment state="done">
  <AttachmentMedia>Icono</AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>Informe.pdf</AttachmentTitle>
    <AttachmentDescription>2,4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions><AttachmentAction>Quitar</AttachmentAction></AttachmentActions>
</Attachment>`} parts={[
      ["Attachment", "Contenedor del archivo, su orientación, tamaño y estado."], ["AttachmentGroup", "Región horizontal desplazable para varios archivos."], ["AttachmentMedia", "Contiene un icono o vista previa."], ["AttachmentContent, AttachmentTitle, AttachmentDescription", "Organizan el nombre y la información del archivo."], ["AttachmentActions, AttachmentAction", "Agrupan y presentan acciones mediante Button."], ["AttachmentTrigger", "Activador que cubre el archivo; admite render para componer un enlace."],
    ]} groups={[
      { piece: "Attachment", rows: [
        { prop: "state", type: '"idle" | "uploading" | "processing" | "error" | "done"', defaultValue: '"done"', description: "Indica el estado y aplica aria-busy durante carga o procesamiento." },
        { prop: "size", type: '"default" | "sm" | "xs"', defaultValue: '"default"', description: "Ajusta la densidad." },
        { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Dispone el contenido en fila o columna." },
      ] },
      { piece: "AttachmentMedia", rows: [{ prop: "variant", type: '"icon" | "image"', defaultValue: '"icon"', description: "Adapta la presentación del contenido multimedia." }] },
      { piece: "AttachmentAction", rows: [{ prop: "variant / size", type: "ButtonVariant / ButtonSize", defaultValue: '"ghost" / "sm"', description: "Opciones de Button; acepta sus eventos, icon y disabled." }] },
      { piece: "AttachmentTrigger", rows: [{ prop: "render", type: "ReactElement | función", defaultValue: "button", description: "Sustituye el activador. Conserva sus props y ref al usar una función." }] },
      { piece: "Todas las piezas", rows: [{ prop: "className, style, ref y atributos", type: "Props del elemento", defaultValue: "—", description: "Personalizan el nodo y permiten asociar nombres y eventos." }] },
    ]} note="Nombra las acciones que solo contienen iconos. El consumidor proporciona el contenido y gestiona la carga o eliminación." />
  </ShowcasePage>;
}
