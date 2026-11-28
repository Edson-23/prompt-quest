# Prompt Quest: documento de diseño (MVP)

Este archivo es la única fuente de verdad del diseño y la mecánica. Los detalles de `docs/specs/` lo complementan sin reemplazarlo; las notas de `docs/review/` son evidencia histórica y no requisitos vigentes.

## 1. Resumen

Prompt Quest es un juego web para aprender a escribir prompts y a entender cuándo conviene una agent skill. El jugador asume el rol de aprendiz en una agencia que resuelve encargos de clientes usando IA. Cada misión es un cliente con una necesidad real, y el jugador debe escribir un prompt que la resuelva. El juego evalúa el prompt con criterios claros y explica qué faltó y por qué.

## 2. Público

- Principiantes absolutos y estudiantes.
- No necesitan saber programación ni tener experiencia previa con IA.
- Deben poder jugar sin registrarse ni instalar nada.

## 3. Objetivos de aprendizaje

Al terminar el juego, el jugador debe poder:

1. Dar un rol claro a la IA.
2. Entregar contexto suficiente (quién es el cliente, qué necesita, para quién).
3. Definir un objetivo concreto y medible.
4. Pedir un formato de salida específico.
5. Poner restricciones (lo que no debe hacer o incluir).
6. Usar ejemplos para guiar la respuesta.
7. Identificar cuándo una tarea repetible merece una skill en lugar de un prompt suelto.

## 4. Idioma y estilo visual

**Idioma:** el juego se desarrolla primero completo en español. Una vez terminado y probado, se traduce al inglés. Todos los textos (encargos, pistas, criterios, retroalimentación y respuestas de referencia) se guardan separados del código para facilitar la traducción. Además, cada criterio de evaluación tiene su propia lista de palabras clave en cada idioma. Al final, el jugador podrá cambiar de idioma desde la cabecera.

**Estilo visual:** estilo terminal. Elegido por ser fácil de construir y tener personalidad.

Estilo terminal: fondo oscuro tipo consola, tipografía monoespaciada, colores sobrios y marcas de ✓ y ✗ para los criterios. Se mantiene simple para que sea fácil de construir y legible en pantallas pequeñas.

Paleta sugerida (modo oscuro):
- Fondo: `#0d1117`
- Bordes: `#30363d`
- Texto: `#c9d1d9`
- Éxito: `#7ee787`
- Error: `#f85149`
- Pistas y avisos: `#e3b341`
- Títulos y cliente: `#79c0ff`

## 5. Mecánica principal

1. El jugador lee el encargo del cliente.
2. Escribe su prompt en el editor de texto.
3. Pulsa "ejecutar". El juego simula la respuesta de la IA según el prompt.
4. El evaluador revisa los criterios definidos por la misión. El catálogo original tiene seis:
   - **Rol:** ¿le dice a la IA qué papel tiene?
   - **Contexto:** ¿explica quién es el cliente y su situación?
   - **Objetivo:** ¿dice qué debe producir?
   - **Formato:** ¿pide una forma de respuesta (lista, tabla, pasos)?
   - **Restricciones:** ¿menciona límites o requisitos?
   - **Ejemplo:** ¿muestra un ejemplo de lo esperado? (opcional en misiones básicas)
5. El juego muestra qué criterios se cumplieron, cuáles faltan y una explicación breve de cada falta.
6. El jugador puede editar y volver a ejecutar, o pedir una pista.
7. La misión se completa cuando se cumplen los criterios obligatorios.

La misión 1.3 añade **Audiencia**: ¿indica para quién se escribe y qué conocimientos tiene ese equipo? La lista concreta y sus obligatorios dependen de la misión; no se exige el criterio Ejemplo en 1.2 ni 1.3.

## 6. Evaluación simulada (MVP)

El respaldo simulado no usa IA. Se utiliza sin configuración de Gemini o si Gemini falla (sección 13). Funciona con reglas sencillas:

