import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { BarraSuperior } from '@/components/ui/editorial';
import { Logo } from '@/components/ui/logo';

import estilos from './entrar-screen.module.css';

type EntrarScreenProps = {
  /** Abre el login de Microsoft. Si falla, la pantalla muestra el error. */
  alEntrar: () => Promise<void>;
};

/** Entrada al panel: logo, nombre, frase y "Entrar con Microsoft". */
export function EntrarScreen({ alEntrar }: EntrarScreenProps) {
  const [entrando, setEntrando] = useState(false);
  const [error, setError] = useState(false);

  const entrar = async () => {
    setEntrando(true);
    setError(false);
    try {
      await alEntrar();
    } catch {
      setError(true);
      setEntrando(false);
    }
  };

  return (
    <div className={estilos.pantalla}>
      <BarraSuperior />
      <main className={estilos.centro}>
        <Logo />
        <div className={estilos.textos}>
          <AppText variant="overline" color="primaryText" className={estilos.mayusculas}>
            Panel de administración
          </AppText>
          <AppText as="h1" variant="largeTitle">
            DistroYa
          </AppText>
          <AppText variant="display" color="accent">
            Proveedores y comercios, conectados.
          </AppText>
        </div>
        <AppText color="textSecondary">
          Entrá con la cuenta de Microsoft de la organización para revisar proveedores, planes y
          avisos.
        </AppText>
        <Boton onClick={entrar} disabled={entrando} className={estilos.boton}>
          {entrando ? 'Entrando…' : 'Entrar con Microsoft'}
        </Boton>
        <div aria-live="polite">
          {error && (
            <AppText variant="footnote" color="danger">
              No pudimos entrar. Probá de nuevo en un momento.
            </AppText>
          )}
        </div>
        {import.meta.env.DEV && (
          <AppText variant="footnote" color="textMuted">
            Prueba: el acceso está simulado y entra sin pedir nada.
          </AppText>
        )}
      </main>
    </div>
  );
}
