/* Evidencias del portafolio. Edita aquí: cada proyecto tiene versión ES y EN.
   link: URL pública de la evidencia (repositorio, certificado, foto, publicación). */
window.PROJECTS = [
  {
    id: 'hotel',
    icon: 'hotel',
    tone: 'accent',
    year: '2026',
    stack: ['TypeScript', 'React', 'Electron', 'Prisma', 'Neon', 'Cucumber', 'GitHub Actions'],
    link: null,
    es: {
      kicker: 'Proyecto laboral · Agenti, Co.',
      title: 'Sistema de reservas hotelero',
      summary: 'Website público y app de escritorio en producción con sincronización en tiempo real.',
      objetivo: 'Destrabar un proyecto con 6 meses de retraso y llevar a producción un sistema de reservas para hoteles: sitio público, aplicación de escritorio y panel de gestión.',
      participacion: 'Referente técnica del equipo de 5 personas. Construí módulos de back-office en Electron (habitaciones, reservas, huéspedes, estacionamiento, facturación SIFEN y reportes), la suite de pruebas BDD y E2E, y los pipelines de CI/CD. Contribuí a la migración de Prisma a Neon sin interrupciones.',
      resultado: 'El producto alcanzó estado de producción, con sincronización entre canales y notificaciones automáticas. Participé en reuniones comerciales con cadenas hoteleras de Asunción y una constructora de EE. UU.'
    },
    en: {
      kicker: 'Work project · Agenti, Co.',
      title: 'Hotel booking system',
      summary: 'Public website and desktop app in production with real-time sync.',
      objetivo: 'Unblock a project running 6 months late and ship a hotel booking system to production: public site, desktop app and management panel.',
      participacion: 'Technical lead for a 5-person team. I built Electron back-office modules (rooms, bookings, guests, parking, SIFEN invoicing and reports), the BDD and E2E test suite, and CI/CD pipelines. I helped migrate from Prisma to Neon with zero downtime.',
      resultado: 'The product reached production with cross-channel sync and automatic notifications. I joined sales meetings with Asunción hotel chains and a US construction company.'
    }
  },
  {
    id: 'cit',
    icon: 'calendar-heart',
    tone: 'accent',
    year: 'CIT · FPUNA',
    stack: ['Organización', 'Logística', 'Comunicación'],
    link: null,
    es: {
      kicker: 'Pasantía · CIT, Facultad Politécnica',
      title: 'Organización de eventos académicos',
      summary: 'Tres eventos de alcance nacional e internacional.',
      objetivo: 'Apoyar la planificación y ejecución de eventos académicos y técnicos de la Facultad Politécnica.',
      participacion: 'Organicé el Programa de Desarrollo de Capacidades Docentes: Finanzas e IA por medio de ABP, el XIV Congreso de la Sociedad Latinoamericana de Biología Matemática y el Paraguay Testing Fest.',
      resultado: 'Los tres eventos se realizaron según lo planificado, con coordinación entre organizadores, expositores y participantes.'
    },
    en: {
      kicker: 'Internship · CIT, Facultad Politécnica',
      title: 'Academic event organization',
      summary: 'Three events with national and international reach.',
      objetivo: 'Support the planning and delivery of academic and technical events at the Facultad Politécnica.',
      participacion: 'I organized the Teacher Capacity Development Program: Finance and AI through PBL, the XIV Congress of the Latin American Society of Mathematical Biology, and Paraguay Testing Fest.',
      resultado: 'All three events took place as planned, coordinating organizers, speakers and attendees.'
    }
  },
  {
    id: 'agendapy',
    icon: 'calendar-check',
    tone: 'sage',
    year: '2026',
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'NextAuth', 'Tailwind CSS'],
    link: 'https://agendapy.com.py/',
    es: {
      kicker: 'Proyecto personal',
      title: 'Agendapy',
      summary: 'Plataforma de reservas y turnos online para pequeños negocios.',
      objetivo: 'Dar a pequeños negocios una forma simple de gestionar turnos y reservas en línea.',
      participacion: 'Desarrollo fullstack completo: modelo de datos, autenticación, interfaz y lógica de reservas.',
      resultado: 'Plataforma funcional en desarrollo activo, construida con un stack moderno.'
    },
    en: {
      kicker: 'Personal project',
      title: 'Agendapy',
      summary: 'Online booking and appointment platform for small businesses.',
      objetivo: 'Give small businesses a simple way to manage appointments and bookings online.',
      participacion: 'Full-stack development: data model, authentication, interface and booking logic.',
      resultado: 'A working platform under active development, built on a modern stack.'
    }
  },
  {
    id: 'bot',
    icon: 'bot',
    tone: 'sage',
    year: '2026',
    stack: ['IA', 'Python'],
    //link: 'https://agendapy.com.py/',
    es: {
      kicker: 'Proyecto académico',
      title: 'Bot de estudio para la facultad',
      summary: 'Asistente que ayuda a repasar los temas de las materias de la carrera.',
      objetivo: 'Facilitar el estudio de los contenidos de la facultad con un asistente que responde y repasa temas de la materia.',
      participacion: 'Idea, diseño y desarrollo completo, por iniciativa propia.',
      resultado: 'Herramienta funcional que uso para preparar exámenes y que puede compartirse con compañeros.'
    },
    en: {
      kicker: 'Personal project',
      title: 'University study bot',
      summary: 'An assistant that helps review course topics.',
      objetivo: 'Make studying university content easier with an assistant that answers questions and reviews course topics.',
      participacion: 'Idea, design and full development, on my own initiative.',
      resultado: 'A working tool I use to prepare for exams that can be shared with classmates.'
    }
  },
  {
    id: 'mercor',
    icon: 'brain-circuit',
    tone: 'accent',
    year: '2026',
    stack: ['Python', 'Go', 'C', 'Java', 'Kotlin', 'JSON'],
    link: null,
    es: {
      kicker: 'Logro · Mercor',
      title: 'Datos de entrenamiento para LLMs de código',
      summary: 'El doble de entregas semanales que el promedio del equipo.',
      objetivo: 'Producir anotaciones de razonamiento técnico de alta calidad para entrenar modelos de lenguaje de código.',
      participacion: 'Anoté trazas chain-of-thought sobre scripts en cinco lenguajes y entregué archivos JSON según especificación del cliente.',
      resultado: 'Fui la anotadora de mayor rendimiento del equipo, sosteniendo el doble de entregas semanales sin comprometer los estándares de calidad.'
    },
    en: {
      kicker: 'Achievement · Mercor',
      title: 'Training data for code LLMs',
      summary: 'Twice the team average of weekly deliveries.',
      objetivo: 'Produce high-quality technical reasoning annotations to train code language models.',
      participacion: 'I annotated chain-of-thought traces over scripts in five languages and delivered JSON files to client specification.',
      resultado: 'I was the top-performing annotator on the team, sustaining twice the weekly output without lowering quality standards.'
    }
  }
];
