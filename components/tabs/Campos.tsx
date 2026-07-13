import styles from './Tab.module.css';

type Campo = {
  nombre: string;
  tipo: string;
  area: string;
  desc: string;
};

const CAMPOS: Campo[] = [
  // Datos personales
  { nombre: 'Nombre', tipo: 'Texto', area: 'Contacto', desc: 'Nombre de pila del lead/alumno' },
  { nombre: 'Apellidos', tipo: 'Texto', area: 'Contacto', desc: 'Apellido(s) del lead/alumno' },
  { nombre: 'Correo', tipo: 'Email', area: 'Contacto', desc: 'Dirección de correo electrónico principal' },
  { nombre: 'Número de teléfono', tipo: 'Teléfono', area: 'Contacto', desc: 'WhatsApp o teléfono de contacto' },
  { nombre: 'Género', tipo: 'Select', area: 'Contacto', desc: 'Masculino / Femenino / Otro' },
  { nombre: 'Edad', tipo: 'Número', area: 'Contacto', desc: 'Edad del alumno en años' },
  { nombre: 'Nacionalidad', tipo: 'Select', area: 'Contacto', desc: 'País de origen del alumno' },
  { nombre: 'Universidad o Escuela', tipo: 'Texto', area: 'Contacto', desc: 'Institución de origen del alumno' },
  // CRM
  { nombre: 'Propietario del contacto', tipo: 'Select', area: 'CRM', desc: 'Vendedor/asesor asignado en HubSpot' },
  { nombre: 'Fecha de creación', tipo: 'Fecha', area: 'CRM', desc: 'Fecha en que el lead ingresó a HubSpot' },
  { nombre: 'Última actividad', tipo: 'Fecha', area: 'CRM', desc: 'Última interacción registrada en HubSpot' },
  { nombre: 'Estado del lead', tipo: 'Select', area: 'CRM', desc: 'Nuevo / Contactado / En Proceso / Ganado / Perdido' },
  { nombre: 'Primera conversión', tipo: 'Texto', area: 'CRM', desc: 'Primera acción del lead (formulario, WS, etc.)' },
  { nombre: 'Conversión más reciente', tipo: 'Texto', area: 'CRM', desc: 'Última conversión registrada en HubSpot' },
  // Marketing / Canal
  { nombre: 'Canal de Adquisición', tipo: 'Select', area: 'Marketing', desc: 'Fuente de origen del lead (Paid Social, Referidos, Orgánico…)' },
  { nombre: 'Tipo de Canal Customer', tipo: 'Select', area: 'Marketing', desc: 'Clasificación del canal del cliente convertido' },
  { nombre: 'Tipo de Paid Social (Social Ads)', tipo: 'Select', area: 'Marketing', desc: 'Meta AR / Meta CHI / Google / TikTok…' },
  { nombre: 'Tipo de Canal Offline', tipo: 'Select', area: 'Marketing', desc: 'Evento / Feria / Universidad / Referido…' },
  { nombre: 'Campaña Pauta WS', tipo: 'Texto', area: 'Marketing', desc: 'Nombre de la campaña de WhatsApp/Paid que originó el lead' },
  { nombre: 'Mes de Campaña Publicitaria', tipo: 'Fecha-Mes', area: 'Marketing', desc: 'Mes en que se activó la campaña pagada' },
  { nombre: 'Mes de Webinar', tipo: 'Fecha-Mes', area: 'Marketing', desc: 'Mes del webinar que generó el lead' },
  // Programa
  { nombre: 'Destino VM', tipo: 'Select', area: 'Programa', desc: 'País de destino del programa (Irlanda, Malta, Alemania, España…)' },
  { nombre: 'Servicio Contratado (Primario)', tipo: 'Select', area: 'Programa', desc: 'Escuela/institución principal contratada' },
  { nombre: 'Servicios Complementarios', tipo: 'Texto', area: 'Programa', desc: 'Adicionales al servicio principal (alojamiento, seguro, traslados…)' },
  { nombre: 'Number of Weeks', tipo: 'Número', area: 'Programa', desc: 'Duración del programa en semanas' },
  { nombre: 'Timetable', tipo: 'Select', area: 'Programa', desc: 'Horario de clases (General English, Business, Intensive…)' },
  { nombre: 'Mes de Inicio de Clases', tipo: 'Fecha-Mes', area: 'Programa', desc: 'Mes en que el alumno comienza el programa' },
  { nombre: 'Fecha de Comienzo de Curso', tipo: 'Fecha', area: 'Programa', desc: 'Fecha exacta de inicio de clases' },
  // Venta
  { nombre: 'Mes de Venta', tipo: 'Fecha-Mes', area: 'Venta', desc: 'Mes en que se cerró la venta (deal ganado)' },
  { nombre: 'Mes de Customer', tipo: 'Fecha-Mes', area: 'Venta', desc: 'Mes en que el lead pasa a estado Customer' },
  { nombre: 'Mes de Venta - Renovación', tipo: 'Fecha-Mes', area: 'Venta', desc: 'Mes de cierre en caso de ser una venta de renovación' },
  { nombre: 'Ticket (valor deal)', tipo: 'Número', area: 'Venta', desc: 'Valor en USD/EUR de la venta cerrada' },
  // Referidos y Promociones
  { nombre: 'Tipo de Referido', tipo: 'Select', area: 'Referidos', desc: 'Cliente / Alumno actual / Familiar / Partner' },
  { nombre: 'Código Promocional', tipo: 'Texto', area: 'Referidos', desc: 'Código de descuento o promoción aplicado' },
  { nombre: 'Moderación customer', tipo: 'Select', area: 'Referidos', desc: 'Estado de moderación del cliente en comunidad VM' },
];

