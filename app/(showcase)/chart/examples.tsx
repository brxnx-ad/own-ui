"use client";

import { useMemo, useState } from "react";
import { barY } from "@tanstack/charts/bar";
import { colorLegend } from "@tanstack/charts/legend";
import { lineY } from "@tanstack/charts/line";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
import { scalePoint } from "@tanstack/charts/scales/point";
import { defineChart } from "@tanstack/charts/scene";
import { tooltip } from "@tanstack/charts/tooltip";
import { Button } from "@/components/own/base/button";
import { Chart } from "@/components/own/dependant/chart";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/own/simple/table";

const production = [
  { month: "Ene", actual: 64, plan: 70 },
  { month: "Feb", actual: 75, plan: 74 },
  { month: "Mar", actual: 72, plan: 77 },
  { month: "Abr", actual: 88, plan: 80 },
  { month: "May", actual: 91, plan: 86 },
  { month: "Jun", actual: 97, plan: 90 },
  { month: "Jul", actual: 86, plan: 90 },
  { month: "Ago", actual: 93, plan: 94 },
  { month: "Sep", actual: 99, plan: 96 },
  { month: "Oct", actual: 96, plan: 98 },
  { month: "Nov", actual: 108, plan: 102 },
  { month: "Dic", actual: 114, plan: 108 },
];

const productionScales = {
  x: { scale: () => scalePoint<string>().padding(0.3), axis: { label: "Mes" } },
  y: { scale: scaleLinear().domain([0, 120]), grid: true, axis: { label: "Unidades", ticks: { count: 4 } } },
};

const trend = defineChart({
  marks: [lineY(production.slice(0, 6), { x: "month", y: "actual", points: true, strokeWidth: 2.5 })],
  scales: productionScales,
  tooltip,
});

export function TrendExample() {
  return (
    <Chart
      definition={trend}
      ariaLabel="Producción mensual del primer semestre"
      ariaDescription="La producción aumenta de 64 unidades en enero a 97 en junio."
      aspectRatio={16 / 9}
      initialWidth={560}
      caption="La producción aumentó en 33 unidades entre enero y junio."
    />
  );
}

const areas = [
  { area: "Corte", orders: 48 },
  { area: "Montaje", orders: 62 },
  { area: "Control", orders: 37 },
  { area: "Despacho", orders: 55 },
];

const areaComparison = defineChart({
  marks: [barY(areas, { x: "area", y: "orders", radius: { end: 4 }, maxThickness: 72 })],
  scales: {
    x: { scale: () => scaleBand<string>().padding(0.24), axis: { label: "Área" } },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Órdenes", ticks: { count: 4 } } },
  },
  tooltip,
});

export function BarExample() {
  return (
    <div className="space-y-4">
      <Chart
        definition={areaComparison}
        ariaLabel="Órdenes procesadas por área"
        height={240}
        initialWidth={560}
        caption="Montaje procesó la mayor cantidad de órdenes."
      />
      <details className="space-y-2">
        <summary className="body-sm w-fit cursor-pointer rounded-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base">
          Ver tabla de datos
        </summary>
        <Table>
          <TableCaption>Órdenes procesadas por área</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Área</TableHead>
              <TableHead scope="col">Órdenes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {areas.map(({ area, orders }) => (
              <TableRow key={area}>
                <TableHead scope="row">{area}</TableHead>
                <TableCell>{orders}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </details>
    </div>
  );
}

const periods = [
  { start: 0, name: "Primer semestre" },
  { start: 6, name: "Segundo semestre" },
];

interface SeriesPoint {
  month: string;
  units: number;
  series: "Real" | "Plan";
}

export function ComparisonExample() {
  const [period, setPeriod] = useState(periods[0]);
  const [selected, setSelected] = useState<SeriesPoint | null>(null);
  const comparison = useMemo(() => {
    const rows = production.slice(period.start, period.start + 6);
    const actual: SeriesPoint[] = rows.map(({ month, actual }) => ({ month, units: actual, series: "Real" }));
    const plan: SeriesPoint[] = rows.map(({ month, plan }) => ({ month, units: plan, series: "Plan" }));

    return defineChart({
      marks: [
        lineY(actual, { id: "actual", x: "month", y: "units", color: "series", points: true, strokeWidth: 2.5 }),
        lineY(plan, { id: "plan", x: "month", y: "units", color: "series", strokeDasharray: "5 4", strokeWidth: 2 }),
      ],
      scales: productionScales,
      color: {
        scale: scaleOrdinal<string, string>().domain(["Real", "Plan"]).range(["var(--ts-chart-1)", "var(--ts-chart-2)"]),
        legend: colorLegend({ placement: "bottom" }),
      },
      focus: "group-x",
      tooltip,
      svgAnimation: true,
    });
  }, [period]);

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Período" className="flex flex-wrap justify-center gap-2">
        {periods.map((option) => (
          <Button
            key={option.start}
            size="sm"
            variant={period === option ? "primary" : "outline"}
            aria-pressed={period === option}
            onClick={() => {
              if (period === option) return;
              setSelected(null);
              setPeriod(option);
            }}
          >
            {option.name}
          </Button>
        ))}
      </div>
      <Chart
        definition={comparison}
        ariaLabel={`Producción real y planificada. ${period.name}`}
        height={270}
        initialWidth={560}
        caption="Real usa una línea continua. Plan usa una línea discontinua."
        onSelect={(point) => setSelected(point?.datum ?? null)}
      />
      <p role="status" className="body-sm min-h-5 text-content-base">
        {selected ? `${selected.month} · ${selected.series} · ${selected.units} unidades` : "Selecciona un punto para consultar su valor."}
      </p>
    </div>
  );
}
