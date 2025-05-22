import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

const MostrarUsuario = () => {
  const { username } = useContext(UserContext);

  return <h1>Hola, {username}!</h1>;
};

export default MostrarUsuario;
