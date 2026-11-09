"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { Skeleton } from "@/components/own/simple/skeleton";

export function LoadingProfileExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mx-auto max-w-xs space-y-4">
      <div role="region" aria-label="Perfil de usuario" aria-busy={loading} className="flex min-h-12 items-center gap-3">
        {loading ? (
          <>
            <Skeleton className="size-12 shrink-0 rounded-full!" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </>
        ) : (
          <>
            <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-primary-soft text-gray-bold">AM</span>
            <div>
              <p className="h5">Ana Morales</p>
              <p className="body-sm text-gray-bold/75">Diseño de producto</p>
            </div>
          </>
        )}
      </div>
      <Button type="button" variant="outline" onClick={() => setLoading(!loading)}>
        {loading ? "Mostrar perfil" : "Simular carga"}
      </Button>
    </div>
  );
}
