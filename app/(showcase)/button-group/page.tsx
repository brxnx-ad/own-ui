import { Button } from "@/components/own/base/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/own/composed/button-group";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";
import { Counter } from "./examples";

export default function Page() {
  return <ShowcasePage title="Button Group" implementation="Separator + controles" description="Agrupa controles relacionados en una misma estructura.">
    <ShowcaseExample title="Acciones relacionadas" description="Agrupa botones adyacentes en una fila." contentClassName="flex justify-center"><ButtonGroup aria-label="Acciones"><Button variant="outline">Guardar</Button><Button variant="outline">Compartir</Button></ButtonGroup></ShowcaseExample>
    <ShowcaseExample title="Orientación vertical" description="Apila los controles con orientation." contentClassName="flex justify-center"><ButtonGroup orientation="vertical" aria-label="Vistas"><Button variant="outline">Lista</Button><ButtonGroupSeparator /><Button variant="outline">Cuadrícula</Button></ButtonGroup></ShowcaseExample>
    <ShowcaseExample title="Texto y acciones" description="Añade una etiqueta con ButtonGroupText."><Counter /></ShowcaseExample>
    <ShowcaseExample title="Separador" description="El separador se orienta automáticamente según el grupo." contentClassName="flex justify-center"><ButtonGroup aria-label="Edición"><Button variant="outline">Copiar</Button><ButtonGroupSeparator /><Button variant="outline">Pegar</Button></ButtonGroup></ShowcaseExample>
    <ComposedReference name="Button Group" code={`<ButtonGroup aria-label="Acciones">
  <Button variant="outline">Copiar</Button>
  <ButtonGroupSeparator />
  <Button variant="outline">Pegar</Button>
</ButtonGroup>`} parts={[["ButtonGroup", "Agrupa los controles y define su orientación."], ["ButtonGroupText", "Añade una pieza de texto o contenido."], ["ButtonGroupSeparator", "Separa controles con Separator."], ["Button", "Control aportado por el consumidor."]]} groups={[
      { piece: "ButtonGroup", rows: [{ prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Define la disposición y la orientación predeterminada del separador." }, { prop: "aria-label", type: "string", defaultValue: "—", description: "Da un nombre accesible al grupo." }] },
      { piece: "ButtonGroupSeparator", rows: [{ prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: "Perpendicular al grupo", description: "Permite sustituir la orientación inferida. Es decorativo por defecto." }] },
      { piece: "ButtonGroupText", rows: [{ prop: "render", type: "ReactElement | función", defaultValue: "div", description: "Sustituye el elemento de texto." }] },
      { piece: "Todas las piezas", rows: [{ prop: "className, style, ref y atributos", type: "Props del elemento", defaultValue: "—", description: "Personalizan cada pieza y sus eventos." }] },
    ]} note="Tab recorre los controles de forma independiente. El grupo no implementa navegación por flechas." />
  </ShowcasePage>;
}
