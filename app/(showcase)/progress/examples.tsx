"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/own/base/progress";

export function IndeterminateExample() {
  const [hasEstimate, setHasEstimate] = useState(false);

  return (
    <div className="space-y-4">
      <Progress
        value={hasEstimate ? 35 : null}
        locale="es-CL"
        getAriaValueText={(formattedValue, value) => value === null ? "Avance aún desconocido" : formattedValue}
      >
        <ProgressLabel>Preparación del paquete</ProgressLabel>
        <ProgressValue>{(formattedValue, value) => value === null ? "Calculando…" : formattedValue}</ProgressValue>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <div className="flex justify-center">
        <Button type="button" variant="outline" size="sm" onClick={() => setHasEstimate(!hasEstimate)}>
          {hasEstimate ? "Volver a calcular" : "Mostrar avance estimado"}
        </Button>
      </div>
    </div>
  );
}

const totalBatches = 5;

export function BatchExample() {
  const [processed, setProcessed] = useState(0);

  return (
    <div className="space-y-4">
      <Progress
        value={processed}
        max={totalBatches}
        locale="es-CL"
        format={{ style: "decimal" }}
        getAriaValueText={(formattedValue) => `${formattedValue} de ${totalBatches} lotes procesados`}
      >
        <ProgressLabel>Procesamiento de registros</ProgressLabel>
        <ProgressValue>{(formattedValue) => `${formattedValue} de ${totalBatches}`}</ProgressValue>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" size="sm" disabled={processed === totalBatches} onClick={() => setProcessed((current) => Math.min(current + 1, totalBatches))}>
          Procesar siguiente lote
        </Button>
        <Button type="button" variant="outline" size="sm" disabled={processed === 0} onClick={() => setProcessed(0)}>
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
