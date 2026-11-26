# Prompt Quest: documento de diseño (MVP)

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
4. El evaluador revisa el prompt contra seis criterios:
   - **Rol:** ¿le dice a la IA qué papel tiene?
   - **Contexto:** ¿explica quién es el cliente y su situación?
   - **Objetivo:** ¿dice qué debe producir?
   - **Formato:** ¿pide una forma de respuesta (lista, tabla, pasos)?
   - **Restricciones:** ¿menciona límites o requisitos?
   - **Ejemplo:** ¿muestra un ejemplo de lo esperado? (opcional en misiones básicas)
5. El juego muestra qué criterios se cumplieron, cuáles faltan y una explicación breve de cada falta.
6. El jugador puede editar y volver a ejecutar, o pedir una pista.
7. La misión se completa cuando se cumplen los criterios obligatorios.

## 6. Evaluación simulada (MVP)

La evaluación no usa IA. Funciona con reglas sencillas:

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

El MVP incluye tres misiones, en orden de dificultad:

1. **Menú semanal (Restaurante "La Esquina").** Criterios obligatorios: rol, objetivo, formato. Enseña lo básico.
2. **Respuesta a correos (Tienda de ropa).** Criterios obligatorios: rol, contexto, restricciones. Enseña a dar tono y límites.
3. **Resumen para examen (Estudiante).** Criterios obligatorios: contexto, objetivo, formato, ejemplo. Enseña a combinar criterios.

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

Para el MVP solo se incluyen los niveles 1 a 3, con una misión por nivel. Al completar las tres misiones se muestra un resumen con las habilidades logradas.

## 10. Pantallas del MVP

Una sola pantalla con cuatro bloques:

1. **Cabecera:** nombre del juego, nivel actual y progreso.
2. **Encargo:** cliente, necesidad y botón para ver pista.
3. **Editor:** área de texto para el prompt, botón de ejecutar y contador de criterios.
4. **Resultados:** lista de criterios con ✓ o ✗, retroalimentación y respuesta simulada cuando el prompt pasa.

Al completar una misión aparece un mensaje de avance y el botón "siguiente misión".

## 11. Tecnología

- **Frontend:** un solo archivo `index.html` con HTML, CSS y JavaScript. Sin frameworks ni pasos de compilación.
- **Backend:** un Worker de módulo ES en `src/index.js`. Su manejador `fetch(request, env)` atiende `POST /api/evaluar` y delega las demás rutas a `env.ASSETS.fetch(request)`.
- **Hosting:** Cloudflare Workers con assets estáticos, conectado al repositorio de GitHub. `wrangler.jsonc` declara el servidor y sirve la raíz como assets; `.assetsignore` permite publicar solo `index.html`. Las rutas `/api/*` invocan primero el Worker. El despliegue usa `npx wrangler@4 deploy`, sin compilación.
- **Proveedor de IA:** Google Gemini (Google AI Studio). El nombre exacto de un modelo compatible con `generateContent` y salida JSON debe copiarse desde AI Studio a la variable `GEMINI_MODEL`, porque cambia con el tiempo. Revisar su disponibilidad y cuota gratuita en la cuenta.
- **Respaldo:** la evaluación simulada por reglas, que corre en el navegador cuando Gemini falla o se agota la cuota.
- **Secretos:** la clave de Gemini se guarda como variable de entorno en el panel de Cloudflare, con el nombre `GEMINI_API_KEY`. Nunca se escribe en el código ni se sube a GitHub.
- Progreso guardado solo en memoria durante la sesión. No usar `localStorage` ni `sessionStorage`.

Estructura de archivos del proyecto:

```
prompt-quest/
├── index.html              (juego completo: pantalla, misiones, evaluación simulada)
├── src/
│   └── index.js            (Worker: API de evaluación y acceso a ASSETS)
├── wrangler.jsonc          (entrada del Worker, assets y límite de solicitudes)
├── .assetsignore           (solo index.html se publica como asset)
├── .gitignore
├── tests/                  (pruebas sin claves ni llamadas reales a Gemini)
├── README.md
└── GAME_DESIGN.md          (este documento)
```

## 12. Alcance del MVP

Estado de la implementación en el paso 2: solo la misión 1 está disponible. Las misiones 2 y 3 y su progresión siguen pendientes de una instrucción posterior.

Incluye:
- Una pantalla con tres misiones.
- Evaluación simulada con seis criterios.
- Pistas y retroalimentación.
- Respuestas simuladas de referencia.
- Evaluación con Gemini (IA real) y respaldo con evaluación simulada.

No incluye:
- Módulo de agent skills.
- Cuentas de usuario o guardado permanente.
- Pixel art u otros estilos.
- Más de tres misiones.

## 13. Evaluación con IA real y respaldo

La evaluación tiene dos caminos. El camino principal usa Gemini y el respaldo usa la evaluación simulada.

Flujo cuando el jugador pulsa "ejecutar":

1. El navegador envía a `/api/evaluar` el prompt del jugador y los datos de la misión (encargo y criterios obligatorios). Nunca envía la clave.
2. El Worker `src/index.js` valida el prompt (no vacío y máximo 1500 caracteres), reconoce la misión por su identificador y usa su propio encargo y criterios de confianza. Arma las instrucciones para Gemini y llama a la API con `env.GEMINI_API_KEY` y el modelo de `env.GEMINI_MODEL`.
3. Gemini responde con un JSON: `{"criterios": {"rol": true, "contexto": false, ...}, "retroalimentacion": "texto corto en español", "comentarios": {"rol": "explicación por criterio", ...}}`. El Worker valida los seis booleanos y los textos antes de devolverlos.
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
7. Construye primero la evaluación simulada completa en `index.html`. Debe funcionar sin internet ni clave.
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
