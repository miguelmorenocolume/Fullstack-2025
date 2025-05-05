import { useState } from 'react';
import './lista.css';

function ListaFrutas({ frutas }) {
    const [listaFrutas, setListaFrutas] = useState(frutas);
    const [nuevaFruta, setNuevaFruta] = useState('');

    const agregarFruta = () => {
        if (nuevaFruta.trim()) {
            setListaFrutas([...listaFrutas, nuevaFruta]);
            setNuevaFruta('');
        }
    };

    return (
        <div>
            <ul>
                {listaFrutas.map((fruta, index) => (
                    <li key={index}>{fruta}</li>
                ))}
            </ul>
            <input
                type="text"
                value={nuevaFruta}
                onChange={(e) => setNuevaFruta(e.target.value)}
                placeholder="Añadir nueva fruta"
            />
            <button onClick={agregarFruta}>Añadir</button>
        </div>
    );
}

export default ListaFrutas;
