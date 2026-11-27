# Prompt Quest

Juego web en español para aprender a escribir prompts mediante encargos de clientes y retroalimentación por criterio.

## Cómo probarlo

Abre `index.html` en el navegador para jugar con evaluación simulada. No requiere instalación, servidor, conexión a internet ni claves. La evaluación real con Gemini funciona al servir el juego mediante el Worker.

El progreso dura únicamente mientras la página está abierta.

## Presentación y portafolio

La portada abre el primer día en la agencia. Epson_IA da la bienvenida en tres mensajes y después aparecen los clientes, cada uno con su propia voz. El editor permanece oculto durante la portada y la bienvenida. Los tres cuadros de Epson_IA están en `assets/`, optimizados a 480 × 268 px. Los originales generados se conservan en `assets/originales/`. El chaleco dice «Epson_IA». La bienvenida precarga los cuadros: saludo de 800 ms al cambiar de mensaje, reposo y parpadeo de 150 ms cada 3–5 segundos. Con movimiento reducido solo se muestra el reposo.

«Mi portafolio» permite revisar el prompt aprobado y la respuesta de referencia de cada encargo, sin salir de la sesión. Los intentos fallidos no reemplazan trabajos aprobados. Tras el tercer encargo, «Cerrar mi primer día» abre la graduación y el portafolio final. Volver a los encargos conserva el progreso. Recargar reinicia también la bienvenida y vacía el portafolio.

Se usan animaciones de 220 ms que respetan la preferencia de movimiento reducido. No hay cuentas ni sonido automático. Los textos de presentación están en `CONTENT.es`, junto con el contenido de misiones.

## Flujo de trabajo de las misiones

Correo → conversación → terminal → resultados en la misma terminal. En la misión 1 de celular, la entrada es notificación → bandeja → ficha del cliente «LE» → encargo. La notificación baja en 400 ms y desaparece al tocarla. El encargo móvil muestra solo «Iniciar prompt»; las pistas se piden en los resultados de la terminal. La laptop conserva su flujo anterior. En celular no se muestran el editor y los resultados a la vez. «Volver a intentar» recupera el prompt anterior; el historial conserva los prompts enviados durante la sesión para compararlos. Las pistas se pueden pedir en la conversación y en el resultado, con tres niveles compartidos por misión.

La página del juego usa 100dvh y desplazamiento interno en las ventanas. Los botones de acción quedan fuera del contenido desplazable. En laptop, las dos ventanas se muestran simultáneamente, con ancho mínimo de 360 px por ventana. La portada, la bienvenida animada y el portafolio se mantienen.

## Estado

Tres misiones con progresión secuencial: menú semanal (Claridad), correos de una tienda de ropa (Contexto) y resumen para examen (Formato). Cada una incluye seis criterios, tres pistas y una respuesta de referencia fija. Los criterios obligatorios son, respectivamente: rol/objetivo/formato; rol/contexto/restricciones; contexto/objetivo/formato/ejemplo.

Al aprobar aparece «Continuar». La cabecera muestra el nivel, la misión actual y el total completado. Al terminar la tercera se muestra un resumen de habilidades. El progreso y la caché viven solo en memoria. Los textos y patrones por misión están en los objetos de `CONTENT.es.missions`, al inicio del script de `index.html`. El servidor selecciona su propio encargo de confianza por identificador, sin confiar en el texto enviado por el navegador.

La arquitectura usa Cloudflare Workers con static assets. El servidor vive en `src/index.js`, reemplazando la carpeta prevista `functions/api/`. `index.html` conserva su ubicación en la raíz.

## Prueba rápida

