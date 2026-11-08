import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import { CityExample, ControlledExample, GroupedExample, LimitedResultsExample } from "./examples";


export default function AutocompleteShowcasePage() {
  return (
    <ShowcasePage title="Autocomplete" implementation="@base-ui/react/autocomplete" description="Campo de texto libre con sugerencias que se actualizan al escribir.">
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Sugerencias al escribir" description={<>Filtra las ciudades de <code>items</code> mientras escribes y conserva cualquier texto personalizado.</>}>
          <CityExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Sugerencia en línea" description={<>Previsualiza la opción resaltada dentro del campo al navegar con las flechas con <code>{'mode="both"'}</code>.</>}>
          <CityExample mode="both" />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Sugerencias agrupadas" description={<>Organiza los destinos de <code>items</code> en secciones con <code>AutocompleteGroup</code>.</>}>
          <GroupedExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Valor controlado" description={<>Sincroniza el campo con <code>value</code> y <code>onValueChange</code> para restablecerlo desde un botón externo.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="mx-auto w-full max-w-sm" title="Límite de sugerencias" description={<>Busca «1000» en un catálogo de 1.000 productos que muestra hasta 20 coincidencias con <code>{"limit={20}"}</code>.</>}>
          <LimitedResultsExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
