import React, { useContext } from 'react';
import { CounterContext } from './context/CounterContext';
import { ThemeContext } from './context/ThemeContext';

const Contador = () => {
  const { count, increment, decrement } = useContext(CounterContext);
  const { theme } = useContext(ThemeContext);

  const styles = {
    backgroundColor: theme === 'light' ? '#eee' : '#333',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '1rem auto',
    width: '200px'
  };

  return (
    <div style={styles}>
      <h2>Contador: {count}</h2>
      <button onClick={decrement} style={{ marginRight: '1rem' }}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Contador;
