import styles from './Tab.module.css';

export default function Arquitectura() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>🏗️ Arquitectura del Sistema</h2>
      <p className={styles.pageSubtitle}>Estructura técnica y organizacional del Tablero VM</p>

      <div className="info-box gold" style={{ marginBottom: '1.5rem' }}>
        <strong>📌 Objetivo del Sistema:</strong> Centralizar el seguimiento de leads y ventas desde HubSpot,
        permitiendo análisis por vendedor, canal, destino y escuela con filtros dinámicos en tiempo real.
      </div>

      <div className={styles.grid2}>
        <div className="card">
          <div className="section-title">🗄️ Fuente de Datos</div>
          <table className="vm-table">
            <tbody>
              <tr><td><strong>CRM</strong></td><td>HubSpot</td></tr>
              <tr><td><strong>Extracción</strong></td><td>Export CSV / API HubSpot</td></tr>
              <tr><td><strong>Formato</strong></td><td>Array tipado TypeScript</td></tr>
              <tr><td><strong>Archivo</strong></td><td><code>/data/contacts.ts</code></td></tr>
              <tr><td><strong>Tipo</strong></td><td><code>Contact[]</code></td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="section-title">⚙️ Stack Tecnológico</div>
          <table className="vm-table">
            <tbody>
              <tr><td><strong>Framework</strong></td><td>Next.js 14 (App Router)</td></tr>
              <tr><td><strong>Lenguaje</strong></td><td>TypeScript + TSX</td></tr>
              <tr><td><strong>Gráficos</strong></td><td>Chart.js + react-chartjs-2</td></tr>
              <tr><td><strong>Estilos</strong></td><td>CSS Modules + Variables CSS</td></tr>
              <tr><td><strong>Deploy</strong></td><td>Vercel / Node.js</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">📁 Estructura de Archivos</div>
        <div className={styles.fileTree}>
          <div className={styles.treeItem} data-level="0">📦 tablero-vm/</div>
          <div className={styles.treeItem} data-level="1">📂 app/</div>
          <div className={styles.treeItem} data-level="2">📄 layout.tsx <span className={styles.treeNote}>— Root layout + metadata</span></div>
          <div className={styles.treeItem} data-level="2">📄 page.tsx <span className={styles.treeNote}>— Página principal con tabs</span></div>
          <div className={styles.treeItem} data-level="2">📄 globals.css <span className={styles.treeNote}>— Variables CSS y estilos globales</span></div>
          <div className={styles.treeItem} data-level="1">📂 components/</div>
          <div className={styles.treeItem} data-level="2">📄 Nav.tsx <span className={styles.treeNote}>— Barra de navegación lateral</span></div>
          <div className={styles.treeItem} data-level="2">📂 tabs/ <span className={styles.treeNote}>— Una por cada sección del dashboard</span></div>
          <div className={styles.treeItem} data-level="3">📄 Arquitectura.tsx, Flujo.tsx, Areas.tsx…</div>
          <div className={styles.treeItem} data-level="3">📄 Preview.tsx <span className={styles.treeNote}>— Vista beta con filtros y KPIs</span></div>
          <div className={styles.treeItem} data-level="3">📄 Admin.tsx <span className={styles.treeNote}>— Panel de administración</span></div>
          <div className={styles.treeItem} data-level="1">📂 data/</div>
          <div className={styles.treeItem} data-level="2">📄 contacts.ts <span className={styles.treeNote}>— Array tipado de contactos HubSpot</span></div>
          <div className={styles.treeItem} data-level="1">📂 lib/</div>
          <div className={styles.treeItem} data-level="2">📄 dataUtils.ts <span className={styles.treeNote}>— KPIs, filtros, agrupaciones</span></div>
          <div className={styles.treeItem} data-level="1">📂 types/</div>
          <div className={styles.treeItem} data-level="2">📄 index.ts <span className={styles.treeNote}>— Contact, SaleRecord, TabId…</span></div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="section-title">🔄 Flujo de Datos</div>
        <div className={styles.flowDiagram}>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>🏢</div>
            <div className={styles.flowLabel}>HubSpot CRM</div>
            <div className={styles.flowSub}>Fuente de verdad</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>📥</div>
            <div className={styles.flowLabel}>Export / API</div>
            <div className={styles.flowSub}>contacts.ts</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>⚙️</div>
            <div className={styles.flowLabel}>dataUtils.ts</div>
            <div className={styles.flowSub}>Normalización</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>📊</div>
            <div className={styles.flowLabel}>Componentes</div>
            <div className={styles.flowSub}>KPIs + Gráficos</div>
          </div>
          <div className={styles.flowArrow}>→</div>
          <div className={styles.flowStep}>
            <div className={styles.flowIcon}>👤</div>
            <div className={styles.flowLabel}>Usuario Final</div>
            <div className={styles.flowSub}>Filtros + Análisis</div>
          </div>
        </div>
      </div>
    </div>
  );
}
