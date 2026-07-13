import styles from './Tab.module.css';

const STEPS = [
  {
    num: '01', icon: '📥', title: 'Captación del Lead',
    desc: 'El lead entra por alguno de los canales definidos (Paid Social, Referidos, Orgánico, Offline, Propio) y queda registrado en HubSpot con su canal de adquisición, campaña y datos de contacto.',
    color: '#3498db',
  },
  {
    num: '02', icon: '🏷️', title: 'Asignación',
    desc: 'HubSpot asigna automáticamente el propietario del contacto según las reglas de distribución configuradas. El vendedor recibe notificación y el lead queda en estado "Nuevo".',
    color: '#9b59b6',
  },
  {
    num: '03', icon: '📞', title: 'Contacto Inicial',
    desc: 'El vendedor realiza el primer contacto. Se registra la fecha de última actividad. El estado del lead avanza a "Contactado" o "En Proceso".',
    color: '#f39c12',
  },
  {
    num: '04', icon: '💬', title: 'Asesoramiento',
    desc: 'El equipo comercial asesora sobre destinos VM, escuelas, servicios contratados (primario + complementarios), fechas de inicio de clases y timetable.',
    color: '#1abc9c',
  },
  {
    num: '05', icon: '📄', title: 'Cotización y Cierre',
    desc: 'Se genera la propuesta con destino VM, escuela, número de semanas y servicios. Al confirmar, se registra Fecha de Cierre, Ticket de venta y Mes de Venta.',
    color: '#e67e22',
  },
  {
    num: '06', icon: '✅', title: 'Customer',
    desc: 'El lead pasa a estado "Ganado" y se registra como Customer. Se actualiza Mes de Customer, moderación y código promocional si aplica.',
    color: '#2ecc71',
  },
  {
    num: '07', icon: '📊', title: 'Reporte en Tablero',
    desc: 'Los datos se exportan de HubSpot al archivo contacts.ts. El tablero procesa automáticamente KPIs, rankings, análisis de canal y gráficos evolutivos.',
    color: '#c8a96e',
  },
];

export default function Flujo() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>🔄 Flujo de Trabajo Comercial</h2>
      <p className={styles.pageSubtitle}>Proceso desde la captación del lead hasta el reporte en el dashboard</p>

      <div className="info-box" style={{ marginBottom: '1.5rem' }}>
        <strong>📌 Nota:</strong> Cada etapa del flujo genera datos que alimentan el tablero.
        La calidad del registro en HubSpot impacta directamente en la precisión de los análisis.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            background: '#fff', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)', padding: '1.1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)',
            borderLeft: `4px solid ${step.color}`,
          }}>
            <div style={{
              background: step.color, color: '#fff', borderRadius: '50%',
              width: 44, height: 44, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0, fontSize: '1.3rem',
            }}>
              {step.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.3rem' }}>
                <span style={{ fontSize: '.72rem', fontWeight: 700, color: step.color, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  PASO {step.num}
                </span>
                <strong style={{ fontSize: '.95rem', color: 'var(--primary)' }}>{step.title}</strong>
              </div>
              <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ position: 'absolute', left: '2.2rem', marginTop: '4.5rem', color: step.color, fontSize: '1.2rem' }}>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="section-title">🔑 Estados del Lead en HubSpot</div>
        <div className={styles.grid4} style={{ marginTop: '.75rem' }}>
          {[
            { label: 'Nuevo', color: '#3498db', bg: '#dbeafe' },
            { label: 'Contactado', color: '#f39c12', bg: '#fef9c3' },
            { label: 'En Proceso', color: '#9b59b6', bg: '#f3e8ff' },
            { label: 'Propuesta Enviada', color: '#e67e22', bg: '#fff7ed' },
            { label: 'Ganado', color: '#22c55e', bg: '#dcfce7' },
            { label: 'Perdido', color: '#ef4444', bg: '#fee2e2' },
            { label: 'Descartado', color: '#64748b', bg: '#f1f5f9' },
            { label: 'Renovación', color: '#c8a96e', bg: '#fef9c3' },
          ].map(s => (
            <div key={s.label} style={{
              background: s.bg, border: `1px solid ${s.color}33`,
              borderRadius: 'var(--radius-sm)', padding: '.6rem .9rem',
              textAlign: 'center', fontWeight: 600, fontSize: '.82rem', color: s.color,
            }}>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
