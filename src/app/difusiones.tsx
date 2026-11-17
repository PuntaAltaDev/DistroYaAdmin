import { DifusionesScreen } from '@/features/difusiones/difusiones-screen';
import { useDifusiones } from '@/features/difusiones/difusiones-provider';
import { useProveedores } from '@/features/proveedores/proveedores-provider';

/** "/difusiones": avisos del Admin a los proveedores y su historial. */
export function Difusiones() {
  const { lista } = useProveedores();
  const { historial, enviar } = useDifusiones();
  return <DifusionesScreen lista={lista} historial={historial} alEnviar={enviar} />;
}
