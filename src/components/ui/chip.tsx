import { typeClass } from '@/theme';

import estilos from './chip.module.css';

type ChipProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
  /** Número a la derecha (ej.: cuántos hay de cada estado). */
  contador?: number;
};

/** Etiqueta seleccionable (filtros). Cambia de color con una transición suave. */
export function Chip({ label, selected, onToggle, contador }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={[estilos.chip, typeClass('caption')].join(' ')}>
      {label}
      {contador !== undefined && <span className={estilos.contador}>{contador}</span>}
    </button>
  );
}

/** Etiqueta fija, sin acción (ej.: los rubros de un proveedor). */
export function Etiqueta({ label }: { label: string }) {
  return <span className={[estilos.etiqueta, typeClass('caption')].join(' ')}>{label}</span>;
}
