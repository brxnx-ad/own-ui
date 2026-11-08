import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  DocumentEditorExample,
  FilePanelExample,
  InboxExample,
  ProjectPermissionsExample,
  ReportSectionsExample,
} from "./examples";


export default function MenubarShowcasePage() {
  return (
    <ShowcasePage title="Menubar" implementation="@base-ui/react/menubar" description="Una barra de comandos que coordina la apertura y el foco de varios menús.">
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-md flex-col items-center gap-4" title="Comandos de un editor" description={<>Abre Archivo y usa <kbd>→</kbd> o el puntero para pasar a Formato y Vista, donde puedes modificar la vista previa.</>}>
          <DocumentEditorExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-md flex-col items-center gap-4" title="Herramientas en un panel lateral" description={<>Con <code>{'orientation="vertical"'}</code>, usa <kbd>↑</kbd> y <kbd>↓</kbd> para pasar de Ordenar a Columnas y ajustar la tabla de archivos.</>}>
          <FilePanelExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-md flex-col items-center gap-4" title="Recorrido por secciones de un informe" description={<>Enfoca Anexo y pulsa <kbd>→</kbd> con la casilla desmarcada y marcada para comprobar cuándo <code>loopFocus</code> devuelve el foco a Resumen.</>}>
          <ReportSectionsExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-md flex-col items-center gap-4" title="Acciones junto a un menú abierto" description={<>Abre Filtro y pulsa «Mostrar extractos» con la casilla desmarcada y marcada para ver cómo <code>modal</code> afecta al botón exterior.</>}>
          <InboxExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto flex w-full max-w-md flex-col items-center gap-4" title="Comandos en una vista de solo lectura" description={<>Desmarca «Modo de solo lectura» para retirar <code>disabled</code> de la barra y cambiar el estado o la prioridad del proyecto.</>}>
          <ProjectPermissionsExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
