/**
 * Datos guardados en el navegador (localStorage), como JSON.
 * Puede fallar (ventana privada, sitio bloqueado): en ese caso se sigue sin guardar.
 */
const PREFIJO = 'distroya-admin:';

export function leer(clave: string): unknown {
  try {
    const texto = localStorage.getItem(PREFIJO + clave);
    return texto === null ? undefined : JSON.parse(texto);
  } catch {
    return undefined;
  }
}

export function guardar(clave: string, valor: unknown) {
  try {
    localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
  } catch {
    // Sin almacenamiento: queda solo en memoria.
  }
}

export function borrar(clave: string) {
  try {
    localStorage.removeItem(PREFIJO + clave);
  } catch {
    // Nada que borrar.
  }
}
