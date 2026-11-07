import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarSize,
} from "@/components/own/independant/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Anatomy, ApiReference } from "./api-reference";
import { DelayedFallbackExample, ImageErrorExample } from "./examples";

const portrait = "/showcase/avatar.svg";
const sizes: AvatarSize[] = ["sm", "md", "lg"];

function Behavior({ title, description, children }: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h2 className="h3">{title}</h2>
        <p className="body-sm text-gray-bold/75">{description}</p>
      </div>
      <div className="flex flex-col items-center rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        {children}
      </div>
    </section>
  );
}

export default function AvatarShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 transition-colors hover:text-gray-bold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Avatar</h1>
              <span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 font-semibold text-primary-bold">
                @base-ui/react/avatar
              </span>
            </div>
            <p className="subtitle">
              Imagen de perfil con iniciales u otro contenido alternativo.
            </p>
          </header>
        </div>

        <Behavior
          title="Imagen de perfil"
          description={<>Muestra <code>AvatarImage</code> cuando termina de cargar.</>}
        >
          <Avatar role="img" aria-label="Elena Marín">
            <AvatarFallback>EM</AvatarFallback>
            <AvatarImage src={portrait} alt="" />
          </Avatar>
        </Behavior>

        <Behavior
          title="Perfil sin imagen"
          description={<>Compón <code>AvatarFallback</code> con las iniciales cuando el perfil no tenga imagen.</>}
        >
          <Avatar role="img" aria-label="Mateo Silva">
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </Behavior>

        <Behavior
          title="Error de imagen"
          description={<>Cambia <code>src</code> a una imagen inválida para ver el contenido alternativo y luego restaura la imagen.</>}
        >
          <ImageErrorExample src={portrait} />
        </Behavior>

        <Behavior
          title="Fallback diferido"
          description={<>Espera 800 ms antes de mostrar las iniciales con <code>delay</code>.</>}
        >
          <DelayedFallbackExample />
        </Behavior>

        <Behavior
          title="Carga diferida de la imagen"
          description={<>Mantén la imagen en el DOM con <code>keepMounted</code> para que el navegador aplique <code>{'loading="lazy"'}</code>.</>}
        >
          <Avatar role="img" aria-label="Elena Marín">
            <AvatarFallback>EM</AvatarFallback>
            <AvatarImage keepMounted loading="lazy" src={`${portrait}?lazy`} alt="" />
          </Avatar>
        </Behavior>

        <Behavior
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
        </Behavior>

        <Anatomy />
        <ApiReference />
      </div>
    </main>
  );
}
