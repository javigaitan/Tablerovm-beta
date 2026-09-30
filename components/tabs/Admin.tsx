'use client';
import { useMemo } from 'react';
import type { SaleRecord } from '../../types';
import { salesData } from '../../lib/dataUtils';
import styles from './Tab.module.css';

export default function Admin() {
  const totalRegistros = useMemo(() => salesData.length, []);
  const totalRevenue   = useMemo(() => salesData.reduce((s: number, r: SaleRecord) => s + r.ticket, 0), []);
  const vendedores     = useMemo(() => Array.from(new Set(salesData.map((r: SaleRecord) => r.vendedor))).sort(), []);
  const destinos       = useMemo(() => Array.from(new Set(salesData.map((r: SaleRecord) => r.destino))).sort(), []);
  const escuelas       = useMemo(() => Array.from(new Set(salesData.map((r: SaleRecord) => r.escuela))).sort(), []);
  const canales        = useMemo(() => Array.from(new Set(salesData.map((r: SaleRecord) => r.canal))).sort(), []);

  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>Panel de Administracion</h2>
      <p className={styles.pageSubtitle}>Gestion del sistema, datos y configuracion del Tablero VM</p>

      <div className="info-box gold" style={{ marginBottom: '1.5rem' }}>
        <strong>Acceso Restringido:</strong> Este panel esta disponible unicamente para el rol <strong>Administrador</strong>.
        Las acciones realizadas aqui afectan a todos los usuarios del sistema.
      </div>

      {/* Estado del sistema */}
      <div className={styles.grid4} style={{ marginBottom: '1.25rem' }}>
        {[
          { label: 'Registros Cargados',    value: String(totalRegistros),  icon: '📋', color: '#1e3a5f' },
          { label: 'Facturacion en Sistema', value: '$' + totalRevenue.toLocaleString('es-AR', { maximumFractionDigits: 0 }), icon: '💰', color: '#c8a96e' },
          { label: 'Vendedores Activos',    value: String(vendedores.length), icon: '👤', color: '#3498db' },
          { label: 'Destinos Disponibles',  value: String(destinos.length),  icon: '🌍', color: '#22c55e' },
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
          <div className="section-title">Gestion de Datos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { label: 'Actualizar desde HubSpot',   desc: 'Reemplaza el array contacts.ts con los ultimos datos exportados del CRM.',               status: 'Manual',        statusClass: 'badge-gold'  },
              { label: 'Validar Estructura de Datos', desc: 'Verifica que todos los registros cumplan con el tipo Contact y no haya campos faltantes.', status: 'Disponible',    statusClass: 'badge-green' },
              { label: 'Exportar CSV Filtrado',       desc: 'Descarga los registros actuales (con filtros aplicados) en formato CSV.',                 status: 'En desarrollo', statusClass: 'badge-gray'  },
              { label: 'Limpiar Datos de Prueba',     desc: 'Elimina registros con ticket = 0 que fueron cargados como test.',                         status: 'Manual',        statusClass: 'badge-gold'  },
            ].map(action => (
              <div key={action.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '.75rem', background: '#f8faff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', gap: '.75rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--primary)', marginBottom: '.2rem' }}>{action.label}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{action.desc}</div>
                </div>
                <span className={`badge ${action.statusClass}`} style={{ flexShrink: 0 }}>{action.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gestion de acceso */}
        <div className="card">
          <div className="section-title">Gestion de Acceso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { label: 'Agregar Vendedor',       desc: 'Registra un nuevo asesor comercial con su rol y color de identificacion.',  status: 'En desarrollo', statusClass: 'badge-gray' },
              { label: 'Editar Roles',           desc: 'Modifica los permisos de acceso a paneles por rol de usuario.',             status: 'En desarrollo', statusClass: 'badge-gray' },
              { label: 'Gestion de Contrasenas', desc: 'Reset de contrasenas y gestion de sesiones activas.',                       status: 'En desarrollo', statusClass: 'badge-gray' },
              { label: 'Log de Actividad',       desc: 'Historial de accesos y cambios realizados por cada usuario.',               status: 'En desarrollo', statusClass: 'badge-gray' },
            ].map(action => (
              <div key={action.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '.75rem', background: '#f8faff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', gap: '.75rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--primary)', marginBottom: '.2rem' }}>{action.label}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>{action.desc}</div>
                </div>
                <span className={`badge ${action.statusClass}`} style={{ flexShrink: 0 }}>{action.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores unicos registrados */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">Valores Unicos en el Sistema</div>
        <div className={styles.grid2} style={{ marginTop: '.75rem' }}>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>Vendedores ({vendedores.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {vendedores.map((v: string) => <span key={v} className="badge badge-blue">{v}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>Canales ({canales.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {canales.map((c: string) => <span key={c} className="badge badge-purple">{c}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>Destinos ({destinos.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {destinos.map((d: string) => <span key={d} className="badge badge-green">{d}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.5rem', fontSize: '.88rem' }}>Escuelas ({escuelas.length})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {escuelas.map((e: string) => <span key={e} className="badge badge-gold">{e}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Info del archivo */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">Estado del Archivo de Datos</div>
        <table className="vm-table">
          <tbody>
            <tr><td><strong>Archivo</strong></td><td><code>/data/contacts.ts</code></td></tr>
            <tr><td><strong>Tipo</strong></td><td><code>Contact[]</code> — array TypeScript tipado</td></tr>
            <tr><td><strong>Registros actuales</strong></td><td>{totalRegistros} contactos</td></tr>
            <tr><td><strong>Campos por registro</strong></td><td>34 campos (todos los campos HubSpot acordados)</td></tr>
            <tr><td><strong>Ultima actualizacion</strong></td><td>Carga inicial — actualizar desde HubSpot</td></tr>
            <tr><td><strong>Validacion de tipos</strong></td><td>TypeScript strict mode activado</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}