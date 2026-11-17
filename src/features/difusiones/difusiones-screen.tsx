import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Titular } from '@/components/ui/editorial';
import type { Proveedor } from '@/features/proveedores/proveedores';

import { cuantos, destinatariosPosibles, type Difusion, type Entrada } from './difusiones';
import estilos from './difusiones-screen.module.css';
import { FormularioDifusion } from './formulario-difusion';
import { HistorialDifusiones } from './historial-difusiones';

type DifusionesScreenProps = {
  lista: Proveedor[];
  /** De la más nueva a la más vieja. */
  historial: Difusion[];
  /** Manda la difusión. Devuelve la enviada, o nada si no era válida. */
  alEnviar: (entrada: Entrada, posibles: Proveedor[]) => Difusion | undefined;
};

const acento = (n: number) => (n === 1 ? '1 enviada' : `${n} enviadas`);

/** Avisos del Admin a los proveedores: el formulario para mandar y el historial de lo enviado. */
export function DifusionesScreen({ lista, historial, alEnviar }: DifusionesScreenProps) {
  const [aviso, setAviso] = useState('');
  const posibles = destinatariosPosibles(lista);

  const enviar = (entrada: Entrada) => {
    const enviada = alEnviar(entrada, posibles);
    if (enviada) setAviso(`Enviaste “${enviada.titulo}” a ${cuantos(enviada.cantidad)}.`);
  };

  return (
    <>
      <Titular antetitulo="Avisos" titulo="Difusiones" acento={acento(historial.length)} />

      <div aria-live="polite" className={estilos.aviso}>
        {aviso && (
          <AppText key={aviso} variant="callout" color="primaryText" className={estilos.textoAviso}>
            {aviso}
          </AppText>
        )}
      </div>

      <section className={estilos.seccion} aria-labelledby="nueva">
        <AppText as="h2" variant="title2" id="nueva">
          Nueva difusión
        </AppText>
        <FormularioDifusion posibles={posibles} alEnviar={enviar} />
      </section>

      <section className={estilos.seccion} aria-labelledby="historial">
        <AppText as="h2" variant="title2" id="historial">
          Enviadas
        </AppText>
        <HistorialDifusiones historial={historial} lista={lista} />
      </section>
    </>
  );
}
