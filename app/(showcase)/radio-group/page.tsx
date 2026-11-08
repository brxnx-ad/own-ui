import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Radio, RadioGroup, RadioIndicator } from "@/components/own/base/radio-group";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, RadioOption } from "./examples";


export default function RadioGroupShowcasePage() {
  return (
    <ShowcasePage title="Radio Group" implementation="@base-ui/react/radio-group" description="Selección de una opción entre varias alternativas, con navegación por teclado y envío de formulario.">
        <ShowcaseExample contentClassName="flex justify-center" title="Selección exclusiva" description={<>Parte de <code>defaultValue</code> y elige otra opción con el puntero o las flechas para cambiar la selección.</>}>
          <RadioGroup aria-labelledby="radio-channel-label" defaultValue="correo">
            <p id="radio-channel-label" className="body-sm font-semibold">Canal de notificación</p>
            <RadioOption value="correo" label="Correo electrónico" />
            <RadioOption value="sms" label="SMS" />
            <RadioOption value="app" label="Notificación en la app" />
          </RadioGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Opción deshabilitada" description={<>Aplica <code>disabled</code> a una opción agotada y usa las flechas para recorrer las alternativas disponibles.</>}>
          <RadioGroup aria-labelledby="radio-shift-label" defaultValue="manana">
            <p id="radio-shift-label" className="body-sm font-semibold">Turno de retiro</p>
            <RadioOption value="manana" label="Mañana" />
            <RadioOption value="tarde" label="Tarde · Sin cupos" disabled />
            <RadioOption value="noche" label="Noche" />
          </RadioGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Grupo deshabilitado" description={<>Aplica <code>disabled</code> a la raíz para deshabilitar todas sus opciones.</>}>
          <RadioGroup aria-labelledby="radio-export-label" defaultValue="pdf" disabled>
            <p id="radio-export-label" className="body-sm font-semibold">Formato de exportación</p>
            <RadioOption value="pdf" label="PDF" />
            <RadioOption value="csv" label="CSV" />
          </RadioGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Solo lectura" description={<>Con <code>readOnly</code> puedes recorrer las opciones con las flechas y consultar la selección guardada.</>}>
          <RadioGroup aria-labelledby="radio-frequency-label" defaultValue="semanal" readOnly>
            <p id="radio-frequency-label" className="body-sm font-semibold">Frecuencia del informe</p>
            <RadioOption value="diaria" label="Diaria" />
            <RadioOption value="semanal" label="Semanal" />
          </RadioGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Valor controlado" description={<>Comparte <code>value</code> y <code>onValueChange</code> para actualizar la selección numérica desde el grupo o desde el botón externo.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Validación y envío" description={<>Usa <code>required</code> con <code>Field</code> para exigir una selección y lee el valor enviado mediante <code>FormData.get()</code>.</>}>
          <FormExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Botón nativo" description={<>Usa <code>nativeButton</code> y <code>render</code> para vincular un botón a una etiqueta hermana mediante <code>htmlFor</code>.</>}>
          <RadioGroup aria-labelledby="radio-priority-label" defaultValue="normal">
            <p id="radio-priority-label" className="body-sm font-semibold">Prioridad de atención</p>
            <div className="flex min-h-8 items-center gap-2.5">
              <Radio id="radio-priority-normal" value="normal" nativeButton render={<button type="button" />}>
                <RadioIndicator />
              </Radio>
              <label htmlFor="radio-priority-normal" className="body-sm cursor-pointer">Normal</label>
            </div>
            <div className="flex min-h-8 items-center gap-2.5">
              <Radio id="radio-priority-alta" value="alta" nativeButton render={<button type="button" />}>
                <RadioIndicator />
              </Radio>
              <label htmlFor="radio-priority-alta" className="body-sm cursor-pointer">Alta</label>
            </div>
          </RadioGroup>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
