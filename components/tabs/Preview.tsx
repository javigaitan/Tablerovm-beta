'use client';
import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  LineElement, PointElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { salesData, filterData, calcKPIs, getMonthlySeries, getUniqueValues, getYears, getMesesVenta, countBy, groupBy, sumBy, getConversionPautaPorAsesor } from '@/lib/dataUtils';
import styles from './Tab.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { grid: { display: false } }, y: { grid: { color: '#f1f5f9' } } },
};
const DOUGHNUT_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'right' as const, labels: { font: { size: 11 }, padding: 8, boxWidth: 12 } } },
  cutout: '62%',
};

const CANAL_COLORS: Record<string, string> = {
  Pauta: '#3498db', Referidos: '#2ecc71', 'Orgánico': '#9b59b6',
  Offline: '#f39c12', Propio: '#1abc9c', Webinar: '#e67e22',
  WhatsApp: '#25d366', Otros: '#95a5a6',
};
const PALETTE = ['#1e3a5f','#3498db','#2ecc71','#9b59b6','#f39c12','#1abc9c','#e67e22','#e74c3c','#e91e63','#00bcd4'];

function fmt(n: number) { return n.toLocaleString('es-AR', { maximumFractionDigits: 0 }); }
function fmtUSD(n: number) { return '$' + fmt(n); }

