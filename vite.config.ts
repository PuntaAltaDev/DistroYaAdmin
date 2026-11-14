import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Metro de las apps usa el 8081 (Proveedores) y el 8082 (Clientes): el Admin va en el 5174.
const PUERTO = 5174;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: PUERTO, strictPort: true },
  preview: { port: PUERTO, strictPort: true },
  test: {
    include: ['src/**/__tests__/*-test.ts'],
  },
});
