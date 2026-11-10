import { ShowcaseAnatomyContent, ShowcaseApiTable } from "@/components/shared/showcase-reference";
import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
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
    <ShowcaseAnatomy>
      <ShowcaseAnatomyContent name="Slider" code={anatomy} parts={parts} />
    </ShowcaseAnatomy>
  );
}

export function ApiReference() {
  return (
    <ShowcaseApiReference>
      <ShowcaseApiTable
        name="Slider"
        groups={groups.map(({ piece, rows }) => ({
          piece: piece,
          rows: rows.map(([name, type, defaultValue, description]) => ({ prop: name, type, defaultValue, description })),
        }))}
      />
      <ul className="body-sm list-disc space-y-2 ps-5 text-content-base">
        <li><code>Value</code> es <code>number</code> o un arreglo de números según el modo. Los callbacks indican el motivo en <code>details.reason</code> y el cambio incluye <code>activeThumbIndex</code>.</li>
        <li>Las flechas ajustan el valor. <kbd>Home</kbd> y <kbd>End</kbd> van a los límites disponibles sin invadir el espacio de un control vecino.</li>
        <li>Usa un nombre accesible distinto para cada control de rango. Los inputs deshabilitados se omiten al enviar el formulario.</li>
        <li><code>edge-client-only</code> espera a la hidratación para posicionar los controles. <code>edge</code> puede prepararlos antes de hidratar.</li>
      </ul>
    </ShowcaseApiReference>
  );
}
