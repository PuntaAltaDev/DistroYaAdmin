import type { ReactNode } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { Icono } from '@/components/ui/icono';
import { Rubros } from '@/features/proveedores/piezas';
import type { Proveedor } from '@/features/proveedores/proveedores';
import { fechaCorta, haceCuanto } from '@/lib/fechas';
import { typeClass } from '@/theme';

import estilos from './tarjeta-pendiente.module.css';

type TarjetaPendienteProps = {
  proveedor: Proveedor;
  alAprobar: () => void;
  alRechazar: () => void;
};

function Dato({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div className={estilos.dato}>
      <dt className={[typeClass('caption'), estilos.etiqueta].join(' ')}>{etiqueta}</dt>
      <dd className={typeClass('subhead')}>{children}</dd>
    </div>
  );
}

/** Todo lo que cargó un proveedor al registrarse, con los botones para aprobarlo o rechazarlo. */
export function TarjetaPendiente({ proveedor: p, alAprobar, alRechazar }: TarjetaPendienteProps) {
  return (
    <li className={estilos.tarjeta}>
      <div className={estilos.cabecera}>
        <AppText as="h2" variant="headline">
          {p.razonSocial}
        </AppText>
        <AppText variant="footnote" color="textSecondary">
          Se registró {haceCuanto(p.fechaAlta)} · {fechaCorta(p.fechaAlta)}
        </AppText>
      </div>

      <Rubros rubros={p.rubros} />

      <dl className={estilos.datos}>
        <Dato etiqueta="Dirección">
          {p.direccion}, {p.localidad}, {p.provincia}
        </Dato>
        <Dato etiqueta="WhatsApp">{p.whatsapp}</Dato>
        {p.telefono && <Dato etiqueta="Teléfono">{p.telefono}</Dato>}
        <Dato etiqueta="Email">
          <a href={`mailto:${p.email}`}>{p.email}</a>
        </Dato>
        <Dato etiqueta="Lista de precios">
          {p.listaUrl ? (
            <a href={p.listaUrl} target="_blank" rel="noreferrer" className={estilos.link}>
              Ver PDF
              <Icono nombre="externo" />
            </a>
          ) : (
            <span className={estilos.falta}>Todavía no la subió</span>
          )}
        </Dato>
      </dl>

      <div className={estilos.acciones}>
        <Boton onClick={alAprobar}>Aprobar</Boton>
        <Boton variante="peligro" onClick={alRechazar}>
          Rechazar
        </Boton>
      </div>
    </li>
  );
}
