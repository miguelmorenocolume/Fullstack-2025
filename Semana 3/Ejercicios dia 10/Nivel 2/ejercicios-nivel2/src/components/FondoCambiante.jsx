import React, { useState, useEffect } from 'react';

function FondoCambiante() {
    const [color, setColor] = useState('#ffffff');

    useEffect(() => {
        const cambiarColor = () => {
            const nuevoColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            setColor(nuevoColor);
        };

        const intervalo = setInterval(cambiarColor, 3000);

        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color]);

    return (
        <div>
            <h1>Color de fondo: {color}</h1>
        </div>
    );
}

export default FondoCambiante;
