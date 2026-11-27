# Animación de Epson_IA

Fecha: 2026-11-26.

## Imágenes y revisión

Se leyó ONBOARDING.txt del ZIP actualizado, incluidas las secciones 4 y 11. Se aplican las instrucciones del usuario: reposo como respaldo y como cuadro fijo con movimiento reducido.

Herramienta: image_gen integrada, aplicada mediante la skill imagegen. No se instalaron herramientas, librerías ni servicios, ni se usaron claves. Se generó primero el saludo corrigiendo el chaleco; el reposo se editó a partir de ese saludo y el parpadeo a partir del reposo.

Los tres originales se inspeccionaron por separado, comparando contorno, rostro, torso, posición de cabeza y pies, fondo, paleta y texto. «Epson_IA» se lee en los tres cuadros. La mano que estaba alzada en el lado derecho de la imagen se baja en el reposo; el parpadeo conserva esa pose. Se revisaron también las tres versiones finales de 480 px. No se recortó el fondo.

El generador devolvió una diferencia de un píxel de ancho entre originales. Las tres versiones de juego se normalizaron al mismo lienzo de 480 × 268, conservando el encuadre. Los originales generados se conservan sin alterar en assets/originales.

## Optimización

Se utilizó System.Drawing de Windows para reducir con vecino más cercano, preservando el estilo pixel art; después se recomprimieron los bloques IDAT de PNG con zlib nivel 9, sin pérdida adicional de píxeles. No se requirió instalar software.

| Archivo | Original generado | Peso original | Tamaño web | Peso web |
| --- | --- | --- | --- | --- |
| epson_ia_mapache.png | 1679 × 937 | 1 518 772 B | 480 × 268 | 254 019 B |
| epson_ia_mano_abajo.png | 1678 × 937 | 1 613 364 B | 480 × 268 | 262 550 B |
| epson_ia_ojos_cerrados.png | 1678 × 937 | 1 662 369 B | 480 × 268 | 274 778 B |

Frente a los 1 099 391 bytes de la imagen anterior, cada cuadro web pesa entre un 75 % y un 77 % menos. El juego referencia exclusivamente las versiones optimizadas. Los originales no se publican como assets.

## Integración

- Se precargan tres imágenes al ejecutar el script de la portada.
- Cada mensaje inicia un saludo de 800 ms. Volver atrás también cuenta como cambio de mensaje. Un nuevo mensaje cancela los temporizadores anteriores y comienza su propio saludo, sin esperar.
- En reposo se programa el siguiente parpadeo con un intervalo aleatorio entre 3000 y 5000 ms; los ojos se cierran 150 ms. No se superponen con el saludo.
- Al terminar la bienvenida, se cancelan los temporizadores y se vuelve al reposo. También se pausan los cambios al ocultar la pestaña.
- prefers-reduced-motion se consulta y se escucha en tiempo real: reposo fijo, sin saludo ni parpadeo.
- Un error de cualquier cuadro cancela la animación y usa reposo. Si falla el propio reposo, hay una copia de emergencia de 160 × 89 incluida en el HTML (34 797 bytes PNG, unos 46 KB en base64). Así no depende de otra petición y no aparece un icono roto. Si el navegador tampoco puede decodificar esa copia, se oculta únicamente la imagen y la conversación sigue disponible.
- Sin cambios en CSS, dimensiones aprobadas de visualización (200 px móvil / 240 px escritorio), evaluación, Gemini ni almacenamiento. No hay claves nuevas.

## Verificación

45 pruebas aprobadas con node --test tests/*.test.mjs. Pruebas nuevas: precarga, tiempos exactos con reloj simulado, avance rápido, salida de bienvenida, reducción de movimiento, cambios de preferencia, errores de cuadro/reposo, carga lenta, pestaña oculta, dimensiones y pesos de los seis PNG.

En navegador, 390 × 844: saludo al abrir y al cambiar de mensaje; reposo; parpadeos observados de 149 y 154 ms, separados por aproximadamente 3,5 segundos de reposo; dos pulsaciones consecutivas avanzan hasta el tercer mensaje sin esperar. Sin overflow horizontal.

En 1366 × 768: se observó el cambio de saludo a reposo, imagen de 240 px y ancho de documento de 1366 px. Se inspeccionó una captura de bienvenida. Al salir, src queda en epson_ia_mano_abajo.png y se muestra el editor inmediatamente. Sin cambios en composición ni desbordamientos horizontales.

La preferencia de movimiento reducido y los errores se verificaron mediante pruebas automatizadas con dependencias controladas; no se cambió la configuración del sistema del usuario. No se probó en teléfono físico.

## Prompts de generación

1. Editar la imagen actual; mantener fondo, pose, encuadre, identidad, pixel art y contorno cian. Cambiar solo «EPSON» por el texto exacto y sensible a mayúsculas «Epson_IA», con guion bajo visible y tipografía de píxeles cian. Sin otros textos.
2. Editar el cuadro de saludo generado: bajar únicamente el brazo que aparece a la derecha del espectador, dejando la mano junto a la cadera. Mantener cabeza, ojos abiertos, torso, cola, pies, chaleco, texto «Epson_IA», fondo y encuadre. Reconstruir el fondo donde estaba el brazo elevado.
3. Editar el cuadro de reposo: cambiar únicamente los dos ojos por líneas de párpados cerrados para un parpadeo suave. Mantener ambos brazos, cara salvo los párpados, contorno, postura, fondo, encuadre y texto exacto «Epson_IA».
