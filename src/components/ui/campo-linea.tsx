import { useId } from 'react';

import { typeClass } from '@/theme';

import { AppText } from './app-text';
import estilos from './campo-linea.module.css';
import { Icono, type NombreIcono } from './icono';

type CampoLineaProps = {
  /** Etiqueta chica en mayúsculas, arriba del texto. */
  etiqueta: string;
  valor: string;
  alCambiar: (valor: string) => void;
  placeholder?: string;
  /** Texto largo en varios renglones (ej.: el motivo de un rechazo). */
  multilinea?: boolean;
  /** Ícono a la izquierda (ej.: la lupa del buscador). */
  icono?: NombreIcono;
  /** Ayuda debajo del campo. Si hay `error`, se muestra el error en su lugar. */
  ayuda?: string;
  error?: string;
  maxLength?: number;
  autoFocus?: boolean;
  type?: 'text' | 'search';
};

/** Campo de texto con una línea abajo que se pinta de turquesa al escribir. */
export function CampoLinea({
  etiqueta,
  valor,
  alCambiar,
  multilinea,
  icono,
  ayuda,
  error,
  type = 'text',
  ...rest
}: CampoLineaProps) {
  const id = useId();
  const idAyuda = `${id}-ayuda`;
  const nota = error ?? ayuda;
  const comunes = {
    ...rest,
    id,
    value: valor,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': nota ? idAyuda : undefined,
    className: [estilos.entrada, typeClass('body')].join(' '),
  };

  return (
    <div className={estilos.campo}>
      <label htmlFor={id} className={[estilos.etiqueta, typeClass('overline')].join(' ')}>
        {etiqueta}
      </label>
      <div className={[estilos.linea, error ? estilos.conError : ''].join(' ')}>
        {icono && <Icono nombre={icono} className={estilos.icono} />}
        {multilinea ? (
          <textarea {...comunes} onChange={(e) => alCambiar(e.target.value)} />
        ) : (
          <input {...comunes} type={type} onChange={(e) => alCambiar(e.target.value)} />
        )}
      </div>
      {nota && (
        <AppText id={idAyuda} variant="footnote" color={error ? 'danger' : 'textSecondary'}>
          {nota}
        </AppText>
      )}
    </div>
  );
}
