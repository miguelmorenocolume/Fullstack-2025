import { useState } from 'react';

function ListaEmpleados({ empleados }) {
  // Estados para los filtros
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroApellido, setFiltroApellido] = useState('');
  const [filtroSalario, setFiltroSalario] = useState('');

  const empleadosFiltrados = empleados.filter((emp) => {
    const coincideNombre = emp.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideApellido = emp.apellido.toLowerCase().includes(filtroApellido.toLowerCase());
    const salarioValido = filtroSalario === '' || emp.salario > parseFloat(filtroSalario);

    return coincideNombre && coincideApellido && salarioValido;
  });

  return (
    <div>
      <h2>Filtrar empleados</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={filtroApellido}
        onChange={(e) => setFiltroApellido(e.target.value)}
      />
      <input
        type="number"
        placeholder="Salario mayor a..."
        value={filtroSalario}
        onChange={(e) => setFiltroSalario(e.target.value)}
      />

      <ul>
        {empleadosFiltrados.map((emp) => (
          <li key={emp.id}>
            {emp.nombre} {emp.apellido} - ${emp.salario}
          </li>
        ))}
        {empleadosFiltrados.length === 0 && <p>No se encontraron empleados.</p>}
      </ul>
    </div>
  );
}

export default ListaEmpleados;
