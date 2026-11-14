import type { ReactNode } from 'react';

import { BarraSuperior } from './editorial';
import estilos from './marco.module.css';

type MarcoProps = {
  navegacion?: ReactNode;
  derecha?: ReactNode;
  children: ReactNode;
};

/** Esqueleto de las pantallas del panel: barra de arriba y el contenido centrado. */
export function Marco({ navegacion, derecha, children }: MarcoProps) {
  return (
    <>
      <BarraSuperior navegacion={navegacion} derecha={derecha} />
      <main className={estilos.contenido}>{children}</main>
    </>
  );
}
