import { useState, type FormEvent } from 'react';

import { AppText } from '@/components/ui/app-text';
import { Boton } from '@/components/ui/boton';
import { CampoLinea } from '@/components/ui/campo-linea';
import { Chip } from '@/components/ui/chip';
import { Dialogo } from '@/components/ui/dialogo';
import type { Proveedor } from '@/features/proveedores/proveedores';

import {
  TEXTO_MAX,
  TITULO_MAX,
  cuantos,
  errorDeDestinatarios,
  errorDelTexto,
  errorDelTitulo,
  idsDestino,
  type Destinatarios,
  type Entrada,
} from './difusiones';
import estilos from './formulario-difusion.module.css';
import { SelectorProveedores } from './selector-proveedores';

type FormularioDifusionProps = {
  /** Los proveedores a los que puede llegar. */
  posibles: Proveedor[];
  /** Manda la difusión. Se llama después de confirmar. */
  alEnviar: (entrada: Entrada) => void;
};

/** Título, mensaje y destinatarios. Antes de mandar pide confirmar, porque no se puede deshacer. */
export function FormularioDifusion({ posibles, alEnviar }: FormularioDifusionProps) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [todos, setTodos] = useState(true);
  const [elegidos, setElegidos] = useState<string[]>([]);
  const [intento, setIntento] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const destinatarios: Destinatarios = todos
    ? { tipo: 'todos' }
    : { tipo: 'algunos', ids: elegidos };
  const errorTitulo = errorDelTitulo(titulo);
  const errorTexto = errorDelTexto(texto);
  const errorDestino = errorDeDestinatarios(destinatarios, posibles);
  const cantidad = idsDestino(destinatarios, posibles).length;

  const revisar = (e: FormEvent) => {
    e.preventDefault();
    setIntento(true);
    if (!errorTitulo && !errorTexto && !errorDestino) setConfirmando(true);
  };

  const enviar = () => {
    alEnviar({ titulo, texto, destinatarios });
    setConfirmando(false);
    setTitulo('');
    setTexto('');
    setTodos(true);
    setElegidos([]);
    setIntento(false);
  };

  return (
    <>
      <form className={estilos.formulario} onSubmit={revisar} noValidate>
        <CampoLinea
          etiqueta="Título"
          valor={titulo}
          alCambiar={setTitulo}
          maxLength={TITULO_MAX}
          placeholder="Ej.: Subí tu lista de precios nueva"
          error={intento ? errorTitulo : undefined}
          ayuda={`${titulo.trim().length} / ${TITULO_MAX}`}
        />
        <CampoLinea
          etiqueta="Mensaje"
          valor={texto}
          alCambiar={setTexto}
          multilinea
          maxLength={TEXTO_MAX}
          placeholder="Lo que van a leer en la bandeja de avisos de la app."
          error={intento ? errorTexto : undefined}
          ayuda={`${texto.trim().length} / ${TEXTO_MAX}`}
        />

        <fieldset className={estilos.destinatarios}>
          <legend className={estilos.leyenda}>
            <AppText as="span" variant="overline" color="textSecondary">
              DESTINATARIOS
            </AppText>
          </legend>
          <div className={estilos.opciones} role="group" aria-label="A quiénes se manda">
            <Chip
              label="Todos los proveedores"
              contador={posibles.length}
              selected={todos}
              onToggle={() => setTodos(true)}
            />
            <Chip label="Elegir algunos" selected={!todos} onToggle={() => setTodos(false)} />
          </div>
          {!todos && (
            <SelectorProveedores
              posibles={posibles}
              elegidos={elegidos}
              alCambiar={setElegidos}
              error={intento ? errorDestino : undefined}
            />
          )}
        </fieldset>

        <div>
          <Boton type="submit">Enviar</Boton>
        </div>
      </form>

      <Dialogo
        abierto={confirmando}
        titulo="¿Enviar la difusión?"
        alCerrar={() => setConfirmando(false)}
        alConfirmar={enviar}
        acciones={
          <>
            <Boton variante="secundario" onClick={() => setConfirmando(false)}>
              Volver
            </Boton>
            <Boton type="submit">Enviar a {cuantos(cantidad)}</Boton>
          </>
        }>
        <div className={estilos.vista}>
          <AppText variant="headline">{titulo.trim()}</AppText>
          <AppText color="textSecondary">{texto.trim()}</AppText>
        </div>
        <AppText variant="footnote" color="textSecondary">
          Les llega un aviso a {cuantos(cantidad)}. No se puede deshacer.
        </AppText>
      </Dialogo>
    </>
  );
}
