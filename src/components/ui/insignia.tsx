import type { ReactNode } from 'react';

import { colorVar, typeClass, type AppColors } from '@/theme';

import estilos from './insignia.module.css';

export type Tono = 'exito' | 'peligro' | 'acento' | 'neutro';

const COLOR: Record<Tono, keyof AppColors> = {
  exito: 'success',
  peligro: 'danger',
  acento: 'primaryText',
  neutro: 'textSecondary',
};

/** Estado con un punto de color adelante (ej.: "Activo", "Vencido"). */
export function Insignia({ tono, children }: { tono: Tono; children: ReactNode }) {
  return (
    <span
      className={[estilos.insignia, typeClass('caption')].join(' ')}
      style={{ color: colorVar(COLOR[tono]) }}>
      <span className={estilos.punto} aria-hidden />
      {children}
    </span>
  );
}
