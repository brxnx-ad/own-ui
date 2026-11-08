"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/own/base/button";
import { OTPField, OTPFieldInput } from "@/components/own/base/otp-field";

export function OTPInputs({ length, count = length, start = 0, placeholder }: {
  length: number;
  count?: number;
  start?: number;
  placeholder?: string;
}) {
  return Array.from({ length: count }, (_, offset) => {
    const index = start + offset;
    return (
      <OTPFieldInput
        key={index}
        aria-label={index === 0 ? undefined : `Carácter ${index + 1} de ${length}`}
        placeholder={placeholder}
      />
    );
  });
}

export function RecoveryCodeExample() {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor="recovery-code" className="body-sm font-medium">Código de recuperación</label>
      <OTPField id="recovery-code" length={6} validationType="alphanumeric" normalizeValue={(value) => value.toUpperCase()}>
        <OTPInputs length={6} />
      </OTPField>
    </div>
  );
}

export function ControlledExample() {
  const [code, setCode] = useState("05");
  const firstInputRef = useRef<HTMLInputElement>(null);

  function clearCode() {
    setCode("");
    firstInputRef.current?.focus();
  }

  return (
    <div className="grid min-w-0 justify-items-start gap-2">
      <label htmlFor="controlled-code" className="body-sm font-medium">Código de acceso temporal</label>
      <OTPField id="controlled-code" length={4} value={code} onValueChange={setCode}>
        <OTPFieldInput ref={firstInputRef} />
        <OTPInputs length={4} count={3} start={1} />
      </OTPField>
      <Button type="button" variant="outline" size="sm" disabled={code === ""} onClick={clearCode}>
        Borrar código
      </Button>
    </div>
  );
}

export function AutoSubmitExample() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid min-w-0 gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="submit-code" className="body-sm font-medium">Código para enviar</label>
      <OTPField id="submit-code" name="verificationCode" length={4} required autoSubmit onValueChange={() => setSubmitted(false)}>
        <OTPInputs length={4} />
      </OTPField>
      <p role="status" className="body-sm text-success-bold">{submitted ? "Formulario de demostración enviado." : ""}</p>
    </form>
  );
}