1. Pulsa «Empezar mi primer día», recorre la bienvenida y pulsa «Empezar la prueba». En celular, toca la notificación, el correo y la ficha del cliente. Lee el encargo y pulsa «Iniciar prompt». En laptop, abre el correo directamente. Ejecuta un prompt vacío: debe pedirte que escribas instrucciones.
2. Ejecuta `Dame un menú de comida`: debe señalar los criterios que faltan y mostrar una respuesta poco útil.
3. Ejecuta `Actúa como chef del restaurante La Esquina. Crea un menú de 7 días económico y sin gluten. Preséntalo en una tabla. Por ejemplo: Lunes | Arroz con frijoles.`: debe detectar los seis criterios, completar la misión y mostrar el menú de referencia.
4. Pulsa «Continuar». Prueba `Ayúdame con un correo` y después `Actúa como agente de atención al cliente de una tienda de ropa en línea. Redacta un correo amable sobre envíos y devoluciones de máximo 80 palabras, sin prometer plazos. Por ejemplo: Gracias por escribirnos.`.
5. Avanza a la misión 3. Prueba `Dime algo de historia` y después `Tengo un examen de historia sobre la Revolución Industrial mañana. Resume mis apuntes en viñetas, máximo 200 palabras. Por ejemplo: Causas → Mejoras agrícolas y nuevas máquinas.`. Debe aprobar sin exigir un rol y mostrar el cierre de las tres misiones.
6. Edita, reejecuta, prueba las pistas y una ventana estrecha. En móvil se muestra una etapa a la vez, con resultados y scroll dentro de la terminal. En laptop, desde 768 px, correo/conversación y terminal se ven en dos ventanas.
7. Recarga: el editor y el progreso deben reiniciarse.

La detección por reglas acepta varias expresiones, pero puede dar falsos positivos o no reconocer un prompt válido. Evalúa la estructura, no la calidad creativa ni el significado completo.

## Cloudflare Workers

Requiere Node.js 22 o posterior y Wrangler 4.36 o posterior (los comandos usan Wrangler 4).

1. En el proyecto de Workers conectado a GitHub, usa como directorio raíz el del repositorio, sin comando de compilación. El comando de despliegue debe ser `npx wrangler@4 deploy`. Sustituye cualquier comando anterior que suba únicamente assets. El nombre del Worker existente debe coincidir con `name` en `wrangler.jsonc` (`prompt-quest`); si es distinto, ajusta ese campo antes de desplegar.
2. Despliega el código del Worker. La configuración declara `main: "src/index.js"`, el directorio de assets `"."`, el binding `ASSETS` y prioridad del servidor para `/api/*`. No requiere mover ni compilar `index.html`.
3. En **Workers & Pages → prompt-quest → Settings → Variables and Secrets**, agrega `GEMINI_API_KEY` de tipo **Secret** y `GEMINI_MODEL` de tipo texto. Copia de AI Studio el identificador exacto de un modelo con soporte para `generateContent` y salida JSON. Guarda y despliega los cambios.
4. Alternativa por CLI para la clave: `npx wrangler@4 secret put GEMINI_API_KEY`. El comando pide la clave de forma interactiva; nunca la escribas como argumento ni en archivos del repositorio. La clave no va en `vars` de Wrangler.
5. Visita la URL del Worker y ejecuta un prompt. Debe indicar «Evaluación con Gemini» si la configuración es válida. Sin clave, modelo, cuota o conexión, debe mostrar «Evaluación sin IA por ahora» y continuar por reglas.

`.assetsignore` publica únicamente `index.html` y los tres cuadros PNG optimizados, excluyendo `assets/originales/`, aunque el directorio de assets sea la raíz. Así no se sirven `.git`, `.dev.vars`, `.env`, código del servidor, pruebas ni documentación. Las rutas ajenas al endpoint se delegan a `env.ASSETS.fetch(request)`; un archivo inexistente devuelve 404. `keep_vars: true` conserva las variables configuradas en el panel, como `GEMINI_MODEL`, durante los siguientes despliegues.

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

Comprueba también la interfaz con Gemini deshabilitado, errores del proveedor y edición mientras se está evaluando. El Worker acepta solo JSON, prompts no vacíos de hasta 1500 caracteres y uno de los tres identificadores de misión conocidos. No confía en el encargo o la lista de obligatorios enviados por el cliente.

## Documentación oficial consultada

- [Assets, bindings y .assetsignore](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Rutas y ejecución del Worker](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Secretos](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Salida estructurada de Gemini](https://ai.google.dev/gemini-api/docs/structured-output)
