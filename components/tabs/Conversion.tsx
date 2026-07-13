'use client';
import { useMemo } from 'react';
import { salesData, getConversionSummary, getConversionByChannel } from '@/lib/dataUtils';
import { leadsTotals } from '@/data/leadsTotals';
import styles from './Tab.module.css';

function fmt(n: number) { return n.toLocaleString('es-AR', { maximumFractionDigits: 0 }); }

const CANAL_COLORS: Record<string, string> = {
  Pauta: '#3498db', Referidos: '#2ecc71', 'Orgánico': '#9b59b6',
  Offline: '#f39c12', Propio: '#1abc9c', Webinar: '#e67e22',
  WhatsApp: '#25d366', Embajadores: '#e91e63', Otros: '#95a5a6',
};

function conversionColor(pct: number): string {
  if (pct >= 25) return '#22c55e';
  if (pct >= 12) return '#f39c12';
  return '#e74c3c';
}

export default function Conversion() {
  const summary = useMemo(() => getConversionSummary(salesData, leadsTotals), []);
  const rows = useMemo(() => getConversionByChannel(salesData, leadsTotals), []);

  const filasConDatos = rows.filter(r => !r.sinDatos);
  const filasSinDatos = rows.filter(r => r.sinDatos);

  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>🎯 Conversión de Leads</h2>
      <p className={styles.pageSubtitle}>
        Conversión general y conversión de Pauta Publicitaria — cruce entre ventas y leads asignados
      </p>

      {!summary.tieneDatos ? (
        <div className="info-box gold">
          <strong>⚠️ Sin datos de leads cargados todavía.</strong> Este panel necesita los totales de
          leads asignados por canal y mes para poder calcular la conversión. Completá el archivo{' '}
          <code>/data/leadsTotals.ts</code> con los números de tu reporte de HubSpot (Contactos → agrupado
          por Canal de Adquisición y mes) y los cálculos van a aparecer automáticamente acá.
        </div>
      ) : (
        <>
          {/* ── KPIs principales ── */}
          <div className={styles.kpiGrid}>
            <div className={styles.kpiCard}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>📥</div>
              <div className="kpi-value">{fmt(summary.totalLeadsAsignados)}</div>
              <div className="kpi-label">Leads Asignados (total)</div>
            </div>
            <div className={styles.kpiCard}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>🎯</div>
              <div className="kpi-value">{fmt(summary.totalVentas)}</div>
              <div className="kpi-label">Ventas Cerradas</div>
            </div>
            <div className={styles.kpiCard + ' ' + styles.gold}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>📊</div>
              <div className="kpi-value" style={{ color: conversionColor(summary.conversionGeneral) }}>
                {summary.conversionGeneral}%
              </div>
              <div className="kpi-label">Conversión General</div>
            </div>
            <div className="card" style={{ gridColumn: 'span 1' }} />
            <div className={styles.kpiCard} style={{ borderTopColor: CANAL_COLORS.Pauta }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>📣</div>
              <div className="kpi-value" style={{ color: CANAL_COLORS.Pauta }}>{fmt(summary.pautaLeadsAsignados)}</div>
              <div className="kpi-label">Leads de Pauta</div>
            </div>
            <div className={styles.kpiCard} style={{ borderTopColor: CANAL_COLORS.Pauta }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>✅</div>
              <div className="kpi-value" style={{ color: CANAL_COLORS.Pauta }}>{fmt(summary.pautaVentas)}</div>
              <div className="kpi-label">Ventas de Pauta</div>
            </div>
            <div className={styles.kpiCard + ' ' + styles.gold}>
              <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>🚀</div>
              <div className="kpi-value" style={{ color: conversionColor(summary.conversionPauta) }}>
                {summary.conversionPauta}%
              </div>
              <div className="kpi-label">Conversión Pauta</div>
            </div>
          </div>

          <div className="info-box" style={{ marginBottom: '1.5rem' }}>
            <strong>📌 Cómo se calcula:</strong> Conversión = Ventas cerradas ÷ Leads asignados × 100,
            cruzando por el mismo mes y canal. La <strong>Conversión General</strong> suma todos los
            canales que tengan datos cargados en <code>leadsTotals.ts</code>; la <strong>Conversión de
            Pauta</strong> usa únicamente las filas del canal Pauta Publicitaria.
          </div>

          {/* ── Tabla detallada por mes y canal ── */}
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <div className="section-title">📋 Detalle por Mes y Canal</div>
            <div style={{ overflowX: 'auto' }}>
              <table className="vm-table">
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Canal</th>
                    <th>Leads Asignados</th>
                    <th>Ventas</th>
                    <th>Conversión</th>
                  </tr>
                </thead>
                <tbody>
                  {filasConDatos.map((r, i) => (
                    <tr key={`${r.mes}-${r.canal}-${i}`}>
                      <td>{r.mes}</td>
                      <td>
                        <span className="badge" style={{
                          background: (CANAL_COLORS[r.canal] ?? '#95a5a6') + '22',
                          color: CANAL_COLORS[r.canal] ?? '#64748b',
                        }}>
                          {r.canal}
                        </span>
                      </td>
                      <td>{fmt(r.leadsAsignados)}</td>
                      <td><strong>{fmt(r.ventas)}</strong></td>
                      <td>
                        <span style={{ fontWeight: 700, color: conversionColor(r.conversion) }}>
                          {r.conversion}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filasConDatos.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                      Sin filas cargadas en leadsTotals.ts todavía.
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Ventas sin denominador cargado ── */}
          {filasSinDatos.length > 0 && (
            <div className="card">
              <div className="section-title" style={{ borderLeftColor: '#f39c12' }}>
                ⚠️ Ventas sin datos de leads cargados
              </div>
              <p style={{ fontSize: '.84rem', color: 'var(--text-secondary)', marginBottom: '.75rem' }}>
                Estas combinaciones de mes + canal tienen ventas registradas en <code>contacts.ts</code> pero
                todavía no tienen su total de leads asignados en <code>leadsTotals.ts</code>. Agregalas para
                que entren en el cálculo de conversión.
              </p>
              <table className="vm-table">
                <thead>
                  <tr><th>Mes</th><th>Canal</th><th>Ventas registradas</th></tr>
                </thead>
                <tbody>
                  {filasSinDatos.map((r, i) => (
                    <tr key={`${r.mes}-${r.canal}-${i}`}>
                      <td>{r.mes}</td>
                      <td>
                        <span className="badge" style={{
                          background: (CANAL_COLORS[r.canal] ?? '#95a5a6') + '22',
                          color: CANAL_COLORS[r.canal] ?? '#64748b',
                        }}>
                          {r.canal}
                        </span>
                      </td>
                      <td>{fmt(r.ventas)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
