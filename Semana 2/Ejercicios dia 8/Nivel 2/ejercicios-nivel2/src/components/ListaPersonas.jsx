import { useState } from 'react';
import './lista.css';

function ListaPersonas({ personas }) {
    const [filtro, setFiltro] = useState('');

    const personasFiltradas = personas.filter((persona) =>
        persona.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Filtrar personas"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            <ul>
                {personasFiltradas.map((persona) => (
                    <li key={persona.id}>
                        {persona.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaPersonas;
