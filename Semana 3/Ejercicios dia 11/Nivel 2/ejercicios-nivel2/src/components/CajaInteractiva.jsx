import { useState } from 'react';
import './CajaInteractiva.css';

function CajaInteractiva() {
  const [agrandado, setAgrandado] = useState(false);

  const manejarClick = () => {
    setAgrandado(!agrandado);
  };

  return (
    <div className="contenedor">
      <div className={`caja ${agrandado ? 'grande' : ''}`}></div>
      <button onClick={manejarClick}>
        {agrandado ? 'Reducir tamaño' : 'Aumentar tamaño'}
      </button>
    </div>
  );
}

export default CajaInteractiva;
