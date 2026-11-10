# own-ui · Objetivos del proyecto

> **Objetivo y alcance del documento:** Definir el propósito rector del repositorio, los estándares técnicos de construcción de sus componentes y el catálogo de herramientas de UI proyectadas. Se considera desactualizado si la anatomía de los componentes del proyecto o las funcionalidades de la aplicación no corresponden con la arquitectura y los objetivos aquí declarados.



---

## Los 3 objetivos principales

### 1. Desarrollar una colección de componentes propios
Construir un catálogo de componentes reutilizables. Las familias de `base/` delegan la accesibilidad, la gestión del foco y el comportamiento interactivo a `@base-ui/react`. El catálogo admite también componentes nativos, compuestos y basados en librerías especializadas.

* **Props y semántica.** El tipado parte de la primitiva o del elemento HTML correspondiente. Las piezas exponen `data-slot` y propagan los eventos y atributos que admite su API.
* **Composición de clases.** `components/own/classes.ts` usa `clsx` y permite que un `text-content-*` posterior sustituya colores de texto reconocidos con el mismo prefijo de variantes. Los demás conflictos dependen de la cascada; consulta los límites en la referencia de estilos de la skill.
* **Variantes tipadas.** Las familias que exponen variantes o tamaños definen sus valores con tipos de TypeScript y usan diccionarios de clases cuando corresponde.
* **Neutralidad de maquetación.** Los componentes usan las superficies y tríadas semánticas del proyecto. El consumidor controla la separación exterior.
* **Organización por dependencias.** La definición determina la categoría `simple/`, `base/`, `composed/` o `dependant/`. El criterio completo se detalla en Estructura del proyecto.

---

### 2. Servir como Showcase interactivo y guía de diseño
Centralizar en una aplicación viva tanto las directrices visuales compartidas entre proyectos (tipografía, elevación por superficies, sombras cenitales/hundidas y tríadas cromáticas) como el catálogo interactivo de componentes:

* Visualización en tiempo real de todas las variantes, estados interactivos (`hover`, `focus-visible`, `active`, `disabled`) y adaptación entre modo claro y modo oscuro.
* Fuente de verdad práctica para copiar, auditar y evolucionar los componentes antes de llevarlos a proyectos de producción.

---

### 3. Recopilar utilidades y herramientas de UI
Integrar herramientas interactivas que agilicen el diseño y mantenimiento del sistema visual en nuevos proyectos:

* **Visor y generador de paletas en base a semillas (primera utilidad proyectada):** Una herramienta interactiva que permita ajustar semillas en espacio **OKLCH**, previsualizar en vivo la escala generada (`50`–`950`) y las tríadas resultantes (`soft`, `base`, `bold`) en ambos temas, y exportar directamente el bloque CSS listo para pegar en `globals.css`.
* Espacio abierto para incorporar futuras herramientas de calibración visual (probadores de contraste, generadores de sombras cenitales y escalas tipográficas).
