# Revisión del flujo de misión estilo computadora

Fecha: 2026-11-26.

## Alcance y decisiones

Se aplicó la nueva presentación: correo, conversación, editor de terminal y resultado dentro de la misma terminal. Se eliminaron la hoja inferior, el aviso flotante y el contenedor separado del resultado. La portada, la bienvenida animada, la reputación y el portafolio se conservan.

No se agregaron clientes ni misiones. Las misiones 2 y 3 que ya existían se conservaron, junto con sus datos, progresión y evaluación. El cambio se comprobó especialmente con la misión 1. Se mantuvo su encargo aprobado, incluyendo platos económicos y sin gluten; no se usó la frase confusa «los clientes vienen sin gluten».

Todos los textos nuevos están en CONTENT.es.ui y el asunto del primer correo en su objeto de misión. El progreso, los prompts previos, las pistas y el portafolio viven solo en memoria. Los prompts se insertan como textContent, incluido el historial.

## Presentación

- Mobile first: cada herramienta ocupa la ventana de trabajo. Fondo de terminal #010409, borde #30363d, resumen amarillo #e3b341, éxitos #7ee787 y errores #f85149.
- El juego usa 100dvh. Los botones quedan fuera del área desplazable; el contenido largo de conversación y terminal tiene scroll propio.
- Textarea de 152 px aproximadamente, seis líneas a 16 px, cursor verde nativo al escribir. La evaluación muestra $ evaluando… y deshabilita solamente el envío.
- El resultado oculta el editor y muestra el prompt enviado, $ resultados, puntuación, seis criterios y retroalimentación de los criterios faltantes. El nuevo resultado sustituye al anterior. Volver a intentar conserva el texto y permite comparar los prompts anteriores en un historial desplegable.
- Pedir pista funciona en conversación y resultado, con tres pistas compartidas por misión. Continuar conserva la progresión existente.
- Desde 768 px, dos ventanas de al menos 360 px y menos de la mitad del viewport: correo y conversación a la izquierda, terminal a la derecha.
- El segundo mensaje aparece tras 600 ms. Tocar la conversación o pulsar Enter/Espacio la revela inmediatamente. El avance a la terminal nunca espera ese temporizador. Con movimiento reducido, el mensaje aparece inmediatamente.
- Animaciones opcionales de entrada del correo (300 ms) y líneas de contexto (180 ms con 200 ms entre líneas), solo sin preferencia de movimiento reducido.

Se aplicaron los criterios de frontend-design, accessibility-review y design-critique del repositorio. Botones y flechas de al menos 45 px, foco visible, orden de lectura y teclado, enlace para saltar al área de trabajo, nombres accesibles de ventanas y desplazamiento independiente. No se presenta como certificación completa de accesibilidad.

## Verificación automatizada

46 pruebas aprobadas: evaluación, API, errores, cuota, animación de Epson_IA, progresión, portafolio y nuevo flujo. Las pruebas de la antigua hoja se sustituyeron por navegación de etapas, foco, conservación y separación del historial, pistas compartidas, resultados durante la consulta del portafolio y revelado inmediato de conversación.

Comparación con b2b985a: normalize, evaluatePrompt, evaluateWithFallback y src/index.js permanecen sin cambios. El servidor real está en src/index.js; functions/api/evaluar.js no existe en esta arquitectura. Solo se modificó la presentación del resultado y la retroalimentación visible, sin cambiar la decisión de aprobación.

## Navegador

| Tamaño CSS | Comprobación |
| --- | --- |
| 390 × 844 | Correo, apertura, conversación, pista, terminal y resultado. Documento 390 × 844 sin scroll de página ni overflow horizontal. Textarea de 152 px y 16 px de letra. Ejecutar termina en y=825, dentro de la pantalla. |
| 390 × 844 | Prompt flojo de menú: 1/6; resultado dentro de terminal, editor oculto, feedback y pista accesibles con scroll interno (contenido de 1284 px). Volver a intentar recupera el texto. Prompt completo: 6/6; resultado sustituido y prompt anterior conservado en historial. Continuar visible al pie. |
| 1366 × 768 | Dos ventanas de aproximadamente 634 px, final en y=757. Documento 1366 × 768; sin overflow horizontal o vertical de página. |
| 1440 × 900 | Ambas ventanas completas, final en y=888. Sin texto desbordado. Se inspeccionaron capturas del resultado y conversación; el portafolio abre y regresa al estado de resultado. Continuar conserva la misión 2 existente y limpia la vista anterior. |
| 768 × 1024 | En el punto de quiebre, ambas ventanas miden aproximadamente 362 px. Sin overflow horizontal. |

La evaluación local devolvió 503 al no tener secretos y el juego continuó por reglas. Los recorridos validaron la versión floja y la aprobada sin errores técnicos para el jugador. No se probó en teléfono físico, con teclado virtual ni lector de pantalla.

## Commits por paso

1. Correo de entrada y navegación inicial de misión.
2. Conversación del cliente antes de iniciar el prompt.
3. Editor de prompt dentro de la terminal.
4. Resultados en terminal con reintentos e historial en memoria.
5. Ventanas de correo y terminal en laptop.
6. Transiciones accesibles, documentación y verificación final.
