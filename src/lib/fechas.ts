export const DIA = 24 * 60 * 60 * 1000;

/** "13/11/2026" */
export const fechaCorta = (d: Date) =>
  d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

/** "hoy", "ayer" o "hace 3 días" (por días de calendario). */
export function haceCuanto(d: Date, ahora = new Date()) {
  const dia = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dias = Math.round((dia(ahora) - dia(d)) / DIA);
  if (dias <= 0) return 'hoy';
  if (dias === 1) return 'ayer';
  return `hace ${dias} días`;
}
