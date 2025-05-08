import React, { useState } from 'react';

function DivInteractivo() {
  const [color, setColor] = useState('lightgray');

  const manejarMouseEnter = () => setColor('skyblue');
  const manejarMouseLeave = () => setColor('lightgray');

  return (
    <div
      onMouseEnter={manejarMouseEnter}
      onMouseLeave={manejarMouseLeave}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: color,
        textAlign: 'center',
        lineHeight: '200px',
        border: '1px solid #ccc',
      }}
    >
      Pasa el mouse aquí
    </div>
  );
}

export default DivInteractivo;