- **Detección por palabras clave y patrones.** Por ejemplo, el criterio "Rol" se cumple si el texto contiene frases como "actúa como", "eres un" o "eres una".
- **Cada misión define sus criterios obligatorios.** La misión del restaurante exige rol, objetivo y formato; contexto, restricciones y ejemplo también se evalúan como mejoras opcionales.
- **Respuesta simulada.** Si el prompt cumple los criterios, se muestra una respuesta de ejemplo predefinida para esa misión. Si no, se muestra una respuesta genérica y mala, para que el jugador vea el efecto de un prompt débil.
- **Retroalimentación educativa.** Cada criterio fallido tiene un texto fijo que explica el motivo y sugiere cómo corregirlo.

Limitaciones que debemos aceptar y comunicar al jugador:
- Un prompt correcto escrito con palabras distintas puede no ser reconocido. Para reducir este problema, cada criterio acepta varias formas de expresarlo.
- El juego no juzga la calidad creativa de la respuesta, solo la estructura del prompt.

## 7. Misiones del MVP

Una misión es un encargo de un cliente que el jugador resuelve escribiendo un prompt. Cada misión practica una habilidad concreta. Por ejemplo, la misión de claridad pide dar un rol y un objetivo, y la de contexto pide explicar quién es el cliente. Al completar una misión se desbloquea la respuesta de referencia y se avanza a la siguiente. Un nivel es un grupo de misiones que enseñan la misma habilidad.

Ejemplo de la primera misión: el restaurante "La Esquina" pide un menú de 7 días sin gluten con platos baratos. Un prompt como "Dame un menú de comida" no pasa, porque no define rol ni formato. Un prompt como "Actúa como chef de un restaurante pequeño. Crea un menú de 7 días con platos económicos y sin gluten. Preséntalo en una tabla" sí pasa.

El mapa tiene tres niveles y tres misiones por nivel:

| Nivel | Misión | Estado del contenido | Obligatorios |
| --- | --- | --- | --- |
| 1 · Claridad | 1.1 · Menú semanal | Conservada sin cambios; ID técnico `menu-semanal` | rol, objetivo, formato |
| 1 · Claridad | 1.2 · Resumen para el gerente | Implementada, cinco criterios | rol, objetivo, formato |
| 1 · Claridad | 1.3 · Explicar un error a otro equipo | Implementada, seis criterios | rol, audiencia, objetivo, formato |
| 2 · Contexto | 2.1 · Correos de una tienda de ropa | Contenido anterior conservado; alias `correos-tienda` | rol, contexto, restricciones |
| 2 · Contexto | 2.2 · Política de devoluciones | Implementada, cinco criterios | contexto, restricciones, objetivo |
| 2 · Contexto | 2.3 · Caso de soporte técnico | Implementada, cinco criterios | contexto, restricciones, objetivo, formato |
| 3 · Formato | 3.1, 3.2 y 3.3 · Próximamente | Sin encargo; entradas bloqueadas | Por definir |

Los textos, pistas, referencias y expresiones exactos de 1.2 y 1.3 se conservan en [MISIONES_NIVEL_1.txt](docs/specs/MISIONES_NIVEL_1.txt). Contexto y restricciones son opcionales en ambas. Los contadores y el portafolio muestran el total de criterios de cada misión. Todas las palabras de detección del documento se reconocen con la normalización del motor existente.

El nivel 2 se detalla en [MISIONES_NIVEL_2.txt](docs/specs/MISIONES_NIVEL_2.txt). La misión 2.1 conserva íntegros sus textos y sus obligatorios. 2.2 y 2.3 incluyen definiciones por criterio y cinco criterios visibles; rol es opcional en ambas, formato también en 2.2. En el respaldo, Contexto requiere los datos concretos del caso y señala los que faltan. En 2.2 se comprueban los tres plazos y el error del sistema; en 2.3, el síntoma, los otros equipos, el estado de la impresora y ambos accesos disponibles. Se aceptan variantes con normalización de acentos y varias expresiones. Los demás criterios mantienen detección por palabras.

Cada misión tiene:
- Encargo del cliente (texto corto).
- Criterios obligatorios y opcionales.
- Respuesta simulada de referencia.
- Pistas en tres niveles, de la más general a la más específica.

## 8. Módulo de agent skills (fuera del MVP)

