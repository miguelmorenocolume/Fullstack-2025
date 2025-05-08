import React, { useState } from 'react';

function Formulario() {
    const [valor, setValor] = useState('');
    const [enviado, setEnviado] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        setEnviado(valor);
    };

    return (
        <div>
            <form onSubmit={manejarEnvio}>
                <input
                    type="text"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="Escribe algo"
                />
                <button type="submit">Enviar</button>
            </form>

            {enviado && <p>Valor enviado: {enviado}</p>}
        </div>
    );
}

export default Formulario;
