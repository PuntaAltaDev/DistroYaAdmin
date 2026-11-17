import type { ReactNode } from 'react';

import { typeClass } from '@/theme';

import estilos from './casilla.module.css';

type CasillaProps = {
  marcada: boolean;
  alCambiar: (marcada: boolean) => void;
  children: ReactNode;
};

/** Casilla de verificación con su texto al lado. Tocar el texto también la marca. */
export function Casilla({ marcada, alCambiar, children }: CasillaProps) {
  return (
    <label className={[estilos.casilla, typeClass('subhead')].join(' ')}>
      <input
        type="checkbox"
        checked={marcada}
        onChange={(e) => alCambiar(e.target.checked)}
        className={estilos.entrada}
      />
      <span className={estilos.texto}>{children}</span>
    </label>
  );
}
