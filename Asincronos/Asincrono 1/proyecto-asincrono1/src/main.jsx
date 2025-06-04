import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Renderiza el componente App dentro del elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // Activa comprobaciones adicionales en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>
);