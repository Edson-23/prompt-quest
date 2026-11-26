# Revisión móvil de Prompt Quest

## Alcance y skills

Se instalaron y leyeron antes de modificar el frontend las skills `frontend-design`, `accessibility-review` y `design-critique`, en `.agents/skills/`. Las fuentes y licencias se conservan en esa carpeta. Se usaron para la composición, la revisión accesible y la crítica del recorrido del principiante, respectivamente.

La consulta auxiliar `modern-web-guidance` aportó las guías `responsive-design`, `form-factor-adaptation` y `accessibility`: altura dinámica, zonas seguras, controles táctiles, foco y semántica. Su biblioteca local queda ignorada en Git.

## Crítica del diseño

El problema principal era de jerarquía: la introducción, el encargo y las instrucciones desplazaban el editor y su acción fuera de la primera pantalla. El terminal y el botón verde ya ofrecían una identidad y una acción reconocibles.

Se conservó esa identidad. Se redujo el encargo sin perder cliente, siete días ni restricciones; se compactaron cabecera y separaciones; la ayuda detallada pasó a un desplegable en resultados. En móvil, el editor ocupa cinco líneas y la barra inferior reserva espacio para Ejecutar. Las pistas se muestran en resultados para no desplazar el editor.

## Verificación con navegador

Dimensiones expresadas en píxeles CSS, comprobadas con `innerWidth` e `innerHeight`. Se calibró la vista previa para compensar el zoom existente del navegador.

| Tamaño | Resultado |
| --- | --- |
| 360 × 740 | Página de 360 × 740, sin scroll horizontal ni vertical del documento. Encargo, editor y botón visibles. El editor mide aproximadamente 136 px; los resultados tienen scroll propio. |
| 390 × 844 | Página de 390 × 844, sin desbordamiento. Barra inferior visible y unos 200 px disponibles para el contenido desplazable de resultados. |
| 1440 × 900 | Página de 1440 × 900, sin desbordamiento. Dos columnas y aproximadamente 613 px de alto para resultados; Ejecutar permanece dentro del editor. |

Se inspeccionaron capturas de móvil y escritorio. Se probaron validación del prompt vacío, evaluación completa con respaldo local, tres pistas y navegación de teclado desde el editor a Ejecutar y al área de resultados. El desplazamiento con teclado afectó a resultados manteniendo `scrollY = 0`. Los botones tienen un mínimo de 45 px y el editor usa 16 px, sin crecimiento ni redimensionado vertical.

## Accesibilidad

Revisión orientada a WCAG 2.1 AA, sin constituir una certificación completa:

- Etiqueta visible y asociada al editor; errores descritos y anunciados.
- Botones HTML nativos y ayuda con `details`/`summary`.
- Zona de resultados nombrada y accesible mediante Tab para poder desplazarla con teclado.
- Indicador de foco visible. No se anuncia el contador por cada pulsación.
- Marcas ✓/✗ acompañadas de estado y explicación, sin depender solo del color.
- Se aumentó el contraste de bordes de controles, manteniendo la paleta terminal.

| Elemento | Contraste |
| --- | --- |
| Texto principal sobre panel | 11.77:1 |
| Texto secundario sobre panel | 7.45:1 |
| Error sobre panel | 5.42:1 |
| Pistas sobre su fondo | 8.48:1 |
| Texto del botón Ejecutar | 12.32:1 |
| Borde del editor sobre su fondo | 4.03:1 |

La versión compacta usa `100dvh` con respaldo `100vh` y espacio reservado para la barra inferior y las zonas seguras. Por debajo de 38 rem de alto se permite scroll del documento para mantener el contenido accesible en vistas muy bajas, zoom o teclado. No se oculta el desbordamiento horizontal para disimular problemas de anchura.

Limitaciones: no se ejecutaron axe, NVDA/VoiceOver ni una prueba con teclado virtual en un teléfono físico. La comprobación adicional de zoom al 200 % quedó interrumpida porque el control del navegador no pudo verificar la URL de la ventana de Windows. No se considera verificada.

## Protección del comportamiento existente

Las 17 pruebas existentes pasan. Se compararon con Git las funciones de evaluación por reglas, petición a Gemini, renderizado, contador y el manejador de envío: se conservaron. `src/index.js` no cambió. Solo se modificaron presentación, textos de interfaz y desplazamiento de la zona de pistas. No se añadió almacenamiento persistente.
