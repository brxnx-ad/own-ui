# own-ui · Objetivos del proyecto

> **Objetivo y alcance del documento:** Definir el propósito rector del repositorio, los estándares técnicos de construcción de sus componentes y el catálogo de herramientas de UI proyectadas. Se considera desactualizado si la anatomía de los componentes del proyecto o las funcionalidades de la aplicación no corresponden con la arquitectura y los objetivos aquí declarados.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Mantenimiento](04-mantenimiento.md) · [Pendientes](05-pendientes.md)

---

## Los 3 objetivos principales

### 1. Desarrollar una colección de componentes propios sobre Base UI
Construir un catálogo de primitivas de interfaz reutilizables utilizando **`@base-ui/react`** como motor headless de accesibilidad, gestión de foco y comportamiento interactivo, adoptando la arquitectura mecánica de **ShadCN** pero eliminando sus limitaciones:

* **Propagación y tipado de props:** Cada componente extiende las props nativas de la primitiva de Base UI, expone el atributo `data-slot` y propaga limpiamente eventos y atributos HTML (`...props`).
* **Fusión inteligente de clases (`cn`):** Uso combinado de `clsx` (para lógica condicional de estados) y `tailwind-merge` (para garantizar que cualquier clase pasada desde afuera mediante `className` sobreescriba sin conflictos de especificidad).
* **Sistema de variantes tipadas (`cva`):** Definición declarativa de variantes visuales y de densidad con inferencia estática de tipos en TypeScript (`VariantProps`).
* **Nomenclatura propia y neutralidad de maquetación:** A diferencia de ShadCN, los componentes consumen exclusivamente el sistema de superficies (`surface-*`) y tríadas (`*-soft`, `*-base`, `*-bold`) del proyecto, prescindiendo de márgenes externos o dimensiones rígidas forzadas.
* **Organización por dependencias:** La definición pertenece a `components/own/dependant/` si reutiliza otras familias propias o usa un motor externo especializado. La composición elegida por el consumidor se mantiene abierta mediante `children`, `render` y ranuras. El criterio completo se define en [Estructura del proyecto](01-estructura-del-proyecto.md#3-componentes-independientes-y-dependientes).

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
