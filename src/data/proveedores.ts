import type { RUBROS } from './rubros';

/**
 * Proveedores de ejemplo, como los va a mandar la API (fechas en texto ISO).
 * Son datos de prueba: cuando esté la API de Seba, la lista viene del servidor.
 * Del 1 al 10 son los mismos de la App Cliente (mismos campos); el Admin les suma
 * `estado`, `motivoRechazo`, `email` y `fechaAlta`, y agrega pendientes, un rechazado y un inactivo.
 */
export type EstadoProveedor = 'pendiente' | 'rechazado' | 'activo' | 'inactivo';

export type Rubro = (typeof RUBROS)[number];

export type ProveedorApi = {
  id: string;
  razonSocial: string;
  rubros: Rubro[];
  direccion: string;
  localidad: string;
  provincia: string;
  /** Número de WhatsApp tal como lo cargó el proveedor. */
  whatsapp: string;
  telefono?: string;
  email: string;
  /** Link al PDF de la lista de precios vigente (Blob Storage). */
  listaUrl?: string;
  /** Cuándo subió la lista vigente (ISO). */
  listaFecha?: string;
  /** Cuándo se registró (ISO). */
  fechaAlta: string;
  estado: EstadoProveedor;
  /** Lo que escribió el administrador al rechazarlo. El proveedor lo ve en su app. */
  motivoRechazo?: string;
  /** Plan del proveedor. Mismos nombres que en el backend (PlanName, StartDate, EndDate). */
  suscripcion?: { planName: string; startDate: string; endDate: string };
};

/** PDF público de ejemplo, igual para todos, hasta que estén las listas reales. */
export const PDF_DE_PRUEBA =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const DIA = 24 * 60 * 60 * 1000;
const HORA = 60 * 60 * 1000;

