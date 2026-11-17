/**
 * Sistema de diseño DistroYa, el mismo de las apps Proveedores y Clientes, pasado a la web.
 * Todos los colores, tamaños y animaciones salen de este archivo (como variables CSS, ver `css.ts`).
 * Regla: ninguna pantalla escribe un color o un tamaño "a mano".
 */

/** Paleta base: valores fijos. Las pantallas NO la usan directo, usan `colors`. */
export const palette = {
  white: '#FFFFFF',

  // Verdes agua (clara).
  mint25: '#EAF6F5',
  mint50: '#E0F2F1',
  mint100: '#D3ECEA',
  mint150: '#C8E7E5',
  mint200: '#A9D3D1',
  mint300: '#7FB9B6',

  // Turquesa (acento).
  teal400: '#18A4A3',
  teal500: '#0F8584',
  teal600: '#0A6E6D',

  // Grises verdosos para texto secundario.
  slate300: '#8FB3B3',
  slate400: '#6F9496',
  slate500: '#517273',
  slate600: '#3E5F60',

  // Fondos oscuros.
  deep600: '#2A5658',
  deep700: '#1D4446',
  deep800: '#0F3335',
  deep850: '#0A2A2C',
  deep900: '#041F21',
  foam: '#EAF3F2',

  lime: '#BECF6E',
  /** Turquesa claro: ruedas del carrito del logo. */
  aqua: '#7FE0D8',

  green600: '#2F7A4F',
  green300: '#5FB27F',
  red600: '#B3402E',
  red300: '#E0735F',
} as const;

/** Nombres de los colores con significado. Claro y oscuro tienen que tener todos. */
type ColorToken =
  | 'background'
  | 'surface'
  | 'surfaceAlt'
  | 'border'
  | 'borderStrong'
  | 'text'
  | 'textSecondary'
  | 'textMuted'
  | 'primary'
  | 'primaryPressed'
  | 'onPrimary'
  | 'primarySoft'
  | 'primaryText'
  | 'accent'
  | 'actionBg'
  | 'actionText'
  | 'actionAccent'
  | 'success'
  | 'danger'
  | 'overlay';

export type AppColors = Record<ColorToken, string>;

/** Colores con significado. Mismas claves en claro y oscuro. */
const light: AppColors = {
  background: palette.white,
  surface: palette.mint25,
  surfaceAlt: palette.mint50,
  border: palette.mint200,
  borderStrong: palette.mint300,

  text: palette.deep900,
  textSecondary: palette.slate600,
  /** Textos de ejemplo (placeholder): llega a 4,5:1 sobre el fondo. */
  textMuted: palette.slate500,

  /** Cursor, avance y líneas activas. No se usa para texto chico. */
  primary: palette.teal400,
  primaryPressed: palette.teal500,
  onPrimary: palette.deep900,
  primarySoft: palette.mint150,
  /** Turquesa oscurecido para texto chico, números y flechas. */
  primaryText: palette.teal600,
  /** Frase de acento de los titulares (texto grande). */
  accent: palette.teal500,

  actionBg: palette.deep900,
  actionText: palette.white,
  actionAccent: palette.lime,

  success: palette.green600,
  danger: palette.red600,
  overlay: 'rgba(4, 31, 33, 0.4)',
};

const dark: AppColors = {
  background: palette.deep900,
  surface: palette.deep850,
  surfaceAlt: palette.deep800,
  border: palette.deep700,
  borderStrong: palette.deep600,

  text: palette.foam,
  textSecondary: palette.slate300,
  textMuted: palette.slate400,

  primary: palette.teal400,
  primaryPressed: palette.teal500,
  onPrimary: palette.deep900,
  primarySoft: palette.deep800,
  primaryText: palette.teal400,
  accent: palette.teal400,

  /** Turquesa, el mismo verde de la frase de acento. */
  actionBg: palette.teal400,
  actionText: palette.deep900,
  actionAccent: palette.deep900,

  success: palette.green300,
  danger: palette.red300,
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const colors = { light, dark };
export type ColorScheme = keyof typeof colors;

/** Inter, en los pesos que se cargan en `main.tsx`. */
export const fonts = {
  family: "'Inter', system-ui, sans-serif",
  /** Solo en tamaños grandes (frase de acento de los titulares). */
  light: 200,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Escala tipográfica, en px. Mínimo 13px; cuerpo 15–17px con renglón de ~1,4.
 * Ningún `lineHeight` baja de 1,25 del tamaño (misma regla que las apps).
 * Todos los números son de ancho fijo (`tabular-nums`, en `css.ts`).
 */
export const typography = {
  largeTitle: { fontWeight: fonts.bold, fontSize: 34, lineHeight: 43, letterSpacing: -0.6 },
  title: { fontWeight: fonts.semibold, fontSize: 28, lineHeight: 35, letterSpacing: -0.4 },
  title2: { fontWeight: fonts.semibold, fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  headline: { fontWeight: fonts.semibold, fontSize: 17, lineHeight: 23, letterSpacing: -0.2 },
  body: { fontWeight: fonts.regular, fontSize: 16, lineHeight: 23, letterSpacing: -0.1 },
  callout: { fontWeight: fonts.medium, fontSize: 15, lineHeight: 21, letterSpacing: -0.1 },
  subhead: { fontWeight: fonts.regular, fontSize: 15, lineHeight: 21, letterSpacing: 0 },
  footnote: { fontWeight: fonts.regular, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
  caption: { fontWeight: fonts.medium, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
  overline: { fontWeight: fonts.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 2.5 },
  /** Frase de acento de los titulares: Inter 200, solo en grande. */
  display: { fontWeight: fonts.light, fontSize: 40, lineHeight: 50, letterSpacing: -1 },
} as const;
export type TypographyVariant = keyof typeof typography;

/** Espacios (múltiplos de 4). */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Redondeos. */
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

/** Grosores de línea. */
export const borders = {
  hairline: 1,
  /** Línea activa de un campo y anillo de foco del teclado. */
  strong: 2,
} as const;

/** Tamaños de controles y del contenido (en la web se usa mouse: más bajos que en el teléfono). */
export const sizes = {
  buttonHeight: 44,
  inputHeight: 44,
  barHeight: 64,
  iconSm: 18,
  iconMd: 22,
  logoSm: 32,
  logoLg: 72,
  /** Ancho máximo del contenido del panel. */
  content: 1120,
  /** Ancho de las columnas angostas (entrar, tarjetas, diálogos). */
  narrow: 560,
  /** Ancho mínimo de una tarjeta antes de pasar a otra fila. */
  card: 320,
  /** Alto del campo de texto largo (motivo del rechazo). */
  textarea: 112,
  /** Alto máximo de una lista con scroll (ej.: elegir proveedores). */
  listaMax: 288,
} as const;

/** Animaciones: duraciones y curva para que todo se mueva igual. */
export const motion = {
  duration: { fast: 150, base: 250, slow: 400 },
  /** Curva suave que frena al final (lo más parecido al resorte "gentle" de las apps). */
  easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  /** Cuánto se achica un botón al apretarlo. */
  pressScale: 0.97,
  /** Cuánto sube lo que aparece. */
  rise: 8,
} as const;
