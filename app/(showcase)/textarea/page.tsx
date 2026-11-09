import { Textarea } from "@/components/own/simple/textarea";
import { Example, SimpleShowcase } from "../simple-showcase";
import { ControlledTextarea, NativeValidationExample } from "./examples";

export default function Page() {
  return <SimpleShowcase name="Textarea" description="Campo de texto multilínea con estados y validación nativos."
    anatomy={`<label htmlFor="message">Mensaje</label>
<Textarea id="message" name="message" rows={2} maxRows={5} />`}
    parts={[["Textarea", "Control nativo que ajusta su altura al contenido."]]}
    api={[
      ["Textarea", "rows", "number", "1", "Sí", "Número mínimo de líneas visibles. Si supera maxRows, se ajusta al máximo."],
      ["Textarea", "maxRows", "number", "Sin límite", "Sí", "Máximo de líneas visibles como entero positivo. El resto del texto se consulta con desplazamiento interno."],
      ["Textarea", "showCount", "boolean", "false", "Sí", "Muestra el contador abajo a la derecha e incluye el límite cuando se define maxLength."],
      ["Textarea", "value / defaultValue", "string | number | readonly string[]", "—", "Sí", "Valor controlado o valor inicial. Para texto, usa string y elige un solo modo."],
      ["Textarea", "onChange", "ChangeEventHandler<HTMLTextAreaElement>", "—", "Sí", "Recibe el evento de edición con el texto ya truncado si hubo exceso."],
      ["Textarea", "required, minLength", "boolean, number", "—", "Sí", "Restricciones nativas de formulario."],
      ["Textarea", "maxLength", "number", "Sin límite", "Sí", "El navegador limita la edición. Si llega un valor más largo, el componente trunca el exceso y marca el campo como inválido."],
      ["Textarea", "aria-invalid", "boolean | string", "—", "Sí", "Señala un error comunicado por el consumidor."],
      ["Textarea", "disabled / readOnly", "boolean", "false", "Sí", "Deshabilita la edición o conserva el campo en solo lectura."],
    ]}>
    <Example title="Texto editable" description={<>Asocia una etiqueta y usa <code>name</code> para enviar el valor.</>}><label className="mx-auto block max-w-md space-y-2"><span className="body-sm block">Mensaje</span><Textarea name="message" placeholder="Escribe tu mensaje" /></label></Example>
    <Example title="Valor controlado" description={<>Gestiona el texto con <code>value</code> y <code>onChange</code>.</>}><ControlledTextarea /></Example>
    <Example title="Contador de caracteres" description={<>Activa <code>showCount</code> para ver cuántos caracteres has escrito.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Comentario breve</span>
        <Textarea showCount maxLength={100} defaultValue="Hola" />
      </label>
    </Example>
    <Example title="Crecimiento automático" description={<>El campo empieza en una línea y ajusta su altura al escribir o borrar.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Descripción</span>
        <Textarea showCount />
      </label>
    </Example>
    <Example title="Altura inicial y máxima" description={<>Usa <code>rows</code> para empezar con dos líneas y <code>maxRows</code> para limitar el crecimiento a cuatro.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Nota</span>
        <Textarea rows={2} maxRows={4} showCount />
      </label>
    </Example>
    <Example title="Valor por encima del límite" description={<>El valor inicial excede <code>maxLength</code>. El campo conserva solo el texto permitido y queda inválido hasta que lo edites.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Comentario importado</span>
        <Textarea showCount maxLength={20} defaultValue="Texto de un comentario importado" />
      </label>
    </Example>
    <Example title="Validación nativa" description={<>Prueba a enviar el formulario vacío o con menos de cinco caracteres para comprobar <code>required</code> y <code>minLength</code>.</>}>
      <NativeValidationExample />
    </Example>
    <Example title="Error comunicado" description={<>Relaciona el mensaje de error mediante <code>aria-describedby</code> y marca el campo con <code>aria-invalid</code>.</>}><div className="mx-auto max-w-md space-y-2"><label htmlFor="invalid-message" className="body-sm block">Comentario</label><Textarea id="invalid-message" aria-invalid="true" aria-describedby="message-error" defaultValue="Hola" /><p id="message-error" className="body-sm text-error-bold">Escribe al menos cinco caracteres.</p></div></Example>
    <Example title="Solo lectura" description={<>Con <code>readOnly</code> el contenido permanece seleccionable.</>}><label className="mx-auto block max-w-md space-y-2"><span className="body-sm block">Mensaje guardado</span><Textarea readOnly defaultValue="Este texto está disponible para consulta." /></label></Example>
    <Example title="Campo deshabilitado" description={<>Con <code>disabled</code> el campo queda fuera de la interacción y del envío.</>}><label className="mx-auto block max-w-md space-y-2"><span className="body-sm block">Comentario deshabilitado</span><Textarea disabled defaultValue="Edición no disponible." /></label></Example>
  </SimpleShowcase>;
}
