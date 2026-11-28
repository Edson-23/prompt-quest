// Textos y patrones agrupados por idioma, separados de la lógica de evaluación.
export const CONTENT = {
  es: {
    ui: {
      taskTerminal:'Terminal', desktopComplete:'Encargo completado. Puedes continuar tu trabajo en la agencia.',
      terminalTitle:'terminal', evaluatingLine:'$ evaluando…', terminalTo:'$ para: {client}', terminalBrief:'$ encargo: {brief}',
      notificationLabel:'Correo · 1 nuevo', tapNotification:'toca la notificación', tapMail:'toca el correo del cliente', clientWrote:'Te escribió un encargo', tapProfile:'toca para leer el encargo', mobileChatGuide:'Cuando estés listo, abre la terminal.', clientShortNames:{'menu-semanal':'La Esquina'}, clientInitials:{'menu-semanal':'LE'},
      clientLabel:'Cliente', resultsLine:'$ resultados', score:'{count} / 6 criterios', historyTitle:'Historial de prompts', retryPrompt:'Volver a intentar', continue:'Continuar', missionLabel:'Misión {number}',
      startPrompt:'Iniciar prompt', chatGuide:'Tu prueba consiste en escribir las instrucciones para la IA. Cuando estés listo, abre la terminal.',
      inbox:'Correo', unread:'1 nuevo', openMail:'Abrir encargo', mailGuide:'Hay un cliente esperando.',
      mentorTips:{rol:'Buen intento. Dile a la IA quién debe ser para ayudarte.', contexto:'Cuéntale a la IA quién es el cliente y qué necesita.', objetivo:'Dile qué debe crear. Cuanto más claro, mejor.', formato:'Pide cómo quieres la respuesta: una tabla, una lista o viñetas.', restricciones:'Marca los límites: qué debe evitar o cuánto puede escribir.', ejemplo:'Añade una muestra de cómo quieres que se vea la respuesta.'},
      welcomeTitle:'Tu primer día', back:'Atrás', next:'Siguiente', startTrial:'Empezar la prueba', welcomeProgress:'Bienvenida · {current} de 3',
      agencyLabel:'AGENCIA DE IA', coverPitch:'Tu primer día en una agencia de IA. Tres clientes. ¿Les darás lo que necesitan?', startDay:'Empezar mi primer día',
      skip:'Ir al área de trabajo', tagline:'Aprende a conversar con la IA, un encargo a la vez.',
      level:'Nivel {level} · Misión {number} de 3', missionNumber:'Nivel {level} · {skill}', missionTitle:'Misión {number} · {title}',
      intro:'Lee el encargo. Da instrucciones claras. Prueba y mejora.', briefTitle:'Mensaje del cliente', clientTag:'Restaurante',
      requiredIntro:'Obligatorios:', editorTitle:'terminal', promptLabel:'Escribe tu prompt para la IA',
      placeholder:'Escribe aquí las instrucciones para resolver el encargo…', execute:'Ejecutar',
      editorHelp:'Puedes editar y volver a ejecutar las veces que quieras. Máximo 1500 caracteres.', resultsTitle:'Resultados', simulationTag:'Simulación por reglas',
      waiting:'Esperando tu primer intento. Escribe un prompt y pulsa Ejecutar.', edited:'Has editado el prompt. Ejecútalo para actualizar la retroalimentación.',
      pending:'Aún sin evaluar.', required:'Obligatorio', optional:'Opcional', fulfilled:'Cumplido', undetected:'No detectado', pendingLabel:'Pendiente',
      hint:'Pedir pista', nextHint:'Pedir pista', hintsDone:'Pistas: 3', hintNumber:'Pista {current} de 3',
      characters:'{count} / 1500', counter:'{count} / 6 criterios detectados', progress:'Reputación · {count} / 3',
      empty:'Escribe un prompt antes de ejecutarlo.', tooLong:'Usa un máximo de 1500 caracteres.',
      success:'✓ Prompt aprobado. Cumples los {requiredCount} criterios obligatorios y {count} de los 6 criterios en total.',
      retry:'Todavía faltan criterios obligatorios: {missing}. Cumples {count} de los 6 criterios. Ajusta tu prompt y vuelve a probar.',
      referenceTitle:'Respuesta de referencia desbloqueada', weakTitle:'Respuesta simulada de un prompt incompleto',
      referenceNote:'Este es un ejemplo fijo del encargo, no una respuesta generada a partir de tus instrucciones. Compara también los criterios opcionales.', weakNote:'Esta respuesta fija ilustra lo poco útil que puede ser una petición incompleta.',
      portfolioTitle:'Mi portafolio', portfolioEmpty:'Tu portafolio empieza con el primer encargo aprobado.', portfolioNote:'Tus trabajos viven solo en esta sesión. Al recargar se pierden.', yourPrompt:'Tu prompt aprobado', fixedResponse:'Respuesta de referencia', graduationTitle:'Tu primer día, completado', graduationMessage:'Tres clientes atendidos. Ya sabes dar instrucciones con intención. Bienvenido al equipo.', viewGraduation:'Cerrar mi primer día', returnGame:'Volver a los encargos',
      nextMission:'Siguiente misión', nextClient:'Nuevo cliente: {client}',
      allCompleted:'✓ Completaste las 3 misiones. Has practicado claridad, contexto y formato: asignar un rol, explicar la situación, definir el objetivo, poner límites y guiar la respuesta con un formato y un ejemplo.',
      limitations:'Este evaluador reconoce palabras y patrones, no comprende el significado. Puede no reconocer otras expresiones correctas y no juzga la calidad creativa. Los criterios opcionales ayudan a resolver mejor el encargo.',
      footer:'El progreso se guarda solo en memoria y se pierde al recargar o cerrar esta página.',
      pendingMode:'IA con respaldo por reglas', aiMode:'Evaluación con Gemini', cachedMode:'Evaluación con Gemini · Reutilizada',
      fallbackMode:'Evaluación sin IA por ahora', evaluating:'Evaluando…',
      evaluatingSummary:'Revisando tu prompt. Si la IA no responde, usaremos las reglas del juego.',
      aiLimitations:'La IA puede equivocarse. Revisa la retroalimentación; la respuesta de referencia sigue siendo un ejemplo fijo.',
      privacy:'En la versión web, al ejecutar se envía tu prompt a Gemini. Evita incluir datos personales. Sin conexión o al abrir el archivo local se usan reglas.',
      liveCounter:'{count} / 6 por reglas',
      privacyShort:'Al ejecutar, tu prompt se envía a Gemini.',
      scrollHint:'Desplaza esta zona para ver el detalle.',
      helpTitle:'Ayuda y privacidad',
      viewResult:'Ver resultado', lastResult:'Ver último resultado', closeResults:'×', closeToast:'Cerrar',
      resultCount:'{count} de 6 criterios cumplidos', resultReady:'{count} de 6 criterios cumplidos. Resultado disponible.'
    },
    welcome:['Bienvenido al equipo. Aquí resolvemos encargos de clientes que necesitan una respuesta útil.', 'Tu trabajo: escribir instrucciones claras para que la IA ayude a cada cliente.', 'Primero, una prueba sencilla. Si la pasas, te presento al siguiente cliente.'],
    criteria: [
      { id:'rol', label:'Rol', patterns:[/\bactua como\b/, /\beres (?:un|una)\b/, /\basume (?:el )?(?:rol|papel)\b/, /\bcomportate como\b/, /\bcomo (?:chef|cocinero|cocinera|nutricionista)\b/], yes:'Has indicado qué papel debe asumir la IA.', no:'Dale una especialidad: «Actúa como chef». Un rol orienta el tipo de respuesta.' },
      { id:'contexto', label:'Contexto', patterns:[/\bla esquina\b/, /\brestaurante\b/, /\bnegocio de comida\b/, /\bcomedor\b/], yes:'Has mencionado al cliente o su tipo de negocio.', no:'Explica para quién trabajas: el restaurante La Esquina necesita un menú para sus clientes.' },
      { id:'objetivo', label:'Objetivo', patterns:[/\b(?:crea|crear|elabora|elaborar|disena|disenar|prepara|preparar|genera|generar|propon|proponer|dame|haz|hacer|necesito|quiero)\b[\s\S]{0,100}\bmenu\b/, /\bmenu\b[\s\S]{0,50}\b(?:semanal|7 dias|siete dias)\b/], yes:'Has pedido producir un menú concreto.', no:'Indica qué debe crear: «Crea un menú de 7 días». Un objetivo concreto evita respuestas vagas.' },
      { id:'formato', label:'Formato', patterns:[/\btabla\b/, /\blista\b/, /\bpasos\b/, /\bcolumnas\b/, /\b(?:organiza|organizado|organizada|divide|dividido|dividida)\b[\s\S]{0,40}\b(?:dias|dia)\b/], yes:'Has especificado cómo organizar la respuesta.', no:'Pide una presentación concreta: «Preséntalo en una tabla con columnas Día y Plato».' },
      { id:'restricciones', label:'Restricciones', patterns:[/\bsin gluten\b/, /\blibre de gluten\b/, /\bno (?:incluyas|uses|incluir|usar) gluten\b/, /\bevitar? (?:el )?gluten\b/, /\beconomic[oa]s?\b/, /\bbarat[oa]s?\b/, /\bbajo (?:costo|coste|presupuesto)\b/, /\bno (?:incluyas|uses)\b/, /\bmaximo\b/], yes:'Has indicado al menos un límite. Para atender todo el encargo, incluye tanto «sin gluten» como «económico».', no:'Añade los límites del cliente: platos sin gluten y económicos. Las restricciones evitan propuestas que no le sirven.' },
      { id:'ejemplo', label:'Ejemplo', patterns:[/\bpor ejemplo\s*[:,]?\s*\S+/, /\bejemplo\s*:\s*\S+/, /\bcomo muestra\s*[:,]?\s*\S+/], yes:'Has añadido una muestra para orientar la respuesta.', no:'Puedes dar una muestra: «Por ejemplo: Lunes | Arroz con frijoles». En esta misión es opcional.' }
    ],
    missions: [{
      thanks:'Gracias. Ahora podemos organizar la semana y cuidar a nuestros clientes.',
      level:1, skill:'Claridad', title:'Menú semanal', clientTag:'Restaurante',
      completion:'✓ Misión 1 completada. Ya sabes indicar un rol, un objetivo y un formato. Has desbloqueado la misión 2.',
      mailSubject:'Menú de 7 días sin gluten', id:'menu-semanal', client:'Restaurante «La Esquina»', brief:'Necesitamos un menú de 7 días con platos económicos y sin gluten, organizado para consultarlo cada día.',
      required:['rol','objetivo','formato'],
      hints:[
        'Piensa en tres decisiones: quién debe ser la IA, qué debe crear y cómo debe presentar la respuesta.',
        'Dale el rol de chef, pide un menú de 7 días y solicita una tabla. Añade el nombre del restaurante y sus límites para mejorar el encargo.',
        'Prueba esta estructura: «Actúa como chef del restaurante La Esquina. Crea un menú de 7 días con platos económicos y sin gluten. Preséntalo en una tabla con columnas Día y Plato». Puedes añadir un ejemplo.'
      ],
      weakResponse:'Aquí tienes algunas ideas de comida: pasta, pizza y ensalada. Puedes elegir lo que más te guste.',
      reference:'Menú semanal · La Esquina\n\nLunes     | Arroz con frijoles y ensalada\nMartes    | Tortilla de patatas con tomate\nMiércoles | Lentejas guisadas con verduras\nJueves    | Pollo con arroz y zanahoria\nViernes   | Ensalada de garbanzos y huevo\nSábado    | Sopa de verduras con patatas\nDomingo   | Tortillas de maíz con frijoles\n\nIngredientes sencillos y económicos. Usa tortillas de maíz y condimentos etiquetados sin gluten; evita la contaminación cruzada durante la preparación.'
    }, {
      thanks:'Gracias por ayudarnos a responder con claridad y sin prometer de más.',
      id:'correos-tienda', level:2, skill:'Contexto', title:'Correos de una tienda de ropa', clientTag:'Tienda en línea', client:'Tienda de ropa en línea',
      brief:'Somos una tienda de ropa en línea. Llegan muchos correos preguntando por envíos y devoluciones. Necesitamos una respuesta amable, corta y que no prometa nada que no podamos cumplir.',
      required:['rol','contexto','restricciones'],
      completion:'✓ Misión 2 completada. Has explicado el contexto y puesto límites a una respuesta al cliente. Has desbloqueado la misión 3.',
      hints:[
        '¿Quién debe escribir la respuesta y para quién? Dale un papel a la IA y explica quién recibirá el correo.',
        'Menciona que es una tienda de ropa en línea y que sus clientes preguntan por envíos y devoluciones. Añade solo políticas que conozcas.',
        'Pon límites concretos: una respuesta amable de máximo 80 palabras, sin inventar plazos ni prometer devoluciones no confirmadas. Si falta información, pide el número de pedido para revisarla.'
      ],
      weakResponse:'Tu paquete llegará mañana y te devolveremos el dinero de inmediato. Gracias por comprar.',
      reference:'Asunto: Consulta sobre envíos y devoluciones\n\nHola:\nGracias por escribirnos. Para revisar tu envío o una posible devolución, compártenos tu número de pedido. Comprobaremos su estado y las condiciones aplicables antes de confirmar los siguientes pasos.\nNo podemos confirmar plazos ni autorizar una devolución sin revisar tu caso.\nQuedamos atentos para ayudarte.\nEquipo de atención al cliente',
      rules:{
        rol:{ patterns:[/\bactua como\b/, /\beres (?:un|una)\b/, /\basume (?:el )?(?:rol|papel)\b/, /\bcomportate como\b/], no:'Asigna un papel: «Actúa como agente de atención al cliente». Así orientas la voz de la respuesta.' },
        contexto:{ patterns:[/\btienda de ropa\b/, /\bcomercio (?:de ropa |textil )?(?:en linea|electronico)\b/, /\bvendemos ropa\b/, /\bclientes\b[\s\S]{0,100}\b(?:envios|devoluciones)\b/], yes:'Has explicado la tienda o la situación de sus clientes.', no:'Explica que vendes ropa en línea y recibes consultas sobre envíos y devoluciones.' },
        objetivo:{ patterns:[/\b(?:redacta|escribe|crea|prepara|elabora)\b[\s\S]{0,100}\b(?:correo|respuesta|mensaje)\b/, /\b(?:responde|contesta)\b[\s\S]{0,100}\b(?:clientes|consultas|envios|devoluciones)\b/, /\bnecesito\b[\s\S]{0,50}\b(?:correo|respuesta)\b/], yes:'Has pedido redactar una respuesta a las consultas de los clientes.', no:'Pide una tarea concreta: «Redacta una respuesta a consultas sobre envíos y devoluciones».' },
        formato:{ patterns:[/\b(?:correo|email|e-mail)\b/, /\b(?:asunto|saludo|despedida)\b/, /\b(?:parrafos?|lista|tabla|vinetas)\b/], no:'Indica cómo presentar el mensaje, por ejemplo un correo con saludo, un párrafo y despedida.' },
        restricciones:{ patterns:[/\b(?:maximo|hasta|menos de|no mas de)\b[\s\S]{0,25}\bpalabras\b/, /\b(?:no|sin)\s+(?:inventar|inventes|prometer|prometas)\b/, /\bevitar?\b[\s\S]{0,30}\b(?:promesas|plazos|inventar)\b/, /\b(?:breve|cort[oa]|amable)\b/], yes:'Has puesto límites de tono, longitud o promesas. Incluye también que no invente plazos ni condiciones.', no:'Pon límites: «Máximo 80 palabras, tono amable y sin prometer plazos ni devoluciones no confirmados».' },
        ejemplo:{ no:'Puedes orientar el tono con una muestra: «Por ejemplo: Gracias por escribirnos; revisaremos tu pedido».' }
      }
    }, {
      thanks:'Ahora tengo una guía para repasar. Gracias por poner orden en mis apuntes.',
      id:'resumen-examen', level:3, skill:'Formato', title:'Resumen para examen', clientTag:'Estudiante', client:'Estudiante de historia',
      brief:'Eres estudiante y mañana tienes un examen de historia. Tienes tus apuntes de la Revolución Industrial, muy largos. Necesitas un resumen que te ayude a estudiar.',
      required:['contexto','objetivo','formato','ejemplo'],
      hints:[
        '¿Qué tipo de resumen necesitas y para qué? Explica tu situación y qué vas a estudiar.',
        'Indica la extensión del resumen o cuánto tiempo tienes para repasarlo. Pide las ideas principales, causas, cambios y consecuencias de la Revolución Industrial.',
        'Pide viñetas o una tabla y muestra cómo debe verse una parte. Por ejemplo: «Causas: mejoras agrícolas y nuevas máquinas». Añade tus apuntes si quieres que el resumen se base en ellos.'
      ],
      weakResponse:'La Revolución Industrial fue una época de muchos cambios. Hubo máquinas, fábricas y ciudades. Estudia todo lo que puedas.',
      reference:'Revolución Industrial · Repaso para el examen\n\n• Inicio: comenzó en Gran Bretaña en el siglo XVIII y se extendió a otros países.\n• Causas: mejoras agrícolas, disponibilidad de carbón y capital para invertir.\n• Tecnología: la máquina de vapor y la mecanización textil aumentaron la producción.\n• Trabajo: la producción pasó de talleres y hogares a fábricas con trabajo asalariado.\n• Sociedad: crecieron las ciudades y la clase obrera; las condiciones de trabajo impulsaron demandas de derechos.\n• Consecuencias: aumentó la producción y el transporte, junto con desigualdades y contaminación.\n\nEjemplo de una sección resumida:\n• Tecnología → Máquina de vapor → Impulsó fábricas y transporte.\n\nEste ejemplo general no sustituye tus apuntes; comprueba las fechas y contenidos de tu examen.',
      rules:{
        rol:{ patterns:[/\bactua como\b/, /\beres (?:un|una)\b/, /\basume (?:el )?(?:rol|papel)\b/, /\bcomportate como\b/], no:'Puedes asignar un papel: «Actúa como profesor de historia». En esta misión es opcional.' },
        contexto:{ patterns:[/\brevolucion industrial\b/, /\bexamen de historia\b/, /\bapuntes de historia\b/, /\bestudiante\b[\s\S]{0,80}\b(?:historia|examen)\b/], yes:'Has explicado el tema o tu situación de estudio.', no:'Explica que tienes un examen de historia y apuntes largos sobre la Revolución Industrial.' },
        objetivo:{ patterns:[/\b(?:haz|crea|elabora|prepara|escribe|dame|necesito|quiero)\b[\s\S]{0,80}\b(?:resumen|sintesis|repaso)\b/, /\bresume\b/, /\bsintetiza\b/, /\bextrae\b[\s\S]{0,40}\bideas principales\b/], yes:'Has pedido resumir o sintetizar el material para estudiar.', no:'Pide un resultado concreto: «Resume mis apuntes con las ideas principales para repasar el examen».' },
        formato:{ patterns:[/\bvinetas\b/, /\btabla\b/, /\blista\b/, /\besquema\b/, /\b(?:apartados|columnas|pasos)\b/], no:'Pide una estructura concreta: viñetas por tema, una tabla o un esquema de causas y consecuencias.' },
        restricciones:{ patterns:[/\b(?:maximo|hasta|menos de|no mas de)\b[\s\S]{0,25}\b(?:palabras|minutos|lineas)\b/, /\b(?:no|sin)\s+(?:inventar|inventes|anadir|anadas)\b/, /\b(?:solo|unicamente)\b[\s\S]{0,30}\b(?:apuntes|ideas principales)\b/, /\bbreve\b/], yes:'Has limitado la extensión o el contenido del repaso.', no:'Puedes limitarlo a 200 palabras o pedir que solo use tus apuntes, sin inventar datos.' },
        ejemplo:{ yes:'Has incluido una muestra de cómo debe verse una parte del resumen.', no:'Añade una muestra concreta: «Por ejemplo: Causas → Mejoras agrícolas y nuevas máquinas». Aquí el ejemplo es obligatorio.' }
      }
    }]
  }
};
