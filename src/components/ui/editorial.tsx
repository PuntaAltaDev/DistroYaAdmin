import type { ReactNode } from 'react';

import { sizes, typeClass, useTema } from '@/theme';

import { AppText } from './app-text';
import estilos from './editorial.module.css';
import { Icono } from './icono';
import { Logo } from './logo';

type BarraSuperiorProps = {
  /** Links de las secciones, en el medio. */
  navegacion?: ReactNode;
  /** Lo que va a la derecha, antes del botón de claro/oscuro (ej.: "Salir"). */
  derecha?: ReactNode;
};

/** Barra de arriba: marca a la izquierda, secciones en el medio, íconos a la derecha y una línea debajo. */
export function BarraSuperior({ navegacion, derecha }: BarraSuperiorProps) {
  const { esquema, alternar } = useTema();
  return (
    <header className={estilos.barra}>
      <div className={estilos.interior}>
        <div className={estilos.marca}>
          <Logo size={sizes.logoSm} />
          <AppText as="span" variant="headline">
            DistroYa
          </AppText>
          <AppText as="span" variant="overline" color="primaryText">
            ADMIN
          </AppText>
        </div>
        {navegacion && <nav className={estilos.navegacion}>{navegacion}</nav>}
        <div className={estilos.derecha}>
          {derecha}
          <button
            type="button"
            className={estilos.botonIcono}
            onClick={alternar}
            aria-label={esquema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={esquema === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
            <Icono nombre="tema" tamano="md" />
          </button>
        </div>
      </div>
    </header>
  );
}

/** Clase de un link de la barra (para `NavLink`), marcado si es la sección actual. */
export const claseLinkBarra = (activo: boolean) =>
  [estilos.link, typeClass('callout'), activo ? estilos.activo : ''].join(' ');

/** Clase del botón de texto con ícono de la barra (ej.: "Salir"). */
export const claseBotonBarra = [estilos.link, typeClass('callout')].join(' ');

type TitularProps = {
  /** Línea chica en mayúsculas, arriba. */
  antetitulo: string;
  titulo: string;
  /** Frase grande y liviana debajo, en turquesa (ej.: "4 por revisar"). */
  acento?: string;
  /** Lo que va a la derecha del titular (ej.: un botón). */
  children?: ReactNode;
};

/** Titular editorial de cada pantalla. Aparece subiendo apenas. */
export function Titular({ antetitulo, titulo, acento, children }: TitularProps) {
  return (
    <div className={estilos.titular}>
      <div>
        <AppText variant="overline" color="primaryText" className={estilos.antetitulo}>
          {antetitulo}
        </AppText>
        <AppText as="h1" variant="title">
          {titulo}
        </AppText>
        {acento && (
          <AppText variant="display" color="accent">
            {acento}
          </AppText>
        )}
      </div>
      {children}
    </div>
  );
}
