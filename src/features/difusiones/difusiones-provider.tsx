import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { difusionesDePrueba } from '@/data/difusiones';
import type { Proveedor } from '@/features/proveedores/proveedores';

import { armar, desdeApi, masNuevasPrimero, type Difusion, type Entrada } from './difusiones';

/**
 * Difusiones enviadas (en memoria). Hoy salen de `data/difusiones.ts` y `enviar` solo suma una
 * al historial. Con la API: `enviar` hace `POST /difusiones` con `paraEnviar(difusion)` (el
 * servidor manda el push a cada proveedor) y suma lo que devuelve. Las pantallas no cambian.
 */
type Difusiones = {
  /** De la más nueva a la más vieja. */
  historial: Difusion[];
  /** Devuelve la difusión enviada, o nada si la entrada no es válida. */
  enviar: (entrada: Entrada, posibles: Proveedor[]) => Difusion | undefined;
};

const DifusionesContext = createContext<Difusiones | null>(null);

export function DifusionesProvider({ children }: { children: ReactNode }) {
  const [historial, setHistorial] = useState(() =>
    masNuevasPrimero(difusionesDePrueba().map(desdeApi)),
  );

  const valor = useMemo<Difusiones>(
    () => ({
      historial,
      enviar: (entrada, posibles) => {
        const difusion = armar(entrada, posibles, crypto.randomUUID());
        if (difusion) setHistorial((h) => masNuevasPrimero([difusion, ...h]));
        return difusion;
      },
    }),
    [historial],
  );

  return <DifusionesContext value={valor}>{children}</DifusionesContext>;
}

export function useDifusiones() {
  const valor = use(DifusionesContext);
  if (!valor) throw new Error('useDifusiones va dentro de <DifusionesProvider>');
  return valor;
}
