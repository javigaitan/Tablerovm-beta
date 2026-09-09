import type { LeadsPautaAsesor } from '@/types';

/**
 * leadsPorAsesor.ts — Leads de Pauta Publicitaria asignados a cada asesor, por mes
 *
 * ¿Por qué este archivo separado?
 * Igual que leadsTotals.ts, pero acá el denominador es por ASESOR en vez de
 * por canal general. Sirve para calcular, dentro de la Vista Previa Beta,
 * qué porcentaje de los leads de Pauta que le asignaron a cada vendedor
 * terminaron en venta — es decir, la efectividad individual de cada asesor
 * specíficamente con leads pagos.
 *
 * CÓMO COMPLETAR ESTE ARCHIVO:
 *  1. En HubSpot, generá un reporte de "Leads creados" filtrado por
 *     Canal de Adquisición = Pauta Publicitaria, agrupado por
 *     "Propietario del contacto" y por mes.
 *  2. Por cada combinación asesor + mes, agregá una fila acá con el total
 *     de leads de Pauta que le asignaron a ese asesor en ese mes.
 *  3. El campo "mes" debe escribirse igual que mesVenta en contacts.ts:
 *     "Nombre del mes en español" + espacio + "Año" (ej: "Febrero 2026").
 *  4. El campo "vendedor" debe ser EXACTAMENTE igual al valor de
 *     propietarioContacto que usás en contacts.ts (mismo nombre, mismas
 *     mayúsculas/minúsculas) para que el cruce funcione.
 *  5. No hace falta cargar todos los meses de una — el dashboard solo
 *     calcula conversión de Pauta por asesor para los meses que tengan
 *     datos acá. El resto se muestra sin ese dato, sin romper nada.
 *
 * Este archivo se puede actualizar en cualquier momento, sin frecuencia fija,
 * cada vez que se pida un reporte nuevo a HubSpot.
 */

export const leadsPorAsesor: LeadsPautaAsesor[] = [
  // ── Ejemplo de carga — reemplazar con los números reales de HubSpot ──────
  // ⚠️ El nombre del vendedor debe copiarse EXACTO como aparece en
  //    propietarioContacto dentro de contacts.ts (nombre completo, con
  //    mayúsculas y tildes incluidas). Por ejemplo:
 { mes: 'Mayo 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 104 },
 { mes: 'Mayo 2026', vendedor: 'Carolina Castro', leadsPauta: 53 },
 { mes: 'Mayo 2026', vendedor: 'Bruno Salotti', leadsPauta: 142 },
 { mes: 'Mayo 2026', vendedor: 'Gimena Suarez', leadsPauta: 96 },
 { mes: 'Mayo 2026', vendedor: 'Verónica Pérez', leadsPauta: 132 },

 { mes: 'Abril 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 137 },
 { mes: 'Abril 2026', vendedor: 'Carolina Castro', leadsPauta: 137 },
 { mes: 'Abril 2026', vendedor: 'Bruno Salotti', leadsPauta: 148 },
 { mes: 'Abril 2026', vendedor: 'Gimena Suarez', leadsPauta: 72 },
 { mes: 'Abril 2026', vendedor: 'Verónica Pérez', leadsPauta: 134 },
  
 { mes: 'Marzo 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 134 },
 { mes: 'Marzo 2026', vendedor: 'Carolina Castro', leadsPauta: 187 },
 { mes: 'Marzo 2026', vendedor: 'Bruno Salotti', leadsPauta: 200 },
 { mes: 'Marzo 2026', vendedor: 'Gimena Suarez', leadsPauta: 106 },
 { mes: 'Marzo 2026', vendedor: 'Verónica Pérez', leadsPauta: 223 },

 { mes: 'Febrero 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 52 },
 { mes: 'Febrero 2026', vendedor: 'Carolina Castro', leadsPauta: 59 },
 { mes: 'Febrero 2026', vendedor: 'Bruno Salotti', leadsPauta: 36 },
 { mes: 'Febrero 2026', vendedor: 'Gimena Suarez', leadsPauta: 22 },
 { mes: 'Febrero 2026', vendedor: 'Verónica Pérez', leadsPauta: 69 },

 { mes: 'Enero 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 257 },
 { mes: 'Enero 2026', vendedor: 'Carolina Castro', leadsPauta: 212 },
 { mes: 'Enero 2026', vendedor: 'Bruno Salotti', leadsPauta: 48 },
 { mes: 'Enero 2026', vendedor: 'Gimena Suarez', leadsPauta: 86 },
 { mes: 'Enero 2026', vendedor: 'Verónica Pérez', leadsPauta: 207 },


{ mes: 'Junio 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 79 },
 { mes: 'Junio 2026', vendedor: 'Carolina Castro', leadsPauta: 197 },
 { mes: 'Junio 2026', vendedor: 'Bruno Salotti', leadsPauta: 149 },
 { mes: 'Junio 2026', vendedor: 'Gimena Suarez', leadsPauta: 130 },
 { mes: 'Junio 2026', vendedor: 'Verónica Pérez', leadsPauta: 143 },

 { mes: 'Julio 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 92 },
 { mes: 'Julio 2026', vendedor: 'Carolina Castro', leadsPauta: 187 },
 { mes: 'Julio 2026', vendedor: 'Bruno Salotti', leadsPauta: 100 },
 { mes: 'Julio 2026', vendedor: 'Gimena Suarez', leadsPauta: 100 },
 { mes: 'Julio 2026', vendedor: 'Verónica Pérez', leadsPauta: 106 },
 { mes: 'Julio 2026', vendedor: 'Esteban Bianchini', leadsPauta: 43 },
 { mes: 'Julio 2026', vendedor: 'Sofía Plastina', leadsPauta: 43 },


 { mes: 'Agosto 2026', vendedor: 'Margarita García Goyhenetche', leadsPauta: 123 },
 { mes: 'Agosto 2026', vendedor: 'Carolina Castro', leadsPauta: 163 },
 { mes: 'Agosto 2026', vendedor: 'Bruno Salotti', leadsPauta: 183  },
 { mes: 'Agosto 2026', vendedor: 'Catherine Matiz Castro', leadsPauta: 171 },
 { mes: 'Agosto 2026', vendedor: 'Verónica Pérez', leadsPauta: 195 },
 { mes: 'Agosto 2026', vendedor: 'Esteban Bianchini', leadsPauta: 160 },
 { mes: 'Agosto 2026', vendedor: 'Sofía Plastina', leadsPauta: 155 },


];

export default leadsPorAsesor;
