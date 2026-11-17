/**
 * Difusiones enviadas, de ejemplo, como las va a mandar la API (fecha en texto ISO).
 * Son datos de prueba: cuando esté la API de Seba, el historial viene del servidor.
 *
 * Lo que lee la app Proveedores en su bandeja de avisos es `{ id, titulo, texto, fecha }`.
 * El Admin guarda además a quiénes se mandó: `proveedorIds` (sin él, a todos) y cuántos fueron.
 */
export type DifusionApi = {
  id: string;
  titulo: string;
  texto: string;
  fecha: string;
  /** Los proveedores elegidos. Si falta, se mandó a todos. */
  proveedorIds?: string[];
  /** A cuántos proveedores llegó. */
  cantidad: number;
};

const DIA = 24 * 60 * 60 * 1000;

/** El historial de prueba, con fechas armadas a partir de hoy. */
export function difusionesDePrueba(ahora = new Date()): DifusionApi[] {
  const hace = (dias: number) => new Date(ahora.getTime() - dias * DIA).toISOString();
  return [
    {
      id: 'd1',
      titulo: 'Subí tu lista de precios nueva',
      texto:
        'Cerramos el mes. Los clientes buscan con la lista vigente: subí la de noviembre desde Lista de precios.',
      fecha: hace(2),
      cantidad: 10,
    },
    {
      id: 'd2',
      titulo: 'Tu plan está por vencer',
      texto: 'Renová tu plan desde Plan para seguir apareciendo en el buscador de los clientes.',
      fecha: hace(9),
      proveedorIds: ['p3', 'p5'],
      cantidad: 2,
    },
    {
      id: 'd3',
      titulo: 'Bienvenidos a DistroYa',
      texto:
        'Ya podés cargar tus rubros y tu lista de precios. Cualquier duda, escribinos desde Ayuda.',
      fecha: hace(20),
      cantidad: 8,
    },
  ];
}
