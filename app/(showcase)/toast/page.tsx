import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import { Anatomy, ApiReference } from "./api-reference";
import {
  AnchoredExample,
  ConfirmationExample,
  DeduplicatedExample,
  GlobalManagerExample,
  LimitExample,
  PromiseExample,
  ShowcaseProvider,
  StatusExample,
  TimeoutExample,
  UndoExample,
} from "./examples";


export default function ToastShowcasePage() {
  return (
    <ShowcasePage title="Toast" implementation="@base-ui/react/toast" description="Informa el resultado de una acción sin interrumpir la tarea actual.">
<ShowcaseProvider>
          <ShowcaseExample contentClassName="flex justify-center" title="Confirmación breve" description={<>Crea un aviso con <code>add</code> y ciérralo con su botón o arrastrándolo hacia la derecha.</>}>
            <ConfirmationExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Tipo y prioridad" description={<>Usa <code>type</code> para el acento visual y <code>{'priority: "high"'}</code> para un anuncio urgente.</>}>
            <StatusExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Cierre automático" description={<>Configura <code>timeout</code> en milisegundos y pasa el puntero sobre el aviso para pausar su cierre.</>}>
            <TimeoutExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Deshacer una acción" description={<>Define <code>actionProps</code> para devolver el informe a la lista y <code>{"timeout: 0"}</code> para mantener disponible la acción.</>}>
            <UndoExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Resultado de una promesa" description={<>Usa <code>promise</code> para convertir el mismo aviso de carga en confirmación o error.</>}>
            <PromiseExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Aviso con identificador estable" description={<>Reutiliza <code>id</code> en <code>add</code> para sustituir el contenido del aviso de sincronización y reiniciar su temporizador.</>}>
            <DeduplicatedExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Límite de avisos visibles" description={<>Genera cuatro avisos con el <code>limit</code> predeterminado de tres y cierra uno para recuperar el más antiguo.</>}>
            <LimitExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Aviso junto al activador" description={<>Pasa <code>positionerProps.anchor</code> para mostrar el mensaje junto al botón que lo solicita.</>}>
            <AnchoredExample />
          </ShowcaseExample>
          <ShowcaseExample contentClassName="flex justify-center" title="Gestor fuera de React" description={<>Usa una instancia de <code>createToastManager</code> para publicar avisos desde una función sin hooks.</>}>
            <GlobalManagerExample />
          </ShowcaseExample>
        </ShowcaseProvider>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
