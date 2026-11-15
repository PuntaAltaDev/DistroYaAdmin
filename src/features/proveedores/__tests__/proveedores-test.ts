import { describe, expect, it } from 'vitest';

import { proveedoresDePrueba } from '@/data/proveedores';
import { RUBROS } from '@/data/rubros';

import {
  aplicar,
  contarPorEstado,
  desdeApi,
  errorDelMotivo,
  filtrar,
  pendientes,
  visibleEnBuscador,
} from '../proveedores';

const ahora = new Date('2026-11-14T12:00:00Z');
const lista = () => proveedoresDePrueba(ahora).map(desdeApi);
const buscar = (id: string, l = lista()) => l.find((p) => p.id === id)!;

describe('datos de prueba', () => {
  it('tienen ids únicos y solo rubros de la lista', () => {
    const l = lista();
    expect(new Set(l.map((p) => p.id)).size).toBe(l.length);
    for (const p of l) for (const r of p.rubros) expect(RUBROS).toContain(r);
  });

  it('solo los rechazados tienen motivo', () => {
    for (const p of lista()) expect(Boolean(p.motivoRechazo)).toBe(p.estado === 'rechazado');
  });
});

describe('aprobar y rechazar', () => {
  it('aprobar un pendiente lo activa', () => {
    expect(buscar('p11', aplicar(lista(), { tipo: 'aprobar', id: 'p11' })).estado).toBe('activo');
  });

  it('rechazar guarda el motivo sin espacios de más', () => {
    const l = aplicar(lista(), {
      tipo: 'rechazar',
      id: 'p12',
      motivo: '  Falta la lista de precios.  ',
    });
    expect(buscar('p12', l).estado).toBe('rechazado');
    expect(buscar('p12', l).motivoRechazo).toBe('Falta la lista de precios.');
  });

  it('no rechaza sin un motivo válido', () => {
    const antes = lista();
    expect(aplicar(antes, { tipo: 'rechazar', id: 'p12', motivo: 'no' })).toBe(antes);
  });

  it('solo se aprueba o rechaza a un pendiente', () => {
    const antes = lista();
    expect(aplicar(antes, { tipo: 'aprobar', id: 'p15' })).toBe(antes);
    expect(aplicar(antes, { tipo: 'rechazar', id: 'p1', motivo: 'Un motivo largo' })).toBe(antes);
  });

  it('un id que no existe no cambia nada', () => {
    const antes = lista();
    expect(aplicar(antes, { tipo: 'aprobar', id: 'nadie' })).toBe(antes);
  });

  it('el motivo pide entre 10 y 300 letras', () => {
    expect(errorDelMotivo('   corto   ')).toBeDefined();
    expect(errorDelMotivo('La lista no se lee bien.')).toBeUndefined();
    expect(errorDelMotivo('a'.repeat(301))).toBeDefined();
  });
});

describe('activar y desactivar el comercio', () => {
  it('desactivar un activo y volver a activarlo', () => {
    const desactivado = aplicar(lista(), { tipo: 'desactivar', id: 'p1' });
    expect(buscar('p1', desactivado).estado).toBe('inactivo');
    expect(buscar('p1', aplicar(desactivado, { tipo: 'activar', id: 'p1' })).estado).toBe('activo');
  });

  it('no se activa a un pendiente ni a un rechazado', () => {
    const antes = lista();
    expect(aplicar(antes, { tipo: 'activar', id: 'p11' })).toBe(antes);
    expect(aplicar(antes, { tipo: 'activar', id: 'p15' })).toBe(antes);
  });
});

describe('visible en el buscador', () => {
  it('pide estar activo y con el plan vigente', () => {
    expect(visibleEnBuscador(buscar('p1'), ahora)).toBe(true);
    expect(visibleEnBuscador(buscar('p8'), ahora)).toBe(false); // vencido
    expect(visibleEnBuscador(buscar('p9'), ahora)).toBe(false); // sin plan
    expect(visibleEnBuscador(buscar('p10'), ahora)).toBe(false); // empieza mañana
    expect(visibleEnBuscador(buscar('p16'), ahora)).toBe(false); // inactivo con plan
  });
});

describe('listas y filtros', () => {
  it('pendientes, del más antiguo al más nuevo', () => {
    expect(pendientes(lista()).map((p) => p.id)).toEqual(['p13', 'p12', 'p11', 'p14']);
  });

  it('busca sin acentos ni mayúsculas en nombre, rubro y localidad', () => {
    const ids = (texto: string) => filtrar(lista(), { texto, estado: 'todos' }).map((p) => p.id);
    expect(ids('nandu')).toEqual(['p4']);
    expect(ids('HIELO punta')).toEqual(['p16', 'p3']);
    expect(ids('bahia blanca vinos')).toEqual(['p9']);
  });

  it('filtra por estado y ordena por razón social', () => {
    const r = filtrar(lista(), { texto: '', estado: 'pendiente' }).map((p) => p.razonSocial);
    expect(r).toEqual([
      'Cervecería Punta Norte',
      'Distribuidora Ingeniero White',
      'Energía Sur Bebidas',
      'Vinos de la Ventana',
    ]);
  });

  it('cuenta por estado', () => {
    expect(contarPorEstado(lista())).toEqual({
      todos: 16,
      pendiente: 4,
      activo: 10,
      inactivo: 1,
      rechazado: 1,
    });
  });
});
