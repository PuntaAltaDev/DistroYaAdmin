import { createContext, use, useMemo, useReducer, type ReactNode } from 'react';

import { proveedoresDePrueba } from '@/data/proveedores';

import { aplicar, desdeApi, type Proveedor } from './proveedores';

/**
 * Proveedores en uso (en memoria). Hoy salen de `data/proveedores.ts` y cada acción cambia la lista
 * acá mismo. Con la API: la lista viene del servidor y cada función llama a su endpoint y,
 * si sale bien, aplica el cambio. Las pantallas no cambian.
 */
type Proveedores = {
  lista: Proveedor[];
  aprobar: (id: string) => void;
  rechazar: (id: string, motivo: string) => void;
  activar: (id: string) => void;
  desactivar: (id: string) => void;
};

const ProveedoresContext = createContext<Proveedores | null>(null);

export function ProveedoresProvider({ children }: { children: ReactNode }) {
  const [lista, despachar] = useReducer(aplicar, undefined, () =>
    proveedoresDePrueba().map(desdeApi),
  );

  const valor = useMemo<Proveedores>(
    () => ({
      lista,
      aprobar: (id) => despachar({ tipo: 'aprobar', id }),
      rechazar: (id, motivo) => despachar({ tipo: 'rechazar', id, motivo }),
      activar: (id) => despachar({ tipo: 'activar', id }),
      desactivar: (id) => despachar({ tipo: 'desactivar', id }),
    }),
    [lista],
  );

  return <ProveedoresContext value={valor}>{children}</ProveedoresContext>;
}

export function useProveedores() {
  const valor = use(ProveedoresContext);
  if (!valor) throw new Error('useProveedores va dentro de <ProveedoresProvider>');
  return valor;
}
