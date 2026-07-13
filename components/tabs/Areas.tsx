import styles from './Tab.module.css';

const AREAS = [
  {
    icon: '💼', title: 'Equipo Comercial',
    color: '#3498db',
    roles: [
      { name: 'Vendedores (Asesores)', desc: 'Gestión directa de leads, seguimiento, cotización y cierre. Acceso a su propio panel de desempeño.' },
      { name: 'Team Leader Comercial', desc: 'Supervisión de vendedores, revisión de embudos, seguimiento de metas mensuales y análisis de conversión.' },
      { name: 'Director Comercial', desc: 'Visión global del negocio. Acceso completo a todos los paneles, KPIs consolidados y reportes históricos.' },
    ],
  },
  {
    icon: '📣', title: 'Marketing',
    color: '#9b59b6',
    roles: [
      { name: 'Ejecutivo de Marketing', desc: 'Análisis de performance de campañas Paid Social (Meta AR, Meta CHI), orgánico y webinars por mes.' },
      { name: 'Responsable de Pauta', desc: 'Seguimiento de leads por campaña publicitaria, mes de pauta y tipo de canal Paid Social.' },
      { name: 'Director de Marketing', desc: 'Visión de ROI por canal, tendencias de adquisición y correlación con ventas cerradas.' },
    ],
  },
  {
    icon: '🎓', title: 'Operaciones y Admisiones',
    color: '#22c55e',
    roles: [
      { name: 'Coordinador de Admisiones', desc: 'Seguimiento de fechas de inicio de clases, timetable y comienzo de cursos por destino.' },
      { name: 'Equipo de Operaciones', desc: 'Control de servicios contratados (primario + complementarios), destinos VM y universidades/escuelas.' },
    ],
  },
  {
    icon: '⚙️', title: 'Administración y Sistemas',
    color: '#e67e22',
    roles: [
      { name: 'Administrador del Sistema', desc: 'Gestión de accesos por rol, actualización del array de datos desde HubSpot, mantenimiento del dashboard.' },
      { name: 'Responsable de Datos', desc: 'Carga, validación y normalización de datos exportados de HubSpot al archivo contacts.ts.' },
    ],
  },
];

const VENDEDORES = [
  { nombre: 'Cathy',     color: '#e74c3c', pais: 'MX',  especialidad: 'México / Referidos' },
  { nombre: 'Gime',      color: '#3498db', pais: 'UY',  especialidad: 'Uruguay / Orgánico' },
  { nombre: 'Juan Cruz', color: '#2ecc71', pais: 'CHI', especialidad: 'Chile / Pauta' },
  { nombre: 'Majo',      color: '#9b59b6', pais: 'AR',  especialidad: 'Argentina / Multi' },
  { nombre: 'Vero',      color: '#f39c12', pais: 'AR',  especialidad: 'Argentina / Offline' },
  { nombre: 'Cari',      color: '#1abc9c', pais: 'AR',  especialidad: 'Latam / Propio' },
  { nombre: 'Carlos',    color: '#e67e22', pais: 'CHI', especialidad: 'Chile / Paid Social' },
  { nombre: 'Maguie',    color: '#e91e63', pais: 'MX',  especialidad: 'México / Multi' },
  { nombre: 'Caro',      color: '#00bcd4', pais: 'CHI', especialidad: 'Chile / Pauta' },
  { nombre: 'Bruno',     color: '#607d8b', pais: 'AR',  especialidad: 'Argentina / Paid Social' },
];

export default function Areas() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>👥 Áreas y Equipos</h2>
      <p className={styles.pageSubtitle}>Estructura organizacional y roles con acceso al Tablero VM</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {AREAS.map(area => (
          <div key={area.title} className="card" style={{ borderTop: `3px solid ${area.color}` }}>
            <div className="section-title" style={{ borderLeftColor: area.color }}>
              {area.icon} {area.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {area.roles.map(role => (
                <div key={role.name} className={styles.roleCard} style={{ borderLeftColor: area.color }}>
                  <div className={styles.roleName}>{role.name}</div>
                  <div className={styles.roleDesc}>{role.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-title">🧑‍💼 Equipo Comercial Activo</div>
        <div className={styles.grid3} style={{ marginTop: '.75rem', gap: '.75rem' }}>
          {VENDEDORES.map(v => (
            <div key={v.nombre} style={{
              display: 'flex', alignItems: 'center', gap: '.8rem',
              background: '#f8faff', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '.7rem .9rem',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: v.color, color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '.82rem', flexShrink: 0,
              }}>
                {v.nombre.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--primary)' }}>{v.nombre}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-secondary)' }}>{v.especialidad}</div>
              </div>
              <span className="badge badge-blue" style={{ marginLeft: 'auto', fontSize: '.68rem' }}>{v.pais}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
