import React from 'react';

const NumerosPares = () => {
    const numerosPares = [];
    for (let i = 1; i <= 10; i++) {
        numerosPares.push(i * 2);
    }

    return (
        <div>
            <h2>Los 10 primeros números pares</h2>
            <ul>
                {numerosPares.map((numero) => (
                    <li>{numero}</li>
                ))}
            </ul>
        </div>
    );
};

export default NumerosPares;
