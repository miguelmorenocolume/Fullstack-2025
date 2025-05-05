import './App.css'
import ListaFrutas from './components/ListaFrutas'
import ListaProductos from './components/ListaProductos'
import ListaPersonas from './components/ListaPersonas'
import ListaTareas from './components/ListaTareas'

function App() {

  const frutas = ["Manzana", "Banana", "Cereza", "Durazno", "Fresa"]

  const productos = [{ id: 1, nombre: "Laptop", precio: 1200 },
  { id: 2, nombre: "Celular", precio: 800 },
  { id: 3, nombre: "Tablet", precio: 500 }
  ]

  const personas = [{ id: 1, nombre: "Ana" },
  { id: 2, nombre: "Luis" },
  { id: 3, nombre: "Carlos" },
  { id: 4, nombre: "Marta" }]

  const tareas = [{ id: 1, texto: "Hacer ejercicio" },
  { id: 2, texto: "Leer un libro" },
  { id: 3, texto: "Aprender React" }]

  return (
    <>
      <h1>Lista de Frutas</h1>
      <ListaFrutas frutas={frutas} />
      <h1>Lista de productos + $700</h1>
      <ListaProductos productos={productos} />
      <h1>Lista de personas</h1>
      <ListaPersonas personas={personas} />
      <h1>Lista de tareas</h1>
      <ListaTareas tareas={tareas} />
    </>
  )
}

export default App
