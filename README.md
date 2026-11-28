# Prompt Quest

Juego web en español para aprender a escribir prompts mediante encargos de clientes y retroalimentación por criterio.

🎮 [Jugar Prompt Quest en línea](https://prompt-quest.edson-rivera.workers.dev/)

## Qué archivo leer

- [GAME_DESIGN.md](GAME_DESIGN.md): única fuente de verdad del diseño, mecánica, misiones y evaluación.
- [MISIONES_NIVEL_1.txt](docs/specs/MISIONES_NIVEL_1.txt): encargos, pistas, referencias y detección exactos de 1.2 y 1.3.
- [ONBOARDING.txt](docs/specs/ONBOARDING.txt): bienvenida, personaje y animación.
- [MISION_FLUJO.txt](docs/specs/MISION_FLUJO.txt) y [LAPTOP_FLUJO.txt](docs/specs/LAPTOP_FLUJO.txt): detalles del recorrido móvil y las ventanas de laptop, subordinados al diseño principal.
- [docs/review/](docs/review/): notas históricas de verificación, no especificaciones vigentes.
- [wrangler.jsonc](wrangler.jsonc): configuración de despliegue; [src/index.js](src/index.js): servidor; [tests/](tests/): comprobaciones automatizadas.

## Cómo probarlo

Instala las dependencias con `npm ci` y ejecuta `npx wrangler dev` (o `npm run dev`). Abre la dirección local que indique Wrangler. Los módulos requieren HTTP: no abras `index.html` con doble clic ni desde `file://`. Sin claves, el juego continúa con evaluación simulada; Gemini funciona al configurar el Worker.

El progreso dura únicamente mientras la página está abierta.

## Mapa del frontend

`index.html` contiene solo las pantallas y referencias a archivos externos. Carga las hojas en este orden: `base.css`, `historia.css`, `misiones.css`, `escritorio.css`; esta última contiene únicamente reglas desde 768 px. El único script es `js/app.js`, de tipo módulo. No hay compilación ni dependencias de interfaz.

Cada controlador recibe la sesión y las dependencias que necesita; no comparte variables mediante `window`. `app.js` crea y conecta una sesión en memoria. El evaluador no accede al DOM. Los tests importan los módulos reales, con dependencias controladas para red, reloj y DOM.

| Archivo | Funciones y responsabilidades |
| --- | --- |
| [`js/contenido.js`](js/contenido.js) | `CONTENT (textos y misiones)`, `format` |
| [`js/evaluacion.js`](js/evaluacion.js) | `normalize`, `evaluatePrompt`, `createEvaluator`, `evaluateWithFallback` |
| [`js/historia.js`](js/historia.js) | `createGuideAnimation`, `clearTimers`, `later`, `show`, `rest`, `canMove`, `queueBlink`, `message`, `stop`, `degrade`, `createStoryController`, `renderWelcome`, `bindEvents` |
| [`js/misiones.js`](js/misiones.js) | `selectMission`, `createMissionController`, `renderCriteria`, `updateEditor`, `renderProgress`, `usesLaptopMissionFlow`, `laptopWindows`, `renderLaptopWindows`, `setLaptopMissionScreen`, `activateLaptopWindow`, `closeLaptopWindow`, `boundedWindowPosition`, `positionLaptopWindow`, `usesMobileClientFlow`, `missionEntryScreen`, `openClientMail`, `openNotification`, `setMissionScreen`, `revealConversation`, `prepareConversation`, `renderHistory`, `updateHintButtons`, `requestHint`, `presentResult`, `renderMission`, `advanceMission`, `bindEvents`, `updateLaptopTitlebars` |
| [`js/portafolio.js`](js/portafolio.js) | `recordWork`, `createPortfolioController`, `renderPortfolio`, `showPortfolio`, `bindEvents` |
| [`js/mapa.js`](js/mapa.js) | `createLevelMapController`, `renderMap`, `showMap`, `openMission`, `bindEvents` |
| [`js/app.js`](js/app.js) | `createGame`, `startApp` |

Los módulos y hojas se publican como archivos; las rutas `/js/` y `/styles/` no ofrecen listados de directorio. El servidor `src/index.js` sigue sin publicarse como asset.

## Presentación y portafolio

La portada abre el primer día en la agencia. Epson_IA da la bienvenida en tres mensajes y después aparecen los clientes, cada uno con su propia voz. El editor permanece oculto durante la portada y la bienvenida. Los tres cuadros de Epson_IA están en `assets/`, optimizados a 480 × 268 px. Los originales se conservan localmente en `../prompt-quest-originales/`, fuera del repositorio y del despliegue. El chaleco dice «Epson_IA». La bienvenida precarga los cuadros: saludo de 800 ms al cambiar de mensaje, reposo y parpadeo de 150 ms cada 3–5 segundos. Con movimiento reducido solo se muestra el reposo.

«Mi portafolio» permite revisar el prompt aprobado y la respuesta de referencia de cada encargo, sin salir de la sesión. Los intentos fallidos no reemplazan trabajos aprobados. La graduación y el portafolio final se habilitan al completar las nueve misiones del mapa. Volver a los encargos conserva el progreso. Recargar reinicia también la bienvenida y vacía el portafolio.

Se usan animaciones de 220 ms que respetan la preferencia de movimiento reducido. No hay cuentas ni sonido automático. Los textos de presentación están en `CONTENT.es`, junto con el contenido de misiones.

## Flujo de trabajo de las misiones

En celular, la misión 1 sigue notificación → bandeja → ficha «LE» → encargo → terminal. La notificación baja en 400 ms y desaparece al tocarla. El encargo muestra solo «Iniciar prompt». Los resultados sustituyen al editor; las pistas están en la terminal junto a «Volver a intentar».

En laptop (desde 768 px), el recorrido también es secuencial: notificación en la esquina superior derecha → ventana de Correo → encargo en esa misma ventana → terminal encima del correo. La barra inferior muestra la misión, los accesos a las ventanas abiertas y «Mi portafolio». Al activar una ventana, la otra queda detrás con opacidad 0.5. La X de la terminal recupera el correo en el mismo punto. Cerrar todas las ventanas devuelve la notificación si el encargo está pendiente; si ya se completó, permite continuar.

Las ventanas se pueden mover por su barra de título con el ratón o las flechas del teclado (Mayús aumenta el paso), sin salir del escritorio. Su aparición dura 200 ms y respeta movimiento reducido. La página usa 100dvh; el desplazamiento es interno y los botones de acción permanecen fuera del contenido desplazable. «Volver a intentar» conserva el prompt y el historial permanece en memoria. La portada, la bienvenida y el portafolio se mantienen.

## Estado

Mapa de tres niveles con tres espacios cada uno: **Claridad** (1.1, 1.2, 1.3), **Contexto** (2.1, 2.2, 2.3) y **Formato** (3.1, 3.2, 3.3).

Claridad está completo: menú semanal, resumen para el gerente y explicación de un error a otro equipo. La 1.2 exige rol, objetivo y formato; la 1.3 exige rol, audiencia, objetivo y formato. Contexto y restricciones son opcionales en ambas. Los criterios visibles y sus contadores se ajustan a cada misión (cinco en 1.2, seis en 1.3). La misión del restaurante conserva sus datos y criterios originales.

Contexto se desbloquea solo al completar las tres misiones de Claridad. Se conserva la tienda de ropa como 2.1 y el resumen de examen como 3.3, sin cambiar su contenido. Las entradas 2.2, 2.3, 3.1 y 3.2 muestran «Próximamente» y no pueden abrirse. El nivel 3 permanece bloqueado hasta completar Contexto.

Abre «Mi portafolio → Mapa de niveles» para ver el progreso y los candados. Al continuar tras completar un nivel, el mapa muestra el siguiente disponible. La graduación se reserva para las nueve misiones; mientras falten contenidos no se anuncia el curso completo. El progreso, el historial y las evaluaciones viven solo en memoria.

Los ID nuevos son estables: `1.2`, `1.3`, `2.1` y `3.3`; la 1.1 conserva el ID técnico `menu-semanal`. El servidor admite también los alias anteriores `correos-tienda` y `resumen-examen` para conservar compatibilidad.

La arquitectura usa Cloudflare Workers con static assets. El servidor vive en `src/index.js`, reemplazando la carpeta prevista `functions/api/`. `index.html` conserva su ubicación en la raíz.

## Prueba rápida

1. Pulsa «Empezar mi primer día», recorre la bienvenida y pulsa «Empezar la prueba». En celular, toca la notificación, el correo y la ficha del cliente. Lee el encargo y pulsa «Iniciar prompt». En laptop, toca la notificación y abre el correo del restaurante. Ejecuta un prompt vacío: debe pedirte que escribas instrucciones.
2. Ejecuta `Dame un menú de comida`: debe señalar los criterios que faltan y mostrar una respuesta poco útil.
3. Ejecuta `Actúa como chef del restaurante La Esquina. Crea un menú de 7 días económico y sin gluten. Preséntalo en una tabla. Por ejemplo: Lunes | Arroz con frijoles.`: debe detectar los seis criterios, completar la misión y mostrar el menú de referencia.
4. Continúa a 1.2. Prueba `Ayúdame.` y después `Actúa como analista. Prepara un resumen para la reunión con el director en tres puntos. No inventes cifras y usa solo con los datos de ventas del trimestre.`. Debe pasar de incompleto a aprobado.
5. Continúa a 1.3. Prueba `Hola.` y después `Actúa como redactor técnico. Explica para el equipo de ventas qué pasó con los pagos con tarjeta desde ayer, el impacto y el siguiente paso. Usa tres secciones con títulos y lenguaje sencillo, sin jerga.`.
6. Antes de aprobar 1.3, revisa el mapa: 2.1 sigue bloqueada. Después, pulsa Continuar: Contexto se habilita y puedes abrir 2.1. Las entradas próximas y todo Formato siguen bloqueados. La cabecera usa numeración como «Nivel 1 · Misión 1.2 de 3».
7. Revisa pistas, reintentos, portafolio y regreso desde el mapa en celular y laptop. Las ventanas de misión conservan el diseño aprobado. Recarga: el progreso vuelve a cero.

La detección por reglas acepta varias expresiones, pero puede dar falsos positivos o no reconocer un prompt válido. Evalúa la estructura, no la calidad creativa ni el significado completo.

## Cloudflare Workers

Requiere Node.js 22 o posterior. Instala las dependencias de desarrollo con `npm ci`; el proyecto fija Wrangler 4 mediante package-lock.json.

1. En el proyecto de Workers conectado a GitHub, usa como directorio raíz el del repositorio, sin comando de compilación. El comando de despliegue debe ser `npm run deploy`. Sustituye cualquier comando anterior que suba únicamente assets. El nombre del Worker existente debe coincidir con `name` en `wrangler.jsonc` (`prompt-quest`); si es distinto, ajusta ese campo antes de desplegar.
2. Despliega el código del Worker. La configuración declara `main: "src/index.js"`, el directorio de assets `"."`, el binding `ASSETS` y prioridad del servidor para `/api/*`. No requiere mover ni compilar `index.html`.
3. En **Workers & Pages → prompt-quest → Settings → Variables and Secrets**, agrega `GEMINI_API_KEY` de tipo **Secret** y `GEMINI_MODEL` de tipo texto. Copia de AI Studio el identificador exacto de un modelo con soporte para `generateContent` y salida JSON. Guarda y despliega los cambios.
4. Alternativa por CLI para la clave: `npx wrangler@4 secret put GEMINI_API_KEY`. El comando pide la clave de forma interactiva; nunca la escribas como argumento ni en archivos del repositorio. La clave no va en `vars` de Wrangler.
5. Visita la URL del Worker y ejecuta un prompt. Debe indicar «Evaluación con Gemini» si la configuración es válida. Sin clave, modelo, cuota o conexión, debe mostrar «Evaluación sin IA por ahora» y continuar por reglas.

`.assetsignore` publica únicamente `index.html`, los archivos CSS de `styles/`, los módulos de `js/` y los tres cuadros PNG optimizados, excluyendo `assets/originales/`, aunque el directorio de assets sea la raíz. Así no se sirven `.git`, `.dev.vars`, `.env`, código del servidor, pruebas ni documentación. Las rutas ajenas al endpoint se delegan a `env.ASSETS.fetch(request)`; un archivo inexistente devuelve 404. `keep_vars: true` conserva las variables configuradas en el panel, como `GEMINI_MODEL`, durante los siguientes despliegues.

El binding de límite usa `namespace_id: "1001"`; si la cuenta ya utiliza ese identificador para otro límite, asigna uno libre. Limita aproximadamente a 5 solicitudes por IP cada 60 segundos en cada ubicación de Cloudflare. Los usuarios de una misma red comparten el límite. La página también limita a 5 intentos por minuto y reutiliza hasta 50 evaluaciones exitosas en memoria; recargar borra esta caché. No constituye una cuota global estricta.

## Desarrollo local y pruebas

Para probar el juego con módulos, ejecuta un servidor local. Gemini es opcional: si quieres habilitarlo localmente, crea manualmente un archivo **ignorado** `.dev.vars` junto a `wrangler.jsonc` con tus valores de `GEMINI_API_KEY` y `GEMINI_MODEL`. Después ejecuta:

```sh
npm ci
npm run dev
```

Sin `.dev.vars`, el Worker también permite jugar usando el respaldo. No subas ese archivo. No incluyas datos personales en los prompts: al utilizar la evaluación real se envían a Google. Revisa las condiciones vigentes y la cuota del modelo en tu cuenta antes de habilitarlo para otros jugadores.

Las pruebas usan respuestas simuladas del proveedor, sin secretos ni consumo de cuota:

```sh
npm test
npm run deploy -- --dry-run
```

Comprueba también la interfaz con Gemini deshabilitado, errores del proveedor y edición mientras se está evaluando. El Worker acepta solo JSON, prompts no vacíos de hasta 1500 caracteres y un identificador de misión implementada conocido. No confía en el encargo o la lista de obligatorios enviados por el cliente.

## Documentación oficial consultada

- [Assets, bindings y .assetsignore](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Rutas y ejecución del Worker](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Secretos](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Salida estructurada de Gemini](https://ai.google.dev/gemini-api/docs/structured-output)
