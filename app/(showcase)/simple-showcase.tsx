import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export type ApiRow = [string, string, string, string, string, string];

export function Example({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="space-y-2"><h2 className="h3">{title}</h2><p className="body-sm text-gray-bold/75">{description}</p></div>
      <div className="rounded-2xl border border-gray-base bg-surface-base p-6 shadow-s sm:p-8">
        <div className="mx-auto w-full max-w-xl">{children}</div>
      </div>
    </section>
  );
}

export function SimpleShowcase({ name, description, anatomy, parts, api, children }: {
  name: string;
  description: string;
  anatomy: string;
  parts: [string, string][];
  api: ApiRow[];
  children: ReactNode;
}) {
  const rows: ApiRow[] = [...api, ["Todas las piezas", "className, style, ref", "string, CSSProperties, ref", "—", "Sí", "Personalización y referencia al elemento HTML."], ["Todas las piezas", "Atributos HTML", "Según el elemento", "—", "Sí", "Acepta atributos y eventos nativos del elemento correspondiente."]];
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-gray-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-bold/70 hover:text-gray-bold"><ArrowLeft className="size-4" aria-hidden="true" />Volver al catálogo</Link><ThemeToggle /></div>
          <header className="space-y-2"><div className="flex flex-wrap items-center gap-3"><h1 className="h1">{name}</h1><span className="caption rounded-base bg-primary-soft px-2.5 py-0.5 text-gray-bold">HTML nativo</span></div><p className="subtitle">{description}</p></header>
        </div>
        {children}
        <section aria-labelledby="anatomy-heading" className="space-y-4">
          <h2 id="anatomy-heading" className="h3">Anatomía</h2>
          <pre tabIndex={0} aria-label={`Composición de ${name} en JSX`} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm"><code>{anatomy}</code></pre>
          <div className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base"><table className="body-sm w-full text-left"><caption className="sr-only">Piezas de {name}</caption><thead className="bg-surface-bold"><tr><th scope="col" className="p-4">Pieza</th><th scope="col" className="p-4">Responsabilidad</th></tr></thead><tbody>{parts.map(([piece, responsibility]) => <tr key={piece} className="border-t border-gray-base"><th scope="row" className="p-4 font-mono">{piece}</th><td className="p-4">{responsibility}</td></tr>)}</tbody></table></div>
        </section>
        <section aria-labelledby="api-heading" className="space-y-4">
          <h2 id="api-heading" className="h3">Referencia de API</h2>
          <div tabIndex={0} role="region" aria-label={`Referencia de API de ${name}`} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base focus-visible:outline-2 focus-visible:outline-gray-bold">
            <table className="body-sm w-full min-w-[800px] text-left"><caption className="sr-only">Props de {name}</caption><thead className="bg-surface-bold"><tr>{["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"].map((heading) => <th key={heading} scope="col" className="p-4">{heading}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-gray-base">{row.map((value, cell) => cell === 0 ? <th scope="row" key={cell} className="p-4 font-mono text-xs">{value}</th> : <td key={cell} className="p-4">{value}</td>)}</tr>)}</tbody></table>
          </div>
        </section>
      </div>
    </main>
  );
}
