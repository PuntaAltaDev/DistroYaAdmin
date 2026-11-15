import { Navigate } from 'react-router';

import { entrarConMicrosoft } from '@/features/acceso/acceso';
import { EntrarScreen } from '@/features/acceso/entrar-screen';
import { useCuenta } from '@/features/cuenta/sesion-provider';

/** "/entrar". Con sesión ya abierta, lleva al panel. */
export function Entrar() {
  const { sesion, iniciar } = useCuenta();
  if (sesion) return <Navigate to="/pendientes" replace />;
  return <EntrarScreen alEntrar={async () => iniciar(await entrarConMicrosoft())} />;
}
