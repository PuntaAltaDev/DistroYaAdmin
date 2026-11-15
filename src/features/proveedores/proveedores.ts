import type { EstadoProveedor, ProveedorApi } from '@/data/proveedores';
import {
  desdeApi as suscripcionDesdeApi,
  vigente,
  type Suscripcion,
} from '@/features/suscripcion/datos';

export type { EstadoProveedor };

/** Un proveedor con las fechas ya convertidas. */
export type Proveedor = Omit<ProveedorApi, 'suscripcion' | 'fechaAlta' | 'listaFecha'> & {
  fechaAlta: Date;
  listaFecha?: Date;
  suscripcion?: Suscripcion;
};

export function desdeApi(p: ProveedorApi): Proveedor {
  return {
    ...p,
    fechaAlta: new Date(p.fechaAlta),
    listaFecha: p.listaFecha ? new Date(p.listaFecha) : undefined,
    suscripcion: suscripcionDesdeApi(p.suscripcion),
  };
}

export const ESTADOS: EstadoProveedor[] = ['pendiente', 'activo', 'inactivo', 'rechazado'];

export const NOMBRE_ESTADO: Record<EstadoProveedor, string> = {
  pendiente: 'Pendiente',
  activo: 'Activo',
  inactivo: 'Inactivo',
  rechazado: 'Rechazado',
};

/** Para mostrar en plural en los filtros. */
export const NOMBRE_ESTADO_PLURAL: Record<EstadoProveedor, string> = {
  pendiente: 'Pendientes',
  activo: 'Activos',
  inactivo: 'Inactivos',
  rechazado: 'Rechazados',
};

/**
 * Lo que puede hacer el administrador con un proveedor.
 * - pendiente → aprobar (pasa a activo) o rechazar con un motivo.
 * - activo ↔ inactivo: activar o desactivar el comercio.
 * Un rechazado vuelve a pendiente cuando el proveedor corrige y reenvía desde su app.
 */
export type Accion =
  | { tipo: 'aprobar'; id: string }
  | { tipo: 'rechazar'; id: string; motivo: string }
  | { tipo: 'activar'; id: string }
  | { tipo: 'desactivar'; id: string };

const DESDE: Record<Accion['tipo'], EstadoProveedor> = {
  aprobar: 'pendiente',
  rechazar: 'pendiente',
  activar: 'inactivo',
  desactivar: 'activo',
};

export const puede = (p: Proveedor, tipo: Accion['tipo']) => p.estado === DESDE[tipo];

export const MOTIVO_MIN = 10;
export const MOTIVO_MAX = 300;

/** El error del motivo de un rechazo, o nada si está bien. */
export function errorDelMotivo(motivo: string): string | undefined {
  const largo = motivo.trim().length;
  if (largo < MOTIVO_MIN)
    return `Contale al proveedor qué tiene que corregir (al menos ${MOTIVO_MIN} letras).`;
  if (largo > MOTIVO_MAX) return `Usá ${MOTIVO_MAX} letras como máximo.`;
  return undefined;
}

/** La lista después de una acción. Si la acción no corresponde, la lista queda igual. */
export function aplicar(lista: Proveedor[], accion: Accion): Proveedor[] {
  const p = lista.find((x) => x.id === accion.id);
  if (!p || !puede(p, accion.tipo)) return lista;
  if (accion.tipo === 'rechazar' && errorDelMotivo(accion.motivo)) return lista;

  const cambiado: Proveedor =
    accion.tipo === 'rechazar'
      ? { ...p, estado: 'rechazado', motivoRechazo: accion.motivo.trim() }
      : {
          ...p,
          estado: accion.tipo === 'desactivar' ? 'inactivo' : 'activo',
          motivoRechazo: undefined,
        };

  return lista.map((x) => (x === p ? cambiado : x));
}

/** Aparece en el buscador de la App Cliente: está activo y tiene el plan vigente. */
export const visibleEnBuscador = (p: Proveedor, ahora = new Date()) =>
  p.estado === 'activo' && vigente(p.suscripcion, ahora);

/** Pendientes, del que espera hace más tiempo al más nuevo. */
export const pendientes = (lista: Proveedor[]) =>
  lista
    .filter((p) => p.estado === 'pendiente')
    .sort((a, b) => a.fechaAlta.getTime() - b.fechaAlta.getTime());

/** Sin acentos ni mayúsculas. */
export const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export type Filtro = { texto: string; estado: EstadoProveedor | 'todos' };

/**
 * Cada palabra escrita tiene que aparecer en la razón social, un rubro, la localidad o el email
 * (sin distinguir acentos ni mayúsculas). Ordenados por razón social.
 */
export function filtrar(lista: Proveedor[], { texto, estado }: Filtro) {
  const palabras = normalizar(texto).split(/\s+/).filter(Boolean);
  return lista
    .filter((p) => estado === 'todos' || p.estado === estado)
    .filter((p) => {
      const donde = normalizar([p.razonSocial, p.localidad, p.email, ...p.rubros].join(' '));
      return palabras.every((w) => donde.includes(w));
    })
    .sort((a, b) => a.razonSocial.localeCompare(b.razonSocial, 'es'));
}

/** Cuántos hay de cada estado, y en total. */
export function contarPorEstado(lista: Proveedor[]) {
  const cuenta: Record<EstadoProveedor | 'todos', number> = {
    todos: lista.length,
    pendiente: 0,
    activo: 0,
    inactivo: 0,
    rechazado: 0,
  };
  for (const p of lista) cuenta[p.estado] += 1;
  return cuenta;
}
