import styles from './Tab.module.css';

const FAQS = [
  {
    cat: '📊 Datos', color: '#3498db',
    items: [
      {
        q: '¿Cómo se actualiza el tablero con datos nuevos de HubSpot?',
        a: 'Por ahora el proceso es manual: exportar los contactos desde HubSpot, copiar los registros al array en /data/contacts.ts siguiendo la estructura del tipo Contact, y redesplegar la aplicación. En la próxima versión se conectará directamente vía API de HubSpot para actualización automática.',
      },
      {
        q: '¿Qué pasa si un campo de HubSpot viene vacío o nulo?',
        a: 'Los campos opcionales están tipados como "string | null" o "number | null". Los gráficos y KPIs filtran automáticamente los valores nulos. Los campos requeridos (nombre, vendedor, fechaCierre) siempre deben tener valor.',
      },
      {
        q: '¿Puedo agregar nuevos campos de HubSpot al tablero?',
        a: 'Sí. El proceso es: (1) agregar el campo al tipo Contact en /types/index.ts, (2) mapear el campo en la interfaz SaleRecord si se va a usar en gráficos, (3) actualizar la función toSaleRecord() en /lib/dataUtils.ts, (4) actualizar el array contacts.ts con los nuevos datos.',
      },
    ],
  },
  {
    cat: '📈 Gráficos y KPIs', color: '#9b59b6',
    items: [
      {
        q: '¿Cómo funciona el sistema de filtros?',
        a: 'Los filtros (año, vendedor, canal, destino, escuela, nacionalidad) se aplican en cascada sobre el array salesData. Cada cambio de filtro re-calcula automáticamente todos los KPIs y actualiza todos los gráficos del período seleccionado.',
      },
      {
        q: '¿Por qué el ticket promedio puede ser $0?',
        a: 'Algunos registros tienen ticket = 0 cuando la venta aún no tiene valor de deal cargado en HubSpot, o cuando es un registro de prueba. Para análisis de revenue, es recomendable filtrar tickets > 0.',
      },
    ],
  },
  {
    cat: '🔐 Acceso y Roles', color: '#22c55e',
    items: [
      {
        q: '¿Cómo se implementa la autenticación por rol?',
        a: 'La versión actual (beta) no tiene autenticación. En la implementación final se integrará con NextAuth.js + Google OAuth, con roles asignados en la base de datos. Cada rol verá únicamente los paneles y datos que le corresponden según la matriz de acceso.',
      },
      {
        q: '¿Puede un vendedor ver los datos de otro vendedor?',
        a: 'No. Con el sistema de roles implementado, un vendedor con rol "Vendedor" solo puede acceder a registros donde propietarioContacto coincide con su usuario. El filtrado se aplica en el servidor antes de enviar los datos al cliente.',
      },
    ],
  },
  {
    cat: '⚙️ Técnico', color: '#e67e22',
    items: [
      {
        q: '¿Cómo se agrega un nuevo vendedor al sistema?',
        a: 'Desde el Panel de Administración (en desarrollo): agregar el nombre exactamente como aparece en propietarioContacto en HubSpot, asignar un color de identificación y su rol. Automáticamente aparecerá en rankings y filtros.',
      },
      {
        q: '¿El tablero funciona en mobile?',
        a: 'Sí, el diseño es responsive. En pantallas pequeñas la navegación lateral se convierte en barra horizontal scrolleable y los grids de gráficos se adaptan a una columna.',
      },
      {
        q: '¿Puedo exportar los datos o gráficos?',
        a: 'Esta funcionalidad está en el roadmap. Se planea agregar exportación a CSV de la tabla de contactos filtrada y exportación a PNG de los gráficos (usando Chart.js download API).',
      },
    ],
  },
];

export default function Preguntas() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>❓ Preguntas Frecuentes</h2>
      <p className={styles.pageSubtitle}>Respuestas a las consultas más comunes sobre el Tablero VM</p>

      {FAQS.map(section => (
        <div key={section.cat} className="card" style={{ marginBottom: '1.25rem', borderTop: `3px solid ${section.color}` }}>
          <div className="section-title" style={{ borderLeftColor: section.color }}>{section.cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem', marginTop: '.5rem' }}>
            {section.items.map(faq => (
              <div key={faq.q} style={{
                background: '#f8faff', borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.1rem', borderLeft: `3px solid ${section.color}33`,
              }}>
                <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '.4rem', fontSize: '.9rem' }}>
                  🔹 {faq.q}
                </div>
                <div style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="info-box green">
        <strong>📬 ¿Tenés otra pregunta?</strong> Contactá al equipo de administración del sistema o
        revisá la documentación técnica en el archivo <code>README.md</code> del proyecto.
      </div>
    </div>
  );
}
