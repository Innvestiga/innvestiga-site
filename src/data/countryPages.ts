import type { FaqItem } from "./faq";

export interface CoverageZone {
  /** Zone as the client names it, e.g. "Tierra Fría (altiplano)". */
  name: string;
  /** Departments, provinces or regions in the zone (third column). */
  divisions?: string[];
  /** Main cities, districts and commercial hubs. */
  cities: string[];
}

/** An H3 subsection of "Cobertura en {País}". */
export interface ZoneSection {
  /** Anchor id; the client fixed the Guatemala ones. */
  id: string;
  title: string;
  text: string;
}

export interface CountryPage {
  slug: string;
  /** Meta, Open Graph and Twitter description. */
  description: string;
  /** Opening paragraph under the H1. */
  intro: string;
  /** Column headers of the coverage table, as the client wrote them. */
  zoneHeader: string;
  divisionsHeader?: string;
  citiesHeader: string;
  /** Coverage table rows; also the areaServed of the page schema. */
  zones: CoverageZone[];
  /** "Cobertura en {País}": paragraphs before the zone subsections. */
  coverage: string[];
  zoneSections: ZoneSection[];
  /** Paragraphs after the zone subsections. */
  coverageClosing?: string[];
  /** "Cómo trabajamos en {País}". */
  howWeWork: string[];
  faqs: FaqItem[];
}

