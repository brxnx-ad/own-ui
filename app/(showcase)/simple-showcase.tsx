import type { ReactNode } from "react";
import { ShowcasePage, ShowcaseExample, ShowcaseAnatomy, ShowcaseApiReference } from "@/components/shared/showcase";
import { ShowcaseAnatomyContent, ShowcaseApiTable, type ShowcaseApiGroup } from "@/components/shared/showcase-reference";

export type ApiRow = [string, string, string, string, string, string];

export const Example = ShowcaseExample;

export function SimpleShowcase({ name, description, anatomy, parts, api, children }: {
  name: string;
  description: string;
  anatomy: string;
  parts: [string, string][];
  api: ApiRow[];
  children: ReactNode;
}) {
  const rows: ApiRow[] = [...api, ["Todas las piezas", "className, style, ref", "string, CSSProperties, ref", "—", "Sí", "Personalización y referencia al elemento HTML."], ["Todas las piezas", "Atributos HTML", "Según el elemento", "—", "Sí", "Acepta atributos y eventos nativos del elemento correspondiente."]];
  const groups: ShowcaseApiGroup[] = [];
  for (const [piece, prop, type, defaultValue, optional, description] of rows) {
    const row = { prop, type, defaultValue, optional, description };
    const lastGroup = groups.at(-1);
    if (lastGroup?.piece === piece) {
      groups[groups.length - 1] = { ...lastGroup, rows: [...lastGroup.rows, row] };
    } else {
      groups.push({ piece, rows: [row] });
    }
  }
  return (
    <ShowcasePage title={name} description={description} implementation="HTML nativo">
        {children}
        <ShowcaseAnatomy>
          <ShowcaseAnatomyContent name={name} code={anatomy} parts={parts} />
        </ShowcaseAnatomy>
        <ShowcaseApiReference>
          <ShowcaseApiTable name={name} groups={groups} />
        </ShowcaseApiReference>
    </ShowcasePage>
  );
}
