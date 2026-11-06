# own-ui · Creación de componentes

> **Objetivo y alcance del documento:** Establecer la guía canónica y los estándares técnicos para la creación de componentes propios en `components/own/`, utilizando `button.tsx` como componente modelo de referencia. Se considera desactualizado si los componentes implementados en `components/own/` emplean patrones de tipado, composición de clases, gestión de estados o jerarquías de interacción divergentes de las directrices aquí descritas.

[Estructura del proyecto](../01-estructura-del-proyecto.md) · [Sistema de estilos](../02-estilos.md) · [Objetivos](../03-objetivos.md) · [Mantenimiento](../04-mantenimiento.md) · [Showcase](showcase.md)

---

## 1. Principios arquitectónicos de un componente propio

Todo componente desarrollado en `components/own/` debe cumplir cinco reglas obligatorias:

1. **Sustentado en Base UI:** Toda la lógica de accesibilidad (ARIA), manejo de foco por teclado y eventos de bajo nivel se delega a una primitiva headless de `@base-ui/react`.
2. **Neutralidad de maquetación:** Tolerancia cero a márgenes exteriores (`m-*`). El componente nunca decide cómo se separa de su entorno; esa responsabilidad pertenece al contenedor padre.
3. **Consumo de tokens propios:** Empleo exclusivo de los tokens semánticos de superficies (`surface-*`), tríadas cromáticas (`*-soft`, `*-base`, `*-bold`) y variables de geometría (`rounded-base`) definidas en `globals.css`.
4. **Introspección por atributos `data-*`:** Declaración explícita de `data-slot`, `data-variant`, `data-size` y estados para pruebas automatizadas y estilos condicionales.
5. **Composición limpia con `clsx`:** Concatenación condicional sin generar strings vacíos o valores booleanos huérfanos.

---

## 2. Definición y extensión de tipos (TypeScript)

El tipado del componente debe partir de la primitiva de Base UI y enriquecerse con las opciones del sistema de diseño:

```tsx
import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

// 1. Tipos literales estrictos para variantes y tamaños
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

// 2. Extensión de las props de la primitiva Base UI
export interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}
```

---

## 3. Matriz de variantes y regla de interacción cromática

Las clases se desacoplan en diccionarios fuertemente tipados (`Record<T, string>`) fuera de la función del componente para evitar recalcular strings en cada render. Se prohíbe el uso de sombras invasivas y de colores no semánticos (`gray-*`) para fondos, delegando las superficies exclusivamente a `surface-*`:

```tsx
const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "border border-transparent bg-primary-base text-white",
    "hover:bg-primary-bold",
    "active:bg-primary-bold"
  ),
  secondary: clsx(
    "border border-gray-base bg-surface-base text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  outline: clsx(
    "border border-gray-base bg-transparent text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  ghost: clsx(
    "border border-transparent bg-transparent text-gray-bold",
    "hover:bg-surface-bold",
    "active:bg-surface-bold"
  ),
  destructive: clsx(
    "border border-error-base bg-error-soft text-error-bold",
    "hover:border-error-base hover:bg-error-base hover:text-white",
    "active:border-error-base active:bg-error-base active:text-white"
  ),
};
```

### Reglas calibradas de interacción
* **Estructura física uniforme:** Todas las variantes comparten un borde base de `1px` (`border`), lo que garantiza dimensiones de caja idénticas y previene saltos métricos o desalineaciones al alternar variantes.
* **`primary` (Sólido de alta jerarquía):** En reposo usa `primary-base` con texto blanco. En hover transiciona a `primary-bold` y en active mantiene `primary-bold` comunicando el clic mediante la compresión táctil `scale-[0.98]`.
* **`secondary` (Superficie base delimitada):** En reposo se asienta sobre `bg-surface-base` con borde estructural neutro `border-gray-base`. En hover y active se eleva a `hover:bg-surface-bold` (blanco iluminado `--gray-50` en modo claro y `--gray-800` en modo oscuro).
* **`outline` y `ghost` (Baja jerarquía):** En reposo son transparentes (`border-gray-base` en outline y `border-transparent` en ghost). Al interactuar en hover y active, se elevan limpiamente a `bg-surface-bold`.
* **`destructive` (Estilo *tinted / soft*):** En reposo combina fondo suave `bg-error-soft`, borde `border-error-base` y texto de alto contraste `text-error-bold`. Al interactuar en hover/active conmuta a relleno sólido `bg-error-base` con texto blanco puro.

