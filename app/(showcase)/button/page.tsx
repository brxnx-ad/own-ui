import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/own/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ButtonAnatomy, ButtonApiReference } from "./api-reference";

interface SectionProps {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}

function ShowcaseSection({
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="h3 text-gray-bold font-heading">{title}</h2>
        <p className="body-sm text-gray-bold/75 mt-1">
          {description}
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border border-gray-base bg-surface-base p-6 sm:p-8 shadow-s">
        {children}
      </div>
    </section>
  );
}

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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="caption font-semibold uppercase tracking-wider text-gray-bold/70">
          {label}
        </span>
        {propCode && (
          <code className="rounded bg-gray-base/30 px-1.5 py-0.5 text-xs font-mono text-gray-bold font-medium">
            {propCode}
          </code>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
    <ShowcaseSection
      title={title}
      description={<>{description} <code>variant=&quot;{variant}&quot;</code>.</>}
    >
      <StateRow label="Normal" variant={variant} />
      <div className="h-px bg-gray-base/40" />
      <StateRow
        label="Loading"
        propCode="loading"
        variant={variant}
        loading
      />
      <div className="h-px bg-gray-base/40" />
      <StateRow
        label="Disabled"
        propCode="disabled"
        variant={variant}
        disabled
      />
    </ShowcaseSection>
  );
}

export default function ButtonShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-soft text-gray-bold px-6 py-12 sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Navegación y Cabecera */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 hover:text-gray-bold transition-colors"
            >
              <ArrowLeft className="size-4" />
              Volver al catálogo
            </Link>
            <ThemeToggle />
          </div>

          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h1">Button</h1>
              <span className="caption rounded-base bg-primary-soft text-primary-bold font-semibold px-2.5 py-0.5">
                @base-ui/react/button
              </span>
            </div>
            <p className="subtitle">
              Acciones con variantes, iconos y estado de carga.
            </p>
          </header>
        </div>

        {/* 1. Primary */}
        <VariantShowcaseBlock
          variant="primary"
          title="Primary"
          description="Destaca la acción principal con"
        />

        {/* 2. Secondary */}
        <VariantShowcaseBlock
          variant="secondary"
          title="Secondary"
          description="Presenta acciones secundarias con"
        />

        {/* 3. Outline */}
        <VariantShowcaseBlock
          variant="outline"
          title="Outline"
          description="Delimita acciones con un borde mediante"
        />

        {/* 4. Ghost */}
        <VariantShowcaseBlock
          variant="ghost"
          title="Ghost"
          description="Reduce el peso visual de la acción con"
        />

        {/* 5. Destructive */}
        <VariantShowcaseBlock
          variant="destructive"
          title="Destructive"
          description="Señala acciones destructivas con"
        />
        <ShowcaseSection title="Icono inicial" description={<>Añade un icono antes del texto con <code>icon</code>.</>}>
          <Button icon={<ArrowUpRight aria-hidden="true" />}>Abrir proyecto</Button>
        </ShowcaseSection>
        <ShowcaseSection title="Icono final" description={<>Coloca el icono después del texto con <code>iconPosition=&quot;end&quot;</code>.</>}>
          <Button icon={<ArrowUpRight aria-hidden="true" />} iconPosition="end">Abrir proyecto</Button>
        </ShowcaseSection>
        <ShowcaseSection title="Foco estando deshabilitado" description={<>Permite alcanzar el botón con Tab mediante <code>focusableWhenDisabled</code>.</>}>
          <Button disabled focusableWhenDisabled>Acción no disponible</Button>
        </ShowcaseSection>
        <ShowcaseSection title="Composición como enlace" description={<>Renderiza un enlace con <code>render</code> y <code>nativeButton=false</code>.</>}>
          <Button render={<Link href="/" />} nativeButton={false} role="link">Volver al catálogo</Button>
        </ShowcaseSection>
        <ButtonAnatomy />
        <ButtonApiReference />
      </div>
    </main>
  );
}
