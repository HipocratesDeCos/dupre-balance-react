import { dimensionLabel } from './dimension'

const SECTOR_CONTEXT = {
  'Tecnología':  'el sector tecnológico, caracterizado por una alta intensidad innovadora y ciclos de producto cortos',
  'Comercio':    'el sector comercial, donde la gestión eficiente de existencias y la fidelización del cliente son factores críticos',
  'Industria':   'el sector industrial, con elevadas necesidades de inmovilizado material y economías de escala',
  'Servicios':   'el sector servicios, donde el capital humano y la reputación constituyen los principales activos intangibles',
  'Hosteleria':  'el sector hostelero, muy sensible al ciclo económico y a los patrones de demanda estacional',
  'Agricultura': 'el sector agrícola, expuesto a factores medioambientales y con estructuras de activo fijo relevantes',
  'Construcción': 'el sector constructor, intensivo en capital y con elevado apalancamiento financiero en fases expansivas',
  'Educación':   'el sector educativo, con modelos de negocio de ingresos recurrentes y alta dependencia del capital humano',
  'Salud':       'el sector sanitario, regulado y con fuertes barreras de entrada de carácter institucional'
}

const GEO_CONTEXT = {
  'Local':        'un ámbito local, lo que le permite construir ventajas competitivas basadas en la proximidad y el conocimiento del cliente',
  'Regional':     'un ámbito regional, aprovechando economías de alcance y diversificación geográfica dentro de un mercado cohesionado',
  'Nacional':     'todo el territorio nacional, compitiendo a escala con mayor exposición a rivales sectoriales y requiriendo una estructura organizativa sólida',
  'Internacional': 'mercados internacionales, asumiendo riesgos de tipo de cambio y adaptación regulatoria a cambio de mayor potencial de crecimiento',
  'Global':        'escala global, con cadenas de valor distribuidas y necesidad de gestión multicultural y multilegislativa'
}

const FORMA_CONTEXT = {
  'sl':   'Sociedad de Responsabilidad Limitada (SRL), con responsabilidad patrimonial circunscrita al capital aportado y mayor flexibilidad en la gestión',
  'sa':   'Sociedad Anónima (SA), con acceso potencial a mercados de capitales y una estructura de gobierno corporativo más formal',
  'coop': 'Sociedad Cooperativa, cuya finalidad no es exclusivamente la maximización del beneficio sino también la creación de valor para sus socios trabajadores',
  'autonomo': 'empresario individual (autónomo), con responsabilidad ilímitada pero máxima agilidad operativa',
  'sl_unipersonal': 'Sociedad Limitada Unipersonal, que combina la protección de la responsabilidad limitada con la agilidad de la gestión individual'
}

export function generateStory({ company, dimension, context }) {
  const { nombre, razonSocial, socios, capital, forma } = company
  const { nempleados, resolved } = dimension
  const { sector, geografico, finalidad, propiedad } = context

  const dimLabel  = dimensionLabel[resolved] || resolved
  const sectorCtx = SECTOR_CONTEXT[sector]  || `el sector de ${sector}`
  const geoCtx    = GEO_CONTEXT[geografico] || `un ámbito ${geografico}`
  const formaCtx  = FORMA_CONTEXT[forma]    || `una ${forma}`

  const ansoff = resolved === 'micro' || resolved === 'pequena'
    ? 'Su tamaño le invita a explorar estrategias de penetración de mercado (Ansoff I), consolidando su cuota antes de diversificarse.'
    : resolved === 'mediana'
      ? 'Con su dimensión actual, la empresa está posicionada para evaluar estrategias de desarrollo de mercado o desarrollo de producto (Ansoff II y III), expandiendo su propuesta de valor.'
      : 'Su envergadura le permite considerar estrategias de diversificación (Ansoff IV), combinando nuevos productos con nuevos mercados para reducir la dependencia sectorial.'

  const porter = `Desde la perspectiva de las 5 fuerzas de Porter, ${sector === 'Tecnología' ? 'la amenaza de nuevos entrantes y la rivalidad competitiva son especialmente intensas dado el bajo coste de entrada y la rápida evolución tecnológica' : sector === 'Industria' ? 'las barreras de entrada por capital y las economías de escala confíeren una posición defensiva sólida frente a nuevos competidores' : 'el poder de negociación de clientes y proveedores requiere una atención prioritaria en la política comercial y de compras'}.`

  const pestel = `En clave PESTEL, el entorno ${geografico === 'Internacional' || geografico === 'Global' ? 'internacional exige vigilancia activa de factores políticos (regulación aduanera, tratados), económicos (tipo de cambio, ciclo global) y tecnológicos (digitalización de cadenas de suministro)' : 'local y nacional obliga a monitorizar la evolución del marco fiscal, la legislación laboral y las tendencias de digitalización del sector público y privado'}.`

  const rsc = finalidad === 'Social' || finalidad === 'Mixta'
    ? 'Su finalidad mixta o social la sitúa en la órbita de la Economía Social y Solidaria, con una propuesta de valor que integra impacto social junto a la sostenibilidad financiera.'
    : 'La empresa puede fortalecer su reputación corporativa integrando criterios ESG (medioambiente, social, gobernanza) en su planificación estratégica.'

  return `${nombre || 'La empresa'}, constituida bajo la forma jurídica de ${formaCtx}, opera en ${sectorCtx} y desarrolla su actividad en ${geoCtx}.

Con ${nempleados} empleados y una dimensión clasificada como "${dimLabel}", su estructura patrimonial refleja un modelo de negocio de propiedad ${propiedad.toLowerCase()} y finalidad ${finalidad.toLowerCase()}. El capital aportado por sus ${socios} soci${socios === 1 ? 'o' : 'os'} asciende a ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(capital)}, cifra que evidencia ${capital < 10000 ? 'una estructura de financiación propia reducida, típica de proyectos en fase de validación o startups sectoriales' : capital < 100000 ? 'una base de recursos propios moderada, coherente con su fase de crecimiento' : 'una base sólida de recursos propios que refuerza su solvencia y capacidad de inversión'}.

Analizando su posicionamiento estratégico: ${ansoff}

${porter}

${pestel}

${rsc}

En definitiva, ${nombre || razonSocial || 'la empresa'} afronta su ciclo de vida empresarial con una hoja de balance que debe interpretarse no solo como fotografía contable, sino como evidencia de sus decisiones de financiación, inversión y creación de valor a largo plazo.`
}
