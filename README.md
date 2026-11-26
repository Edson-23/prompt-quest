# Prompt Quest

Juego web en español para aprender a escribir prompts mediante encargos de clientes y retroalimentación por criterio.

## Cómo probarlo

Abre `index.html` en el navegador para jugar con evaluación simulada. No requiere instalación, servidor, conexión a internet ni claves. La evaluación real con Gemini funciona al servir el juego mediante el Worker.

El progreso dura únicamente mientras la página está abierta.

## Estado

Paso 2: misión del menú semanal para el restaurante La Esquina. Incluye seis criterios, tres pistas, evaluación con Gemini y respaldo por reglas. Rol, objetivo y formato son obligatorios según la lista de la sección 7 del documento de diseño; contexto, restricciones y ejemplo son opcionales. La respuesta aprobada sigue siendo un ejemplo fijo, no un menú generado por IA.

La arquitectura usa Cloudflare Workers con static assets. El servidor vive en `src/index.js`, reemplazando la carpeta prevista `functions/api/`. `index.html` conserva su ubicación en la raíz.

## Prueba rápida

1. Ejecuta un prompt vacío: debe pedirte que escribas instrucciones.
2. Ejecuta `Dame un menú de comida`: debe señalar los criterios que faltan y mostrar una respuesta poco útil.
3. Ejecuta `Actúa como chef del restaurante La Esquina. Crea un menú de 7 días económico y sin gluten. Preséntalo en una tabla. Por ejemplo: Lunes | Arroz con frijoles.`: debe detectar los seis criterios, completar la misión y mostrar el menú de referencia.
4. Edita el prompt y vuelve a ejecutar. Prueba las tres pistas y una ventana estrecha.
5. Recarga: el editor y el progreso deben reiniciarse.

La detección por reglas acepta varias expresiones, pero puede dar falsos positivos o no reconocer un prompt válido. Evalúa la estructura, no la calidad creativa ni el significado completo.

## Cloudflare Workers

Requiere Node.js 22 o posterior y Wrangler 4.36 o posterior (los comandos usan Wrangler 4).

1. En el proyecto de Workers conectado a GitHub, usa como directorio raíz el del repositorio, sin comando de compilación. El comando de despliegue debe ser `npx wrangler@4 deploy`. Sustituye cualquier comando anterior que suba únicamente assets. El nombre del Worker existente debe coincidir con `name` en `wrangler.jsonc` (`prompt-quest`); si es distinto, ajusta ese campo antes de desplegar.
2. Despliega el código del Worker. La configuración declara `main: "src/index.js"`, el directorio de assets `"."`, el binding `ASSETS` y prioridad del servidor para `/api/*`. No requiere mover ni compilar `index.html`.
3. En **Workers & Pages → prompt-quest → Settings → Variables and Secrets**, agrega `GEMINI_API_KEY` de tipo **Secret** y `GEMINI_MODEL` de tipo texto. Copia de AI Studio el identificador exacto de un modelo con soporte para `generateContent` y salida JSON. Guarda y despliega los cambios.
4. Alternativa por CLI para la clave: `npx wrangler@4 secret put GEMINI_API_KEY`. El comando pide la clave de forma interactiva; nunca la escribas como argumento ni en archivos del repositorio. La clave no va en `vars` de Wrangler.
5. Visita la URL del Worker y ejecuta un prompt. Debe indicar «Evaluación con Gemini» si la configuración es válida. Sin clave, modelo, cuota o conexión, debe mostrar «Evaluación sin IA por ahora» y continuar por reglas.

`.assetsignore` publica únicamente `index.html`, aunque el directorio de assets sea la raíz. Así no se sirven `.git`, `.dev.vars`, `.env`, código del servidor, pruebas ni documentación. Las rutas ajenas al endpoint se delegan a `env.ASSETS.fetch(request)`; un archivo inexistente devuelve 404. `keep_vars: true` conserva las variables configuradas en el panel, como `GEMINI_MODEL`, durante los siguientes despliegues.

El binding de límite usa `namespace_id: "1001"`; si la cuenta ya utiliza ese identificador para otro límite, asigna uno libre. Limita aproximadamente a 5 solicitudes por IP cada 60 segundos en cada ubicación de Cloudflare. Los usuarios de una misma red comparten el límite. La página también limita a 5 intentos por minuto y reutiliza hasta 50 evaluaciones exitosas en memoria; recargar borra esta caché. No constituye una cuota global estricta.

## Desarrollo local y pruebas

Para probar solo las reglas, abre `index.html`. Para probar el servidor, crea manualmente un archivo **ignorado** `.dev.vars` junto a `wrangler.jsonc` con tus valores de `GEMINI_API_KEY` y `GEMINI_MODEL`, y ejecuta:

```sh
npx wrangler@4 dev
```

Sin `.dev.vars`, el Worker también permite jugar usando el respaldo. No subas ese archivo. No incluyas datos personales en los prompts: al utilizar la evaluación real se envían a Google. Revisa las condiciones vigentes y la cuota del modelo en tu cuenta antes de habilitarlo para otros jugadores.

Las pruebas usan respuestas simuladas del proveedor, sin secretos ni consumo de cuota:

```sh
node --test tests/*.test.mjs
npx wrangler@4 deploy --dry-run
```

Comprueba también la interfaz con Gemini deshabilitado, errores del proveedor y edición mientras se está evaluando. El Worker acepta solo JSON, prompts no vacíos de hasta 1500 caracteres y la misión conocida. No confía en el encargo o la lista de obligatorios enviados por el cliente.

## Documentación oficial consultada

- [Assets, bindings y .assetsignore](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Rutas y ejecución del Worker](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Secretos](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Salida estructurada de Gemini](https://ai.google.dev/gemini-api/docs/structured-output)
