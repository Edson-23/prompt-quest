// Textos y patrones agrupados por idioma, separados de la lógica de evaluación.
export const CONTENT = {
  es: {
    ui: {
      mapTitle:'Mapa de niveles', mapIntro:'Completa las misiones en orden para desbloquear el siguiente nivel.', mapBack:'Volver', mapLevel:'Nivel {level} · {title}', mapProgress:'{count} / 3 completadas', mapLocked:'Bloqueado', mapAvailable:'Disponible', mapCompleted:'Completada', mapSoon:'Contenido por preparar.', mapPrevious:'Completa la misión anterior.', mapPreviousLevel:'Completa el nivel anterior.', levelCompleted:'✓ Nivel {level} · {skill} completado. El siguiente nivel está disponible en el mapa.', missionCompleted:'✓ Misión {number} completada.',
      taskTerminal:'Terminal', desktopComplete:'Encargo completado. Puedes continuar tu trabajo en la agencia.',
      terminalTitle:'terminal', evaluatingLine:'$ evaluando…', terminalTo:'$ para: {client}', terminalBrief:'$ encargo: {brief}',
      notificationLabel:'Correo · 1 nuevo', tapNotification:'toca la notificación', tapMail:'toca el correo del cliente', clientWrote:'Te escribió un encargo', tapProfile:'toca para leer el encargo', mobileChatGuide:'Cuando estés listo, abre la terminal.', clientShortNames:{'menu-semanal':'La Esquina'}, clientInitials:{'menu-semanal':'LE'},
      clientLabel:'Cliente', resultsLine:'$ resultados', score:'{count} / {total} criterios', historyTitle:'Historial de prompts', retryPrompt:'Volver a intentar', continue:'Continuar', missionLabel:'Misión {number}',
      startPrompt:'Iniciar prompt', chatGuide:'Tu prueba consiste en escribir las instrucciones para la IA. Cuando estés listo, abre la terminal.',
      inbox:'Correo', unread:'1 nuevo', openMail:'Abrir encargo', mailGuide:'Hay un cliente esperando.',
      mentorTips:{audiencia:'Indica para quién escribes y qué conocimientos tiene ese equipo.',rol:'Buen intento. Dile a la IA quién debe ser para ayudarte.', contexto:'Cuéntale a la IA quién es el cliente y qué necesita.', objetivo:'Dile qué debe crear. Cuanto más claro, mejor.', formato:'Pide cómo quieres la respuesta: una tabla, una lista o viñetas.', restricciones:'Marca los límites: qué debe evitar o cuánto puede escribir.', ejemplo:'Añade una muestra de cómo quieres que se vea la respuesta.'},
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
      characters:'{count} / 1500', counter:'{count} / 6 criterios detectados', progress:'Reputación · {count} / {total}',
      empty:'Escribe un prompt antes de ejecutarlo.', tooLong:'Usa un máximo de 1500 caracteres.',
      success:'✓ Prompt aprobado. Cumples los {requiredCount} criterios obligatorios y {count} de los {total} criterios en total.',
      retry:'Todavía faltan criterios obligatorios: {missing}. Cumples {count} de los {total} criterios. Ajusta tu prompt y vuelve a probar.',
      referenceTitle:'Respuesta de referencia desbloqueada', weakTitle:'Respuesta simulada de un prompt incompleto',
      referenceNote:'Este es un ejemplo fijo del encargo, no una respuesta generada a partir de tus instrucciones. Compara también los criterios opcionales.', weakNote:'Esta respuesta fija ilustra lo poco útil que puede ser una petición incompleta.',
      portfolioTitle:'Mi portafolio', portfolioEmpty:'Tu portafolio empieza con el primer encargo aprobado.', portfolioNote:'Tus trabajos viven solo en esta sesión. Al recargar se pierden.', yourPrompt:'Tu prompt aprobado', fixedResponse:'Respuesta de referencia', graduationTitle:'Tu primer día, completado', graduationMessage:'Tres clientes atendidos. Ya sabes dar instrucciones con intención. Bienvenido al equipo.', viewGraduation:'Cerrar mi primer día', returnGame:'Volver a los encargos',
      nextMission:'Siguiente misión', nextClient:'Nuevo cliente: {client}',
      allCompleted:'✓ Completaste las {total} misiones. Has practicado claridad, contexto y formato: asignar un rol, explicar la situación, definir el objetivo, poner límites y guiar la respuesta con un formato y un ejemplo.',
      limitations:'Este evaluador reconoce palabras y patrones, no comprende el significado. Puede no reconocer otras expresiones correctas y no juzga la calidad creativa. Los criterios opcionales ayudan a resolver mejor el encargo.',
      footer:'El progreso se guarda solo en memoria y se pierde al recargar o cerrar esta página.',
      pendingMode:'IA con respaldo por reglas', aiMode:'Evaluación con Gemini', cachedMode:'Evaluación con Gemini · Reutilizada',
      fallbackMode:'Evaluación sin IA por ahora', evaluating:'Evaluando…',
      evaluatingSummary:'Revisando tu prompt. Si la IA no responde, usaremos las reglas del juego.',
      aiLimitations:'La IA puede equivocarse. Revisa la retroalimentación; la respuesta de referencia sigue siendo un ejemplo fijo.',
      privacy:'En la versión web, al ejecutar se envía tu prompt a Gemini. Evita incluir datos personales. Sin conexión o al abrir el archivo local se usan reglas.',
      liveCounter:'{count} / {total} por reglas',
      privacyShort:'Al ejecutar, tu prompt se envía a Gemini.',
      scrollHint:'Desplaza esta zona para ver el detalle.',
      helpTitle:'Ayuda y privacidad',
      viewResult:'Ver resultado', lastResult:'Ver último resultado', closeResults:'×', closeToast:'Cerrar',
      resultCount:'{count} de 6 criterios cumplidos', resultReady:'{count} de {total} criterios cumplidos. Resultado disponible.'
    },
    levels:[
      {id:1,title:'Claridad',missionIds:['menu-semanal','1.2','1.3']},
      {id:2,title:'Contexto',missionIds:['2.1','2.2','2.3']},
      {id:3,title:'Formato',missionIds:['3.1','3.2','3.3']}
    ],
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
  "id": "1.2",
  "level": 1,
  "skill": "Claridad",
  "title": "Resumen para el gerente",
  "clientTag": "Cliente interno",
  "client": "Gerente de ventas",
  "brief": "Tengo el reporte de ventas del trimestre, de 40 páginas. El lunes solo tengo cinco minutos en la reunión con el director. Estos son los datos clave: las ventas bajaron 12 % frente al trimestre anterior, la caída más fuerte fue en abrigos, y el inventario de temporada llegó tarde en octubre. ¿Me ayudas a preparar un resumen para la reunión?",
  "criterionIds": [
    "rol",
    "objetivo",
    "formato",
    "contexto",
    "restricciones"
  ],
  "required": [
    "rol",
    "objetivo",
    "formato"
  ],
  "optional": [
    "contexto",
    "restricciones"
  ],
  "hints": [
    "¿Quién debe escribir el resumen y para quién es?",
    "¿Qué tres preguntas debe responder el resumen?",
    "¿Cuántos puntos quieres y cuánto debe medir cada uno?"
  ],
  "reference": "• Qué pasó: las ventas bajaron 12 % frente al trimestre anterior, con la mayor caída en abrigos.\n• Por qué: el inventario de temporada llegó tarde en octubre.\n• Qué hacer: adelantar el pedido de temporada y revisar el calendario de promociones antes del próximo mes.",
  "detectionWords": {
    "rol": [
      "actúa como",
      "eres un",
      "eres una",
      "como analista",
      "como asistente",
      "compórtate como"
    ],
    "objetivo": [
      "resumen",
      "resume",
      "para la reunión",
      "qué pasó",
      "por qué",
      "qué hacer",
      "prepara"
    ],
    "formato": [
      "tres puntos",
      "3 puntos",
      "viñetas",
      "lista",
      "máximo",
      "palabras",
      "en puntos"
    ],
    "contexto": [
      "reunión",
      "director",
      "trimestre",
      "ventas",
      "inventario",
      "lunes"
    ],
    "restricciones": [
      "no inventes",
      "no uses",
      "solo con los datos",
      "máximo",
      "no superes"
    ]
  },
  "weakResponse": "El reporte contiene información de ventas. Conviene revisarlo antes de la reunión.",
  "thanks": "Gracias. Ahora puedo presentar los datos con claridad en la reunión.",
  "completion": "✓ Misión 1.2 completada. Has practicado instrucciones claras.",
  "rules": {
    "rol": {
      "patterns": [],
      "yes": "Has indicado el papel de quien escribe.",
      "no": "Asigna un papel concreto a la IA, por ejemplo analista, asistente o redactor técnico."
    },
    "objetivo": {
      "patterns": [],
      "yes": "Has indicado qué debe producir la IA.",
      "no": "Pide un resumen para la reunión que responda qué pasó, por qué y qué hacer."
    },
    "formato": {
      "patterns": [],
      "yes": "Has indicado una estructura para la respuesta.",
      "no": "Pide tres puntos o viñetas y la longitud de cada punto."
    },
    "contexto": {
      "patterns": [],
      "yes": "Has incluido datos de la situación del cliente.",
      "no": "Menciona la reunión con el director o los datos de ventas del trimestre."
    },
    "restricciones": {
      "patterns": [],
      "yes": "Has puesto límites a la respuesta.",
      "no": "Pide usar solo los datos del encargo y no inventar cifras."
    }
  }
}, {
  "id": "1.3",
  "level": 1,
  "skill": "Claridad",
  "title": "Explicar un error a otro equipo",
  "clientTag": "Equipo de ventas",
  "client": "Coordinadora de ventas",
  "brief": "Desde ayer a las 3 p. m. los clientes no pueden pagar con tarjeta en la tienda en línea. En mi equipo nadie entiende qué pasó con el servicio de pagos. Necesito explicarle al equipo de ventas qué pasó, cómo nos afecta y qué esperamos. ¿Me ayudas a redactarlo?",
  "criterionIds": [
    "rol",
    "audiencia",
    "objetivo",
    "formato",
    "contexto",
    "restricciones"
  ],
  "required": [
    "rol",
    "audiencia",
    "objetivo",
    "formato"
  ],
  "optional": [
    "contexto",
    "restricciones"
  ],
  "hints": [
    "¿Quién va a explicar y a quién le está explicando?",
    "¿Qué debe entender alguien que no sabe de sistemas? Pide que el texto no use jerga.",
    "¿Cómo quieres que se organice el texto? Pide secciones con título."
  ],
  "reference": "Qué pasó: desde ayer a las 3 p. m. el sistema que procesa los pagos con tarjeta dejó de responder, por una falla en su conexión con el proveedor.\nImpacto: las compras con tarjeta no se completaron durante ese tiempo. Los pagos en efectivo y por transferencia siguieron funcionando.\nSiguiente paso: el equipo técnico trabaja en restablecer el servicio y en revisar las compras pendientes, para avisar a los clientes afectados.",
  "detectionWords": {
    "rol": [
      "actúa como",
      "eres un",
      "eres una",
      "como redactor",
      "como encargado",
      "compórtate como"
    ],
    "audiencia": [
      "para el equipo de ventas",
      "sin conocimientos técnicos",
      "para personas que no",
      "para alguien que no",
      "sin jerga",
      "para mi equipo"
    ],
    "objetivo": [
      "explicar",
      "explica",
      "qué pasó",
      "impacto",
      "siguiente paso",
      "qué esperamos",
      "redacta"
    ],
    "formato": [
      "tres secciones",
      "con títulos",
      "qué pasó",
      "impacto",
      "siguiente paso",
      "en secciones",
      "encabezados"
    ],
    "contexto": [
      "pagos",
      "tarjeta",
      "tienda en línea",
      "3 p. m.",
      "ayer",
      "proveedor"
    ],
    "restricciones": [
      "sin jerga",
      "evita",
      "no uses",
      "explica cualquier término",
      "lenguaje sencillo"
    ]
  },
  "weakResponse": "El servicio presentó un problema. El equipo debe revisarlo.",
  "thanks": "Gracias. Ahora el equipo puede entender el incidente y el siguiente paso.",
  "completion": "✓ Misión 1.3 completada. Has practicado instrucciones claras.",
  "rules": {
    "rol": {
      "patterns": [],
      "yes": "Has indicado el papel de quien escribe.",
      "no": "Asigna un papel concreto a la IA, por ejemplo analista, asistente o redactor técnico."
    },
    "audiencia": {
      "patterns": [],
      "yes": "Has indicado a quién va dirigida la explicación.",
      "no": "Indica que escribes para el equipo de ventas, sin conocimientos técnicos."
    },
    "objetivo": {
      "patterns": [],
      "yes": "Has indicado qué debe producir la IA.",
      "no": "Pide explicar qué pasó, cómo afecta al equipo y cuál es el siguiente paso."
    },
    "formato": {
      "patterns": [],
      "yes": "Has indicado una estructura para la respuesta.",
      "no": "Pide tres secciones con título: qué pasó, impacto y siguiente paso."
    },
    "contexto": {
      "patterns": [],
      "yes": "Has incluido datos de la situación del cliente.",
      "no": "Menciona los pagos con tarjeta, la tienda en línea o la hora del incidente."
    },
    "restricciones": {
      "patterns": [],
      "yes": "Has puesto límites a la respuesta.",
      "no": "Pide lenguaje sencillo, sin jerga, y explicar cualquier término técnico."
    }
  }
}, {
      thanks:'Gracias por ayudarnos a responder con claridad y sin prometer de más.',
      id:'2.1', legacyId:'correos-tienda', level:2, skill:'Contexto', title:'Correos de una tienda de ropa', clientTag:'Tienda en línea', client:'Tienda de ropa en línea',
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
  "id": "2.2",
  "level": 2,
  "skill": "Contexto",
  "title": "Política de devoluciones",
  "clientTag": "Cliente interno",
  "client": "Gerente de atención al cliente de una tienda de ropa",
  "brief": "Una clienta pide devolver un vestido que compró hace 40 días. Nuestra política es de 30 días desde la compra. Pero el sistema de devoluciones muestra 45 días, porque hay un error de configuración que todavía no se corrige. Necesito responderle hoy. ¿Me ayudas a preparar la respuesta y una nota interna para el equipo?",
  "criterionIds": [
    "contexto",
    "restricciones",
    "objetivo",
    "rol",
    "formato"
  ],
  "required": [
    "contexto",
    "restricciones",
    "objetivo"
  ],
  "optional": [
    "rol",
    "formato"
  ],
  "definitions": {
    "contexto": "incluye los datos del caso: la política de 30 días, la compra hace 40 días y el error de 45 días en el sistema.",
    "restricciones": "pide que la respuesta se base solo en la política, sin inventar excepciones ni plazos.",
    "objetivo": "dice qué debe producir: una respuesta para la clienta y una nota interna para el equipo.",
    "rol": "le dice a la IA qué papel tiene, por ejemplo agente de atención al cliente.",
    "formato": "pide una forma concreta, como dos bloques separados."
  },
  "hints": [
    "¿Qué información necesita saber la IA para responder bien? Piensa en la política y en la fecha de compra.",
    "¿Qué no debe suponer? Por ejemplo, excepciones o plazos que no estén en tus datos.",
    "Pide dos resultados por separado: una respuesta para la clienta y una nota interna sobre el error del sistema."
  ],
  "reference": "Respuesta para la clienta:\nGracias por escribirnos. Nuestra política permite devoluciones hasta 30 días después de la compra. Como tu compra fue hace 40 días, no podemos aceptar la devolución en este caso. Si tienes dudas sobre tu compra, con gusto te ayudamos.\n\nNota interna:\nEl sistema de devoluciones muestra 45 días por un error de configuración. Revisar antes de responder otros casos similares, y mantener la política de 30 días mientras se corrige.",
  "detectionWords": {
    "contexto": [
      "política",
      "30 días",
      "40 días",
      "45 días",
      "compró",
      "compra",
      "sistema",
      "error de configuración"
    ],
    "restricciones": [
      "no inventes",
      "no supongas",
      "solo con",
      "basado en",
      "sin excepciones",
      "no uses otros plazos"
    ],
    "objetivo": [
      "responde",
      "respuesta para",
      "nota interna",
      "prepara",
      "redacta",
      "necesito responder"
    ],
    "rol": [
      "actúa como",
      "eres un",
      "eres una",
      "como agente",
      "como encargado de atención"
    ],
    "formato": [
      "dos bloques",
      "por separado",
      "respuesta y nota",
      "en dos partes",
      "secciones"
    ]
  },
  "weakResponse": "Podemos aceptar la devolución y ampliar el plazo si hace falta.",
  "thanks": "Gracias. Ya puedo responder con los datos del caso y avisar al equipo.",
  "completion": "✓ Misión 2.2 completada. Has practicado el contexto.",
  "rules": {
    "contexto": {
      "patterns": [],
      "yes": "Has incluido los datos concretos del caso.",
      "no": "incluye los datos del caso: la política de 30 días, la compra hace 40 días y el error de 45 días en el sistema.",
      "details": [
        {
          "patterns": [
            "\\b(?:30|treinta) dias\\b"
          ],
          "missing": "Falta mencionar la política de 30 días."
        },
        {
          "patterns": [
            "\\b(?:40|cuarenta) dias\\b"
          ],
          "missing": "Falta mencionar que la compra fue hace 40 días."
        },
        {
          "patterns": [
            "\\b(?:45|cuarenta y cinco) dias\\b"
          ],
          "missing": "Falta mencionar que el sistema muestra 45 días."
        },
        {
          "patterns": [
            "\\b(?:error|fallo|problema|equivocacion|incorrect[oa]|mal configurad[oa])\\b"
          ],
          "missing": "Falta mencionar el error de configuración del sistema."
        }
      ]
    },
    "restricciones": {
      "patterns": [],
      "yes": "Has indicado qué no debe suponer la IA.",
      "no": "pide que la respuesta se base solo en la política, sin inventar excepciones ni plazos."
    },
    "objetivo": {
      "patterns": [],
      "yes": "Has pedido el resultado que necesita el cliente.",
      "no": "dice qué debe producir: una respuesta para la clienta y una nota interna para el equipo."
    },
    "rol": {
      "patterns": [],
      "yes": "Has indicado una especialidad para la IA.",
      "no": "le dice a la IA qué papel tiene, por ejemplo agente de atención al cliente."
    },
    "formato": {
      "patterns": [],
      "yes": "Has indicado cómo organizar la respuesta.",
      "no": "pide una forma concreta, como dos bloques separados."
    }
  }
}, {
  "id": "2.3",
  "level": 2,
  "skill": "Contexto",
  "title": "Caso de soporte técnico",
  "clientTag": "Cliente interno",
  "client": "Jefe de soporte de una oficina con red interna",
  "brief": "Un usuario reporta que la impresora de su área no aparece en la red desde esta mañana. Otros equipos del mismo piso sí la ven, y la impresora enciende y muestra su pantalla sin errores. Tenemos acceso al router y al servidor de impresión. ¿Qué pasos propones para diagnosticar? No quiero que asumas que el problema está en la impresora.",
  "criterionIds": [
    "contexto",
    "restricciones",
    "objetivo",
    "formato",
    "rol"
  ],
  "required": [
    "contexto",
    "restricciones",
    "objetivo",
    "formato"
  ],
  "optional": [
    "rol"
  ],
  "definitions": {
    "contexto": "incluye los síntomas (no aparece en la red, otros equipos sí la ven, la pantalla funciona) y los accesos disponibles (router y servidor de impresión).",
    "restricciones": "pide no asumir la causa, y no proponer cambios de configuración sin verificar antes.",
    "objetivo": "pide un diagnóstico paso a paso, de lo más simple a lo más complejo.",
    "formato": "pide una lista numerada de pasos.",
    "rol": "le dice a la IA qué papel tiene, por ejemplo técnico de soporte de redes."
  },
  "hints": [
    "¿Qué síntomas y qué datos disponibles tiene la IA? Incluye lo que sí funciona, no solo lo que falla.",
    "¿Qué no debe asumir? Por ejemplo, que la impresora está dañada o que hay que reiniciar el router sin verificar.",
    "Pide una lista numerada, ordenada de lo más simple a lo más complejo."
  ],
  "reference": "1. Desde el equipo afectado, prueba si responde la IP de la impresora. Repite la prueba desde otro equipo que sí la ve. Si solo falla en el primero, el problema está en ese equipo.\n2. Revisa en el servidor DHCP si la impresora tiene una IP reservada, y si esa IP cambió desde esta mañana.\n3. Compara el segmento de red del equipo afectado con el de la impresora, para confirmar que están en la misma red o con ruta entre ellas.\n4. Revisa los registros del servidor de impresión para ver si la impresora se desconectó o cambió de dirección.\n5. Solo si todo lo anterior falla, planea reiniciar el router, avisando antes a los usuarios afectados.",
  "detectionWords": {
    "contexto": [
      "no aparece",
      "no la ven",
      "otros equipos",
      "desde esta mañana",
      "la pantalla",
      "router",
      "servidor de impresión"
    ],
    "restricciones": [
      "no asumas",
      "no supongas",
      "sin verificar",
      "no reinicies",
      "antes de cambiar",
      "no des por hecho"
    ],
    "objetivo": [
      "diagnosticar",
      "diagnóstico",
      "pasos",
      "qué revisar",
      "cómo verificar",
      "qué hacer"
    ],
    "formato": [
      "lista numerada",
      "numerada",
      "paso a paso",
      "en pasos",
      "1.",
      "ordenados"
    ],
    "rol": [
      "actúa como",
      "eres un técnico",
      "eres una técnica",
      "como soporte de redes",
      "como administrador"
    ]
  },
  "weakResponse": "Reinicia el router y cambia la configuración de la impresora.",
  "thanks": "Gracias. Ahora tenemos un orden para diagnosticar sin asumir la causa.",
  "completion": "✓ Misión 2.3 completada. Has practicado el contexto.",
  "rules": {
    "contexto": {
      "patterns": [],
      "yes": "Has incluido los datos concretos del caso.",
      "no": "incluye los síntomas (no aparece en la red, otros equipos sí la ven, la pantalla funciona) y los accesos disponibles (router y servidor de impresión).",
      "details": [
        {
          "patterns": [
            "\\b(?:no aparece|no la ven|no (?:la )?(?:ve|detecta|encuentra)|no (?:puede|puedo) (?:ver|encontrar|detectar))\\b"
          ],
          "missing": "Falta mencionar que el equipo afectado no ve la impresora en la red."
        },
        {
          "patterns": [
            "\\b(?:otros equipos|otras computadoras|otros ordenadores|resto de (?:equipos|computadoras))\\b[\\s\\S]{0,90}\\b(?:si|ven|detectan|encuentran)\\b"
          ],
          "missing": "Falta mencionar que otros equipos sí ven la impresora."
        },
        {
          "patterns": [
            "\\b(?:pantalla|enciende|encendida|sin errores)\\b"
          ],
          "missing": "Falta mencionar que la impresora enciende y su pantalla no muestra errores."
        },
        {
          "patterns": [
            "\\b(?:router|enrutador|ruteador)\\b"
          ],
          "missing": "Falta mencionar el acceso al router."
        },
        {
          "patterns": [
            "\\b(?:servidor de impresion|servidor de impresora|servidor que gestiona la impresion)\\b"
          ],
          "missing": "Falta mencionar el acceso al servidor de impresión."
        }
      ]
    },
    "restricciones": {
      "patterns": [],
      "yes": "Has indicado qué no debe suponer la IA.",
      "no": "pide no asumir la causa, y no proponer cambios de configuración sin verificar antes."
    },
    "objetivo": {
      "patterns": [],
      "yes": "Has pedido el resultado que necesita el cliente.",
      "no": "pide un diagnóstico paso a paso, de lo más simple a lo más complejo."
    },
    "formato": {
      "patterns": [],
      "yes": "Has indicado cómo organizar la respuesta.",
      "no": "pide una lista numerada de pasos."
    },
    "rol": {
      "patterns": [],
      "yes": "Has indicado una especialidad para la IA.",
      "no": "le dice a la IA qué papel tiene, por ejemplo técnico de soporte de redes."
    }
  }
}, {id:'3.1',level:3,skill:'Formato',title:'Próximamente',available:false}, {id:'3.2',level:3,skill:'Formato',title:'Próximamente',available:false}, {
      thanks:'Ahora tengo una guía para repasar. Gracias por poner orden en mis apuntes.',
      id:'3.3', legacyId:'resumen-examen', level:3, skill:'Formato', title:'Resumen para examen', clientTag:'Estudiante', client:'Estudiante de historia',
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

export const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key]);

