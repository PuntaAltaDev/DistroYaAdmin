import { useEffect, useRef, type FormEvent, type ReactNode } from 'react';

import { AppText } from './app-text';
import estilos from './dialogo.module.css';

type DialogoProps = {
  abierto: boolean;
  titulo: string;
  /** Al cerrar con Esc, tocando afuera o con un botón de cancelar. */
  alCerrar: () => void;
  /** Al confirmar (Enter o el botón `type="submit"` de `acciones`). */
  alConfirmar: () => void;
  children: ReactNode;
  /** Botones de abajo. El que confirma va con `type="submit"`. */
  acciones: ReactNode;
};

/** Ventana modal del navegador (`<dialog>`): atrapa el foco y se cierra con Esc. */
export function Dialogo({
  abierto,
  titulo,
  alCerrar,
  alConfirmar,
  children,
  acciones,
}: DialogoProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) dialogo.showModal();
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    alConfirmar();
  };

  return (
    <dialog
      ref={ref}
      className={estilos.dialogo}
      aria-label={titulo}
      onClose={alCerrar}
      onClick={(e) => {
        // Tocar el fondo oscuro (fuera de la caja) cierra.
        if (e.target === ref.current) alCerrar();
      }}>
      <form className={estilos.caja} onSubmit={enviar}>
        <AppText as="h2" variant="title2">
          {titulo}
        </AppText>
        {children}
        <div className={estilos.acciones}>{acciones}</div>
      </form>
    </dialog>
  );
}
