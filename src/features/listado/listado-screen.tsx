import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { CampoLinea } from '@/components/ui/campo-linea';
import { Chip } from '@/components/ui/chip';
import { Titular } from '@/components/ui/editorial';
import {
  ESTADOS,
  NOMBRE_ESTADO_PLURAL,
  contarPorEstado,
  filtrar,
  visibleEnBuscador,
  type Filtro,
  type Proveedor,
} from '@/features/proveedores/proveedores';
import { typeClass } from '@/theme';

import estilos from './listado-screen.module.css';
import { FilaProveedor } from './fila-proveedor';

type ListadoScreenProps = {
  lista: Proveedor[];
  alActivar: (id: string) => void;
  alDesactivar: (id: string) => void;
  /** Ir a la pantalla de pendientes. */
  alRevisar: () => void;
};

/** Todos los proveedores, con su estado y su plan. Desde acá se activa o desactiva el comercio. */
export function ListadoScreen({ lista, alActivar, alDesactivar, alRevisar }: ListadoScreenProps) {
  const [filtro, setFiltro] = useState<Filtro>({ texto: '', estado: 'todos' });
  const [aviso, setAviso] = useState('');

  const cuenta = contarPorEstado(lista);
  const visibles = lista.filter((p) => visibleEnBuscador(p)).length;
  const resultado = filtrar(lista, filtro);

  const activar = (p: Proveedor) => {
    alActivar(p.id);
    setAviso(`Activaste a ${p.razonSocial}.`);
  };
  const desactivar = (p: Proveedor) => {
    alDesactivar(p.id);
    setAviso(`Desactivaste a ${p.razonSocial}: ya no aparece en el buscador.`);
  };

  return (
    <>
      <Titular
        antetitulo="Directorio"
        titulo="Proveedores"
        acento={`${visibles} de ${lista.length} en el buscador`}
      />

      <div className={estilos.filtros}>
        <div className={estilos.buscador}>
          <CampoLinea
            etiqueta="Buscar"
            type="search"
            icono="buscar"
            valor={filtro.texto}
            alCambiar={(texto) => setFiltro((f) => ({ ...f, texto }))}
            placeholder="Nombre, rubro, localidad o email"
          />
        </div>
        <div className={estilos.chips} role="group" aria-label="Filtrar por estado">
          <Chip
            label="Todos"
            contador={cuenta.todos}
            selected={filtro.estado === 'todos'}
            onToggle={() => setFiltro((f) => ({ ...f, estado: 'todos' }))}
          />
          {ESTADOS.map((e) => (
            <Chip
              key={e}
              label={NOMBRE_ESTADO_PLURAL[e]}
              contador={cuenta[e]}
              selected={filtro.estado === e}
              onToggle={() => setFiltro((f) => ({ ...f, estado: f.estado === e ? 'todos' : e }))}
            />
          ))}
        </div>
      </div>

      <div aria-live="polite" className={estilos.aviso}>
        {aviso && (
          <AppText key={aviso} variant="callout" color="primaryText" className={estilos.textoAviso}>
            {aviso}
          </AppText>
        )}
      </div>

      <div className={estilos.marcoTabla}>
        <table className={estilos.tabla}>
          <thead>
            <tr>
              <th scope="col" className={typeClass('overline')}>
                Proveedor
              </th>
              <th scope="col" className={typeClass('overline')}>
                Rubros
              </th>
              <th scope="col" className={typeClass('overline')}>
                Estado
              </th>
              <th scope="col" className={typeClass('overline')}>
                Plan
              </th>
              <th scope="col" className={typeClass('overline')}>
                <span className="solo-lector">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {resultado.map((p) => (
              <FilaProveedor
                key={p.id}
                proveedor={p}
                alActivar={() => activar(p)}
                alDesactivar={() => desactivar(p)}
                alRevisar={alRevisar}
              />
            ))}
          </tbody>
        </table>
        {resultado.length === 0 && (
          <AppText color="textSecondary" className={estilos.vacio}>
            No hay proveedores con esa búsqueda.
          </AppText>
        )}
      </div>
    </>
  );
}
