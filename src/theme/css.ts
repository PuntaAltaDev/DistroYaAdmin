import {
  borders,
  colors,
  fonts,
  motion,
  radius,
  sizes,
  spacing,
  typography,
  type AppColors,
  type TypographyVariant,
} from './tokens';

/** `textSecondary` → `text-secondary`. */
export const kebab = (s: string) => s.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);

const px = (n: number) => `${n}px`;

/** Una variable CSS por token: `--color-text`, `--space-lg`, `--radius-md`… */
const variables = (prefijo: string, valores: Record<string, string | number>, unidad = px) =>
  Object.entries(valores)
    .map(([k, v]) => `--${prefijo}-${kebab(k)}: ${typeof v === 'number' ? unidad(v) : v};`)
    .join('\n');

/** Nombre de la variable de un color, para usarla desde un componente. */
export const colorVar = (c: keyof AppColors) => `var(--color-${kebab(c)})`;

/** Clase CSS de un estilo de la escala tipográfica. */
export const typeClass = (v: TypographyVariant) => `t-${kebab(v)}`;

const clasesTipograficas = Object.entries(typography)
  .map(
    ([nombre, t]) =>
      `.${typeClass(nombre as TypographyVariant)} { font-weight: ${t.fontWeight}; font-size: ${px(t.fontSize)}; line-height: ${px(t.lineHeight)}; letter-spacing: ${px(t.letterSpacing)}; }`,
  )
  .join('\n');

const duraciones = (ms: (n: number) => number) =>
  variables(
    'duration',
    Object.fromEntries(Object.entries(motion.duration).map(([k, v]) => [k, `${ms(v)}ms`])),
  );

/**
 * Todo el sistema de diseño como CSS: variables en `:root`, colores claros y oscuros
 * (según el sistema o lo que se eligió, ver `tema.tsx`) y las clases de la tipografía.
 */
export function cssDelTema() {
  return `
:root {
${variables('space', spacing)}
${variables('radius', radius)}
${variables('border', borders)}
${variables('size', sizes)}
${duraciones((v) => v)}
--easing: ${motion.easing};
--press-scale: ${motion.pressScale};
--rise: ${px(motion.rise)};
--font-family: ${fonts.family};
--font-light: ${fonts.light};
--font-regular: ${fonts.regular};
--font-medium: ${fonts.medium};
--font-semibold: ${fonts.semibold};
--font-bold: ${fonts.bold};
color-scheme: light;
${variables('color', colors.light)}
}
:root[data-theme='dark'] {
color-scheme: dark;
${variables('color', colors.dark)}
}
@media (prefers-reduced-motion: reduce) {
:root {
${duraciones(() => 0)}
--rise: 0px;
--press-scale: 1;
}
}
${clasesTipograficas}
`;
}
