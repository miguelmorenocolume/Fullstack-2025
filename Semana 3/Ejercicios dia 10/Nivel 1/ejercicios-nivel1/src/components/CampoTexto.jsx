import React, { useState } from 'react';

function CampoTexto() {
    const [texto, setTexto] = useState('');

    const manejarCambio = (e) => {
        setTexto(e.target.value);
    };

    return (
        <div>
            <input type="text" value={texto} onChange={manejarCambio} />
            <p>Texto actual: {texto}</p>
        </div>
    );
}

export default CampoTexto;
