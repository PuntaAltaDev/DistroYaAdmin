import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { CampoLinea } from '@/components/ui/campo-linea';
import { Dialogo } from '@/components/ui/dialogo';
import { MOTIVO_MAX, errorDelMotivo, type Proveedor } from '@/features/proveedores/proveedores';

type DialogoRechazoProps = {
  proveedor: Proveedor;
  alCerrar: () => void;
  alConfirmar: (motivo: string) => void;
};

/** Pide el motivo del rechazo. El proveedor lo lee en su app para corregir y reenviar. */
export function DialogoRechazo({ proveedor, alCerrar, alConfirmar }: DialogoRechazoProps) {
  const [motivo, setMotivo] = useState('');
  const [intento, setIntento] = useState(false);
  const error = errorDelMotivo(motivo);

  const confirmar = () => {
    if (error) {
      setIntento(true);
      return;
    }
    alConfirmar(motivo.trim());
  };

  return (
    <Dialogo
      abierto
      titulo={`Rechazar a ${proveedor.razonSocial}`}
      alCerrar={alCerrar}
      alConfirmar={confirmar}
      acciones={
        <>
          <Boton variante="secundario" onClick={alCerrar}>
            Cancelar
          </Boton>
          <Boton variante="peligro" type="submit">
            Rechazar
          </Boton>
        </>
      }>
      <AppText color="textSecondary">
        El proveedor ve este motivo en la app, corrige lo que haga falta y vuelve a enviar.
      </AppText>
      <CampoLinea
        etiqueta="Motivo"
        valor={motivo}
        alCambiar={setMotivo}
        multilinea
        autoFocus
        maxLength={MOTIVO_MAX}
        placeholder="Ej.: La lista de precios no se puede leer. Subila de nuevo en PDF."
        error={intento ? error : undefined}
        ayuda={`${motivo.trim().length} / ${MOTIVO_MAX}`}
      />
    </Dialogo>
  );
}
