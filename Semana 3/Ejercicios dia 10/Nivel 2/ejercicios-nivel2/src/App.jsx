import DatosAPI from './components/DatosAPI'
import Temporizador from './components/Temporizador'
import ContadorAleatorio from './components/ContadorAleatorio'
import FondoCambiante from './components/FondoCambiante'
import './App.css'

function App() {


  return (
    <>
      <div class="card">
        <Temporizador />
      </div>
      <div class="card">
        <ContadorAleatorio />
      </div>
      <div class="card">
      <DatosAPI />
      </div>
      <div class="card">
        <FondoCambiante />
      </div>

    </>
  )
}

export default App
