const anatomy = `<NumberField id="quantity" name="quantity" defaultValue={3} min={1} max={8}>
  <NumberFieldScrubArea>
    <label htmlFor="quantity">Unidades del pedido</label>
    <NumberFieldScrubAreaCursor>
      <span>↔</span>
    </NumberFieldScrubAreaCursor>
  </NumberFieldScrubArea>
  <NumberFieldGroup>
    <NumberFieldDecrement aria-label="Disminuir cantidad" />
    <NumberFieldInput aria-roledescription="Campo numérico" />
    <NumberFieldIncrement aria-label="Aumentar cantidad" />
  </NumberFieldGroup>
</NumberField>`;

const anatomyRows = [
  ["NumberField", "Coordina el valor, el texto visible, los límites y el control de formulario."],
  ["NumberFieldGroup", "Agrupa visualmente la entrada y los botones. Aloja el borde y el anillo de foco."],
  ["NumberFieldInput", "Edita el texto localizado y permite ajustar el valor con el teclado."],
  ["NumberFieldDecrement", "Resta un paso y muestra un icono menos por defecto."],
  ["NumberFieldIncrement", "Suma un paso y muestra un icono más por defecto."],
  ["NumberFieldScrubArea", "Área opcional de ajuste por arrastre. Puede contener la etiqueta del campo."],
  ["NumberFieldScrubAreaCursor", "Cursor decorativo opcional para el arrastre con puntero bloqueado. El consumidor aporta su contenido."],
];

const groups = [
  {
    piece: "NumberField",
    rows: [
      ["value / defaultValue", "number | null / number", "— / vacío", "Valor controlado o inicial. Usa null para controlar un campo vacío."],
      ["onValueChange", "(value: number | null, details: NumberFieldChangeEventDetails) => void", "—", "Recibe cambios numéricos y permite cancelar la actualización con details.cancel()."],
      ["onValueCommitted", "(value: number | null, details: NumberFieldCommitEventDetails) => void", "—", "Recibe el valor confirmado al perder el foco tras editar, al soltar el puntero o durante el ajuste por teclado o rueda."],
      ["min / max", "number", "Sin límite explícito", "Acotan el ajuste. Los botones quedan indisponibles al llegar a su extremo."],
      ["step", 'number | "any"', "1", "Paso base. Usa min explícito para validar la alineación en el formulario o any para omitir esa validación y ajustar de uno en uno."],
      ["smallStep / largeStep", "number", "0.1 / 10", "Pasos alternativos con Alt y Mayús, respectivamente."],
      ["snapOnStep", "boolean", "false", "Alinea los incrementos o decrementos a la rejilla del paso efectivo."],
      ["allowOutOfRange", "boolean", "false", "Permite escribir fuera del rango para que el formulario pueda validar el valor. Los ajustes por pasos siguen acotados."],
      ["allowWheelScrub", "boolean", "false", "Habilita el ajuste con rueda cuando la entrada tiene foco y el puntero está encima."],
      ["locale / format", "Intl.LocalesArgument / Intl.NumberFormatOptions", "Locale del entorno / —", "Definen la interpretación y presentación del texto numérico. El valor permanece numérico."],
      ["required / disabled / readOnly", "boolean", "false", "Exige un valor, deshabilita el control o protege el valor de la edición."],
      ["id / name / form", "string", "ID generado / — / —", "id identifica la entrada visible. name nombra el valor de formulario y form identifica un formulario externo."],
      ["inputRef", "React.Ref<HTMLInputElement>", "—", "Da acceso al control numérico oculto. Usa ref en NumberFieldInput para la entrada visible."],
    ],
  },
  {
    piece: "NumberFieldInput",
    rows: [
      ["placeholder / inputMode", "Atributos de input", "— / según formato y plataforma", "Configuran una pista visible y el teclado sugerido. El texto y los eventos de edición los gestiona Number Field."],
      ["aria-roledescription", "string", '"Number field"', "Describe el tipo de control en el idioma de la interfaz. El nombre accesible se aporta por separado."],
    ],
  },
  {
    piece: "NumberFieldDecrement / NumberFieldIncrement",
    rows: [
      ["children", "ReactNode", "Minus / Plus", "Sustituye el icono de soporte. Conserva un nombre accesible si usas solo un icono."],
      ["aria-label", "string", '"Decrease" / "Increase"', "Permite localizar el nombre o precisar qué cantidad cambia."],
      ["disabled / nativeButton", "boolean", "false / true", "Deshabilita un botón individual o indica si el nodo de render es un botón nativo."],
    ],
  },
  {
    piece: "NumberFieldScrubArea",
    rows: [
      ["direction", '"horizontal" | "vertical"', '"horizontal"', "Eje de movimiento que modifica el valor."],
      ["pixelSensitivity", "number", "2", "Desplazamiento en píxeles necesario para aplicar un paso de arrastre."],
      ["teleportDistance", "number", "—", "Distancia opcional desde el centro antes de que el cursor vuelva por el otro extremo."],
    ],
  },
  {
    piece: "Todas",
    rows: [
      ["className / style", "string / CSSProperties, o funciones del estado", "—", "Añade clases o estilos al nodo de cada pieza."],
      ["render / ref / atributos HTML", "Según la pieza", "Elemento de la anatomía / — / —", "Sustituye o accede al nodo y permite extenderlo conservando su semántica, eventos y refs."],
    ],
  },
];

