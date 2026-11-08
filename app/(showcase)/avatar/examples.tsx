"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/own/base/avatar";
import { Button } from "@/components/own/base/button";

const invalidImage = "data:image/png;base64,AAAA";

export function ImageErrorExample({ src }: { src: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar role="img" aria-label="Elena Marín">
        <AvatarFallback>EM</AvatarFallback>
        <AvatarImage src={hasError ? invalidImage : src} alt="" />
      </Avatar>
      <Button variant="secondary" size="sm" onClick={() => setHasError(!hasError)}>
        {hasError ? "Restaurar imagen" : "Simular error"}
      </Button>
    </div>
  );
}

export function DelayedFallbackExample() {
  const [attempt, setAttempt] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar key={attempt} role="img" aria-label="Mateo Silva">
        <AvatarFallback delay={800}>MS</AvatarFallback>
      </Avatar>
      <Button variant="secondary" size="sm" onClick={() => setAttempt(attempt + 1)}>
        Repetir espera
      </Button>
    </div>
  );
}
