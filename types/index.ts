// ─── Contact / Lead (campos completos de HubSpot) ───────────────────────────
export interface Contact {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string | null;
  propietarioContacto: string; // vendedor / owner
  ultimaActividad: string | null; // "YYYY-MM-DD HH:mm"
  estadoLead: string;
  fechaCreacion: string; // "YYYY-MM-DD HH:mm"
  mesVenta: string | null;        // texto en español: "Febrero 2026"
  tipoCanalCustomer: string | null;
  canalAdquisicion: string;
  tipoPaidSocial: string | null;
  tipoCanalOffline: string | null;
  moderacionCustomer: string | null;
  nacionalidad: string;
  destinoVM: string;
  mesInicioClases: string | null; // texto en español: "Julio 2026"
  fechaComienzoCurso: string | null; // "DD/MM/YY"
  servicioContratadoPrimario: string | null; // escuela / producto
  conversionMasReciente: string | null;
  primeraConversion: string | null;
  campaniaPautaWS: string | null;
  mesCampaniaPublicitaria: string | null;
  genero: string | null;
  numberOfWeeks: string | null;   // HubSpot lo exporta como string ("25")
  universidadEscuela: string | null;
  mesWebinar: string | null;
  tipoReferido: string | null;
  codigoPromocional: string | null;
  mesCustomer: string | null;
  timetable: string | null;
  edad: number | string | null;   // HubSpot puede exportar como "21.0" (string) o número
  serviciosComplementarios: string | null;
  mesVentaRenovacion: string | null;
  // campos derivados del array original (para retrocompatibilidad)
  ticket: number | string | null;  // HubSpot exporta como "2790.0" (string) o null
  fechaCierre: string | null;     // casi siempre null en la exportación real de HubSpot
}

// ─── Versión normalizada para los gráficos ──────────────────────────────────
export interface SaleRecord {
  vendedor: string;
  cliente: string;
  escuela: string;
  destino: string;
  nac: string;
  canal: string;       // normalizado (Pauta, Referidos, etc.)
  canalRaw: string;    // valor original de HubSpot
  mesVentaRaw: string | null; // texto original "Febrero 2026", para cruzar con leadsTotals
  ticket: number;
  fecha: Date;         // fecha resuelta (ver resolveFecha en dataUtils.ts)
  fechaSource: 'fechaCierre' | 'mesVenta' | 'fechaCreacion' | 'desconocida';
  // nuevos campos disponibles
  estadoLead: string;
  campaniaPauta: string | null;
  servicioPrimario: string;
  nacionalidad: string;
  genero: string | null;
  edad: number | null;
  numberOfWeeks: number | null;
  mesInicioClases: string | null;
  tipoReferido: string | null;
  codigoPromocional: string | null;
}

// ─── Tipos de navegación ─────────────────────────────────────────────────────
export type TabId =
  | 'arquitectura'
  | 'flujo'
  | 'areas'
  | 'paneles'
  | 'campos'
  | 'acceso'
  | 'preguntas'
  | 'preview'
  | 'conversion'
  | 'admin';

export interface NavTab {
  id: TabId;
  label: string;
  accent?: string;
}

// ─── Totales de leads por canal y mes (carga manual desde reporte HubSpot) ───
export interface LeadsTotal {
  mes: string;       // "Febrero 2026" — mismo formato texto que usa mesVenta en Contact
  canal: string;     // debe coincidir con el canal normalizado: Pauta, Referidos, Orgánico, Offline, Propio, Webinar, WhatsApp, Otros
  leadsAsignados: number; // total de leads que entraron por ese canal en ese mes (de HubSpot)
}

// ─── Leads de Pauta Publicitaria asignados por asesor y mes (carga manual) ──
export interface LeadsPautaAsesor {
  mes: string;       // "Febrero 2026" — mismo formato texto que mesVenta en Contact
  vendedor: string;  // debe coincidir exacto con propietarioContacto / SaleRecord.vendedor
  leadsPauta: number; // leads del canal Pauta asignados a este asesor en ese mes
}
