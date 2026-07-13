import type { Contact, SaleRecord, LeadsTotal, LeadsPautaAsesor } from '@/types';
import { contacts as allContacts } from '@/data/contacts';
import { leadsTotals } from '@/data/leadsTotals';
import { leadsPorAsesor } from '@/data/leadsPorAsesor';

// ─── Parsing de fechas en español (formato HubSpot) ──────────────────────────
const MESES_ES: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};

/** Convierte "Febrero 2026" → Date(2026, 1, 1). Devuelve null si no matchea. */
export function parseMesAnio(value: string | null): Date | null {
  if (!value) return null;
  const match = value.trim().toLowerCase().match(/^([a-záéíóú]+)\s+(\d{4})$/i);
  if (!match) return null;
  const mes = MESES_ES[match[1]];
  const anio = parseInt(match[2], 10);
  if (mes === undefined || isNaN(anio)) return null;
  return new Date(anio, mes, 1);
}

/** Convierte "YYYY-MM-DD HH:mm" o "YYYY-MM-DD" → Date. Devuelve null si es inválida. */
export function parseFechaHora(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value.replace(' ', 'T'));
  return isNaN(d.getTime()) ? null : d;
}

/** Convierte "DD/MM/YY" → Date. Devuelve null si es inválida. */
export function parseFechaDDMMYY(value: string | null): Date | null {
  if (!value) return null;
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return null;
  const [, dd, mm, yy] = match;
  const year = yy.length === 2 ? 2000 + parseInt(yy, 10) : parseInt(yy, 10);
  const d = new Date(year, parseInt(mm, 10) - 1, parseInt(dd, 10));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Resuelve la "fecha de venta" de un contacto probando, en orden:
 * 1. fechaCierre (si HubSpot llega a tenerla cargada)
 * 2. mesVenta ("Febrero 2026" → primer día del mes)
 * 3. fechaCreacion (fallback, evita el bug de año 1969 con new Date(null))
 * Nunca devuelve epoch — si todo falla, usa la fecha actual como último recurso
 * pero queda marcado en fechaSource = 'desconocida' para poder filtrarlo.
 */
export function resolveFecha(c: Contact): { fecha: Date; source: SaleRecord['fechaSource'] } {
  const cierre = parseFechaHora(c.fechaCierre);
  if (cierre) return { fecha: cierre, source: 'fechaCierre' };

  const venta = parseMesAnio(c.mesVenta);
  if (venta) return { fecha: venta, source: 'mesVenta' };

  const creacion = parseFechaHora(c.fechaCreacion);
  if (creacion) return { fecha: creacion, source: 'fechaCreacion' };

  return { fecha: new Date(), source: 'desconocida' };
}

// ─── Normalización de canal ──────────────────────────────────────────────────
export function normalizeCanal(c: Contact): string {
  const raw = (c.canalAdquisicion || '').toLowerCase();
  if (raw.includes('referid')) return 'Referidos';
  if (raw.includes('embajador')) return 'Embajadores';
  if (raw.includes('paid') || raw.includes('pauta') || raw.includes('meta')) return 'Pauta';
  if (raw.includes('organic') || raw.includes('organico')) return 'Orgánico';
  if (raw.includes('offline') || raw.includes('evento')) return 'Offline';
  if (raw.includes('propio') || raw.includes('inbound')) return 'Propio';
  if (raw.includes('webinar')) return 'Webinar';
  if (raw.includes('whatsapp') || raw.includes('ws')) return 'WhatsApp';
  return c.canalAdquisicion || 'Otros';
}

// ─── Contact → SaleRecord ────────────────────────────────────────────────────
export function toSaleRecord(c: Contact): SaleRecord {
  const { fecha, source } = resolveFecha(c);

  const rawTicket = c.ticket;
  const ticket = rawTicket === null || rawTicket === undefined
    ? 0
    : typeof rawTicket === 'string'
      ? parseFloat(rawTicket) || 0
      : rawTicket;

  const weeks = c.numberOfWeeks ? parseInt(c.numberOfWeeks, 10) : null;
  const edadRaw = c.edad;
  const edad = edadRaw === null || edadRaw === undefined
    ? null
    : typeof edadRaw === 'string'
      ? parseFloat(edadRaw) || null
      : edadRaw;

  return {
    vendedor: c.propietarioContacto,
    cliente: `${c.nombre} ${c.apellidos}`.trim(),
    escuela: c.universidadEscuela ?? 'Sin escuela',
    destino: c.destinoVM,
    nac: c.nacionalidad,
    canal: normalizeCanal(c),
    canalRaw: c.canalAdquisicion,
    mesVentaRaw: c.mesVenta,
    ticket,
    fecha,
    fechaSource: source,
    estadoLead: c.estadoLead,
    campaniaPauta: c.campaniaPautaWS,
    servicioPrimario: c.servicioContratadoPrimario ?? 'Sin servicio',
    nacionalidad: c.nacionalidad,
    genero: c.genero,
    edad,
    numberOfWeeks: weeks !== null && !isNaN(weeks) ? weeks : null,
    mesInicioClases: c.mesInicioClases,
    tipoReferido: c.tipoReferido,
    codigoPromocional: c.codigoPromocional,
  };
}

export const salesData: SaleRecord[] = allContacts.map(toSaleRecord);

// ─── Helpers de agrupación ────────────────────────────────────────────────────
export function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = key(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function sumBy<T>(arr: T[], key: (item: T) => number): number {
  return arr.reduce((s, item) => s + key(item), 0);
}

export function countBy<T>(arr: T[], key: (item: T) => string): Record<string, number> {
  const groups = groupBy(arr, key);
  return Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length]));
}