Se deja para la versión 2. La idea es que, en algunas misiones, la tarea sea repetible y el jugador deba decidir si conviene crear una skill. La skill se desbloquea como una "herramienta" al completar el nivel de Skills.

## 9. Progresión

Niveles por habilidad, en este orden:

1. Claridad
2. Contexto
3. Formato
4. Ejemplos
5. Skills
6. Flujos de trabajo

Las misiones se desbloquean en orden dentro de cada nivel. La 1.2 requiere completar 1.1 y la 1.3 requiere completar 1.2. Un nivel se desbloquea únicamente cuando se completan las tres misiones del anterior: aprobar solo 1.1 y 1.2 no habilita Contexto. Las entradas sin contenido no se pueden abrir, aunque su nivel ya esté desbloqueado. 2.2 requiere aprobar 2.1 y 2.3 requiere aprobar 2.2; Formato permanece bloqueado hasta completar las tres de Contexto. Después se habilita el nivel, pero sus tres entradas siguen como «Próximamente», sin encargo ni posibilidad de abrirlas. El contenido anterior del resumen para examen ya no forma parte del catálogo jugable; se conserva en el historial de Git y su alias en el servidor por compatibilidad.

El mapa se abre desde «Mi portafolio → Mapa de niveles» y al continuar después de completar un nivel. Muestra numeración, nombre, progreso de tres misiones y estados Disponible, Completada o Bloqueado con candado y motivo visible. Las acciones bloqueadas anuncian su estado y no se activan con ratón ni teclado. Se puede retomar la misión actual sin perder el borrador, o volver a una misión completada. La cabecera muestra, por ejemplo, «Nivel 1 · Misión 1.2 de 3». La graduación completa queda reservada para terminar las nueve misiones; no se muestra prematuramente al completar Claridad.

## 10. Pantallas del MVP

La misión se presenta como herramientas de una computadora. El orden es secuencial tanto en celular como en laptop; ninguna ventana se abre antes de su paso.

**Celular (menos de 768 px):** la misión 1 sigue notificación → bandeja → ficha del cliente «LE» → encargo → terminal. La notificación baja en 400 ms y, al tocarla, sale en 180 ms y abre la bandeja. El correo del restaurante se resalta en azul y la nota de Epson_IA es de solo lectura. La ficha abre el encargo aprobado: «Necesitamos un menú de 7 días con platos económicos y sin gluten, organizado para consultarlo cada día». Epson_IA añade «Cuando estés listo, abre la terminal». El único botón dentro del encargo es «Iniciar prompt». Las misiones 2 y 3 conservan su entrada por bandeja y conversación. Se muestra una etapa a la vez, sin scroll de página; el contenido largo tiene scroll interno.

**Laptop (desde 768 px):** escritorio oscuro y barra inferior de 28 px con misión, accesos a las ventanas abiertas y «Mi portafolio». Primero aparece la notificación arriba a la derecha, sin ventanas abiertas. Al tocarla se abre Correo centrado; tocar el restaurante sustituye la lista por el encargo en esa misma ventana. «Iniciar prompt» abre la terminal encima del correo, que permanece detrás con opacidad 0.5. Solo una ventana está activa; los accesos inferiores o el clic en una ventana la traen al frente. La X de la terminal recupera el correo en el mismo punto. Cerrar todas las ventanas devuelve la notificación solo si la misión está pendiente; si ya se completó, permite continuar. Las ventanas tienen ancho máximo de 60 %, alto mínimo de 300 px y cierre de al menos 24 px. Se arrastran por la barra de título sin salir del escritorio; también se pueden mover con flechas del teclado. Aparecen con escala de 0.96 a 1 en 200 ms.

**Terminal y resultados:** textarea real de unas seis líneas, texto de al menos 16 px, contador de 1500 caracteres y botón Ejecutar fuera del scroll. Mientras evalúa se muestra «$ evaluando…» sin bloquear toda la pantalla. El resultado sustituye al editor dentro de la misma terminal: prompt enviado, «$ resultados», resumen amarillo, los criterios de la misión con ✓ verde o ✗ rojo y retroalimentación de los faltantes. «Volver a intentar» recupera el texto; el historial conserva los prompts anteriores solo en memoria. «Pedir pista» está disponible únicamente en los resultados, con tres niveles por misión. Ya no se usa la hoja inferior, un panel separado de resultados ni las columnas simultáneas.

