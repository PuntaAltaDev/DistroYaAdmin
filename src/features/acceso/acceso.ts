import { ADMIN_DE_PRUEBA } from '@/data/admin';
import type { Sesion } from '@/features/cuenta/sesion';

/** Lo que tarda el acceso simulado, para ver el estado "Entrando…". */
const DEMORA_SIMULADA = 600;

/**
 * Entrar con Microsoft (Entra External ID, rol Admin). **Simulado**: entra sin pedir nada.
 * Con el login de Seba (tenant, client ID y scopes), esta función abre el login de Microsoft
 * y arma la sesión con lo que trae el token. La pantalla queda igual.
 */
export async function entrarConMicrosoft(): Promise<Sesion> {
  await new Promise((listo) => setTimeout(listo, DEMORA_SIMULADA));
  return { ...ADMIN_DE_PRUEBA, desde: new Date() };
}
