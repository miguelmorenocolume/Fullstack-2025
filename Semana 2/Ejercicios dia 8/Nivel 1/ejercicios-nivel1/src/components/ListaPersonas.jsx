import './lista.css'

function ListaPersonas({ personas }) {
    return (
        <ul>
            {personas.map((persona) => (
                <li key={persona.id}>
                    {persona.nombre} - {persona.edad} años - {persona.ciudad}
                </li>
            ))}
        </ul>
    );
}

export default ListaPersonas;