---

## 4. Escala de tamaños y proporción óptica

El espaciado horizontal debe escalar en armonía con la altura del control:

```tsx
const sizeStyles: Record<ButtonSize, { default: string; iconOnly: string }> = {
  sm: {
    default: "h-8 px-3 gap-1.5 text-xs",
    iconOnly: "size-8 px-0 text-xs",
  },
  md: {
    default: "h-10 px-4 gap-2 text-sm",
    iconOnly: "size-10 px-0 text-sm",
  },
  lg: {
    default: "h-12 px-6 gap-2.5 text-base",
    iconOnly: "size-12 px-0 text-base",
  },
};
```

* **Detección de botón solo ícono:** Si el componente no recibe `children` pero sí cuenta con `icon` o `loading`, conmuta automáticamente al estilo `iconOnly` para adoptar proporciones estrictamente cuadradas (`size-8`, `size-10`, `size-12`) sin padding lateral sobrante.

---

## 5. Ranuras de íconos y estados integrados

### A. Ranura de íconos escalable
Los íconos no deben tener tamaños rígidos en píxeles que desentonen al cambiar la fuente o el tamaño del botón. Se estandarizan con la regla:
```css
[&_svg:not([class*='size-'])]:size-[1.15em]
```
Esto asegura que cualquier SVG importado (como los de `lucide-react`) escale automáticamente de forma relativa al tamaño de texto del botón (`text-xs`, `text-sm` o `text-base`).

### B. Estado de carga (`loading`) unificado
* Deshabilita la interacción de forma automática (`const isDisabled = Boolean(disabled || loading)`).
* Inyecta el atributo de accesibilidad `aria-busy={loading || undefined}` y `data-loading`.
* Reemplaza de inmediato el ícono o se antepone al contenido utilizando el componente común `<Spinner className="size-[1.15em]" />`.
* Aplica `disabled:pointer-events-none disabled:opacity-50` y `data-[loading]:cursor-wait`.

---

## 6. Estructura anatómica completa (Plantilla canónica)

```tsx
"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import clsx from "clsx";
import { Spinner } from "@/components/own/spinner";

// 1. Tipos
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

// 2. Diccionarios de variantes y dimensiones
const variantStyles: Record<ButtonVariant, string> = { ... };
const sizeStyles: Record<ButtonSize, { default: string; iconOnly: string }> = { ... };

// 3. Componente
export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "start",
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const isIconOnly = !children && Boolean(icon || loading);
  const hasIconSlot = Boolean(icon || loading);

  const iconNode = hasIconSlot ? (
    <span
      data-slot="button-icon"
      className="inline-flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-[1.15em]"
    >
      {loading ? <Spinner className="size-[1.15em]" /> : icon}
    </span>
  ) : null;

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading ? "" : undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center rounded-base font-medium whitespace-nowrap select-none outline-none",
        "transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-150 ease-out",
        "motion-safe:active:not-disabled:scale-[0.98]",
        "focus-visible:ring-2 focus-visible:ring-primary-base data-[variant=destructive]:focus-visible:ring-error-base focus-visible:ring-offset-2 focus-visible:ring-offset-surface-soft",
        "disabled:pointer-events-none disabled:opacity-50 data-[loading]:cursor-wait",
        variantStyles[variant],
        isIconOnly ? sizeStyles[size].iconOnly : sizeStyles[size].default,
        className
      )}
      {...props}
    >
      {iconPosition === "start" && iconNode}
      {children}
      {iconPosition === "end" && !isIconOnly && iconNode}
    </ButtonPrimitive>
  );
}
```
