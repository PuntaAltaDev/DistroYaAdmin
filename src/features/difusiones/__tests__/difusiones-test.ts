import { describe, expect, it } from 'vitest';

import { difusionesDePrueba } from '@/data/difusiones';
import { proveedoresDePrueba } from '@/data/proveedores';
import { desdeApi as proveedorDesdeApi } from '@/features/proveedores/proveedores';

import {
  TEXTO_MAX,
  TITULO_MAX,
  armar,
  cuantos,
  desdeApi,
  destinatariosPosibles,
  errorDeDestinatarios,
  errorDelTexto,
  errorDelTitulo,
  idsDestino,
  masNuevasPrimero,
  paraEnviar,
  textoDestinatarios,
  type Entrada,
} from '../difusiones';

const ahora = new Date('2026-11-14T12:00:00Z');
const lista = proveedoresDePrueba(ahora).map(proveedorDesdeApi);
const posibles = destinatariosPosibles(lista);

const entrada = (parte: Partial<Entrada> = {}): Entrada => ({
  titulo: 'Promo de fin de mes',
  texto: 'Subí la lista nueva antes del 30.',
  destinatarios: { tipo: 'todos' },
  ...parte,
});

describe('a quiénes puede llegar', () => {
  it('solo a los proveedores activos', () => {
    expect(posibles).toHaveLength(10);
    expect(posibles.every((p) => p.estado === 'activo')).toBe(true);
  });

  it('"todos" son todos los posibles', () => {
    expect(idsDestino({ tipo: 'todos' }, posibles)).toHaveLength(10);
  });

  it('descarta a los elegidos que no pueden recibirla', () => {
    // p11 es pendiente, p16 está inactivo y "nadie" no existe.
    const ids = idsDestino({ tipo: 'algunos', ids: ['p1', 'p11', 'p16', 'nadie'] }, posibles);
    expect(ids).toEqual(['p1']);
  });
});

describe('validación', () => {
  it('el título pide texto y hasta 50 letras', () => {
    expect(errorDelTitulo('   ')).toBeDefined();
    expect(errorDelTitulo('a'.repeat(TITULO_MAX))).toBeUndefined();
    expect(errorDelTitulo('a'.repeat(TITULO_MAX + 1))).toBeDefined();
  });

  it('el mensaje pide texto y hasta 300 letras', () => {
    expect(errorDelTexto('')).toBeDefined();
    expect(errorDelTexto('a'.repeat(TEXTO_MAX))).toBeUndefined();
    expect(errorDelTexto('a'.repeat(TEXTO_MAX + 1))).toBeDefined();
  });

  it('elegir algunos pide al menos uno que pueda recibirla', () => {
    expect(errorDeDestinatarios({ tipo: 'todos' }, posibles)).toBeUndefined();
    expect(errorDeDestinatarios({ tipo: 'algunos', ids: [] }, posibles)).toBeDefined();
    expect(errorDeDestinatarios({ tipo: 'algunos', ids: ['p11'] }, posibles)).toBeDefined();
    expect(errorDeDestinatarios({ tipo: 'algunos', ids: ['p2'] }, posibles)).toBeUndefined();
  });
});

describe('armar la difusión', () => {
  it('a todos: sin proveedorIds y con la cantidad', () => {
    const d = armar(entrada({ titulo: '  Promo  ' }), posibles, 'x1', ahora)!;
    expect(d.titulo).toBe('Promo');
    expect(d.proveedorIds).toBeUndefined();
    expect(d.cantidad).toBe(10);
    expect(d.fecha).toBe(ahora);
  });

  it('a algunos: guarda los ids y cuenta solo los válidos', () => {
    const d = armar(
      entrada({ destinatarios: { tipo: 'algunos', ids: ['p2', 'p11', 'p4'] } }),
      posibles,
      'x2',
      ahora,
    )!;
    expect(d.proveedorIds).toEqual(['p2', 'p4']);
    expect(d.cantidad).toBe(2);
  });

  it('no arma nada si falta algo', () => {
    expect(armar(entrada({ titulo: '' }), posibles, 'x3')).toBeUndefined();
    expect(armar(entrada({ texto: '' }), posibles, 'x3')).toBeUndefined();
    expect(
      armar(entrada({ destinatarios: { tipo: 'algunos', ids: [] } }), posibles, 'x3'),
    ).toBeUndefined();
  });

  it('lo que va a la API es título, texto y los ids (sin ids = a todos)', () => {
    const todos = armar(entrada(), posibles, 'x4', ahora)!;
    expect(paraEnviar(todos)).toEqual({
      titulo: 'Promo de fin de mes',
      texto: 'Subí la lista nueva antes del 30.',
      proveedorIds: undefined,
    });
    const algunos = armar(
      entrada({ destinatarios: { tipo: 'algunos', ids: ['p1'] } }),
      posibles,
      'x5',
      ahora,
    )!;
    expect(paraEnviar(algunos).proveedorIds).toEqual(['p1']);
  });
});

describe('historial', () => {
  const historial = difusionesDePrueba(ahora).map(desdeApi);

  it('los datos de prueba tienen ids únicos, textos válidos y cantidades que cierran', () => {
    expect(new Set(historial.map((d) => d.id)).size).toBe(historial.length);
    for (const d of historial) {
      expect(errorDelTitulo(d.titulo)).toBeUndefined();
      expect(errorDelTexto(d.texto)).toBeUndefined();
    }
    const elegidas = historial.filter((d) => d.proveedorIds);
    expect(elegidas.map((d) => d.cantidad)).toEqual(elegidas.map((d) => d.proveedorIds?.length));
  });

  it('se ordena de la más nueva a la más vieja', () => {
    const desordenado = [historial[2], historial[0], historial[1]];
    expect(masNuevasPrimero(desordenado).map((d) => d.id)).toEqual(['d1', 'd2', 'd3']);
  });

  it('cuenta a quiénes llegó', () => {
    expect(textoDestinatarios(historial[0], lista)).toBe('Todos los proveedores');
    expect(textoDestinatarios(historial[1], lista)).toBe('Hielo Polar y Bebidas Sauce Grande');
    const muchos = { ...historial[1], proveedorIds: ['p1', 'p2', 'p3', 'p4', 'p5'] };
    expect(textoDestinatarios(muchos, lista)).toBe(
      'Distribuidora del Sur, Bodega Los Álamos y 3 más',
    );
    expect(textoDestinatarios({ ...historial[1], proveedorIds: ['zzz'] }, lista)).toBe(
      'Proveedor dado de baja',
    );
  });

  it('singular y plural', () => {
    expect(cuantos(1)).toBe('1 proveedor');
    expect(cuantos(10)).toBe('10 proveedores');
  });
});
