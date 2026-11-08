import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarSize,
} from "@/components/own/base/avatar";
import { Anatomy, ApiReference } from "./api-reference";
import { DelayedFallbackExample, ImageErrorExample } from "./examples";

const userIcon = "/showcase/avatar.svg";
const sizes: AvatarSize[] = ["sm", "md", "lg"];


export default function AvatarShowcasePage() {
  return (
    <ShowcasePage title="Avatar" implementation="@base-ui/react/avatar" description="Imagen de perfil con iniciales u otro contenido alternativo.">
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Imagen de perfil"
          description={<>Carga una silueta de usuario con <code>AvatarImage</code>.</>}
        >
          <Avatar role="img" aria-label="Elena Marín">
            <AvatarFallback>EM</AvatarFallback>
            <AvatarImage src={userIcon} alt="" />
          </Avatar>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Perfil sin imagen"
          description={<>Compón <code>AvatarFallback</code> con las iniciales cuando el perfil no tenga imagen.</>}
        >
          <Avatar role="img" aria-label="Mateo Silva">
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Error de imagen"
          description={<>Cambia <code>src</code> a una imagen inválida para ver el contenido alternativo y luego restaura la imagen.</>}
        >
          <ImageErrorExample src={userIcon} />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Fallback diferido"
          description={<>Espera 800 ms antes de mostrar las iniciales con <code>delay</code>.</>}
        >
          <DelayedFallbackExample />
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Carga diferida de la imagen"
          description={<>Mantén la imagen en el DOM con <code>keepMounted</code> para que el navegador aplique <code>{'loading="lazy"'}</code>.</>}
        >
          <Avatar role="img" aria-label="Elena Marín">
            <AvatarFallback>EM</AvatarFallback>
            <AvatarImage keepMounted loading="lazy" src={`${userIcon}?lazy`} alt="" />
          </Avatar>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
          title="Tamaños"
          description={<>Ajusta la caja y la escala de las iniciales con <code>size</code>.</>}
        >
          <div className="flex flex-wrap justify-center gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} aria-hidden="true">
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <code className="caption">{size}</code>
              </div>
            ))}
          </div>
        </ShowcaseExample>
        <Anatomy />
        <ApiReference />
    </ShowcasePage>
  );
}
