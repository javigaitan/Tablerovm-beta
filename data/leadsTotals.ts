import type { LeadsTotal } from '@/types';

/**
 * leadsTotals.ts — Totales de leads asignados por canal y mes
 *
 * ¿Por qué este archivo separado?
 * El array de contacts.ts solo tiene los leads que terminaron en venta
 * ("Venta ganada"). Para calcular conversión necesitamos el DENOMINADOR:
 * cuántos leads totales entraron por cada canal en cada mes, sin importar
 * si se vendieron o no. Cargar esa base completa en contacts.ts implicaría
 * miles de registros adicionales solo para contar — así que en su lugar
 * cargamos acá el número ya agregado, tal como lo entrega un reporte
 * de HubSpot (Contacts → filtrar por canal y mes → ver el total).
 *
 * CÓMO COMPLETAR ESTE ARCHIVO:
 *  1. En HubSpot, generá un reporte de "Leads creados" agrupado por
 *     "Canal de Adquisición" y por mes.
 *  2. Por cada combinación canal + mes, agregá una fila acá con el total.
 *  3. El campo "mes" debe escribirse igual que mesVenta en contacts.ts:
 *     "Nombre del mes en español" + espacio + "Año" (ej: "Febrero 2026").
 *  4. El campo "canal" debe ser uno de los valores normalizados que usa
 *     el dashboard: Pauta, Referidos, Orgánico, Offline, Propio, Webinar,
 *     WhatsApp, Embajadores, Otros. (Ver normalizeCanal en /lib/dataUtils.ts)
 *  5. No hace falta cargar TODOS los meses de una — el dashboard solo
 *     calculará conversión para los meses/canales que tengan datos acá.
 *     Los que falten se muestran como "Sin datos de leads" en el panel.
 *
 * Este archivo se puede actualizar en cualquier momento, sin frecuencia fija,
 * cada vez que se pida un reporte nuevo a HubSpot.
 */

export const leadsTotals: LeadsTotal[] = [
  // ── Ejemplo de carga — reemplazar con los números reales de HubSpot ──────
  { mes: 'Enero 2026', canal: 'Pauta',     leadsAsignados: 902 },
  { mes: 'Enero 2026', canal: 'Referidos',     leadsAsignados: 10 },
  { mes: 'Enero 2026', canal: 'Offline',     leadsAsignados: 0 },
  { mes: 'Enero 2026', canal: 'Propios',     leadsAsignados: 1 },
  { mes: 'Enero 2026', canal: 'Embajadores',     leadsAsignados: 2 },
  { mes: 'Enero 2026', canal: 'Orgánico',     leadsAsignados: 53 },
  { mes: 'Enero 2026', canal: 'Web',     leadsAsignados: 21 },

   {mes: 'Febrero 2026', canal: 'Pauta',     leadsAsignados: 269 },
  { mes: 'Febrero 2026', canal: 'Referidos',     leadsAsignados: 17 },
  { mes: 'Febrero 2026', canal: 'Offline',     leadsAsignados: 1 }, 
  { mes: 'Febrero 2026', canal: 'Propios',     leadsAsignados: 4 },
  { mes: 'Febrero 2026', canal: 'Embajadores',     leadsAsignados: 0 },
  { mes: 'Febrero 2026', canal: 'Orgánico',     leadsAsignados: 18 },
  { mes: 'Febrero 2026', canal: 'Web',     leadsAsignados: 14 },


  // { mes: 'Febrero 2026', canal: 'Referidos', leadsAsignados: 45  },
  // { mes: 'Febrero 2026', canal: 'Offline',   leadsAsignados: 60  },
  // { mes: 'Marzo 2026',   canal: 'Pauta',     leadsAsignados: 210 },
];

export default leadsTotals;
