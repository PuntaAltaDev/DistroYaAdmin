import type { CSSProperties, HTMLAttributes } from 'react';

import { colorVar, typeClass, type AppColors, type TypographyVariant } from '@/theme';

type AppTextProps = HTMLAttributes<HTMLElement> & {
  /** Estilo tipográfico de la escala (por defecto `body`). */
  variant?: TypographyVariant;
  /** Color del tema (por defecto `text`). */
  color?: keyof AppColors;
  /** Etiqueta HTML (por defecto `p`). */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
};

/** Texto base de DistroYa: siempre usa la tipografía y los colores del tema. */
export function AppText({
  variant = 'body',
  color = 'text',
  as: Tag = 'p',
  className,
  style,
  ...rest
}: AppTextProps) {
  const estilo: CSSProperties = { color: colorVar(color), ...style };
  return (
    <Tag
      {...rest}
      className={[typeClass(variant), className].filter(Boolean).join(' ')}
      style={estilo}
    />
  );
}
