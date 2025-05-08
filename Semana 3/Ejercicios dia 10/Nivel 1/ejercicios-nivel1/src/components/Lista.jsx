import React, { useState } from 'react';

function Lista() {
    const [items, setItems] = useState([]);
    const [valor, setValor] = useState('');

    const agregar = () => {
        if (valor.trim()) {
            setItems([...items, valor]);
            setValor('');
        }
    };

    return (
        <>
            <h1>Lista</h1>
            <input value={valor} onChange={e => setValor(e.target.value)} />
            <button onClick={agregar}>Agregar</button>
            <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
        </>
    );
}

export default Lista;
