import { AppText } from '@/components/ui/app-text';
import type { Proveedor } from '@/features/proveedores/proveedores';
import { fechaHora } from '@/lib/fechas';

import { cuantos, textoDestinatarios, type Difusion } from './difusiones';
import estilos from './historial-difusiones.module.css';

type HistorialDifusionesProps = {
  /** De la más nueva a la más vieja. */
  historial: Difusion[];
  /** Para poner el nombre de los proveedores a los que se mandó. */
  lista: Proveedor[];
};

/** Lo que se mandó: fecha, título, mensaje, a quiénes y a cuántos. */
export function HistorialDifusiones({ historial, lista }: HistorialDifusionesProps) {
  if (historial.length === 0)
    return (
      <AppText color="textSecondary">
        Todavía no mandaste ninguna. Lo que envíes aparece acá.
      </AppText>
    );

  return (
    <ul className={estilos.lista}>
      {historial.map((d) => (
        <li key={d.id} className={estilos.item}>
          <div className={estilos.cabecera}>
            <AppText as="h3" variant="headline">
              {d.titulo}
            </AppText>
            <AppText variant="footnote" color="textSecondary">
              {fechaHora(d.fecha)}
            </AppText>
          </div>
          <AppText color="textSecondary">{d.texto}</AppText>
          <AppText variant="footnote" color="primaryText">
            {textoDestinatarios(d, lista)} · {cuantos(d.cantidad)}
          </AppText>
        </li>
      ))}
    </ul>
  );
}
