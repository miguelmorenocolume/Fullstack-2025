import { useState } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 40));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));

  const themeClass = darkMode ? "app dark" : "app light";
  const toggleClass = darkMode ? "button toggle-dark" : "button toggle-light";

  return (
    <div className={themeClass} style={{ fontSize: `${fontSize}px` }}>
      <h1>App de Estilos Dinámicos</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div>
        <button onClick={toggleDarkMode} className={toggleClass}>
          Cambiar a Modo {darkMode ? "Claro" : "Oscuro"}
        </button>
      </div>

      <div>
        <button onClick={decreaseFont} className="button decrease">
          Disminuir Texto
        </button>
        <button onClick={increaseFont} className="button increase">
          Aumentar Texto
        </button>
      </div>
    </div>
  );
}

export default App
