import { useState } from 'react';
import ListaFrutas from './components/ListaFrutas';
import ListaTareas from './components/ListaTareas';
import ArticulosDestacados from './components/ArticulosDestacados';
import NumerosPares from './components/NumerosPares';
import AlumnosAprobados from './components/AlumnosAprobados';
import ListaUsuarios from './components/ListaUsuarios'

import './App.css';

function App() {
  const tareas = [
    { nombre: 'Tarea 1', completada: false },
    { nombre: 'Tarea 2', completada: true },
    { nombre: 'Tarea 3', completada: false },
  ];

  const articulos = [
    { titulo: 'Artículo 1', descripcion: 'Lorem ipsum dolor sit amet', destacado: true },
    { titulo: 'Artículo 2', descripcion: 'Lorem ipsum dolor sit amet', destacado: false },
    { titulo: 'Artículo 3', descripcion: 'Lorem ipsum dolor sit amet', destacado: true },
    { titulo: 'Artículo 4', descripcion: 'Lorem ipsum dolor sit amet', destacado: true },
    { titulo: 'Artículo 5', descripcion: 'Lorem ipsum dolor sit amet', destacado: false },
  ];

  const alumnos = [
    { nombre: 'Juan', nota: 1 },
    { nombre: 'María', nota: 9 },
    { nombre: 'Pedro', nota: 4 },
    { nombre: 'Ana', nota: 10 },
    { nombre: 'Luis', nota: 2 },
  ];

  const usuarios = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana García' },
    { id: 3, nombre: 'Carlos López' },
  ];

  const [numDestacados] = useState(
    articulos.filter(articulo => articulo.destacado).length
  );

  return (
    <>
      <h1>Lista de Frutas</h1>
      <ListaFrutas frutas={['Manzana', 'Banana', 'Naranja', 'Fresa']} />

      <div>
        <ListaTareas tareas={tareas} />
      </div>

      <div>
        <h2>Artículos Destacados</h2>
        <p>Hay {numDestacados} artículo(s) destacado(s).</p>
        <ArticulosDestacados articulos={articulos} />
      </div>
      <div>
        <NumerosPares />
      </div>
      <div>
        <AlumnosAprobados alumnos={alumnos} />
      </div>
      <div>
      <ListaUsuarios usuarios={usuarios} />
    </div>
    </>
  );
}

export default App;
