import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './theme/base.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';
import { aplicarEsquema, cssDelTema } from './theme';

// Las variables del tema y el modo claro/oscuro, antes de dibujar (así no parpadea).
const estilo = document.createElement('style');
estilo.textContent = cssDelTema();
document.head.append(estilo);
aplicarEsquema();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