Los mensajes del cliente y Epson_IA usan burbujas. El segundo mensaje aparece tras 600 ms y se puede revelar inmediatamente tocando la conversación o pulsando Enter/Espacio. El avance nunca espera la animación. Todas las animaciones respetan `prefers-reduced-motion`. Las acciones móviles tienen al menos 44 px y el área de juego usa 100dvh. No hay desbordamiento horizontal.

Al completar una misión aparece Continuar; tras la última abre la graduación y el portafolio final. La evaluación y los datos de las misiones permanecen según las secciones 6, 7 y 13.

Detalles consolidados: [flujo de misión](docs/specs/MISION_FLUJO.txt) y [ventanas de laptop](docs/specs/LAPTOP_FLUJO.txt).

## 11. Tecnología

- **Frontend:** `index.html` contiene la estructura de pantallas; `styles/` separa base, historia, misiones y escritorio; `js/` separa contenido, evaluación, historia, misiones, portafolio y arranque mediante módulos ES. Sin frameworks ni pasos de compilación. El desarrollo requiere servir por HTTP con `npx wrangler dev`, no abrir `file://`.
- **Backend:** un Worker de módulo ES en `src/index.js`. Su manejador `fetch(request, env)` atiende `POST /api/evaluar` y delega las demás rutas a `env.ASSETS.fetch(request)`.
- **Hosting:** Cloudflare Workers con assets estáticos, conectado al repositorio de GitHub. `wrangler.jsonc` declara el servidor y sirve la raíz como assets; `.assetsignore` permite publicar `index.html`, las hojas CSS de `styles/`, los módulos de `js/` y los tres cuadros optimizados del personaje. Las rutas `/api/*` invocan primero el Worker. El despliegue usa `npm run deploy` (Wrangler 4 como dependencia de desarrollo), sin compilación.
- **Proveedor de IA:** Google Gemini (Google AI Studio). El nombre exacto de un modelo compatible con `generateContent` y salida JSON debe copiarse desde AI Studio a la variable `GEMINI_MODEL`, porque cambia con el tiempo. Revisar su disponibilidad y cuota gratuita en la cuenta.
- **Respaldo:** la evaluación simulada por reglas, que corre en el navegador cuando Gemini falla o se agota la cuota.
- **Secretos:** la clave de Gemini se guarda como variable de entorno en el panel de Cloudflare, con el nombre `GEMINI_API_KEY`. Nunca se escribe en el código ni se sube a GitHub.
- Progreso guardado solo en memoria durante la sesión. No usar `localStorage` ni `sessionStorage`.

Estructura de archivos del proyecto:

```
prompt-quest/
├── index.html              (estructura de pantallas)
├── styles/                 (base.css, historia.css, misiones.css, escritorio.css)
├── js/                     (contenido.js, evaluacion.js, historia.js, misiones.js, mapa.js, portafolio.js, app.js)
├── assets/                 (solo los tres PNG optimizados de Epson_IA)
├── src/index.js            (Worker: evaluación y acceso a ASSETS)
├── tests/                  (node:test, sin claves ni llamadas reales)
├── docs/
│   ├── specs/              (ONBOARDING.txt, MISION_FLUJO.txt, LAPTOP_FLUJO.txt)
│   └── review/             (notas históricas de revisión)
├── package.json            (npm test, npm run dev, npm run deploy)
├── package-lock.json       (instalación reproducible con npm ci)
├── wrangler.jsonc
├── .assetsignore           (solo HTML, CSS, módulos del cliente y tres PNG públicos)
├── .gitignore
├── README.md
└── GAME_DESIGN.md          (única fuente de verdad)
```

## 12. Alcance del MVP

Estado de la implementación: Claridad y Contexto contienen tres misiones completas cada uno con progresión en memoria, pistas, Gemini y respaldo. El mapa contiene nueve espacios; Formato permanece como tres entradas «Próximamente», sin encargo.

