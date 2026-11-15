import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { borrar, guardar, leer } from '@/lib/almacen';

import { aGuardada, desdeGuardada, type Sesion } from './sesion';

const CLAVE = 'sesion';

type Cuenta = {
  sesion: Sesion | undefined;
  /** Guarda la sesión que devolvió el acceso. */
  iniciar: (s: Sesion) => void;
  cerrar: () => void;
};

const CuentaContext = createContext<Cuenta | null>(null);

/** Sesión guardada en el navegador. Con la API, además se cierra la sesión en Entra. */
export function CuentaProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState(() => desdeGuardada(leer(CLAVE)));

  const valor = useMemo<Cuenta>(
    () => ({
      sesion,
      iniciar: (s) => {
        guardar(CLAVE, aGuardada(s));
        setSesion(s);
      },
      cerrar: () => {
        borrar(CLAVE);
        setSesion(undefined);
      },
    }),
    [sesion],
  );

  return <CuentaContext value={valor}>{children}</CuentaContext>;
}

export function useCuenta() {
  const valor = use(CuentaContext);
  if (!valor) throw new Error('useCuenta va dentro de <CuentaProvider>');
  return valor;
}
