"use client";

import type { ComponentProps, ReactNode } from "react";
import type { ChartValue } from "@tanstack/charts/types";
import { Chart as TanStackChart, type ChartProps as TanStackChartProps } from "@tanstack/charts/react";
import clsx from "@/components/own/classes";
import styles from "./chart.module.css";

export type ChartProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = TanStackChartProps<TDatum, TXValue, TYValue> & {
  caption?: ReactNode;
  figureProps?: Omit<ComponentProps<"figure">, "children" | "dangerouslySetInnerHTML">;
};

export function Chart<TDatum, TXValue extends ChartValue = ChartValue, TYValue extends ChartValue = ChartValue>({
  caption,
  figureProps,
  ...props
}: ChartProps<TDatum, TXValue, TYValue>) {
  const { className, ...attributes } = figureProps ?? {};

  return (
    <figure
      {...attributes}
      data-slot="chart"
      className={clsx(styles.chart, "flex w-full min-w-0 flex-col gap-2", className)}
    >
      <TanStackChart {...props} />
      {caption != null && (
        <figcaption data-slot="chart-caption" className="body-sm text-content-base">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
