import type { DifusionApi } from '@/data/difusiones';
import type { Proveedor } from '@/features/proveedores/proveedores';

export const TITULO_MAX = 50;
export const TEXTO_MAX = 300;

/** Una difusión con la fecha ya convertida. */
export type Difusion = Omit<DifusionApi, 'fecha'> & { fecha: Date };

export const desdeApi = (d: DifusionApi): Difusion => ({ ...d, fecha: new Date(d.fecha) });

/** Del más nuevo al más viejo. */
export const masNuevasPrimero = (lista: Difusion[]) =>
  [...lista].sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

/** A quiénes puede llegar: los proveedores activos, que son los que ya usan la app. */
export const destinatariosPosibles = (lista: Proveedor[]) =>
  lista.filter((p) => p.estado === 'activo');

export type Destinatarios = { tipo: 'todos' } | { tipo: 'algunos'; ids: string[] };

/** Lo que se completa en el formulario. */
export type Entrada = { titulo: string; texto: string; destinatarios: Destinatarios };

export function errorDelTitulo(titulo: string): string | undefined {
  const largo = titulo.trim().length;
  if (largo === 0) return 'Escribí un título.';
  if (largo > TITULO_MAX) return `Usá ${TITULO_MAX} letras como máximo.`;
  return undefined;
}

export function errorDelTexto(texto: string): string | undefined {
  const largo = texto.trim().length;
  if (largo === 0) return 'Escribí el mensaje.';
  if (largo > TEXTO_MAX) return `Usá ${TEXTO_MAX} letras como máximo.`;
  return undefined;
}

/**
 * Los ids a los que se manda, solo de proveedores que pueden recibirla
 * (si un elegido dejó de estar activo, se descarta).
 */
export function idsDestino(destinatarios: Destinatarios, posibles: Proveedor[]) {
  const ids = posibles.map((p) => p.id);
  if (destinatarios.tipo === 'todos') return ids;
  return destinatarios.ids.filter((id) => ids.includes(id));
}

export function errorDeDestinatarios(
  destinatarios: Destinatarios,
  posibles: Proveedor[],
): string | undefined {
  if (idsDestino(destinatarios, posibles).length === 0) return 'Elegí al menos un proveedor.';
  return undefined;
}

/** Hay algo para corregir antes de enviar. */
export const hayErrores = (e: Entrada, posibles: Proveedor[]) =>
  Boolean(
    errorDelTitulo(e.titulo) ??
    errorDelTexto(e.texto) ??
    errorDeDestinatarios(e.destinatarios, posibles),
  );

/** Arma la difusión que se guarda en el historial, o nada si la entrada no es válida. */
export function armar(
  entrada: Entrada,
  posibles: Proveedor[],
  id: string,
  ahora = new Date(),
): Difusion | undefined {
  if (hayErrores(entrada, posibles)) return undefined;
  const ids = idsDestino(entrada.destinatarios, posibles);
  return {
    id,
    titulo: entrada.titulo.trim(),
    texto: entrada.texto.trim(),
    fecha: ahora,
    // Sin `proveedorIds` se manda a todos: lo mismo que va a pedir la API.
    ...(entrada.destinatarios.tipo === 'algunos' ? { proveedorIds: ids } : {}),
    cantidad: ids.length,
  };
}

/** Lo que va a recibir la API: POST /difusiones { titulo, texto, proveedorIds? }. */
export function paraEnviar(d: Difusion) {
  return { titulo: d.titulo, texto: d.texto, proveedorIds: d.proveedorIds };
}

/** "Todos los proveedores", "Hielo Polar" o "Hielo Polar, Barra Insumos y 3 más". */
export function textoDestinatarios(d: Difusion, lista: Proveedor[], mostrar = 2) {
  if (!d.proveedorIds) return 'Todos los proveedores';
  const nombres = d.proveedorIds.map(
    (id) => lista.find((p) => p.id === id)?.razonSocial ?? 'Proveedor dado de baja',
  );
  if (nombres.length <= mostrar) return nombres.join(' y ');
  const resto = nombres.length - mostrar;
  return `${nombres.slice(0, mostrar).join(', ')} y ${resto} más`;
}

/** "1 proveedor" o "10 proveedores". */
export const cuantos = (n: number) => `${n} ${n === 1 ? 'proveedor' : 'proveedores'}`;
