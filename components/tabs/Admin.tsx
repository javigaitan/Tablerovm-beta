import styles from './Tab.module.css';
import { salesData } from '@/lib/dataUtils';

const totalRegistros = salesData.length;
const totalRevenue = salesData.reduce((s, r) => s + r.ticket, 0);
const vendedores = Array.from(new Set(salesData.map(r => r.vendedor))).sort();
const destinos   = Array.from(new Set(salesData.map(r => r.destino))).sort();
const escuelas   = Array.from(new Set(salesData.map(r => r.escuela))).sort();
const canales    = Array.from(new Set(salesData.map(r => r.canal))).sort();

export default function Admin() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>⚙️ Panel de Administración</h2>
      <p className={styles.pageSubtitle}>Gestión del sistema, datos y configuración del Tablero VM</p>

      <div className="info-box gold" style={{ marginBottom: '1.5rem' }}>
        <strong>⚠️ Acceso Restringido:</strong> Este panel está disponible únicamente para el rol <strong>Administrador</strong>.
        Las acciones realizadas aquí afectan a todos los usuarios del sistema.
      </div>

      {/* Estado del sistema */}
      <div className={styles.grid4} style={{ marginBottom: '1.25rem' }}>
        {[
          { label: 'Registros Cargados', value: totalRegistros, icon: '📋', color: '#1e3a5f' },
          { label: 'Revenue en Sistema', value: '$' + totalRevenue.toLocaleString('es-AR', { maximumFractionDigits: 0 }), icon: '💰', color: '#c8a96e' },
          { label: 'Vendedores Activos', value: vendedores.length, icon: '👤', color: '#3498db' },
          { label: 'Destinos Disponibles', value: destinos.length, icon: '🌍', color: '#22c55e' },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ borderTop: `3px solid ${stat.color}`, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '.3rem' }}>{stat.icon}</div>
            <div className="kpi-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="kpi-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {/* Acciones de datos */}
        <div className="card">
          <div className="section-title">📥 Gestión de Datos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { icon: '🔄', label: 'Actualizar desde HubSpot', desc: 'Reemplaza el array contacts.ts con los últimos datos exportados del CRM.', status: 'Manual', statusClass: 'badge-gold' },
              { icon: '✅', label: 'Validar Estructura de Datos', desc: 'Verifica que todos los registros cumplan con el tipo Contact y no haya campos faltantes.', status: 'Disponible', statusClass: 'badge-green' },
              { icon: '📤', label: 'Exportar CSV Filtrado', desc: 'Descarga los registros actuales (con filtros aplicados) en formato CSV.', status: 'En desarrollo', statusClass: 'badge-gray' },
              { icon: '🗑️', label: 'Limpiar Datos de Prueba', desc: 'Elimina registros con ticket = 0 que fueron cargados como test.', status: 'Manual', statusClass: 'badge-gold' },
            ].map(action => (
              <div key={action.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '.75rem', background: '#f8faff', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', gap: '.75rem',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--primary)', marginBottom: '.2rem' }}>
                    {action.icon} {action.label}
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{action.desc}</div>
                </div>
                <span className={`badge ${action.statusClass}`} style={{ flexShrink: 0 }}>{action.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gestión de acceso */}
        <div className="card">
          <div className="section-title">🔐 Gestión de Acceso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { icon: '➕', label: 'Agregar Vendedor', desc: 'Registra un nuevo asesor comercial con su rol y color de identificación.', status: 'En desarrollo', statusClass: 'badge-gray' },
              { icon: '✏️', label: 'Editar Roles', desc: 'Modifica los permisos de acceso a paneles por rol de usuario.', status: 'En desarrollo', statusClass: 'badge-gray' },
              { icon: '🔑', label: 'Gestión de Contraseñas', desc: 'Reset de contraseñas y gestión de sesiones activas.', status: 'En desarrollo', statusClass: 'badge-gray' },
              { icon: '📊', label: 'Log de Actividad', desc: 'Historial de accesos y cambios realizados por cada usuario.', status: 'En desarrollo', statusClass: 'badge-gray' },
            ].map(action => (
              <div key={action.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '.75rem', background: '#f8faff', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)', gap: '.75rem',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--primary)', marginBottom: '.2rem' }}>
                    {action.icon} {action.label}
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{action.desc}</div>
                </div>
                <span className={`badge ${action.statusClass}`} style={{ flexShrink: 0 }}>{action.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores únicos registrados */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">🗂️ Valores Únicos en el Sistema</div>
        <div className={styles.grid2} style={{ marginTop: '.75rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>
              👤 Vendedores ({vendedores.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {vendedores.map(v => <span key={v} className="badge badge-blue">{v}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>
              📣 Canales ({canales.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {canales.map(c => <span key={c} className="badge badge-purple">{c}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>
              🌍 Destinos ({destinos.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {destinos.map(d => <span key={d} className="badge badge-green">{d}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>
              🎓 Escuelas ({escuelas.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {escuelas.map(e => <span key={e} className="badge badge-gold">{e}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Info del archivo */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">📄 Estado del Archivo de Datos</div>
        <table className="vm-table">
          <tbody>
            <tr><td><strong>Archivo</strong></td><td><code>/data/contacts.ts</code></td></tr>
            <tr><td><strong>Tipo</strong></td><td><code>Contact[]</code> — array TypeScript tipado</td></tr>
            <tr><td><strong>Registros actuales</strong></td><td>{totalRegistros} contactos</td></tr>
            <tr><td><strong>Campos por registro</strong></td><td>34 campos (todos los campos HubSpot acordados)</td></tr>
            <tr><td><strong>Última actualización</strong></td><td>Carga inicial — actualizar desde HubSpot</td></tr>
            <tr><td><strong>Validación de tipos</strong></td><td>✅ TypeScript strict mode activado</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
