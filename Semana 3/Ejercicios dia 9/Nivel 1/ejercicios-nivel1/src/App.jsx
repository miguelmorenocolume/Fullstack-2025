import './App.css'
import Perfil from './components/Perfil'
import Producto from './components/Producto'
import Saludo from './components/Saludo'

function App() {


  return (
    <>
     <Perfil nombre="Miguel" edad={21} />
     <Producto nombre="Camiseta" precio={20} />
     <Saludo nombre="Miguel" />
    </>
  )
}

export default App
