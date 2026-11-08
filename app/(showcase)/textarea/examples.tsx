"use client";

import { useState } from "react";
import { Textarea } from "@/components/own/simple/textarea";

export function ControlledTextarea() {
  const [value, setValue] = useState("");
  return (
    <label className="mx-auto block max-w-md space-y-2">
      <span className="body-sm block">Observaciones</span>
      <Textarea showCount value={value} onChange={(event) => setValue(event.target.value)} maxLength={120} />
    </label>
  );
}
