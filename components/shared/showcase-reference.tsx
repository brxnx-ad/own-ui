import type { ReactNode } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/own/simple/table";

export interface ShowcaseApiRow {
  prop: ReactNode;
  type: ReactNode;
  defaultValue: ReactNode;
  description: ReactNode;
  optional?: ReactNode;
}

export interface ShowcaseApiGroup {
  piece: string;
  rows: readonly ShowcaseApiRow[];
}

export function ShowcaseAnatomyContent({ name, code, parts }: {
  name: string;
  code: string;
  parts: readonly (readonly ReactNode[])[];
}) {
  return (
    <>
      <pre tabIndex={0} aria-label={`Composición de ${name} en JSX`} className="overflow-x-auto rounded-2xl border border-gray-base bg-surface-base p-6 text-sm"><code>{code}</code></pre>
      <Table className="text-left" containerProps={{ className: "rounded-2xl!", role: "region", "aria-label": `Anatomía de ${name}` }}>
        <TableCaption className="sr-only">Piezas de {name} y sus responsabilidades</TableCaption>
        <TableHeader><TableRow><TableHead scope="col" className="p-4!">Pieza</TableHead><TableHead scope="col" className="p-4!">Responsabilidad</TableHead></TableRow></TableHeader>
        <TableBody>{parts.map(([piece, responsibility], index) => (
          <TableRow key={index} className="align-top">
            <TableHead scope="row" className="p-4! text-left font-mono text-xs wrap-anywhere">{piece}</TableHead>
            <TableCell className="p-4!">{responsibility}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </>
  );
}

export function ShowcaseApiTable({ name, groups }: { name: string; groups: readonly ShowcaseApiGroup[] }) {
  const headings = ["Pieza", "Prop o callback", "Tipo", "Predeterminado", "Opcional", "Función"];
  return (
    <Table className="min-w-3xl text-left" containerProps={{ className: "rounded-2xl!", role: "region", "aria-label": `Referencia de API de ${name}` }}>
      <TableCaption className="sr-only">Props y callbacks de {name}</TableCaption>
      <TableHeader><TableRow>{headings.map(heading => <TableHead key={heading} scope="col" className="p-4!">{heading}</TableHead>)}</TableRow></TableHeader>
      {groups.map(({ piece, rows }, groupIndex) => (
        <TableBody key={`${piece}-${groupIndex}`}>
          {rows.map(({ prop, type, defaultValue, optional = "Sí", description }, index) => (
            <TableRow key={index} className="align-top">
              {index === 0 && <TableHead scope="rowgroup" rowSpan={rows.length} className="p-4! font-medium">{piece}</TableHead>}
              <TableHead scope="row" className="p-4! font-mono text-xs">{prop}</TableHead>
              <TableCell className="p-4! font-mono text-xs">{type}</TableCell>
              <TableCell className="p-4!">{defaultValue}</TableCell>
              <TableCell className="p-4!">{optional}</TableCell>
              <TableCell className="min-w-64 p-4!">{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      ))}
    </Table>
  );
}
