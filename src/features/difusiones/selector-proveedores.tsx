import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { CampoLinea } from '@/components/ui/campo-linea';
import { Casilla } from '@/components/ui/casilla';
import { filtrar, type Proveedor } from '@/features/proveedores/proveedores';

import estilos from './selector-proveedores.module.css';

type SelectorProveedoresProps = {
  posibles: Proveedor[];
  elegidos: string[];
  alCambiar: (ids: string[]) => void;
  error?: string;
};

/** Lista con casillas para elegir a qué proveedores va la difusión. Se puede buscar por nombre. */
export function SelectorProveedores({
  posibles,
  elegidos,
  alCambiar,
  error,
}: SelectorProveedoresProps) {
  const [texto, setTexto] = useState('');
  const visibles = filtrar(posibles, { texto, estado: 'todos' });

  const alternar = (id: string, marcada: boolean) =>
    alCambiar(marcada ? [...elegidos, id] : elegidos.filter((x) => x !== id));

  // "Marcar" y "Quitar" se aplican a lo que se ve, así sirven junto con la búsqueda.
  const marcarVisibles = () => alCambiar([...new Set([...elegidos, ...visibles.map((p) => p.id)])]);
  const quitarVisibles = () => {
    const ids = new Set(visibles.map((p) => p.id));
    alCambiar(elegidos.filter((id) => !ids.has(id)));
  };

  return (
    <div className={estilos.selector}>
      <CampoLinea
        etiqueta="Buscar proveedor"
        type="search"
        icono="buscar"
        valor={texto}
        alCambiar={setTexto}
        placeholder="Nombre, rubro o localidad"
      />
      <div className={estilos.barra}>
        <AppText variant="footnote" color={error ? 'danger' : 'textSecondary'} role="status">
          {error ?? `${elegidos.length} de ${posibles.length} elegidos`}
        </AppText>
        <div className={estilos.acciones}>
          <Boton variante="texto" onClick={marcarVisibles}>
            Marcar {texto ? 'los que se ven' : 'todos'}
          </Boton>
          <Boton variante="texto" onClick={quitarVisibles}>
            Quitar {texto ? 'los que se ven' : 'todos'}
          </Boton>
        </div>
      </div>
      <div className={estilos.lista} role="group" aria-label="Proveedores">
        {visibles.map((p) => (
          <Casilla
            key={p.id}
            marcada={elegidos.includes(p.id)}
            alCambiar={(marcada) => alternar(p.id, marcada)}>
            <span>{p.razonSocial}</span>
            <AppText as="span" variant="footnote" color="textSecondary">
              {p.localidad} · {p.rubros.join(', ')}
            </AppText>
          </Casilla>
        ))}
        {visibles.length === 0 && (
          <AppText color="textSecondary" className={estilos.vacio}>
            No hay proveedores con esa búsqueda.
          </AppText>
        )}
      </div>
    </div>
  );
}
