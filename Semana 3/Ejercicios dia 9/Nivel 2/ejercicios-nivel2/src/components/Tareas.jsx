import React from 'react';

const Tarea = ({ texto, completada }) => {
    const estiloTarea = {
        textDecoration: completada ? 'line-through' : 'none',
        color: completada ? 'gray' : 'black',
    };

    return <p style={estiloTarea}>{texto}</p>;
};

export default Tarea;