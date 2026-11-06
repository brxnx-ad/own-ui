import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/own/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface SectionProps {
  title: string;
  description: string;
  propCode?: string;
  children: React.ReactNode;
}

function ShowcaseSection({
  title,
  description,
  propCode,
  children,
}: SectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="h3 text-gray-bold font-heading">{title}</h2>
        <p className="body-sm text-gray-bold/75 mt-1">
          {description}{" "}
          {propCode && (
            <code className="rounded-md bg-gray-base/30 px-1.5 py-0.5 text-xs font-mono text-gray-bold font-medium">
              {propCode}
            </code>
          )}
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
      description={description}
      propCode={`variant="${variant}"`}
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
            <div className="flex items-center gap-3">
              <h1 className="h1">Button</h1>
              <span className="caption rounded-base bg-primary-soft text-primary-bold font-semibold px-2.5 py-0.5">
                @base-ui/react/button
              </span>
            </div>
            <p className="subtitle">
              Componente de acción táctil y teclado. Conecta la accesibilidad y foco de Base UI con las superficies y tríadas cromáticas del proyecto.
            </p>
          </header>
        </div>

        {/* 1. Primary */}
        <VariantShowcaseBlock
          variant="primary"
          title="Primary"
          description="Variante principal de máxima jerarquía para la acción de mayor relevancia."
        />

        {/* 2. Secondary */}
        <VariantShowcaseBlock
          variant="secondary"
          title="Secondary"
          description="Variante de superficie elevada para acciones secundarias o de soporte."
        />

        {/* 3. Outline */}
        <VariantShowcaseBlock
          variant="outline"
          title="Outline"
          description="Variante con borde neutro y fondo transparente para acciones de menor peso visual."
        />

        {/* 4. Ghost */}
        <VariantShowcaseBlock
          variant="ghost"
          title="Ghost"
          description="Variante sin borde ni fondo en reposo, ideal para barras de herramientas o acciones sutiles."
        />

        {/* 5. Destructive */}
        <VariantShowcaseBlock
          variant="destructive"
          title="Destructive"
          description="Variante con fondo tenue 'error-soft' y texto 'error-bold', que transiciona a relleno sólido 'error-base' con texto blanco en hover."
        />
      </div>
    </main>
  );
}
