import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Checkbox, CheckboxIndicator } from "@/components/own/base/checkbox";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, IndeterminateExample } from "./examples";


export default function CheckboxShowcasePage() {
  return (
    <ShowcasePage title="Checkbox" implementation="@base-ui/react/checkbox" description="Casilla para seleccionar una opción y representar selecciones parciales.">
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Selección individual"
          description={<>Empieza con la casilla marcada mediante <code>defaultChecked</code> y cámbiala con la etiqueta o la tecla Espacio.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked><CheckboxIndicator /></Checkbox>
            Enviarme un resumen semanal
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Estado controlado"
          description={<>Sincroniza la casilla y el botón con <code>checked</code> y <code>onCheckedChange</code>.</>}
        >
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Selección parcial"
          description={<>Representa una selección parcial con <code>indeterminate</code> y resuélvela al activar la casilla.</>}
        >
          <IndeterminateExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Deshabilitación"
          description={<>Usa <code>disabled</code> para bloquear el control y omitirlo del recorrido con Tab.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked disabled><CheckboxIndicator /></Checkbox>
            Exportación incluida en el plan
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Solo lectura"
          description={<>Con <code>readOnly</code>, la casilla admite foco y conserva su valor al intentar cambiarla.</>}
        >
          <label className="flex items-center gap-2.5 body-sm">
            <Checkbox defaultChecked readOnly><CheckboxIndicator /></Checkbox>
            Preferencia administrada por el equipo
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Envío de formulario"
          description={<>Exige una confirmación con <code>required</code> y envía la preferencia opcional mediante <code>value</code> o <code>uncheckedValue</code>.</>}
        >
          <FormExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Etiqueta separada"
          description={<>Vincula <code>htmlFor</code> con <code>id</code> al renderizar la raíz como botón mediante <code>nativeButton</code> y <code>render</code>.</>}
        >
          <div className="flex items-center gap-2.5 body-sm">
            <Checkbox id="checkbox-archive" nativeButton render={<button type="button" />}>
              <CheckboxIndicator />
            </Checkbox>
            <label htmlFor="checkbox-archive">Incluir elementos archivados</label>
          </div>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
