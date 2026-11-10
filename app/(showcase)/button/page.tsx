import { ShowcasePage, ShowcaseExample } from "@/components/shared/showcase";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/own/base/button";
import { Separator } from "@/components/own/base/separator";
import { ButtonAnatomy, ButtonApiReference } from "./api-reference";



interface StateRowProps {
  label: string;
  propCode?: string;
  variant: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

function StateRow({
  label,
  propCode,
  variant,
  loading = false,
  disabled = false,
}: StateRowProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-center gap-2">
        <span className="caption font-semibold uppercase tracking-wider text-content-base">
          {label}
        </span>
        {propCode && (
          <code className="rounded bg-gray-base/30 px-1.5 py-0.5 text-xs font-mono text-content-bold font-medium">
            {propCode}
          </code>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <Button
            variant={variant}
            size="sm"
            loading={loading}
            disabled={disabled}
          >
            Small
          </Button>
          <Button
            variant={variant}
            size="sm"
            icon={<ArrowUpRight />}
            loading={loading}
            disabled={disabled}
            aria-label={`Small ${variant} ${label}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={variant}
            size="md"
            loading={loading}
            disabled={disabled}
          >
            Default
          </Button>
          <Button
            variant={variant}
            size="md"
            icon={<ArrowUpRight />}
            loading={loading}
            disabled={disabled}
            aria-label={`Default ${variant} ${label}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={variant}
            size="lg"
            loading={loading}
            disabled={disabled}
          >
            Large
          </Button>
          <Button
            variant={variant}
            size="lg"
            icon={<ArrowUpRight />}
            loading={loading}
            disabled={disabled}
            aria-label={`Large ${variant} ${label}`}
          />
        </div>
      </div>
    </div>
  );
}

function VariantShowcaseBlock({
  variant,
  title,
  description,
}: {
  variant: ButtonVariant;
  title: string;
  description: string;
}) {
  return (
    <ShowcaseExample contentClassName="flex flex-col items-center gap-6"
      title={title}
      description={<>{description} <code>variant=&quot;{variant}&quot;</code>.</>}
    >
      <StateRow label="Normal" variant={variant} />
      <Separator aria-hidden className="opacity-40" />
      <StateRow
        label="Loading"
        propCode="loading"
        variant={variant}
        loading
      />
      <Separator aria-hidden className="opacity-40" />
      <StateRow
        label="Disabled"
        propCode="disabled"
        variant={variant}
        disabled
      />
    </ShowcaseExample>
  );
}

export default function ButtonShowcasePage() {
  return (
    <ShowcasePage title="Button" implementation="@base-ui/react/button" description="Acciones con variantes, iconos y estado de carga.">
<VariantShowcaseBlock
          variant="primary"
          title="Primary"
          description="Destaca la acción principal con"
        />
<VariantShowcaseBlock
          variant="secondary"
          title="Secondary"
          description="Presenta acciones secundarias con"
        />
<VariantShowcaseBlock
          variant="outline"
          title="Outline"
          description="Delimita acciones con un borde mediante"
        />
<VariantShowcaseBlock
          variant="ghost"
          title="Ghost"
          description="Reduce el peso visual de la acción con"
        />
<VariantShowcaseBlock
          variant="destructive"
          title="Destructive"
          description="Señala acciones destructivas con"
        />
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Icono inicial" description={<>Añade un icono antes del texto con <code>icon</code>.</>}>
          <Button icon={<ArrowUpRight aria-hidden="true" />}>Abrir proyecto</Button>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Icono final" description={<>Coloca el icono después del texto con <code>iconPosition=&quot;end&quot;</code>.</>}>
          <Button icon={<ArrowUpRight aria-hidden="true" />} iconPosition="end">Abrir proyecto</Button>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Foco estando deshabilitado" description={<>Permite alcanzar el botón con Tab mediante <code>focusableWhenDisabled</code>.</>}>
          <Button disabled focusableWhenDisabled>Acción no disponible</Button>
        </ShowcaseExample>
        <ShowcaseExample contentClassName="flex flex-col items-center gap-6" title="Composición como enlace" description={<>Renderiza un enlace con <code>render</code> y <code>nativeButton=false</code>.</>}>
          <Button render={<Link href="/" />} nativeButton={false} role="link">Volver al catálogo</Button>
        </ShowcaseExample>
        <ButtonAnatomy />
        <ButtonApiReference />
    </ShowcasePage>
  );
}
