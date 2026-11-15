import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { InsigniaEstado, PlanProveedor, Rubros } from '@/features/proveedores/piezas';
import { visibleEnBuscador, type Proveedor } from '@/features/proveedores/proveedores';

import estilos from './listado-screen.module.css';

type FilaProveedorProps = {
  proveedor: Proveedor;
  alActivar: () => void;
  alDesactivar: () => void;
  alRevisar: () => void;
};

/** Qué se puede hacer según el estado: revisar, activar o desactivar. */
function Accion({ proveedor: p, alActivar, alDesactivar, alRevisar }: FilaProveedorProps) {
  switch (p.estado) {
    case 'pendiente':
      return (
        <Boton variante="texto" onClick={alRevisar}>
          Revisar
        </Boton>
      );
    case 'activo':
      return (
        <Boton variante="secundario" onClick={alDesactivar}>
          Desactivar
        </Boton>
      );
    case 'inactivo':
      return (
        <Boton variante="secundario" onClick={alActivar}>
          Activar
        </Boton>
      );
    case 'rechazado':
      return null;
  }
}

/** Un proveedor en la tabla: nombre, rubros, estado, plan y su acción. */
export function FilaProveedor(props: FilaProveedorProps) {
  const p = props.proveedor;
  return (
    <tr className={estilos.fila}>
      <td>
        <AppText variant="callout">{p.razonSocial}</AppText>
        <AppText variant="footnote" color="textSecondary">
          {p.localidad} · {p.email}
        </AppText>
      </td>
      <td>
        <Rubros rubros={p.rubros} />
      </td>
      <td>
        <div className={estilos.columna}>
          <InsigniaEstado estado={p.estado} />
          {p.estado === 'rechazado' && p.motivoRechazo && (
            <AppText variant="footnote" color="textSecondary" className={estilos.motivo}>
              “{p.motivoRechazo}”
            </AppText>
          )}
          {p.estado === 'activo' && !visibleEnBuscador(p) && (
            <AppText variant="footnote" color="textMuted">
              No aparece en el buscador
            </AppText>
          )}
        </div>
      </td>
      <td>
        <PlanProveedor suscripcion={p.suscripcion} />
      </td>
      <td className={estilos.celdaAccion}>
        <Accion {...props} />
      </td>
    </tr>
  );
}
