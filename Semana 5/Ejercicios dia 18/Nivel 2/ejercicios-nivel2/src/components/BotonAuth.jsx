import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { LanguageContext } from './context/LanguageContext';

const BotonAuth = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);

  const label = isLoggedIn
    ? language === 'es' ? 'Cerrar sesión' : 'Log out'
    : language === 'es' ? 'Iniciar sesión' : 'Log in';

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <button onClick={toggleLogin}>{label}</button>
    </div>
  );
};

export default BotonAuth;
