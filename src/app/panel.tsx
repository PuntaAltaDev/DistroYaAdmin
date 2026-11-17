import { NavLink, Navigate, Outlet } from 'react-router';

import { claseBotonBarra, claseLinkBarra } from '@/components/ui/editorial';
import { Icono } from '@/components/ui/icono';
import { Marco } from '@/components/ui/marco';
import { useCuenta } from '@/features/cuenta/sesion-provider';
import { pendientes } from '@/features/proveedores/proveedores';
import { useProveedores } from '@/features/proveedores/proveedores-provider';

/** Las pantallas del panel: solo con sesión. Sin sesión, lleva a "/entrar". */
export function Panel() {
  const { sesion, cerrar } = useCuenta();
  const { lista } = useProveedores();
  if (!sesion) return <Navigate to="/entrar" replace />;

  const porRevisar = pendientes(lista).length;

  return (
    <Marco
      navegacion={
        <>
          <NavLink to="/pendientes" className={({ isActive }) => claseLinkBarra(isActive)}>
            Pendientes{porRevisar > 0 && ` · ${porRevisar}`}
          </NavLink>
          <NavLink to="/proveedores" className={({ isActive }) => claseLinkBarra(isActive)}>
            Proveedores
          </NavLink>
          <NavLink to="/difusiones" className={({ isActive }) => claseLinkBarra(isActive)}>
            Difusiones
          </NavLink>
        </>
      }
      derecha={
        <button type="button" className={claseBotonBarra} onClick={cerrar} title={sesion.email}>
          Salir
          <Icono nombre="salir" />
        </button>
      }>
      <Outlet />
    </Marco>
  );
}
