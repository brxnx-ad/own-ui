"use client";

import clsx from "@/components/own/classes";
import { useCallback, useId, useLayoutEffect, useRef, useState, type ComponentPropsWithRef } from "react";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  showCount?: boolean;
  maxRows?: number;
}

const lengthError = "El texto supera el límite de caracteres.";

function normalizeText(value: TextareaProps["value"]) {
  return value == null ? undefined : String(value).replace(/\r\n?/g, "\n");
}

function truncateText(text: string, limit: number | undefined) {
  if (limit === undefined || text.length <= limit) return text;

  const truncated = text.slice(0, limit);
  const splitsSurrogatePair =
    /[\uD800-\uDBFF]$/.test(truncated) && /[\uDC00-\uDFFF]/.test(text[limit]);
  return splitsSurrogatePair ? truncated.slice(0, -1) : truncated;
}

export function Textarea({
  className,
  showCount = false,
  rows = 1,
  maxRows,
  value,
  defaultValue,
  maxLength,
  ref,
  style,
  onInput,
  onChange,
  disabled,
  readOnly,
  "aria-describedby": describedBy,
  ...props
}: TextareaProps) {
  const countId = useId();
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const attachField = useCallback((field: HTMLTextAreaElement | null) => {
    fieldRef.current = field;
    if (typeof ref === "function") {
      const cleanup = ref(field);
      if (field && cleanup) {
        return () => {
          fieldRef.current = null;
          cleanup();
        };
      }
    } else if (ref) {
      ref.current = field;
    }
  }, [ref]);

  const limit = maxLength !== undefined && Number.isInteger(maxLength) && maxLength >= 0 ? maxLength : undefined;
  const suppliedValue = normalizeText(value);
  const suppliedDefault = normalizeText(defaultValue);
  const safeValue = suppliedValue === undefined ? undefined : truncateText(suppliedValue, limit);
  const safeDefault = suppliedDefault === undefined ? undefined : truncateText(suppliedDefault, limit);
  const controlled = safeValue !== undefined;
  const valueOverflow = suppliedValue !== safeValue;
  const defaultOverflow = suppliedDefault !== safeDefault;
  const [uncontrolledCount, setUncontrolledCount] = useState(safeDefault?.length ?? 0);
  const validation = useRef({
    field: null as HTMLTextAreaElement | null,
    limit,
    usingDefault: true,
    overflow: false,
    ownsError: false,
  });

  const synchronizeField = useCallback((field: HTMLTextAreaElement, source: "props" | "input" | "reset") => {
    const state = validation.current;
    if (state.field !== field) {
      state.field = field;
      state.usingDefault = true;
      state.overflow = false;
      state.ownsError = false;
    }
    if (state.limit !== limit) {
      state.limit = limit;
      state.overflow = false;
    }
    if (source !== "props") {
      state.usingDefault = source === "reset";
      state.overflow = false;
    }

    const text = field.value;
    const truncated = truncateText(text, limit);
    if (text !== truncated) {
      const { selectionStart, selectionEnd, selectionDirection } = field;
      field.value = truncated;
      field.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
      state.overflow = true;
    }

    const invalid = valueOverflow || state.overflow || (!controlled && state.usingDefault && defaultOverflow);
    if (invalid && !field.validity.customError) {
      field.setCustomValidity(lengthError);
      state.ownsError = true;
    } else if (!invalid && state.ownsError) {
      if (!field.willValidate || field.validationMessage === lengthError) field.setCustomValidity("");
      state.ownsError = false;
    }
    field.toggleAttribute("data-length-overflow", invalid);
    return truncated.length;
  }, [controlled, defaultOverflow, limit, valueOverflow]);

  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    synchronizeField(field, "props");
    if (limit === undefined && !showCount) return;

    let frameId = showCount && !controlled
      ? requestAnimationFrame(() => setUncontrolledCount(field.value.length))
      : 0;
    const handleReset = (event: Event) => {
      if (event.target !== field.form) return;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (event.defaultPrevented) return;
        const count = synchronizeField(field, "reset");
        if (showCount && !controlled) setUncontrolledCount(count);
      });
    };

    field.ownerDocument.addEventListener("reset", handleReset, true);
    return () => {
      cancelAnimationFrame(frameId);
      field.ownerDocument.removeEventListener("reset", handleReset, true);
    };
  }, [controlled, disabled, limit, readOnly, safeDefault, safeValue, showCount, synchronizeField]);

  const handleEdit = (field: HTMLTextAreaElement) => {
    const count = synchronizeField(field, "input");
    if (showCount && !controlled) setUncontrolledCount(count);
  };

  const rowLimit = maxRows !== undefined && Number.isInteger(maxRows) && maxRows > 0 ? maxRows : undefined;
  const initialRows = Number.isInteger(rows) && rows > 0 ? rows : 1;
  const minRows = rowLimit === undefined ? initialRows : Math.min(initialRows, rowLimit);
  const verticalSpacing = showCount ? "1rem" : "1rem + 2px";
  const field = (
    <textarea
      data-slot="textarea"
      ref={attachField}
      rows={minRows}
      value={safeValue}
      defaultValue={safeDefault}
      maxLength={limit}
      disabled={disabled}
      readOnly={readOnly}
      onInput={(event) => {
        handleEdit(event.currentTarget);
        onInput?.(event);
      }}
      onChange={(event) => {
        if (event.nativeEvent.type !== "input") handleEdit(event.currentTarget);
        onChange?.(event);
      }}
      aria-describedby={showCount ? [describedBy, countId].filter(Boolean).join(" ") : describedBy}
      style={{
        ...style,
        resize: "none",
        minHeight: `calc(${minRows} * 1lh + ${verticalSpacing})`,
        maxHeight: rowLimit === undefined ? style?.maxHeight : `calc(${rowLimit} * 1lh + ${verticalSpacing})`,
      }}
      className={clsx(
        "block w-full min-w-0 field-sizing-content overflow-y-auto rounded-base px-3 py-2",
        "text-base text-content-bold placeholder:text-content-base sm:text-sm",
        "disabled:cursor-not-allowed",
        showCount
          ? "bg-transparent outline-none"
          : [
            "border border-gray-bold/70 bg-surface-bold disabled:opacity-50",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-bold",
            "aria-invalid:border-error-bold aria-invalid:focus-visible:outline-error-bold",
            "user-invalid:border-error-bold user-invalid:focus-visible:outline-error-bold",
            "data-length-overflow:border-error-bold data-length-overflow:focus-visible:outline-error-bold",
          ],
        className,
      )}
      {...props}
    />
  );

  if (!showCount) return field;

  const count = safeValue?.length ?? uncontrolledCount;
  return (
    <span
      data-slot="textarea-frame"
      className={clsx(
        "block w-full min-w-0 rounded-base border border-gray-bold/70 bg-surface-bold",
        "has-[>textarea:focus-visible]:outline-2 has-[>textarea:focus-visible]:outline-offset-2 has-[>textarea:focus-visible]:outline-gray-bold",
        "has-[>textarea:is([aria-invalid=true],[data-length-overflow],:user-invalid)]:border-error-bold",
        "has-[>textarea:is([aria-invalid=true],[data-length-overflow],:user-invalid):focus-visible]:outline-error-bold",
        "has-[>textarea:disabled]:opacity-50",
      )}
    >
      {field}
      <span
        id={countId}
        data-slot="textarea-count"
        aria-hidden="true"
        className="caption block px-3 pb-2 text-right text-content-base tabular-nums"
      >
        {limit === undefined ? count : `${count} / ${limit}`}
      </span>
    </span>
  );
}