Incluye:
- Tres misiones de Claridad, tres de Contexto y un mapa de tres niveles con tres espacios cada uno.
- Evaluación simulada con criterios propios de cada misión.
- Pistas y retroalimentación.
- Respuestas simuladas de referencia.
- Evaluación con Gemini (IA real) y respaldo con evaluación simulada.

No incluye:
- Módulo de agent skills.
- Cuentas de usuario o guardado permanente.
- Otros estilos de interfaz; se conserva la terminal con el personaje en pixel art.
- Contenido jugable para 3.1, 3.2 y 3.3.

## 13. Evaluación con IA real y respaldo

La evaluación tiene dos caminos. El camino principal usa Gemini y el respaldo usa la evaluación simulada.

Flujo cuando el jugador pulsa "ejecutar":

1. El navegador envía a `/api/evaluar` el prompt del jugador y los datos de la misión (encargo y criterios obligatorios). Nunca envía la clave.
2. El Worker `src/index.js` valida el prompt (no vacío y máximo 1500 caracteres), reconoce la misión por su identificador y usa su propio encargo y criterios de confianza. Arma las instrucciones para Gemini y llama a la API con `env.GEMINI_API_KEY` y el modelo de `env.GEMINI_MODEL`.
3. Gemini responde con un JSON: `{"criterios": {"rol": true, "contexto": false, ...}, "retroalimentacion": "texto corto en español", "comentarios": {"rol": "explicación por criterio", ...}}`. El Worker valida los booleanos y comentarios declarados por su misión de confianza. 1.1 conserva su contrato original de seis criterios; 1.2 usa cinco y 1.3 incluye Audiencia entre sus seis. 2.2 y 2.3 declaran cinco criterios y sus definiciones de confianza, incluido el dato concreto que debe señalarse cuando falta contexto. Solo se amplían el catálogo y el contrato autorizado; proveedor, llamada, límites y respaldo se conservan.
4. La función devuelve ese JSON al navegador, que muestra los criterios con ✓ o ✗ y la retroalimentación.
5. Si la función responde con error, si se agota la cuota de Gemini o si pasan más de unos segundos sin respuesta, el navegador ejecuta la evaluación simulada por reglas y muestra un aviso discreto como "evaluación sin IA por hoy".

Detalles para el proveedor y el hosting:
- Llamada a Gemini: `POST https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent`, con la clave en el encabezado `x-goog-api-key`. Para pedir JSON se usa `generationConfig: { responseMimeType: "application/json" }`.
- Los límites por minuto y por día cambian. Se revisan en la página de límites de AI Studio, no en este documento.
- Los assets se sirven primero salvo en `/api/*`; el navegador vuelve a las reglas si el endpoint falla o no responde. No se utiliza la configuración de Pages ni su función `onRequestPost`.
- Antes de publicar, revisar las condiciones de privacidad del plan gratuito de Gemini, porque puede usar los datos enviados para mejorar productos.

Límites de uso para proteger la cuota:
- Máximo de 5 intentos de IA por minuto en la página. En el servidor, binding `EVALUATION_LIMITER` con límite aproximado de 5 solicitudes por IP y ubicación de Cloudflare cada 60 segundos. No es un límite global estricto; una red compartida comparte el límite.
- Caché de hasta 50 evaluaciones exitosas por prompt exacto y misión, solo en memoria del navegador. No se guarda en almacenamiento persistente y se pierde al recargar.
- Tiempo máximo de espera: 7 segundos en el Worker y 9 en el navegador. Los errores de proveedor, cuota, configuración o respuesta inválida activan el respaldo.

## 14. Instrucciones para Claude o Codex

Al empezar a construir:

