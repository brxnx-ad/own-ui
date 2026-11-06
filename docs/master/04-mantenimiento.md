# own-ui · Mantenimiento de documentación

> **Objetivo y alcance del documento:** Establecer el estándar de estructura, redacción y criterios de vigencia que rigen a toda la documentación técnica dentro de `docs/master/`. Se considera desactualizado si existen documentos en `docs/master/` que no respeten este formato o si los lineamientos aquí descritos contradicen las prácticas aplicadas en el repositorio.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md)

---

## 1. Estructura canónica de un archivo de documentación

Todo archivo en `docs/master/` debe respetar la siguiente estructura secuencial:

1. **Encabezado principal (`H1`):**  
   Formato: `# own-ui · <Nombre del documento>`.
2. **Bloque de objetivo y alcance:**  
   Un *blockquote* (`>`) ubicado inmediatamente debajo del título principal que define el propósito del archivo y su condición de obsolescencia.
3. **Barra de navegación cruzada:**  
   Enlaces relativos en una sola línea a los demás documentos maestros del proyecto, separados por puntos medios (` · `).
4. **Separador temático:**  
   Una regla horizontal (`---`) antes de comenzar el desarrollo del contenido.
5. **Secciones numeradas (`H2` y subniveles):**  
   Títulos numerados (`## 1. ...`, `## 2. ...`), tablas comparativas y listas directas con lenguaje denso en valor y sin relleno conversacional.

---

## 2. Bloque de objetivo y redacción del estado de vigencia

El bloque de objetivo es obligatorio para todos los archivos maestros y debe responder a dos exigencias formales:

### A. Definición de alcance
Debe delimitar con precisión qué describe el archivo y qué aspectos del sistema quedan cubiertos bajo su responsabilidad.

### B. Criterio de obsolescencia redactado como un ESTADO
La cláusula posterior a la frase obligatoria **`Se considera desactualizado si...`** debe describir un **estado del sistema**, nunca una acción ni un evento temporal.

* **Incorrecto (redacción de evento / acción):**  
  > *Se considera desactualizado si se añade, renombra o elimina una carpeta raíz o cambia la arquitectura.*  
  *(Describe una acción que ocurre en el tiempo, imposible de auditar sin el historial de cambios).*
* **Correcto (redacción de estado verificable):**  
  > *Se considera desactualizado si existen carpetas raíz en el proyecto que no figuren en la tabla, si alguna carpeta listada ya no existe o si la ubicación real de los archivos contradice estas directrices.*  
  *(Describe una condición estática que cualquier agente o desarrollador puede comprobar de inmediato comparando el texto contra el estado actual del repositorio).*

---

## 3. Plantilla de referencia

```markdown
# own-ui · <Título del documento>

> **Objetivo y alcance del documento:** <Descripción concisa del propósito técnico>. Se considera desactualizado si <condición de estado estático y verificable contra el código>.

[Estructura del proyecto](01-estructura-del-proyecto.md) · [Sistema de estilos](02-estilos.md) · [Objetivos](03-objetivos.md) · [Mantenimiento](04-mantenimiento.md)

---

## 1. Primera sección técnica
...
```
