import { describe, expect, it } from 'vitest';

import { DIA } from '@/lib/fechas';

import { desdeApi, diasRestantes, estadoDe, vigente, type Suscripcion } from '../datos';

const ahora = new Date('2026-11-14T12:00:00Z');
const plan = (desde: number, hasta: number): Suscripcion => ({
  planName: 'Mensual',
  startDate: new Date(ahora.getTime() - desde * DIA),
  endDate: new Date(ahora.getTime() + hasta * DIA),
});

describe('estado del plan', () => {
  it('activa con más de 7 días por delante', () => {
    expect(estadoDe(plan(10, 20), ahora)).toBe('activa');
  });

  it('por vencer desde 7 días antes', () => {
    expect(estadoDe(plan(23, 7), ahora)).toBe('por-vencer');
    expect(estadoDe(plan(23, 8), ahora)).toBe('activa');
  });

  it('vencida el mismo instante en que termina', () => {
    expect(estadoDe(plan(30, 0), ahora)).toBe('vencida');
    expect(estadoDe(plan(35, -5), ahora)).toBe('vencida');
  });

  it('por empezar si arranca más adelante', () => {
    expect(estadoDe(plan(-1, 29), ahora)).toBe('por-empezar');
  });

  it('solo es vigente si empezó y no venció', () => {
    expect(vigente(plan(10, 20), ahora)).toBe(true);
    expect(vigente(plan(25, 5), ahora)).toBe(true);
    expect(vigente(plan(-1, 29), ahora)).toBe(false);
    expect(vigente(plan(35, -5), ahora)).toBe(false);
    expect(vigente(undefined, ahora)).toBe(false);
  });

  it('cuenta los días que faltan, sin negativos', () => {
    expect(diasRestantes(plan(10, 20), ahora)).toBe(20);
    expect(diasRestantes(plan(35, -5), ahora)).toBe(0);
  });
});

describe('lectura de la API', () => {
  it('convierte las fechas ISO', () => {
    const s = desdeApi({
      planName: 'Anual',
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2027-01-01T00:00:00.000Z',
    });
    expect(s?.planName).toBe('Anual');
    expect(s?.endDate.getUTCFullYear()).toBe(2027);
  });

  it('descarta fechas dañadas o la falta de plan', () => {
    expect(desdeApi({ planName: 'X', startDate: 'mañana', endDate: '' })).toBeUndefined();
    expect(desdeApi(undefined)).toBeUndefined();
  });
});
