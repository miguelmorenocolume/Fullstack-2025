import './App.css'
import ListaFrutas from './components/ListaFrutas'
import ListaProductos from './components/ListaProductos'
import ListaPersonas from './components/ListaPersonas'
import ListaEmpleados from './components/ListaEmpleados'

function App() {

  const frutas = ["Manzana", "Banana", "Cereza", "Durazno", "Fresa"]

  const productos = [{ id: 1, nombre: "Laptop", categoria: "Electrónica" },
  { id: 2, nombre: "Camiseta", categoria: "Ropa" },
  { id: 3, nombre: "Celular", categoria: "Electrónica" },
  { id: 4, nombre: "Zapatos", categoria: "Ropa" },
  { id: 5, nombre: "Audífonos", categoria: "Electrónica" }
  ]

  const personas = [{ id: 1, nombre: "Ana", edad: 25 },
  { id: 2, nombre: "Luis", edad: 47 },
  { id: 3, nombre: "Carlos", edad: 32 },
  { id: 4, nombre: "Marta", edad: 52 },
  { id: 5, nombre: "Pedro", edad: 18 }
  ]

  const empleados = [{ id: 1, nombre: "Ana", apellido: "Mesa", salario: 2500 },
  { id: 2, nombre: "Luis", apellido: "Garcia", salario: 1800 },
  { id: 3, nombre: "Carlos", apellido: "Perez", salario: 3200 },
  { id: 4, nombre: "Marta", apellido: "Gutierrez", salario: 2800 },
  { id: 5, nombre: "Pedro", apellido: "Almedaba", salario: 1500 }]

  return (
    <>
      <h1>Lista de Frutas</h1>
      <ListaFrutas frutas={frutas} />
      <h1>Lista de productos</h1>
      <ListaProductos productos={productos} />
      <h1>Lista de personas</h1>
      <ListaPersonas personas={personas} />
      <h1>Lista de empleados</h1>
      <ListaEmpleados empleados={empleados} />
    </>
  )
}

export default App
