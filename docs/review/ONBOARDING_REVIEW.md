# Revisión de bienvenida y presentación

> Revisión histórica: documenta una versión anterior y no define el diseño vigente. Consultar [GAME_DESIGN.md](../../GAME_DESIGN.md). Las referencias a hojas de resultados, columnas o imágenes anteriores son evidencia de esa revisión, no requisitos actuales.

Fecha: 2026-11-26.

## Alcance aplicado

Se implementaron las partes aprobadas de ONBOARDING.txt: portada con una acción, bienvenida de tres mensajes, encargos con voz propia, pistas firmadas por Epson_IA, reacciones de clientes, reputación simple, portafolio y graduación. Se aplicó la aclaración del usuario: Epson_IA es quien da la bienvenida; los clientes son personajes distintos.

Se conservaron el encargo original del restaurante (incluido el requisito económico), las tres misiones y sus criterios. Se acortaron los textos de bienvenida y graduación para móvil. La imagen es idéntica a la del ZIP, SHA-256 8dd8e084c1ebde33a2ae363971c5e0b7bf169e36571f45d27fa35617121abe7b. No se recortó, recoloreó ni editó el chaleco. Solo el juego y esa imagen se permiten como assets.

## Diseño y accesibilidad

Skills leídas: frontend-design, accessibility-review y design-critique. Se mantuvieron el fondo #0d1117, verde #7ee787, azul #79c0ff, rojo #f85149 y monoespaciada. El título verde y la acción inferior identifican la portada. El marco verde integra el fondo original del personaje.

La bienvenida funciona sin esperar a que termine de cargar la imagen. Botones nativos de al menos 45 px, acción principal de presentación de 52 px, imagen con descripción, foco trasladado al título al cambiar de pantalla y textos de portafolio insertados con textContent. Las animaciones duran 220 ms y respetan prefers-reduced-motion. No se implementaron sonidos, que eran opcionales.

El portafolio usa detalles desplegables para revisar cada trabajo sin una lista interminable abierta. Se puede volver a los encargos sin perder el editor, progreso ni evaluaciones. La graduación requiere las tres misiones completadas. Los fallos no eliminan un trabajo aprobado y cada nueva sesión comienza sin trabajos.

## Verificación

- 39 pruebas aprobadas: evaluación, respaldo, API, cuota, navegación de la hoja, variantes por misión y portafolio. Las pruebas del portafolio incluyen fallos, sustitución por un nuevo trabajo aprobado, separación por misión y reinicio de sesión; se comprueba texto literal y la integridad de la imagen.
- Comparación con el commit 2fb3a49: normalize, evaluatePrompt, evaluateWithFallback y src/index.js permanecen sin cambios.
- Wrangler deploy --dry-run aprobado. `.assetsignore` actualizado para permitir únicamente index.html y la imagen.
- 390 × 844: portada con una acción y sin editor; bienvenida con Atrás/Siguiente; portafolio vacío; intento flojo y corrección con la hoja abierta; secuencia de las tres misiones; revisión del primer prompt y referencia completos; reacciones de clientes; graduación con tres trabajos; regreso al juego. Sin overflow horizontal.
- 1366 × 768: portada y bienvenida centradas, máximo 480 px; graduación centrada; juego en dos columnas. Se corrigió el espacio vertical para mostrar Ejecutar completo. Se revisaron capturas de las pantallas.
- 360 × 740: hoja de aproximadamente 518 px (70dvh), comienza en y=222; Ejecutar termina en y=215. El consejo breve de Epson_IA se ve al principio del scroll, seguido por los criterios. Sin overflow horizontal.
- El servidor local sin secretos devolvió 503 y el juego permitió completar todo usando el respaldo por reglas. La evaluación con Gemini conserva su contrato y pruebas previas; no se requieren claves nuevas.

Durante la revisión se corrigieron el selector del botón Ejecutar (ahora acotado al formulario frente a las nuevas acciones de portada), la lectura del consejo en móvil y un corte vertical de escritorio. También se normalizaron los finales de línea en la prueba de assets para Windows. No quedan fallos conocidos en los recorridos verificados. No se probó en teléfono físico, teclado virtual ni lector de pantalla; no es una certificación de accesibilidad.