// ─── KPIs globales ────────────────────────────────────────────────────────────
export interface KPIs {
  totalVentas: number;
  totalRevenue: number;
  ticketPromedio: number;
  conversionRate: number;
  topVendedor: string;
  topCanal: string;
  topDestino: string;
  topEscuela: string;
}

export function calcKPIs(data: SaleRecord[]): KPIs {
  const totalVentas = data.length;
  const totalRevenue = sumBy(data, r => r.ticket);
  const ticketPromedio = totalVentas ? Math.round(totalRevenue / totalVentas) : 0;

  const byVendedor = countBy(data, r => r.vendedor);
  const byCanal = countBy(data, r => r.canal);
  const byDestino = countBy(data, r => r.destino);
  const byEscuela = countBy(data, r => r.escuela);

  const topOf = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return {
    totalVentas,
    totalRevenue,
    ticketPromedio,
    conversionRate: 100, // placeholder hasta tener leads totales
    topVendedor: topOf(byVendedor),
    topCanal: topOf(byCanal),
    topDestino: topOf(byDestino),
    topEscuela: topOf(byEscuela),
  };
}

// ─── Serie mensual ────────────────────────────────────────────────────────────
export interface MonthlySerie {
  label: string;      // "Ene 2024"
  ventas: number;
  revenue: number;
}

export function getMonthlySeries(data: SaleRecord[]): MonthlySerie[] {
  const map: Record<string, { ventas: number; revenue: number }> = {};
  data.forEach(r => {
    const d = r.fecha;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map[key]) map[key] = { ventas: 0, revenue: 0 };
    map[key].ventas += 1;
    map[key].revenue += r.ticket;
  });
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const [y, m] = key.split('-');
      return { label: `${months[parseInt(m) - 1]} ${y}`, ...val };
    });
}

// ─── Disponibles para filtros ─────────────────────────────────────────────────
export function getUniqueValues(data: SaleRecord[], key: keyof SaleRecord): string[] {
  return Array.from(new Set(data.map(r => String(r[key] ?? '')).filter(Boolean))).sort();
}

export function getYears(data: SaleRecord[]): number[] {
  const currentYear = new Date().getFullYear();
  const minYear = 2020;
  const maxYear = currentYear + 2;
  const years = data
    .map(r => r.fecha.getFullYear())
    .filter(y => y >= minYear && y <= maxYear);
  return Array.from(new Set(years)).sort();
}

/** Meses únicos de venta en orden cronológico real (no alfabético). */
export function getMesesVenta(data: SaleRecord[]): string[] {
  const ORDEN_MES: Record<string, number> = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
  };
  const meses = Array.from(
    new Set(data.map(r => r.mesVentaRaw).filter((m): m is string => Boolean(m)))
  );
  return meses.sort((a, b) => {
    const [mesA, anioA] = a.toLowerCase().split(' ');
    const [mesB, anioB] = b.toLowerCase().split(' ');
    const yearDiff = parseInt(anioA) - parseInt(anioB);
    if (yearDiff !== 0) return yearDiff;
    return (ORDEN_MES[mesA] ?? 0) - (ORDEN_MES[mesB] ?? 0);
  });
}

