import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/own/base/toggle";
import { ToggleGroup } from "@/components/own/base/toggle-group";
import { Anatomy, ApiReference } from "./api-reference";
import { ControlledExample, RequiredSelectionExample } from "./examples";


export default function ToggleGroupShowcasePage() {
  return (
    <ShowcasePage title="Toggle Group" implementation="@base-ui/react/toggle-group" description="Coordina la selección y el foco entre botones de dos estados.">
        <ShowcaseExample contentClassName="flex justify-center" title="Selección única" description={<>Usa <code>defaultValue</code> para seleccionar una vista inicial y vuelve a pulsar la vista activa para limpiar la selección.</>}>
          <ToggleGroup aria-label="Vista de archivos" defaultValue={["list"]}>
            <Toggle size="sm" value="list">Lista</Toggle>
            <Toggle size="sm" value="cards">Tarjetas</Toggle>
            <Toggle size="sm" value="table">Tabla</Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Selección múltiple" description={<>Activa <code>multiple</code> para aplicar varios formatos a la vez.</>}>
          <ToggleGroup aria-label="Formato de texto" multiple defaultValue={["bold", "italic"]}>
            <Toggle value="bold" variant="ghost" iconOnly aria-label="Negrita"><Bold aria-hidden /></Toggle>
            <Toggle value="italic" variant="ghost" iconOnly aria-label="Cursiva"><Italic aria-hidden /></Toggle>
            <Toggle value="underline" variant="ghost" iconOnly aria-label="Subrayado"><Underline aria-hidden /></Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Selección controlada" description={<>Sincroniza <code>value</code> y <code>onValueChange</code> con los filtros de la lista y usa el botón externo para limpiarlos.</>}>
          <ControlledExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Orientación vertical" description={<>Configura <code>{'orientation="vertical"'}</code> para apilar las opciones y recorrerlas con las flechas arriba y abajo.</>}>
          <ToggleGroup aria-label="Escala de vista previa" orientation="vertical" defaultValue={["normal"]}>
            <Toggle size="sm" value="compact">Compacta</Toggle>
            <Toggle size="sm" value="normal">Normal</Toggle>
            <Toggle size="sm" value="wide">Amplia</Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Recorrido sin vuelta" description={<>Con <code>{'loopFocus={false}'}</code>, las flechas se detienen en los extremos. <kbd>Home</kbd> y <kbd>End</kbd> saltan al primero o al último.</>}>
          <ToggleGroup aria-label="Zoom del lienzo" loopFocus={false}>
            <Toggle size="sm" value="75">75 %</Toggle>
            <Toggle size="sm" value="100">100 %</Toggle>
            <Toggle size="sm" value="125">125 %</Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Opción deshabilitada" description={<>Aplica <code>disabled</code> a un <code>Toggle</code> para omitirlo al recorrer el grupo con las flechas.</>}>
          <ToggleGroup aria-label="Vistas de auditoría" defaultValue={["summary"]}>
            <Toggle size="sm" value="summary">Resumen</Toggle>
            <Toggle size="sm" value="history" disabled>Historial</Toggle>
            <Toggle size="sm" value="details">Detalles</Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Grupo deshabilitado" description={<>Deshabilita todos los botones desde <code>ToggleGroup</code> y conserva visible la selección.</>}>
          <ToggleGroup aria-label="Periodo de un informe cerrado" disabled defaultValue={["week"]}>
            <Toggle size="sm" value="week">Semana</Toggle>
            <Toggle size="sm" value="month">Mes</Toggle>
          </ToggleGroup>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex justify-center" title="Conservar una opción activa" description={<>Cancela el cambio con <code>details.cancel()</code> si el nuevo arreglo quedaría vacío.</>}>
          <RequiredSelectionExample />
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
