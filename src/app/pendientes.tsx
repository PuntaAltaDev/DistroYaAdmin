import { PendientesScreen } from '@/features/pendientes/pendientes-screen';
import { pendientes } from '@/features/proveedores/proveedores';
import { useProveedores } from '@/features/proveedores/proveedores-provider';

/** "/pendientes": proveedores que esperan la aprobación. */
export function Pendientes() {
  const { lista, aprobar, rechazar } = useProveedores();
  return (
    <PendientesScreen pendientes={pendientes(lista)} alAprobar={aprobar} alRechazar={rechazar} />
  );
}
