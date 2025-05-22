import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isSet, setIsSet] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      setIsSet(true);
    }
  };

  if (!isSet) {
    return (
      <div style={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <label>
            Ingresa tu nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <button type="submit" style={{ marginLeft: '1rem' }}>Confirmar</button>
        </form>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ username }}>
      {children}
    </UserContext.Provider>
  );
};
