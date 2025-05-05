import './App.css'
import ListaFrutas from './components/ListaFrutas'
import ListaProductos from './components/ListaProductos'
import ListaPersonas from './components/ListaPersonas'

function App() {

  const frutas = ["Manzana", "Banana", "Cereza", "Durazno", "Fresa"]

  const productos = [{ id: 1, nombre: "Laptop", precio: 1200 },
  { id: 2, nombre: "Celular", precio: 800 },
  { id: 3, nombre: "Tablet", precio: 500 }
  ]

  const personas = [
    { id: 1, nombre: "Juan", edad: 25, ciudad: "Madrid" },
    { id: 2, nombre: "Ana", edad: 30, ciudad: "Barcelona" },
    { id: 3, nombre: "Luis", edad: 28, ciudad: "Valencia" },
  ]

  return (
    <>
      <h1>Lista de Frutas</h1>
      <ListaFrutas frutas={frutas} />
      <h1>Lista de productos</h1>
      <ListaProductos productos={productos} />
      <h1>Lista de personas</h1>
      <ListaPersonas personas={personas} />
    </>
  )
}

export default App
