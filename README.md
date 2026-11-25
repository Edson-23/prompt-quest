# Prompt Quest

Juego web en español para aprender a escribir prompts mediante encargos de clientes y retroalimentación por criterio.

## Cómo probarlo

Abre `index.html` en el navegador. No requiere instalación, servidor, conexión a internet ni claves.

El progreso dura únicamente mientras la página está abierta.

## Estado

Paso 1: misión del menú semanal para el restaurante La Esquina. Incluye seis criterios, tres pistas y evaluación simulada en el navegador. Rol, objetivo y formato son obligatorios según la lista de la sección 7 del documento de diseño; contexto, restricciones y ejemplo son opcionales. La respuesta aprobada es un ejemplo fijo, no una generación de IA.

La carpeta `functions/api/` queda reservada para el paso 2. Git no conserva carpetas vacías; se creará en otros clones al añadir la función. Todavía no hay backend ni conexión a Gemini.

## Prueba rápida

1. Ejecuta un prompt vacío: debe pedirte que escribas instrucciones.
2. Ejecuta `Dame un menú de comida`: debe señalar los criterios que faltan y mostrar una respuesta poco útil.
3. Ejecuta `Actúa como chef del restaurante La Esquina. Crea un menú de 7 días económico y sin gluten. Preséntalo en una tabla. Por ejemplo: Lunes | Arroz con frijoles.`: debe detectar los seis criterios, completar la misión y mostrar el menú de referencia.
4. Edita el prompt y vuelve a ejecutar. Prueba las tres pistas y una ventana estrecha.
5. Recarga: el editor y el progreso deben reiniciarse.

La detección por reglas acepta varias expresiones, pero puede dar falsos positivos o no reconocer un prompt válido. Evalúa la estructura, no la calidad creativa ni el significado completo.
