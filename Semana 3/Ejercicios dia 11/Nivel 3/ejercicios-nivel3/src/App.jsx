
import { useEffect, useState } from "react";
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [animatedTheme, setAnimatedTheme] = useState(() => {
    return localStorage.getItem("animatedTheme") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("animatedTheme", animatedTheme);
  }, [darkMode, animatedTheme]);

  const toggleMode = () => setDarkMode(prev => !prev);
  const toggleAnimation = () => setAnimatedTheme(prev => !prev);

  const themeClass = `${darkMode ? "dark" : "light"} ${animatedTheme ? "animated" : "static"
    }`;

  return (
    <div className={`app ${themeClass}`}>
      <h1>Modo {darkMode ? "Oscuro" : "Claro"}</h1>
      <button onClick={toggleMode}>
        Cambiar a modo {darkMode ? "Claro" : "Oscuro"}
      </button>
      <button onClick={toggleAnimation}>
        Tema {animatedTheme ? "Estático" : "Animado"}
      </button>
      <p>Este es un ejemplo de una app con cambio de tema y persistencia.</p>
    </div>
  );
}


export default App;