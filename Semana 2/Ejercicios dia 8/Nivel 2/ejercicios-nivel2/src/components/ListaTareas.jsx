import { useState } from 'react';

function ListaTareas({ tareas }) {

    const [listaTareas, setListaTareas] = useState(tareas);

    function eliminarTarea(id) {
        const nuevasTareas = listaTareas.filter(tarea => tarea.id !== id);
        setListaTareas(nuevasTareas);
    }

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul>
                {listaTareas.map(tarea => (
                    <li key={tarea.id}>
                        {tarea.texto}
                        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                    </li>
                ))}
                {listaTareas.length === 0 && <p>No hay tareas.</p>}
            </ul>
        </div>
    );
}

export default ListaTareas;
