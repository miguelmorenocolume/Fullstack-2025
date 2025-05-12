import { useState } from 'react';
import './Div.css';

function Div() {
  const [clase, setClase] = useState('container');

  const handleClick = () => {
    setClase('container-tocado');
  };

  const handleDoubleClick = () => {
    setClase('container-doble-tocado');
  };

  return (
    <div
      className={clase}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      ¡Haz clic o doble clic en mí!
    </div>
  );
}

export default Div;
