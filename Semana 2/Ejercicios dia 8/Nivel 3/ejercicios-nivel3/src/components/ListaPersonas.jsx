import { useState } from 'react';
import './lista.css';

function ListaPersonas({ personas }) {
    const [edadFiltro, setEdadFiltro] = useState('');

    const personasFiltradas = personas.filter((persona) => persona.edad < edadFiltro);

    return (
        <div>
            <label>
                Filtrar por edad menor a:
                <input
                    type="number"
                    value={edadFiltro}
                    onChange={(e) => setEdadFiltro(Number(e.target.value))}
                />
            </label>
            <p>Personas que cumplen la condición: {personasFiltradas.length}</p>
            <ul>
                {personasFiltradas.map((persona) => (
                    <li key={persona.id}>
                        {persona.nombre} - {persona.edad} años
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaPersonas;
