import './lista.css'

function ListaFrutas({ frutas }) {
    return (
        <ul>
            {frutas.map((fruta, index) => (
                <li key={index}>{fruta}</li>
            ))}
        </ul>
    );
}

export default ListaFrutas;
