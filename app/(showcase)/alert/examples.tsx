"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/own/simple/alert";

export function DynamicAlertExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button type="button" variant="outline" onClick={() => setVisible(!visible)}>
          {visible ? "Ocultar resultado" : "Mostrar resultado"}
        </Button>
      </div>
      <div role="status">
        {visible && (
          <Alert variant="success">
            <AlertTitle>Informe listo</AlertTitle>
            <AlertDescription>Terminó el procesamiento de los datos.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
