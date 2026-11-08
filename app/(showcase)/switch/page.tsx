import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Switch, SwitchThumb } from "@/components/own/base/switch";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, FormExample, RequiredExample } from "./examples";


const settingRow = "body-sm flex items-center justify-between gap-4 font-medium";

export default function SwitchShowcasePage() {
  return (
    <ShowcasePage title="Switch" implementation="@base-ui/react/switch" description="Activa o desactiva una preferencia con el puntero o el teclado.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Activación con etiqueta" description={<>Pulsa la etiqueta o usa <kbd>Espacio</kbd> sobre el interruptor, que empieza encendido con <code>defaultChecked</code>.</>}>
          <label className={`${settingRow} cursor-pointer`}>
            Notificaciones
            <Switch defaultChecked><SwitchThumb /></Switch>
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Preferencia controlada" description={<>Sincroniza <code>checked</code> y <code>onCheckedChange</code> para mostrar u ocultar los detalles del archivo.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Solo lectura" description={<>Usa <code>readOnly</code> para que el interruptor siga siendo enfocable sin que se pueda cambiar.</>}>
          <label className={settingRow}>
            Copia de seguridad diaria
            <Switch defaultChecked readOnly><SwitchThumb /></Switch>
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Interruptor deshabilitado" description={<>Aplica <code>disabled</code> para omitir el interruptor de la navegación por tabulación.</>}>
          <label className={settingRow}>
            Sincronización automática
            <Switch disabled><SwitchThumb /></Switch>
          </label>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Validación con Field" description={<>Intenta guardar con el interruptor apagado para ver el error de <code>required</code> que muestra <code>FieldError</code>.</>}>
          <RequiredExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Envío en ambos estados" description={<>Usa <code>value</code> y <code>uncheckedValue</code> para guardar un valor distinto al encender o apagar el interruptor.</>}>
          <FormExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-xs" title="Botón nativo con etiqueta separada" description={<>Combina <code>nativeButton</code> y <code>{'render={<button />}'}</code> para asociar una etiqueta hermana mediante <code>htmlFor</code>.</>}>
          <div className={settingRow}>
            <label className="cursor-pointer" htmlFor="switch-sounds">Sonidos de la interfaz</label>
            <Switch id="switch-sounds" nativeButton render={<button type="button" />}><SwitchThumb /></Switch>
          </div>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
