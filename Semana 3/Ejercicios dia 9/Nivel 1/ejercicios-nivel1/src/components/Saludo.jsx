import React from 'react';

function Saludo({ nombre }) {

    return (
        <div class="container">

            <h1>Hola, {nombre}!</h1>
        </div>
    );
};

export default Saludo;