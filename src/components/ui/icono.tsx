const TRAZOS = {
  /** Círculo a medio llenar: cambia entre claro y oscuro. */
  tema: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
    </>
  ),
  salir: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4" />,
  externo: <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
  buscar: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

export type NombreIcono = keyof typeof TRAZOS;

type IconoProps = {
  nombre: NombreIcono;
  /** Tamaño del token `sizes` (por defecto el chico). */
  tamano?: 'sm' | 'md';
  className?: string;
};

/** Íconos de línea. Toman el color del texto que los rodea. Son decorativos: el botón lleva el nombre. */
export function Icono({ nombre, tamano = 'sm', className }: IconoProps) {
  const lado = `var(--size-icon-${tamano})`;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={{ width: lado, height: lado, flexShrink: 0 }}>
      {TRAZOS[nombre]}
    </svg>
  );
}