1. Lee este documento completo antes de escribir código.
2. Construye primero la pantalla y la estructura de datos de una sola misión.
3. Implementa la evaluación con los seis criterios y prueba con prompts buenos y malos.
4. Agrega las otras dos misiones solo después de que la primera funcione.
5. Mantén los textos del juego en español, con oraciones en mayúscula inicial y sin signos de admiración.
6. No uses `localStorage` ni `sessionStorage`.
7. Mantén la evaluación simulada independiente del DOM en `js/evaluacion.js`. Debe funcionar sin conexión al proveedor ni clave; sirve el juego por HTTP para cargar sus módulos.
8. Después crea `src/index.js` como Worker con `export default { fetch(request, env) }`, que llama a Gemini usando `env.GEMINI_API_KEY` para `POST /api/evaluar`. Mantén `index.html` en la raíz y configura el binding `ASSETS` en `wrangler.jsonc`.
9. Nunca pongas la clave de Gemini en `index.html` ni en ningún archivo del repositorio.
10. En el navegador, llama a `/api/evaluar`. Si falla, usa la evaluación simulada sin mostrar errores técnicos al jugador.
11. Valida el prompt en la función: no vacío y máximo 1500 caracteres.
12. Mantén el nombre del modelo de Gemini en una sola constante para poder cambiarlo fácilmente.
13. Textos de la interfaz en español, con el sistema preparado para traducirlos después al inglés.

## 15. Preguntas abiertas

- ¿El nombre "Prompt Quest" se queda o prefieres otro?
- ¿Quieres que el juego sea en español únicamente o también en inglés desde el inicio?
- ¿Cuántas misiones te gustaría tener en la primera versión pública?

## 16. Presentación e incentivos implementados

La entrada sigue portada → bienvenida de Epson_IA → encargos. Epson_IA es el personaje de bienvenida y guía de pistas; cada cliente tiene su propia voz y una reacción al completar su encargo. No se reemplaza el encargo aprobado del restaurante.

Una barra representa la reputación mediante misiones completadas. El portafolio conserva en memoria el último prompt aprobado por misión y su respuesta de referencia fija; los intentos fallidos no lo modifican. Al finalizar cada nivel se vuelve al mapa con el siguiente nivel desbloqueado; la graduación final requiere las nueve misiones. No se añaden cuentas, almacenamiento persistente ni cambios en la evaluación.


## 17. Bienvenida, personaje y documentación de apoyo

Epson_IA es quien da la bienvenida; los clientes son personajes distintos y conservan su voz. Portada y bienvenida preceden al editor. La portada tiene una sola acción y la bienvenida avanza por tres mensajes con Atrás/Siguiente; el último inicia la prueba. No hay cuentas ni sonido automático.

Los tres cuadros de Epson_IA mantienen estilo, encuadre, fondo y chaleco con «Epson_IA»: saludo, mano abajo (reposo) y ojos cerrados (parpadeo). Los PNG web miden 480 × 268 px. Se precargan desde la portada; cada mensaje inicia un saludo de 800 ms, seguido de reposo. El parpadeo dura 150 ms cada 3–5 segundos. Los mensajes avanzan sin esperar la animación. Con movimiento reducido se mantiene el reposo; una imagen fallida también usa reposo, con copia de emergencia incluida en el módulo de historia. Al ocultar la pestaña o terminar la bienvenida se detienen los cambios automáticos. Los originales se conservan solo en la carpeta local `../prompt-quest-originales/`, fuera de Git y del despliegue.

Documentación subordinada, una versión por tema:

- [ONBOARDING.txt](docs/specs/ONBOARDING.txt): presentación, incentivos y registro de imágenes/animación, fusionado con EPSON_ANIMATION.md.
- [MISION_FLUJO.txt](docs/specs/MISION_FLUJO.txt): recorrido de misión y registro consolidado de MISSION_COMPUTER_FLOW.md y MOBILE_NOTIFICATION_FLOW.md. Su antigua sección 8 se reemplazó por el flujo secuencial laptop descrito en la sección 10 de este documento.
- [LAPTOP_FLUJO.txt](docs/specs/LAPTOP_FLUJO.txt): detalle de ventanas secuenciales desde 768 px.
- [Revisión de misiones](docs/review/MISSIONS_REVIEW.md), [revisión móvil](docs/review/MOBILE_REVIEW.md) y [revisión de presentación](docs/review/ONBOARDING_REVIEW.md): evidencia histórica. Sus cantidades de pruebas, hojas de resultados o composiciones anteriores no definen el estado actual.

Los textos exactos actualmente visibles permanecen en `CONTENT.es` dentro de `js/contenido.js`. Esta reorganización no modifica el juego, la evaluación ni el servidor.
