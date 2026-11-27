# Notificación y ficha del cliente en celular

Fecha: 2026-11-26.

Se leyó D:\Prompt Quest\MISION_FLUJO.txt completo, especialmente las secciones 3, 4 y 6, después de la indicación del usuario de revisar otra vez. Los cambios nuevos se limitan a celular; las etapas nuevas se activan en la misión 1.

## Cambios

- Entrada: aviso de correo desde arriba, 400 ms. Incluye remitente, asunto y «toca la notificación». Al tocarlo, sale hacia arriba en 180 ms y abre la bandeja. Con movimiento reducido, no se animan entrada/salida ni se espera el temporizador de salida.
- Bandeja: correo resaltado de La Esquina, nota de Epson_IA de solo lectura y pie «toca el correo del cliente».
- Ficha: iniciales LE en círculo azul, nombre del restaurante y «Te escribió un encargo». La tarjeta completa se puede tocar para abrir el encargo; la flecha vuelve a la bandeja.
- Encargo móvil: burbuja original del cliente y mensaje de Epson_IA en amarillo «Cuando estés listo, abre la terminal». El único botón dentro de la conversación es Iniciar prompt. Mi portafolio se mantiene en la cabecera general.
- En celular, Pedir pista y las pistas de la conversación se ocultan. La acción se conserva en los resultados de la terminal, junto a Volver a intentar.
- El código de laptop mantiene su entrada directa en bandeja y conversación, texto anterior, pistas y dos ventanas. Los elementos nuevos no se muestran allí. Las otras misiones mantienen su navegación previa.

## Verificación

50 pruebas aprobadas con node --test tests/*.test.mjs. Se agregaron casos de orden de etapas, foco, doble toque de notificación, movimiento reducido, entrada de laptop y navegación de misiones siguientes.

Comparación con b9bcfe4: el bloque CSS de laptop, normalize, evaluatePrompt, evaluateWithFallback y src/index.js son idénticos. No se agregaron claves ni almacenamiento persistente.

En navegador se recorrió por controles reales la secuencia completa en 360 × 740 y 390 × 844. Se observaron la notificación, bandeja, círculo LE, encargo y terminal. La duración computada de la entrada es 0.4s. Se verificaron cero botones Pedir pista visibles en conversación, el mensaje corto amarillo e Iniciar prompt abriendo el textarea. En 360 × 740, Ejecutar termina en y=721, dentro de pantalla; el documento mide 360 × 740. En 390 × 844, el documento mide 390 × 844.

En 390 × 844 se ejecutó un prompt flojo (1/6) con el respaldo local y se pidió una pista desde la terminal. Los resultados conservaron los botones Volver a intentar y Pedir pista. No hubo desbordamiento horizontal ni scroll de página.

Regresión en 1366 × 768: ambas ventanas conservan aproximadamente 634 px, los paneles nuevos están ocultos y Pedir pista sigue visible en la conversación de laptop con el texto anterior de Epson_IA. Se revisaron capturas de las pantallas móviles. La prueba fue en navegador, sin teléfono físico ni teclado virtual.
