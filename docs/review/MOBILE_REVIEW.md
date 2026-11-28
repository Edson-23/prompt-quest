# Revisión de la hoja móvil de Prompt Quest

> Revisión histórica: documenta una versión anterior y no define el diseño vigente. Consultar [GAME_DESIGN.md](../../GAME_DESIGN.md). Las referencias a hojas de resultados, columnas o imágenes anteriores son evidencia de esa revisión, no requisitos actuales.

Fecha: 2026-11-25.

## Skills y criterio de diseño

Se aplicaron las skills del repositorio frontend-design, accessibility-review y design-critique, leídas antes de editar. Se conserva el estilo terminal de GAME_DESIGN.md: fondo #0d1117, monoespaciada, éxito #7ee787 y error #f85149.

Se consultaron las guías modern-web-guidance `dialog` y `responsive-design`. Reglas aplicadas: “The page stays interactive and is not made inert.” y “Use dynamic viewport units”. El diálogo no modal permite corregir el prompt mientras se consulta el resultado.

## Cambios

- La hoja abierta mide 70dvh. El editor se compacta en los 30dvh superiores, con texto de 16 px y Ejecutar completamente visible. La cabecera y el encargo se ocultan temporalmente mientras la hoja está abierta; vuelven al cerrarla.
- X en la esquina superior derecha, con nombre accesible Cerrar resultado y área de 45 × 45 px.
- Resumen grande fijo sobre la lista de criterios. Los símbolos y el color distinguen cumplimiento y errores.
- Los criterios, su retroalimentación, el resumen explicativo, las pistas y la respuesta comparten scroll interno, sin truncar textos.
- Editar conserva la hoja y el resultado anterior, con aviso de que debe ejecutarse de nuevo. Reejecutar actualiza esa misma hoja. Se mantiene el aviso Ver resultado cuando la hoja está cerrada.
- Desde 768 px se conserva la composición en dos columnas y el orden original de los resultados. No se modificaron las reglas de evaluación ni src/index.js (servidor actual de Gemini). No existe functions/api/evaluar.js en esta arquitectura.

## Verificación visual y geométrica

Navegador Brave, dimensiones CSS verificadas con innerWidth/innerHeight; se compensó su zoom de 90 % al configurar el tamaño.

| Pantalla | Resultado | Verificación |
| --- | --- | --- |
| 360 × 740 | 6 / 6 | Hoja de 518 px, comienza en y=222. Ejecutar termina en y=215 y mide 45 px. Editor de 109 px, editable. Captura revisada. |
| 360 × 740 | 2 / 6, retroalimentación y pista | Contenido de 1285 caracteres, scroll de 1237 px en área de 400 px. Se alcanzó el final con teclado. Sin texto desbordado horizontalmente. Capturas del inicio y final revisadas. |
| 390 × 844 | 2 / 6, retroalimentación y pista | Hoja de aproximadamente 591 px, comienza en y=253. Ejecutar termina en y=246. Editor de 140 px. Scroll de 1176 px en área de 473 px, final alcanzable. |
| 390 × 844 | 6 / 6 | Se editó y reejecutó con la hoja abierta. Criterios anteriores conservados durante la edición, aviso visible en el contenido y puntuación actualizada al finalizar. Captura revisada. |
| 1366 × 768 | 6 / 6 | Dos columnas de aproximadamente 582 px, mismo resultado trasladado a desktop-results; hoja cerrada y resumen móvil oculto. |

En ambas pantallas móviles documentElement.scrollWidth coincide con el ancho de pantalla. Los párrafos, criterios y respuesta no exceden horizontalmente sus cajas. No se limita la retroalimentación por número de líneas. La pista completa permanece en el contenido desplazable. El resultado corto se refiere al estado de aprobación; su respuesta de referencia también puede desplazarse.

Se verificaron la apertura por Ver resultado, cierre por X, acceso al editor con la hoja abierta y actualización de resultados sin cerrarla. Se ejecutaron 24 pruebas de frontend, presentación y Worker: todas aprobadas, incluido el respaldo sin Popover y cambio de móvil a escritorio. Comando: node --test tests/*.test.mjs.

La verificación local usó el evaluador de respaldo, sin claves ni consumo de Gemini. No se probó en un teléfono físico, con su teclado virtual ni con un lector de pantalla.
