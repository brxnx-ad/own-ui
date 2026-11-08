# Alert

## 1. Identificación

Alert compone contenedores HTML nativos y usa `clsx` para aplicar las clases de la variante.

## 2. Propósito y casos de uso

Presenta avisos contextuales persistentes, confirmaciones o errores junto al contenido relevante. Incluye la acción que el consumidor necesite, como un enlace para revisar los detalles. Para solicitar una decisión modal, usa [Alert Dialog](../base/alert-dialog.md).

## 3. Importación y anatomía

```tsx
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/own/simple/alert";

<Alert variant="info">
  <AlertTitle>Mantenimiento programado</AlertTitle>
  <AlertDescription>El servicio estará en pausa el domingo.</AlertDescription>
  <AlertAction><a href="#horarios">Ver horarios</a></AlertAction>
</Alert>
```

| Pieza | HTML | Responsabilidad |
| :--- | :--- | :--- |
| `Alert` | `div` | Envuelve el icono opcional y agrupa el contenido recibido. |
| `AlertTitle` | `div` | Título visual. |
| `AlertDescription` | `div` | Texto, enlaces u otro contenido explicativo. |
| `AlertAction` | `div` | Agrupa acciones elegidas por el consumidor. |

El módulo también exporta `AlertProps` y `AlertVariant`. Las tres piezas de contenido son opcionales y se colocan como hijos de `Alert`.

## 4. Variantes y tamaños

`variant` usa `default` de forma predeterminada. Combina `surface-base` con borde `gray-base`. `info`, `success`, `warning` y `destructive` usan el fondo `*-soft` y el borde `*-base` de `info`, `success`, `warning` y `error`, respectivamente. Todas mantienen el texto en `gray-bold` y la misma geometría. La familia carece de prop de tamaño.

## 5. Props y callbacks

| Pieza | Prop o callback | Tipo | Predeterminado | Opcional | Función y condiciones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Alert` | `variant` | `AlertVariant` | `default` | Sí | Elige el par de fondo y borde. |
| `Alert` | `icon` | `ReactNode` | — | Sí | Icono decorativo que se monta si el valor es distinto de null y undefined. |
| `Alert` | `role` | `AriaRole` | — | Sí | Define la semántica cuando el aviso requiere un anuncio dinámico. |
| `Alert` | Props HTML y `ref` | `ComponentPropsWithRef<"div">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. Excluye `dangerouslySetInnerHTML`. |
| `AlertTitle`, `AlertDescription`, `AlertAction` | Props HTML y `ref` | `ComponentPropsWithRef<"div">` | — | Sí | Incluye `children`, `className`, `style`, atributos y eventos nativos. |

Los eventos son los del elemento HTML correspondiente. La familia carece de callbacks propios.

## 6. Funcionamiento y estados

La variante se resuelve en cada render y se refleja en `data-variant` de `data-slot="alert"`. Los hijos se montan dentro del `div` interno `alert-content`. El `span` `alert-icon` se monta cuando se proporciona `icon` y lleva `aria-hidden="true"`. Las piezas públicas restantes exponen `alert-title`, `alert-description` y `alert-action` como `data-slot`. El consumidor controla la aparición y retirada del mensaje y cualquier acción.

## 7. Estilos admitidos por pieza

- **Alert** usa flex horizontal, `min-w-0`, `gap-3`, `px-4`, `py-3`, un borde y `rounded-base`. El icono conserva su ancho y escala SVG sin clase que contenga `size-` a `1.15em`. `alert-content` ocupa el espacio restante y apila los hijos con `gap-1`.
- **AlertTitle** usa `h5` y permite partir palabras largas. **AlertDescription** usa `body-sm`, admite saltos de palabra y subraya enlaces descendientes. **AlertAction** permite envolver acciones con `gap-2` y agrega `pt-2`.
- Las piezas internas se ajustan con selectores dirigidos a sus slots. La familia carece de sombras, animaciones y prop `render`.

Cada pieza pública admite `className` de tipo `string` y `style` como objeto CSS en su nodo. `clsx` concatena las clases y la cascada determina el resultado cuando se contradicen. Las props HTML y `ref` llegan al nodo correspondiente. Consulta [los estilos compartidos](../../globals.md) para los tokens por tema. El consumidor decide la separación exterior.

## 8. Ejemplos de composición

```tsx
"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/own/simple/alert";

export function SaveNotice() {
  const [message, setMessage] = useState("");
  return (
    <>
      <button type="button" onClick={() => setMessage("Preferencias guardadas.")}>
        Guardar preferencias
      </button>
      <Alert role="status" variant="success">
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </>
  );
}
```

## 9. Accesibilidad e integración

Mantén montada la región `role="status"` antes de actualizar su texto en un aviso no urgente. Reserva `role="alert"` para mensajes urgentes. La variante es visual. Expresa el estado con texto y mantén `icon` decorativo, sin controles enfocables dentro. Las acciones conservan el teclado y el foco de sus propios elementos. Si necesitas un encabezado semántico, aporta un `h2`–`h6` como contenido del título.

## 10. Límites y verificación

Comprueba anuncios con la tecnología asistiva del destino, contraste en ambas apariencias y envoltura del texto y las acciones en pantallas estrechas. El archivo exportable es `alert.tsx`. Las acciones y los iconos que aporte el consumidor conservan sus propias dependencias.
