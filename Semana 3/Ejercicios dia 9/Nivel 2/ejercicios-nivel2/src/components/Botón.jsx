import React from 'react';

const Botón = ({ texto, onClick }) => {
    return (
        <button onClick={onClick}>
            {texto}
        </button>
    );
};

export default Botón;