import { createContext, use, useEffect, useMemo, useState, type ReactNode } from 'react';

import { guardar, leer } from '@/lib/almacen';

import type { ColorScheme } from './tokens';

const CLAVE = 'tema';
const consulta = () => window.matchMedia('(prefers-color-scheme: dark)');

/** Lo elegido con el botón; si no se eligió nada, sigue al sistema. */
function esquemaInicial(): ColorScheme {
  const elegido = leer(CLAVE);
  if (elegido === 'light' || elegido === 'dark') return elegido;
  return consulta().matches ? 'dark' : 'light';
}

/** Pone el esquema en `<html data-theme>`, que es lo que cambia las variables de color. */
export function aplicarEsquema(esquema = esquemaInicial()) {
  document.documentElement.dataset.theme = esquema;
}

type Tema = { esquema: ColorScheme; alternar: () => void };

const TemaContext = createContext<Tema | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [esquema, setEsquema] = useState(esquemaInicial);

  useEffect(() => aplicarEsquema(esquema), [esquema]);

  // Mientras no se elija a mano, acompaña los cambios del sistema.
  useEffect(() => {
    const mq = consulta();
    const alCambiar = () => {
      if (leer(CLAVE) === undefined) setEsquema(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, []);

  const valor = useMemo<Tema>(
    () => ({
      esquema,
      alternar: () => {
        const otro = esquema === 'dark' ? 'light' : 'dark';
        guardar(CLAVE, otro);
        setEsquema(otro);
      },
    }),
    [esquema],
  );

  return <TemaContext value={valor}>{children}</TemaContext>;
}

export function useTema() {
  const tema = use(TemaContext);
  if (!tema) throw new Error('useTema va dentro de <TemaProvider>');
  return tema;
}
