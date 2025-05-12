import { useState } from "react";   
import "./Boton.css"

function Boton() {
    const [activo, setActivo] = useState(false);

    return (
        <button
            className={activo ? 'btn activo' : 'btn'}
            onClick={() => setActivo(!activo)}>
            {activo ? 'Activo' : 'Inactivo'}
        </button>

    );
}

export default Boton
