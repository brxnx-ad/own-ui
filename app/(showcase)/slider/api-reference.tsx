const anatomy = `<Slider defaultValue={60}>
  <SliderLabel>Volumen</SliderLabel>
  <SliderValue />
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
      <SliderThumb />
    </SliderTrack>
  </SliderControl>
</Slider>`;

const parts = [
  ["Slider", "Mantiene el valor, los límites y el estado compartido."],
  ["SliderLabel", "Asocia una etiqueta visible a los controles del slider."],
  ["SliderValue", "Muestra el valor actual o el intervalo formateado."],
  ["SliderControl", "Recibe las pulsaciones y los gestos de arrastre."],
  ["SliderTrack", "Representa el recorrido completo y contiene las piezas que se posicionan en él."],
  ["SliderIndicator", "Rellena desde el mínimo hasta el valor o entre los extremos del intervalo."],
  ["SliderThumb", "Representa un valor ajustable y contiene el input de rango que recibe el foco."],
];

const groups = [
  {
    piece: "Slider",
    rows: [
      ["value", "number | readonly number[]", "—", "Controla el valor desde el consumidor. Pasa un valor por cada Thumb."],
      ["defaultValue", "number | readonly number[]", "min", "Valor inicial sin control externo."],
      ["min / max", "number", "0 / 100", "Delimitan el recorrido. El máximo debe ser mayor que el mínimo."],
      ["step / largeStep", "number", "1 / 10", "Paso desde el mínimo y salto para Page Up, Page Down o Shift con las flechas."],
      ["minStepsBetweenValues", "number", "0", "Distancia mínima en pasos entre controles adyacentes."],
      ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Define el eje visual y accesible."],
      ["thumbAlignment", '"center" | "edge" | "edge-client-only"', '"center"', "Alinea el centro o el borde del control con el extremo de la pista."],
      ["thumbCollisionBehavior", '"push" | "swap" | "none"', '"push"', "Al arrastrar, empuja al vecino, transfiere el arrastre al vecino o detiene el control activo."],
      ["disabled", "boolean", "false", "Deshabilita todos los controles. También se hereda de Field."],
      ["name / form", "string", "—", "Nombre de los inputs al enviar y el id del formulario si está fuera de él."],
      ["format / locale", "Intl.NumberFormatOptions / Intl.LocalesArgument", "— / entorno", "Configura el valor visible y el texto accesible que genera Base UI."],
      ["onValueChange", "(value: Value, details: SliderChangeEventDetails) => void", "—", "Se ejecuta al cambiar el valor. details.cancel() cancela el cambio."],
      ["onValueCommitted", "(value: Value, details: SliderCommitEventDetails) => void", "—", "Se ejecuta al confirmar un cambio efectivo, por ejemplo al soltar el puntero."],
    ],
  },
  {
    piece: "SliderValue",
    rows: [
      ["children", "null | ((formattedValues: readonly string[], values: readonly number[]) => ReactNode)", "Valores unidos por « – »", "Personaliza el contenido del output."],
      ["aria-live", '"off" | "polite" | "assertive"', '"off"', "Controla los anuncios del output al cambiar el valor."],
    ],
  },
  {
    piece: "SliderThumb",
    rows: [
      ["index", "number", "Derivado", "Indica la posición del valor en el arreglo. Es necesario para renderizar varios controles desde el servidor."],
      ["disabled", "boolean", "false", "Deshabilita este control sin deshabilitar toda la raíz."],
      ["getAriaLabel", "null | ((index: number) => string)", "—", "Personaliza el nombre del input. También se puede usar aria-label."],
      ["getAriaValueText", "null | ((formatted: string, value: number, index: number) => string)", "Formato de la raíz", "Personaliza el texto accesible y tiene prioridad sobre aria-valuetext."],
      ["inputRef", "React.Ref<HTMLInputElement>", "—", "Da acceso al input de rango interno."],
      ["tabIndex / onFocus / onBlur / onKeyDown", "Atributo y handlers del input", "—", "Se aplican al input y se componen con el comportamiento de Base UI."],
    ],
  },
  {
    piece: "Todas las piezas",
    rows: [
      ["className / style", "Valor estático o función de SliderState", "—", "Añade clases o estilos inline al nodo de la pieza."],
      ["render", "ReactElement | ((props, state: SliderState) => ReactElement)", "Elemento de la pieza", "Sustituye el nodo. Conserva las props, los eventos y el ref."],
      ["ref", "React.Ref<HTMLDivElement | HTMLOutputElement>", "—", "Apunta al nodo de la pieza. Value expone el output y Thumb expone su div."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Slider en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Slider y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {parts.map(([name, description]) => (
              <tr key={name} className="border-t border-gray-base">
                <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                <td className="p-4">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ApiReference() {
  return (
    <section aria-labelledby="api-heading" className="space-y-4">
      <h2 id="api-heading" className="h3">Referencia de API</h2>
      <div role="region" aria-label="Tabla de referencia de API" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Props, tipos y valores predeterminados de Slider</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([name, type, defaultValue, description], index) => (
                <tr key={name} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{name}</th>
                  <td className="min-w-36 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-60 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm list-disc space-y-2 ps-5 text-gray-bold/75">
        <li><code>Value</code> es <code>number</code> o un arreglo de números según el modo. Los callbacks indican el motivo en <code>details.reason</code> y el cambio incluye <code>activeThumbIndex</code>.</li>
        <li>Las flechas ajustan el valor. <kbd>Home</kbd> y <kbd>End</kbd> van a los límites disponibles sin invadir el espacio de un control vecino.</li>
        <li>Usa un nombre accesible distinto para cada control de rango. Los inputs deshabilitados se omiten al enviar el formulario.</li>
        <li><code>edge-client-only</code> espera a la hidratación para posicionar los controles. <code>edge</code> puede prepararlos antes de hidratar.</li>
      </ul>
    </section>
  );
}
