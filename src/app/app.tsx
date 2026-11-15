import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { CuentaProvider } from '@/features/cuenta/sesion-provider';
import { ProveedoresProvider } from '@/features/proveedores/proveedores-provider';
import { TemaProvider } from '@/theme';

import { Entrar } from './entrar';
import { Panel } from './panel';
import { Pendientes } from './pendientes';
import { Proveedores } from './proveedores';

/**
 * Rutas del Admin. Sin sesión solo existe `/entrar`; con sesión, el panel (`/pendientes`,
 * `/proveedores`). Cualquier otra dirección lleva a la que corresponde.
 */
export function App() {
  return (
    <TemaProvider>
      <CuentaProvider>
        <ProveedoresProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/entrar" element={<Entrar />} />
              <Route element={<Panel />}>
                <Route path="/pendientes" element={<Pendientes />} />
                <Route path="/proveedores" element={<Proveedores />} />
              </Route>
              <Route path="*" element={<Navigate to="/pendientes" replace />} />
            </Routes>
          </BrowserRouter>
        </ProveedoresProvider>
      </CuentaProvider>
    </TemaProvider>
  );
}
