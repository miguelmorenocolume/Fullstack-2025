import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const CambiarTema = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <h1>Tema actual: {theme}</h1>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  );
};

export default CambiarTema;
