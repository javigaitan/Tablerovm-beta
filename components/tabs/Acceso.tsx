import styles from './Tab.module.css';

const ROLES = ['Vendedor', 'Team Leader', 'Dir. Comercial', 'Marketing', 'Dir. Mkt', 'Admin'];

const PERMISOS: { panel: string; acceso: boolean[] }[] = [
  { panel: '📈 KPIs Globales',             acceso: [false, true,  true,  true,  true,  true ] },
  { panel: '👤 Mi Panel (propio)',          acceso: [true,  false, false, false, false, false] },
  { panel: '👥 Ranking de Vendedores',      acceso: [false, true,  true,  false, false, true ] },
  { panel: '📣 Panel de Canales',           acceso: [false, false, true,  true,  true,  true ] },
  { panel: '🌍 Panel de Destinos',          acceso: [true,  true,  true,  false, false, true ] },
  { panel: '🎓 Panel de Escuelas',          acceso: [true,  true,  true,  false, false, true ] },
  { panel: '🌎 Panel de Nacionalidades',    acceso: [false, true,  true,  true,  true,  true ] },
  { panel: '📅 Panel Temporal / Tendencias',acceso: [false, true,  true,  true,  true,  true ] },
  { panel: '🔄 Panel de Renovaciones',      acceso: [true,  true,  true,  false, false, true ] },
  { panel: '📋 Tabla de Contactos',         acceso: [true,  true,  true,  false, false, true ] },
  { panel: '⚙️ Panel de Administración',   acceso: [false, false, false, false, false, true ] },
];

const ROLE_COLORS = ['#3498db', '#9b59b6', '#1e3a5f', '#e91e63', '#c8a96e', '#e67e22'];

export default function Acceso() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>🔐 Control de Acceso por Rol</h2>
      <p className={styles.pageSubtitle}>Matriz de permisos para cada panel del dashboard según el rol del usuario</p>

      <div className="info-box gold" style={{ marginBottom: '1.5rem' }}>
        <strong>🔑 Nota de implementación:</strong> Los roles se gestionan desde el Panel de Administración.
        La autenticación se integra con el sistema de usuarios de HubSpot o con un proveedor externo (Google Auth / Auth0).
      </div>

      {/* Matriz de permisos */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <div className="section-title">📊 Matriz de Permisos</div>
        <table className={styles.accessTable}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', minWidth: 220 }}>Panel / Funcionalidad</th>
              {ROLES.map((rol, i) => (
                <th key={rol} style={{ textAlign: 'center', background: ROLE_COLORS[i] }}>{rol}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISOS.map(p => (
              <tr key={p.panel}>
                <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{p.panel}</td>
                {p.acceso.map((tiene, i) => (
                  <td key={i} className={styles.accessTable + ' check'} style={{ textAlign: 'center' }}>
                    {tiene
                      ? <span style={{ color: '#22c55e', fontSize: '1.1rem' }}>✅</span>
                      : <span style={{ color: '#e2e8f0', fontSize: '1.1rem' }}>—</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Descripción de roles */}
      <div className={styles.grid2} style={{ marginTop: '1.25rem' }}>
        {ROLES.map((rol, i) => (
          <div key={rol} className="card" style={{ borderLeft: `4px solid ${ROLE_COLORS[i]}` }}>
            <div style={{ fontWeight: 700, color: ROLE_COLORS[i], marginBottom: '.35rem' }}>{rol}</div>
            <div style={{ fontSize: '.84rem', color: 'var(--text-secondary)' }}>
              {[
                'Accede únicamente a su propio panel de desempeño, tabla de sus contactos y destinos/escuelas.',
                'Visión del equipo completo: rankings, embudos por vendedor y comparativas de período.',
                'Acceso total a todos los paneles comerciales, KPIs y reportes históricos. Sin administración.',
                'Panel de canales, análisis de campañas, distribución de leads por fuente y mes de pauta.',
                'Visión completa de marketing: ROI por canal, correlación campañas-ventas, tendencias.',
                'Acceso completo + gestión de usuarios, roles, carga de datos y configuración del sistema.',
              ][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
