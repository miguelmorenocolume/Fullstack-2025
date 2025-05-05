import React from 'react';
import './alumnosaprobados.css'

const AlumnosAprobados = ({ alumnos }) => {
    const alumnosAprobados = alumnos.filter(alumno => alumno.nota >= 5);

    return (
        <div>
            <h2>Alumnos Aprobados</h2>
            {alumnosAprobados.length === 0 ? (
                <p>No hay alumnos aprobados.</p>
            ) : (
                alumnosAprobados.map(alumno => (
                    <div className="articulo-card" key={alumno.nombre}>
                        <h3>{alumno.nombre}</h3>
                        <p>Nota: {alumno.nota}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default AlumnosAprobados;
