import ListaFrutas from './components/ListaFrutas'
import ListaTareas from './components/ListaTareas'

import './App.css'

function App() {
  const tareas = [
    { nombre: 'Estudiar React', completada: false },
    { nombre: 'Hacer ejercicio', completada: true },
    { nombre: 'Leer un libro', completada: false },
  ];

  return (
    <>
      <h1>Lista de Frutas</h1>
      <ListaFrutas frutas={['Manzana', 'Banana', 'Naranja', 'Fresa']} />
      <ListaFrutas frutas={['Pera', 'Kiwi', 'Mango']} />
      <ListaFrutas frutas={['Uva', 'Piña', 'Cereza']} />
      <div>
        <ListaTareas tareas={tareas} />
      </div>
    </>
  )
}

export default App