export function Anatomy() {
  return (
    <section aria-labelledby="anatomy-heading" className="space-y-4">
      <h2 id="anatomy-heading" className="h3">Anatomía</h2>
      <pre aria-label="Composición de Number Field en JSX" className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm">
        <code>{anatomy}</code>
      </pre>
      <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base">
        <table className="body-sm w-full text-left">
          <caption className="sr-only">Piezas de Number Field y sus responsabilidades</caption>
          <thead className="bg-surface-bold">
            <tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr>
          </thead>
          <tbody>
            {anatomyRows.map(([piece, description]) => (
              <tr key={piece} className="border-t border-gray-base align-top">
                <th scope="row" className="break-all p-4 font-mono text-xs sm:break-normal">{piece}</th>
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
      <div role="region" aria-label="Tabla de referencia de API de Number Field" tabIndex={0} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-primary-base">
        <table className="body-sm w-full min-w-3xl text-left">
          <caption className="sr-only">Opciones de Number Field por pieza</caption>
          <thead className="bg-surface-bold">
            <tr>
              {["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((label) => (
                <th key={label} scope="col" className="p-4">{label}</th>
              ))}
            </tr>
          </thead>
          {groups.map(({ piece, rows }) => (
            <tbody key={piece}>
              {rows.map(([prop, type, defaultValue, description], index) => (
                <tr key={prop} className="border-t border-gray-base align-top">
                  {index === 0 && <th scope="rowgroup" rowSpan={rows.length} className="p-4 font-medium">{piece}</th>}
                  <th scope="row" className="p-4 font-mono text-xs">{prop}</th>
                  <td className="min-w-40 p-4 font-mono text-xs">{type}</td>
                  <td className="p-4">{defaultValue}</td>
                  <td className="p-4">Sí</td>
                  <td className="min-w-64 p-4">{description}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <ul className="body-sm space-y-2 text-gray-bold/75">
        <li><code>details.reason</code> distingue escritura, borrado, pegado, desenfoque, teclado, botones, rueda, arrastre y cambios sin motivo específico. El evento de confirmación carece de cancelación.</li>
        <li>Las flechas ajustan el valor desde la entrada. Home y End permiten ir al límite correspondiente cuando está definido. Los botones quedan fuera del orden de Tab.</li>
        <li>El cursor personalizado depende de Pointer Lock y se omite en WebKit, con entrada táctil o si se deniega el bloqueo. Los botones solo transicionan con movimiento permitido.</li>
      </ul>
    </section>
  );
}
