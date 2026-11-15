import { useNavigate } from 'react-router';

import { ListadoScreen } from '@/features/listado/listado-screen';
import { useProveedores } from '@/features/proveedores/proveedores-provider';

/** "/proveedores": todos los proveedores, con su estado y su plan. */
export function Proveedores() {
  const { lista, activar, desactivar } = useProveedores();
  const navigate = useNavigate();
  return (
    <ListadoScreen
      lista={lista}
      alActivar={activar}
      alDesactivar={desactivar}
      alRevisar={() => navigate('/pendientes')}
    />
  );
}
