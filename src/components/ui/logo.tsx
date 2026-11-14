import { palette, sizes } from '@/theme';

type LogoProps = {
  /** Lado del cuadrado, en px. */
  size?: number;
  /** Color del cuadrado de fondo. En fondo oscuro conviene uno apenas más claro que la pantalla. */
  fondo?: string;
};

/**
 * Logo de DistroYa: el carrito de compras sobre un cuadrado de esquinas redondeadas.
 * Es una marca: sus colores son fijos y no cambian con el modo claro/oscuro.
 * Es el mismo dibujo de las apps. También está en `public/favicon.svg`: si cambia uno, cambia el otro.
 */
export function Logo({ size = sizes.logoLg, fondo = palette.deep900 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 130" role="img" aria-label="DistroYa">
      <rect width={130} height={130} rx={30} fill={fondo} />
      <polygon points="44,52 98,52 90,78 51,78" fill={palette.teal400} />
      <path
        d="M26 36H40L51 78H90L98 52H44"
        fill="none"
        stroke={palette.white}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={58} cy={94} r={7} fill={palette.aqua} />
      <circle cx={84} cy={94} r={7} fill={palette.aqua} />
    </svg>
  );
}
