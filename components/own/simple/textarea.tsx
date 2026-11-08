"use client";

import clsx from "clsx";
import { useEffect, useId, useRef, useState, type ComponentPropsWithRef, type CSSProperties } from "react";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  showCount?: boolean;
  resize?: "vertical" | "none";
  autoGrow?: boolean;
}

function countCharacters(value: TextareaProps["value"]) {
  return String(value ?? "").replace(/\r\n?/g, "\n").length;
}

export function Textarea({
  className,
  showCount = false,
  resize = "vertical",
  autoGrow = false,
  rows = autoGrow ? 2 : 3,
  value,
  defaultValue,
  maxLength,
  style,
  "aria-describedby": describedBy,
  ...props
}: TextareaProps) {
  const countId = useId();
  const frame = useRef<HTMLSpanElement>(null);
  const [uncontrolledCount, setUncontrolledCount] = useState(() => countCharacters(defaultValue));
  const controlled = value != null;

  useEffect(() => {
    if (!showCount || controlled) return;

    const field = frame.current?.querySelector("textarea");
    if (!field) return;

    const updateCount = () => setUncontrolledCount(field.value.length);
    let frameId = requestAnimationFrame(updateCount);
    const handleReset = (event: Event) => {
      if (event.target !== field.form) return;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateCount);
    };

    field.addEventListener("input", updateCount);
    field.ownerDocument.addEventListener("reset", handleReset, true);
    return () => {
      cancelAnimationFrame(frameId);
      field.removeEventListener("input", updateCount);
      field.ownerDocument.removeEventListener("reset", handleReset, true);
    };
  }, [showCount, controlled, defaultValue]);

  const minRows = Number.isInteger(rows) && rows > 0 ? rows : 2;
  const field = (
    <textarea
      data-slot="textarea"
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      maxLength={maxLength}
      aria-describedby={showCount ? [describedBy, countId].filter(Boolean).join(" ") : describedBy}
      style={autoGrow ? { "--own-ui-textarea-rows": minRows, ...style } as CSSProperties : style}
      className={clsx(
        "block w-full min-w-0 rounded-base px-3 py-2",
        "text-base text-gray-bold placeholder:text-gray-bold/80 sm:text-sm",
        "disabled:cursor-not-allowed",
        autoGrow
          ? "field-sizing-content min-h-[calc(var(--own-ui-textarea-rows)*1lh+1rem+2px)]"
          : "min-h-16",
        autoGrow || resize === "none" ? "resize-none" : "resize-y",
        showCount
          ? "bg-transparent outline-none"
          : [
            "border border-gray-bold/70 bg-surface-bold disabled:opacity-50",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
            "aria-invalid:border-error-bold aria-invalid:focus-visible:outline-error-bold",
            "user-invalid:border-error-bold user-invalid:focus-visible:outline-error-bold",
          ],
        className,
      )}
      {...props}
    />
  );

  if (!showCount) return field;

  const count = controlled ? countCharacters(value) : uncontrolledCount;
  return (
    <span
      ref={frame}
      data-slot="textarea-frame"
      className={clsx(
        "block w-full min-w-0 rounded-base border border-gray-bold/70 bg-surface-bold",
        "has-[>textarea:focus-visible]:outline-2 has-[>textarea:focus-visible]:outline-offset-2 has-[>textarea:focus-visible]:outline-gray-bold",
        "has-[>textarea:is([aria-invalid=true],:user-invalid)]:border-error-bold",
        "has-[>textarea:is([aria-invalid=true],:user-invalid):focus-visible]:outline-error-bold",
        "has-[>textarea:disabled]:opacity-50",
      )}
    >
      {field}
      <span
        id={countId}
        data-slot="textarea-count"
        aria-hidden="true"
        className="caption block px-3 pb-2 text-right text-gray-bold/80 tabular-nums"
      >
        {maxLength != null && maxLength >= 0 ? `${count} / ${maxLength}` : count}
      </span>
    </span>
  );
}
