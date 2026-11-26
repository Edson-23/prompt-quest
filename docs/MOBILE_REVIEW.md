# Revisión del diseño responsivo de Prompt Quest

Fecha: 2026-11-25.

## Skills aplicadas

Se leyeron antes de modificar el código las skills del repositorio `frontend-design`, `accessibility-review` y `design-critique`. La primera orientó la composición terminal; la segunda, foco, controles y desplazamiento; la tercera, la separación del trabajo de escribir y de revisar el resultado. Se conserva el fondo #0d1117, la tipografía monoespaciada y la paleta del documento de diseño.

La consulta `modern-web-guidance` aportó `dialog`, `persistent-toast-notifications` y `responsive-design`: panel no modal, aviso persistente, cierre explícito, anuncio accesible y altura dinámica.

## Diseño final

- Menos de 768 px: cabecera y misión centradas en un único bloque vertical. Ejecutar va debajo del editor, dentro del bloque. El editor conserva cinco líneas y texto de 16 px.
- Al terminar una evaluación se muestra un aviso con el número real de criterios cumplidos y la acción Ver resultado. No toma el foco ni se oculta por un temporizador. Se puede cerrar; Ver último resultado permite volver a abrir el resultado.
- La hoja inferior usa `dialog` con `popover=manual`, sin bloquear el resto del juego. Se posiciona debajo de Ejecutar según la geometría actual del botón, por lo que en los tamaños verificados el botón permanece completo y utilizable. Los criterios, las explicaciones y la referencia tienen scroll propio.
- Cerrar y Escape cierran la hoja. El foco vuelve a un acceso visible al resultado. Las pistas abren esa misma hoja y se conservan después de evaluar.
- Desde 768 px: dos columnas, encargo/editor/acción a la izquierda y resultado a la derecha. No hay aviso ni hoja visibles. Se traslada el mismo nodo del resultado entre contenedores, conservando contenido y evitando identificadores duplicados.
- Sin soporte nativo para Popover, hay un respaldo con diálogo no modal y posicionamiento fijo, sin dependencias ni conexión a internet.

## Verificación en navegador

Las dimensiones se comprobaron con `innerWidth` e `innerHeight`, compensando el zoom del 90 % que tenía el navegador. Se inspeccionaron capturas de los cuatro tamaños.

| Tamaño CSS | Diseño | Comprobación |
| --- | --- | --- |
| 360 × 740 | Una columna y hoja inferior | Documento de 360 × 740, sin overflow horizontal. Ejecutar termina aproximadamente en y=571 y la hoja comienza en y=583, dejando el botón entero visible. El resultado se desplaza dentro de la hoja. |
| 390 × 844 | Una columna y hoja inferior | Documento de 390 × 844, sin overflow horizontal. Hoja debajo de Ejecutar, con más espacio de lectura y controles de cerrar/reabrir operables. |
| 768 × 1024 | Dos columnas desde el punto de quiebre | Documento de 768 × 1024. Resultado trasladado a la columna derecha, conservando la evaluación; aviso y hoja cerrados. |
| 1366 × 768 | Dos columnas | Documento de 1366 × 768. Ejecutar visible, editor de 16 px y controles de 45 px. Sin desbordamiento horizontal ni textos que excedan su caja. |

La comprobación de texto excluye únicamente la región de anuncio intencionalmente oculta visualmente para lectores de pantalla. El recorte vertical de resultados se resuelve mediante su scroll, manteniendo todo el contenido accesible.

Se probaron prompts incompletos (aviso 1 de 6) y completos (6 de 6), apertura del resultado, cierre y reapertura, cierre con Escape, foco visible, desplazamiento mediante teclado, pistas y cambio de tamaño con la hoja abierta. El resultado permaneció disponible al cruzar el punto de quiebre. No se consumió cuota de Gemini: la vista local no tiene secretos y utilizó el respaldo.

Dos intentos de captura agotaron el tiempo de espera de la herramienta; al repetirlos se obtuvieron las imágenes y se completó la revisión. No se hizo una prueba en un teléfono físico ni con NVDA/VoiceOver; no se presenta como una certificación completa de accesibilidad.

## Pruebas y límites del cambio

Pasan 23 pruebas: las 17 existentes de frontend/backend y 6 de las transiciones del aviso y la hoja. Las nuevas verifican aviso posterior a la evaluación, conteo recibido, cierre/reapertura, descarte sin perder el resultado, limpieza al editar, traslado entre contenedores y respaldo sin Popover.

Se compararon con la versión anterior las funciones `normalize`, `evaluatePrompt`, `evaluateWithFallback`, `renderCriteria` y `updateEditor`: no cambiaron. La llamada adicional `presentResult(count)` solo recibe el conteo ya calculado y actualiza la presentación. `src/index.js`, donde realmente vive Gemini en esta arquitectura, permanece intacto. No existe `functions/api/evaluar.js` en este Worker. No se incorporó almacenamiento persistente ni secretos.
