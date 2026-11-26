# Verificación de misiones y progresión

Fecha: 2026-11-25.

Antes de editar, las 24 pruebas existentes pasaron. El endpoint publicado de la misión 1 devolvió una evaluación real de Gemini: rol, contexto, objetivo, formato y restricciones aprobados, ejemplo opcional no detectado.

## Implementación

- Textos y patrones en CONTENT.es, con un objeto por misión dentro de missions.
- Secuencia bloqueada 1 → 2 → 3, botón Siguiente misión y resumen final de habilidades.
- Progreso en Set en memoria; recargar vuelve a misión 1 y cero completadas. No se usan localStorage ni sessionStorage.
- Cada misión determina sus obligatorios; el resumen usa su número real (3, 3 y 4).
- Cambio de misión limpia el editor, las pistas, errores y resultados anteriores; conserva progreso y límites globales de solicitudes. Caché diferenciada por misión y prompt.
- El Worker actual está en src/index.js, no en functions/api/evaluar.js. Se amplió únicamente el catálogo de confianza y la selección/descripción de la misión para Gemini. Se conservaron el contrato de seis criterios, proveedor, validaciones, tiempos de espera, cuota y tratamiento de errores. No se añadieron secretos.

## Pruebas automatizadas

node --test tests/*.test.mjs: 37 pruebas aprobadas.

- Prompt flojo y bueno de cada misión en modo simulado.
- Al menos tres expresiones españolas por criterio, en las tres misiones: 54 comprobaciones de variantes.
- Todos los obligatorios necesarios y los opcionales no bloquean la aprobación, usando respuestas de Gemini simuladas.
- Desconexión, 429 de cuota y 503 de servidor: siguen evaluando por reglas.
- Encargo y obligatorios de confianza en el servidor; el cliente no puede reemplazarlos.
- Bloqueo de saltos y avance durante una petición, caché por misión, reinicio de progreso en una sesión nueva.
- Pruebas anteriores de seguridad, API, límites y presentación móvil conservadas.

Wrangler deploy --dry-run validó el empaquetado. Las pruebas reales posteriores a la publicación se informan por separado del proveedor simulado de estas pruebas unitarias.

## Navegador

390 × 844: secuencia completa 1 → 2 → 3. En misión 2, «Ayúdame con un correo» obtuvo 1/6 y no desbloqueó el avance; el prompt completo obtuvo 6/6. En misión 3, «Dime algo de historia» obtuvo 0/6 y el prompt con contexto, resumen, viñetas y ejemplo obtuvo 5/6, aprobando sin exigir rol opcional. Resumen final visible y accesible con scroll. La hoja conserva 70dvh (aproximadamente 591 px), Ejecutar termina en y=246, por encima de la hoja en y=253.

1366 × 768: misiones 2 y 3 con dos columnas de aproximadamente 582 px. Se revisaron capturas, el encargo largo y una pista de la tienda. El resultado se conserva al cruzar de móvil a escritorio. Sin texto desbordado ni overflow horizontal en ambos tamaños.

La prueba local de navegador usó deliberadamente el servidor sin clave: respondió 503 y el juego completó las tres misiones mediante el respaldo. El botón de avance, la cabecera y los chips cambiaron a la misión correcta, limpiando las pistas anteriores. No se modificó CSS. No se probó en teléfono físico ni con lector de pantalla.
