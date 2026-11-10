"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/own/base/button";
import {
  createPreviewCardHandle,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
  type PreviewCardChangeEventDetails,
} from "@/components/own/base/preview-card";

type Preview = {
  category: string;
  title: string;
  summary: string;
  detail?: string;
};

export function PreviewSummary({ category, title, summary, detail }: Preview) {
  return (
    <div className="space-y-2">
      <span className="caption inline-flex rounded-base bg-primary-soft px-2 py-0.5 font-semibold text-content-bold">
        {category}
      </span>
      <h3 className="h4 wrap-anywhere">{title}</h3>
      <p className="body-sm wrap-anywhere text-content-base">{summary}</p>
      {detail && <p className="body-sm wrap-anywhere text-content-base">{detail}</p>}
    </div>
  );
}

const numberField: Preview = {
  category: "Entrada numérica",
  title: "Number Field",
  summary: "Edita cantidades con límites, pasos y formato localizado.",
};

const otpField: Preview = {
  category: "Verificación",
  title: "OTP Field",
  summary: "Distribuye un código de un solo uso en casillas individuales.",
  detail: "Permite pegar el código completo y enviarlo al llenar la última casilla.",
};

export function DetachedTriggersExample() {
  const [handle] = useState(createPreviewCardHandle<Preview>);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <PreviewCardTrigger handle={handle} payload={numberField} delay={150} render={<Link href="/number-field" />}>
          Number Field
        </PreviewCardTrigger>
        <PreviewCardTrigger handle={handle} payload={otpField} delay={150} render={<Link href="/otp-field" />}>
          OTP Field
        </PreviewCardTrigger>
      </div>
      <PreviewCard handle={handle}>
        {({ payload }) => (
          <PreviewCardPortal>
            <PreviewCardPositioner>
              <PreviewCardPopup>
                <PreviewCardViewport>
                  {payload && <PreviewSummary {...payload} />}
                </PreviewCardViewport>
              </PreviewCardPopup>
            </PreviewCardPositioner>
          </PreviewCardPortal>
        )}
      </PreviewCard>
    </>
  );
}

const meter: Preview = {
  category: "Medición",
  title: "Meter",
  summary: "Representa un valor escalar dentro de un rango conocido.",
};

const menu: Preview = {
  category: "Acción",
  title: "Menu",
  summary: "Agrupa comandos, selecciones y submenús detrás de un activador.",
};

export function ControlledExample() {
  const id = useId();
  const meterId = `${id}-meter`;
  const menuId = `${id}-menu`;
  const [open, setOpen] = useState(false);
  const [triggerId, setTriggerId] = useState<string | null>(null);

  function handleOpenChange(nextOpen: boolean, details: PreviewCardChangeEventDetails) {
    setOpen(nextOpen);
    if (nextOpen && details.trigger) {
      setTriggerId(details.trigger.id);
    }
  }

  function showMeter() {
    setTriggerId(meterId);
    setOpen(true);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <PreviewCard<Preview> open={open} triggerId={triggerId} onOpenChange={handleOpenChange}>
        {({ payload }) => (
          <>
            <PreviewCardTrigger id={meterId} payload={meter} render={<Link href="/meter" />}>Meter</PreviewCardTrigger>
            <PreviewCardTrigger id={menuId} payload={menu} render={<Link href="/menu" />}>Menu</PreviewCardTrigger>
            <PreviewCardPortal>
              <PreviewCardPositioner>
                <PreviewCardPopup>
                  {payload && <PreviewSummary {...payload} />}
                </PreviewCardPopup>
              </PreviewCardPositioner>
            </PreviewCardPortal>
          </>
        )}
      </PreviewCard>
      <Button type="button" variant="outline" size="sm" onClick={showMeter}>Previsualizar Meter</Button>
    </div>
  );
}
