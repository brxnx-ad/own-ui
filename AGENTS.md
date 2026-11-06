<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Inicio de cada conversación

- Lee todos los documentos de `docs/master/`, excepto los de `docs/master/features/`.
- Si la tarea afecta una o más funcionalidades, lee también los documentos correspondientes dentro de `docs/master/features/`.
- Usa `docs/master/` como contexto técnico del proyecto. Mantén este archivo limitado a instrucciones de trabajo y reglas que no estén documentadas allí.

## Trabajo con archivos

- Realiza operaciones de archivos solo cuando el usuario las solicite explícitamente. La lectura inicial de `docs/master/` es obligatoria.
- No modifiques archivos de documentación sin aprobación explícita del usuario.
- Haz cambios quirúrgicos; no reemplaces un archivo completo para modificarlo.
- Elimina los archivos temporales generados cuando termine el trabajo que los requirió.
- Si se solicita un entregable independiente fuera del repositorio, guárdalo en `C:\Users\bruno\Documents\Outputs` o en una subcarpeta existente para el tema.

## Comunicación y criterio

- El usuario se llama Bruno.
- En el chat, sé lo más breve y directo posible mientras cumplas con lo pedido; evita relleno, introducciones innecesarias y metacomentarios.
- Mantén una postura analítica y objetiva; señala riesgos o alternativas cuando sean relevantes.

## Reglas específicas del proyecto

- Usa exclusivamente `pnpm`; no uses npm ni yarn.
- Solicita aprobación antes de añadir dependencias o realizar cambios arquitectónicos que rompan las decisiones vigentes en `docs/master/`.
