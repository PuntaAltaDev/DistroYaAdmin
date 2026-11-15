import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Titular } from '@/components/ui/editorial';
import type { Proveedor } from '@/features/proveedores/proveedores';

import { DialogoRechazo } from './dialogo-rechazo';
import estilos from './pendientes-screen.module.css';
import { TarjetaPendiente } from './tarjeta-pendiente';

type PendientesScreenProps = {
  /** Del que espera hace más tiempo al más nuevo. */
  pendientes: Proveedor[];
  alAprobar: (id: string) => void;
  alRechazar: (id: string, motivo: string) => void;
};

const acento = (n: number) =>
  n === 0 ? 'Todo al día' : n === 1 ? '1 espera tu respuesta' : `${n} esperan tu respuesta`;

/** Proveedores que se registraron y esperan la aprobación. Se aprueban o se rechazan con un motivo. */
export function PendientesScreen({ pendientes, alAprobar, alRechazar }: PendientesScreenProps) {
  const [rechazando, setRechazando] = useState<Proveedor>();
  const [aviso, setAviso] = useState('');

  const aprobar = (p: Proveedor) => {
    alAprobar(p.id);
    setAviso(`Aprobaste a ${p.razonSocial}. Ya puede elegir su plan.`);
  };

  const rechazar = (p: Proveedor, motivo: string) => {
    alRechazar(p.id, motivo);
    setRechazando(undefined);
    setAviso(`Rechazaste a ${p.razonSocial}. Le llega el motivo en la app.`);
  };

  return (
    <>
      <Titular
        antetitulo="Por revisar"
        titulo="Proveedores pendientes"
        acento={acento(pendientes.length)}
      />

      <div aria-live="polite" className={estilos.aviso}>
        {aviso && (
          <AppText key={aviso} variant="callout" color="primaryText" className={estilos.textoAviso}>
            {aviso}
          </AppText>
        )}
      </div>

      {pendientes.length === 0 ? (
        <AppText color="textSecondary">
          No hay proveedores esperando. Cuando alguien se registre en la app, aparece acá.
        </AppText>
      ) : (
        <ul className={estilos.grilla}>
          {pendientes.map((p) => (
            <TarjetaPendiente
              key={p.id}
              proveedor={p}
              alAprobar={() => aprobar(p)}
              alRechazar={() => setRechazando(p)}
            />
          ))}
        </ul>
      )}

      {rechazando && (
        <DialogoRechazo
          key={rechazando.id}
          proveedor={rechazando}
          alCerrar={() => setRechazando(undefined)}
          alConfirmar={(motivo) => rechazar(rechazando, motivo)}
        />
      )}
    </>
  );
}