/** La lista de prueba, con fechas armadas a partir de hoy. */
export function proveedoresDePrueba(ahora = new Date()): ProveedorApi[] {
  const dias = (n: number) => new Date(ahora.getTime() + n * DIA).toISOString();
  /** Plan que empezó hace `desde` días y vence dentro de `hasta` días (negativo: ya venció). */
  const plan = (desde: number, hasta: number, planName = 'Mensual') => ({
    planName,
    startDate: dias(-desde),
    endDate: dias(hasta),
  });

  return [
    {
      id: 'p1',
      razonSocial: 'Distribuidora del Sur',
      rubros: ['Cervezas', 'Gaseosas', 'Aguas'],
      direccion: 'Av. Colón 1250',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '0291 15 412-3456',
      telefono: '0291 452-1100',
      email: 'ventas@delsur.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-3),
      fechaAlta: dias(-120),
      estado: 'activo',
      suscripcion: plan(10, 20),
    },
    {
      id: 'p2',
      razonSocial: 'Bodega Los Álamos',
      rubros: ['Vinos', 'Espumantes'],
      direccion: 'Ruta 3 km 690',
      localidad: 'Punta Alta',
      provincia: 'Buenos Aires',
      whatsapp: '+54 9 2932 55-1020',
      email: 'pedidos@losalamos.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-12),
      fechaAlta: dias(-310),
      estado: 'activo',
      suscripcion: plan(300, 65, 'Anual'),
    },
    {
      id: 'p3',
      razonSocial: 'Hielo Polar',
      rubros: ['Hielo'],
      direccion: 'Brown 455',
      localidad: 'Punta Alta',
      provincia: 'Buenos Aires',
      whatsapp: '2932 40-7788',
      telefono: '2932 42-0011',
      email: 'hielopolar@correo.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-1),
      fechaAlta: dias(-60),
      estado: 'activo',
      suscripcion: plan(25, 5),
    },
    {
      id: 'p4',
      razonSocial: 'Destilería Ñandú',
      rubros: ['Destilados', 'Aperitivos'],
      direccion: 'Sarmiento 88',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '5492914998877',
      email: 'hola@nandu.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-30),
      fechaAlta: dias(-95),
      estado: 'activo',
      suscripcion: plan(80, 100, 'Trimestral'),
    },
    {
      id: 'p5',
      razonSocial: 'Bebidas Sauce Grande',
      rubros: ['Gaseosas', 'Jugos', 'Energizantes', 'Sin alcohol'],
      direccion: 'Mitre 2100',
      localidad: 'Monte Hermoso',
      provincia: 'Buenos Aires',
      whatsapp: '02921 15 66-3344',
      email: 'ventas@saucegrande.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-6),
      fechaAlta: dias(-8),
      estado: 'activo',
      suscripcion: plan(5, 25),
    },
    {
      id: 'p6',
      razonSocial: 'Barra Insumos',
      rubros: ['Insumos de barra', 'Hielo', 'Aperitivos'],
      direccion: 'Estomba 340',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '291 15 500-1122',
      telefono: '291 455-6677',
      email: 'contacto@barrainsumos.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-2),
      fechaAlta: dias(-40),
      estado: 'activo',
      suscripcion: plan(15, 15),
    },
    {
      id: 'p7',
      razonSocial: 'Cervecería Faro Rojo',
      rubros: ['Cervezas'],
      direccion: 'Irigoyen 77',
      localidad: 'Punta Alta',
      provincia: 'Buenos Aires',
      whatsapp: '2932 15 61-2233',
      email: 'faro@farorojo.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-9),
      fechaAlta: dias(-45),
      estado: 'activo',
      suscripcion: plan(40, 50, 'Trimestral'),
    },
    {
      id: 'p8',
      razonSocial: 'Aguas del Atlántico',
      rubros: ['Aguas', 'Sin alcohol'],
      direccion: 'Belgrano 900',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '291 15 433-0099',
      email: 'ventas@aguasatlantico.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-40),
      fechaAlta: dias(-70),
      estado: 'activo',
      // Vencido: no aparece en el buscador.
      suscripcion: plan(35, -5),
    },
    {
      id: 'p9',
      razonSocial: 'Vinoteca Patagonia',
      rubros: ['Vinos', 'Destilados'],
      direccion: 'Alsina 15',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '291 15 422-7766',
      email: 'vinoteca@patagonia.test',
      fechaAlta: dias(-3),
      estado: 'activo',
      // Aprobado, sin plan todavía: no aparece en el buscador.
    },
    {
      id: 'p10',
      razonSocial: 'Gaseosas Bahía',
      rubros: ['Gaseosas', 'Aguas'],
      direccion: 'Don Bosco 1500',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '291 15 488-5511',
      email: 'gaseosasbahia@correo.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-4),
      fechaAlta: dias(-5),
      estado: 'activo',
      // El plan empieza mañana: todavía no aparece.
      suscripcion: plan(-1, 29),
    },
    {
      id: 'p11',
      razonSocial: 'Cervecería Punta Norte',
      rubros: ['Cervezas'],
      direccion: 'Rivadavia 610',
      localidad: 'Punta Alta',
      provincia: 'Buenos Aires',
      whatsapp: '2932 15 47-8899',
      email: 'puntanorte@correo.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-1),
      fechaAlta: dias(-1),
      estado: 'pendiente',
    },
    {
      id: 'p12',
      razonSocial: 'Distribuidora Ingeniero White',
      rubros: ['Gaseosas', 'Aguas', 'Hielo'],
      direccion: 'Guillermo Torres 3400',
      localidad: 'Ingeniero White',
      provincia: 'Buenos Aires',
      whatsapp: '0291 15 590-2211',
      telefono: '0291 457-3300',
      email: 'ventas@diwhite.test',
      fechaAlta: dias(-2),
      estado: 'pendiente',
      // Sin lista todavía.
    },
    {
      id: 'p13',
      razonSocial: 'Vinos de la Ventana',
      rubros: ['Vinos', 'Espumantes', 'Aperitivos'],
      direccion: 'San Martín 230',
      localidad: 'Sierra de la Ventana',
      provincia: 'Buenos Aires',
      whatsapp: '+54 9 291 641-2200',
      email: 'bodega@laventana.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-4),
      fechaAlta: dias(-4),
      estado: 'pendiente',
    },
    {
      id: 'p14',
      razonSocial: 'Energía Sur Bebidas',
      rubros: ['Energizantes', 'Jugos', 'Sin alcohol'],
      direccion: 'Zapiola 1020',
      localidad: 'Bahía Blanca',
      provincia: 'Buenos Aires',
      whatsapp: '291 15 402-6655',
      email: 'energiasur@correo.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: new Date(ahora.getTime() - 6 * HORA).toISOString(),
      fechaAlta: new Date(ahora.getTime() - 6 * HORA).toISOString(),
      estado: 'pendiente',
    },
    {
      id: 'p15',
      razonSocial: 'Licores Dorrego',
      rubros: ['Destilados'],
      direccion: 'Belgrano 140',
      localidad: 'Coronel Dorrego',
      provincia: 'Buenos Aires',
      whatsapp: '02921 15 40-1188',
      email: 'licores@dorrego.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-9),
      fechaAlta: dias(-10),
      estado: 'rechazado',
      motivoRechazo: 'La lista de precios no se puede leer. Subila de nuevo en PDF.',
    },
    {
      id: 'p16',
      razonSocial: 'Hielería Arroyo Pareja',
      rubros: ['Hielo'],
      direccion: 'Av. Murature 50',
      localidad: 'Punta Alta',
      provincia: 'Buenos Aires',
      whatsapp: '2932 15 50-7744',
      email: 'hieleria@arroyopareja.test',
      listaUrl: PDF_DE_PRUEBA,
      listaFecha: dias(-20),
      fechaAlta: dias(-90),
      // Desactivado por el administrador: aunque tenga plan, no aparece en el buscador.
      estado: 'inactivo',
      suscripcion: plan(20, 10),
    },
  ];
}
