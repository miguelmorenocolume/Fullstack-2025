import React from 'react';

const MensajeError = ({ mensaje }) => {
  return <p className="mensaje-error" style={{ color: 'red' }}>{mensaje}</p>;
};

export default MensajeError;
