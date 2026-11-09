import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/own/composed/input-group";
import { ShowcaseExample, ShowcasePage } from "@/components/shared/showcase";
import { ComposedReference } from "../composed-reference";
import { EmailValidationExample, SearchExample } from "./examples";

export default function Page() {
  return <ShowcasePage title="Input Group" implementation="Input + Textarea + Button" description="Combina campos con texto, iconos y acciones contextuales.">
    <ShowcaseExample title="Campo con prefijo" description="Añade contenido al inicio con InputGroupAddon.">
      <label htmlFor="address" className="mb-2 block text-sm font-medium">Sitio web</label>
      <InputGroup><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput id="address" placeholder="ejemplo.com" /></InputGroup>
    </ShowcaseExample>
    <ShowcaseExample title="Búsqueda con acción" description="El botón borra el valor y devuelve el foco al campo."><SearchExample /></ShowcaseExample>
    <ShowcaseExample title="Complementos en bloque" description="Sitúa contenido arriba y abajo con block-start y block-end.">
      <label htmlFor="message" className="mb-2 block text-sm font-medium">Mensaje</label>
      <InputGroup><InputGroupAddon align="block-start"><InputGroupText>Nota</InputGroupText></InputGroupAddon><InputGroupTextarea id="message" showCount maxLength={120} placeholder="Escribe un mensaje" /><InputGroupAddon align="block-end"><InputGroupText>Máximo 120 caracteres</InputGroupText></InputGroupAddon></InputGroup>
    </ShowcaseExample>
    <ShowcaseExample title="Validación" description="Corrige el correo para quitar el borde de error y su mensaje.">
      <EmailValidationExample />
    </ShowcaseExample>
    <ShowcaseExample title="Campo deshabilitado" description="El campo conserva su estado nativo disabled.">
      <label htmlFor="disabled-search" className="mb-2 block text-sm font-medium">Búsqueda</label><InputGroup><InputGroupInput id="disabled-search" disabled placeholder="No disponible" /></InputGroup>
    </ShowcaseExample>
    <ComposedReference name="Input Group" code={`<InputGroup>
  <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
  <InputGroupInput aria-label="Sitio web" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Buscar</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`} parts={[["InputGroup", "Marco que coordina el campo y sus complementos."], ["InputGroupAddon", "Contiene texto, iconos o acciones en una de cuatro posiciones."], ["InputGroupText", "Presenta texto o iconos auxiliares."], ["InputGroupInput / InputGroupTextarea", "Controles propios de una o varias líneas."], ["InputGroupButton", "Acción compacta basada en Button."]]} groups={[
      { piece: "InputGroupAddon", rows: [{ prop: "align", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', defaultValue: '"inline-start"', description: "Sitúa el complemento respecto del campo." }, { prop: "onClick", type: "(event) => void", defaultValue: "—", description: "Se ejecuta antes de enfocar el campo. preventDefault cancela ese enfoque." }] },
      { piece: "InputGroupButton", rows: [{ prop: "size", type: '"xs" | "sm" | "icon-xs" | "icon-sm"', defaultValue: '"xs"', description: "Define las dimensiones de la acción." }, { prop: "variant", type: "ButtonVariant", defaultValue: '"ghost"', description: "Selecciona la variante de Button." }] },
      { piece: "InputGroupInput", rows: [{ prop: "Props de Input", type: "InputProps", defaultValue: "—", description: "Admite valor, eventos, validación y composición con Field." }] },
      { piece: "InputGroupTextarea", rows: [{ prop: "showCount / maxRows", type: "boolean / number", defaultValue: "false / —", description: "Muestra el contador o limita las filas visibles." }, { prop: "Props nativas", type: "TextareaProps", defaultValue: "—", description: "Incluye value, defaultValue, maxLength, eventos y ref." }] },
      { piece: "Todas las piezas", rows: [{ prop: "className, style, ref y atributos", type: "Props del elemento", defaultValue: "—", description: "Personalizan cada pieza y su contenido." }] },
    ]} note="Asocia una etiqueta al campo. El complemento enfoca el control al pulsar su área no interactiva; los botones y enlaces conservan su propia interacción." />
  </ShowcasePage>;
}
