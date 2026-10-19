import type { FaqItem } from "./faq";

export interface CoverageRegion {
  /** Department, province, region or metro area, as the client names it. */
  name: string;
  /** Main cities and commercial hubs. */
  cities: string[];
  /** The items are areas (grouped provinces, comarcas), not cities. */
  areas?: true;
}

export interface CountryPage {
  slug: string;
  /** Opening paragraph supplied by the client. */
  intro: string;
  /** Column headers of the coverage table, as the client wrote them. */
  regionHeader: string;
  citiesHeader: string;
  /** Coverage table rows; also the areaServed of the page schema. */
  regions: CoverageRegion[];
  /** "Cobertura en {País}". */
  coverage: string[];
  /** "Cómo trabajamos en {País}". */
  howWeWork: string[];
  faqs: FaqItem[];
}

// Country-specific copy for section F. Every figure here is one the client
// approved (8 countries, the division counts, results in 3 days, 2008/2013);
// no other numbers, no offices outside San Salvador and Guatemala City, and
// no sentence is shared between countries (enforced by the tests).
export const COUNTRY_PAGES: CountryPage[] = [
  {
    slug: "el-salvador",
    intro:
      "Evaluaciones presenciales en los 14 departamentos de El Salvador, cubriendo integralmente la Zona Metropolitana de San Salvador (ZMSS), el departamento de La Libertad y las zonas orientales y occidentales del país.",
    regionHeader: "Departamento / Región",
    citiesHeader: "Ciudades Principales, ZMSS y Nodos Comerciales",
    regions: [
      { name: "Zona Metropolitana (ZMSS)", cities: ["San Salvador", "Soyapango", "Ilopango", "Mejicanos", "Apopa", "Cuscatancingo", "Ciudad Delgado"] },
      { name: "La Libertad", cities: ["Santa Tecla", "Antiguo Cuscatlán", "Nuevo Cuscatlán", "Colón (Lourdes)", "San Juan Opico"] },
      { name: "Santa Ana", cities: ["Santa Ana", "Chalchuapa", "Metapán"] },
      { name: "San Miguel", cities: ["San Miguel"] },
      { name: "Sonsonate", cities: ["Sonsonate", "Acajutla", "Izalco"] },
      { name: "Ahuachapán", cities: ["Ahuachapán"] },
      { name: "Cabañas", cities: ["Sensuntepeque", "Ilobasco"] },
      { name: "Chalatenango", cities: ["Chalatenango"] },
      { name: "Cuscatlán", cities: ["Cojutepeque"] },
      { name: "La Paz", cities: ["Zacatecoluca", "El Rosario (Zona Aeropuerto)"] },
      { name: "La Unión", cities: ["La Unión"] },
      { name: "Morazán", cities: ["San Francisco Gotera"] },
      { name: "San Vicente", cities: ["San Vicente"] },
      { name: "Usulután", cities: ["Usulután", "Jiquilisco"] },
    ],
    coverage: [
      "El Salvador es uno de los dos países donde nuestro equipo comercial te atiende primero. Desde nuestra oficina en San Salvador coordinamos cada proyecto y acompañamos a tu equipo de principio a fin.",
      "Tras la reorganización municipal, el país cuenta 44 municipios y cada uno agrupa varios distritos. Para ti eso significa algo simple: podemos evaluar tus sucursales en cualquiera de esos 44 municipios, desde los centros comerciales del área metropolitana de San Salvador hasta una agencia en un municipio de oriente o de occidente.",
      "Como el territorio es compacto, una misma ola de visitas puede cubrir todas tus sucursales en pocos días. Así comparas la capital con el resto del país en el mismo periodo y con el mismo criterio, sin que pasen semanas entre una visita y otra.",
    ],
    howWeWork: [
      "Primero definimos contigo los criterios. Tomamos tu manual de servicio, tu protocolo de venta o tu política de garantías y lo convertimos en una guía de evaluación clara. Cada punto que se califica tiene una respuesta verificable.",
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
    slug: "guatemala",
    intro:
      "Brindamos cobertura de auditoría de servicio y cliente oculto en los 22 departamentos de Guatemala, cubriendo la Gran Área Metropolitana (GAM)—incluyendo Ciudad de Guatemala, Mixco, Villa Nueva, San José Pinula y Santa Catarina Pinula—así como los principales polos comerciales departamentales.",
    regionHeader: "Departamento / Región",
    citiesHeader: "Ciudades Principales, Hubs Comerciales y GAM",
    regions: [
      { name: "Gran Área Metropolitana (GAM)", cities: ["Ciudad de Guatemala", "Mixco", "Villa Nueva", "San José Pinula", "Santa Catarina Pinula", "Chinautla", "Amatitlán"] },
      { name: "Alta Verapaz", cities: ["Cobán", "San Pedro Carchá"] },
      { name: "Baja Verapaz", cities: ["Salamá"] },
      { name: "Chimaltenango", cities: ["Chimaltenango"] },
      { name: "Chiquimula", cities: ["Chiquimula", "Esquipulas"] },
      { name: "El Progreso", cities: ["Guastatoya"] },
      { name: "Escuintla", cities: ["Escuintla", "Santa Lucía Cotzumalguapa", "Puerto San José"] },
      { name: "Huehuetenango", cities: ["Huehuetenango"] },
      { name: "Izabal", cities: ["Puerto Barrios", "Morales", "Livingston"] },
      { name: "Jalapa", cities: ["Jalapa"] },
      { name: "Jutiapa", cities: ["Jutiapa"] },
      { name: "Petén", cities: ["Flores", "Santa Elena", "San Benito", "Poptún"] },
      { name: "Quetzaltenango", cities: ["Quetzaltenango (Xela)", "Coatepeque", "Salcajá"] },
      { name: "Quiché", cities: ["Santa Cruz del Quiché"] },
      { name: "Retalhuleu", cities: ["Retalhuleu"] },
      { name: "Sacatepéquez", cities: ["Antigua Guatemala", "Jocotenango", "San Lucas Sacatepéquez"] },
      { name: "San Marcos", cities: ["San Marcos", "Malacatán", "Tecún Umán"] },
      { name: "Santa Rosa", cities: ["Cuilapa"] },
      { name: "Sololá", cities: ["Sololá", "Panajachel"] },
      { name: "Suchitepéquez", cities: ["Mazatenango", "Cuyotenango"] },
      { name: "Totonicapán", cities: ["Totonicapán"] },
      { name: "Zacapa", cities: ["Zacapa"] },
    ],
    coverage: [
      "Guatemala es, junto con El Salvador, el país donde nuestro equipo comercial te atiende primero. Nuestra oficina en Guatemala City coordina los proyectos y es tu punto de contacto directo.",
      "El país tiene 340 municipios y podemos evaluar cualquiera de ellos. Eso incluye las zonas comerciales de la Ciudad de Guatemala y su área metropolitana, pero también las cabeceras departamentales y los municipios donde tu cadena abrió sus sucursales más recientes.",
      "En Guatemala la distancia entre una tienda de la capital y una del interior no es solo geográfica. A menudo cambian el tipo de cliente, el ritmo de la tienda y la forma en que se aplica tu estándar. Una auditoría con el mismo método en todas tus sucursales te muestra dónde el servicio se mantiene y dónde se aleja de lo que defines.",
    ],
    howWeWork: [
      "Arrancamos con una conversación sobre lo que quieres medir. Juntos convertimos tu estándar de atención en una guía de evaluación con criterios claros, de modo que cada calificación se pueda explicar con evidencia.",
      "Luego definimos el escenario de cada visita: una compra, una garantía, un reclamo o una consulta de precio en quetzales. El auditor se presenta como un cliente real y registra lo que ocurre, sin que tu personal sepa que está siendo evaluado.",
      "Los resultados llegan a ESI en máximo 3 días después de cada visita. Desde ahí revisas la evidencia por sucursal, comparas regiones del país y preparas la presentación para tu comité.",
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
          "Con nuestro equipo comercial en Guatemala City. Te acompaña desde la definición de criterios hasta la presentación de resultados, y puedes escribirnos o llamarnos al teléfono de esta página.",
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
    intro:
      "Auditorías de experiencia del cliente con cobertura total en los 18 departamentos de Honduras, evaluando los principales centros urbanos y polos industriales como Tegucigalpa, San Pedro Sula, La Ceiba, Choluteca y Roatán.",
    regionHeader: "Departamento",
    citiesHeader: "Ciudades Principales y Centros Comerciales",
    regions: [
      { name: "Francisco Morazán", cities: ["Tegucigalpa", "Comayagüela"] },
      { name: "Cortés", cities: ["San Pedro Sula", "Choloma", "Villanueva", "La Lima", "Puerto Cortés"] },
      { name: "Atlántida", cities: ["La Ceiba", "Tela"] },
      { name: "Choluteca", cities: ["Choluteca"] },
      { name: "Colón", cities: ["Trujillo", "Tocoa"] },
      { name: "Comayagua", cities: ["Comayagua", "Siguatepeque"] },
      { name: "Copán", cities: ["Santa Rosa de Copán", "La Entrada"] },
      { name: "El Paraíso", cities: ["Danlí", "Yuscarán", "El Paraíso"] },
      { name: "Gracias a Dios", cities: ["Puerto Lempira"] },
      { name: "Intibucá", cities: ["La Esperanza"] },
      { name: "Islas de la Bahía", cities: ["Roatán", "Coxen Hole"] },
      { name: "La Paz", cities: ["La Paz"] },
      { name: "Lempira", cities: ["Gracias"] },
      { name: "Ocotepeque", cities: ["Nueva Ocotepeque"] },
      { name: "Olancho", cities: ["Juticalpa", "Catacamas"] },
      { name: "Santa Bárbara", cities: ["Santa Bárbara"] },
      { name: "Valle", cities: ["Nacaome", "San Lorenzo"] },
      { name: "Yoro", cities: ["El Progreso", "Yoro", "Olanchito"] },
    ],
    coverage: [
      "En Honduras podemos realizar auditorías en cualquier punto de venta del país. Nuestra operación de campo llega a los 298 municipios, desde Tegucigalpa y San Pedro Sula hasta las ciudades medianas donde tu marca también tiene presencia.",
      "Honduras tiene dos polos comerciales muy distintos: la capital, con su peso administrativo, y el valle de Sula, con su actividad industrial y de comercio. Si tus sucursales se reparten entre ambos, una auditoría te dice si tu estándar se cumple igual en los dos.",
    ],
    howWeWork: [
      "Los criterios de evaluación se definen contigo antes de la primera visita. Cada pregunta de la guía corresponde a algo que tu equipo debe hacer y que el auditor puede comprobar.",
      "El auditor visita tu tienda hondureña como un cliente común, con un escenario acordado, y paga o pregunta en lempiras como lo haría cualquier comprador. Registra lo que ve y lo que escucha, y respalda su evaluación con evidencia.",
      "En máximo 3 días tienes los resultados en ESI. Ahí comparas tus sucursales hondureñas entre sí y con las de otros países de la región, siempre con la misma escala.",
      "La coordinación comercial se hace desde El Salvador y Guatemala, y la operación de campo trabaja en Honduras con la misma metodología que en el resto de la región.",
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
    slug: "nicaragua",
    intro:
      "Servicios de cliente misterioso en los 15 departamentos y 2 regiones autónomas de Nicaragua, con presencia continua en Managua, Masaya, León, Chinandega y Estelí.",
    regionHeader: "Departamento / Región",
    citiesHeader: "Ciudades Principales y Ejes Comerciales",
    regions: [
      { name: "Managua", cities: ["Managua", "Ciudad Sandino", "Tipitapa"] },
      { name: "Masaya", cities: ["Masaya", "Nindirí"] },
      { name: "Chinandega", cities: ["Chinandega", "El Viejo"] },
      { name: "León", cities: ["León"] },
      { name: "Estelí", cities: ["Estelí"] },
      { name: "Granada", cities: ["Granada"] },
      { name: "Matagalpa", cities: ["Matagalpa"] },
      { name: "Rivas", cities: ["Rivas", "San Juan del Sur"] },
      { name: "Boaco", cities: ["Boaco"] },
      { name: "Carazo", cities: ["Jinotepe", "Diriamba"] },
      { name: "Chontales", cities: ["Juigalpa"] },
      { name: "Jinotega", cities: ["Jinotega"] },
      { name: "Madriz", cities: ["Somoto"] },
      { name: "Nueva Segovia", cities: ["Ocotal"] },
      { name: "Río San Juan", cities: ["San Carlos"] },
      { name: "RACCN", cities: ["Puerto Cabezas (Bilwi)"] },
      { name: "RACCS", cities: ["Bluefields"] },
    ],
    coverage: [
      "En Nicaragua podemos auditar cualquier punto de venta del país. La operación de campo cubre los 153 municipios, tanto en la región del Pacífico como en el centro y en la Costa Caribe.",
      "La mayor parte del comercio organizado se concentra en Managua y en las ciudades del Pacífico, como León, Granada o Masaya. Aun así, muchas cadenas atienden también en ciudades del norte y del centro, y ahí suele ser más difícil saber si el estándar se cumple. Una auditoría te da esa visibilidad.",
      "Si tu red incluye sucursales en Estelí, Matagalpa o Chinandega, podemos incluirlas en la misma ola de visitas que Managua. Así comparas regiones con datos del mismo periodo y decides dónde reforzar la capacitación o el seguimiento de tu equipo.",
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
          "Nuestro equipo comercial te atiende desde El Salvador y Guatemala, y la operación de campo realiza las visitas en Nicaragua con el mismo método que usamos en toda la región.",
      },
    ],
  },
  {
    slug: "costa-rica",
    intro:
      "Cobertura completa en las 7 provincias de Costa Rica, con énfasis en el desarrollo de la Gran Área Metropolitana (GAM)—San José, Alajuela, Heredia y Cartago—así como en los polos turísticos y comerciales costeros.",
    regionHeader: "Provincia / Región",
    citiesHeader: "Ciudades Principales, GAM y Distritos Comerciales",
    regions: [
      { name: "Gran Área Metropolitana - San José", cities: ["San José Centro", "Escazú", "Desamparados", "Curridabat", "Tibás", "Moravia", "Montes de Oca"] },
      { name: "Gran Área Metropolitana - Alajuela", cities: ["Alajuela Centro", "San Ramón", "Grecia", "Naranjo"] },
      { name: "Gran Área Metropolitana - Heredia", cities: ["Heredia Centro", "Barva", "Santo Domingo", "San Joaquín de Flores"] },
      { name: "Gran Área Metropolitana - Cartago", cities: ["Cartago Centro", "La Unión (Tres Ríos)", "Turrialba"] },
      { name: "Guanacaste", cities: ["Liberia", "Nicoya", "Santa Cruz", "Tamarindo"] },
      { name: "Puntarenas", cities: ["Puntarenas", "Esparza", "Quepos", "Jacó"] },
      { name: "Limón", cities: ["Limón (Puerto Limón)", "Guápiles (Pococí)", "Siquirres"] },
    ],
    coverage: [
      "En Costa Rica contamos cantones en lugar de municipios. El país tiene 84 cantones y podemos evaluar un punto de venta en cualquiera de ellos, porque la operación de campo llega a cualquier punto de venta del territorio.",
      "Buena parte del comercio se concentra en la Gran Área Metropolitana, que reúne San José, Heredia, Alajuela y Cartago. Pero las cadenas también crecen en Guanacaste, en la zona norte y en el Caribe. Una auditoría te ayuda a confirmar que tu estándar viaja con cada apertura nueva.",
      "Cuando varias cadenas compiten en el mismo centro comercial, los detalles de la atención pesan. Las auditorías de garantías, devoluciones y promociones te ayudan a cuidar esos detalles tanto como el proceso de ventas.",
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
    intro:
      "Auditorías presenciales y de canales digitales en las 10 provincias de Panamá, abarcando la capital, Panamá Oeste, la Zona Libre de Colón y las cabeceras provinciales.",
    regionHeader: "Provincia / Comarca",
    citiesHeader: "Ciudades Principales y Polos Económicos",
    regions: [
      { name: "Panamá", cities: ["Ciudad de Panamá", "San Miguelito", "Tocumen", "Juan Díaz"] },
      { name: "Panamá Oeste", cities: ["La Chorrera", "Arraiján", "Chame", "San Carlos"] },
      { name: "Chiriquí", cities: ["David", "La Concepción", "Boquete"] },
      { name: "Colón", cities: ["Ciudad de Colón", "Zona Libre de Colón"] },
      { name: "Coclé", cities: ["Penonomé", "Aguadulce", "Natá"] },
      { name: "Herrera", cities: ["Chitré"] },
      { name: "Los Santos", cities: ["Las Tablas"] },
      { name: "Veraguas", cities: ["Santiago de Veraguas"] },
      { name: "Bocas del Toro", cities: ["Isla Colón", "Changuinola"] },
      { name: "Darién", cities: ["La Palma"] },
      { name: "Comarcas", cities: ["Guna Yala", "Emberá-Wounaan", "Ngäbe-Buglé"], areas: true },
    ],
    coverage: [
      "En Panamá trabajamos por distritos. El país tiene 81 distritos y podemos llegar a cualquier punto de venta en todos ellos, desde la Ciudad de Panamá hasta las provincias del interior.",
      "La capital y el eje de Panamá Oeste y Colón concentran gran parte del comercio, pero ciudades como David, Santiago o Chitré también reúnen sucursales de cadenas nacionales. Con una auditoría ves si tu atención es la misma en la capital y en el interior.",
      "En Panamá conviven grandes centros comerciales, tiendas de barrio y locales en zonas de alto tránsito, cada uno con su propio ritmo. Una auditoría con criterios comunes te permite comparar formatos tan distintos sin perder de vista tu estándar.",
    ],
    howWeWork: [
      "Primero acordamos qué vamos a medir. Revisamos tu manual de servicio y tus políticas comerciales, y definimos los criterios que el auditor calificará en cada visita.",
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
    intro:
      "Evaluaciones de calidad y atención al cliente en las 31 provincias y el Distrito Nacional, cubriendo el Gran Santo Domingo, Santiago de los Caballeros y las principales regiones turísticas e industriales.",
    regionHeader: "Provincia / Distrito",
    citiesHeader: "Ciudades Principales y Ejes Urbanos",
    regions: [
      { name: "Distrito Nacional / Gran Santo Domingo", cities: ["Santo Domingo de Guzmán", "Santo Domingo Este", "Santo Domingo Norte", "Santo Domingo Oeste"] },
      { name: "Santiago", cities: ["Santiago de los Caballeros", "Tamboril", "Villa González"] },
      { name: "La Altagracia", cities: ["Salvaleón de Higüey", "Punta Cana", "Bávaro"] },
      { name: "La Romana", cities: ["La Romana", "Guaymate"] },
      { name: "Puerto Plata", cities: ["San Felipe de Puerto Plata", "Sosúa", "Cabarete"] },
      { name: "Duarte", cities: ["San Francisco de Macorís"] },
      { name: "La Vega", cities: ["Concepción de La Vega", "Jarabacoa", "Constanza"] },
      { name: "San Cristóbal", cities: ["San Cristóbal", "Bajos de Haina"] },
      { name: "San Pedro de Macorís", cities: ["San Pedro de Macorís"] },
      { name: "Provincias Adicionales", cities: ["Azua", "Baoruco", "Barahona", "Dajabón", "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", "Hermanas Mirabal", "Independencia", "María Trinidad Sánchez", "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Samaná", "San José de Ocoa", "San Juan", "Sánchez Ramírez", "Santiago Rodríguez", "Valverde"], areas: true },
    ],
    coverage: [
      "En República Dominicana podemos auditar en cualquier punto de venta del país. Cubrimos los 158 municipios y llevamos el mismo método que usamos en Centroamérica al Caribe.",
      "El comercio dominicano se reparte entre el Gran Santo Domingo, Santiago de los Caballeros y las zonas turísticas del este, como La Romana y Punta Cana. Cada una atiende a un cliente diferente. Una auditoría te muestra si tu estándar se sostiene en todas.",
      "Si tu cadena opera en el Cibao y en el sur del país, visitamos ambas regiones en el mismo periodo para que la comparación sea justa. Lo mismo aplica a tus tiendas en el este, donde la temporada turística cambia el ritmo de la atención.",
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
    intro:
      "Auditorías de servicio en las 9 regiones económicas del estado de Chiapas, evaluando comercios, sucursales y franquicias en Tuxtla Gutiérrez, Tapachula, San Cristóbal de las Casas y sus municipios aledaños.",
    regionHeader: "Región Económica",
    citiesHeader: "Ciudades Principales y Centros Urbanos",
    regions: [
      { name: "Metropolitana", cities: ["Tuxtla Gutiérrez (Capital)", "Chiapa de Corzo", "Berriozábal"] },
      { name: "Soconusco", cities: ["Tapachula", "Huixtla"] },
      { name: "Altos Tsotsil-Tseltal", cities: ["San Cristóbal de las Casas"] },
      { name: "Fronteriza Sur", cities: ["Comitán de Domínguez"] },
      { name: "Selva Lacandona", cities: ["Ocosingo"] },
      { name: "Norte", cities: ["Palenque"] },
      { name: "Istmo-Costa", cities: ["Tonalá", "Arriaga"] },
      { name: "Frailesca", cities: ["Villaflores"] },
    ],
    coverage: [
      "En México auditamos en el estado de Chiapas. Podemos evaluar cualquier punto de venta en los 124 municipios del estado, de Tuxtla Gutiérrez a Tapachula y de San Cristóbal de las Casas a Comitán.",
      "Chiapas comparte frontera con Guatemala y muchas marcas atienden a clientes de ambos lados. Si tu empresa tiene tiendas en el sur de México y en Centroamérica, una auditoría con el mismo método te permite leer las dos operaciones como una sola región.",
      "Las ciudades chiapanecas tienen perfiles muy distintos: Tuxtla Gutiérrez es la capital del estado, Tapachula vive del comercio fronterizo y San Cristóbal recibe a muchos visitantes. Una evaluación con criterios comunes te dice si tu servicio se adapta a cada ciudad sin perder tu estándar.",
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

/** Words written for this country (sections and local FAQs). */
export function countryPageWords(page: CountryPage): number {
  const text = [...page.coverage, ...page.howWeWork, ...page.faqs.flatMap((f) => [f.question, f.answer])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

// Shown on country pages and the FAQ page ("Última actualización").
export const CONTENT_UPDATED = "2026-10-19";
