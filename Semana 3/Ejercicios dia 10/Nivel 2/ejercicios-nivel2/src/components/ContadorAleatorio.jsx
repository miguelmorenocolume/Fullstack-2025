import React, { useState, useEffect } from 'react';

function ContadorAleatorio() {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
            setContador(prev => prev + numeroAleatorio);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div>
            <h1>Contador: {contador}</h1>
        </div>
    );
}

export default ContadorAleatorio;
