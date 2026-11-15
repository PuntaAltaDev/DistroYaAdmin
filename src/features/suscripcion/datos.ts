/**
 * Suscripción de un proveedor. Los nombres siguen los del backend de Seba (PlanName, StartDate, EndDate).
 * Las reglas son las mismas de las apps (`features/suscripcion/datos.ts` de Proveedores).
 */
import { DIA } from '@/lib/fechas';

export type Suscripcion = {
  planName: string;
  startDate: Date;
  endDate: Date;
};

/** Como la manda la API: las fechas en texto ISO. */
export type SuscripcionApi = {
  planName: string;
  startDate: string;
  endDate: string;
};

/** La de la API, o nada si falta o tiene fechas dañadas. */
export function desdeApi(s: SuscripcionApi | undefined): Suscripcion | undefined {
  if (!s) return undefined;
  const startDate = new Date(s.startDate);
  const endDate = new Date(s.endDate);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return undefined;
  return { planName: s.planName, startDate, endDate };
}

export type EstadoSuscripcion = 'por-empezar' | 'activa' | 'por-vencer' | 'vencida';

/** A partir de cuántos días antes del vencimiento se avisa. */
export const DIAS_AVISO = 7;

/** Días que faltan para el vencimiento (0 si ya venció). */
export function diasRestantes(s: Suscripcion, ahora = new Date()) {
  return Math.max(0, Math.ceil((s.endDate.getTime() - ahora.getTime()) / DIA));
}

export function estadoDe(s: Suscripcion, ahora = new Date()): EstadoSuscripcion {
  if (s.startDate.getTime() > ahora.getTime()) return 'por-empezar';
  if (s.endDate.getTime() <= ahora.getTime()) return 'vencida';
  return diasRestantes(s, ahora) <= DIAS_AVISO ? 'por-vencer' : 'activa';
}

/** El plan ya empezó y todavía no venció (es lo que pide el buscador de la App Cliente). */
export function vigente(s: Suscripcion | undefined, ahora = new Date()) {
  if (!s) return false;
  const estado = estadoDe(s, ahora);
  return estado === 'activa' || estado === 'por-vencer';
}