export default function Preview() {
  const [filters, setFilters] = useState({
    year: 'Todos', mes: 'Todos', vendedor: 'Todos', canal: 'Todos',
    destino: 'Todos', escuela: 'Todos', nacionalidad: 'Todos',
  });
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 15;

  const years  = useMemo(() => ['Todos', ...getYears(salesData).map(String).reverse()], []);
  const meses      = useMemo(() => ['Todos', ...getMesesVenta(salesData)], []);
  const vendedores = useMemo(() => ['Todos', ...getUniqueValues(salesData, 'vendedor')], []);
  const canales    = useMemo(() => ['Todos', ...getUniqueValues(salesData, 'canal')], []);
  const destinos   = useMemo(() => ['Todos', ...getUniqueValues(salesData, 'destino')], []);
  const escuelas   = useMemo(() => ['Todos', ...getUniqueValues(salesData, 'escuela')], []);
  const nacs       = useMemo(() => ['Todos', ...getUniqueValues(salesData, 'nacionalidad')], []);

  const setF = (k: keyof typeof filters, v: string) => {
    setFilters(prev => ({ ...prev, [k]: v }));
    setPage(0);
  };

  const filtered = useMemo(() => filterData(salesData, filters), [filters]);
  const kpis = useMemo(() => calcKPIs(filtered), [filtered]);
  const monthly = useMemo(() => getMonthlySeries(filtered), [filtered]);
  // Nota: la conversión de Pauta por asesor usa siempre salesData (sin filtros
  // de la barra) porque cruza contra leadsPorAsesor.ts, que ya viene agregado
  // por asesor+mes. Si filtráramos por año/vendedor acá, el cruce se rompería
  // para los meses que no estén dentro del filtro activo.
  const conversionAsesor = useMemo(() => getConversionPautaPorAsesor(), []);

  // Chart data
  const byVendedor = useMemo(() => countBy(filtered, r => r.vendedor), [filtered]);
  const byCanal    = useMemo(() => countBy(filtered, r => r.canal), [filtered]);
  const byDestino  = useMemo(() => countBy(filtered, r => r.destino), [filtered]);
  const byEscuela = useMemo(() => {
    const g = groupBy(filtered, r => r.escuela);
    return Object.entries(g)
      .map(([k, v]) => ({ escuela: k, count: v.length, revenue: sumBy(v, r => r.ticket) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [filtered]);

  const vendedorEntries = Object.entries(byVendedor).sort((a,b) => b[1]-a[1]);
  const canalEntries    = Object.entries(byCanal).sort((a,b) => b[1]-a[1]);
  const destinoEntries  = Object.entries(byDestino).sort((a,b) => b[1]-a[1]);
  const escuelaEntries  = byEscuela;

  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>👁️ Vista Previa Beta</h2>
      <p className={styles.pageSubtitle}>Dashboard interactivo — datos del array contacts.ts</p>

      {/* ── FILTROS ── */}
      <div className={styles.filtersBar}>
        <span className={styles.filterLabel}>🔍 Filtros:</span>
        {[
          { key: 'year', opts: years, label: 'Año' },
          { key: 'mes', opts: meses, label: 'Mes' },
          { key: 'vendedor', opts: vendedores, label: 'Vendedor' },
          { key: 'canal', opts: canales, label: 'Canal' },
          { key: 'destino', opts: destinos, label: 'Destino' },
          { key: 'escuela', opts: escuelas, label: 'Escuela' },
          { key: 'nacionalidad', opts: nacs, label: 'Nacionalidad' },
        ].map(({ key, opts, label }) => (
          <select
            key={key}
            className="vm-select"
            value={filters[key as keyof typeof filters]}
            onChange={e => setF(key as keyof typeof filters, e.target.value)}
          >
            {opts.map(o => <option key={o} value={o}>{o === 'Todos' ? label + ': Todos' : o}</option>)}
          </select>
        ))}
        <button
          style={{ marginLeft: 'auto', padding: '.42rem .9rem', background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '.82rem', fontFamily: 'inherit' }}
          onClick={() => setFilters({ year:'Todos', mes:'Todos', vendedor:'Todos', canal:'Todos', destino:'Todos', escuela:'Todos', nacionalidad:'Todos' })}
        >
          ✖ Limpiar
        </button>
      </div>

      {/* ── KPIs ── */}
      <div className={styles.kpiGrid}>
        {[
          { label: 'Ventas Cerradas', value: kpis.totalVentas.toString(), icon: '🎯', gold: false },
          { label: 'Facturacion Total', value: fmtUSD(kpis.totalRevenue), icon: '💰', gold: true },
          { label: 'Ticket Promedio', value: fmtUSD(kpis.ticketPromedio), icon: '📊', gold: true },
          { label: 'Top Vendedor', value: kpis.topVendedor, icon: '🏆', gold: false },
          { label: 'Top Canal', value: kpis.topCanal, icon: '📣', gold: false },
          { label: 'Top Destino', value: kpis.topDestino, icon: '🌍', gold: false },
          { label: 'Top Escuela', value: kpis.topEscuela, icon: '🎓', gold: false },
        ].map(kpi => (
          <div key={kpi.label} className={`${styles.kpiCard} ${kpi.gold ? styles.gold : ''}`}>
            <div style={{ fontSize: '1.4rem', marginBottom: '.3rem' }}>{kpi.icon}</div>
            <div className="kpi-value" style={{ fontSize: '1.4rem' }}>{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* ── GRÁFICOS ROW 1 ── */}
      <div className={styles.chartsGrid}>
        {/* Evolución mensual */}
        <div className={styles.chartCard} style={{ gridColumn: '1 / -1' }}>
          <div className={styles.chartTitle}>📅 Evolución Mensual de Ventas</div>
          <div className={styles.chartWrap} style={{ height: 220 }}>
            <Bar
              data={{
                labels: monthly.map(m => m.label),
                datasets: [{
                  label: 'Ventas',
                  data: monthly.map(m => m.ventas),
                  backgroundColor: '#1e3a5f',
                  borderRadius: 5,
                  hoverBackgroundColor: '#c8a96e',
                }],
              }}
              options={{ ...CHART_OPTS, plugins: { ...CHART_OPTS.plugins, tooltip: { callbacks: { label: (c) => ` ${c.raw} venta(s)` } } } }}
            />
          </div>
        </div>

        {/* Por Vendedor */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>👤 Ventas por Vendedor</div>
          <div className={styles.chartWrap}>
            <Bar
              data={{
                labels: vendedorEntries.map(([k]) => k),
                datasets: [{
                  label: 'Ventas',
                  data: vendedorEntries.map(([,v]) => v),
                  backgroundColor: vendedorEntries.map((_, i) => PALETTE[i % PALETTE.length]),
                  borderRadius: 5,
                }],
              }}
              options={CHART_OPTS}
            />
          </div>
        </div>

        {/* Por Canal */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>📣 Distribución por Canal</div>
          <div className={styles.chartWrap}>
            <Doughnut
              data={{
                labels: canalEntries.map(([k]) => k),
                datasets: [{
                  data: canalEntries.map(([,v]) => v),
                  backgroundColor: canalEntries.map(([k]) => CANAL_COLORS[k] ?? '#95a5a6'),
                  borderWidth: 2, borderColor: '#fff',
                }],
              }}
              options={DOUGHNUT_OPTS}
            />
          </div>
        </div>

        {/* Por Destino */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>🌍 Ventas por Destino</div>
          <div className={styles.chartWrap}>
            <Bar
              data={{
                labels: destinoEntries.map(([k]) => k),
                datasets: [{
                  label: 'Ventas',
                  data: destinoEntries.map(([,v]) => v),
                  backgroundColor: '#2d5986',
                  borderRadius: 5,
                  hoverBackgroundColor: '#c8a96e',
                }],
              }}
              options={{ ...CHART_OPTS, indexAxis: 'y' as const }}
            />
          </div>
        </div>

        {/* Revenue mensual */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>💰 Revenue Mensual (USD)</div>
          <div className={styles.chartWrap}>
            <Line
              data={{
                labels: monthly.map(m => m.label),
                datasets: [{
                  label: 'Revenue',
                  data: monthly.map(m => m.revenue),
                  borderColor: '#c8a96e',
                  backgroundColor: 'rgba(200,169,110,.1)',
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: '#c8a96e',
                  pointRadius: 4,
                }],
              }}
              options={{ ...CHART_OPTS, plugins: { ...CHART_OPTS.plugins, tooltip: { callbacks: { label: (c) => ` $${fmt(c.raw as number)}` } } } }}
            />
          </div>
        </div>
      </div>

      {/* ── RANKINGS ── */}
      <div className={styles.grid2} style={{ marginBottom: '1.25rem' }}>
        {/* Ranking vendedores */}
        <div className="card">
          <div className="section-title">🏆 Ranking de Vendedores</div>
          <table className={styles.rankingTable}>
            <thead>
              <tr><th>#</th><th>Vendedor</th><th>Ventas</th><th>Revenue</th><th>Ticket Prom.</th></tr>
            </thead>
            <tbody>
              {vendedorEntries.map(([vendedor, count], i) => {
                const group = filtered.filter(r => r.vendedor === vendedor);
                const rev = sumBy(group, r => r.ticket);
                const avg = count ? Math.round(rev / count) : 0;
                return (
                  <tr key={vendedor}>
                    <td><span style={{ fontWeight: 700, color: PALETTE[i % PALETTE.length] }}>#{i + 1}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                          background: PALETTE[i % PALETTE.length], display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: '.65rem', fontWeight: 700,
                        }}>
                          {vendedor.slice(0, 2).toUpperCase()}
                        </div>
                        {vendedor}
                      </div>
                    </td>
                    <td><strong>{count}</strong></td>
                    <td>{fmtUSD(rev)}</td>
                    <td>{fmtUSD(avg)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Ranking escuelas */}
        <div className="card">
          <div className="section-title">🎓 Ranking de Escuelas</div>
          <table className={styles.rankingTable}>
            <thead>
              <tr><th>#</th><th>Escuela</th><th>Alumnos</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {escuelaEntries.map((data, i) => (
                <tr key={data.escuela}>
                  <td><span style={{ fontWeight: 700, color: PALETTE[i % PALETTE.length] }}>#{i + 1}</span></td>
                  <td style={{ fontWeight: 500 }}>{data.escuela}</td>
                  <td><strong>{data.count}</strong></td>
                  <td>{fmtUSD(data.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CONVERSIÓN DE PAUTA POR ASESOR ── */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="section-title">🚀 Conversión de Pauta Publicitaria por Asesor</div>
        {conversionAsesor.length === 0 ? (
          <div className="info-box gold" style={{ marginTop: '.5rem' }}>
            <strong>⚠️ Sin datos cargados.</strong> Completá <code>/data/leadsPorAsesor.ts</code> con los
            leads de Pauta asignados a cada asesor por mes (desde HubSpot) para ver acá su % de conversión.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '.85rem',
            marginTop: '.5rem',
          }}>
            {conversionAsesor.map((row, i) => (
              <div key={row.vendedor} className={styles.kpiCard} style={{
                borderTopColor: PALETTE[i % PALETTE.length],
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: PALETTE[i % PALETTE.length], display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '.68rem', fontWeight: 700,
                  }}>
                    {row.vendedor.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '.85rem', color: 'var(--primary)' }}>{row.vendedor}</span>
                </div>
                <div className="kpi-value" style={{
                  fontSize: '1.5rem',
                  color: row.conversion >= 25 ? '#22c55e' : row.conversion >= 12 ? '#f39c12' : '#e74c3c',
                }}>
                  {row.conversion}%
                </div>
                <div className="kpi-label" style={{ marginTop: '.4rem' }}>
                  {row.ventasPauta} venta{row.ventasPauta !== 1 ? 's' : ''} / {row.leadsPauta} lead{row.leadsPauta !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── TABLA DE REGISTROS ── */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '.5rem' }}>
          <div className="section-title" style={{ margin: 0 }}>📋 Registros ({filtered.length})</div>
          <span className="badge badge-blue">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="vm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Escuela</th>
                <th>Destino</th>
                <th>Nacionalidad</th>
                <th>Canal</th>
                <th>Ticket</th>
                <th>Fecha Cierre</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '.78rem' }}>{page * PAGE_SIZE + i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{r.cliente}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: PALETTE[vendedorEntries.findIndex(([k]) => k === r.vendedor) % PALETTE.length],
                        flexShrink: 0,
                      }} />
                      {r.vendedor}
                    </div>
                  </td>
                  <td>{r.escuela}</td>
                  <td><span className="badge badge-blue">{r.destino}</span></td>
                  <td>{r.nacionalidad}</td>
                  <td>
                    <span className="badge" style={{
                      background: (CANAL_COLORS[r.canal] ?? '#95a5a6') + '22',
                      color: CANAL_COLORS[r.canal] ?? '#64748b',
                    }}>
                      {r.canal}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: r.ticket > 0 ? '#22c55e' : 'var(--text-muted)' }}>
                    {r.ticket > 0 ? fmtUSD(r.ticket) : '—'}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '.83rem' }}>
                    {r.fecha.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Sin resultados para los filtros seleccionados.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{ padding: '.35rem .75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? .4 : 1, fontFamily: 'inherit', fontSize: '.82rem' }}
            >← Ant.</button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = totalPages <= 7 ? i : i; // simple: show all if ≤7
              return (
                <button key={p} onClick={() => setPage(p)}
                  style={{ padding: '.35rem .65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '.82rem', background: page === p ? 'var(--primary)' : '#fff', color: page === p ? '#fff' : 'inherit', fontWeight: page === p ? 600 : 400 }}
                >{p + 1}</button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{ padding: '.35rem .75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: page === totalPages - 1 ? 'default' : 'pointer', opacity: page === totalPages - 1 ? .4 : 1, fontFamily: 'inherit', fontSize: '.82rem' }}
            >Sig. →</button>
          </div>
        )}
      </div>
    </div>
  );
}
