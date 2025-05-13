import './App.css'
import { useState } from 'react';

function App() {
  const [esRojo, setEsRojo] = useState(true);

  const cambiarColor = () => {
    setEsRojo(!esRojo);
  };

  const estiloBoton = {
    backgroundColor: esRojo ? 'red' : 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div>
      <button style={estiloBoton} onClick={cambiarColor}>
        Cambiar color
      </button>
    </div>
  );
}

export default App;