const AREAS_ORDER = ['Contacto', 'CRM', 'Marketing', 'Programa', 'Venta', 'Referidos'];

const AREA_COLORS: Record<string, string> = {
  Contacto: '#3498db',
  CRM: '#9b59b6',
  Marketing: '#e91e63',
  Programa: '#22c55e',
  Venta: '#f39c12',
  Referidos: '#1abc9c',
};

const TIPO_BADGE: Record<string, string> = {
  Texto: 'badge-gray',
  Email: 'badge-blue',
  Teléfono: 'badge-blue',
  Select: 'badge-purple',
  Fecha: 'badge-gold',
  'Fecha-Mes': 'badge-gold',
  Número: 'badge-green',
};

export default function Campos() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>📋 Catálogo de Campos</h2>
      <p className={styles.pageSubtitle}>
        Todos los campos del tipo <code>Contact</code> disponibles en HubSpot y en el dashboard
      </p>

      <div className="info-box" style={{ marginBottom: '1.5rem' }}>
        <strong>📌 Total de campos:</strong> {CAMPOS.length} campos estructurados en {AREAS_ORDER.length} áreas.
        Cada campo tiene su equivalente tipado en <code>/types/index.ts</code> y su propiedad en el array <code>Contact[]</code>.
      </div>

      {AREAS_ORDER.map(area => {
        const campos = CAMPOS.filter(c => c.area === area);
        return (
          <div key={area} className="card" style={{ marginBottom: '1.25rem', borderTop: `3px solid ${AREA_COLORS[area]}` }}>
            <div className="section-title" style={{ borderLeftColor: AREA_COLORS[area] }}>
              {area} <span style={{ fontSize: '.78rem', color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '.5rem' }}>
                ({campos.length} campos)
              </span>
            </div>

            {/* Header */}
            <div className={styles.campoRow + ' ' + styles.campoHeader}>
              <span>Nombre del Campo</span>
              <span>Tipo</span>
              <span>Área</span>
              <span>Descripción</span>
            </div>

            {campos.map(campo => (
              <div key={campo.nombre} className={styles.campoRow}>
                <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{campo.nombre}</span>
                <span>
                  <span className={`badge ${TIPO_BADGE[campo.tipo] ?? 'badge-gray'}`}>{campo.tipo}</span>
                </span>
                <span style={{ color: AREA_COLORS[area], fontWeight: 600, fontSize: '.78rem' }}>{campo.area}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{campo.desc}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
