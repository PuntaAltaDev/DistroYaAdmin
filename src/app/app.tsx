import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { DifusionesProvider } from '@/features/difusiones/difusiones-provider';
import { CuentaProvider } from '@/features/cuenta/sesion-provider';
import { ProveedoresProvider } from '@/features/proveedores/proveedores-provider';
import { TemaProvider } from '@/theme';

import { Difusiones } from './difusiones';
import { Entrar } from './entrar';
import { Panel } from './panel';
import { Pendientes } from './pendientes';
import { Proveedores } from './proveedores';

/**
 * Rutas del Admin. Sin sesión solo existe `/entrar`; con sesión, el panel (`/pendientes`,
 * `/proveedores`, `/difusiones`). Cualquier otra dirección lleva a la que corresponde.
 */
export function App() {
  return (
    <TemaProvider>
      <CuentaProvider>
        <ProveedoresProvider>
          <DifusionesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/entrar" element={<Entrar />} />
                <Route element={<Panel />}>
                  <Route path="/pendientes" element={<Pendientes />} />
                  <Route path="/proveedores" element={<Proveedores />} />
                  <Route path="/difusiones" element={<Difusiones />} />
                </Route>
                <Route path="*" element={<Navigate to="/pendientes" replace />} />
              </Routes>
            </BrowserRouter>
          </DifusionesProvider>
        </ProveedoresProvider>
      </CuentaProvider>
    </TemaProvider>
  );
}
