import { useState } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Etiqueta } from '@/components/ui/chip';
import { Insignia, type Tono } from '@/components/ui/insignia';
import { fechaCorta } from '@/lib/fechas';
import {
  diasRestantes,
  estadoDe,
  type EstadoSuscripcion,
  type Suscripcion,
} from '@/features/suscripcion/datos';

import estilos from './piezas.module.css';
import { NOMBRE_ESTADO, type EstadoProveedor } from './proveedores';

const TONO_ESTADO: Record<EstadoProveedor, Tono> = {
  pendiente: 'acento',
  activo: 'exito',
  inactivo: 'neutro',
  rechazado: 'peligro',
};

/** Estado del proveedor con su color. */
export function InsigniaEstado({ estado }: { estado: EstadoProveedor }) {
  return <Insignia tono={TONO_ESTADO[estado]}>{NOMBRE_ESTADO[estado]}</Insignia>;
}

const TONO_PLAN: Record<EstadoSuscripcion, Tono> = {
  'por-empezar': 'neutro',
  activa: 'exito',
  'por-vencer': 'acento',
  vencida: 'peligro',
};

function textoPlan(s: Suscripcion, ahora: Date) {
  const estado = estadoDe(s, ahora);
  if (estado === 'por-empezar') return `Empieza el ${fechaCorta(s.startDate)}`;
  if (estado === 'vencida') return `Venció el ${fechaCorta(s.endDate)}`;
  const dias = diasRestantes(s, ahora);
  if (estado === 'por-vencer') return dias === 1 ? 'Vence mañana' : `Vence en ${dias} días`;
  return `Vence el ${fechaCorta(s.endDate)}`;
}

/** Plan del proveedor: nombre y vencimiento, con el color de su estado. */
export function PlanProveedor({ suscripcion }: { suscripcion?: Suscripcion }) {
  const [ahora] = useState(() => new Date());
  if (!suscripcion)
    return (
      <AppText variant="footnote" color="textMuted">
        Sin plan
      </AppText>
    );
  return (
    <div className={estilos.columna}>
      <AppText variant="callout">{suscripcion.planName}</AppText>
      <Insignia tono={TONO_PLAN[estadoDe(suscripcion, ahora)]}>
        {textoPlan(suscripcion, ahora)}
      </Insignia>
    </div>
  );
}

/** Rubros del proveedor, como etiquetas. */
export function Rubros({ rubros }: { rubros: string[] }) {
  return (
    <div className={estilos.rubros}>
      {rubros.map((r) => (
        <Etiqueta key={r} label={r} />
      ))}
    </div>
  );
}
