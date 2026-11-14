/** Sesión del administrador. Hoy simulada; con Entra, el nombre y el email vienen del token. */
export type Sesion = {
  nombre: string;
  email: string;
  /** Cuándo entró. */
  desde: Date;
};

/** Cómo se guarda en el navegador: la fecha como texto ISO. */
export type SesionGuardada = { nombre: string; email: string; desde: string };

export const aGuardada = (s: Sesion): SesionGuardada => ({
  nombre: s.nombre,
  email: s.email,
  desde: s.desde.toISOString(),
});

/** Lo guardado, o nada si falta o está dañado. */
export function desdeGuardada(g: unknown): Sesion | undefined {
  if (typeof g !== 'object' || g === null) return undefined;
  const { nombre, email, desde } = g as Partial<Record<keyof SesionGuardada, unknown>>;
  if (typeof nombre !== 'string' || typeof email !== 'string' || typeof desde !== 'string')
    return undefined;
  const fecha = new Date(desde);
  if (Number.isNaN(fecha.getTime())) return undefined;
  return { nombre, email, desde: fecha };
}
