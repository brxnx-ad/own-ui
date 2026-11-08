import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
const anatomy = `<Form onFormSubmit={saveContact}>
  <Fieldset>
    <FieldsetLegend>Contacto del turno</FieldsetLegend>
    <Field name="email">
      <FieldLabel>Correo del contacto</FieldLabel>
      <FieldControl type="email" required />
      <FieldError />
    </Field>
  </Fieldset>
  <Button type="submit">Guardar contacto</Button>
</Form>`;

const parts = [
  ["Form", "Genera un form nativo y coordina la validación y el envío."],
  ["Field y sus piezas", "Registran un valor y vinculan su etiqueta y mensajes al control."],
  ["Fieldset y su leyenda", "Agrupan controles relacionados bajo un nombre común cuando la composición lo requiere."],
  ["Botón de envío", "Solicita el envío con type=submit."],
];

const rows = [
  ["validationMode", "'onSubmit' | 'onBlur' | 'onChange'", "'onSubmit'", "Modo predeterminado de los campos. La prop del Field prevalece."],
  ["errors", "Record<string, string | string[]>", "—", "Asocia mensajes externos con el name de cada Field."],
  ["onFormSubmit", "(values: Values, details: FormSubmitEventDetails) => void", "—", "Recibe los valores registrados y cancela el envío nativo."],
  ["onSubmit", "(event: FormEvent<HTMLFormElement>) => void", "—", "Recibe el evento React tras validar los campos. Permite leer FormData o dejar que el navegador complete el envío."],
  ["action", "string | (data: FormData) => void | Promise<void>", "—", "Destino nativo o acción de React. Para ejecutarla, deja que el evento de envío siga su curso."],
  ["actionsRef", "RefObject<FormActions | null>", "—", "Expone validate(name?) para validar un campo por nombre o todos los registrados."],
  ["noValidate", "boolean", "true", "Base UI gestiona la validación registrada. Usa false si también quieres habilitar la validación nativa previa al evento submit."],
  ["className", "string | (state) => string | undefined", "—", "Añade clases a la raíz."],
  ["style", "CSSProperties | (state) => CSSProperties | undefined", "—", "Aplica estilos a la raíz."],
  ["render", "ReactElement | (props, state) => ReactElement", "form", "Permite componer la raíz conservando el nodo form, sus props, eventos y ref."],
  ["children, ref y atributos HTML", "Props de form", "Según HTML", "Contenido, referencia al nodo y opciones nativas como method y encType."],
];

export function Anatomy() {
  return (
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Form" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Form"
        groups={[{
          piece: "Form",
          rows: rows.map(([prop, type, defaultValue, description]) => ({ prop, type, defaultValue, description })),
        }]}
      />
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li>Al enviar, Base UI valida los campos registrados y enfoca el primer control inválido disponible. Una validación asíncrona pendiente por sí sola no bloquea el envío.</li>
        <li><code>FormSubmitEventDetails</code> incluye el evento nativo y el motivo <code>none</code>. El tipo <code>Values</code> describe el objeto recibido por TypeScript.</li>
        <li>Para consultar controles nativos, archivos o nombres repetidos, usa <code>FormData</code> en el evento o en la acción.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
