import { Textarea } from "@/components/own/simple/textarea";
import { Example, SimpleShowcase } from "../simple-showcase";
import { ControlledTextarea } from "./examples";

export default function Page() {
  return <SimpleShowcase name="Textarea" description="Campo de texto multilínea con estados y validación nativos."
    anatomy={`<label htmlFor="message">Mensaje</label>
<Textarea id="message" name="message" rows={3} />`}
    parts={[["Textarea", "Control textarea nativo redimensionable verticalmente."]]}
    api={[
      ["Textarea", "rows", "number", "3; 2 con autoGrow", "Sí", "Número inicial de filas visibles y mínimo con crecimiento automático."],
      ["Textarea", "showCount", "boolean", "false", "Sí", "Muestra el contador abajo a la derecha e incluye el límite cuando se define maxLength."],
      ["Textarea", "resize", '"vertical" | "none"', '"vertical"', "Sí", "Permite o bloquea el redimensionamiento manual."],
      ["Textarea", "autoGrow", "boolean", "false", "Sí", "Ajusta la altura al contenido y desactiva el tirador manual."],
      ["Textarea", "value / onChange", "string / ChangeEventHandler", "—", "Sí", "Permite controlar el valor desde el consumidor."],
      ["Textarea", "defaultValue", "string", "—", "Sí", "Valor inicial para uso no controlado."],
      ["Textarea", "required, minLength, maxLength", "boolean, number, number", "—", "Sí", "Restricciones nativas de formulario."],
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
    <Example title="Tamaño fijo" description={<>Bloquea el tirador con <code>resize=&quot;none&quot;</code> y fija la altura inicial con <code>rows</code>.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Nota de dos líneas</span>
        <Textarea resize="none" rows={2} />
      </label>
    </Example>
    <Example title="Crecimiento automático" description={<>Con <code>autoGrow</code>, el campo empieza en dos líneas y se ajusta conforme escribes o borras.</>}>
      <label className="mx-auto block max-w-md space-y-2">
        <span className="body-sm block">Descripción</span>
        <Textarea autoGrow showCount />
      </label>
    </Example>
    <Example title="Validación nativa" description={<>El campo requerido se valida al intentar enviar el formulario.</>}><form className="mx-auto max-w-md space-y-3"><label className="block space-y-2"><span className="body-sm block">Comentario obligatorio</span><Textarea name="comment" required minLength={5} /></label><button type="submit" className="rounded-base border border-gray-base bg-surface-bold px-3 py-2">Enviar</button></form></Example>
    <Example title="Error comunicado" description={<>Relaciona el mensaje de error mediante <code>aria-describedby</code> y marca el campo con <code>aria-invalid</code>.</>}><div className="mx-auto max-w-md space-y-2"><label htmlFor="invalid-message" className="body-sm block">Comentario</label><Textarea id="invalid-message" aria-invalid="true" aria-describedby="message-error" defaultValue="Hola" /><p id="message-error" className="body-sm text-error-bold">Escribe al menos cinco caracteres.</p></div></Example>
    <Example title="Solo lectura" description={<>Con <code>readOnly</code> el contenido permanece seleccionable.</>}><label className="mx-auto block max-w-md space-y-2"><span className="body-sm block">Mensaje guardado</span><Textarea readOnly defaultValue="Este texto está disponible para consulta." /></label></Example>
    <Example title="Campo deshabilitado" description={<>Con <code>disabled</code> el campo queda fuera de la interacción y del envío.</>}><label className="mx-auto block max-w-md space-y-2"><span className="body-sm block">Comentario deshabilitado</span><Textarea disabled defaultValue="Edición no disponible." /></label></Example>
  </SimpleShowcase>;
}