// Country copy for the coverage pages, in the order of COVERAGE. The intro,
// coverage, zones and tables are the client's text (2026-10, "Additional
// Changes"); every country gets the same structure and relevance, offices
// are named only in Ciudad de Guatemala and San Salvador, and no sentence is
// shared between countries (enforced by the tests).
export const COUNTRY_PAGES: CountryPage[] = [
  {
    slug: "guatemala",
    description:
      "Auditorías con cliente oculto en Guatemala: Gran Área Metropolitana, altiplano, costa sur, oriente y Caribe. 340 municipios, resultados en 3 días.",
    intro:
      "Evaluamos puntos de venta en los 22 departamentos de Guatemala, en cinco grandes zonas: la Gran Área Metropolitana, la Tierra Fría del altiplano, la Tierra Caliente de la costa sur, el oriente, y el Caribe, Petén y las Verapaces.",
    zoneHeader: "Zona",
    divisionsHeader: "Departamentos",
    citiesHeader: "Ciudades principales",
    zones: [
      {
        name: "Gran Área Metropolitana de Guatemala",
        divisions: ["Guatemala"],
        cities: ["Ciudad de Guatemala", "Mixco", "Villa Nueva", "San José Pinula", "Santa Catarina Pinula", "Chinautla", "Amatitlán"],
      },
      {
        name: "Tierra Fría (altiplano)",
        divisions: ["Quetzaltenango", "Quiché", "Huehuetenango", "Sololá", "Totonicapán", "Chimaltenango", "Sacatepéquez"],
        cities: ["Quetzaltenango (Xela)", "Coatepeque", "Salcajá", "Santa Cruz del Quiché", "Huehuetenango", "Soloma", "Sololá", "Panajachel", "Totonicapán", "Chimaltenango", "Antigua Guatemala", "Jocotenango", "San Lucas Sacatepéquez"],
      },
      {
        name: "Tierra Caliente (costa sur)",
        divisions: ["San Marcos", "Retalhuleu", "Suchitepéquez", "Escuintla", "Santa Rosa"],
        cities: ["San Marcos", "Malacatán", "Tecún Umán", "Retalhuleu", "Mazatenango", "Cuyotenango", "Escuintla", "Santa Lucía Cotzumalguapa", "Puerto San José", "Chiquimulilla", "Pedro de Alvarado (frontera)"],
      },
      {
        name: "Oriente",
        divisions: ["Jutiapa", "Santa Rosa", "Chiquimula", "Zacapa", "El Progreso", "Jalapa"],
        cities: ["Jutiapa", "Barberena", "Cuilapa", "Esquipulas", "Chiquimula", "Zacapa", "Guastatoya", "Jalapa"],
      },
      {
        name: "Caribe, Petén y Verapaces",
        divisions: ["Izabal", "Petén", "Alta Verapaz", "Baja Verapaz"],
        cities: ["Puerto Barrios", "Morales", "Livingston", "Flores", "Santa Elena", "San Benito", "Poptún", "Cobán", "San Pedro Carchá", "Salamá", "El Rancho"],
      },
    ],
    coverage: [
      "Nuestra oficina en Ciudad de Guatemala coordina los proyectos y es tu punto de contacto directo. Para nosotros cada país es igual de importante: en Guatemala tu operación recibe el mismo método y la misma atención que en cualquier otro mercado de la región.",
      "Guatemala tiene 22 departamentos y 340 municipios, y podemos evaluar cualquiera de ellos. Para ordenar la cobertura la dividimos en cinco zonas, porque cada una tiene su propio ritmo comercial y su propia cultura. La distancia entre una tienda de la capital y una del interior no es solo geográfica: a menudo cambian el tipo de cliente y la forma en que se aplica tu estándar. Una auditoría con el mismo método en todas tus sucursales te muestra dónde el servicio se mantiene y dónde se aleja de lo que defines.",
    ],
    zoneSections: [
      {
        id: "gam",
        title: "1. Gran Área Metropolitana de Guatemala",
        text: "Es el centro comercial del país. Incluye Ciudad de Guatemala, Mixco, Villa Nueva, San José Pinula, Santa Catarina Pinula, Chinautla y Amatitlán, con los principales centros comerciales y las zonas donde se concentran las tiendas de las grandes cadenas.",
      },
      {
        id: "tierra-fria",
        title: "2. Tierra Fría: el altiplano",
        text: "En el altiplano evaluamos ciudades como Quetzaltenango (Xela), Santa Cruz del Quiché, Huehuetenango (Huehue), Soloma y Panajachel. Es una zona con fuerte presencia de comunidades mayas y de idiomas como el k’iche’ y el mam, y con una cultura comercial propia.",
      },
      {
        id: "tierra-caliente",
        title: "3. Tierra Caliente: la costa sur",
        text: "Desde la frontera de Tecún Umán y San Marcos, pasando por Retalhuleu (Reu), Santa Lucía Cotzumalguapa, Escuintla, Chiquimulilla y Puerto San José, hasta la frontera de Pedro de Alvarado. Es una zona de agroindustria, puertos y comercio fronterizo, con una dinámica de tienda distinta a la del altiplano.",
      },
      {
        id: "oriente",
        title: "4. Oriente",
        text: "Incluye la población de Jutiapa, el desarrollo de Barberena y Cuilapa, las ciudades turísticas de Esquipulas y Chiquimula, y las zonas agrícolas de Zacapa. Es también la puerta hacia El Salvador y Honduras.",
      },
      {
        id: "caribe-peten-verapaces",
        title: "5. Caribe, Petén y Verapaces",
        text: "En el Caribe, Puerto Barrios y Livingston, con una importante población garífuna y vocación turística. Al norte, Flores y los sitios históricos de Petén. Y bajando hacia Alta y Baja Verapaz, Cobán y El Rancho, punto de encuentro de las rutas hacia el Caribe y el norte.",
      },
    ],
    howWeWork: [
      "Arrancamos con una conversación sobre lo que quieres medir. Juntos convertimos tu estándar de atención en una guía de evaluación con criterios claros, de modo que cada calificación se pueda explicar con evidencia.",
      "Luego definimos el escenario de cada visita: una compra, una garantía, un reclamo o una consulta de precio en quetzales. El auditor se presenta como un cliente real y registra lo que ocurre, sin que tu personal sepa que está siendo evaluado.",
      "Los resultados llegan a ESI en máximo 3 días después de cada visita. Planificamos las visitas por zona para que la auditoría avance de forma ordenada entre la capital, el altiplano, la costa, el oriente y el norte. Desde ESI revisas la evidencia por sucursal, comparas las cinco zonas del país y preparas la presentación para tu comité.",
      "Si tu operación se extiende a Honduras, El Salvador o Chiapas, usamos la misma guía en cada lado de la frontera. Así tus resultados guatemaltecos se comparan con los demás países sin ajustes. Una cadena con tiendas en varios mercados ve, en un mismo tablero, qué país cumple mejor su estándar y dónde conviene reforzar la capacitación.",
    ],
    faqs: [
      {
        question: "¿Pueden auditar sucursales en el interior del país?",
        answer:
          "Sí. Podemos evaluar cualquiera de los 340 municipios de Guatemala, de modo que una tienda en Quetzaltenango, Escuintla o Petén recibe la misma evaluación que una en la capital.",
      },
      {
        question: "¿Con quién trato si mi empresa está en Guatemala?",
        answer:
          "Con nuestro equipo comercial en Ciudad de Guatemala. Te acompaña desde la definición de criterios hasta la presentación de resultados, y puedes escribirnos o llamarnos al teléfono de esta página.",
      },
      {
        question: "¿Puedo comparar mis sucursales guatemaltecas con las de otros países?",
        answer:
          "Sí. Usamos la misma guía de evaluación en los 8 países donde auditamos, así que tus resultados de Guatemala se comparan directamente con los de El Salvador, Honduras o cualquier otro mercado.",
      },
    ],
  },
  {
    slug: "honduras",
    description:
      "Auditorías de cliente oculto en Honduras: Distrito Central, Valle de Sula, zona norte, occidente y sur. 18 departamentos, auditorías en 3 días.",
    intro:
      "Evaluamos puntos de venta en los 18 departamentos de Honduras: Tegucigalpa y Comayagüela, el motor industrial del Valle de Sula, la cuenca del Caribe, el occidente colonial y comercial, y la franja del Pacífico.",
    zoneHeader: "Zona",
    divisionsHeader: "Departamentos",
    citiesHeader: "Ciudades principales",
    zones: [
      {
        name: "Distrito Central y Centro",
        divisions: ["Francisco Morazán", "Comayagua", "La Paz"],
        cities: ["Tegucigalpa", "Comayagüela", "Valle de Ángeles", "Ojojona", "Comayagua", "Siguatepeque", "La Paz"],
      },
      {
        name: "Valle de Sula",
        divisions: ["Cortés", "Yoro"],
        cities: ["San Pedro Sula", "Choloma", "Villanueva", "La Lima", "Puerto Cortés", "El Progreso", "Olanchito"],
      },
      {
        name: "Litoral Atlántico e Islas",
        divisions: ["Atlántida", "Colón", "Islas de la Bahía"],
        cities: ["La Ceiba", "Tela", "Trujillo", "Tocoa", "Roatán (Coxen Hole, West End)", "Útila"],
      },
      {
        name: "Occidente",
        divisions: ["Copán", "Ocotepeque", "Lempira", "Intibucá"],
        cities: ["Santa Rosa de Copán", "Copán Ruinas", "Ocotepeque", "Gracias", "La Esperanza"],
      },
      {
        name: "Sur y Oriente",
        divisions: ["Choluteca", "Valle", "Olancho", "El Paraíso"],
        cities: ["Choluteca", "San Lorenzo", "Juticalpa", "Catacamas", "Danlí", "El Paraíso"],
      },
    ],
    coverage: [
      "Evaluamos la experiencia de cliente en todo el territorio hondureño con un método unificado y de alta velocidad. Honduras presenta una estructura urbana bicéntrica dividida entre la capital política y el polo industrial del norte, complementada por corredores agrícolas y turísticos de alta densidad. Podemos evaluar tus puntos de venta en cualquiera de sus 298 municipios.",
    ],
    zoneSections: [
      {
        id: "distrito-central",
        title: "1. Distrito Central y Región Central",
        text: "Cubrimos la capital Tegucigalpa y Comayagüela, articulando evaluaciones en los principales centros comerciales y zonas bancarias. Extendemos la cobertura hacia Comayagua y Siguatepeque, aprovechando la conectividad del aeropuerto internacional de Palmerola.",
      },
      {
        id: "valle-de-sula",
        title: "2. Valle de Sula y Zona Norte",
        text: "San Pedro Sula representa el corazón comercial del país. Evaluamos operaciones en San Pedro Sula, Choloma, Villanueva, La Lima, El Progreso y Puerto Cortés, cubriendo la franja industrial y logística más activa de Honduras.",
      },
      {
        id: "litoral-atlantico",
        title: "3. Litoral Atlántico e Islas de la Bahía",
        text: "Evaluamos puntos de servicio en La Ceiba, Tela y Trujillo, así como en los centros turísticos e insulares de Roatán y Útila, donde los estándares de atención al cliente internacionales son críticos.",
      },
      {
        id: "occidente",
        title: "4. Occidente",
        text: "Cobertura en Santa Rosa de Copán, Ocotepeque y Gracias, zonas clave para redes bancarias, farmacias, cadenas de consumo masivo y comercio transfronterizo con Guatemala y El Salvador.",
      },
      {
        id: "sur-oriente",
        title: "5. Sur y Oriente",
        text: "En el sur evaluamos Choluteca y Valle (San Lorenzo), conectando con la Ruta Panamericana. En el oriente cubrimos Juticalpa, Catacamas y Danlí.",
      },
    ],
    howWeWork: [
      "Los criterios de evaluación se definen contigo antes de la primera visita. Cada pregunta de la guía corresponde a algo que tu equipo debe hacer y que el auditor puede comprobar.",
      "El auditor visita tu tienda hondureña como un cliente común, con un escenario acordado, y paga o pregunta en lempiras como lo haría cualquier comprador. Registra lo que ve y lo que escucha, y respalda su evaluación con evidencia.",
      "En máximo 3 días tienes los resultados en ESI. Ahí comparas tus sucursales hondureñas entre sí y con las de otros países de la región, siempre con la misma escala.",
      "La coordinación comercial se hace desde Guatemala y El Salvador, y la operación de campo trabaja en Honduras con la misma metodología que en el resto de la región.",
      "Cuando el escenario lo pide, como una garantía o una reparación, el auditor da seguimiento al caso hasta el final para medir si se cumplió lo prometido.",
    ],
    faqs: [
      {
        question: "¿Pueden auditar en San Pedro Sula y en Tegucigalpa en la misma ola de visitas?",
        answer:
          "Sí. Planificamos las visitas para que tus sucursales de ambas ciudades se evalúen en el mismo periodo, con los mismos criterios, y puedas compararlas sin diferencias de tiempo.",
      },
      {
        question: "¿Qué pasa si tengo sucursales fuera de las ciudades principales?",
        answer:
          "También se pueden evaluar. Llegamos a cualquiera de los 298 municipios hondureños, incluidos los de la costa norte y el occidente del país.",
      },
    ],
  },
  {
    slug: "el-salvador",
    description:
      "Auditorías con cliente oculto en El Salvador, del río Paz al río Goascorán: 44 municipios, evidencia real y resultados en 3 días.",
    intro:
      "Evaluamos puntos de venta en todo El Salvador, desde el río Paz hasta el río Goascorán: el Área Metropolitana del Gran San Salvador, La Libertad, el occidente y el oriente del país.",
    zoneHeader: "Zona",
    citiesHeader: "Ciudades y distritos principales",
    zones: [
      {
        name: "Gran San Salvador, departamento de San Salvador",
        cities: ["San Salvador (Centro Histórico)", "San Marcos", "Soyapango", "Ilopango", "San Martín", "Ayutuxtepeque", "Mejicanos", "Cuscatancingo", "Ciudad Delgado", "Apopa (Valle Dulce)", "Nejapa"],
      },
      {
        name: "Gran San Salvador, departamento de La Libertad",
        cities: ["Santa Tecla", "Antiguo Cuscatlán", "Nuevo Cuscatlán", "Colón", "Lourdes"],
      },
      {
        name: "La Libertad: costa e interior",
        cities: ["Puerto de La Libertad", "El Tunco", "El Zonte (Surf City 1)", "San Juan Opico"],
      },
      {
        name: "Occidente",
        cities: ["Santa Ana", "Chalchuapa", "Metapán", "Ahuachapán", "Sonsonate", "Acajutla", "Izalco"],
      },
      {
        name: "Oriente",
        cities: ["San Miguel", "Usulután", "Jiquilisco (Surf City 2)", "La Unión", "San Francisco Gotera"],
      },
      {
        name: "Centro y paracentral",
        cities: ["Cojutepeque", "San Vicente", "Zacatecoluca", "El Rosario (Zona Aeropuerto)", "Sensuntepeque", "Ilobasco", "Chalatenango"],
      },
    ],
    coverage: [
      "Desde nuestra oficina en San Salvador coordinamos cada proyecto y acompañamos a tu equipo de principio a fin. Para nosotros cada país es igual de importante: en El Salvador tu operación recibe el mismo método y la misma atención que en cualquier otro mercado de la región.",
      "Evaluamos tus sucursales desde el río Paz, en el límite con Guatemala, hasta el río Goascorán, en el límite con Honduras. Tras la reorganización municipal, el país cuenta con 44 municipios, cada uno con varios distritos, y podemos evaluar tus puntos de venta en cualquiera de ellos.",
    ],
    zoneSections: [
      {
        id: "gran-san-salvador",
        title: "El Área Metropolitana del Gran San Salvador",
        text: "Cubrimos el Área Metropolitana del Gran San Salvador, que incluye los distritos de San Salvador, San Marcos, Soyapango, Ilopango, San Martín, Ayutuxtepeque, Mejicanos, Cuscatancingo, Ciudad Delgado, Apopa, Nejapa, Lourdes, Colón, Santa Tecla, Nuevo Cuscatlán y Antiguo Cuscatlán. Algunos de ellos, como Santa Tecla, Nuevo Cuscatlán, Antiguo Cuscatlán, Colón y Lourdes, están en el departamento de La Libertad y no en el de San Salvador, pero forman parte de la misma área metropolitana.",
      },
      {
        id: "zonas-de-desarrollo",
        title: "Zonas con mayor desarrollo económico",
        text: "También evaluamos las zonas donde hoy crece la actividad comercial: el Centro Histórico de San Salvador, la costa de La Libertad (Surf City 1), la costa oriental de Usulután y San Miguel (Surf City 2) y los desarrollos comerciales de Valle Dulce, Soyapango y San Marcos.",
      },
      {
        id: "occidente-oriente",
        title: "Occidente y oriente",
        text: "En el occidente cubrimos las poblaciones de Santa Ana, Chalchuapa y Ahuachapán. En el oriente, San Miguel y Usulután.",
      },
    ],
    coverageClosing: [
      "Como el territorio es compacto, una misma ola de visitas puede cubrir todas tus sucursales en pocos días. Así comparas la capital con el resto del país en el mismo periodo y con el mismo criterio, sin que pasen semanas entre una visita y otra.",
    ],
    howWeWork: [
      "Para empezar, definimos contigo los criterios. Tomamos tu manual de servicio, tu protocolo de venta o tu política de garantías y lo convertimos en una guía de evaluación clara. Cada punto que se califica tiene una respuesta verificable.",
      "Después preparamos al equipo de campo con el escenario que acordamos. El auditor llega a tu sucursal como un cliente más, en dólares y con los productos que de verdad vendes, y vive la atención tal como la vive tu cliente.",
      "La evidencia de cada visita llega a ESI, nuestra plataforma propia, en máximo 3 días. Ahí ves lo que pasó en cada sucursal salvadoreña, la comparas con las demás y la presentas a tu comité con hallazgos y recomendaciones.",
      "Si tu empresa también opera en Guatemala o en otro país de la región, la auditoría salvadoreña usa la misma guía. Así lees los resultados de todos tus países en una sola escala.",
    ],
    faqs: [
      {
        question: "¿Pueden auditar sucursales fuera de San Salvador?",
        answer:
          "Sí. La operación de campo llega a los 44 municipios del país, así que una sucursal en Santa Ana, San Miguel o cualquier otro municipio se evalúa con el mismo método que una tienda en la capital.",
      },
      {
        question: "¿Cómo cuentan los municipios después de la reorganización municipal?",
        answer:
          "Usamos la división vigente: 44 municipios, cada uno con sus distritos. Cuando planificamos tu auditoría ubicamos cada sucursal en su municipio y en su distrito para que los resultados se lean con claridad.",
      },
      {
        question: "¿Puedo empezar con una prueba piloto en El Salvador?",
        answer:
          "Sí. La prueba piloto te permite comprobar el método en tus propias sucursales salvadoreñas antes de decidir, y nuestro equipo comercial en San Salvador te acompaña durante todo el proceso.",
      },
    ],
  },
  {
    slug: "nicaragua",
    description:
      "Auditorías con cliente oculto en Nicaragua: Managua, Pacífico, zona central, norte y Caribe. Cobertura nacional con reportes en 3 días.",
    intro:
      "Evaluamos puntos de venta en los 15 departamentos y 2 regiones autónomas de Nicaragua: la capital Managua, la franja del Pacífico, los valles del norte y el corredor del Caribe.",
    zoneHeader: "Zona",
    divisionsHeader: "Departamentos / Regiones",
    citiesHeader: "Ciudades principales",
    zones: [
      {
        name: "Managua y Metropolitana",
        divisions: ["Managua"],
        cities: ["Managua", "Ciudad Sandino", "Tipitapa", "Mateare"],
      },
      {
        name: "Pacífico Norte y Sur",
        divisions: ["León", "Chinandega", "Granada", "Masaya", "Carazo", "Rivas"],
        cities: ["León", "Chinandega", "Corinto", "Granada", "Masaya", "Jinotepe", "Diriamba", "Rivas", "San Juan del Sur"],
      },
      {
        name: "Zona Norte",
        divisions: ["Estelí", "Matagalpa", "Jinotega", "Madriz", "Nueva Segovia"],
        cities: ["Estelí", "Matagalpa", "Jinotega", "Somoto", "Ocotal"],
      },
      {
        name: "Centro, Sur y Costa Caribe",
        divisions: ["Chontales", "Boaco", "Río San Juan", "RACCS", "RACCN"],
        cities: ["Juigalpa", "Boaco", "San Carlos", "Bluefields", "Puerto Cabezas (Bilwi)"],
      },
    ],
    coverage: [
      "Nicaragua cuenta con un corredor comercial consolidado a lo largo de la franja del Pacífico y una expansión sostenida hacia los departamentos del norte y centro. Evaluamos sucursales en cualquiera de sus 153 municipios con auditores locales capacitados.",
    ],
    zoneSections: [
      {
        id: "managua",
        title: "1. Managua y Área Metropolitana",
        text: "Managua concentra la mayor actividad financiera, comercial y de servicios del país. Evaluamos los principales ejes de la capital (Carretera a Masaya, Plaza España, Santo Domingo) y municipios conurbados como Ciudad Sandino y Tipitapa.",
      },
      {
        id: "pacifico",
        title: "2. Franja del Pacífico",
        text: "Evaluamos redes de tiendas en las ciudades históricas y turísticas de León y Granada, así como en Chinandega, Masaya, Carazo (Jinotepe) y Rivas (incluyendo la zona turística de San Juan del Sur).",
      },
      {
        id: "norte-central",
        title: "3. Norte y Central",
        text: "Cubrimos las zonas cafetaleras y comerciales de Estelí, Matagalpa, Jinotega, Somoto y Ocotal, caracterizadas por un dinámico comercio minorista y agroindustrial.",
      },
      {
        id: "chontales-boaco-caribe",
        title: "4. Chontales, Boaco y Caribe",
        text: "Evaluamos puntos de venta en Juigalpa, Boaco, San Carlos (Río San Juan) y en las Regiones Autónomas (RACCS y RACCN) en Puerto Cabezas (Bilwi) y Bluefields.",
      },
    ],
    howWeWork: [
      "Empezamos por tu estándar. Definimos contigo qué debe pasar en cada visita y lo traducimos en criterios que se puedan calificar con evidencia, sin interpretaciones.",
      "El auditor llega a tu sucursal nicaragüense como un cliente real. Pregunta, compara precios en córdobas, solicita un servicio o presenta un caso, según el escenario acordado, y documenta la atención que recibe.",
      "Tienes los resultados en ESI en máximo 3 días. Puedes ver la evidencia de cada visita y comparar Managua con el resto del país o con tus operaciones en otros países.",
      "Antes de presentar los hallazgos, revisas los resultados con tu equipo mediante un proceso claro. Si una calificación genera dudas, la evidencia de la visita permite aclararla.",
    ],
    faqs: [
      {
        question: "¿Pueden auditar sucursales en la Costa Caribe nicaragüense?",
        answer:
          "Sí. Nuestra cobertura incluye los 153 municipios del país, así que podemos planificar visitas también en la Costa Caribe Norte y Sur.",
      },
      {
        question: "¿Cómo se coordinan las auditorías en Nicaragua?",
        answer:
          "Nuestro equipo comercial te atiende desde Guatemala y El Salvador, y la operación de campo realiza las visitas en Nicaragua con el mismo método que usamos en toda la región.",
      },
    ],
  },
  {
    slug: "costa-rica",
    description:
      "Cliente incógnito en Costa Rica: Gran Área Metropolitana (GAM), Pacífico, Zona Norte, Caribe y Sur. 84 cantones, entrega en 3 días.",
    intro:
      "Evaluamos puntos de venta en las 7 provincias de Costa Rica: la Gran Área Metropolitana (GAM), la pampa de Guanacaste, la zona de San Carlos, el Pacífico Central y Sur, y la provincia de Limón.",
    zoneHeader: "Zona",
    divisionsHeader: "Provincias",
    citiesHeader: "Cantones y distritos principales",
    zones: [
      {
        name: "Gran Área Metropolitana (GAM)",
        divisions: ["San José", "Alajuela", "Cartago", "Heredia"],
        cities: ["San José (Escazú, Santa Ana, San Pedro, Curridabat)", "Alajuela (Centro, San Rafael)", "Heredia (Belén, Barva)", "Cartago (Centro, La Unión)"],
      },
      {
        name: "Guanacaste",
        divisions: ["Guanacaste"],
        cities: ["Liberia", "Nicoya", "Santa Cruz", "Tamarindo", "Papagayo", "Cañas"],
      },
      {
        name: "Zona Norte",
        divisions: ["Alajuela (Norte)"],
        cities: ["Ciudad Quesada (San Carlos)", "La Fortuna", "Upala", "Guatuso"],
      },
      {
        name: "Pacífico Central y Sur",
        divisions: ["Puntarenas", "San José (Sur)"],
        cities: ["Puntarenas", "Jacó", "Quepos", "San Isidro de El General (Pérez Zeledón)", "Palmar Norte", "Golfito"],
      },
      {
        name: "Caribe",
        divisions: ["Limón"],
        cities: ["Limón", "Guápiles (Pococí)", "Siquirres", "Bribri", "Puerto Viejo"],
      },
    ],
    coverage: [
      "En Costa Rica, la sofisticación del consumidor y los altos estándares de servicio exigen auditorías de precisión. Cubrimos los 84 cantones del país, evaluando tanto la densidad comercial de la GAM como los nodos turísticos y agroindustriales de las costas y fronteras.",
    ],
    zoneSections: [
      {
        id: "gam",
        title: "1. Gran Área Metropolitana (GAM)",
        text: "Abarca la concentración urbana de San José, Alajuela, Cartago y Heredia. Evaluamos los corredores comerciales de Escazú, Santa Ana, San Pedro, Curridabat, Heredia Centro, Alajuela Centro y Tres Ríos.",
      },
      {
        id: "guanacaste",
        title: "2. Pacífico Norte y Guanacaste",
        text: "Cobertura en Liberia, Nicoya, Santa Cruz y los desarrollos turísticos de Tamarindo, Papagayo y Las Catalinas, donde la atención en idioma inglés y estándares de lujo son clave.",
      },
      {
        id: "zona-norte",
        title: "3. Zona Norte y Huetar Norte",
        text: "Evaluamos sucursales en Ciudad Quesada (San Carlos), La Fortuna, Upala y Guatuso.",
      },
      {
        id: "pacifico-central-sur",
        title: "4. Pacífico Central y Sur",
        text: "Evaluamos puntos en Puntarenas, Jacó, Quepos (Manuel Antonio), San Isidro de El General (Pérez Zeledón) y Golfito.",
      },
      {
        id: "caribe",
        title: "5. Caribe (Limón)",
        text: "Cobertura en Limón centro, Guápiles (Pococí), Siquirres y la zona turística de Puerto Viejo y Cahuita.",
      },
    ],
    howWeWork: [
      "Los criterios se definen contigo. Partimos de tus políticas y de tus protocolos de atención, y los convertimos en una guía en la que cada punto evaluado se puede comprobar en la visita.",
      "El auditor se presenta en tu tienda costarricense como un cliente más. Según el escenario, hace una compra, consulta una garantía o verifica precios en colones, y registra toda la interacción.",
      "Los resultados están en ESI en máximo 3 días. Ahí revisas la evidencia por cantón y por sucursal, y comparas Costa Rica con los demás países donde opera tu empresa.",
      "Si tienes varias sucursales en una misma provincia, puedes verlas agrupadas y detectar si una brecha es de una sola tienda o de toda una zona.",
    ],
    faqs: [
      {
        question: "¿Por qué hablan de cantones y no de municipios en Costa Rica?",
        answer:
          "Porque esa es la división del país. Los 84 cantones son el equivalente a los municipios de otros países, y en todos ellos podemos realizar evaluaciones.",
      },
      {
        question: "¿Pueden auditar sucursales fuera de la Gran Área Metropolitana?",
        answer:
          "Sí. Podemos evaluar puntos de venta en Guanacaste, Puntarenas, Limón y cualquier otro cantón del país, con los mismos criterios que en San José.",
      },
    ],
  },
  {
    slug: "panama",
    description:
      "Auditorías CX en Panamá: Ciudad de Panamá, Panamá Oeste, Provincias Centrales, Chiriquí y Colón. 10 provincias, reportes en 3 días.",
    intro:
      "Evaluamos puntos de venta en las 10 provincias y comarcas de Panamá: la zona metropolitana de la capital, Panamá Oeste, Colón, las Provincias Centrales y la provincia de Chiriquí.",
    zoneHeader: "Zona",
    divisionsHeader: "Provincias",
    citiesHeader: "Ciudades y distritos principales",
    zones: [
      {
        name: "Área Metropolitana",
        divisions: ["Panamá"],
        cities: ["Ciudad de Panamá (Costa del Este, San Francisco, Calle 50, El Dorado, Albrook, Tocumen)"],
      },
      {
        name: "Panamá Oeste",
        divisions: ["Panamá Oeste"],
        cities: ["Arraiján", "La Chorrera", "Capira", "Chame", "Coronado"],
      },
      {
        name: "Colón",
        divisions: ["Colón"],
        cities: ["Colón", "Zona Libre", "Sabanitas", "Gatún"],
      },
      {
        name: "Provincias Centrales",
        divisions: ["Coclé", "Herrera", "Los Santos", "Veraguas"],
        cities: ["Penonomé", "Aguadulce", "Chitré", "Las Tablas", "Santiago"],
      },
      {
        name: "Chiriquí y Bocas del Toro",
        divisions: ["Chiriquí", "Bocas del Toro"],
        cities: ["David", "Boquete", "Puerto Armuelles", "Paso Canoas", "Isla Colón (Bocas del Toro)"],
      },
    ],
    coverage: [
      "Panamá es un centro logístico y financiero internacional con un sector retail sumamente competitivo. Evaluamos la ejecución comercial desde la capital hasta las fronteras comerciales, garantizando consistencia en todo el territorio.",
    ],
    zoneSections: [
      {
        id: "area-metropolitana",
        title: "1. Área Metropolitana de Ciudad de Panamá",
        text: "Cubrimos el centro financiero y retail: Calle 50, Vía España, Costa del Este, Punta Pacífica, San Francisco, El Dorado, Albrook, Clayton y Panamá Norte.",
      },
      {
        id: "panama-oeste",
        title: "2. Panamá Oeste",
        text: "Evaluamos el rápido crecimiento comercial en Arraiján, La Chorrera, Coronado y las zonas de playa.",
      },
      {
        id: "colon",
        title: "3. Colón y Zona Libre",
        text: "Cobertura en la ciudad de Colón, Costa Arriba, Costa Abajo y los puntos de servicio asociados al comercio internacional y puertos.",
      },
      {
        id: "provincias-centrales",
        title: "4. Provincias Centrales",
        text: "Evaluación de tiendas en Penonomé (Coclé), Chitré (Herrera), Las Tablas (Los Santos) y Santiago (Veraguas).",
      },
      {
        id: "chiriqui-bocas",
        title: "5. Chiriquí y Bocas del Toro",
        text: "Evaluamos David, Boquete, Paso Canoas (frontera con Costa Rica) y el archipiélago turístico de Bocas del Toro.",
      },
    ],
    howWeWork: [
      "Al inicio acordamos qué vamos a medir. Revisamos tu manual de servicio y tus políticas comerciales, y definimos los criterios que el auditor calificará en cada visita.",
      "El auditor entra a tu sucursal panameña como un cliente real. Compra, consulta, reclama o verifica que el precio exhibido en balboas o en dólares coincida con el que se cobra, según el escenario de la auditoría.",
      "En máximo 3 días tienes los resultados en ESI, con la evidencia de cada visita. Puedes comparar distritos, provincias y países con el mismo criterio.",
      "Si tu marca opera en varios formatos, como tiendas de centro comercial y sucursales de calle, separamos los resultados por formato. Así sabes si una brecha depende de la ubicación o del tipo de tienda.",
    ],
    faqs: [
      {
        question: "¿Por qué cuentan distritos en Panamá?",
        answer:
          "Porque el distrito es la división municipal del país. Contamos los 81 distritos panameños, y en cualquiera de ellos podemos auditar un punto de venta.",
      },
      {
        question: "¿Pueden evaluar sucursales en Colón y en el interior del país?",
        answer:
          "Sí. La operación de campo llega a Colón, a Chiriquí, a Azuero y a cualquier otro distrito donde tengas un punto de venta.",
      },
    ],
  },
  {
    slug: "republica-dominicana",
    description:
      "Auditorías con cliente oculto en República Dominicana: Gran Santo Domingo, Santiago, Cibao, Este y Sur. 31 provincias, resultados en 3 días.",
    intro:
      "Evaluamos puntos de venta en las 31 provincias y el Distrito Nacional de República Dominicana: el Gran Santo Domingo, la región del Cibao, el polo turístico del Este y el Sur del país.",
    zoneHeader: "Zona",
    divisionsHeader: "Provincias principales",
    citiesHeader: "Ciudades y municipios principales",
    zones: [
      {
        name: "Gran Santo Domingo",
        divisions: ["Distrito Nacional", "Santo Domingo"],
        cities: ["Santo Domingo (Piantini, Naco, Bella Vista)", "Santo Domingo Este", "Santo Domingo Norte", "Santo Domingo Oeste", "Boca Chica"],
      },
      {
        name: "Cibao / Norte",
        divisions: ["Santiago", "La Vega", "Duarte", "Puerto Plata", "Espaillat"],
        cities: ["Santiago de los Caballeros", "La Vega", "San Francisco de Macorís", "Puerto Plata", "Moca", "Bonao", "Samaná"],
      },
      {
        name: "Región Este",
        divisions: ["San Pedro de Macorís", "La Romana", "La Altagracia"],
        cities: ["San Pedro de Macorís", "La Romana", "Higüey", "Punta Cana", "Bávaro"],
      },
      {
        name: "Región Sur",
        divisions: ["San Cristóbal", "Peravia", "Azua", "Barahona"],
        cities: ["San Cristóbal", "Baní", "Azua", "San Juan de la Maguana", "Barahona"],
      },
    ],
    coverage: [
      "República Dominicana es la principal economía del Caribe. Evaluamos la experiencia del cliente en redes de banca, retail, restaurantes y telecomunicaciones en todo el país.",
    ],
    zoneSections: [
      {
        id: "gran-santo-domingo",
        title: "1. Gran Santo Domingo y Distrito Nacional",
        text: "Cobertura en el centro comercial y financiero: Piantini, Naco, Bella Vista, Gazcue, Santo Domingo Este, Santo Domingo Norte y Santo Domingo Oeste.",
      },
      {
        id: "cibao",
        title: "2. Región del Cibao y Norte",
        text: "Evaluamos Santiago de los Caballeros (la segunda capital comercial), La Vega, San Francisco de Macorís, Puerto Plata, Moca, Bonao y la península de Samaná.",
      },
      {
        id: "region-este",
        title: "3. Región Este (Polo Turístico y Comercial)",
        text: "Evaluamos sucursales en San Pedro de Macorís, La Romana, Higüey y el importante corredor hotelero y comercial de Punta Cana y Bávaro.",
      },
      {
        id: "region-sur",
        title: "4. Región Sur",
        text: "Cobertura en San Cristóbal, Baní, Azua, San Juan de la Maguana y Barahona.",
      },
    ],
    howWeWork: [
      "Definimos contigo los criterios antes de salir a campo. Cada punto de la guía responde a una pregunta concreta: qué debe hacer tu personal y cómo se comprueba que lo hizo.",
      "El auditor visita tu tienda dominicana como un cliente real, con un caso acordado, y paga o consulta precios en pesos dominicanos. Registra la atención y la respalda con evidencia.",
      "En máximo 3 días la evidencia de cada visita está en ESI. Desde ahí comparas tus sucursales dominicanas entre sí y con las de tus operaciones en Centroamérica.",
      "En escenarios como una devolución o una garantía, el auditor sigue el caso hasta el final. Así sabes no solo cómo se recibió al cliente, sino también si se cumplió lo prometido.",
    ],
    faqs: [
      {
        question: "¿Pueden auditar sucursales en Santiago y en las zonas turísticas?",
        answer:
          "Sí. Llegamos a cualquiera de los 158 municipios del país, de modo que Santiago, Puerto Plata, La Romana o Punta Cana se evalúan con el mismo método que Santo Domingo.",
      },
      {
        question: "¿Usan la misma metodología que en Centroamérica?",
        answer:
          "Sí. Los criterios, la guía de evaluación y la entrega en ESI son los mismos, así que tus resultados dominicanos se comparan directamente con los de otros países.",
      },
    ],
  },
  {
    slug: "chiapas-mexico",
    description:
      "Auditorías de cliente oculto en Chiapas: Tuxtla Gutiérrez, Tapachula, San Cristóbal y Soconusco. Evaluación comercial con resultados en 3 días.",
    intro:
      "Evaluamos puntos de venta en el estado de Chiapas: la capital Tuxtla Gutiérrez, los Altos de Chiapas, el corredor fronterizo y agroindustrial del Soconusco y la Zona Centro.",
    zoneHeader: "Zona",
    divisionsHeader: "Regiones económicas",
    citiesHeader: "Ciudades principales",
    zones: [
      {
        name: "Centro",
        divisions: ["Metropolitana", "Mezcalapa"],
        cities: ["Tuxtla Gutiérrez", "Chiapa de Corzo", "Ocozocoautla", "Berriozábal"],
      },
      {
        name: "Altos y Fronteriza",
        divisions: ["Los Altos", "Meseta Comiteca"],
        cities: ["San Cristóbal de Las Casas", "Comitán de Domínguez", "Las Margaritas"],
      },
      {
        name: "Soconusco",
        divisions: ["Soconusco", "Istmo-Costa"],
        cities: ["Tapachula", "Huixtla", "Ciudad Hidalgo", "Tonalá", "Arriaga"],
      },
      {
        name: "Norte y Selva",
        divisions: ["Maya", "Tulijá", "Norte"],
        cities: ["Palenque", "Pichucalco", "Salto de Agua"],
      },
    ],
    coverage: [
      "Chiapas conecta comercialmente el sur de México con el istmo centroamericano. Evaluamos cadenas nacionales y locales en los principales nodos urbanos y fronterizos del estado.",
    ],
    zoneSections: [
      {
        id: "tuxtla-centro",
        title: "1. Tuxtla Gutiérrez y Zona Centro",
        text: "Cobertura en la capital Tuxtla Gutiérrez, Chiapa de Corzo, Ocozocoautla y Berriozábal, donde se concentran los principales centros comerciales y distribuidores.",
      },
      {
        id: "altos",
        title: "2. Altos de Chiapas",
        text: "Evaluamos San Cristóbal de Las Casas, Comitán de Domínguez y Las Margaritas.",
      },
      {
        id: "soconusco",
        title: "3. Soconusco y Frontera Sur",
        text: "Evaluación en Tapachula (el motor comercial fronterizo), Huixtla, Ciudad Hidalgo y Frontera Comalapa.",
      },
      {
        id: "palenque-norte",
        title: "4. Palenque y Norte de Chiapas",
        text: "Evaluamos Palenque, Pichucalco y Salto de Agua.",
      },
    ],
    howWeWork: [
      "Arrancamos definiendo contigo los criterios. Tomamos tu estándar de atención y lo convertimos en una guía de evaluación que el auditor aplica igual en cada visita.",
      "El auditor llega a tu tienda chiapaneca como un cliente más y paga o consulta precios en pesos mexicanos. Según el escenario acordado, compra, pide un cambio o presenta un reclamo, y registra lo que ocurre.",
      "Los resultados llegan a ESI en máximo 3 días. Comparas tus sucursales de Chiapas entre sí y con las de Guatemala o del resto de la región, con la misma escala.",
      "Si tus sucursales de Chiapas dependen de una gerencia en otra ciudad, los resultados en ESI te dan una vista clara de cada tienda sin tener que visitarlas.",
    ],
    faqs: [
      {
        question: "¿Auditan en todo México o solo en Chiapas?",
        answer:
          "En México trabajamos en el estado de Chiapas. Ahí podemos evaluar cualquiera de sus 124 municipios, además de los otros 7 países de nuestra cobertura.",
      },
      {
        question: "¿Pueden comparar mis tiendas de Chiapas con las de Guatemala?",
        answer:
          "Sí. Usamos la misma guía en ambos lados de la frontera, así que los resultados de Chiapas y de Guatemala se comparan directamente.",
      },
    ],
  },
];

export function countryPage(slug: string): CountryPage | undefined {
  return COUNTRY_PAGES.find((p) => p.slug === slug);
}

/** Every paragraph written for this country, in page order. */
export function countryPageText(page: CountryPage): string[] {
  return [
    page.intro,
    ...page.coverage,
    ...page.zoneSections.flatMap((z) => [z.title, z.text]),
    ...(page.coverageClosing ?? []),
    ...page.howWeWork,
    ...page.faqs.flatMap((f) => [f.question, f.answer]),
  ];
}

// Shown on country pages and the FAQ page ("Última actualización").
export const CONTENT_UPDATED = "2026-10-19";
