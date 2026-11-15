import { describe, expect, it } from 'vitest';

import { aGuardada, desdeGuardada } from '../sesion';

describe('sesión guardada', () => {
  it('se guarda y se vuelve a leer igual', () => {
    const s = { nombre: 'Admin', email: 'admin@distroya.test', desde: new Date('2026-11-14') };
    expect(desdeGuardada(JSON.parse(JSON.stringify(aGuardada(s))))).toEqual(s);
  });

  it('lo dañado o faltante no abre sesión', () => {
    expect(desdeGuardada(undefined)).toBeUndefined();
    expect(desdeGuardada('admin')).toBeUndefined();
    expect(desdeGuardada({ nombre: 'Admin', email: 'a@b.test' })).toBeUndefined();
    expect(desdeGuardada({ nombre: 'Admin', email: 'a@b.test', desde: 'ayer' })).toBeUndefined();
  });
});
