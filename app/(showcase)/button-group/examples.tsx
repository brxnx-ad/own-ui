"use client";

import { useState } from "react";
import { Button } from "@/components/own/base/button";
import { ButtonGroup, ButtonGroupText } from "@/components/own/composed/button-group";

export function Counter() {
  const [count, setCount] = useState(1);
  return <div className="flex justify-center"><ButtonGroup aria-label="Cantidad">
    <Button variant="outline" aria-label="Reducir cantidad" disabled={count <= 1} onClick={() => setCount(count - 1)}>−</Button>
    <ButtonGroupText aria-live="polite">{count}</ButtonGroupText>
    <Button variant="outline" aria-label="Aumentar cantidad" onClick={() => setCount(count + 1)}>+</Button>
  </ButtonGroup></div>;
}
