import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// --- ESTILOS DE PRIMEREACT & PRIMEFLEX  ---
import "primereact/resources/themes/lara-dark-cyan/theme.css";  // Tema premium oscuro
import "primereact/resources/primereact.min.css";               // Estilos principales de componentes
import "primeicons/primeicons.css";                             // Iconos oficiales
import "primeflex/primeflex.css";                               // Grid y utilidades de CSS

// Estilos globales (vacío por ahora)
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
