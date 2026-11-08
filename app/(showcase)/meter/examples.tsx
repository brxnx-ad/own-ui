"use client";

import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/own/base/button";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/own/base/meter";

const quotaSteps = [450, 1420, 1950] as const;
const loadPresets = [
  { label: "Óptimo (35 %)", value: 35 },
  { label: "Elevado (78 %)", value: 78 },
  { label: "Crítico (94 %)", value: 94 },
] as const;

export function CustomValueExample() {
  const [requests, setRequests] = useState<number>(1420);
  const maxRequests = 2000;

  return (
    <div className="space-y-4">
      <Meter
        value={requests}
        min={0}
        max={maxRequests}
        locale="es-AR"
        format={{ style: "decimal" }}
        getAriaValueText={(formattedValue) =>
          `${formattedValue} de 2.000 solicitudes utilizadas en el ciclo actual`
        }
      >
        <MeterLabel>Cuota de solicitudes por hora</MeterLabel>
        <MeterValue>
          {(formattedValue) => `${formattedValue} / 2.000`}
        </MeterValue>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <div className="flex flex-wrap justify-center gap-2">
        {quotaSteps.map((step) => (
          <Button
            key={step}
            size="sm"
            variant={requests === step ? "primary" : "secondary"}
            onClick={() => setRequests(step)}
          >
            {step.toLocaleString("es-AR")} sol.
          </Button>
        ))}
      </div>
    </div>
  );
}

export function ThresholdMeterExample() {
  const [load, setLoad] = useState<number>(78);

  const indicatorTone =
    load >= 90
      ? "bg-error-base"
      : load >= 70
        ? "bg-warning-base"
        : "bg-success-base";

  return (
    <div className="space-y-4">
      <Meter
        value={load}
        locale="es-AR"
        getAriaValueText={(formattedValue, value) => {
          const level =
            value >= 90 ? "crítico" : value >= 70 ? "elevado" : "óptimo";
          return `${formattedValue} (${level})`;
        }}
      >
        <MeterLabel>Carga de memoria del nodo</MeterLabel>
        <MeterValue />
        <MeterTrack>
          <MeterIndicator className={clsx(indicatorTone)} />
        </MeterTrack>
      </Meter>

      <div className="flex flex-wrap justify-center gap-2">
        {loadPresets.map((preset) => (
          <Button
            key={preset.value}
            size="sm"
            variant={load === preset.value ? "primary" : "secondary"}
            onClick={() => setLoad(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
