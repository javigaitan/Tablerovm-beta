import styles from './Tab.module.css';

const PANELES = [
  {
    icon: '📈', title: 'Panel General — KPIs',
    color: '#1e3a5f',
    items: [
      'Total de ventas cerradas del período seleccionado',
      'Revenue total y ticket promedio por venta',
      'Tasa de conversión lead → customer',
      'Top vendedor, canal y destino del período',
      'Evolución mensual de ventas y revenue (gráfico de barras)',
    ],
  },
  {
    icon: '👤', title: 'Panel de Vendedores',
    color: '#3498db',
    items: [
      'Ranking de ventas por propietario de contacto',
      'Revenue generado por cada vendedor',
      'Ticket promedio por vendedor',
      'Distribución de canales por vendedor (gráfico de dona)',
      'Comparativa mes a mes entre vendedores',
    ],
  },
  {
    icon: '📣', title: 'Panel de Canales',
    color: '#9b59b6',
    items: [
      'Distribución de ventas por canal de adquisición',
      'Comparativa Pauta vs Referidos vs Orgánico',
      'Desglose de Paid Social: Meta AR, Meta CHI, Google',
      'Performance de canal por mes y por vendedor',
      'Canal con mayor ticket promedio',
    ],
  },
  {
    icon: '🌍', title: 'Panel de Destinos',
    color: '#22c55e',
    items: [
      'Distribución de alumnos por destino (Irlanda, Malta, Alemania, España…)',
      'Revenue por destino de viaje',
      'Número de semanas promedio por destino',
      'Escuelas más populares por destino',
      'Destino vs Nacionalidad del alumno',
    ],
  },
  {
    icon: '🎓', title: 'Panel de Escuelas',
    color: '#e67e22',
    items: [
      'Ranking de escuelas por cantidad de alumnos',
      'Revenue por escuela contratada',
      'Distribución de escuelas por país de destino',
      'Comparativa de ticket promedio entre escuelas',
      'Escuelas con mayor crecimiento interanual',
    ],
  },
  {
    icon: '🌎', title: 'Panel de Nacionalidades',
    color: '#e74c3c',
    items: [
      'Distribución de ventas por nacionalidad del alumno',
      'Revenue por país de origen',
      'Evolución temporal por mercado (AR, MX, CHI, UY…)',
      'Nationalidad vs Canal de adquisición',
      'Penetración de mercado por vendedor',
    ],
  },
  {
    icon: '📅', title: 'Panel Temporal',
    color: '#c8a96e',
    items: [
      'Ventas por mes de venta vs mes de inicio de clases',
      'Lead time entre venta y comienzo del curso',
      'Tendencia anual de revenue (2024 vs 2025 vs 2026)',
      'Estacionalidad: meses pico de venta',
      'Mes de campaña publicitaria vs mes de venta',
    ],
  },
  {
    icon: '🔄', title: 'Panel de Renovaciones',
    color: '#2ecc71',
    items: [
      'Ventas de renovación por mes',
      'Tasa de renovación sobre base de clientes',
      'Revenue de renovaciones vs ventas nuevas',
      'Distribución de renovaciones por vendedor',
      'Destinos más frecuentes en renovaciones',
    ],
  },
];

export default function Paneles() {
  return (
    <div className={styles.container + ' fade-in'}>
      <h2 className={styles.pageTitle}>📊 Paneles del Dashboard</h2>
      <p className={styles.pageSubtitle}>Descripción de cada módulo de análisis disponible en el tablero</p>

      <div className="info-box gold" style={{ marginBottom: '1.5rem' }}>
        <strong>💡 Organización:</strong> Cada panel se puede acceder desde la barra de filtros en la Vista Previa Beta.
        Los filtros globales (año, vendedor, canal, destino) aplican a todos los paneles simultáneamente.
      </div>

      <div className={styles.grid2}>
        {PANELES.map(panel => (
          <div key={panel.title} className={styles.panelCard} style={{ borderTopColor: panel.color }}>
            <div className={styles.panelCardTitle} style={{ color: panel.color }}>
              {panel.icon} {panel.title}
            </div>
            <ul className={styles.panelCardList}>
              {panel.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