export function filterData(
  data: SaleRecord[],
  filters: {
    year?: string;
    mes?: string;
    vendedor?: string;
    canal?: string;
    destino?: string;
    escuela?: string;
    nacionalidad?: string;
  }
): SaleRecord[] {
  return data.filter(r => {
    if (filters.year && filters.year !== 'Todos' && r.fecha.getFullYear().toString() !== filters.year) return false;
    if (filters.mes && filters.mes !== 'Todos' && r.mesVentaRaw !== filters.mes) return false;
    if (filters.vendedor && filters.vendedor !== 'Todos' && r.vendedor !== filters.vendedor) return false;
    if (filters.canal && filters.canal !== 'Todos' && r.canal !== filters.canal) return false;
    if (filters.destino && filters.destino !== 'Todos' && r.destino !== filters.destino) return false;
    if (filters.escuela && filters.escuela !== 'Todos' && r.escuela !== filters.escuela) return false;
    if (filters.nacionalidad && filters.nacionalidad !== 'Todos' && r.nacionalidad !== filters.nacionalidad) return false;
    return true;
  });
}

// ─── Conversión general y por canal (cruce con leadsTotals.ts) ──────────────
export interface ConversionRow {
  mes: string;          // "Febrero 2026"
  canal: string;
  leadsAsignados: number;
  ventas: number;
  conversion: number;   // 0-100, redondeado a 1 decimal
  sinDatos: boolean;    // true si no hay leadsTotals cargado para esta fila
}

/**
 * Cuenta ventas (SaleRecord) agrupadas por mesVentaRaw + canal.
 * Usamos mesVentaRaw (texto original) en vez de la fecha resuelta para
 * garantizar el cruce exacto con leadsTotals, sin importar de dónde
 * haya salido la fecha resuelta (fechaCierre / mesVenta / fechaCreacion).
 */
function ventasPorMesYCanal(data: SaleRecord[]): Record<string, number> {
  const map: Record<string, number> = {};
  data.forEach(r => {
    if (!r.mesVentaRaw) return; // sin mesVenta no podemos cruzar con precisión
    const key = `${r.mesVentaRaw}|||${r.canal}`;
    map[key] = (map[key] ?? 0) + 1;
  });
  return map;
}

/**
 * Tabla de conversión por canal y mes, cruzando ventas reales contra
 * los totales de leads cargados manualmente en leadsTotals.ts.
 * Si un mes/canal no tiene leadsTotals cargado, se marca sinDatos = true
 * en vez de inventar un denominador o dividir por cero.
 */
export function getConversionByChannel(
  data: SaleRecord[] = salesData,
  totals: LeadsTotal[] = leadsTotals
): ConversionRow[] {
  const ventasMap = ventasPorMesYCanal(data);

  // Empezamos por cada fila cargada en leadsTotals (es la fuente de verdad del denominador)
  const rows: ConversionRow[] = totals.map(t => {
    const key = `${t.mes}|||${t.canal}`;
    const ventas = ventasMap[key] ?? 0;
    const conversion = t.leadsAsignados > 0
      ? Math.round((ventas / t.leadsAsignados) * 1000) / 10
      : 0;
    return {
      mes: t.mes,
      canal: t.canal,
      leadsAsignados: t.leadsAsignados,
      ventas,
      conversion,
      sinDatos: false,
    };
  });

  // Agregamos también combinaciones mes+canal que SÍ tienen ventas pero
  // no tienen leadsTotals cargado, para que se vean como "Sin datos" y
  // no queden ocultas silenciosamente.
  Object.entries(ventasMap).forEach(([key, ventas]) => {
    const [mes, canal] = key.split('|||');
    const yaExiste = totals.some(t => t.mes === mes && t.canal === canal);
    if (!yaExiste) {
      rows.push({ mes, canal, leadsAsignados: 0, ventas, conversion: 0, sinDatos: true });
    }
  });

  return rows.sort((a, b) => a.mes.localeCompare(b.mes) || a.canal.localeCompare(b.canal));
}

export interface ConversionSummary {
  totalLeadsAsignados: number;
  totalVentas: number;
  conversionGeneral: number; // ventas totales / leads asignados totales (todos los canales cargados)
  pautaLeadsAsignados: number;
  pautaVentas: number;
  conversionPauta: number;   // ventas de pauta / leads de pauta
  tieneDatos: boolean;       // false si leadsTotals.ts está vacío todavía
}

