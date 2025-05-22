import React, { useContext } from 'react';
import { LanguageContext } from './context/LanguageContext';

const CambiarIdioma = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <button onClick={toggleLanguage}>
        Cambiar a {language === 'es' ? 'English' : 'Español'}
      </button>
    </div>
  );
};

export default CambiarIdioma;
