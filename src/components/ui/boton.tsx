import type { ButtonHTMLAttributes } from 'react';

import { typeClass } from '@/theme';

import estilos from './boton.module.css';
import { Icono } from './icono';

type BotonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * `accion`: el botón oscuro con la flecha (lo principal de la pantalla).
   * `secundario`: con borde. `peligro`: rechazar o dar de baja. `texto`: sin borde.
   */
  variante?: 'accion' | 'secundario' | 'peligro' | 'texto';
};

/** Botón de DistroYa. Se achica apenas al apretarlo. */
export function Boton({
  variante = 'accion',
  className,
  children,
  type = 'button',
  ...rest
}: BotonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={[estilos.boton, estilos[variante], typeClass('callout'), className]
        .filter(Boolean)
        .join(' ')}>
      {children}
      {variante === 'accion' && <Icono nombre="flecha" className={estilos.flecha} />}
    </button>
  );
}