/** Resumen ejecutivo: conversión general + conversión específica de Pauta. */
export function getConversionSummary(
  data: SaleRecord[] = salesData,
  totals: LeadsTotal[] = leadsTotals
): ConversionSummary {
  if (totals.length === 0) {
    return {
      totalLeadsAsignados: 0, totalVentas: 0, conversionGeneral: 0,
      pautaLeadsAsignados: 0, pautaVentas: 0, conversionPauta: 0,
      tieneDatos: false,
    };
  }

  const rows = getConversionByChannel(data, totals).filter(r => !r.sinDatos);

  const totalLeadsAsignados = sumBy(rows, r => r.leadsAsignados);
  const totalVentas = sumBy(rows, r => r.ventas);
  const conversionGeneral = totalLeadsAsignados > 0
    ? Math.round((totalVentas / totalLeadsAsignados) * 1000) / 10
    : 0;

  const pautaRows = rows.filter(r => r.canal === 'Pauta');
  const pautaLeadsAsignados = sumBy(pautaRows, r => r.leadsAsignados);
  const pautaVentas = sumBy(pautaRows, r => r.ventas);
  const conversionPauta = pautaLeadsAsignados > 0
    ? Math.round((pautaVentas / pautaLeadsAsignados) * 1000) / 10
    : 0;

  return {
    totalLeadsAsignados, totalVentas, conversionGeneral,
    pautaLeadsAsignados, pautaVentas, conversionPauta,
    tieneDatos: true,
  };
}

/** Lista de meses únicos presentes en leadsTotals, para poblar un selector. */
export function getLeadsTotalsMeses(totals: LeadsTotal[] = leadsTotals): string[] {
  return Array.from(new Set(totals.map(t => t.mes)));
}

// ─── Conversión de Pauta por asesor (cruce con leadsPorAsesor.ts) ────────────
export interface ConversionAsesorRow {
  vendedor: string;
  leadsPauta: number;   // suma de todos los meses cargados para ese asesor
  ventasPauta: number;  // ventas de canal Pauta de ese asesor (todos los meses con dato cargado)
  conversion: number;   // 0-100, redondeado a 1 decimal
  sinDatos: boolean;    // true si el asesor no tiene ningún mes cargado en leadsPorAsesor.ts
}

/**
 * Cuenta ventas de canal Pauta agrupadas por vendedor + mesVentaRaw.
 * Igual lógica que ventasPorMesYCanal, pero clave vendedor+mes en vez de canal+mes.
 */
function ventasPautaPorAsesorYMes(data: SaleRecord[]): Record<string, number> {
  const map: Record<string, number> = {};
  data.forEach(r => {
    if (r.canal !== 'Pauta') return;
    if (!r.mesVentaRaw) return;
    const key = `${r.vendedor}|||${r.mesVentaRaw}`;
    map[key] = (map[key] ?? 0) + 1;
  });
  return map;
}

/**
 * Conversión de Pauta por asesor, cruzando ventas reales (canal Pauta) contra
 * los leads de Pauta asignados a cada asesor cargados en leadsPorAsesor.ts.
 * Se agrega por asesor (suma todos los meses cargados) para mostrar como
 * tarjeta única por vendedor en la Vista Previa Beta.
 */
export function getConversionPautaPorAsesor(
  data: SaleRecord[] = salesData,
  asignaciones: LeadsPautaAsesor[] = leadsPorAsesor
): ConversionAsesorRow[] {
  const ventasMap = ventasPautaPorAsesorYMes(data);

  // Agrupamos leadsPorAsesor por vendedor, sumando todos los meses cargados
  const leadsPorVendedor: Record<string, number> = {};
  asignaciones.forEach(a => {
    leadsPorVendedor[a.vendedor] = (leadsPorVendedor[a.vendedor] ?? 0) + a.leadsPauta;
  });

  // Para cada vendedor con datos cargados, sumamos solo las ventas de los
  // meses que tienen leadsPauta cargado (evita mezclar meses sin denominador)
  const mesesPorVendedor: Record<string, Set<string>> = {};
  asignaciones.forEach(a => {
    if (!mesesPorVendedor[a.vendedor]) mesesPorVendedor[a.vendedor] = new Set();
    mesesPorVendedor[a.vendedor].add(a.mes);
  });

  const vendedoresConDatos = Object.keys(leadsPorVendedor);

  const rows: ConversionAsesorRow[] = vendedoresConDatos.map(vendedor => {
    const meses = mesesPorVendedor[vendedor];
    let ventasPauta = 0;
    meses.forEach(mes => {
      const key = `${vendedor}|||${mes}`;
      ventasPauta += ventasMap[key] ?? 0;
    });
    const leadsPauta = leadsPorVendedor[vendedor];
    const conversion = leadsPauta > 0
      ? Math.round((ventasPauta / leadsPauta) * 1000) / 10
      : 0;
    return { vendedor, leadsPauta, ventasPauta, conversion, sinDatos: false };
  });

  return rows.sort((a, b) => b.conversion - a.conversion);
}
