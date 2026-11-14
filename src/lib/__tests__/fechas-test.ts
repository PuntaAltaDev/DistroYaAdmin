import { describe, expect, it } from 'vitest';

import { fechaCorta, haceCuanto } from '../fechas';

describe('fechas', () => {
  const ahora = new Date(2026, 10, 14, 9, 0);

  it('cuenta días de calendario, no de 24 horas', () => {
    expect(haceCuanto(new Date(2026, 10, 14, 1, 0), ahora)).toBe('hoy');
    expect(haceCuanto(new Date(2026, 10, 13, 23, 0), ahora)).toBe('ayer');
    expect(haceCuanto(new Date(2026, 10, 10, 12, 0), ahora)).toBe('hace 4 días');
  });

  it('una fecha futura cuenta como hoy', () => {
    expect(haceCuanto(new Date(2026, 10, 15), ahora)).toBe('hoy');
  });

  it('fecha corta con día y mes de dos números', () => {
    expect(fechaCorta(new Date(2026, 0, 5))).toBe('05/01/2026');
  });
});