// Criterios propios sin alterar los seis criterios originales de la misión 1.1.
export const ADDITIONAL_CRITERIA = {
  audiencia:{ id:'audiencia', label:'Audiencia', patterns:[], yes:'Has indicado para quién escribes.', no:'Indica a quién va dirigida la respuesta.' }
};
export const missionNumber = mission => mission.id === 'menu-semanal' ? '1.1' : mission.id;
export function getMissionCriteria(mission, language = 'es') {
  const base = CONTENT[language].criteria;
  const ids = mission.criterionIds || base.map(criterion => criterion.id);
  return ids.map(id => ({ ...(base.find(criterion => criterion.id === id) || ADDITIONAL_CRITERIA[id]), ...mission.rules?.[id] }));
}
for (const mission of CONTENT.es.missions) {
  if (!mission.detectionWords) continue;
  for (const [id, words] of Object.entries(mission.detectionWords)) {
    mission.rules[id].patterns = words.map(word => {
      const normalized = word.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('\\b' + escaped + (/\w$/.test(normalized) ? '\\b' : '(?=\\s|$)'));
    });
  }
}

for (const mission of CONTENT.es.missions) {
  for (const rule of Object.values(mission.rules || {})) {
    for (const detail of rule.details || []) detail.patterns = detail.patterns.map(pattern => new RegExp(pattern));
  }
}
