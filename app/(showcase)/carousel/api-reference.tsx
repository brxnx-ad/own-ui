import { ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
import { ShowcaseAnatomyContent, ShowcaseApiTable, type ShowcaseApiGroup } from "@/components/shared/showcase-reference";

const anatomy = `<Carousel aria-label="Destinos">
  <CarouselContent>
    <CarouselItem aria-label="Cordillera">Cordillera</CarouselItem>
    <CarouselItem aria-label="Costa">Costa</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-center gap-2">
    <CarouselPrevious />
    <CarouselPagination />
    <CarouselNext />
  </div>
</Carousel>`;

const parts = [
  ["Carousel", "Región o grupo con nombre accesible que inicializa Embla y sincroniza el estado de la navegación."],
  ["CarouselContent", "Viewport recortado y pista flexible donde Embla mide y desplaza las diapositivas."],
  ["CarouselItem", "Diapositiva identificada por su propio nombre accesible."],
  ["CarouselPrevious / CarouselNext", "Botones para avanzar o retroceder una posición. Colócalos fuera del viewport."],
  ["CarouselPagination", "Grupo opcional con un botón por posición calculada por Embla."],
];

const groups: ShowcaseApiGroup[] = [
  { piece: "Carousel", rows: [
    { prop: "aria-label / aria-labelledby", type: "string", defaultValue: "—", optional: "Uno", description: "Proporciona el nombre accesible de la colección." },
    { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Configura el eje de Embla, la pista y las teclas." },
    { prop: "dir", type: '"ltr" | "rtl"', defaultValue: '"ltr"', description: "Define el sentido del contenido y de las flechas horizontales." },
    { prop: "role", type: '"region" | "group"', defaultValue: '"region"', description: "Elige si la colección aparece como región de la página." },
    { prop: "options", type: "CarouselOptions", defaultValue: "Opciones de Embla", description: "Configura el motor con las opciones detalladas en la tabla." },
    { prop: "tabIndex / onKeyDown", type: "number / KeyboardEventHandler", defaultValue: "0 / —", description: "La raíz recibe las flechas al tener el foco. preventDefault() en el handler cancela el movimiento." },
    { prop: "onApiChange", type: "(api: CarouselApi | undefined) => void", defaultValue: "—", description: "Entrega la instancia de Embla al inicializar y undefined al liberar la referencia." },
    { prop: "formatStatus", type: "(position: number, total: number) => string", defaultValue: "Posición X de Y", description: "Personaliza el anuncio de posición. El índice empieza en 1." },
  ] },
  { piece: "CarouselOptions", rows: [
    { prop: "align / containScroll", type: 'CarouselOptions["align"] / CarouselOptions["containScroll"]', defaultValue: '"center" / "trimSnaps"', description: "Configuran alineación y recorte de posiciones en los extremos." },
    { prop: "loop / startIndex", type: "boolean / number", defaultValue: "false / 0", description: "Habilita el bucle si hay suficiente contenido y configura el índice inicial desde 0." },
    { prop: "slidesToScroll", type: 'number | "auto"', defaultValue: "1", description: "Agrupa varias diapositivas en una posición." },
    { prop: "dragFree / skipSnaps", type: "boolean / boolean", defaultValue: "false / false", description: "Permiten desplazamiento libre o saltar posiciones en un arrastre fuerte." },
    { prop: "duration / watchDrag", type: 'number / CarouselOptions["watchDrag"]', defaultValue: "25 / true", description: "Ajusta el desplazamiento programático y el arrastre. La duración baja a 0 con movimiento reducido." },
  ] },
  { piece: "CarouselContent", rows: [
    { prop: "viewportClassName", type: "string", defaultValue: "—", description: "Añade clases al viewport. En vertical, permite ajustar la altura predeterminada de 16rem." },
    { prop: "className / style / ref", type: "Props de div", defaultValue: "—", description: "Personalizan el nodo interior que contiene las diapositivas." },
  ] },
  { piece: "CarouselItem", rows: [
    { prop: "aria-label / aria-labelledby", type: "string", defaultValue: "—", optional: "Uno", description: "Nombra la diapositiva." },
    { prop: "className / style / ref", type: "Props de div", defaultValue: "—", description: "Ajustan la diapositiva. Su flex-basis inicial ocupa toda la ventana." },
  ] },
  { piece: "CarouselPrevious / CarouselNext", rows: [
    { prop: "variant / size / icon", type: "ButtonVariant / ButtonSize / ReactNode", defaultValue: '"outline" / "sm" / Chevron', description: "Personalizan el Button. La flecha predeterminada se orienta según el eje y el sentido." },
    { prop: "aria-label / disabled", type: "string / boolean", defaultValue: "Posición anterior o siguiente / false", description: "Personaliza el nombre y añade un bloqueo explícito al límite que calcula Embla." },
    { prop: "onClick", type: 'ButtonProps["onClick"]', defaultValue: "—", description: "Se ejecuta antes de navegar. preventDefault() cancela el desplazamiento." },
  ] },
  { piece: "CarouselPagination", rows: [
    { prop: "getLabel", type: "(position: number, total: number) => string", defaultValue: "Ir a la posición X de Y", description: "Nombra cada botón. El índice empieza en 1." },
    { prop: "aria-label / className", type: "string / string", defaultValue: "Posiciones / —", description: "Personalizan el nombre y las clases del grupo." },
  ] },
];

export function CarouselReference() {
  return (
    <>
      <ShowcaseAnatomy>
        <ShowcaseAnatomyContent name="Carousel" code={anatomy} parts={parts} />
      </ShowcaseAnatomy>
      <ShowcaseApiReference>
        <ShowcaseApiTable name="Carousel" groups={groups} />
        <p className="body-sm text-gray-bold/75">La paginación se oculta si hay menos de dos posiciones. Los botones de navegación conservan el foco al llegar a un extremo.</p>
      </ShowcaseApiReference>
    </>
  );
}
